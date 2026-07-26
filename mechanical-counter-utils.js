import { MECHANICAL_COUNTER_STYLES } from "./mechanical-counter-styles.js?v=1.4.3";

export const utilityMethods = {
  _boundedInteger(value, min, max, fallback) {
    const parsed = Number.parseInt(value, 10);
    if (!Number.isFinite(parsed)) return fallback;
    return Math.min(max, Math.max(min, parsed));
  },

  _boundedNumber(value, min, max, fallback) {
    const parsed = Number(value);
    if (!Number.isFinite(parsed)) return fallback;
    return Math.min(max, Math.max(min, parsed));
  },

  _safeCssColor(value, fallback) {
    const text = String(value ?? "").trim();
  
    if (
      /^(#[0-9a-fA-F]{3,8}|[a-zA-Z]{3,24}|rgba?\([\d\s.,%]+\)|hsla?\([\d\s.,%deg]+\)|var\(--[-\w]+\))$/.test(
        text
      )
    ) {
      return text;
    }
  
    return fallback;
  },

  _escapeHtml(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  },

  _styles() {
    return MECHANICAL_COUNTER_STYLES;
  }
};
