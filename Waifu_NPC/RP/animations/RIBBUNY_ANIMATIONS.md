# Ribbuny animations

Full `ribunny.animation.json` is **~1.6 MB** and exceeds the GitHub connector upload size per request.

## Already in repo (split form)
Bedrock loads multiple animation JSON files from `animations/` — keys are the animation identifiers, not filenames.

| File | Animation key |
|------|----------------|
| `ribunny_base_carried.animation.json` | `animation.palforge.ribunny.base_carried` |
| `ribunny_hit.animation.json` | `animation.ribunny.hit` (simplified) |

## Full file (required for production)
Copy from the release pack:

```
Waifu_NPC_1.0.53_ASK_MENU_RIB_SLEEP.mcaddon
  → Waifu NPC R/animations/ribunny.animation.json
```

### Upload manually (GitHub website)
1. Open https://github.com/dash77rus-afk/Provence-Furry
2. Go to `Waifu_NPC/RP/animations/`
3. **Add file → Upload files**
4. Drop `ribunny.animation.json`
5. Commit

Same for `main.js` (~255 KB) under `Waifu_NPC/BP/scripts/`.

### Split keys (if uploading parts)
- `animation.ribunny.idle`
- `animation.ribunny.walk`
- `animation.ribunny.run`
- `animation.ribunny.sleep`
- `animation.ribunny.sleep_hold`  ← critical for sleep freeze fix
- `animation.ribunny.jump`
- `animation.ribunny.rest01`
- `animation.ribunny.rest02`
- `animation.ribunny.petting`
- `animation.ribunny.hit`
- `animation.palforge.ribunny.base_carried`
