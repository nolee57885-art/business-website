// WhatsApp booking link (all "Book" buttons use this)
const WA = 'https://wa.me/918329706442?text=' +
  encodeURIComponent("Hi Dr Prerna, I'd like to book an appointment at Body and Mind Physiotherapy.");
document.querySelectorAll('.wa-link').forEach(a => a.href = WA);

// Testimonials: replace these with real ones

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
  // Three more review slots are reserved. Add each new genuine review here when ready:
  // { text: 'New patient review goes here', who: 'Patient name' },
  // { text: 'New patient review goes here', who: 'Patient name' },
  // { text: 'New patient review goes here', who: 'Patient name' }
];

// Hero slider
const slides = [...document.querySelectorAll('.slide')];
const dots = document.querySelector('.dots');
let cur = 0, timer;
slides.forEach((_, i) => {
  const b = document.createElement('button');
  b.setAttribute('aria-label', 'Show slide ' + (i + 1));
  b.onclick = () => { show(i); restart(); };
  dots.appendChild(b);
});
function show(i) {
  cur = (i + slides.length) % slides.length;
  slides.forEach((s, n) => s.classList.toggle('on', n === cur));
  [...dots.children].forEach((d, n) => d.classList.toggle('on', n === cur));
}
function restart() {
  clearInterval(timer);
  if (!matchMedia('(prefers-reduced-motion:reduce)').matches) timer = setInterval(() => show(cur + 1), 6000);
}
show(0); restart();

// Testimonial carousel
let t = 0;
const q = document.querySelector('.car blockquote'), c = document.querySelector('.car cite');
function showT(i) {
  t = (i + TESTIMONIALS.length) % TESTIMONIALS.length;
  q.textContent = '\u201C' + TESTIMONIALS[t].text + '\u201D';
  c.textContent = TESTIMONIALS[t].who;
}
document.querySelectorAll('.car-ctl button').forEach(b => b.onclick = () => showT(t + +b.dataset.d));
showT(0);
setInterval(() => showT(t + 1), 8000);

// Mobile menu
const burger = document.querySelector('.burger'), menu = document.querySelector('.nav nav');
burger.onclick = () => burger.setAttribute('aria-expanded', menu.classList.toggle('open'));
menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => menu.classList.remove('open')));

document.getElementById('yr').textContent = new Date().getFullYear();
