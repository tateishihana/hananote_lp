/* ===========================
   FAQ アコーディオン
=========================== */
document.querySelectorAll('.faq-q').forEach(function (button) {
  button.addEventListener('click', function () {
    var isExpanded = this.getAttribute('aria-expanded') === 'true';
    var answer = this.nextElementSibling;

    document.querySelectorAll('.faq-q').forEach(function (btn) {
      btn.setAttribute('aria-expanded', 'false');
      if (btn.nextElementSibling) {
        btn.nextElementSibling.classList.remove('is-open');
      }
    });

    if (!isExpanded) {
      this.setAttribute('aria-expanded', 'true');
      answer.classList.add('is-open');
    }
  });
});

/* ===========================
   スクロールで浮かび上がる
=========================== */
(function () {
  var targets = document.querySelectorAll(
    '.reason, .svc, .figure, .case, .pf-item, .voice, .plan, .flow-item, .problem-item'
  );
  if (!targets.length) return;
  if (!('IntersectionObserver' in window)) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  function reveal(el) {
    el.style.opacity = '1';
    el.style.transform = 'translateY(0)';
  }

  targets.forEach(function (el) {
    el.style.opacity = '0';
    el.style.transform = 'translateY(14px)';
    el.style.transition = 'opacity .55s ease, transform .55s ease';
    observer.observe(el);
  });

  // 保険：すでに画面内にあるものは即表示、3秒後には残りも全部表示
  function revealVisible() {
    var vh = window.innerHeight || document.documentElement.clientHeight;
    targets.forEach(function (el) {
      var r = el.getBoundingClientRect();
      if (r.top < vh && r.bottom > 0) reveal(el);
    });
  }
  revealVisible();
  window.addEventListener('scroll', revealVisible, { passive: true });
  setTimeout(function () { targets.forEach(reveal); }, 3000);
})();

/* ===========================
   制作実績のライトボックス
=========================== */
(function () {
  var box = document.getElementById('lightbox');
  if (!box) return;

  var items = Array.prototype.slice.call(document.querySelectorAll('.pf-item'));
  if (!items.length) return;

  var img = box.querySelector('.lightbox-img');
  var caption = box.querySelector('.lightbox-caption');
  var current = 0;
  var lastFocused = null;

  function show(index) {
    current = (index + items.length) % items.length;
    var source = items[current].querySelector('img');
    img.src = source.getAttribute('src');
    img.alt = source.getAttribute('alt') || '';
    caption.textContent = source.getAttribute('alt') || '';
  }

  function open(index) {
    lastFocused = document.activeElement;
    show(index);
    box.hidden = false;
    document.body.style.overflow = 'hidden';
    box.querySelector('.lightbox-close').focus();
  }

  function close() {
    box.hidden = true;
    document.body.style.overflow = '';
    if (lastFocused) lastFocused.focus();
  }

  items.forEach(function (item, index) {
    item.addEventListener('click', function () { open(index); });
  });

  box.querySelector('.lightbox-close').addEventListener('click', close);
  box.querySelector('.lightbox-prev').addEventListener('click', function () { show(current - 1); });
  box.querySelector('.lightbox-next').addEventListener('click', function () { show(current + 1); });

  box.addEventListener('click', function (e) {
    if (e.target === box) close();
  });

  document.addEventListener('keydown', function (e) {
    if (box.hidden) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') show(current - 1);
    if (e.key === 'ArrowRight') show(current + 1);
  });
})();
