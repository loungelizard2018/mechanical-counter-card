import { MECHANICAL_COUNTER_GAUGE_ASSETS } from "./gauge-assets.js";

export const renderMethods = {
  _render() {
    const registers = this._normalisedRegisters();
    this._resizeObserver?.disconnect();
  
    this.shadowRoot.innerHTML = `
      <style>${this._styles()}</style>
      <ha-card class="${this._config.transparent_card ? "transparent" : ""}">
        <div class="card-content">
          ${registers
            .map((register, index) => this._renderRegister(register, index))
            .join("")}
        </div>
      </ha-card>
    `;
  
    registers.forEach((register, index) => {
      const registerElement = this.shadowRoot.querySelector(
        `.register[data-register-index="${index}"]`
      );
  
      registerElement?.addEventListener("click", () => {
        this._showMoreInfo(register.entity);
      });
  
      registerElement?.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          this._showMoreInfo(register.entity);
        }
      });
  
      const stageElement = registerElement?.querySelector(".register-stage");
      if (registerElement && this._resizeObserver) {
        this._resizeObserver.observe(registerElement);
      }
      if (stageElement && this._resizeObserver) {
        this._resizeObserver.observe(stageElement);
      }
    });
  
    this._rendered = true;
    this._updateAllRegisters(true);
    this._scheduleFit();
  },

  _renderRegister(register, index) {
    const frameValue = String(register.frame || "").toLowerCase();
    const frameClass = ["black", "dark", "blackened", "gauge_black", "gauge-black"].includes(frameValue)
      ? "frame-black frame-gauge-black"
      : "frame-silver";
  
    const digitSlots = this._renderDigitSkeleton(register);
    const screwMarkup = register.screws ? this._renderScrews() : "";
  
    return `
      <div
        class="register"
        data-register-index="${index}"
        role="button"
        tabindex="0"
        aria-label="${this._escapeHtml(register.label || register.entity)}"
        style="
          --counter-scale: ${register.scale};
          --digit-width: ${register.digit_width}px;
          --digit-height: ${register.digit_height}px;
          --integer-color: ${this._safeCssColor(register.integer_color, "#f2f2ec")};
          --decimal-color: ${this._safeCssColor(register.decimal_color, "#d52b2b")};
          --meta-color: ${this._safeCssColor(register.meta_color, "#dedede")};
          --label-color: ${this._safeCssColor(register.label_color, "#dedede")};
          --unit-color: ${this._safeCssColor(register.unit_color, "#dedede")};
          --screw-size: ${register.screw_size}px;
          --animation-duration: ${register.animation_duration}ms;
          --housing-texture: url('${this._asset("housing-texture.webp")}');
        "
      >
        <div class="register-stage">
          <div class="counter-assembly ${frameClass} ${register.screws ? "with-screws" : ""}">
            ${screwMarkup}
            <div class="counter-window">
              <div class="drum-bed">
                ${digitSlots}
              </div>
              <div class="glass">
                <div class="glass-glare"></div>
              </div>
            </div>
  
            <div class="register-meta">
              ${
                register.show_label && register.label
                  ? `<span class="register-label">${this._escapeHtml(register.label)}</span>`
                  : ""
              }
              ${
                register.show_unit
                  ? `<span class="register-unit" data-unit-index="${index}"></span>`
                  : ""
              }
            </div>
          </div>
        </div>
      </div>
    `;
  },

  _renderScrews() {
    return `
      <img class="screw screw-top-left" src="${this._asset("screw-tl.webp")}" alt="" aria-hidden="true">
      <img class="screw screw-top-right" src="${this._asset("screw-tr.webp")}" alt="" aria-hidden="true">
      <img class="screw screw-bottom-left" src="${this._asset("screw-bl.webp")}" alt="" aria-hidden="true">
      <img class="screw screw-bottom-right" src="${this._asset("screw-br.webp")}" alt="" aria-hidden="true">
    `;
  },

  _asset(name) {
    return MECHANICAL_COUNTER_GAUGE_ASSETS[name] || "";
  },

  _renderDigitSkeleton(register) {
    const parts = [];
  
    for (let i = 0; i < register.integer_digits; i += 1) {
      parts.push(this._digitSlotHtml(i, false));
    }
  
    if (register.decimals > 0) {
      parts.push(`
        <div class="decimal-separator" aria-hidden="true">
          ${this._escapeHtml(register.decimal_separator)}
        </div>
      `);
  
      for (let i = 0; i < register.decimals; i += 1) {
        const slotIndex = register.integer_digits + i;
        parts.push(this._digitSlotHtml(slotIndex, true));
      }
    }
  
    return parts.join("");
  },

  _digitSlotHtml(slotIndex, decimal) {
    return `
      <div
        class="digit-slot ${decimal ? "decimal-digit" : "integer-digit"}"
        data-slot-index="${slotIndex}"
        aria-hidden="true"
      >
        <div class="digit-track">
          <div class="digit-face">0</div>
        </div>
        <div class="digit-highlight"></div>
        <div class="digit-shadow-top"></div>
        <div class="digit-shadow-bottom"></div>
      </div>
    `;
  }
};
