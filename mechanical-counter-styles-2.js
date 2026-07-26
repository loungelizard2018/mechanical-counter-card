export default String.raw`
      .counter-window {
        position: relative;
        z-index: 2;
        flex: 0 0 auto;
        padding:
          calc(7px * var(--counter-scale))
          calc(8px * var(--counter-scale));
        overflow: hidden;
        border-radius: calc(4px * var(--counter-scale));
        border:
          calc(2px * var(--counter-scale))
          solid rgba(8, 8, 8, 0.98);
        background:
          linear-gradient(180deg, #050505, #161616 44%, #030303);
        box-shadow:
          0 0 0 calc(1px * var(--counter-scale)) rgba(174,174,174,0.58),
          0 0 0 calc(3px * var(--counter-scale)) rgba(5,5,5,0.98),
          0 0 0 calc(5px * var(--counter-scale)) rgba(31,31,31,0.96),
          inset 0 calc(7px * var(--counter-scale)) calc(9px * var(--counter-scale)) rgba(0, 0, 0, 0.94),
          inset 0 calc(-5px * var(--counter-scale)) calc(8px * var(--counter-scale)) rgba(0, 0, 0, 0.85);
      }

      .drum-bed {
        position: relative;
        z-index: 1;
        display: flex;
        align-items: center;
        height: calc(var(--digit-height) * var(--counter-scale));
        overflow: hidden;
        border-radius: calc(2px * var(--counter-scale));
        background: #020202;
        box-shadow:
          inset 0 0 calc(16px * var(--counter-scale)) rgba(0,0,0,1),
          0 calc(1px * var(--counter-scale)) 0 rgba(255,255,255,0.18);
      }

      .digit-slot {
        position: relative;
        flex: 0 0 calc(var(--digit-width) * var(--counter-scale));
        width: calc(var(--digit-width) * var(--counter-scale));
        height: calc(var(--digit-height) * var(--counter-scale));
        overflow: hidden;
        border-right:
          calc(1px * var(--counter-scale))
          solid rgba(255,255,255,0.08);
        border-left:
          calc(1px * var(--counter-scale))
          solid rgba(0,0,0,0.92);
        background:
          radial-gradient(
            ellipse at 50% 49%,
            #292929 0%,
            #101010 46%,
            #030303 78%,
            #000 100%
          );
        box-shadow:
          inset calc(8px * var(--counter-scale)) 0 calc(12px * var(--counter-scale)) rgba(0,0,0,0.72),
          inset calc(-8px * var(--counter-scale)) 0 calc(12px * var(--counter-scale)) rgba(0,0,0,0.7);
        perspective: calc(300px * var(--counter-scale));
      }

      .digit-slot:first-child {
        border-left: 0;
      }

      .digit-slot:last-child {
        border-right: 0;
      }

      .digit-track {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        will-change: transform;
      }

      .digit-track:has(.digit-face + .digit-face) {
        height: 200%;
      }

      .digit-face {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        padding-bottom: calc(2px * var(--counter-scale));
        font-family:
          "Arial Narrow",
          "Roboto Condensed",
          "Helvetica Neue",
          Arial,
          sans-serif;
        font-size: calc(var(--digit-height) * var(--counter-scale) * 0.71);
        font-weight: 300;
        font-stretch: condensed;
        line-height: 1;
        font-variant-numeric: tabular-nums;
        color: var(--integer-color);
        letter-spacing: calc(-1.7px * var(--counter-scale));
        text-shadow:
          0 calc(1px * var(--counter-scale)) 0 rgba(255,255,255,0.35),
          0 calc(2px * var(--counter-scale)) calc(2px * var(--counter-scale)) rgba(0,0,0,0.95),
          calc(1px * var(--counter-scale)) 0 0 rgba(0,0,0,0.85),
          calc(-1px * var(--counter-scale)) 0 0 rgba(0,0,0,0.85);
        transform: rotateX(-1deg);
      }

      .digit-track:has(.digit-face + .digit-face) .digit-face {
        height: 50%;
      }

      .decimal-digit .digit-face {
        color: var(--decimal-color);
        text-shadow:
          0 calc(1px * var(--counter-scale)) 0 rgba(255,255,255,0.14),
          0 calc(2px * var(--counter-scale)) calc(3px * var(--counter-scale)) rgba(0,0,0,0.95),
          0 0 calc(6px * var(--counter-scale)) color-mix(in srgb, var(--decimal-color) 28%, transparent);
      }

      .digit-highlight {
        position: absolute;
        z-index: 4;
        pointer-events: none;
        top: calc(7px * var(--counter-scale));
        left: 16%;
        width: 68%;
        height: calc(3px * var(--counter-scale));
        border-radius: 50%;
        background: rgba(255,255,255,0.21);
        filter: blur(calc(0.45px * var(--counter-scale)));
        opacity: 0.78;
      }

      .digit-shadow-top,
      .digit-shadow-bottom {
        position: absolute;
        z-index: 3;
        left: 0;
        width: 100%;
        height: 29%;
        pointer-events: none;
      }

      .digit-shadow-top {
        top: 0;
        background: linear-gradient(
          180deg,
          rgba(0,0,0,0.96),
          rgba(0,0,0,0.42) 55%,
          transparent
        );
      }

      .digit-shadow-bottom {
        bottom: 0;
        background: linear-gradient(
          0deg,
          rgba(0,0,0,0.92),
          rgba(0,0,0,0.36) 52%,
          transparent
        );
      }

      .decimal-separator {
        position: relative;
        z-index: 2;
        display: flex;
        align-items: flex-end;
        justify-content: center;
        flex: 0 0 calc(14px * var(--counter-scale));
        width: calc(14px * var(--counter-scale));
        height: calc(var(--digit-height) * var(--counter-scale));
        padding-bottom: calc(8px * var(--counter-scale));
        color: var(--decimal-color);
        background:
          linear-gradient(180deg, #080808, #181818 47%, #050505);
        font-family: Arial, sans-serif;
        font-size: calc(31px * var(--counter-scale));
        font-weight: 500;
        line-height: 1;
        text-shadow:
          0 calc(2px * var(--counter-scale)) calc(3px * var(--counter-scale)) rgba(0,0,0,0.95),
          0 0 calc(5px * var(--counter-scale)) color-mix(in srgb, var(--decimal-color) 25%, transparent);
        box-shadow:
          inset calc(5px * var(--counter-scale)) 0 calc(8px * var(--counter-scale)) rgba(0,0,0,0.52),
          inset calc(-5px * var(--counter-scale)) 0 calc(8px * var(--counter-scale)) rgba(0,0,0,0.52);
      }

      .glass {
        position: absolute;
        z-index: 8;
        inset: 0;
        overflow: hidden;
        pointer-events: none;
        border-radius: inherit;
        background:
          linear-gradient(
            112deg,
            rgba(255,255,255,0.11) 0%,
            rgba(255,255,255,0.018) 26%,
            transparent 48%,
            rgba(255,255,255,0.025) 70%,
            rgba(255,255,255,0.10) 100%
          );
        box-shadow:
          inset 0 calc(1px * var(--counter-scale)) 0 rgba(255,255,255,0.18),
          inset 0 calc(-1px * var(--counter-scale)) 0 rgba(0,0,0,0.58);
      }

      .glass-glare {
        position: absolute;
        top: -36%;
        left: -8%;
        width: 78%;
        height: 58%;
        transform: rotate(-5deg);
        border-radius: 50%;
        background: linear-gradient(
          180deg,
          rgba(255,255,255,0.17),
          rgba(255,255,255,0.025) 58%,
          transparent
        );
        filter: blur(calc(1.8px * var(--counter-scale)));
      }


`;
