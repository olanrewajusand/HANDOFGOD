// Mobile Menu Toggle
document.getElementById('menu-btn')?.addEventListener('click', function() {
    const menu = document.getElementById('mobile-menu');
    menu.classList.toggle('hidden');
});

// Filter Functionality
document.getElementById('apply-filter-btn')?.addEventListener('click', filterEstates);

// Event listeners for real-time filtering
document.getElementById('filter-location')?.addEventListener('change', filterEstates);
document.getElementById('filter-type')?.addEventListener('change', filterEstates);
document.getElementById('filter-status')?.addEventListener('change', filterEstates);

// Featured estates slideshow
const featuredCarousel = document.querySelector('[data-carousel]');
if (featuredCarousel) {
    const slides = [...featuredCarousel.querySelectorAll('[data-slide]')];
    const dots = [...featuredCarousel.querySelectorAll('[data-carousel-dot]')];
    let activeSlide = 0;
    let autoplay;

    function showSlide(index) {
        activeSlide = (index + slides.length) % slides.length;
        slides.forEach((slide, slideIndex) => slide.classList.toggle('is-active', slideIndex === activeSlide));
        dots.forEach((dot, dotIndex) => {
            const isActive = dotIndex === activeSlide;
            dot.classList.toggle('is-active', isActive);
            dot.toggleAttribute('aria-current', isActive);
        });
    }

    function restartAutoplay() {
        window.clearInterval(autoplay);
        autoplay = window.setInterval(() => showSlide(activeSlide + 1), 5500);
    }

    featuredCarousel.querySelector('[data-carousel-prev]')?.addEventListener('click', () => {
        showSlide(activeSlide - 1);
        restartAutoplay();
    });
    featuredCarousel.querySelector('[data-carousel-next]')?.addEventListener('click', () => {
        showSlide(activeSlide + 1);
        restartAutoplay();
    });
    dots.forEach((dot, dotIndex) => dot.addEventListener('click', () => {
        showSlide(dotIndex);
        restartAutoplay();
    }));
    featuredCarousel.addEventListener('mouseenter', () => window.clearInterval(autoplay));
    featuredCarousel.addEventListener('mouseleave', restartAutoplay);
    featuredCarousel.addEventListener('focusin', () => window.clearInterval(autoplay));
    featuredCarousel.addEventListener('focusout', (event) => {
        if (!featuredCarousel.contains(event.relatedTarget)) restartAutoplay();
    });
    showSlide(0);
    restartAutoplay();
}

// Clear Filters Button
const clearFiltersBtn = document.createElement('button');
clearFiltersBtn.id = 'clear-filters-btn';
clearFiltersBtn.className = 'hidden absolute top-4 right-4 bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-full text-xs font-semibold transition';
clearFiltersBtn.textContent = 'Clear Filters';
clearFiltersBtn.addEventListener('click', clearFilters);

// Insert clear button after filter section
const filterSection = document.querySelector('.grid.grid-cols-1.sm\\:grid-cols-2.lg\\:grid-cols-5');
if (filterSection?.parentElement) {
    filterSection.parentElement.style.position = 'relative';
    filterSection.parentElement.appendChild(clearFiltersBtn);
}

function filterEstates() {
    const locationFilter = document.getElementById('filter-location')?.value || 'all';
    const typeFilter = document.getElementById('filter-type')?.value || 'all';
    const statusFilter = document.getElementById('filter-status')?.value || 'all';
    
    const cards = document.querySelectorAll('.estate-card');
    let visibleCount = 0;
    
    cards.forEach(card => {
        const location = card.getAttribute('data-location');
        const type = card.getAttribute('data-type');
        const status = card.getAttribute('data-status');
        
        // Check if card matches all active filters
        const matchesLocation = locationFilter === 'all' || location === locationFilter;
        const matchesType = typeFilter === 'all' || type === typeFilter;
        const matchesStatus = statusFilter === 'all' || status === statusFilter;
        
        if (matchesLocation && matchesType && matchesStatus) {
            card.classList.remove('hidden');
            visibleCount++;
        } else {
            card.classList.add('hidden');
        }
    });
    
    // Check if any filters are active
    const isFiltered = locationFilter !== 'all' || typeFilter !== 'all' || statusFilter !== 'all';
    
    // Show/hide clear filters button
    const clearBtn = document.getElementById('clear-filters-btn');
    if (clearBtn) {
        clearBtn.classList.toggle('hidden', !isFiltered);
    }
    
    // Show/hide no results message
    const noResults = document.getElementById('no-results');
    if (visibleCount === 0 && isFiltered) {
        noResults?.classList.remove('hidden');
    } else {
        noResults?.classList.add('hidden');
    }
}

function clearFilters() {
    document.getElementById('filter-location').value = 'all';
    document.getElementById('filter-type').value = 'all';
    document.getElementById('filter-status').value = 'all';
    
    // Hide clear button
    document.getElementById('clear-filters-btn')?.classList.add('hidden');
    
    // Show all cards
    document.querySelectorAll('.estate-card').forEach(card => {
        card.classList.remove('hidden');
    });
    
    // Hide no results message
    document.getElementById('no-results')?.classList.add('hidden');
}

// Modal Functions
function viewEstate(title, location, status, type) {
    const modal = document.getElementById('estate-modal');
    if (modal) {
        document.getElementById('modal-title').textContent = title;
        document.getElementById('modal-location').textContent = location;
        document.getElementById('modal-status').textContent = status;
        document.getElementById('modal-type').textContent = 'Property Type: ' + type;
        modal.classList.remove('hidden');
    }
}

function closeModal() {
    const modal = document.getElementById('estate-modal');
    if (modal) {
        modal.classList.add('hidden');
    }
}

// Close modal when clicking the close button
document.getElementById('modal-close')?.addEventListener('click', closeModal);

const subscriptionForm = document.getElementById('subscription-form');
subscriptionForm?.addEventListener('submit', async (event) => {
    event.preventDefault();

    const status = document.getElementById('subscription-status');
    const formData = new FormData(subscriptionForm);
    const name = formData.get('full-name') || 'there';
    const application = {
        id: `APP-${Date.now().toString().slice(-6)}`,
        name: formData.get('full-name') || '',
        email: formData.get('email') || '',
        phone: formData.get('phone') || '',
        estate: formData.get('estate') || '',
        propertyType: formData.get('property-type') || '',
        paymentPlan: formData.get('payment-plan') || '',
        notes: formData.get('notes') || '',
        status: 'New',
        submittedAt: new Date().toISOString()
    };
    const apiApplication = { name: application.name, email: application.email, phone: application.phone, estate: application.estate, propertyType: application.propertyType, paymentPlan: application.paymentPlan, notes: application.notes };
    if (window.location.protocol !== 'file:') {
        const response = await fetch('/api/applications', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(apiApplication) });
        if (!response.ok) throw new Error('Application could not be submitted.');
    } else {
        const applications = JSON.parse(localStorage.getItem('hogApplications') || '[]');
        applications.unshift(application);
        localStorage.setItem('hogApplications', JSON.stringify(applications));
    }

    if (status) {
        status.textContent = `Thank you, ${name}. Your request is ready to be reviewed. Please contact 08025000067 to complete the next step.`;
        status.classList.remove('hidden');
    }
});

// Close modal when clicking outside the modal content
window.addEventListener('click', function(event) {
    const modal = document.getElementById('estate-modal');
    const modalContent = document.getElementById('modal-content');
    
    if (modal && event.target === modal) {
        closeModal();
    }
});
