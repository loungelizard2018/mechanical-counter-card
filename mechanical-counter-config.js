export const configMethods = {
  _normalisedRegisters() {
    const globalConfig = this._config || {};
  
    if (Array.isArray(globalConfig.registers)) {
      return globalConfig.registers.map((register, index) =>
        this._normaliseRegister(register, index)
      );
    }
  
    return [this._normaliseRegister(globalConfig, 0)];
  },

  _normaliseRegister(register, index) {
    const globalConfig = this._config || {};
  
    const entity = register.entity || globalConfig.entity;
    if (!entity) {
      throw new Error(
        `Mechanical Counter Card: register ${index + 1} has no entity.`
      );
    }
  
    const integerDigitsRaw =
      register.integer_digits ??
      register.digits ??
      globalConfig.integer_digits ??
      globalConfig.digits ??
      6;
  
    const decimalsRaw =
      register.decimals ??
      globalConfig.decimals ??
      0;
  
    const integerDigits = this._boundedInteger(integerDigitsRaw, 1, 16, 6);
    const decimals = this._boundedInteger(decimalsRaw, 0, 6, 0);
  
    return {
      entity,
      attribute: register.attribute ?? globalConfig.attribute,
      label: register.label ?? globalConfig.label ?? "",
      unit: register.unit ?? globalConfig.unit,
      integer_digits: integerDigits,
      decimals,
      decimal_separator:
        register.decimal_separator ??
        globalConfig.decimal_separator ??
        ",",
      integer_color:
        register.integer_color ??
        globalConfig.integer_color ??
        "#f2f2ec",
      decimal_color:
        register.decimal_color ??
        globalConfig.decimal_color ??
        "#d52b2b",
      leading_zeroes:
        register.leading_zeroes ??
        globalConfig.leading_zeroes ??
        true,
      show_unit:
        register.show_unit ??
        globalConfig.show_unit ??
        true,
      show_label:
        register.show_label ??
        globalConfig.show_label ??
        true,
      animation:
        register.animation ??
        globalConfig.animation ??
        true,
      animation_duration: this._boundedInteger(
        register.animation_duration ??
          globalConfig.animation_duration ??
          720,
        0,
        5000,
        720
      ),
      animation_stagger: this._boundedInteger(
        register.animation_stagger ??
          globalConfig.animation_stagger ??
          45,
        0,
        500,
        45
      ),
      scale: this._boundedNumber(
        register.scale ??
          globalConfig.scale ??
          1,
        0.5,
        2.5,
        1
      ),
      digit_width: this._boundedNumber(
        register.digit_width ??
          globalConfig.digit_width ??
          43,
        24,
        100,
        43
      ),
      digit_height: this._boundedNumber(
        register.digit_height ??
          globalConfig.digit_height ??
          70,
        36,
        150,
        70
      ),
      frame:
        register.frame ??
        globalConfig.frame ??
        "gauge_black",
      screws:
        register.screws ??
        register.show_screws ??
        register.screwed ??
        globalConfig.screws ??
        globalConfig.show_screws ??
        globalConfig.screwed ??
        true,
      screw_size: this._boundedNumber(
        register.screw_size ?? globalConfig.screw_size ?? 28,
        14,
        48,
        28
      ),
      meta_color:
        register.meta_color ??
        globalConfig.meta_color ??
        "#dedede",
      label_color:
        register.label_color ??
        register.meta_color ??
        globalConfig.label_color ??
        globalConfig.meta_color ??
        "#dedede",
      unit_color:
        register.unit_color ??
        register.meta_color ??
        globalConfig.unit_color ??
        globalConfig.meta_color ??
        "#dedede",
      fit_to_card:
        register.fit_to_card ??
        register.responsive ??
        globalConfig.fit_to_card ??
        globalConfig.responsive ??
        true,
      allow_upscale:
        register.allow_upscale ??
        globalConfig.allow_upscale ??
        false,
      max_fit_scale: this._boundedNumber(
        register.max_fit_scale ?? globalConfig.max_fit_scale ?? 1,
        1,
        3,
        1
      ),
      unavailable_text:
        register.unavailable_text ??
        globalConfig.unavailable_text ??
        "—",
    };
  }
};
