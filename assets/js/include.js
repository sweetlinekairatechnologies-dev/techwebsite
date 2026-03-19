/**
 * include.js — Dynamically loads header and footer components
 * into all pages of the Kaira Technologies website.
 * Uses XMLHttpRequest for broader file:// protocol support,
 * with fallback to inline injection if fetch fails.
 */
(function () {
    'use strict';

    function getBasePath() {
        const path = window.location.pathname;
        if (path.includes('/pages/') || path.includes('/blog-pages/')) return '../components/';
        return 'components/';
    }

    function getPagePath() {
        const path = window.location.pathname;
        if (path.includes('/pages/') || path.includes('/blog-pages/')) return '../';
        return '';
    }

    /* Header HTML template (fallback) */
    function getHeaderHTML() {
        const pagePath = getPagePath();
        return `<header class="site-header" id="siteHeader">
    <div class="header-inner">
        <a href="${pagePath}index.html" class="header-logo">
            <img src="${pagePath}assets/images/logo1.png" alt="Kaira Technologies Logo" class="logo-img" style="height:50px; width: auto;"/>
        </a>
        <nav class="header-nav" id="headerNav">
            <div class="mobile-nav-header">
                <span class="mobile-menu-label"><span class="m-accent">M</span>enu</span>
                <button class="mobile-close" id="mobileClose" aria-label="Close menu">&times;</button>
            </div>
            <a href="${pagePath}index.html" class="nav-link">Home</a>
            <a href="${pagePath}about.html" class="nav-link">About</a>
            <div class="nav-dropdown">
                <div class="nav-dropdown-inner">
                    <a href="${pagePath}services.html" class="nav-link">Services</a>
                    <span class="dropdown-arrow-wrapper" id="servicesToggle">
                        <svg class="dropdown-arrow" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="6 9 12 15 18 9"></polyline>
                        </svg>
                    </span>
                </div>
                <div class="dropdown-menu">
                    <a href="${pagePath}social-media-marketing.html" class="dropdown-item">Social Media Marketing</a>
                    <a href="${pagePath}website-development.html" class="dropdown-item">Website Development</a>
                    <a href="${pagePath}local-seo.html" class="dropdown-item">Local SEO</a>
                    <a href="${pagePath}google-seo.html" class="dropdown-item">Search Engine Optimization</a>
                    <a href="${pagePath}meta-ads.html" class="dropdown-item">Meta (Facebook & Instagram) Ads</a>
                    <a href="${pagePath}reels-making&brand-videos.html" class="dropdown-item">Reels Making & Brand Videos</a>
                    <a href="${pagePath}creative-poster-design-services.html" class="dropdown-item">Creative Poster Designs</a>
                </div>
            </div>
            <a href="${pagePath}blog.html" class="nav-link">Blogs</a>
            <a href="${pagePath}career.html" class="nav-link">Carrier</a>
            <a href="${pagePath}contact.html" class="nav-link">Contact</a>
        </nav>
        <a href="${pagePath}contact.html" class="header-cta" style="color: #000;">
            Let's Talk
            <span class="cta-arrow">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
            </span>
        </a>
        <button class="mobile-toggle" id="mobileToggle" aria-label="Toggle menu">
            <span></span><span></span><span></span>
        </button>
    </div>
</header>`;
    }

    /* Footer HTML template — synced with components/footer.html */
    function getFooterHTML() {
        const pagePath = getPagePath();
        return `<footer class="ct-footer">
    <div class="ct-footer-top">
        <div class="ct-footer-cta fade-up">
            <h2 class="ct-footer-heading">
                Take your brand to<br>the next level with<br><span class="ct-brand-accent">Kaira</span>
            </h2>
            <a href="${pagePath}contact.html" class="ct-talk-btn">
                Let's talk
                <span class="ct-talk-arrow">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                    </svg>
                </span>
            </a>
        </div>
        <div class="ct-footer-cols fade-up">
            <div class="ct-col">
                <h4>Company</h4>
                <a href="${pagePath}index.html">Home</a>
                <a href="${pagePath}about.html">About us</a>
                <a href="${pagePath}services.html">Service</a>
                <a href="${pagePath}blog.html">Blog</a>
                <a href="${pagePath}career.html">Career</a>
            </div>
            <div class="ct-col">
                <h4>Send a Message</h4>
                <a href="mailto:kairateamkvp@gmail.com">kairateamkvp@gmail.com</a>
                <a href="mailto:info@kairatechnologies.in">info@kairatechnologies.in</a>
            </div>
            <div class="ct-col">
                <h4>Call us</h4>
                <a href="tel:+916379430293">+91 6379 430 293</a>
                <a href="tel:+919876543210">+91 9876 543 210</a>
            </div>
        </div>
    </div>
    <div class="ct-footer-social fade-up">
        <a href="#" title="LinkedIn"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4V9h4v2a6 6 0 0 1 2-1.8A6 6 0 0 1 16 8zM2 9h4v12H2z" /><circle cx="4" cy="4" r="2" /></svg></a>
        <a href="#" title="Instagram"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg></a>
        <a href="#" title="X"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg></a>
        <a href="#" title="Facebook"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg></a>
        <a href="#" title="YouTube"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg></a>
    </div>
    <div class="ct-footer-bottom">
        <p>&copy; 2026 Kaira Technologies. All rights reserved.</p>
    </div>
</footer>`;
    }

    function injectComponent(placeholderId, html) {
        const placeholder = document.getElementById(placeholderId);
        if (!placeholder) return;
        placeholder.innerHTML = html;
    }

    function highlightActiveNav() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        document.querySelectorAll('.nav-link').forEach(link => {
            const linkPage = link.getAttribute('href').split('/').pop();
            if (linkPage === currentPage) link.classList.add('active');
        });
    }

    function initMobileToggle() {
        const toggle = document.getElementById('mobileToggle');
        const closeBtn = document.getElementById('mobileClose');
        const nav = document.getElementById('headerNav');
        if (!toggle || !nav) return;

        const openMenu = () => {
            toggle.classList.add('open');
            nav.classList.add('open');
            document.body.style.overflow = 'hidden';
        };

        const closeMenu = () => {
            toggle.classList.remove('open');
            nav.classList.remove('open');
            document.body.style.overflow = '';
        };

        toggle.addEventListener('click', openMenu);
        if (closeBtn) closeBtn.addEventListener('click', closeMenu);

        nav.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                if (!link.classList.contains('dropdown-toggle')) {
                    closeMenu();
                }
            });
        });

        const dropdownEl = nav.querySelector('.nav-dropdown');
        const servicesToggle = document.getElementById('servicesToggle');
        if (dropdownEl && servicesToggle) {
            servicesToggle.addEventListener('click', (e) => {
                e.stopPropagation();
                dropdownEl.classList.toggle('mobile-open');
            });
        }
    }

    function initFadeUpAnimations() {
        const fadeEls = document.querySelectorAll('.fade-up');
        if (!fadeEls.length) return;
        const fadeObs = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) entry.target.classList.add('visible');
            });
        }, { threshold: 0.15 });
        fadeEls.forEach(el => fadeObs.observe(el));
    }

    function initHeaderScroll() {
        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    const header = document.getElementById('siteHeader');
                    if (header) header.classList.toggle('scrolled', window.scrollY > 60);
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });
    }

    // ── Load components when DOM is ready ──
    document.addEventListener('DOMContentLoaded', () => {
        // Directly inject header and footer HTML (works with file:// protocol)
        injectComponent('header-placeholder', getHeaderHTML());
        injectComponent('footer-placeholder', getFooterHTML());

        highlightActiveNav();
        initMobileToggle();
        initHeaderScroll();

        // Delay fade-up init to let footer render
        setTimeout(initFadeUpAnimations, 100);
    });
})();
