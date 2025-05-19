document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const header = document.querySelector('header');
    const themeToggleBtn = document.querySelector('.theme-toggle-btn');
    const themeText = document.querySelector('.theme-text-inner');
    const themeIcon = document.querySelector('.theme-icon');
    const backToTopBtn = document.getElementById('back-to-top');
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    // Initialize loading screen removal
    const initLoadingScreen = () => {
        const loadingScreen = document.querySelector('.loading-screen');
        if (loadingScreen) {
            setTimeout(() => {
                loadingScreen.style.opacity = '0';
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                    document.body.classList.remove('no-scroll');
                }, 500);
            }, 1500);
        }
    };

    // Initialize animations with staggered effects
    const initAnimations = () => {
        const animateOnScroll = () => {
            const elements = document.querySelectorAll(
                '.animate-pop-in, .animate-slide-in, .project-card, .education-card, .skills-category, .languages, .strengths, .strength-item, .contact-item, .contact-form, .section-title, .animate-strength-in'
            );
            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry, index) => {
                        if (entry.isIntersecting) {
                            entry.target.style.setProperty('--delay', `${index * 0.1}s`);
                            entry.target.classList.add('animated');
                            observer.unobserve(entry.target);
                        }
                    });
                },
                {
                    threshold: 0.1,
                    rootMargin: '0px 0px -50px 0px',
                }
            );

            elements.forEach((element) => {
                setTimeout(() => {
                    observer.observe(element);
                }, 100);
            });
        };
        animateOnScroll();

        // Set index for skill-item fade-in animation
        document.querySelectorAll('.skill-item').forEach((item, index) => {
            item.style.setProperty('--index', index);
        });

        // Set index for strength-item animation
        document.querySelectorAll('.strength-item').forEach((item, index) => {
            item.style.setProperty('--index', index);
        });
    };

    // Toggle mobile menu
    const toggleMenu = () => {
        navLinks.classList.toggle('active');
        menuToggle.classList.toggle('active');
        document.body.classList.toggle('no-scroll', navLinks.classList.contains('active'));
        menuToggle.querySelector('i').classList.toggle('fa-bars');
        menuToggle.querySelector('i').classList.toggle('fa-times');
    };

    // Close menu on link click
    const closeMenuOnLinkClick = () => {
        document.querySelectorAll('.nav-links a').forEach((link) => {
            link.addEventListener('click', () => {
                if (navLinks.classList.contains('active')) toggleMenu();
            });
        });
    };

    // Header scroll effect
    const handleHeaderScroll = () => {
        window.addEventListener('scroll', () => {
            header.classList.toggle('scrolled', window.scrollY > 100);
        });
    };

    // Smooth scrolling
    const initSmoothScrolling = () => {
        document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;

                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    const headerHeight = header.offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth',
                    });
                }
            });
        });
    };

    // Dark mode toggle with enhanced animation
    const initDarkMode = () => {
        const currentTheme = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-theme', currentTheme);

        if (currentTheme === 'dark') {
            themeText.textContent = 'Light Mode';
            themeIcon.classList.replace('fa-moon', 'fa-sun');
            themeToggleBtn.classList.add('active');
        }

        themeToggleBtn.addEventListener('click', () => {
            document.documentElement.classList.add('theme-transition');
            let theme = 'light';
            if (document.documentElement.getAttribute('data-theme') === 'light') {
                theme = 'dark';
                themeText.textContent = 'Light Mode';
                themeIcon.classList.replace('fa-moon', 'fa-sun');
                themeToggleBtn.classList.add('active');
            } else {
                themeText.textContent = 'Dark Mode';
                themeIcon.classList.replace('fa-sun', 'fa-moon');
                themeToggleBtn.classList.remove('active');
            }
            document.documentElement.setAttribute('data-theme', theme);
            localStorage.setItem('theme', theme);

            setTimeout(() => {
                document.documentElement.classList.remove('theme-transition');
            }, 500);
        });
    };

    // Back to top button visibility
    const initBackToTop = () => {
        window.addEventListener('scroll', () => {
            backToTopBtn.classList.toggle('visible', window.scrollY > 300);
        });
    };

    // Contact form submission
    const initContactForm = () => {
        if (contactForm) {
            contactForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                const submitButton = contactForm.querySelector('button[type="submit"]');
                submitButton.disabled = true;
                submitButton.textContent = 'Sending...';
                formStatus.textContent = '';

                try {
                    const response = await fetch(contactForm.action, {
                        method: 'POST',
                        body: new FormData(contactForm),
                        headers: {
                            Accept: 'application/json',
                        },
                    });

                    if (response.ok) {
                        formStatus.textContent = 'Message sent successfully!';
                        formStatus.classList.add('success');
                        formStatus.classList.remove('error');
                        contactForm.reset();
                    } else {
                        throw new Error('Failed to send message');
                    }
                } catch (error) {
                    formStatus.textContent = 'Error sending message. Please try again.';
                    formStatus.classList.add('error');
                    formStatus.classList.remove('success');
                } finally {
                    submitButton.disabled = false;
                    submitButton.textContent = 'Send Message';
                }
            });
        }
    };

    // Button click animation
    const initButtonAnimation = () => {
        document.querySelectorAll('.btn-primary').forEach((button) => {
            button.addEventListener('click', () => {
                if (!button.disabled) {
                    button.classList.add('clicked');
                    setTimeout(() => {
                        button.classList.remove('clicked');
                    }, 100);
                }
            });
        });
    };

    // Initialize all functions
    initLoadingScreen();
    initAnimations();
    if (menuToggle) menuToggle.addEventListener('click', toggleMenu);
    closeMenuOnLinkClick();
    handleHeaderScroll();
    initSmoothScrolling();
    initDarkMode();
    initBackToTop();
    initContactForm();
    initButtonAnimation();
});