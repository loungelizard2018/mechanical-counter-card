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
        display: block;
        width: calc(var(--screw-size) * var(--counter-scale));
        height: calc(var(--screw-size) * var(--counter-scale));
        object-fit: contain;
        pointer-events: none;
        filter:
          saturate(.96)
          contrast(1.03)
          drop-shadow(0 calc(1px * var(--counter-scale)) calc(2px * var(--counter-scale)) rgba(0,0,0,.48));
      }

      .screw-top-left {
        top: calc(9px * var(--counter-scale));
        left: calc(9px * var(--counter-scale));
      }

      .screw-top-right {
        top: calc(9px * var(--counter-scale));
        right: calc(9px * var(--counter-scale));
      }

      .screw-bottom-left {
        bottom: calc(9px * var(--counter-scale));
        left: calc(9px * var(--counter-scale));
      }

      .screw-bottom-right {
        bottom: calc(9px * var(--counter-scale));
        right: calc(9px * var(--counter-scale));
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
