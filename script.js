/* ==========================================================================
   UNIVERSAL FITNESS HUB - JAVASCRIPT
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  /* ------------------------------------------------------------------------
     1. HERO ENTRANCE ANIMATIONS
     ------------------------------------------------------------------------ */
  const heroReveals = document.querySelectorAll('.reveal-hero');
  setTimeout(() => {
    heroReveals.forEach(el => el.classList.add('active'));
  }, 100);

  /* ------------------------------------------------------------------------
     2. NAVBAR SCROLL EFFECT & MOBILE MENU
     ------------------------------------------------------------------------ */
  const navbar = document.getElementById('navbar');
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  // Handle Navbar styling on scroll
  const handleNavScroll = () => {
    if (!navbar) return;

    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  if (navbar) {
    window.addEventListener('scroll', handleNavScroll, { passive: true });
  }

  // Toggle Mobile Menu
  const toggleMobileMenu = () => {
    if (!hamburgerBtn || !navMenu) return;

    const isOpen = navMenu.classList.contains('active');
    hamburgerBtn.classList.toggle('active');
    navMenu.classList.toggle('active');
    hamburgerBtn.setAttribute('aria-expanded', String(!isOpen));
    document.body.style.overflow = !isOpen ? 'hidden' : '';
  };

  if (hamburgerBtn) {
    hamburgerBtn.addEventListener('click', toggleMobileMenu);
  }

  // Close Mobile Menu when clicking a navigation link
  if (navLinks.length && navMenu && hamburgerBtn) {
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (navMenu.classList.contains('active')) {
          toggleMobileMenu();
        }
      });
    });
  }

  /* ------------------------------------------------------------------------
     3. INTERSECTION OBSERVER FOR SCROLL REVEALS
     ------------------------------------------------------------------------ */
  const revealElements = document.querySelectorAll('.reveal-on-scroll');

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target); // Reveal once
      }
    });
  }, {
    root: null,
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  /* ------------------------------------------------------------------------
     4. ANIMATED NUMBER COUNTERS FOR STATS
     ------------------------------------------------------------------------ */
  const counters = document.querySelectorAll('.counter');
  let countersAnimated = false;

  const animateCounters = () => {
    counters.forEach(counter => {
      const target = parseFloat(counter.getAttribute('data-target'));
      const decimals = parseInt(counter.getAttribute('data-decimals') || '0', 10);
      const duration = 2000; // 2 seconds
      const startTime = performance.now();

      const updateCount = (currentTime) => {
        const elapsedTime = currentTime - startTime;
        if (elapsedTime < duration) {
          const progress = elapsedTime / duration;
          // Ease-out quad formula
          const currentVal = (1 - Math.pow(1 - progress, 3)) * target;
          counter.textContent = currentVal.toFixed(decimals);
          requestAnimationFrame(updateCount);
        } else {
          counter.textContent = target.toFixed(decimals);
        }
      };

      requestAnimationFrame(updateCount);
    });
  };

  const statsSection = document.getElementById('stats');
  if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !countersAnimated) {
          animateCounters();
          countersAnimated = true;
        }
      });
    }, { threshold: 0.3 });

    statsObserver.observe(statsSection);
  }

  /* ------------------------------------------------------------------------
     5. ACTIVE NAV-LINK ON SCROLL (SPY)
     ------------------------------------------------------------------------ */
  const sections = document.querySelectorAll('section[id]');

  const scrollSpy = () => {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 100;
      const sectionId = current.getAttribute('id');
      const targetNavLink = document.querySelector(`.nav-menu a[href*="#${sectionId}"]`);

      if (targetNavLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          targetNavLink.classList.add('active');
        } else {
          targetNavLink.classList.remove('active');
        }
      }
    });
  };

  window.addEventListener('scroll', scrollSpy, { passive: true });

  /* ------------------------------------------------------------------------
     6. BACK TO TOP BUTTON
     ------------------------------------------------------------------------ */
  const backToTopBtn = document.getElementById('backToTopBtn');

  const handleBackToTopVisibility = () => {
    if (!backToTopBtn) return;

    if (window.scrollY > 400) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  };

  if (backToTopBtn) {
    window.addEventListener('scroll', handleBackToTopVisibility, { passive: true });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
});