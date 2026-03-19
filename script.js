/* ============================================
   Portfolio — Jobin S
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    initCursorGlow();
    initNavbar();
    initTypingEffect();
    initCountUp();
    initSkillBars();
    initScrollReveal();
    initContactForm();
});

/* ---- Cursor Glow ---- */
function initCursorGlow() {
    const glow = document.getElementById('cursorGlow');
    if (!glow) return;
    let mx = 0, my = 0, gx = 0, gy = 0;
    document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
    (function loop() {
        gx += (mx - gx) * 0.07;
        gy += (my - gy) * 0.07;
        glow.style.left = gx + 'px';
        glow.style.top = gy + 'px';
        requestAnimationFrame(loop);
    })();
}

/* ---- Navbar ---- */
function initNavbar() {
    const navbar = document.getElementById('navbar');
    const toggle = document.getElementById('navToggle');
    const links = document.getElementById('navLinks');
    const items = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
        highlightNav();
    });

    toggle.addEventListener('click', () => {
        toggle.classList.toggle('active');
        links.classList.toggle('open');
    });

    items.forEach(link => link.addEventListener('click', () => {
        toggle.classList.remove('active');
        links.classList.remove('open');
    }));

    function highlightNav() {
        const sections = document.querySelectorAll('section[id]');
        const y = window.scrollY + 200;
        sections.forEach(s => {
            const top = s.offsetTop, h = s.offsetHeight, id = s.id;
            if (y >= top && y < top + h) {
                items.forEach(l => l.classList.remove('active'));
                const a = document.querySelector(`.nav-link[href="#${id}"]`);
                if (a) a.classList.add('active');
            }
        });
    }
}

/* ---- Typing Effect ---- */
function initTypingEffect() {
    const el = document.getElementById('typingText');
    if (!el) return;
    const words = ['Dashboard Builder', 'Python Developer', 'Problem Solver', 'BI Enthusiast', 'Data Storyteller'];
    let wi = 0, ci = 0, deleting = false;

    function tick() {
        const word = words[wi];
        el.textContent = deleting
            ? word.substring(0, ci--)
            : word.substring(0, ci++);

        let delay = deleting ? 35 : 70;

        if (!deleting && ci > word.length) {
            delay = 2200;
            deleting = true;
        } else if (deleting && ci < 0) {
            deleting = false;
            wi = (wi + 1) % words.length;
            delay = 500;
        }
        setTimeout(tick, delay);
    }
    tick();
}

/* ---- Count-Up ---- */
function initCountUp() {
    const nums = document.querySelectorAll('.stat-number[data-target]');
    let done = false;

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !done) {
                done = true;
                nums.forEach(n => {
                    const target = parseInt(n.dataset.target, 10);
                    if (isNaN(target)) return;          // skip non-numeric
                    const inc = target / 50;
                    let cur = 0;
                    const step = () => {
                        cur += inc;
                        if (cur < target) {
                            n.textContent = Math.ceil(cur);
                            requestAnimationFrame(step);
                        } else {
                            n.textContent = target;
                        }
                    };
                    step();
                });
            }
        });
    }, { threshold: 0.4 });

    nums.forEach(n => observer.observe(n));
}

/* ---- Skill Bars ---- */
function initSkillBars() {
    const fills = document.querySelectorAll('.skill-fill');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.width = entry.target.dataset.width + '%';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    fills.forEach(f => observer.observe(f));
}

/* ---- Scroll Reveal ---- */
function initScrollReveal() {
    const els = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
    els.forEach(el => observer.observe(el));
}

/* ---- Contact Form ---- */
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const btn = form.querySelector('button[type="submit"]');
        const orig = btn.innerHTML;
        
        // Show loading state
        btn.innerHTML = '<span>Sending... ⏳</span>';

        // Get form data
        const formData = new FormData(form);

        try {
            // Send email via Formsubmit
            const response = await fetch("https://formsubmit.co/ajax/jobinsajeevan007@gmail.com", {
                method: "POST",
                body: formData
            });

            if (response.ok) {
                // Success
                btn.innerHTML = '<span>Message Sent! ✨</span>';
                btn.style.background = 'linear-gradient(135deg, #22c55e, #16a34a)';
                form.reset();
            } else {
                // Error from server
                btn.innerHTML = '<span>Error! Try again ❌</span>';
                btn.style.background = 'linear-gradient(135deg, #ef4444, #dc2626)';
            }
        } catch (error) {
            // Network error
            btn.innerHTML = '<span>Connection Error 🔌</span>';
            btn.style.background = 'linear-gradient(135deg, #ef4444, #dc2626)';
        }

        // Reset button after 3 seconds
        setTimeout(() => {
            btn.innerHTML = orig;
            btn.style.background = '';
        }, 3000);
    });
}
