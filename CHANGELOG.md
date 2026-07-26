# Changelog

## 1.4.2

- Removed the unreliable bitmap screw rendering.
- Added four deterministic CSS-rendered black cross-head screws with metallic depth and individual slot angles.
- Eliminated the corrupted top-left screw, missing corner screws and coloured edge artefacts.
- Preserved the fixed gauge housing geometry and responsive fitting behaviour.

## 1.4.1

- Replaced the three corrupted corner screw assets with one verified clean gauge screw asset.
- Rotated the clean screw asset per corner to preserve directional lighting.
- Clipped the screw image edges to remove stray coloured pixels.
- Kept the gauge housing padding identical whether `screws` is enabled or disabled.
- Replaced the synthetic README preview with a real browser-rendered screenshot of the card.

## 1.4.0

- Added automatic responsive fitting using `ResizeObserver`.
- The complete housing, screws, counter window, digits, label and unit now scale as one element.
- Prevented the card from imposing a min-content width on Home Assistant grid columns.
- Removed horizontal scrolling on narrow dashboard columns.
- Added HACS repository metadata and validation/release workflows.

## 1.3.0

- Reused the original black housing texture and black cross-head screw assets from the matching analog gauge.
- Added configurable label, unit and digit colours.

## 1.0.0

- Initial mechanical counter implementation.
