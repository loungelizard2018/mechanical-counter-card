/**
 * Mechanical Counter Card for Home Assistant
 * Version: 1.4.1
 */

import { configMethods } from "./mechanical-counter-config.js";
import { renderMethods } from "./mechanical-counter-render.js";
import { updateMethods } from "./mechanical-counter-update.js";
import { utilityMethods } from "./mechanical-counter-utils.js";

const MECHANICAL_COUNTER_VERSION = "1.4.1";

class MechanicalCounterCard extends HTMLElement {
constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._config = null;
    this._hass = null;
    this._rendered = false;
    this._displayValues = new Map();
    this._animationTimers = new Map();
    this._fitAnimationFrame = null;
    this._windowResizeHandler = () => this._scheduleFit();
    this._resizeObserver = typeof ResizeObserver !== "undefined"
      ? new ResizeObserver(() => this._scheduleFit())
      : null;
  }

static getStubConfig() {
    return {
      entity: "sensor.example_energy",
      integer_digits: 6,
      decimals: 1,
      decimal_color: "#d52b2b",
      unit: "kWh",
      label: "HT",
      frame: "gauge_black",
      screws: true,
      screw_size: 28,
      meta_color: "#dedede",
      fit_to_card: true,
      allow_upscale: false,
    };
  }

setConfig(config) {
    if (!config || (!config.entity && !Array.isArray(config.registers))) {
      throw new Error(
        "Mechanical Counter Card: configure either 'entity' or a non-empty 'registers' list."
      );
    }

    if (Array.isArray(config.registers) && config.registers.length === 0) {
      throw new Error(
        "Mechanical Counter Card: 'registers' must contain at least one register."
      );
    }

    this._config = {
      animation: true,
      animation_duration: 720,
      animation_stagger: 45,
      decimal_separator: ",",
      integer_color: "#f2f2ec",
      decimal_color: "#d52b2b",
      leading_zeroes: true,
      show_unit: true,
      show_label: true,
      transparent_card: true,
      frame: "gauge_black",
      scale: 1,
      screws: true,
      screw_size: 28,
      meta_color: "#dedede",
      label_color: null,
      unit_color: null,
      fit_to_card: true,
      allow_upscale: false,
      max_fit_scale: 1,
      ...config,
    };

    this._rendered = false;
    this._displayValues.clear();
    this._clearAllTimers();

    if (this._hass) {
      this._render();
    }
  }

set hass(hass) {
    this._hass = hass;

    if (!this._config) return;

    if (!this._rendered) {
      this._render();
      return;
    }

    this._updateAllRegisters();
  }

getCardSize() {
    const registerCount = this._normalisedRegisters().length;
    return Math.max(1, registerCount);
  }

connectedCallback() {
    window.addEventListener("resize", this._windowResizeHandler, { passive: true });
    this._scheduleFit();
  }

disconnectedCallback() {
    this._clearAllTimers();
    this._resizeObserver?.disconnect();
    window.removeEventListener("resize", this._windowResizeHandler);
    if (this._fitAnimationFrame !== null) {
      window.cancelAnimationFrame(this._fitAnimationFrame);
      this._fitAnimationFrame = null;
    }
  }
}

Object.assign(
  MechanicalCounterCard.prototype,
  configMethods,
  renderMethods,
  updateMethods,
  utilityMethods
);

if (!customElements.get("mechanical-counter-card")) {
  customElements.define("mechanical-counter-card", MechanicalCounterCard);
}

window.customCards = window.customCards || [];
if (!window.customCards.some((card) => card.type === "mechanical-counter-card")) {
  window.customCards.push({
    type: "mechanical-counter-card",
    name: "Mechanical Counter",
    description: "Photorealistic mechanical meter register with upward rolling digits.",
    preview: true,
    documentationURL: "https://github.com/loungelizard2018/mechanical-counter-card",
  });
}

console.info(
  `%c MECHANICAL-COUNTER-CARD %c v${MECHANICAL_COUNTER_VERSION} `,
  "color: white; background: #353535; font-weight: 700;",
  "color: #111; background: #d8d8cf;"
);
