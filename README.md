# Provence Furry — Waifu NPC

![Waifu NPC](image%20(17).jpg)

Minecraft Bedrock addon for **Provence Furry** server.

**GitHub connected** ✅ · Structure: `Waifu_NPC/BP` + `Waifu_NPC/RP`

## Version 1.0.53+
- **Спросить** (Ask) in Control Panel + Interactions
- Ribbuny sleep freeze fix (loop + AC lock + stickySleepPose)
- Dance button label fixed
- **Hunger system** (see below)
- Nametag HUD: hearts (HP) + meat icon (hunger)

### Hunger
- Scale **0–20** (like player food)
- Decay **1 point / 6 minutes** while awake (`HUNGER_DECAY_TICKS = 7200`)
- **Paused** while sleeping or carried
- Feed with normal food (apple, bread, cooked meat, golden apple, …)
- Nametag example:
  - name
  - ♥ HP current/max
  - 🍖 hunger current/20
- Levels: 20/20 full · 10/20 half · 4/20 hungry · 0/20 starving

## Repo layout
### BP
- `scripts/main.js` (core + hunger + menus)
- `scripts/texts.js` (Russian UI)
- entities, items, manifest

### RP
- models, animations (incl. full ribbuny), AC, particles, sounds
- textures: upload PNG under `textures/entity|items|particle|ui/lover_panel`

## Install
1. Use full pack from repo or `.mcaddon`
2. Enable **both** BP + RP
3. Script API: `@minecraft/server`, `@minecraft/server-ui`
