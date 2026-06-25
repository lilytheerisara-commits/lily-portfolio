document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const header = document.getElementById('site-header');
    const mobileNavToggle = document.getElementById('mobile-nav-toggle-btn');
    const primaryNav = document.getElementById('primary-navigation');
    const navLinksList = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');
    const modal = document.getElementById('resume-modal');
    const viewResumeBtn = document.getElementById('view-resume-btn');
    const closeModalBtn = document.getElementById('close-modal-btn');
    const body = document.body;

    /* ==========================================================================
       STICKY NAVIGATION HEADER
       ========================================================================== */
    const handleScrollHeader = () => {
        if (window.scrollY > 20) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };
    
    window.addEventListener('scroll', handleScrollHeader);
    // Initial check on page load
    handleScrollHeader();

    /* ==========================================================================
       MOBILE NAV DRAWER TOGGLE
       ========================================================================== */
    const toggleMobileNav = () => {
        const isOpen = primaryNav.classList.contains('open');
        if (isOpen) {
            primaryNav.classList.remove('open');
            mobileNavToggle.setAttribute('aria-expanded', 'false');
            body.style.overflow = ''; // Restore page scrolling
        } else {
            primaryNav.classList.add('open');
            mobileNavToggle.setAttribute('aria-expanded', 'true');
            body.style.overflow = 'hidden'; // Stop background scrolling
        }
    };

    mobileNavToggle.addEventListener('click', toggleMobileNav);

    // Close mobile nav when clicking a link
    navLinksList.forEach(link => {
        link.addEventListener('click', () => {
            if (primaryNav.classList.contains('open')) {
                primaryNav.classList.remove('open');
                mobileNavToggle.setAttribute('aria-expanded', 'false');
                body.style.overflow = '';
            }
        });
    });

    // Close mobile nav when clicking outside the menu panel
    document.addEventListener('click', (event) => {
        const isClickInsideMenu = primaryNav.contains(event.target);
        const isClickToggle = mobileNavToggle.contains(event.target);
        
        if (!isClickInsideMenu && !isClickToggle && primaryNav.classList.contains('open')) {
            primaryNav.classList.remove('open');
            mobileNavToggle.setAttribute('aria-expanded', 'false');
            body.style.overflow = '';
        }
    });

    /* ==========================================================================
       SCROLL-SPY ACTIVE LINK HIGHLIGHTING
       ========================================================================== */
    const scrollSpy = () => {
        const scrollPosition = window.scrollY + 120; // Offset for header + buffer

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinksList.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    };

    window.addEventListener('scroll', scrollSpy);
    // Trigger scroll spy on load to highlight correct link
    scrollSpy();

    /* ==========================================================================
       RESUME MODAL UTILITIES (Body Scroll Lock & Accessibility)
       ========================================================================== */
    // Helper to lock body scroll when modal target is in url hash
    const checkModalState = () => {
        if (window.location.hash === '#resume-modal') {
            body.style.overflow = 'hidden';
        } else {
            // Only restore if mobile nav is not open
            if (!primaryNav.classList.contains('open')) {
                body.style.overflow = '';
            }
        }
    };

    // Listen to hashchange events
    window.addEventListener('hashchange', checkModalState);
    // Check initial state
    checkModalState();

    // Close modal on Escape Keypress
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && window.location.hash === '#resume-modal') {
            window.location.hash = '#';
        }
    });
});
