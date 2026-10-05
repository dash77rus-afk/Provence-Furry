# Provence Furry — Waifu NPC

Minecraft Bedrock addon for **Provence Furry** server.

**Repo is connected and receiving updates** ✅

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

## Currently in this repo
- BP: manifest, items (rings), interaction proxy entity, texts.js
- RP: manifest, Ribbuny + fox animation controllers, particles, sounds defs, item_texture, proxy client entity

## Still uploading (next commits)
- `BP/scripts/main.js` (core script ~255KB)
- BP entity JSONs (lover_npc, sleep variants)
- RP animations, geo models, textures PNG, sounds OGG

## Install (for now)
Use the built `.mcaddon` from chat until full source is mirrored:
`Waifu_NPC_1.0.53_ASK_MENU_RIB_SLEEP.mcaddon`

Then enable **both** BP + RP in world settings.

## Notes
- Script API `@minecraft/server` + `@minecraft/server-ui` required
- Min engine 1.21+
