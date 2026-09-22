const favicon = document.createElement('link');
favicon.rel = 'icon';
favicon.type = 'image/png';
favicon.href = 'images/logo-optimized.png';
document.head.appendChild(favicon);

document.addEventListener('DOMContentLoaded', () => {
    const sharedFooter = `
        <footer id="contact" class="bg-[#143D2A] text-white pt-16 pb-12 border-t border-[#143D2A]/20 w-full overflow-x-hidden">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    <div class="space-y-4">
                        <h3 class="font-serif text-xl font-bold text-white tracking-wide">HAND OF GOD CONSTRUCTION COMPANY LIMITED</h3>
                        <p class="text-gray-300 text-sm leading-relaxed font-light">Building master-planned communities, luxury duplexes, and residential plots with uncompromising standards across Nigeria.</p>
                    </div>
                    <div>
                        <h4 class="font-serif text-lg font-semibold text-[#C29B38] mb-4">Quick Links</h4>
                        <ul class="space-y-2.5 text-sm font-light text-gray-300">
                            <li><a href="index.html" class="hover:text-[#C29B38] transition">Home</a></li>
                            <li><a href="estates.html" class="hover:text-[#C29B38] transition">Our Estates</a></li>
                            <li><a href="own-property.html" class="hover:text-[#C29B38] transition">Own a Property</a></li>
                            <li><a href="index.html#mission" class="hover:text-[#C29B38] transition">Our Mission</a></li>
                            <li><a href="index.html#subscribe" class="hover:text-[#C29B38] transition">Subscribe Now</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 class="font-serif text-lg font-semibold text-[#C29B38] mb-4">Our Locations</h4>
                        <ul class="space-y-2.5 text-sm font-light text-gray-300">
                            <li><a href="contact.html" class="hover:text-[#C29B38] transition">Enugu, Enugu State</a></li>
                            <li><a href="contact.html" class="hover:text-[#C29B38] transition">Abakaliki, Ebonyi State</a></li>
                            <li><a href="contact.html" class="hover:text-[#C29B38] transition">Asaba, Delta State</a></li>
                            <li><a href="contact.html" class="hover:text-[#C29B38] transition">Awka, Anambra State</a></li>
                            <li><a href="contact.html" class="hover:text-[#C29B38] transition">Owerri, Imo State</a></li>
                            <li><a href="contact.html" class="hover:text-[#C29B38] transition">Umuahia, Abia State</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 class="font-serif text-lg font-semibold text-[#C29B38] mb-4">Contact Us</h4>
                        <ul class="space-y-3 text-sm font-light text-gray-300">
                            <li class="flex items-start gap-2"><span>C1 Rose Garden Court, Rangers Avenue, Indpendence Layout, Enugu, Enugu State</span></li>
                            <li class="flex items-center gap-2"><span>08025000067</span></li>
                            <li class="flex flex-col gap-1"><span>handofgodconstruction@gmail.com</span><span>customerservice@handofgodestate.com</span></li>
                        </ul>
                    </div>
                </div>
                <div class="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400">
                    <p>&copy; 2026 HAND OF GOD CONSTRUCTION COMPANY LIMITED. All rights reserved.</p>
                </div>
            </div>
        </footer>`;
    const existingFooter = document.querySelector('footer');
    if (existingFooter) {
        existingFooter.outerHTML = sharedFooter;
    } else {
        document.body.insertAdjacentHTML('beforeend', sharedFooter);
    }

    const whatsappButton = document.createElement('a');
    whatsappButton.className = 'floating-whatsapp';
    whatsappButton.href = 'https://wa.me/2348025000067';
    whatsappButton.target = '_blank';
    whatsappButton.rel = 'noopener noreferrer';
    whatsappButton.setAttribute('aria-label', 'Chat with HAND OF GOD CONSTRUCTION COMPANY LIMITEDon WhatsApp');
    whatsappButton.title = 'Chat on WhatsApp';
    whatsappButton.innerHTML = '<img src="images/Whatsapp Logo.png" alt="" aria-hidden="true">';
    document.body.appendChild(whatsappButton);

    const header = document.querySelector('header');
    if (!header) return;

    header.innerHTML = `
        <div class="site-nav-layout">
            <div class="site-nav-shell">
                <a href="index.html" class="site-nav-logo" aria-label="HAND OF GOD CONSTRUCTION COMPANY LIMITEDhome">
                    <img src="images/logo-optimized.png" alt="HAND OF GOD CONSTRUCTION COMPANY LIMITEDLogo" width="1940" height="528">
                </a>
                <nav class="site-nav-links hidden md:flex" aria-label="Primary navigation">
                    <a href="index.html">Home</a>
                    <div class="site-nav-dropdown">
                        <a href="about-us.html">About Us</a>
                        <div class="site-nav-dropdown-menu site-nav-dropdown-menu-short">
                            <a href="about-us.html#profile">Our Profile</a>
                            <a href="about-us.html#vision">Our Vision</a>
                            <a href="about-us.html#mission">Our Mission</a>
                            <a href="about-us.html#values">Our Core Values</a>
                            <a href="about-us.html#history">Our History</a>
                            <a href="about-us.html#objectives">Our Objectives</a>
                        </div>
                    </div>
                    <div class="site-nav-dropdown">
                        <a href="estates.html">Our Estates</a>
                        <div class="site-nav-dropdown-menu">
                            <a href="winners-estate.html">Winners Estate</a>
                            <a href="winners-estate-abakaliki.html">Winners Estate Abakaliki</a>
                            <a href="winners-estate-owerri.html">Winners Estate Owerri</a>
                            <a href="winners-estate-umuahia.html">Winners Estate Umuahia</a>
                            <a href="new-jerusalem-city-estate.html">New Jerusalem City Estate</a>
                            <a href="city-of-david-estate.html">City of David Estate</a>
                            <a href="new-haven-estate.html">New Haven Estate</a>
                            <a href="city-of-light-estate.html">City of Light Estate</a>
                            <a href="paradise-estate.html">Paradise Estate Emene</a>
                            <a href="anambra-state-workers-housing-estate.html">Anambra Workers Housing</a>
                            <a href="new-jerusalem-city-owerri.html">New Jerusalem City, Owerri</a>
                            <a href="winners-estate-owerri.html">Eastern Mega City Owerri</a>
                            <a href="winners-estate-umuahia.html">Eastern Mega City Umuahia</a>
                        </div>
                    </div>
                    <div class="site-nav-dropdown">
                        <a href="portfolio.html">Portfolio</a>
                        <div class="site-nav-dropdown-menu site-nav-dropdown-menu-short">
                            <a href="portfolio.html#all">All Projects</a>
                            <a href="portfolio.html#estates">Estate Developments</a>
                            <a href="portfolio.html#construction">Construction Work</a>
                        </div>
                    </div>
                    <div class="site-nav-dropdown">
                        <a href="own-property.html">Own a Property</a>
                        <div class="site-nav-dropdown-menu site-nav-dropdown-menu-short">
                            <a href="application.html">Start Application</a>
                            <a href="how-to-subscribe.html">How to Subscribe</a>
                            <a href="benefits.html">Benefits</a>
                            <a href="mode-of-payment.html">Mode of Payment</a>
                            <a href="nhf-requirements.html">NHF Requirements</a>
                        </div>
                    </div>
                    <div class="site-nav-dropdown">
                        <a href="news.html">More</a>
                        <div class="site-nav-dropdown-menu site-nav-dropdown-menu-short">
                            <a href="news.html">News &amp; Media</a>
                            <a href="portfolio.html">Photo Gallery</a>
                            <a href="facilities.html#infrastructure">Facilities</a>
                            <a href="partnership.html">Partnership</a>
                            <a href="contact.html">Contact Us</a>
                            <a href="index.html#subscribe">Subscribe Now</a>
                        </div>
                    </div>
                </nav>
                <a href="index.html#contact" class="site-nav-cta hidden sm:inline-flex">Get in Touch</a>
                <button class="site-nav-toggle md:hidden" type="button" aria-controls="mobile-menu" aria-expanded="false" aria-label="Open navigation menu">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
                        <path d="M4 7h16M4 12h16M4 17h16"></path>
                    </svg>
                </button>
            </div>
            <div id="mobile-menu" class="site-nav-mobile" hidden>
                <a href="index.html">Home</a>
                <div class="site-nav-mobile-group">
                    <button class="site-nav-mobile-toggle" type="button" aria-expanded="false">
                        <span>About Us</span><span class="site-nav-mobile-chevron">+</span>
                    </button>
                    <div class="site-nav-mobile-submenu" hidden>
                        <a href="about-us.html">About Overview</a>
                        <a href="about-us.html#profile">Our Profile</a>
                        <a href="about-us.html#vision">Our Vision</a>
                        <a href="about-us.html#mission">Our Mission</a>
                        <a href="about-us.html#values">Our Core Values</a>
                        <a href="about-us.html#history">Our History</a>
                        <a href="about-us.html#objectives">Our Objectives</a>
                    </div>
                </div>
                <div class="site-nav-mobile-group">
                    <button class="site-nav-mobile-toggle" type="button" aria-expanded="false">
                        <span>Our Estates</span><span class="site-nav-mobile-chevron">+</span>
                    </button>
                    <div class="site-nav-mobile-submenu" hidden>
                        <a href="estates.html">All Estates</a>
                        <a href="winners-estate.html">Winners Estate</a>
                        <a href="winners-estate-abakaliki.html">Winners Estate Abakaliki</a>
                        <a href="winners-estate-owerri.html">Winners Estate Owerri</a>
                        <a href="winners-estate-umuahia.html">Winners Estate Umuahia</a>
                        <a href="new-jerusalem-city-estate.html">New Jerusalem City Estate</a>
                        <a href="city-of-david-estate.html">City of David Estate</a>
                        <a href="new-haven-estate.html">New Haven Estate</a>
                        <a href="city-of-light-estate.html">City of Light Estate</a>
                        <a href="paradise-estate.html">Paradise Estate Emene</a>
                        <a href="anambra-state-workers-housing-estate.html">Anambra Workers Housing</a>
                        <a href="new-jerusalem-city-owerri.html">New Jerusalem City, Owerri</a>
                        <a href="winners-estate-owerri.html">Eastern Mega City Owerri</a>
                        <a href="winners-estate-umuahia.html">Eastern Mega City Umuahia</a>
                    </div>
                </div>
                <div class="site-nav-mobile-group">
                    <button class="site-nav-mobile-toggle" type="button" aria-expanded="false">
                        <span>Portfolio</span><span class="site-nav-mobile-chevron">+</span>
                    </button>
                    <div class="site-nav-mobile-submenu" hidden>
                        <a href="portfolio.html#all">All Projects</a>
                        <a href="portfolio.html#estates">Estate Developments</a>
                        <a href="portfolio.html#construction">Construction Work</a>
                    </div>
                </div>
                <div class="site-nav-mobile-group">
                    <button class="site-nav-mobile-toggle" type="button" aria-expanded="false">
                        <span>Own a Property</span><span class="site-nav-mobile-chevron">+</span>
                    </button>
                    <div class="site-nav-mobile-submenu" hidden>
                        <a href="own-property.html">Ownership Overview</a>
                        <a href="application.html">Start Application</a>
                        <a href="how-to-subscribe.html">How to Subscribe</a>
                        <a href="benefits.html">Benefits</a>
                        <a href="mode-of-payment.html">Mode of Payment</a>
                        <a href="nhf-requirements.html">NHF Requirements</a>
                    </div>
                </div>
                <div class="site-nav-mobile-group">
                    <button class="site-nav-mobile-toggle" type="button" aria-expanded="false">
                        <span>More</span><span class="site-nav-mobile-chevron">+</span>
                    </button>
                    <div class="site-nav-mobile-submenu" hidden>
                        <a href="news.html">News &amp; Media</a>
                        <a href="portfolio.html">Photo Gallery</a>
                        <a href="facilities.html#infrastructure">Facilities</a>
                        <a href="partnership.html">Partnership</a>
                        <a href="contact.html">Contact Us</a>
                        <a href="index.html#subscribe">Subscribe Now</a>
                    </div>
                </div>
                <a href="index.html#contact" class="site-nav-mobile-cta">Get in Touch</a>
            </div>
        </div>`;

    const estateSelect = document.getElementById('application-estate');
    const locationField = document.getElementById('application-location-field');
    const locationSelect = document.getElementById('application-location');
    const locationLabel = document.getElementById('application-location-label');
    const estateLocations = {
        'Winners Estate': ['Enugu', 'Abakaliki', 'Umuahia', 'Owerri'],
        'Eastern Mega City': ['Abakaliki', 'Awka', 'Umuahia', 'Owerri']
    };
    estateSelect?.addEventListener('change', () => {
        const locations = estateLocations[estateSelect.value] || [];
        const hasMultipleLocations = locations.length > 1;
        locationField?.classList.toggle('hidden', !hasMultipleLocations);
        if (locationSelect) {
            locationSelect.required = hasMultipleLocations;
            locationSelect.innerHTML = '<option value="">Choose a location</option>' + locations.map(location => `<option>${location}</option>`).join('');
            if (!hasMultipleLocations) locationSelect.value = '';
        }
        if (locationLabel) locationLabel.textContent = `Choose ${estateSelect.value || 'a'} location`;
    });

    const menu = document.getElementById('mobile-menu');
    const toggle = header.querySelector('.site-nav-toggle');
    toggle?.addEventListener('click', () => {
        const isOpen = !menu.hidden;
        menu.hidden = isOpen;
        toggle.setAttribute('aria-expanded', String(!isOpen));
        toggle.setAttribute('aria-label', isOpen ? 'Open navigation menu' : 'Close navigation menu');
    });

    header.querySelectorAll('.site-nav-mobile-toggle').forEach(button => {
            button.addEventListener('click', () => {
                const submenu = button.nextElementSibling;
                const isOpen = !submenu.hidden;
                submenu.hidden = isOpen;
                button.setAttribute('aria-expanded', String(!isOpen));
                button.querySelector('.site-nav-mobile-chevron').textContent = isOpen ? '+' : '-';
            });
        });

    const revealTargets = document.querySelectorAll('main > section, body > section, main article, .gallery-item, .estate-card, .image-frame, .collection-heading, .discovery-console');
    revealTargets.forEach((target, index) => {
        target.setAttribute('data-reveal', '');
        target.style.setProperty('--reveal-delay', `${Math.min(index % 6, 5) * 70}ms`);
    });

    if ('IntersectionObserver' in window) {
        revealTargets.forEach(target => target.classList.add('reveal-pending'));
        const revealObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.remove('reveal-pending', 'is-visible');
                    void entry.target.offsetWidth;
                    entry.target.classList.add('is-visible');
                    return;
                }

                entry.target.classList.remove('is-visible');
                entry.target.classList.add('reveal-pending');
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -40px' });

        revealTargets.forEach(target => revealObserver.observe(target));
    } else {
        revealTargets.forEach(target => target.classList.add('is-visible'));
    }

});
