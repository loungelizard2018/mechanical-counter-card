export const updateMethods = {
  _updateAllRegisters(initial = false) {
    const registers = this._normalisedRegisters();
  
    registers.forEach((register, index) => {
      this._updateRegister(register, index, initial);
    });
  },

  _updateRegister(register, index, initial = false) {
    const stateObject = this._hass?.states?.[register.entity];
    const rawValue = this._readRawValue(stateObject, register.attribute);
    const formatted = this._formatValue(rawValue, register);
  
    const registerElement = this.shadowRoot.querySelector(
      `.register[data-register-index="${index}"]`
    );
    if (!registerElement) return;
  
    const unitElement = registerElement.querySelector(
      `[data-unit-index="${index}"]`
    );
  
    const effectiveUnit =
      register.unit ??
      stateObject?.attributes?.unit_of_measurement ??
      "";
  
    if (unitElement) {
      unitElement.textContent = effectiveUnit;
      unitElement.style.display = effectiveUnit ? "" : "none";
    }
  
    registerElement.setAttribute(
      "aria-label",
      [
        register.label || stateObject?.attributes?.friendly_name || register.entity,
        formatted.readable,
        effectiveUnit,
      ]
        .filter(Boolean)
        .join(" ")
    );
  
    registerElement.title =
      stateObject?.attributes?.friendly_name ||
      register.label ||
      register.entity;
  
    const previous = this._displayValues.get(index);
    const next = formatted.characters;
  
    this._displayValues.set(index, next);
  
    const slots = [...registerElement.querySelectorAll(".digit-slot")];
  
    slots.forEach((slot, slotPosition) => {
      const nextCharacter = next[slotPosition] ?? register.unavailable_text;
      const previousCharacter =
        previous?.[slotPosition] ?? nextCharacter;
  
      const shouldAnimate =
        !initial &&
        register.animation &&
        previousCharacter !== nextCharacter &&
        /^\d$/.test(previousCharacter) &&
        /^\d$/.test(nextCharacter);
  
      this._setDigit(
        slot,
        previousCharacter,
        nextCharacter,
        shouldAnimate,
        register.animation_duration,
        register.animation_stagger * slotPosition,
        `${index}:${slotPosition}`
      );
    });
  
    this._scheduleFit();
  },

  _scheduleFit() {
    if (!this._rendered || !this.shadowRoot) return;
  
    if (this._fitAnimationFrame !== null) {
      window.cancelAnimationFrame(this._fitAnimationFrame);
    }
  
    this._fitAnimationFrame = window.requestAnimationFrame(() => {
      this._fitAnimationFrame = null;
      this._fitAllRegisters();
    });
  },

  _fitAllRegisters() {
    const registers = this._normalisedRegisters();
    this.shadowRoot.querySelectorAll(".register").forEach((element, index) => {
      this._fitRegister(element, registers[index]);
    });
  },

  _fitRegister(registerElement, register) {
    const stage = registerElement.querySelector(".register-stage");
    if (!stage || !register) return;
  
    const availableWidth = registerElement.clientWidth;
    const naturalWidth = stage.offsetWidth;
    const naturalHeight = stage.offsetHeight;
  
    if (availableWidth <= 0 || naturalWidth <= 0 || naturalHeight <= 0) return;
  
    let fitScale = 1;
    if (register.fit_to_card) {
      const widthRatio = availableWidth / naturalWidth;
      fitScale = register.allow_upscale
        ? Math.min(register.max_fit_scale, widthRatio)
        : Math.min(1, widthRatio);
      fitScale = Math.max(0.05, fitScale);
    }
  
    const roundedScale = Number(fitScale.toFixed(5));
    if (Number(registerElement.dataset.fitScale) !== roundedScale) {
      stage.style.setProperty("--fit-scale", String(roundedScale));
      registerElement.dataset.fitScale = String(roundedScale);
    }
  
    const fittedHeight = Math.ceil(naturalHeight * roundedScale);
    if (registerElement.style.height !== `${fittedHeight}px`) {
      registerElement.style.height = `${fittedHeight}px`;
    }
  },

  _setDigit(
    slot,
    previousCharacter,
    nextCharacter,
    animate,
    duration,
    delay,
    timerKey
  ) {
    const track = slot.querySelector(".digit-track");
    if (!track) return;

    this._clearTimer(timerKey);

    if (!animate || duration === 0) {
      track.classList.remove("rolling");
      track.style.transition = "none";
      track.style.transform = "translateY(0)";
      track.innerHTML = `<div class="digit-face">${this._escapeHtml(
        nextCharacter
      )}</div>`;
      slot.dataset.value = nextCharacter;
      return;
    }

    track.classList.remove("rolling");
    track.style.transition = "none";
    track.style.transform = "translateY(0)";
    track.innerHTML = `
      <div class="digit-face">${this._escapeHtml(previousCharacter)}</div>
      <div class="digit-face">${this._escapeHtml(nextCharacter)}</div>
    `;

    void track.offsetHeight;

    const startTimer = window.setTimeout(() => {
      track.classList.add("rolling");
      track.style.transition = `transform ${duration}ms cubic-bezier(0.22, 0.72, 0.18, 1)`;
      track.style.transform = "translateY(-50%)";

      const finishTimer = window.setTimeout(() => {
        track.classList.remove("rolling");
        track.style.transition = "none";
        track.style.transform = "translateY(0)";
        track.innerHTML = `<div class="digit-face">${this._escapeHtml(
          nextCharacter
        )}</div>`;
        slot.dataset.value = nextCharacter;
        this._animationTimers.delete(timerKey);
      }, duration + 40);

      this._animationTimers.set(timerKey, finishTimer);
    }, delay);

    this._animationTimers.set(timerKey, startTimer);
  },

  _readRawValue(stateObject, attribute) {
    if (!stateObject) return null;
  
    if (attribute) {
      return stateObject.attributes?.[attribute];
    }
  
    return stateObject.state;
  },

  _formatValue(rawValue, register) {
    if (
      rawValue === null ||
      rawValue === undefined ||
      rawValue === "" ||
      rawValue === "unknown" ||
      rawValue === "unavailable"
    ) {
      return {
        characters: Array(
          register.integer_digits + register.decimals
        ).fill(register.unavailable_text),
        readable: "unavailable",
      };
    }
  
    const numericValue =
      typeof rawValue === "number"
        ? rawValue
        : Number(String(rawValue).replace(",", "."));
  
    if (!Number.isFinite(numericValue)) {
      return {
        characters: Array(
          register.integer_digits + register.decimals
        ).fill(register.unavailable_text),
        readable: String(rawValue),
      };
    }
  
    const absoluteValue = Math.abs(numericValue);
    const fixed = absoluteValue.toFixed(register.decimals);
    const [integerRaw, decimalRaw = ""] = fixed.split(".");
  
    let integerPart = register.leading_zeroes
      ? integerRaw.padStart(register.integer_digits, "0")
      : integerRaw.padStart(register.integer_digits, " ");
  
    integerPart = integerPart.slice(-register.integer_digits);
  
    const decimalPart = decimalRaw
      .padEnd(register.decimals, "0")
      .slice(0, register.decimals);
  
    const characters = [...integerPart, ...decimalPart];
  
    return {
      characters,
      readable:
        register.decimals > 0
          ? `${numericValue.toFixed(register.decimals).replace(
              ".",
              register.decimal_separator
            )}`
          : `${Math.round(numericValue)}`,
    };
  },

  _showMoreInfo(entityId) {
    if (!entityId) return;
  
    const event = new CustomEvent("hass-more-info", {
      bubbles: true,
      composed: true,
      detail: { entityId },
    });
  
    this.dispatchEvent(event);
  },

  _clearTimer(timerKey) {
    const timer = this._animationTimers.get(timerKey);
    if (timer !== undefined) {
      window.clearTimeout(timer);
      this._animationTimers.delete(timerKey);
    }
  },

  _clearAllTimers() {
    this._animationTimers.forEach((timer) => window.clearTimeout(timer));
    this._animationTimers.clear();
  }
};
