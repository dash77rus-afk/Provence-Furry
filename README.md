# Provence Furry — Waifu NPC

Minecraft Bedrock addon for **Provence Furry** server.

## Version
**1.0.53** — Ask menu + Ribbuny sleep fix

### Changelog 1.0.53
- Added **Спросить** (Ask) to main panel and Interactions menu
- Fixed Ribbuny sleep freeze (loop + animation controller lock)
- Dance button label corrected

## Pack structure
```
Waifu_NPC/
  BP/   # Behavior pack (entities, scripts, items)
  RP/   # Resource pack (models, animations, textures, sounds)
```

## Install
1. Build `.mcaddon` from BP + RP folders, or use the release artifact
2. Import into Minecraft Bedrock
3. Enable both packs in world settings

## Notes
- Binary assets (PNG, OGG) may be added in follow-up commits
- Script API / `@minecraft/server` required
