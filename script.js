document.addEventListener('DOMContentLoaded', () => {
    const intro = document.getElementById('portfolioIntro');
    const form = document.getElementById('miniContactForm');
    const nextInput = document.getElementById('_next');
    const successBox = document.getElementById('formSuccess');
    const header = document.querySelector('.navbar');
    const navMenu = document.querySelector('.nav-menu');
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelectorAll('.navbar nav a');
    const reveals = document.querySelectorAll('.reveal');

    // Show the welcome intro only on the first visit to this portfolio.
    // Refreshing or returning to the Home page will not show it again.
    if (intro) {
        const introSeenKey = 'divakarPortfolioIntroSeen';
        let hasSeenIntro = false;

        try {
            hasSeenIntro = localStorage.getItem(introSeenKey) === 'true';
        } catch (error) {
            hasSeenIntro = false;
        }

        if (hasSeenIntro) {
            intro.classList.add('hidden');
        } else {
            document.body.classList.add('intro-lock');
            intro.setAttribute('aria-hidden', 'false');

            try {
                localStorage.setItem(introSeenKey, 'true');
            } catch (error) {
                // Continue normally if browser storage is unavailable.
            }

            window.setTimeout(() => {
                intro.classList.add('hidden');
                intro.setAttribute('aria-hidden', 'true');
                document.body.classList.remove('intro-lock');
            }, 2400);
        }
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
