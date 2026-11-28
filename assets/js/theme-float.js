/* SevaSphere v4.13: Theme button for app-style pages. Top right, same look as the site header Theme button, same saved theme. */
(function () {
  var K = 'cscvle_theme';
  var BR = [['Dynamic Blue', '#1d4fd8'], ['Electric Cyan', '#0a8fb3'], ['Royal Violet', '#6d3fd1'], ['Emerald', '#0b8a5b'], ['Vibrant Orange', '#d9570c'], ['Bright Pink', '#d4245f']];
  var BG = [['Auto', ''], ['White', '#ffffff'], ['Cream', '#fbf6e9'], ['Sky', '#e8f1fb'], ['Mint', '#e6f5ec'], ['Rose', '#fbeaee'], ['Lilac', '#efe9fa'], ['Grey', '#e6e9ed']];
  function load() { try { return JSON.parse(localStorage.getItem(K) || 'null') || { brand: BR[0][1], bg: '' }; } catch (e) { return { brand: BR[0][1], bg: '' }; } }
  function save(t) { try { localStorage.setItem(K, JSON.stringify(t)); } catch (e) { } }
  function rgb(h) { return [1, 3, 5].map(function (i) { return parseInt(h.substr(i, 2), 16); }); }
  function mix(h, to, t) { var a = rgb(h), b = rgb(to); return '#' + a.map(function (v, i) { return ('0' + Math.round(v + (b[i] - v) * t).toString(16)).slice(-2); }).join(''); }
  function apply(t) {
    var br = /^#[0-9a-f]{6}$/i.test(t.brand) ? t.brand : BR[0][1], bg = /^#[0-9a-f]{6}$/i.test(t.bg) ? t.bg : '';
    var st = document.getElementById('csc-theme-float');
    if (!st) { st = document.createElement('style'); st.id = 'csc-theme-float'; document.head.appendChild(st); }
    st.textContent = ':root{--brand:' + br + ';--csc-brand:' + br + ';--brand-strong:' + mix(br, '#000000', 0.35) + '}' +
      '.ss-bar{background:linear-gradient(90deg,' + mix(br, '#000000', 0.62) + ',' + mix(br, '#000000', 0.34) + ') !important}' + (bg ? 'body{background:' + bg + ' !important}' : '');
    var m = document.querySelector('meta[name=theme-color]');
    if (!m) { m = document.createElement('meta'); m.name = 'theme-color'; document.head.appendChild(m); }
    m.content = br;
  }
  var t = load(); apply(t);
  function build() {
    if (document.querySelector('.bgpick') || document.getElementById('sscTheme')) return;
    var css = document.createElement('style');
    css.textContent = '#sscTheme{position:relative;display:inline-block;margin-left:6px;vertical-align:middle}#sscTheme .tb{background:linear-gradient(160deg,#fde047,#eab308);color:#422006;border:2px solid rgba(255,255,255,.5);border-radius:11px;padding:6px 12px;font:800 13px system-ui,sans-serif;cursor:pointer;box-shadow:0 4px 0 #854d0e,inset 0 2px 0 rgba(255,255,255,.5)}#sscTheme .tb:hover{filter:brightness(1.08)}#sscTheme .tb:focus-visible{outline:3px solid #fff;outline-offset:2px}' +
      '#sscTheme .tm{position:absolute;right:0;top:calc(100% + 8px);width:250px;background:#fff;color:#1b2430;border-radius:14px;box-shadow:0 14px 40px rgba(0,0,0,.35);padding:12px;z-index:100000;text-align:left;font:600 12px system-ui,sans-serif}#sscTheme .tm[hidden]{display:none}#sscTheme .tm b{display:block;margin:8px 0 6px}#sscTheme .tm b:first-child{margin-top:0}' +
      '#sscTheme .sw{width:26px;height:26px;border-radius:50%;border:2px solid #fff;box-shadow:0 0 0 1px #aab;margin:0 5px 5px 0;cursor:pointer;padding:0;vertical-align:middle}#sscTheme .sw:focus-visible{outline:3px solid #1d4fd8}#sscTheme .rs{margin-top:8px;width:100%;padding:7px;border:1px solid #cdd5e4;background:#f4f7fb;border-radius:9px;font:700 12px system-ui,sans-serif;cursor:pointer}' +
      '#sscTheme.fx{position:fixed;top:10px;right:12px;z-index:99990;margin:0}@media print{#sscTheme{display:none}}';
    document.head.appendChild(css);
    var w = document.createElement('div'); w.id = 'sscTheme'; w.className = 'no-print';
    w.innerHTML = '<button type="button" class="tb" aria-haspopup="true" aria-expanded="false" title="Change page colours">🎨 Theme</button><div class="tm" hidden role="group" aria-label="Page theme"><b>Page colour</b>' +
      BR.map(function (b) { return '<button type="button" class="sw" data-k="brand" data-c="' + b[1] + '" title="' + b[0] + '" aria-label="' + b[0] + '" style="background:' + b[1] + '"></button>'; }).join('') +
      '<input type="color" data-k="brand" value="' + t.brand + '" aria-label="Custom theme colour" style="width:30px;height:26px;border:0;padding:0;vertical-align:middle"><b>Background</b>' +
      BG.map(function (b) { return '<button type="button" class="sw" data-k="bg" data-c="' + b[1] + '" title="' + b[0] + '" aria-label="' + b[0] + ' background" style="background:' + (b[1] || 'linear-gradient(135deg,#fff 50%,#d9e6df 50%)') + '"></button>'; }).join('') +
      '<button type="button" class="rs">Reset to default</button></div>';
    var bar = document.querySelector('.ss-bar');
    if (bar) bar.appendChild(w);
    else {
      var a = [].slice.call(document.querySelectorAll('a,button')).filter(function (e) { return /More free tools/i.test(e.textContent || ''); })[0];
      if (a && a.parentNode) { var g = document.createElement('span'); g.style.cssText = 'display:inline-flex;align-items:center;gap:8px'; a.parentNode.insertBefore(g, a); w.style.marginLeft = '0'; g.appendChild(w); g.appendChild(a); } else { w.className += ' fx'; document.body.appendChild(w); }
    }
    var btn = w.querySelector('.tb'), menu = w.querySelector('.tm');
    btn.onclick = function (e) { e.stopPropagation(); menu.hidden = !menu.hidden; btn.setAttribute('aria-expanded', String(!menu.hidden)); };
    document.addEventListener('click', function (e) { if (!w.contains(e.target)) { menu.hidden = true; btn.setAttribute('aria-expanded', 'false'); } });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') { menu.hidden = true; btn.setAttribute('aria-expanded', 'false'); } });
    function set(k, c) { t[k] = c; save(t); apply(t); }
    [].forEach.call(menu.querySelectorAll('.sw'), function (b) { b.onclick = function () { set(b.getAttribute('data-k'), b.getAttribute('data-c')); }; });
    menu.querySelector('input[type=color]').addEventListener('input', function (e) { set('brand', e.target.value); });
    menu.querySelector('.rs').onclick = function () { t = { brand: BR[0][1], bg: '', card: '', side: '', side2: '' }; save(t); apply(t); };
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', build); else build();
})();
