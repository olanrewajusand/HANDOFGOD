document.addEventListener('DOMContentLoaded', () => {
    if (window.location.protocol === 'file:') return;
    const newsGrid = document.querySelector('main section:nth-of-type(2) > div');
    if (!newsGrid) return;
    const escapeHtml = value => String(value || '').replace(/[&<>'"]/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[char]));
    fetch('/api/posts').then(response => response.ok ? response.json() : []).then(posts => {
        if (!posts.length) return;
        newsGrid.innerHTML = posts.map(post => `<article class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"><img src="${escapeHtml(post.imageUrl || 'images/NEWS & MEDIA.jpg')}" alt="${escapeHtml(post.title)}" class="w-full h-48 object-cover"><div class="p-6"><span class="text-[#C29B38] text-xs font-bold uppercase tracking-widest">${escapeHtml(post.category)} · ${new Intl.DateTimeFormat('en-NG', { day: 'numeric', month: 'short', year: 'numeric' }).format(new Date(post.publishedAt))}</span><h2 class="font-serif text-2xl font-bold text-[#143D2A] mt-2 mb-3">${escapeHtml(post.title)}</h2><p class="text-gray-600 text-sm leading-relaxed">${escapeHtml(post.excerpt)}</p></div></article>`).join('');
    }).catch(() => {});
});
