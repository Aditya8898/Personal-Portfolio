/**
 * Premium Portfolio Interactivity
 * Aditya Gauda - Backend Developer Portfolio
 */

/* ==========================================
   DOM ELEMENTS
   ========================================== */
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');
const themeToggle = document.getElementById('theme-toggle');
const typingElement = document.getElementById('typing-text');
const contactForm = document.getElementById('contact-form');
const submitBtn = document.getElementById('submit-btn');
const formMessage = document.getElementById('form-message');
const navLinkItems = document.querySelectorAll('.nav-link');
const revealElements = document.querySelectorAll('.reveal-up');

/* ==========================================
   NAVBAR SCROLL EFFECT
   ========================================== */
function handleNavbarScroll() {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}

window.addEventListener('scroll', handleNavbarScroll);
handleNavbarScroll();

/* ==========================================
   MOBILE MENU
   ========================================== */
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navLinks.classList.toggle('active');
  document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
});

// Close mobile menu on link click
navLinkItems.forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navLinks.classList.remove('active');
    document.body.style.overflow = '';
  });
});

/* ==========================================
   ACTIVE NAV LINK ON SCROLL
   ========================================== */
const sections = document.querySelectorAll('section[id]');

function updateActiveNavLink() {
  const scrollPos = window.scrollY + 150;

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');

    if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
      navLinkItems.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
          link.classList.add('active');
        }
      });
    }
  });
}

window.addEventListener('scroll', updateActiveNavLink);

/* ==========================================
   THEME TOGGLE + LOCALSTORAGE
   ========================================== */
function initTheme() {
  const savedTheme = localStorage.getItem('portfolio-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (savedTheme === 'light' || (!savedTheme && !prefersDark)) {
    document.body.classList.add('light-mode');
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
  } else {
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
  }
}

function toggleTheme() {
  document.body.classList.toggle('light-mode');
  const isLight = document.body.classList.contains('light-mode');

  localStorage.setItem('portfolio-theme', isLight ? 'light' : 'dark');
  themeToggle.innerHTML = isLight
    ? '<i class="fas fa-sun"></i>'
    : '<i class="fas fa-moon"></i>';
}

themeToggle.addEventListener('click', toggleTheme);
initTheme();

/* ==========================================
   TYPING EFFECT
   ========================================== */
const roles = [
  'Backend Developer',
  'Node.js Specialist',
  'Full-Stack Developer',
  'API Architect'
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeEffect() {
  const currentRole = roles[roleIndex];

  if (isDeleting) {
    typingElement.textContent = currentRole.substring(0, charIndex - 1);
    charIndex--;
    typingSpeed = 50;
  } else {
    typingElement.textContent = currentRole.substring(0, charIndex + 1);
    charIndex++;
    typingSpeed = 100;
  }

  if (!isDeleting && charIndex === currentRole.length) {
    isDeleting = true;
    typingSpeed = 2000; // pause at end
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    typingSpeed = 500; // pause before next
  }

  setTimeout(typeEffect, typingSpeed);
}

if (typingElement) {
  setTimeout(typeEffect, 1000);
}

/* ==========================================
   SCROLL REVEAL (Intersection Observer)
   ========================================== */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
});

revealElements.forEach(el => revealObserver.observe(el));

/* ==========================================
   CONTACT FORM
   ========================================== */
if (contactForm) {
  contactForm.addEventListener('submit', async function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    // Validation
    if (!name || !email || !message) {
      showFormMessage('Please fill in all fields.', 'error');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showFormMessage('Please enter a valid email address.', 'error');
      return;
    }

    // Loading state
    setLoading(true);
    hideFormMessage();

    try {
      const res = await fetch('http://localhost:5000/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, message })
      });

      const data = await res.json();

      if (res.ok) {
        showFormMessage('Message sent successfully! I will get back to you soon.', 'success');
        contactForm.reset();
      } else {
        showFormMessage(data.message || 'Something went wrong. Please try again.', 'error');
      }
    } catch (error) {
      console.error('Contact form error:', error);
      showFormMessage('Unable to connect to server. Please make sure the backend is running.', 'error');
    } finally {
      setLoading(false);
    }
  });
}

function setLoading(isLoading) {
  if (isLoading) {
    submitBtn.classList.add('sending');
    submitBtn.disabled = true;
  } else {
    submitBtn.classList.remove('sending');
    submitBtn.disabled = false;
  }
}

function showFormMessage(text, type) {
  formMessage.textContent = text;
  formMessage.className = 'form-message ' + type;
}

function hideFormMessage() {
  formMessage.className = 'form-message';
  formMessage.textContent = '';
}

/* ==========================================
   SMOOTH SCROLL FOR ANCHOR LINKS
   ========================================== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      e.preventDefault();
      const navHeight = navbar.offsetHeight;
      const targetPosition = targetElement.offsetTop - navHeight - 20;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

/* ==========================================
   INITIAL REVEAL ON LOAD
   ========================================== */
window.addEventListener('load', () => {
  // Trigger hero elements immediately
  document.querySelectorAll('.hero .reveal-up').forEach((el, index) => {
    setTimeout(() => {
      el.classList.add('revealed');
    }, index * 120);
  });
});

