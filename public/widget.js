/*!
 * Техперевод.com — виджет локализации сайта "на лету" (PoC).
 * Подключение: <script src="https://techperevod.com/widget.js"
 *   data-site="tpw_..." data-source="ru" data-langs="en,de"></script>
 * Обходит видимые текстовые узлы страницы, переводит их через
 * /api/widget/translate и подставляет перевод на месте. Элементы/предки с
 * атрибутом data-notranslate из перевода исключаются.
 */
(function () {
  "use strict";

  var scriptEl = document.currentScript;
  if (!scriptEl) return;

  var siteKey = scriptEl.getAttribute("data-site");
  if (!siteKey) return;

  var sourceLang = scriptEl.getAttribute("data-source") || "ru";
  var targetLangs = (scriptEl.getAttribute("data-langs") || "")
    .split(",")
    .map(function (s) { return s.trim(); })
    .filter(Boolean);

  var apiBase;
  try {
    apiBase = new URL(scriptEl.src).origin;
  } catch (e) {
    return;
  }

  var LANG_LABELS = { ru: "Русский", en: "English", de: "Deutsch", zh: "中文", es: "Español", fr: "Français" };
  var STORAGE_KEY = "tp_widget_lang_" + siteKey;
  var CHUNK_SIZE = 100;

  var originals = [];
  var scanned = false;

  function shouldSkip(el) {
    while (el) {
      if (el.nodeType === 1) {
        var tag = el.tagName;
        if (tag === "SCRIPT" || tag === "STYLE" || tag === "NOSCRIPT" || tag === "TEXTAREA" || tag === "INPUT") return true;
        if (el.hasAttribute && el.hasAttribute("data-notranslate")) return true;
      }
      el = el.parentNode;
    }
    return false;
  }

  function scan() {
    if (scanned) return;
    scanned = true;
    var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null);
    var node;
    while ((node = walker.nextNode())) {
      var text = node.nodeValue;
      if (!text || !text.trim()) continue;
      if (shouldSkip(node.parentNode)) continue;
      originals.push({ node: node, text: text });
    }
  }

  function restore() {
    originals.forEach(function (o) {
      o.node.nodeValue = o.text;
    });
  }

  function applyTranslations(map) {
    originals.forEach(function (o) {
      var trimmed = o.text.trim();
      var t = map[trimmed];
      if (t == null) return;
      var lead = o.text.match(/^\s*/)[0];
      var trail = o.text.match(/\s*$/)[0];
      o.node.nodeValue = lead + t + trail;
    });
  }

  function translateTo(lang) {
    if (lang === sourceLang) {
      restore();
      return Promise.resolve();
    }
    scan();

    var uniqueSet = {};
    originals.forEach(function (o) {
      var trimmed = o.text.trim();
      if (trimmed) uniqueSet[trimmed] = true;
    });
    var unique = Object.keys(uniqueSet);
    if (!unique.length) return Promise.resolve();

    var chunks = [];
    for (var i = 0; i < unique.length; i += CHUNK_SIZE) chunks.push(unique.slice(i, i + CHUNK_SIZE));

    var resultMap = {};
    var chain = Promise.resolve();
    chunks.forEach(function (chunk) {
      chain = chain.then(function () {
        return fetch(apiBase + "/api/widget/translate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ siteKey: siteKey, url: location.href, lang: lang, texts: chunk }),
        })
          .then(function (res) { return res.json(); })
          .then(function (data) {
            if (data && data.translations) {
              chunk.forEach(function (t, idx) { resultMap[t] = data.translations[idx]; });
            }
          })
          .catch(function () {
            /* сеть недоступна или лимит исчерпан — оставляем оригинал */
          });
      });
    });
    return chain.then(function () {
      applyTranslations(resultMap);
    });
  }

  function buildSwitcher() {
    var wrap = document.createElement("div");
    wrap.setAttribute("data-notranslate", "");
    wrap.style.cssText =
      "position:fixed;bottom:16px;right:16px;z-index:2147483647;font-family:system-ui,-apple-system,sans-serif;font-size:14px;";

    var btn = document.createElement("button");
    btn.type = "button";
    btn.textContent = "🌐";
    btn.setAttribute("aria-label", "Выбрать язык страницы");
    btn.style.cssText =
      "width:44px;height:44px;border-radius:50%;border:none;background:#1546E0;color:#fff;font-size:18px;cursor:pointer;box-shadow:0 4px 16px rgba(0,0,0,.22);";

    var menu = document.createElement("div");
    menu.style.cssText =
      "display:none;position:absolute;bottom:52px;right:0;background:#fff;border-radius:10px;box-shadow:0 8px 24px rgba(0,0,0,.18);overflow:hidden;min-width:150px;";

    [sourceLang].concat(targetLangs).forEach(function (code) {
      var item = document.createElement("button");
      item.type = "button";
      item.textContent = LANG_LABELS[code] || code;
      item.style.cssText = "display:block;width:100%;padding:10px 14px;border:none;background:#fff;text-align:left;cursor:pointer;color:#111;";
      item.onmouseenter = function () { item.style.background = "#f2f4fb"; };
      item.onmouseleave = function () { item.style.background = "#fff"; };
      item.onclick = function () {
        menu.style.display = "none";
        try { localStorage.setItem(STORAGE_KEY, code); } catch (e) {}
        translateTo(code);
      };
      menu.appendChild(item);
    });

    btn.onclick = function () {
      menu.style.display = menu.style.display === "none" ? "block" : "none";
    };

    wrap.appendChild(menu);
    wrap.appendChild(btn);
    document.body.appendChild(wrap);
  }

  function init() {
    if (!targetLangs.length) return;
    buildSwitcher();

    var saved = null;
    try {
      var params = new URLSearchParams(location.search);
      saved = params.get("tp_lang") || localStorage.getItem(STORAGE_KEY);
    } catch (e) {
      /* localStorage/URLSearchParams недоступны — просто без сохранённого языка */
    }
    if (saved && saved !== sourceLang && targetLangs.indexOf(saved) !== -1) translateTo(saved);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
