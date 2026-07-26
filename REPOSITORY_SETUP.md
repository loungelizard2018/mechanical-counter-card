# Repository setup checklist

Repository:

```text
loungelizard2018/mechanical-counter-card
```

Recommended GitHub settings:

- Visibility: Public
- Default branch: main
- Licence: MIT
- Issues: enabled
- Description: Photorealistic responsive mechanical counter card for Home Assistant
- Topics: home-assistant, hacs, lovelace, custom-card, home-assistant-frontend

After the initial package is committed:

1. Confirm the `Validate` workflow passes.
2. Create and push tag `v1.4.0`.
3. The release workflow creates a GitHub release and attaches `mechanical-counter-card.js`.
4. Add the repository to HACS as a custom repository with category `Dashboard`.
