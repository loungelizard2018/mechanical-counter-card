export default String.raw`
      :host {
        display: block;
        width: 100%;
        max-width: 100%;
        min-width: 0;
        overflow: hidden;
        --mc-metal-light: rgba(255, 255, 255, 0.82);
        --mc-metal-mid: rgba(151, 151, 147, 0.92);
        --mc-metal-dark: rgba(45, 45, 44, 0.98);
      }

      * {
        box-sizing: border-box;
      }

      ha-card {
        display: block;
        width: 100%;
        max-width: 100%;
        min-width: 0;
        overflow: hidden;
        padding: 14px;
      }

      ha-card.transparent {
        background: transparent;
        border: 0;
        box-shadow: none;
      }

      .card-content {
        display: grid;
        gap: 18px;
        width: 100%;
        max-width: 100%;
        min-width: 0;
        overflow: hidden;
      }

      .register {
        position: relative;
        display: block;
        width: 100%;
        max-width: 100%;
        min-width: 0;
        overflow: hidden;
        cursor: pointer;
        outline: none;
      }

      .register-stage {
        display: block;
        width: max-content;
        max-width: none;
        transform: scale(var(--fit-scale, 1));
        transform-origin: top left;
        will-change: transform;
      }

      .register:focus-visible .counter-assembly {
        outline: 2px solid var(--primary-color);
        outline-offset: 4px;
      }

      .counter-assembly {
        position: relative;
        display: flex;
        align-items: center;
        gap: calc(16px * var(--counter-scale));
        width: max-content;
        max-width: none;
        min-height: calc((var(--digit-height) + 24px) * var(--counter-scale));
        padding:
          calc(10px * var(--counter-scale))
          calc(15px * var(--counter-scale))
          calc(11px * var(--counter-scale));
        border-radius: calc(8px * var(--counter-scale));
        isolation: isolate;
        filter:
          drop-shadow(0 calc(8px * var(--counter-scale)) calc(12px * var(--counter-scale)) rgba(0, 0, 0, 0.36))
          drop-shadow(0 1px 1px rgba(0, 0, 0, 0.7));
      }

      .counter-assembly.with-screws {
        padding:
          calc(24px * var(--counter-scale))
          calc(48px * var(--counter-scale))
          calc(25px * var(--counter-scale));
      }

      .counter-assembly.frame-gauge-black {
        padding:
          calc(24px * var(--counter-scale))
          calc(48px * var(--counter-scale))
          calc(25px * var(--counter-scale));
      }

      .frame-silver {
        border:
          calc(1px * var(--counter-scale))
          solid rgba(34, 34, 33, 0.92);
        background:
          repeating-linear-gradient(
            0deg,
            rgba(255,255,255,0.025) 0,
            rgba(255,255,255,0.025) 1px,
            rgba(0,0,0,0.025) 1px,
            rgba(0,0,0,0.025) 2px
          ),
          linear-gradient(
            180deg,
            #eeeeda 0%,
            #a7a79f 10%,
            #f0f0df 23%,
            #8b8b85 49%,
            #e1e1d3 73%,
            #72726e 91%,
            #cacabc 100%
          );
        box-shadow:
          inset 0 calc(2px * var(--counter-scale)) calc(2px * var(--counter-scale)) rgba(255, 255, 255, 0.9),
          inset 0 calc(-3px * var(--counter-scale)) calc(4px * var(--counter-scale)) rgba(0, 0, 0, 0.48),
          inset calc(2px * var(--counter-scale)) 0 calc(2px * var(--counter-scale)) rgba(255, 255, 255, 0.3),
          inset calc(-2px * var(--counter-scale)) 0 calc(2px * var(--counter-scale)) rgba(0, 0, 0, 0.2);
      }

      .frame-black {
        border: calc(1px * var(--counter-scale)) solid rgba(0,0,0,0.98);
        background-image:
          linear-gradient(180deg, rgba(255,255,255,0.055), rgba(255,255,255,0.005) 23%, rgba(0,0,0,0.12) 100%),
          var(--housing-texture);
        background-repeat: no-repeat, repeat;
        background-size: 100% 100%, calc(120px * var(--counter-scale)) calc(50px * var(--counter-scale));
        background-position: center, center;
        box-shadow:
          inset 0 0 0 calc(1px * var(--counter-scale)) rgba(255,255,255,0.10),
          inset 0 0 0 calc(3px * var(--counter-scale)) rgba(5,5,5,0.98),
          inset 0 0 0 calc(4px * var(--counter-scale)) rgba(172,172,172,0.78),
          inset 0 0 0 calc(6px * var(--counter-scale)) rgba(8,8,8,0.99),
          inset 0 calc(-4px * var(--counter-scale)) calc(8px * var(--counter-scale)) rgba(0,0,0,0.72),
          0 calc(8px * var(--counter-scale)) calc(14px * var(--counter-scale)) rgba(0,0,0,0.52),
          0 calc(2px * var(--counter-scale)) calc(3px * var(--counter-scale)) rgba(0,0,0,0.72);
      }

      .frame-gauge-black {
        border-radius: calc(10px * var(--counter-scale));
      }

      .frame-gauge-black::before {
        content: "";
        position: absolute;
        z-index: 0;
        inset: calc(7px * var(--counter-scale));
        border-radius: calc(6px * var(--counter-scale));
        border: calc(1px * var(--counter-scale)) solid rgba(194,194,194,0.54);
        box-shadow:
          0 calc(1px * var(--counter-scale)) 0 rgba(255,255,255,0.08),
          inset 0 calc(1px * var(--counter-scale)) calc(2px * var(--counter-scale)) rgba(255,255,255,0.07),
          inset 0 calc(-1px * var(--counter-scale)) calc(2px * var(--counter-scale)) rgba(0,0,0,0.74);
        pointer-events: none;
      }


`;
