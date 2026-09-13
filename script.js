const header = document.querySelector('[data-header]');
const toggle = document.querySelector('[data-menu-toggle]');
const nav = document.querySelector('[data-nav]');
const navLinks = nav.querySelectorAll('a');

window.addEventListener('scroll', () => header.classList.toggle('sticky', window.scrollY > 32));
toggle.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  toggle.classList.toggle('open', open);
  toggle.setAttribute('aria-expanded', open);
  toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
});
navLinks.forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  toggle.classList.remove('open');
  toggle.setAttribute('aria-expanded', 'false');
}));

const slider = document.querySelector('[data-hero-slider]');
const slides = [...slider.querySelectorAll('.slide')];
const counter = slider.querySelector('[data-counter]');
let current = 0;
function showSlide(index) {
  current = (index + slides.length) % slides.length;
  slides.forEach((slide, i) => slide.classList.toggle('is-active', i === current));
  counter.textContent = `${String(current + 1).padStart(2, '0')} / ${String(slides.length).padStart(2, '0')}`;
}
slider.querySelector('[data-next]').addEventListener('click', () => showSlide(current + 1));
slider.querySelector('[data-prev]').addEventListener('click', () => showSlide(current - 1));
setInterval(() => showSlide(current + 1), 5500);

const sections = [...document.querySelectorAll('main section[id]')];
const observer = new IntersectionObserver(entries => entries.forEach(entry => {
  if (!entry.isIntersecting) return;
  navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
}), { rootMargin: '-35% 0px -60% 0px' });
sections.forEach(section => observer.observe(section));
