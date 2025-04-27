document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    menuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        this.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuToggle.classList.remove('active');
        });
    });

    // Sticky Header on Scroll
    const header = document.querySelector('header');
    window.addEventListener('scroll', function() {
        header.classList.toggle('scrolled', window.scrollY > 100);
    });

    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Animate Elements on Scroll with Intersection Observer
    const animateElements = function() {
        const elements = document.querySelectorAll('.animate-pop-in, .animate-slide-in');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = entry.target.classList.contains('animate-pop-in') 
                        ? 'scale(1)' 
                        : 'translateY(0)';
                }
            });
        }, {
            threshold: 0.1
        });

        elements.forEach(element => {
            observer.observe(element);
        });
    };

    // Initialize animations
    animateElements();

    // Form Submission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const subject = this.querySelector('input[type="text"]:nth-of-type(2)').value;
            const message = this.querySelector('textarea').value;
            
            // Here you would typically send the form data to a server
            console.log({ name, email, subject, message });
            
            alert('Thank you for your message! I will get back to you soon.');
            this.reset();
        });
    }

    // Add animation delays to elements
    const addAnimationDelays = function() {
        // Timeline items
        const timelineItems = document.querySelectorAll('.timeline-item');
        timelineItems.forEach((item, index) => {
            item.style.animationDelay = `${index * 0.2}s`;
        });

        // Education cards
        const educationCards = document.querySelectorAll('.education-card');
        educationCards.forEach((card, index) => {
            card.style.animationDelay = `${index * 0.15}s`;
        });

        // Skills categories
        const skillsCategories = document.querySelectorAll('.skills-category');
        skillsCategories.forEach((category, index) => {
            category.style.animationDelay = `${index * 0.2}s`;
        });

        // Strength items
        const strengthItems = document.querySelectorAll('.strength-item');
        strengthItems.forEach((item, index) => {
            item.style.animationDelay = `${index * 0.1}s`;
        });
    };

    // Initialize animation delays
    addAnimationDelays();
});