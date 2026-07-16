(function () {
  'use strict';

  const header = document.getElementById('header');
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav__link');
  const contactForm = document.getElementById('contactForm');
  const toast = document.getElementById('toast');
  const toastMessage = document.getElementById('toastMessage');
  const yearEl = document.getElementById('year');

  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  /* Header scroll effect */
  function handleScroll() {
    if (window.scrollY > 50) {
      header.classList.add('header--scrolled');
    } else {
      header.classList.remove('header--scrolled');
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  /* Mobile navigation */
  navToggle.addEventListener('click', function () {
    const isOpen = navMenu.classList.toggle('nav__menu--open');
    navToggle.classList.toggle('nav__toggle--open');
    navToggle.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      navMenu.classList.remove('nav__menu--open');
      navToggle.classList.remove('nav__toggle--open');
      navToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });

  /* Active nav link on scroll */
  const sections = document.querySelectorAll('section[id]');

  function highlightNav() {
    const scrollPos = window.scrollY + 100;

    sections.forEach(function (section) {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(function (link) {
          link.classList.remove('nav__link--active');
          if (link.getAttribute('href') === '#' + id) {
            link.classList.add('nav__link--active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', highlightNav, { passive: true });

  /* Scroll reveal */
  const revealElements = document.querySelectorAll(
    '.section__header, .about__text, .about__card, .approach__step, .sector-card, .values__content, .values__quote, .contact__info, .contact__form'
  );

  revealElements.forEach(function (el) {
    el.classList.add('reveal');
  });

  const revealObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal--visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
  );

  revealElements.forEach(function (el) {
    revealObserver.observe(el);
  });

  /* Toast helper */
  let toastTimeout;

  function showToast(message) {
    toastMessage.textContent = message;
    toast.classList.add('toast--visible');
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(function () {
      toast.classList.remove('toast--visible');
    }, 4000);
  }

  /* Contact form */
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const fields = contactForm.querySelectorAll('[required]');
    let valid = true;

    fields.forEach(function (field) {
      const group = field.closest('.form__group');
      group.classList.remove('form__group--error');

      if (!field.value.trim()) {
        group.classList.add('form__group--error');
        valid = false;
      }
    });

    if (!valid) {
      showToast('Please fill in all required fields.');
      return;
    }

    const emailField = contactForm.querySelector('#email');
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(emailField.value.trim())) {
      emailField.closest('.form__group').classList.add('form__group--error');
      showToast('Please enter a valid email address.');
      return;
    }

    contactForm.reset();
    showToast('Thank you for your message. We will be in touch shortly.');
  });
})();
