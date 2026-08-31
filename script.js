/* ===========================
   FAQ アコーディオン
=========================== */
document.querySelectorAll('.faq-question').forEach(function (button) {
  button.addEventListener('click', function () {
    var isExpanded = this.getAttribute('aria-expanded') === 'true';
    var answer = this.nextElementSibling;

    // 他を閉じる
    document.querySelectorAll('.faq-question').forEach(function (btn) {
      btn.setAttribute('aria-expanded', 'false');
      if (btn.nextElementSibling) {
        btn.nextElementSibling.classList.remove('is-open');
      }
    });

    // クリックしたものをトグル
    if (!isExpanded) {
      this.setAttribute('aria-expanded', 'true');
      answer.classList.add('is-open');
    }
  });
});

/* ===========================
   スクロールアニメーション（控えめ）
=========================== */
(function () {
  var targets = document.querySelectorAll(
    '.reason-card, .service-card, .result-card, .case-card, .pricing-card, .testimonial-card, .problem-item, .flow-item, .portfolio-item, .tools-card'
  );

  if (!('IntersectionObserver' in window)) return;

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  targets.forEach(function (el) {
    el.style.opacity = '0';
    el.style.transform = 'translateY(16px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(el);
  });
})();

/* ===========================
   制作実績のライトボックス
=========================== */
(function () {
  var box = document.getElementById('lightbox');
  if (!box) return;

  var items = Array.prototype.slice.call(document.querySelectorAll('.portfolio-item'));
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

  // 背景をクリックしたら閉じる
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
