/* ── Navbar scroll ── */
window.addEventListener('scroll', () => {
  document.getElementById('gnav').classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

/* ── Custom cursor ── */
const cdot = document.getElementById('cdot');
const cring = document.getElementById('cring');
let mx = 0, my = 0, rx = 0, ry = 0;
const lp = (a, b, t) => a + (b - a) * t;
document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
(function loop() {
  cdot.style.left = mx + 'px'; cdot.style.top = my + 'px';
  rx = lp(rx, mx, .1); ry = lp(ry, my, .1);
  cring.style.left = rx + 'px'; cring.style.top = ry + 'px';
  requestAnimationFrame(loop);
})();
document.querySelectorAll('a, button, .logo-pill').forEach(el => {
  el.addEventListener('mouseenter', () => document.body.classList.add('ch'));
  el.addEventListener('mouseleave', () => document.body.classList.remove('ch'));
});

gsap.registerPlugin(ScrollTrigger);

const isMobile = () => window.innerWidth <= 900;

// ── Desktop horizontal scroll ──
function initDesktop() {
  const track = document.getElementById('cardsTrack');
  const outer = document.getElementById('stickyOuter');
  const fill = document.getElementById('progressFill');
  const count = document.getElementById('progressCount');
  const cards = track.querySelectorAll('.card');

  const getScrollAmount = () => {
    const trackW = track.scrollWidth;
    const viewW = track.parentElement.offsetWidth;
    return -(trackW - viewW + 60);
  };

  ScrollTrigger.create({
    trigger: outer,
    start: 'top top',
    end: () => `+=${Math.abs(getScrollAmount()) + window.innerHeight * 0.5}`,
    pin: '#stickyPin',
    scrub: 1,
    anticipatePin: 1,
    onUpdate: self => {
      const prog = self.progress;
      gsap.set(track, { x: getScrollAmount() * prog });
      fill.style.width = (prog * 100) + '%';
      const cardIdx = Math.min(Math.floor(prog * 6), 5);
      count.textContent = `0${cardIdx + 1} / 06`;
    },
    invalidateOnRefresh: true
  });

  gsap.from(cards, {
    scrollTrigger: {
      trigger: outer,
      start: 'top 80%',
      toggleActions: 'play none none none'
    },
    y: 60, opacity: 0, stagger: 0.08, duration: 0.9, ease: 'power3.out'
  });

  window.addEventListener('resize', () => ScrollTrigger.refresh());
}

// ── Mobile slider ──
function initMobile() {
  const viewport = document.querySelector('.cards-viewport');
  const mobileCards = document.querySelectorAll('.card');
  const dots = document.querySelectorAll('.mobile-dot');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const countEl = document.getElementById('mobileCount');
  const fillEl = document.getElementById('progressFill');
  let current = 0;
  const total = mobileCards.length;

  function getCardWidth() {
    return mobileCards[0].offsetWidth + 14;
  }

  function goTo(idx) {
    idx = Math.max(0, Math.min(total - 1, idx));
    current = idx;
    viewport.scrollTo({ left: getCardWidth() * idx, behavior: 'smooth' });
    updateUI();
  }

  function updateUI() {
    dots.forEach((d, i) => d.classList.toggle('active', i === current));
    countEl.textContent = `0${current + 1} / 0${total}`;
    fillEl.style.width = ((current / (total - 1)) * 100) + '%';
    prevBtn.classList.toggle('disabled', current === 0);
    nextBtn.classList.toggle('disabled', current === total - 1);
  }

  dots.forEach(d => d.addEventListener('click', () => goTo(+d.dataset.idx)));
  prevBtn.addEventListener('click', () => goTo(current - 1));
  nextBtn.addEventListener('click', () => goTo(current + 1));

  let scrollTimer;
  viewport.addEventListener('scroll', () => {
    clearTimeout(scrollTimer);
    scrollTimer = setTimeout(() => {
      const w = getCardWidth();
      const idx = Math.round(viewport.scrollLeft / w);
      if (idx !== current) { current = idx; updateUI(); }
    }, 80);
  }, { passive: true });

  let touchStartX = 0;
  viewport.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
  viewport.addEventListener('touchend', e => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) goTo(diff > 0 ? current + 1 : current - 1);
  }, { passive: true });

  gsap.from(mobileCards, {
    y: 50, opacity: 0, stagger: 0.1, duration: 0.7, ease: 'power3.out', delay: 0.2
  });

  updateUI();
}

// ── Init based on viewport ──
if (isMobile()) {
  const mobileInitCards = Array.from(document.querySelectorAll('.card'));
  if (mobileInitCards.length) { gsap.from(mobileInitCards, {
    y: 40, opacity: 0, stagger: 0.1, duration: 0.6, ease: 'power3.out', delay: 0.1
  }); }
} else {
  if (document.getElementById('cardsTrack')) { initDesktop(); }
}

// ── Default cursor always visible on desktop ──
if (!isMobile()) {
  document.querySelectorAll('.card').forEach(el => {
    el.style.cursor = 'default';
  });
}

// service started
document.addEventListener("DOMContentLoaded", () => {
  const svcCards = document.querySelectorAll('.service-card');
  const stickyText = document.getElementById('stickyText');
  const stickyEmoji = document.getElementById('stickyEmoji');

  let activeText = "SEO";
  const rightCards = Array.from(svcCards).slice(1);

  window.addEventListener('scroll', () => {
    let newActiveText = "SEO";
    let newActiveEmoji = "🚀";

    for (let i = rightCards.length - 1; i >= 0; i--) {
      const rect = rightCards[i].getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.65) {
        newActiveText = rightCards[i].getAttribute('data-text');
        newActiveEmoji = rightCards[i].getAttribute('data-emoji');
        break;
      }
    }

    if (newActiveText !== activeText) {
      activeText = newActiveText;
      stickyText.style.opacity = '0';
      if (stickyEmoji) stickyEmoji.style.opacity = '0';

      setTimeout(() => {
        stickyText.textContent = newActiveText;
        if (stickyEmoji) stickyEmoji.textContent = newActiveEmoji;

        if (newActiveText.length > 4) {
          stickyText.style.fontSize = "clamp(4.5rem, 8vw, 7rem)";
        } else {
          stickyText.style.fontSize = "clamp(7rem, 14vw, 11.5rem)";
        }

        stickyText.style.opacity = '1';
        if (stickyEmoji) stickyEmoji.style.opacity = '1';
      }, 300);
    }
  });
});

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

window.addEventListener('load', () => {
const maskPath = document.querySelector("#maskPath");
if (!maskPath) return;
const maskLength = maskPath.getTotalLength();
gsap.set("#maskPath", { strokeDasharray: maskLength, strokeDashoffset: maskLength });

gsap.set(".rocket", {
  motionPath: {
    path: "#rocketPath",
    align: "#rocketPath",
    autoRotate: 45,
    alignOrigin: [0.5, 0.5],
    start: 0,
    end: 0
  }
});

gsap.to(".rocket", {
  scrollTrigger: {
    trigger: ".timeline-wrapper",
    start: "top 20%",
    end: "+=1200",
    scrub: 1,
    pin: true,
    onUpdate: (self) => {
      gsap.set("#maskPath", { strokeDashoffset: maskLength * (1 - self.progress) });
    }
  },
  motionPath: {
    path: "#rocketPath",
    align: "#rocketPath",
    autoRotate: 45,
    alignOrigin: [0.5, 0.5],
    start: 0,
    end: 1
  },
  ease: "none"
});
}); // end window load

const stackCards = gsap.utils.toArray(".stack-card");
stackCards.forEach((card, index) => {
  if (index !== stackCards.length - 1) {
    gsap.to(card, {
      scale: 0.92,

      boxShadow: "0 -20px 60px rgba(0,0,0,0.8)",
      scrollTrigger: {
        trigger: stackCards[index + 1],
        start: `top center`,
        end: `top ${100 + (index * 20) + 10}px`,
        scrub: true,
      }
    });
  }
});

// --- SUCCESS STORIES SCROLL ANIMATION ---
// gsap.from(".success-section .rating-card", {
//   scrollTrigger: {
//     trigger: ".success-section",
//     start: "top 85%",
//     toggleActions: "play none none none"
//   },
//   x: -100,
//   opacity: 0,
//   duration: 1,
//   ease: "power3.out"
// });

// gsap.from(".success-section .testimonial-card-main", {
//   scrollTrigger: {
//     trigger: ".success-section",
//     start: "top 85%",
//     toggleActions: "play none none none"
//   },
//   x: 100,
//   opacity: 0,
//   duration: 1,
//   ease: "power3.out"
// });

// Testimonial carousel is handled by inline script in index.html

// client
const marqueeTrackEl = document.getElementById('marqueeTrack');
marqueeTrackEl.innerHTML += marqueeTrackEl.innerHTML;

const halfWidth = marqueeTrackEl.scrollWidth / 2;
let currentX = 0;
let lastScroll = window.scrollY;
let velocity = 0;
let raf = null;

const SCROLL_RATIO = 0.4;

function lerp(a, b, t) { return a + (b - a) * t; }

function animate() {
  velocity = lerp(velocity, 0, 0.08);
  currentX += velocity;

  if (currentX <= -halfWidth) currentX += halfWidth;
  if (currentX >= 0) currentX -= halfWidth;

  marqueeTrackEl.style.transform = `translateX(${currentX}px)`;

  if (Math.abs(velocity) > 0.1) {
    raf = requestAnimationFrame(animate);
  } else {
    raf = null;
  }
}

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  const delta = scrollY - lastScroll;
  lastScroll = scrollY;

  velocity += delta * SCROLL_RATIO * -1;

  if (!raf) {
    raf = requestAnimationFrame(animate);
  }
}, { passive: true });

window.addEventListener('wheel', (e) => {
  velocity += e.deltaY * SCROLL_RATIO * -0.2;
  if (!raf) {
    raf = requestAnimationFrame(animate);
  }
}, { passive: true });

// ── Fullscreen Menu Toggle ──
const menuBtn = document.querySelector('.logo-pill');
const mobileMenuBtn = document.querySelector('.nav-mobile-toggle');
const closeBtn = document.getElementById('fsCloseBtn');
const fsMenu = document.getElementById('fsMenu');

function openMenu() {
  if (fsMenu) fsMenu.classList.add('open');
}

function closeMenu() {
  if (fsMenu) fsMenu.classList.remove('open');
}

if (menuBtn) menuBtn.addEventListener('click', openMenu);
if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', openMenu);
if (closeBtn) closeBtn.addEventListener('click', closeMenu);

const fsLinks = document.querySelectorAll('.fs-link');
fsLinks.forEach(link => {
  link.addEventListener('click', () => {
    closeMenu();
  });
});



 document.addEventListener('DOMContentLoaded', () => {
            const applyModalEl = document.getElementById('applyModal');
            if (applyModalEl) {
                const applyModal = new bootstrap.Modal(applyModalEl);
                document.querySelectorAll('.career-card').forEach(card => {
                    card.addEventListener('click', () => {
                        // Extract Title
                        const titleEl = card.querySelector('.career-title');
                        if (titleEl) {
                            const title = titleEl.innerText.trim();
                            const roleSelect = document.getElementById('roleSelect');

                            // Iterate to find the matching role
                            Array.from(roleSelect.options).forEach(opt => {
                                if (opt.text === title || opt.value === title) {
                                    opt.selected = true;
                                }
                            });
                        }
                        // Open UI Modal
                        applyModal.show();
                    });
                });
            }
        });
