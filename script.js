/* ═══════════════════════════════════════════════════════════
   PORTFOLIO — INTERACTIVITY & ANIMATIONS
   Floating nav, scroll animations, particles, skill bars
   ═══════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

    // ——— FLOATING NAVIGATION TOGGLE ———
    const navToggle = document.getElementById('nav-toggle');
    const navMenu   = document.getElementById('nav-menu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('open');
        });

        // Close nav when a link is clicked
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navMenu.classList.remove('open');
            });
        });
    }


    // ——— ACTIVE NAV LINK ON SCROLL ———
    const sections = document.querySelectorAll('section[id]');
    const navLinks = navMenu ? navMenu.querySelectorAll('a') : [];

    function setActiveNav() {
        if (!navMenu) return;
        const scrollY = window.scrollY + window.innerHeight / 3;

        sections.forEach(section => {
            const top    = section.offsetTop;
            const height = section.offsetHeight;
            const id     = section.getAttribute('id');

            if (scrollY >= top && scrollY < top + height) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + id) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', setActiveNav, { passive: true });
    setActiveNav();


    // ——— SCROLL REVEAL ANIMATIONS ———
    const observerOptions = {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        revealObserver.observe(el);
    });


    // ——— SKILL BAR ANIMATION ———
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const item  = entry.target;
                const level = item.getAttribute('data-skill');
                const fill  = item.querySelector('.skill-fill');
                fill.style.width = level + '%';
                item.classList.add('animated');
                skillObserver.unobserve(item);
            }
        });
    }, { threshold: 0.3 });

    document.querySelectorAll('.skill-bar-item').forEach(item => {
        skillObserver.observe(item);
    });


    // ——— PARTICLE BACKGROUND ———
    const particlesContainer = document.getElementById('particles');

    if (particlesContainer) {
        function createParticles(count) {
            for (let i = 0; i < count; i++) {
                const p = document.createElement('span');
                p.classList.add('particle');
                p.style.left     = Math.random() * 100 + '%';
                p.style.bottom   = -10 + 'px';
                p.style.width    = (Math.random() * 3 + 1) + 'px';
                p.style.height   = p.style.width;
                p.style.animationDuration = (Math.random() * 8 + 5) + 's';
                p.style.animationDelay    = (Math.random() * 10) + 's';
                p.style.opacity  = (Math.random() * 0.5 + 0.1).toString();
                particlesContainer.appendChild(p);
            }
        }

        // Adjust particle count based on screen width
        const particleCount = window.innerWidth < 600 ? 20 : 45;
        createParticles(particleCount);
    }


    // ——— CONTACT FORM HANDLER ———
    const form = document.getElementById('contact-form');

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const name    = document.getElementById('name').value.trim();
            const email   = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();

            if (!name || !email || !message) return;

            // Show success feedback
            const btn = form.querySelector('.btn-submit');
            const originalHTML = btn.innerHTML;
            btn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
            btn.style.pointerEvents = 'none';
            btn.style.opacity = '0.7';

            // Reset after 3 seconds
            setTimeout(() => {
                btn.innerHTML = originalHTML;
                btn.style.pointerEvents = '';
                btn.style.opacity = '';
                form.reset();
            }, 3000);
        });
    }


    // ——— SMOOTH AUTO-OPEN NAV ON FIRST LOAD ———
    // Give the user a hint that the nav exists
    if (navToggle && navMenu) {
        setTimeout(() => {
            navToggle.classList.add('active');
            navMenu.classList.add('open');

            setTimeout(() => {
                navToggle.classList.remove('active');
                navMenu.classList.remove('open');
            }, 2200);
        }, 1500);
    }

});
