(function () {
  'use strict';

  var SYMS = ['✦', '✧', '✸', '✺'];
  var tick = 0;

  document.addEventListener('mousemove', function (e) {
    tick++;
    if (tick % 4 !== 0) return; // 每 4 次 mousemove 才產生一個粒子

    var isSym = (tick % 20 === 0); // 每 20 次產生一個符號，其餘是小點
    var el = document.createElement(isSym ? 'span' : 'div');
    el.className = isSym ? 'cursor-dot is-symbol' : 'cursor-dot';
    if (isSym) el.textContent = SYMS[Math.floor(Math.random() * SYMS.length)];

    el.style.left = e.clientX + 'px';
    el.style.top  = e.clientY + 'px';
    document.body.appendChild(el);

    // 動畫結束後移除元素，避免 DOM 堆積
    setTimeout(function () { el.remove(); }, 1000);
  });
})();
