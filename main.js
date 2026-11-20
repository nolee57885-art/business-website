// Analytics is ready to activate when the clinic's GA4 Measurement ID is added.
// Leave empty until a real ID beginning with "G-" is supplied; never use a placeholder ID.
const GA4_MEASUREMENT_ID = 'G-8BVGYP72LZ';

if (/^G-[A-Z0-9]+$/.test(GA4_MEASUREMENT_ID)) {
  window.dataLayer = window.dataLayer || [];
  window.gtag = function(){ window.dataLayer.push(arguments); };
  window.gtag('js', new Date());
  window.gtag('config', GA4_MEASUREMENT_ID);

  const gaScript = document.createElement('script');
  gaScript.async = true;
  gaScript.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(GA4_MEASUREMENT_ID);
  document.head.appendChild(gaScript);

  // Track meaningful contact actions as GA4 events.
  document.addEventListener('click', event => {
    const link = event.target.closest('a[href]');
    if (!link) return;
    const href = link.getAttribute('href') || '';
    if (link.matches('.wa-link') || href.startsWith('https://wa.me/')) {
      window.gtag('event', 'generate_lead', { method: 'whatsapp' });
    } else if (href.startsWith('tel:')) {
      window.gtag('event', 'phone_click');
    } else if (href.startsWith('mailto:')) {
      window.gtag('event', 'email_click');
    }
  });

  document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', () => {
      window.gtag('event', 'generate_lead', { method: 'website_form' });
    });
  });
}

// WhatsApp booking link shared by every booking call-to-action.
const WA = 'https://wa.me/918329706442?text=' +
  encodeURIComponent("Hi Dr Prerna, I’d like to enquire about an appointment at Body and Mind Physiotherapy.\n\nName:\nWhat I need help with:\nPreferred day/time:\nClinic or home visit:");
document.querySelectorAll('.wa-link').forEach(a => a.href = WA);

// Patient testimonials supplied for the website.
const TESTIMONIALS = [
  {
    text: `I consulted Dr. Prerna for a chronic ATFL ankle injury. She was meticulous in identifying the exact areas causing pain and prescribed highly effective exercises that helped me rebuild strength. Her deep understanding of muscle function and rehabilitation is evident in every session.
The clinic is very affordable, yet Dr. Prerna delivers exceptional expertise along with clear, detailed explanations of the recovery process. It was very easy for me to locate the clinic as its in the heart of Viman Nagar.`,
    who: 'Deepak Uppal'
  },
  {
    text: 'Dr Prerna is excellent at her work. Has helped me personally and online on many occasions, whilst teaching me good exercises to manage my pain. God bless her more',
    who: 'Punam N'
  },
  {
    text: 'Great treatment I was totally satisfied. Highly recommended place.',
    who: 'Sunil Barry'
  }
];

// Hero slider with reduced-motion support.
const slides = [...document.querySelectorAll('.slide')];
const dots = document.querySelector('.dots');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
let cur = 0;
let heroTimer;

function showSlide(index) {
  if (!slides.length) return;
  cur = (index + slides.length) % slides.length;
  slides.forEach((slide, n) => {
    slide.classList.toggle('on', n === cur);
    slide.setAttribute('aria-hidden', n === cur ? 'false' : 'true');
  });
  if (dots) {
    [...dots.children].forEach((dot, n) => {
      dot.classList.toggle('on', n === cur);
      dot.setAttribute('aria-pressed', n === cur ? 'true' : 'false');
    });
  }
}
function restartHero() {
  clearInterval(heroTimer);
  if (!reduceMotion && slides.length > 1) {
    heroTimer = setInterval(() => showSlide(cur + 1), 6500);
  }
}
if (dots) {
  slides.forEach((_, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.setAttribute('aria-label', 'Show slide ' + (index + 1));
    button.setAttribute('aria-pressed', 'false');
    button.addEventListener('click', () => {
      showSlide(index);
      restartHero();
    });
    dots.appendChild(button);
  });
}
showSlide(0);
restartHero();

// Testimonial carousel.
let testimonialIndex = 0;
const quote = document.querySelector('.car blockquote');
const citation = document.querySelector('.car cite');
function showTestimonial(index) {
  if (!quote || !citation || !TESTIMONIALS.length) return;
  testimonialIndex = (index + TESTIMONIALS.length) % TESTIMONIALS.length;
  quote.textContent = '\u201C' + TESTIMONIALS[testimonialIndex].text + '\u201D';
  citation.textContent = TESTIMONIALS[testimonialIndex].who;
}
document.querySelectorAll('.car-ctl button').forEach(button => {
  button.type = 'button';
  button.addEventListener('click', () => {
    showTestimonial(testimonialIndex + Number(button.dataset.d));
  });
});
showTestimonial(0);

// Avoid automatic testimonial movement for visitors who prefer reduced motion.
if (!reduceMotion && TESTIMONIALS.length > 1) {
  setInterval(() => showTestimonial(testimonialIndex + 1), 10000);
}

// Mobile navigation: keep the expanded state in sync with the menu.
const burger = document.querySelector('.burger');
const menu = document.querySelector('.nav nav');
if (burger && menu) {
  burger.addEventListener('click', () => {
    const expanded = menu.classList.toggle('open');
    burger.setAttribute('aria-expanded', String(expanded));
  });
  menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false');
    });
  });
}

const year = document.getElementById('yr');
if (year) year.textContent = new Date().getFullYear();
