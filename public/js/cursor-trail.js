(function () {
  'use strict';

  // 手電筒 overlay — 跟著滑鼠的聚光圓
  var overlay = document.createElement('div');
  overlay.className = 'flashlight-overlay';
  document.body.appendChild(overlay);

  function setPos(x, y) {
    overlay.style.setProperty('--cx', x + 'px');
    overlay.style.setProperty('--cy', y + 'px');
  }

  // 初始：光源移出視口外，頁面有一層淡暗
  setPos(-9999, -9999);

  // rAF 節流：座標每幀只寫一次，避免 mousemove 高頻 setProperty 重繪整片光暈
  var lx = 0, ly = 0, ticking = false;
  document.addEventListener('mousemove', function (e) {
    lx = e.clientX; ly = e.clientY;
    if (!overlay.classList.contains('is-active')) {
      overlay.classList.add('is-active');
    }
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () {
      ticking = false;
      setPos(lx, ly);
    });
  }, { passive: true });

  // 滑鼠離開視窗時收起光源
  document.addEventListener('mouseleave', function () {
    overlay.classList.remove('is-active');
    setPos(-9999, -9999);
  });
})();
