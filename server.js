require('dotenv').config();

const path = require('path');
const express = require('express');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Database = require('better-sqlite3');
const rateLimit = require('express-rate-limit');

const app = express();
const port = Number(process.env.PORT || 3000);
const jwtSecret = process.env.JWT_SECRET;
const isProduction = process.env.NODE_ENV === 'production';

if (!jwtSecret || jwtSecret.length < 32) {
    throw new Error('JWT_SECRET must be set to a random value of at least 32 characters.');
}
if (!process.env.ADMIN_EMAIL || !process.env.ADMIN_PASSWORD) {
    throw new Error('ADMIN_EMAIL and ADMIN_PASSWORD must be configured.');
}

const database = new Database(path.join(__dirname, 'hog.db'));
database.pragma('journal_mode = WAL');
database.exec(`
    CREATE TABLE IF NOT EXISTS admins (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT NOT NULL UNIQUE,
        password_hash TEXT NOT NULL,
        role TEXT NOT NULL DEFAULT 'admin',
        created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
    CREATE TABLE IF NOT EXISTS applications (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT NOT NULL,
        estate TEXT NOT NULL,
        property_type TEXT NOT NULL DEFAULT '',
        payment_plan TEXT NOT NULL DEFAULT '',
        notes TEXT NOT NULL DEFAULT '',
        status TEXT NOT NULL DEFAULT 'New' CHECK (status IN ('New', 'Contacted', 'Closed')),
        submitted_at TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS posts (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        excerpt TEXT NOT NULL DEFAULT '',
        content TEXT NOT NULL,
        image_url TEXT NOT NULL DEFAULT '',
        category TEXT NOT NULL DEFAULT 'News',
        status TEXT NOT NULL DEFAULT 'Draft' CHECK (status IN ('Draft', 'Published')),
        author_id INTEGER NOT NULL,
        published_at TEXT,
        created_at TEXT NOT NULL,
        updated_at TEXT NOT NULL,
        FOREIGN KEY (author_id) REFERENCES admins(id)
    );
`);

try { database.exec("ALTER TABLE admins ADD COLUMN role TEXT NOT NULL DEFAULT 'admin'"); } catch (error) { if (!error.message.includes('duplicate column name')) throw error; }

function seedUser(email, password, role) {
    const user = database.prepare('SELECT id FROM admins WHERE email = ?').get(email);
    if (!user) database.prepare('INSERT INTO admins (email, password_hash, role) VALUES (?, ?, ?)').run(email, bcrypt.hashSync(password, 12), role);
}
seedUser(process.env.ADMIN_EMAIL, process.env.ADMIN_PASSWORD, 'admin');
if (process.env.BLOGGER_EMAIL && process.env.BLOGGER_PASSWORD) seedUser(process.env.BLOGGER_EMAIL, process.env.BLOGGER_PASSWORD, 'blogger');

app.use(helmet({ contentSecurityPolicy: false }));
app.use(express.json({ limit: '50kb' }));
app.use(express.urlencoded({ extended: false, limit: '50kb' }));
app.use(cookieParser());

const loginLimiter = rateLimit({ windowMs: 15 * 60 * 1000, limit: 10, standardHeaders: true, legacyHeaders: false });
const loginCookie = { httpOnly: true, sameSite: 'strict', secure: isProduction, maxAge: 8 * 60 * 60 * 1000 };

function createToken(adminRecord) {
    return jwt.sign({ sub: String(adminRecord.id), email: adminRecord.email, role: adminRecord.role }, jwtSecret, { expiresIn: '8h' });
}

function requireRoles(...roles) {
    return (request, response, next) => {
    const token = request.cookies.admin_session;
    if (!token) return response.status(401).json({ error: 'Authentication required.' });
    try {
        request.admin = jwt.verify(token, jwtSecret);
        if (!roles.includes(request.admin.role)) return response.status(403).json({ error: 'You do not have permission for this action.' });
        next();
    } catch {
        response.clearCookie('admin_session', loginCookie);
        response.status(401).json({ error: 'Session expired. Please log in again.' });
    }
    };
}
const requireAdmin = requireRoles('admin', 'blogger');
const requireAdminOnly = requireRoles('admin');

function validateApplication(body) {
    const required = ['name', 'email', 'phone', 'estate'];
    if (required.some(field => typeof body[field] !== 'string' || !body[field].trim())) return 'Name, email, phone, and estate are required.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) return 'Enter a valid email address.';
    return null;
}

app.post('/api/auth/login', loginLimiter, (request, response) => {
    const { email, password } = request.body;
    const adminRecord = database.prepare('SELECT * FROM admins WHERE email = ?').get(String(email || '').toLowerCase().trim());
    if (!adminRecord || typeof password !== 'string' || !bcrypt.compareSync(password, adminRecord.password_hash)) {
        return response.status(401).json({ error: 'Invalid email or password.' });
    }
    response.cookie('admin_session', createToken(adminRecord), loginCookie);
    response.json({ email: adminRecord.email });
});

app.post('/api/auth/logout', (request, response) => {
    response.clearCookie('admin_session', loginCookie);
    response.status(204).end();
});

app.get('/api/auth/me', requireAdmin, (request, response) => response.json({ email: request.admin.email }));

app.post('/api/applications', (request, response) => {
    const error = validateApplication(request.body);
    if (error) return response.status(400).json({ error });
    const id = `APP-${Date.now().toString().slice(-8)}`;
    const submittedAt = new Date().toISOString();
    database.prepare(`INSERT INTO applications (id, name, email, phone, estate, property_type, payment_plan, notes, submitted_at)
        VALUES (@id, @name, @email, @phone, @estate, @propertyType, @paymentPlan, @notes, @submittedAt)`).run({
        id, name: request.body.name.trim(), email: request.body.email.trim().toLowerCase(), phone: request.body.phone.trim(), estate: request.body.estate.trim(),
        propertyType: String(request.body.propertyType || ''), paymentPlan: String(request.body.paymentPlan || ''), notes: String(request.body.notes || ''), submittedAt
    });
    response.status(201).json({ id });
});

app.get('/api/applications', requireAdmin, (request, response) => {
    const rows = database.prepare(`SELECT id, name, email, phone, estate, property_type AS propertyType, payment_plan AS paymentPlan,
        notes, status, submitted_at AS submittedAt FROM applications ORDER BY submitted_at DESC`).all();
    response.json(rows);
});

app.patch('/api/applications/:id', requireAdmin, (request, response) => {
    if (!['New', 'Contacted', 'Closed'].includes(request.body.status)) return response.status(400).json({ error: 'Invalid application status.' });
    const result = database.prepare('UPDATE applications SET status = ? WHERE id = ?').run(request.body.status, request.params.id);
    if (!result.changes) return response.status(404).json({ error: 'Application not found.' });
    response.json({ status: request.body.status });
});

app.delete('/api/applications/:id', requireAdmin, (request, response) => {
    const result = database.prepare('DELETE FROM applications WHERE id = ?').run(request.params.id);
    if (!result.changes) return response.status(404).json({ error: 'Application not found.' });
    response.status(204).end();
});

function validatePost(body) {
    if (typeof body.title !== 'string' || !body.title.trim() || typeof body.content !== 'string' || !body.content.trim()) return 'Title and content are required.';
    return null;
}

app.get('/api/posts', (request, response) => {
    const posts = database.prepare(`SELECT id, title, excerpt, content, image_url AS imageUrl, category, status,
        published_at AS publishedAt, created_at AS createdAt, updated_at AS updatedAt FROM posts WHERE status = 'Published' ORDER BY published_at DESC`).all();
    response.json(posts);
});

app.get('/api/admin/posts', requireAdmin, (request, response) => {
    const posts = database.prepare(`SELECT id, title, excerpt, content, image_url AS imageUrl, category, status,
        published_at AS publishedAt, created_at AS createdAt, updated_at AS updatedAt FROM posts ORDER BY updated_at DESC`).all();
    response.json(posts);
});

app.post('/api/admin/posts', requireAdmin, (request, response) => {
    const error = validatePost(request.body);
    if (error) return response.status(400).json({ error });
    const now = new Date().toISOString();
    const post = { id: `POST-${Date.now().toString().slice(-8)}`, title: request.body.title.trim(), excerpt: String(request.body.excerpt || '').trim(), content: request.body.content.trim(), imageUrl: String(request.body.imageUrl || '').trim(), category: String(request.body.category || 'News').trim(), status: request.body.status === 'Published' ? 'Published' : 'Draft', authorId: request.admin.sub, publishedAt: request.body.status === 'Published' ? now : null, createdAt: now, updatedAt: now };
    database.prepare(`INSERT INTO posts (id, title, excerpt, content, image_url, category, status, author_id, published_at, created_at, updated_at)
        VALUES (@id, @title, @excerpt, @content, @imageUrl, @category, @status, @authorId, @publishedAt, @createdAt, @updatedAt)`).run(post);
    response.status(201).json(post);
});

app.patch('/api/admin/posts/:id', requireAdmin, (request, response) => {
    const error = validatePost(request.body);
    if (error) return response.status(400).json({ error });
    const current = database.prepare('SELECT * FROM posts WHERE id = ?').get(request.params.id);
    if (!current) return response.status(404).json({ error: 'Post not found.' });
    if (request.admin.role !== 'admin' && current.author_id !== Number(request.admin.sub)) return response.status(403).json({ error: 'You can only edit your own posts.' });
    const status = request.body.status === 'Published' ? 'Published' : 'Draft';
    const now = new Date().toISOString();
    database.prepare(`UPDATE posts SET title = @title, excerpt = @excerpt, content = @content, image_url = @imageUrl,
        category = @category, status = @status, published_at = CASE WHEN @status = 'Published' THEN COALESCE(published_at, @now) ELSE NULL END, updated_at = @now WHERE id = @id`).run({ id: request.params.id, title: request.body.title.trim(), excerpt: String(request.body.excerpt || '').trim(), content: request.body.content.trim(), imageUrl: String(request.body.imageUrl || '').trim(), category: String(request.body.category || 'News').trim(), status, now });
    response.json({ status });
});

app.delete('/api/admin/posts/:id', requireAdmin, (request, response) => {
    const current = database.prepare('SELECT author_id FROM posts WHERE id = ?').get(request.params.id);
    if (!current) return response.status(404).json({ error: 'Post not found.' });
    if (request.admin.role !== 'admin' && current.author_id !== Number(request.admin.sub)) return response.status(403).json({ error: 'You can only delete your own posts.' });
    database.prepare('DELETE FROM posts WHERE id = ?').run(request.params.id);
    response.status(204).end();
});

app.get('/admin-dashboard.html', (request, response, next) => {
    const token = request.cookies.admin_session;
    try {
        if (!token) throw new Error('Missing session');
        jwt.verify(token, jwtSecret);
        next();
    } catch {
        response.redirect('/admin-login.html');
    }
});

app.use(express.static(__dirname, { extensions: ['html'] }));
app.use((request, response) => response.sendFile(path.join(__dirname, 'index.html')));

app.listen(port, () => console.log(`HAND OF GOD CONSTRUCTION COMPANY LIMITEDportal running at http://localhost:${port}`));
