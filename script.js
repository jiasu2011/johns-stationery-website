// John's Japanese Stationery — vanilla JS behaviour

document.addEventListener('DOMContentLoaded', function () {

  /* ---------- Mobile nav toggle (products.html) ---------- */
  var navToggle = document.getElementById('navToggle');
  var navLinks = document.getElementById('navLinks');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      var isOpen = navLinks.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------- Product modal ---------- */
  var overlay = document.getElementById('modalOverlay');
  if (!overlay) return; // not on products.html

  var modalImageWrap = document.getElementById('modalImageWrap');
  var modalImage = document.getElementById('modalImage');
  var modalName = document.getElementById('modalName');
  var modalSubtitle = document.getElementById('modalSubtitle');
  var modalPrice = document.getElementById('modalPrice');
  var modalBrand = document.getElementById('modalBrand');
  var modalStoreLink = document.getElementById('modalStoreLink');
  var modalClose = document.getElementById('modalClose');
  var lastFocused = null;

  function openModal(card) {
    var name = card.dataset.name || '';
    var subtitle = card.dataset.subtitle || '';
    var price = card.dataset.price || '';
    var brand = card.dataset.brand || '';
    var image = card.dataset.image || '';
    var link = card.dataset.link || '#';

    modalName.textContent = name;
    modalPrice.textContent = price;
    modalBrand.textContent = brand;

    if (subtitle) {
      modalSubtitle.textContent = subtitle.replace(/\\n/g, '\n');
      modalSubtitle.style.display = '';
    } else {
      modalSubtitle.textContent = '';
      modalSubtitle.style.display = 'none';
    }

    modalImageWrap.setAttribute('data-label', brand || name);
    modalImage.classList.remove('img-error');
    modalImage.src = image;
    modalImage.alt = brand || name;

    modalStoreLink.href = link; // REPLACE WITH SALES LINK (set per-product via data-link)

    lastFocused = document.activeElement;
    overlay.classList.add('open');
    document.body.classList.add('modal-open');
    modalClose.focus();
  }

  function closeModal() {
    overlay.classList.remove('open');
    document.body.classList.remove('modal-open');
    if (lastFocused && typeof lastFocused.focus === 'function') {
      lastFocused.focus();
    }
  }

  document.querySelectorAll('.product-card').forEach(function (card) {
    card.addEventListener('click', function () {
      openModal(card);
    });
    card.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openModal(card);
      }
    });
  });

  modalClose.addEventListener('click', closeModal);

  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) closeModal();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && overlay.classList.contains('open')) {
      closeModal();
    }
  });
});
