// 1. Mobile Menu Toggle Logic
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

menuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// 2. Estate Filtering Logic
const applyFilterBtn = document.getElementById('apply-filter-btn');
const locationSelect = document.getElementById('filter-location');
const typeSelect = document.getElementById('filter-type');
const statusSelect = document.getElementById('filter-status');
const estateCards = document.querySelectorAll('.estate-card');
const noResultsDiv = document.getElementById('no-results');

applyFilterBtn.addEventListener('click', () => {
    const selectedLocation = locationSelect.value;
    const selectedType = typeSelect.value;
    const selectedStatus = statusSelect.value;
    let visibleCount = 0;

    estateCards.forEach(card => {
        const cardLocation = card.getAttribute('data-location');
        const cardStatus = card.getAttribute('data-status');
        const cardType = card.getAttribute('data-type');

        const matchesLocation = (selectedLocation === 'all' || cardLocation === selectedLocation);
        const matchesType = (selectedType === 'all' || cardType === selectedType);
        const matchesStatus = (selectedStatus === 'all' || cardStatus === selectedStatus);

        if (matchesLocation && matchesType && matchesStatus) {
            card.style.display = 'flex';
            visibleCount++;
        } else {
            card.style.display = 'none';
        }
    });

    // Show or hide empty state indicator
    if (visibleCount === 0) {
        noResultsDiv.classList.remove('hidden');
    } else {
        noResultsDiv.classList.add('hidden');
    }
});

// 3. Modal Popup Functions
const modal = document.getElementById('estate-modal');
const modalTitle = document.getElementById('modal-title');
const modalLocation = document.getElementById('modal-location');
const modalStatus = document.getElementById('modal-status');
const modalType = document.getElementById('modal-type');

function viewEstate(name, location, status, type) {
    modalTitle.textContent = name;
    modalLocation.textContent = location;
    modalStatus.textContent = status;
    modalType.textContent = `Category: ${type}`;
    modal.classList.remove('hidden');
}

function closeModal() {
    modal.classList.add('hidden');
}

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});// Apply gradient background via JavaScript
window.addEventListener('DOMContentLoaded', () => {
    document.body.style.background = 'linear-gradient(135deg, #d8dfd5 0%, #000000 50%, #becabe 100%)';
    document.body.style.backgroundAttachment = 'fixed';
    document.body.style.minHeight = '100vh';
});// Netflix Cinematic Modal Script
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('estate-modal');
    const modalClose = document.getElementById('modal-close');
    const modalImg = document.getElementById('modal-img');
    const modalTitle = document.getElementById('modal-title');
    const modalLocation = document.getElementById('modal-location');
    const modalDesc = document.getElementById('modal-desc');
    const modalTag = document.getElementById('modal-tag');

    // Attach click event to all estate cards or view estate buttons
    const cards = document.querySelectorAll('.netflix-card');
    cards.forEach(card => {
        card.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Extract details from the clicked card
            const imgEl = card.querySelector('img');
            const titleEl = card.querySelector('h3, h4, .font-bold');
            const locEl = card.querySelector('.text-sm, p');
            const descEl = card.querySelector('p:not(.text-sm)');
            const tagEl = card.querySelector('span, .badge');

            if (imgEl) modalImg.src = imgEl.src;
            if (titleEl) modalTitle.textContent = titleEl.textContent;
            if (locEl) modalLocation.textContent = locEl.textContent;
            if (descEl) modalDesc.textContent = descEl.textContent;
            if (tagEl) modalTag.textContent = tagEl.textContent;

            // Open modal with smooth animation
            modal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        });
    });

    // Close modal functions
    const closeModal = () => {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    };

    if (modalClose) modalClose.addEventListener('click', closeModal);
    
    // Close when clicking outside modal content
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    // Close on ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
    });
});