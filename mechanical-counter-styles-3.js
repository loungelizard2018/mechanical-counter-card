export default String.raw`
      .register-meta {
        position: relative;
        z-index: 2;
        display: flex;
        align-items: baseline;
        gap: calc(10px * var(--counter-scale));
        flex: 0 0 auto;
        white-space: nowrap;
        color: var(--meta-color);
        text-shadow:
          0 calc(1px * var(--counter-scale)) 0 rgba(255,255,255,0.10),
          0 calc(1px * var(--counter-scale)) calc(2px * var(--counter-scale)) rgba(0,0,0,0.88);
        font-family:
          "Helvetica Neue",
          Arial,
          sans-serif;
      }

      .frame-black .register-meta {
        color: var(--meta-color);
        text-shadow: 0 calc(1px * var(--counter-scale)) calc(2px * var(--counter-scale)) rgba(0,0,0,0.9);
      }

      .register-label {
        font-size: calc(25px * var(--counter-scale));
        font-weight: 400;
        letter-spacing: calc(0.25px * var(--counter-scale));
        color: var(--label-color);
      }

      .register-unit {
        font-size: calc(22px * var(--counter-scale));
        font-weight: 350;
        color: var(--unit-color);
      }

      .screw {
        position: absolute;
        z-index: 10;
        width: calc(var(--screw-size) * var(--counter-scale));
        height: calc(var(--screw-size) * var(--counter-scale));
        border-radius: 50%;
        pointer-events: none;
        background:
          radial-gradient(circle at 32% 30%, rgba(255,255,255,.34) 0%, rgba(255,255,255,.10) 16%, rgba(255,255,255,0) 34%),
          radial-gradient(circle at 50% 48%, #4c4d50 0%, #2e3033 24%, #121314 58%, #020202 78%, #5a5c60 100%);
        box-shadow:
          inset 0 calc(1px * var(--counter-scale)) calc(1px * var(--counter-scale)) rgba(255,255,255,.14),
          inset 0 calc(-2px * var(--counter-scale)) calc(4px * var(--counter-scale)) rgba(0,0,0,.92),
          0 calc(1px * var(--counter-scale)) calc(2px * var(--counter-scale)) rgba(0,0,0,.75);
      }

      .screw::before,
      .screw::after {
        content: "";
        position: absolute;
        left: 50%;
        top: 50%;
        width: 62%;
        height: 14%;
        border-radius: 999px;
        background: linear-gradient(180deg, #050505 0%, #393b3f 45%, #090909 100%);
        box-shadow:
          inset 0 calc(1px * var(--counter-scale)) calc(1px * var(--counter-scale)) rgba(255,255,255,.10),
          0 calc(.5px * var(--counter-scale)) calc(1px * var(--counter-scale)) rgba(0,0,0,.65);
        transform: translate(-50%, -50%) rotate(var(--slot-rot, 0deg));
      }

      .screw::after {
        transform: translate(-50%, -50%) rotate(calc(var(--slot-rot, 0deg) + 90deg));
      }

      .screw-top-left {
        top: calc(9px * var(--counter-scale));
        left: calc(9px * var(--counter-scale));
        --slot-rot: -18deg;
      }

      .screw-top-right {
        top: calc(9px * var(--counter-scale));
        right: calc(9px * var(--counter-scale));
        --slot-rot: 12deg;
      }

      .screw-bottom-left {
        bottom: calc(9px * var(--counter-scale));
        left: calc(9px * var(--counter-scale));
        --slot-rot: 8deg;
      }

      .screw-bottom-right {
        bottom: calc(9px * var(--counter-scale));
        right: calc(9px * var(--counter-scale));
        --slot-rot: -12deg;
      }

      @media (max-width: 600px) {
        ha-card {
          padding: 8px;
        }

        .card-content {
          gap: 12px;
        }

        .register {
          width: 100%;
          max-width: 100%;
          overflow: hidden;
          padding: 0;
        }
      }

      @media (prefers-reduced-motion: reduce) {
        .digit-track {
          transition: none !important;
        }
      }
    
`;
