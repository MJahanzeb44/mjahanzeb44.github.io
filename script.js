document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const header = document.querySelector('header');

    // Initialize elements with animation classes
    const initAnimations = () => {
        // Animate elements when they come into view
        const animateOnScroll = () => {
            const elements = document.querySelectorAll('.animate-pop-in, .animate-slide-in');
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animated');
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            });

            elements.forEach(element => {
                observer.observe(element);
            });
        };

        // Set animation delays for sequenced elements
        const setAnimationDelays = () => {
            const elementsToSequence = [
                { selector: '.timeline-item', delay: 0.2 },
                { selector: '.education-card', delay: 0.15 },
                { selector: '.skills-category', delay: 0.2 },
                { selector: '.strength-item', delay: 0.1 }
            ];

            elementsToSequence.forEach(group => {
                const elements = document.querySelectorAll(group.selector);
                elements.forEach((el, index) => {
                    el.style.animationDelay = `${index * group.delay}s`;
                });
            });
        };

        animateOnScroll();
        setAnimationDelays();
    };

    // Toggle mobile menu
    const toggleMenu = () => {
        navLinks.classList.toggle('active');
        menuToggle.classList.toggle('active');
        document.body.classList.toggle('no-scroll', navLinks.classList.contains('active'));
    };

    // Close mobile menu when clicking a link
    const closeMenuOnLinkClick = () => {
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                if (navLinks.classList.contains('active')) {
                    toggleMenu();
                }
            });
        });
    };

    // Handle header scroll effect
    const handleHeaderScroll = () => {
        window.addEventListener('scroll', () => {
            header.classList.toggle('scrolled', window.scrollY > 100);
        });
    };

    // Smooth scrolling for anchor links
    const initSmoothScrolling = () => {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const headerHeight = header.offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    };

    // Initialize loading screen
    const initLoadingScreen = () => {
        const loadingScreen = document.querySelector('.loading-screen');
        if (loadingScreen) {
            window.addEventListener('load', () => {
                setTimeout(() => {
                    loadingScreen.style.opacity = '0';
                    setTimeout(() => {
                        loadingScreen.style.display = 'none';
                    }, 500);
                }, 800);
            });
        }
    };

    // Initialize all functions
    const init = () => {
        menuToggle.addEventListener('click', toggleMenu);
        closeMenuOnLinkClick();
        handleHeaderScroll();
        initSmoothScrolling();
        initAnimations();
        initLoadingScreen();
    };

    init();
});