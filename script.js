// Portfolio JavaScript - Retro Futuristic Design

// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
    body.classList.add('light');
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('light');
    
    // Save preference
    if (body.classList.contains('light')) {
        localStorage.setItem('theme', 'light');
    } else {
        localStorage.setItem('theme', 'dark');
    }
});

// Mobile Menu Toggle
const mobileToggle = document.getElementById('mobileToggle');
const navMenu = document.querySelector('.nav-menu');

mobileToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    navMenu.classList.toggle('active');
    
    // Animate hamburger
    const spans = mobileToggle.querySelectorAll('span');
    if (navMenu.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translateY(7px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translateY(-7px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!mobileToggle.contains(e.target) && !navMenu.contains(e.target)) {
        if (navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            const spans = mobileToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    }
});

// Close mobile menu on link click
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const spans = mobileToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-item');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop - 150) {
            current = section.getAttribute('id');
        }
    });
    
    navItems.forEach(item => {
        item.classList.remove('active');
        const href = item.getAttribute('href');
        if (href === `#${current}`) {
            item.classList.add('active');
        }
    });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Contact Form with EmailJS
const contactForm = document.getElementById("contactForm");
const sendBtn = document.getElementById("sendBtn");

// Initialize EmailJS with your public key
emailjs.init("WVuI4iijgNv1mcJ2J");

contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Update button state
    sendBtn.textContent = "Sending...";
    sendBtn.disabled = true;

    // Send form via EmailJS
    emailjs.sendForm(
        "service_fnvqzak",      // Your Service ID
        "template_4x59y08",      // Your Template ID
        this
    )
    .then(() => {
        // Success feedback
        alert("Message sent successfully! ✅");
        sendBtn.textContent = "Send Message";
        sendBtn.disabled = false;
        contactForm.reset();
    })
    .catch((error) => {
        // Error feedback
        console.error("EmailJS error:", error);
        alert("Failed to send message. Please try again. ❌");
        sendBtn.textContent = "Send Message";
        sendBtn.disabled = false;
    });
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation on scroll
document.querySelectorAll('.project-card, .stat-card, .about-text, .contact-info').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Parallax effect for hero background
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero-bg');
    if (hero && scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Add glitch effect to logo on hover
const logo = document.querySelector('.logo');
if (logo) {
    logo.addEventListener('mouseenter', () => {
        const text = logo.querySelector('.logo-text');
        const originalText = text.textContent;
        let iterations = 0;
        
        const glitchInterval = setInterval(() => {
            text.textContent = originalText
                .split('')
                .map((char, index) => {
                    if (index < iterations) {
                        return originalText[index];
                    }
                    return String.fromCharCode(65 + Math.floor(Math.random() * 26));
                })
                .join('');
            
            iterations += 1/3;
            
            if (iterations >= originalText.length) {
                clearInterval(glitchInterval);
                text.textContent = originalText;
            }
        }, 30);
    });
}

// Console message
console.log('%c🚀 Portfolio Loaded Successfully!', 'color: #00f0ff; font-size: 16px; font-weight: bold;');
console.log('%cBuilt with passion and creativity', 'color: #ff00ff; font-size: 12px;');
