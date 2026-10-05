# Provence Furry — Waifu NPC

Minecraft Bedrock addon for **Provence Furry** server.

**GitHub connected** ✅ · Structure: `Waifu_NPC/BP` + `Waifu_NPC/RP`

## Version 1.0.53
- **Спросить** (Ask) in Control Panel + Interactions
- Ribbuny sleep freeze fix (loop + AC lock + stickySleepPose)
- Dance button label fixed
- Hunger: 3 min per point

## In this repo (source)
### BP
- manifest, items (rings), interaction proxy
- `entities/lover_npc.json` (core)
- `scripts/texts.js` (Russian UI)
- `scripts/README_MAIN.md` (notes on full main.js)

### RP
- manifest, render controllers, particles, sounds defs
- animation controllers: fox + **Ribbuny** (sleep lock)
- client entities, player interactions anim, fox extra
- models: Lemi, Rin, NPC (base)

## Large files — use the mcaddon
Until fully mirrored, install from chat artifact:

**`Waifu_NPC_1.0.53_ASK_MENU_RIB_SLEEP.mcaddon`**

Contains full `main.js`, ribbuny.animation.json, sleep geos, textures, sounds.

## Install
1. Import the `.mcaddon`
2. Enable **both** Behavior + Resource packs
3. Script API required (`@minecraft/server`, `@minecraft/server-ui`)
