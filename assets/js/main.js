/**
* Template Name: SnapFolio
* Template URL: https://bootstrapmade.com/snapfolio-bootstrap-portfolio-template/
* Updated: Jul 21 2025 with Bootstrap v5.3.7
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  const body = document.body;
  const header = document.querySelector('#header');
  const headerToggleBtn = document.querySelector('.header-toggle');
  const scrollTop = document.querySelector('.scroll-top');
  const navmenuLinks = document.querySelectorAll('#navmenu a');

  function headerToggle() {
    if (!header || !headerToggleBtn) return;
    header.classList.toggle('header-show');
    headerToggleBtn.classList.toggle('bi-list');
    headerToggleBtn.classList.toggle('bi-x');
  }

  if (headerToggleBtn) {
    headerToggleBtn.addEventListener('click', headerToggle);
  }

  navmenuLinks.forEach((navmenu) => {
    navmenu.addEventListener('click', () => {
      if (header && header.classList.contains('header-show')) {
        headerToggle();
      }
    });
  });

  document.querySelectorAll('.navmenu .toggle-dropdown').forEach((navmenu) => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }

    if (header && body.classList.contains('motion-home')) {
      header.classList.toggle('scrolled', window.scrollY > 20);
    }
  }

  if (scrollTop) {
    scrollTop.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  function aosInit() {
    if (typeof AOS === 'undefined') return;
    AOS.init({
      duration: 900,
      easing: 'ease-out-cubic',
      once: true,
      mirror: false
    });
  }

  window.addEventListener('load', aosInit);

  const selectTyped = document.querySelector('.typed');
  if (selectTyped && typeof Typed !== 'undefined') {
    let typedStrings = selectTyped.getAttribute('data-typed-items');
    typedStrings = typedStrings.split(',');
    new Typed('.typed', {
      strings: typedStrings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  if (typeof PureCounter !== 'undefined') {
    new PureCounter();
  }

  const skillsAnimation = document.querySelectorAll('.skills-animation');
  skillsAnimation.forEach((item) => {
    if (typeof Waypoint === 'undefined') return;
    new Waypoint({
      element: item,
      offset: '80%',
      handler: function() {
        let progress = item.querySelectorAll('.progress .progress-bar');
        progress.forEach((el) => {
          el.style.width = el.getAttribute('aria-valuenow') + '%';
        });
      }
    });
  });

  if (typeof GLightbox !== 'undefined') {
    GLightbox({
      selector: '.glightbox'
    });
  }

  document.querySelectorAll('.isotope-layout').forEach((isotopeItem) => {
    if (typeof Isotope === 'undefined' || typeof imagesLoaded === 'undefined') return;

    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    const container = isotopeItem.querySelector('.isotope-container');
    if (!container) return;

    imagesLoaded(container, function() {
      initIsotope = new Isotope(container, {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach((filters) => {
      filters.addEventListener('click', function() {
        const current = isotopeItem.querySelector('.isotope-filters .filter-active');
        if (current) {
          current.classList.remove('filter-active');
        }
        this.classList.add('filter-active');
        if (initIsotope) {
          initIsotope.arrange({
            filter: this.getAttribute('data-filter')
          });
        }
        aosInit();
      }, false);
    });
  });

  function initSwiper() {
    if (typeof Swiper === 'undefined') return;
    document.querySelectorAll(".init-swiper").forEach((swiperElement) => {
      const configEl = swiperElement.querySelector(".swiper-config");
      if (!configEl) return;
      let config = JSON.parse(configEl.innerHTML.trim());
      new Swiper(swiperElement, config);
    });
  }

  window.addEventListener("load", initSwiper);

  window.addEventListener('load', function() {
    if (window.location.hash && document.querySelector(window.location.hash)) {
      setTimeout(() => {
        let section = document.querySelector(window.location.hash);
        let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
        window.scrollTo({
          top: section.offsetTop - parseInt(scrollMarginTop, 10),
          behavior: 'smooth'
        });
      }, 100);
    }
  });

  function navmenuScrollspy() {
    navmenuLinks.forEach((navmenulink) => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 220;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach((link) => link.classList.remove('active'));
        navmenulink.classList.add('active');
      }
    });
  }

  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

  if (body.classList.contains('motion-home')) {
    document.addEventListener('pointermove', (event) => {
      document.documentElement.style.setProperty('--pointer-x', `${event.clientX}px`);
      document.documentElement.style.setProperty('--pointer-y', `${event.clientY}px`);
    });

    const revealItems = document.querySelectorAll('.reveal-fade');
    if ('IntersectionObserver' in window) {
      const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            revealObserver.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.18
      });

      revealItems.forEach((item) => revealObserver.observe(item));
    } else {
      revealItems.forEach((item) => item.classList.add('is-visible'));
    }

    const tiltItems = document.querySelectorAll('[data-tilt]');
    tiltItems.forEach((item) => {
      item.addEventListener('pointermove', (event) => {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        const rect = item.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        const rotateX = ((y / rect.height) - 0.5) * -7;
        const rotateY = ((x / rect.width) - 0.5) * 7;
        item.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
      });

      item.addEventListener('pointerleave', () => {
        item.style.transform = '';
      });
    });

    const magneticButtons = document.querySelectorAll('.magnetic-btn');
    magneticButtons.forEach((button) => {
      button.addEventListener('pointermove', (event) => {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        const rect = button.getBoundingClientRect();
        const x = event.clientX - rect.left - rect.width / 2;
        const y = event.clientY - rect.top - rect.height / 2;
        button.style.transform = `translate(${x * 0.08}px, ${y * 0.08}px)`;
      });

      button.addEventListener('pointerleave', () => {
        button.style.transform = '';
      });
    });

    const parallaxLayers = document.querySelectorAll('[data-parallax]');
    const updateParallax = () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      const scrollY = window.scrollY;
      parallaxLayers.forEach((layer) => {
        const speed = parseFloat(layer.getAttribute('data-parallax')) || 0;
        layer.style.transform = `translate3d(0, ${scrollY * speed}px, 0)`;
      });
    };

    updateParallax();
    window.addEventListener('scroll', updateParallax, { passive: true });

    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');

    if (contactForm && formStatus) {
      contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn ? submitBtn.innerHTML : '';
        const selectedScopes = Array.from(contactForm.querySelectorAll('input[name="project_scope[]"]:checked')).map((item) => item.value);
        const formData = new FormData(contactForm);

        formData.delete('project_scope[]');
        formData.append('project_scope', selectedScopes.length ? selectedScopes.join(', ') : 'Not specified');
        formData.append('_subject', `Portfolio Inquiry: ${formData.get('subject')}`);
        formData.append('_template', 'table');
        formData.append('_captcha', 'false');

        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.innerHTML = 'Sending brief...';
        }

        formStatus.className = 'form-status loading';
        formStatus.textContent = 'Sending your project brief...';

        try {
          const response = await fetch('https://formsubmit.co/ajax/buthman111@gmail.com', {
            method: 'POST',
            body: formData,
            headers: {
              Accept: 'application/json'
            }
          });

          if (!response.ok) {
            throw new Error('Form submission failed.');
          }

          formStatus.className = 'form-status success';
          formStatus.textContent = 'Your brief has been sent successfully. If this is the first submission, check your email once to activate FormSubmit.';
          contactForm.reset();
        } catch (error) {
          formStatus.className = 'form-status error';
          formStatus.textContent = 'Something went wrong while sending the brief. If FormSubmit has not been activated yet, check your email for the activation message or email buthman111@gmail.com directly.';
        } finally {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
          }
        }
      });
    }
  }

})();
