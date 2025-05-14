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
        }

        themeToggleBtn.addEventListener('click', () => {
            document.documentElement.classList.add('theme-transition');

            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';

            themeToggleBtn.classList.add('active');

            const ripple = document.createElement('div');
            ripple.className = 'theme-ripple';
            document.body.appendChild(ripple);

            setTimeout(() => {
                ripple.style.transform = 'scale(30)';
                ripple.style.opacity = '0';
            }, 10);

            setTimeout(() => {
                document.documentElement.setAttribute('data-theme', newTheme);
                localStorage.setItem('theme', newTheme);

                themeText.textContent = newTheme === 'dark' ? 'Light Mode' : 'Dark Mode';
                themeIcon.classList.replace(
                    newTheme === 'dark' ? 'fa-moon' : 'fa-sun',
                    newTheme === 'dark' ? 'fa-sun' : 'fa-moon'
                );

                setTimeout(() => {
                    ripple.remove();
                }, 500);

                setTimeout(() => {
                    document.documentElement.classList.remove('theme-transition');
                    themeToggleBtn.classList.remove('active');
                }, 500);
            }, 200);
        });
    };

    // Back to top button functionality
    const initBackToTop = () => {
        if (backToTopBtn) {
            window.addEventListener('scroll', () => {
                if (window.pageYOffset > 300) {
                    backToTopBtn.classList.add('visible');
                } else {
                    backToTopBtn.classList.remove('visible');
                }
            });

            backToTopBtn.addEventListener('click', (e) => {
                e.preventDefault();
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth',
                });
            });
        }
    };

    // Contact form submission
    const initContactForm = () => {
        console.log('Initializing contact form...');
        if (contactForm) {
            console.log('Contact form found:', contactForm);
            const submitButton = contactForm.querySelector('button[type="submit"]');
            submitButton.addEventListener('click', () => {
                submitButton.classList.add('clicked');
                setTimeout(() => {
                    submitButton.classList.remove('clicked');
                }, 100);
            });

            contactForm.addEventListener('submit', async (e) => {
                console.log('Form submitted');
                e.preventDefault();

                // Client-side validation
                const name = contactForm.querySelector('#name').value.trim();
                const email = contactForm.querySelector('#email').value.trim();
                const subject = contactForm.querySelector('#subject').value.trim();
                const message = contactForm.querySelector('#message').value.trim();
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

                if (!name || !email || !subject || !message) {
                    formStatus.textContent = 'Please fill in all required fields.';
                    formStatus.className = 'form-message error';
                    console.log('Validation failed: Missing required fields');
                    return;
                }

                if (!emailRegex.test(email)) {
                    formStatus.textContent = 'Please enter a valid email address.';
                    formStatus.className = 'form-message error';
                    console.log('Validation failed: Invalid email');
                    return;
                }

                formStatus.textContent = 'Sending...';
                formStatus.className = 'form-message';
                console.log('Sending form data to Formspree...');

                try {
                    const response = await fetch('https://formspree.io/f/mvgavgpq', {
                        method: 'POST',
                        body: new FormData(contactForm),
                        headers: {
                            Accept: 'application/json',
                        },
                    });

                    if (response.ok) {
                        formStatus.textContent = 'Thank you! Your message has been sent.';
                        formStatus.className = 'form-message success';
                        contactForm.reset();
                        console.log('Form submission successful');
                    } else {
                        throw new Error(`Form submission failed with status: ${response.status}`);
                    }
                } catch (error) {
                    formStatus.textContent = 'Failed to send message. Please try again.';
                    formStatus.className = 'form-message error';
                    console.error('Form submission error:', error);
                }

                // Clear status message after 5 seconds
                setTimeout(() => {
                    formStatus.textContent = '';
                    formStatus.className = 'form-message';
                }, 5000);
            });
        } else {
            console.error('Contact form not found! Check #contact-form ID.');
        }
    };

    // Initialize all
    const init = () => {
        initLoadingScreen();
        initAnimations();
        menuToggle.addEventListener('click', toggleMenu);
        closeMenuOnLinkClick();
        handleHeaderScroll();
        initSmoothScrolling();
        initDarkMode();
        initBackToTop();
        initContactForm();
    };

    init();
});