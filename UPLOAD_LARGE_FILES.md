# Manual upload checklist (large / binary)

Upload these from `Waifu_NPC_1.0.53_ASK_MENU_RIB_SLEEP.mcaddon` via GitHub web UI:

## Critical
- [ ] `Waifu_NPC/BP/scripts/main.js` (~255 KB)
- [ ] `Waifu_NPC/RP/animations/ribunny.animation.json` (~1.6 MB)

## Optional full fidelity
- [ ] `Waifu_NPC/RP/models/entity/lover_fox.geo.json`
- [ ] `Waifu_NPC/RP/models/entity/lover_fox_sleep.geo.json`
- [ ] `Waifu_NPC/RP/models/entity/lover_npc_sleep.geo.json`
- [ ] Full BP `lover_npc.json` / sleep entities (repo has simplified stubs)

## Binaries (textures + sounds)
From mcaddon folders:
- `Waifu NPC R/textures/**` → `Waifu_NPC/RP/textures/`
- `Waifu NPC R/sounds/**` → `Waifu_NPC/RP/sounds/`
- `pack_icon.png` → BP and RP roots

## How
1. Extract the `.mcaddon` (rename to `.zip` if needed)
2. GitHub → Add file → Upload files
3. Keep the same paths as in this repo
