document.addEventListener('DOMContentLoaded', () => {
    const intro = document.getElementById('portfolioIntro');
    const introContinue = document.getElementById('introContinue');
    const form = document.getElementById('miniContactForm');
    const nextInput = document.getElementById('_next');
    const successBox = document.getElementById('formSuccess');
    const header = document.querySelector('.navbar');
    const navMenu = document.querySelector('.nav-menu');
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelectorAll('.navbar nav a');
    const reveals = document.querySelectorAll('.reveal');

    // Show the welcome intro on every page load/refresh. Continue dismisses it for the current visit.
    if (intro) {
        document.body.classList.add('intro-lock');
        intro.setAttribute('aria-hidden', 'false');

        if (introContinue) {
            Object.assign(introContinue.style, {
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                marginTop: '26px',
                padding: '11px 22px',
                border: '1px solid #4f7cff',
                borderRadius: '7px',
                background: '#4f7cff',
                color: '#fff',
                fontSize: '15px',
                fontWeight: '700',
                cursor: 'pointer',
                transition: 'transform 180ms ease, background 180ms ease'
            });

            introContinue.addEventListener('mouseenter', () => {
                introContinue.style.background = '#3f69db';
                introContinue.style.transform = 'translateY(-2px)';
            });
            introContinue.addEventListener('mouseleave', () => {
                introContinue.style.background = '#4f7cff';
                introContinue.style.transform = 'translateY(0)';
            });
        }

        const closeIntro = () => {
            if (intro.classList.contains('hidden')) return;
            intro.classList.add('hidden');
            intro.setAttribute('aria-hidden', 'true');
            document.body.classList.remove('intro-lock');
        };

        if (introContinue) introContinue.addEventListener('click', closeIntro);
        window.setTimeout(closeIntro, 7000);
    }

    if (window.location.search.includes('sent=1') && successBox) {
        successBox.classList.remove('hidden');
        successBox.setAttribute('aria-hidden', 'false');
    }

    if (form) {
        form.addEventListener('submit', (event) => {
            const name = document.getElementById('c_name')?.value.trim();
            const email = document.getElementById('c_email')?.value.trim();
            const message = document.getElementById('c_message')?.value.trim();

            if (!name || !email || !message) {
                event.preventDefault();
                alert('Please fill Name, Email and Message.');
                return;
            }

            if (nextInput) {
                nextInput.value = `${window.location.origin}${window.location.pathname}?sent=1`;
            }
        });
    }

    if (reveals.length && 'IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries, currentObserver) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                const element = entry.target;
                const delay = Number(element.dataset.revealDelay || 0);
                element.style.transitionDelay = `${delay}ms`;
                element.classList.add('visible');

                element.querySelectorAll('.skill-item').forEach((item) => {
                    const itemDelay = Number(item.dataset.skillDelay || 0);
                    item.style.transitionDelay = `${delay + itemDelay}ms`;
                });

                currentObserver.unobserve(element);
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

        reveals.forEach((element) => observer.observe(element));
    } else {
        reveals.forEach((element) => element.classList.add('visible'));
    }

    const updateHeader = () => {
        if (header) header.classList.toggle('shrink', window.scrollY > 60);
    };

    updateHeader();
    window.addEventListener('scroll', updateHeader, { passive: true });

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        navMenu.querySelectorAll('a').forEach((link) => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    const sections = document.querySelectorAll('section[id]');
    if (sections.length && navLinks.length && 'IntersectionObserver' in window) {
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                const link = document.querySelector(`.navbar nav a[href="#${entry.target.id}"]`);
                if (!link) return;
                navLinks.forEach((item) => item.classList.remove('active'));
                link.classList.add('active');
            });
        }, { threshold: 0.45 });

        sections.forEach((section) => sectionObserver.observe(section));
    }
});
