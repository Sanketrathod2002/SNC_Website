(() => {
  'use strict';
  const selector = document.getElementById('site-language');
  const saved = localStorage.getItem('snc-lang') || 'en';
  if (selector) selector.value = saved;
  async function apply(lang) {
    localStorage.setItem('snc-lang', lang);
    document.documentElement.lang = lang;
    try {
      const response = await fetch(`./assets/i18n/${lang}.json`, { cache: 'no-cache' });
      if (!response.ok) return;
      const dict = await response.json();
      for (const [key, value] of Object.entries(dict)) {
        document.querySelectorAll(`[data-i18n="${CSS.escape(key)}"]`).forEach(el => { el.textContent = value; });
        document.querySelectorAll(`[data-i18n-placeholder="${CSS.escape(key)}"]`).forEach(el => el.setAttribute('placeholder', value));
      }
    } catch (_) { /* Translation dictionaries require the site to be served over HTTP. */ }
  }
  selector?.addEventListener('change', () => apply(selector.value));
  if (saved !== 'en') apply(saved);
})();
