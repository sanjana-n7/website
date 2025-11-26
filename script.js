/* script.js
   Vanilla JS, ES6 — small, accessible, commented
   ----------------------------------------------
   Acceptance checklist:
   - nav toggle updates aria-expanded
   - print button bound to window.print()
   - basic form validation implemented
*/

document.addEventListener('DOMContentLoaded', () => {
  /* ---------------------------
     Mobile nav toggle
  ---------------------------- */
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('#main-nav');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', isOpen);

      // Basic focus trap when menu is open
      if (isOpen) {
        const focusable = navMenu.querySelectorAll('a, button');
        if (focusable.length) focusable[0].focus();
      }
    });
  }

  /* ---------------------------
     Smooth scroll for anchors
     Progressive enhancement
  ---------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  /* ---------------------------
     Print / Download button
  ---------------------------- */
  const printBtn = document.querySelector('#print-resume');
  if (printBtn) {
    printBtn.addEventListener('click', () => {
      // Temporary toast confirmation
      const toast = document.createElement('div');
      toast.textContent = 'Preparing printable view...';
      toast.setAttribute('role', 'status');
      toast.style.position = 'fixed';
      toast.style.bottom = '1rem';
      toast.style.left = '50%';
      toast.style.transform = 'translateX(-50%)';
      toast.style.background = '#0a66c2';
      toast.style.color = '#fff';
      toast.style.padding = '0.5rem 1rem';
      toast.style.borderRadius = '6px';
      document.body.appendChild(toast);

      setTimeout(() => {
        document.body.removeChild(toast);
        window.print();
      }, 1200);
    });
  }
  // Fallback guidance: include html2pdf CDN if direct PDF download is desired

  /* ---------------------------
     Contact form validation
  ---------------------------- */
  const form = document.querySelector('#contact form');
  if (form) {
    const liveRegion = document.createElement('div');
    liveRegion.setAttribute('aria-live', 'polite');
    liveRegion.style.position = 'absolute';
    liveRegion.style.left = '-9999px';
    form.appendChild(liveRegion);

    form.addEventListener('submit', e => {
      let errors = [];
      const name = form.querySelector('[name="name"]');
      const email = form.querySelector('[name="email"]');
      const message = form.querySelector('[name="message"]');

      if (!name.value.trim()) errors.push('Name is required.');
      if (!email.value.trim()) {
        errors.push('Email is required.');
      } else {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.value)) errors.push('Email format is invalid.');
      }
      if (!message.value.trim()) errors.push('Message is required.');

      if (errors.length) {
        e.preventDefault();
        liveRegion.textContent = errors.join(' ');
      }
    });
  }

  /* ---------------------------
     Optional dark theme toggle
     Uncomment to enable
  ---------------------------- */
  /*
  const toggleTheme = () => {
    document.body.classList.toggle('dark-theme');
    localStorage.setItem('theme',
      document.body.classList.contains('dark-theme') ? 'dark' : 'light'
    );
  };
  // Example: document.querySelector('#theme-btn').addEventListener('click', toggleTheme);
  // On load: if(localStorage.getItem('theme')==='dark'){document.body.classList.add('dark-theme');}
  */
});