// 1. NAVBAR RESPONSIVE
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
  navMenu.classList.toggle('active');
  const icon = hamburger.querySelector('i');
  icon.classList.toggle('fa-bars');
  icon.classList.toggle('fa-xmark');
});

document.querySelectorAll('.nav-menu a').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('active');
    const icon = hamburger.querySelector('i');
    icon.classList.add('fa-bars');
    icon.classList.remove('fa-xmark');
  });
});

// 2. DARK / LIGHT MODE
const themeToggle = document.getElementById('themeToggle');
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  const icon = themeToggle.querySelector('i');
  if (document.body.classList.contains('dark-mode')) {
    icon.classList.replace('fa-moon', 'fa-sun');
  } else {
    icon.classList.replace('fa-sun', 'fa-moon');
  }
});

// 3. FILTER KATEGORI MENU
const filterButtons = document.querySelectorAll('.filter-btn');
const productCards = document.querySelectorAll('.product-card');

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    filterButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');

    const selectedCategory = button.dataset.filter;
    productCards.forEach(card => {
      const match = selectedCategory === 'all' || card.dataset.category === selectedCategory;
      card.classList.toggle('hidden', !match);
    });
  });
});

// 4. IMAGE SLIDER GALERI
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const dotsContainer = document.getElementById('sliderDots');
let sliderTimer;

slides.forEach((slide, index) => {
  const dot = document.createElement('button');
  dot.setAttribute('aria-label', `Tampilkan foto ${index + 1}`);
  dot.addEventListener('click', () => showSlide(index));
  dotsContainer.appendChild(dot);
});

const dots = dotsContainer.querySelectorAll('button');

function showSlide(index) {
  currentSlide = (index + slides.length) % slides.length;
  slides.forEach((slide, i) => slide.classList.toggle('active', i === currentSlide));
  dots.forEach((dot, i) => dot.classList.toggle('active', i === currentSlide));
  restartSlider();
}

function moveSlide(direction) {
  showSlide(currentSlide + direction);
}

function restartSlider() {
  clearInterval(sliderTimer);
  sliderTimer = setInterval(() => showSlide(currentSlide + 1), 4500);
}

document.getElementById('prevSlide').addEventListener('click', () => moveSlide(-1));
document.getElementById('nextSlide').addEventListener('click', () => moveSlide(1));
showSlide(0);

// 5. MODAL DETAIL PRODUK
const modal = document.getElementById('productModal');
const modalTitle = document.getElementById('modalTitle');
const modalPrice = document.getElementById('modalPrice');
const modalText = document.getElementById('modalText');
const modalImg = document.getElementById('modalImg');

document.querySelectorAll('.btn-detail').forEach(button => {
  button.addEventListener('click', () => {
    modalTitle.textContent = button.dataset.title;
    modalPrice.textContent = button.dataset.price;
    modalText.textContent = button.dataset.desc;
    modalImg.src = button.dataset.img;
    modal.classList.add('show');
    modal.setAttribute('aria-hidden', 'false');
  });
});

function closeModal() {
  modal.classList.remove('show');
  modal.setAttribute('aria-hidden', 'true');
}
document.getElementById('closeModal').addEventListener('click', closeModal);
document.getElementById('modalContact').addEventListener('click', closeModal);
modal.addEventListener('click', event => {
  if (event.target === modal) closeModal();
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape') closeModal();
});

// 6. VALIDASI FORM KONTAK
const contactForm = document.getElementById('contactForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');
const formSuccess = document.getElementById('formSuccess');

contactForm.addEventListener('submit', event => {
  event.preventDefault();

  const nameError = document.getElementById('nameError');
  const emailError = document.getElementById('emailError');
  const msgError = document.getElementById('msgError');

  nameError.textContent = '';
  emailError.textContent = '';
  msgError.textContent = '';
  formSuccess.classList.remove('show');

  let isValid = true;
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (nameInput.value.trim() === '') {
    nameError.textContent = 'Nama lengkap wajib diisi.';
    isValid = false;
  }
  if (emailInput.value.trim() === '') {
    emailError.textContent = 'Email wajib diisi.';
    isValid = false;
  } else if (!emailPattern.test(emailInput.value.trim())) {
    emailError.textContent = 'Masukkan format email yang benar.';
    isValid = false;
  }
  if (messageInput.value.trim() === '') {
    msgError.textContent = 'Pesan tidak boleh kosong.';
    isValid = false;
  }

  if (isValid) {
    formSuccess.classList.add('show');
    contactForm.reset();
    setTimeout(() => formSuccess.classList.remove('show'), 5000);
  }
});
