// Menu mobile
const menuToggle = document.querySelector('#menuToggle');
const navLinks = document.querySelector('#navLinks');

menuToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', isOpen);
  menuToggle.textContent = isOpen ? '✕' : '☰';
});

navLinks.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.textContent = '☰';
  });
});

// Anima elementos quando aparecem na tela
const revealItems = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('visible'));
}

// Ano automático no rodapé
document.querySelector('#year').textContent = new Date().getFullYear();

// Formulário: prepara a mensagem e abre o WhatsApp
const contactForm = document.querySelector('#contactForm');
const toast = document.querySelector('#toast');

// Altere este número quando confirmar qual WhatsApp será o principal.
// Formato: código do país + DDD + número, somente dígitos.
const whatsappPrincipal = '556399215379';

contactForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const nome = document.querySelector('#name').value.trim();
  const servico = document.querySelector('#service').value;
  const detalhes = document.querySelector('#message').value.trim();

  const mensagem = [
    'Olá, SkyTech! Vim pelo site.',
    `Meu nome: ${nome}`,
    `Tenho interesse em: ${servico}`,
    detalhes ? `Sobre meu projeto: ${detalhes}` : ''
  ].filter(Boolean).join('\n');

  const link = `https://wa.me/${whatsappPrincipal}?text=${encodeURIComponent(mensagem)}`;
  window.open(link, '_blank', 'noopener,noreferrer');

  toast.textContent = 'Mensagem preparada! Se o WhatsApp não abrir, confira o número configurado no script.js.';
  toast.classList.add('show');
  window.setTimeout(() => toast.classList.remove('show'), 5000);
});
