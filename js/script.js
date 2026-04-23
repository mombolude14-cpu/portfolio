document.addEventListener('DOMContentLoaded', () => {
    // Current Year for Footer
    document.getElementById('current-year').textContent = new Date().getFullYear();

    // Theme Toggle Logic
    const themeToggles = document.querySelectorAll('.theme-toggle');
    const htmlElement = document.documentElement;

    // Check for saved user preference, if any, on load of the website
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        htmlElement.className = savedTheme;
    } else {
        // Check system preference
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        htmlElement.className = prefersDark ? 'dark' : 'light';
    }

    themeToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            if (htmlElement.classList.contains('light')) {
                htmlElement.className = 'dark';
                localStorage.setItem('theme', 'dark');
            } else {
                htmlElement.className = 'light';
                localStorage.setItem('theme', 'light');
            }
        });
    });

    // Mobile Menu Logic
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const closeMenuBtn = document.querySelector('.close-menu-btn');
    const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    function toggleMenu() {
        mobileMenuOverlay.classList.toggle('active');
        document.body.style.overflow = mobileMenuOverlay.classList.contains('active') ? 'hidden' : '';
    }

    mobileMenuBtn.addEventListener('click', toggleMenu);
    closeMenuBtn.addEventListener('click', toggleMenu);

    mobileNavLinks.forEach(link => {
        link.addEventListener('click', toggleMenu);
    });

    // Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Scroll Spy for Active Links
    const sections = document.querySelectorAll('section');
    const navLinksDesktop = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinksDesktop.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Intersection Observer for Scroll Animations
    const fadeElements = document.querySelectorAll('.fade-in-up');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Stop observing once it's visible
            }
        });
    }, observerOptions);

    fadeElements.forEach(element => {
        observer.observe(element);
    });

    // Contact Form is now handled by formsubmit.co
});
