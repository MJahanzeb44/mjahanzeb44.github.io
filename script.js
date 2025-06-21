// Theme Toggle Functionality
const themeToggleBtn = document.querySelector('.theme-toggle-btn');
const body = document.body;
const themeTextInner = document.querySelector('.theme-text-inner');
let isDarkTheme = localStorage.getItem('theme') === 'dark';

if (isDarkTheme) {
    body.setAttribute('data-theme', 'dark');
    themeTextInner.textContent = 'Light';
    themeToggleBtn.classList.add('active');
}

themeToggleBtn.addEventListener('click', () => {
    isDarkTheme = !isDarkTheme;
    body.classList.add('theme-transition');
    body.setAttribute('data-theme', isDarkTheme ? 'dark' : 'light');
    themeTextInner.textContent = isDarkTheme ? 'Light' : 'Dark';
    themeToggleBtn.classList.toggle('active');
    localStorage.setItem('theme', isDarkTheme ? 'dark' : 'light');
    updateParticlesColor();
    setTimeout(() => body.classList.remove('theme-transition'), 1000); // Match CSS duration
});

// Menu Toggle for Mobile
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    body.classList.toggle('no-scroll');
    menuToggle.innerHTML = navLinks.classList.contains('active') ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
});

// Close mobile menu when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        body.classList.remove('no-scroll');
        menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    });
});

// Scroll Animations
const animateElements = document.querySelectorAll('.animate-pop-in, .animate-slide-in, .animate-language-card, .animate-grow-in, .animate-fade-in, .animate-slide-up, .animate-scale-in');
const observerOptions = {
    threshold: 0.15, // Refined for earlier trigger
    rootMargin: '0px 0px -30px 0px' // Refined for smoother scroll
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');
            if (entry.target.classList.contains('animate-language-card')) {
                const progressCircle = entry.target.querySelector('.progress-circle-fill');
                if (progressCircle) {
                    entry.target.style.setProperty('--progress', progressCircle.dataset.progress || '');
                }
            }
            const delay = entry.target.dataset.animationDelay || '0s';
            entry.target.style.transitionDelay = delay;
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

animateElements.forEach(el => observer.observe(el));

// Return to Top Button
const returnToTop = document.querySelector('.return-to-top');
window.addEventListener('scroll', () => {
    returnToTop.classList.toggle('visible', window.scrollY > 300);
});

returnToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Ripple Effect for Buttons
document.querySelectorAll('.ripple-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        btn.classList.add('clicked');
        setTimeout(() => btn.classList.remove('clicked'), 600);
    });
});

// Particles.js Configuration
function updateParticlesColor() {
    particlesJS('particles-js-global', {
        particles: {
            number: { value: 100, density: { enable: true, value_area: 800 } },
            color: { value: isDarkTheme ? '#ffffff' : '#7b2cbf' },
            shape: { type: 'circle' },
            opacity: { value: 0.5, random: true },
            size: { value: 4, random: true },
            line_linked: { enable: false },
            move: { enable: true, speed: 3, direction: 'none', random: true, straight: false, out_mode: 'out' }
        },
        interactivity: {
            detect_on: 'canvas',
            events: { onhover: { enable: true, mode: 'repulse' }, onclick: { enable: true, mode: 'push' }, resize: true },
            modes: { repulse: { distance: 100, duration: 0.4 }, push: { particles_nb: 4 } }
        },
        retina_detect: true
    });
}

// Initialize particles
updateParticlesColor();

// Leaflet Map Configuration
const map = L.map('map').setView([24.8607, 67.0011], 12);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);
L.marker([24.8607, 67.0011]).addTo(map).bindPopup('Karachi, Pakistan').openPopup();

// Form Validation and Submission
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    clearErrors();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();

    let hasError = false;

    if (!name) {
        showError('name-error', 'Name is required');
        hasError = true;
    }
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
        showError('email-error', 'Valid email is required');
        hasError = true;
    }
    if (!subject) {
        showError('subject-error', 'Subject is required');
        hasError = true;
    }
    if (!message) {
        showError('message-error', 'Message is required');
        hasError = true;
    }

    if (!hasError) {
        try {
            const response = await fetch(contactForm.action, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                body: JSON.stringify({ name, email, subject, message })
            });

            if (response.ok) {
                formStatus.classList.add('success');
                formStatus.textContent = 'Message sent successfully!';
                contactForm.reset();
            } else {
                throw new Error('Failed to send message');
            }
        } catch (error) {
            formStatus.classList.add('error');
            formStatus.textContent = 'Failed to send message. Please try again.';
        }
    }
});

function showError(id, message) {
    const errorEl = document.getElementById(id);
    errorEl.textContent = message;
    errorEl.classList.add('active');
}

function clearErrors() {
    document.querySelectorAll('.form-error').forEach(el => {
        if (el.textContent) {
            el.textContent = '';
            el.classList.remove('active');
        }
    });
    formStatus.textContent = '';
    formStatus.classList.remove('success', 'error');
}

// Accordion for Certifications
document.querySelectorAll('.accordion-toggle').forEach(button => {
    button.addEventListener('click', () => {
        const content = button.nextElementSibling;
        const isExpanded = button.getAttribute('aria-expanded') === 'true';
        button.setAttribute('aria-expanded', !isExpanded);
        content.classList.toggle('expanded');
        button.textContent = isExpanded ? 'Show More' : 'Show Less';
    });
});

// Vanilla Tilt for Project Cards
VanillaTilt.init(document.querySelectorAll('[data-tilt]'), {
    max: 15,
    speed: 400,
    glare: true,
    'max-glare': 0.5
});

// Header Scroll Effect
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    const currentScroll = window.scrollY;

    if (currentScroll > lastScroll && currentScroll > 100) {
        header.style.transform = 'translateY(-100%)';
    } else {
        header.style.transform = 'translateY(0)';
    }
    header.classList.toggle('scrolled', currentScroll > 50);
    lastScroll = currentScroll;
});

// Loading Screen
window.addEventListener('load', () => {
    const loadingScreen = document.querySelector('.loading-screen');
    loadingScreen.style.opacity = '0';
    setTimeout(() => loadingScreen.style.display = 'none', 500);
});