
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
