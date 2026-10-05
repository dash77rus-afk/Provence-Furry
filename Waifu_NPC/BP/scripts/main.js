
function textSplitReadyFullV3012() {
  return TEXT?.menu?.mainTitle ?? "Waifu Provence Furry";
}

function setNpcRunningState(npc, running) {
  try { safeSetProperty(npc, "quan:is_running", !!running); } catch (e) {}
}
// Waifu NPC MEGA v22Y + Lemi the Cat: profile menu + 10 skin slots based on v22X.
import { world, system, ItemStack, EntityDamageCause, EquipmentSlot } from "@minecraft/server";
import { ActionFormData, ModalFormData } from "@minecraft/server-ui";
import { TEXT, pickText } from "./texts.js";

const NPC_ID = "quan:lover_npc";
const SLEEP_NPC_ID = "quan:lover_npc_sleep";
const FOX_SLEEP_NPC_ID = "quan:lover_npc_fox_sleep";
const RING_ID = "quan:love_ring";
const BONDED_RING_ID = "quan:bonded_love_ring";
const BROKEN_RING_ID = "quan:broken_love_ring";
const PROXY_ID = "quan:lover_interaction_proxy";
const RING_RECEIVED_TAG = "lover_ring_received";
const NPC_SUMMONED_TAG = "lover_npc_summoned";

const RESCUE_DISTANCE = 36;
const SPAWN_DELAY_TICKS = 5;
const AFFECTION_OBJECTIVE = "lover_affection";
const AFFECTION_PROPERTY = "lover_affection";
const HAS_NPC_PROPERTY = "lover_has_npc";
const NPC_ALIVE_PROPERTY = "lover_npc_alive";
const NPC_LAST_MODE_PROPERTY = "lover_npc_last_mode";
const NPC_OUTFIT_PROPERTY = "lover_npc_outfit";
const FOX_SKIN_PROPERTY = "lover_fox_skin";
const NPC_DEATH_DIM_PROPERTY = "lover_npc_death_dim";
const NPC_DEATH_X_PROPERTY = "lover_npc_death_x";
const NPC_DEATH_Y_PROPERTY = "lover_npc_death_y";
const NPC_DEATH_Z_PROPERTY = "lover_npc_death_z";
const TARGET_ASSIST_PROPERTY = "lover_target_assist_enabled";
const AUTO_COMBAT_PROPERTY = "lover_auto_combat_enabled";
const AUTO_HEAL_PROPERTY = "lover_auto_heal_enabled";
const AUTO_GIFT_PROPERTY = "lover_auto_gift_enabled";
const TALK_AUTO_PROPERTY = "lover_talk_auto_enabled";
const DAILY_SCHEDULE_PROPERTY = "lover_daily_schedule_enabled";
const NPC_STORAGE_PROPERTY = "lover_npc_storage_v1";
const NPC_EQUIPMENT_PROPERTY = "lover_npc_equipment_v1";
const NPC_CUSTOM_NAME_PROPERTY = "lover_npc_custom_name";
const NPC_HP_APPLIED_PROPERTY = "lover_npc_hp_applied_max";
const STORAGE_PAGE_SIZE = 10;
const PLAYER_GRID_PAGE_SIZE = 10;
const STORAGE_MAX_SLOTS = 20;
const AFFECTION_MAX = 300;
const NPC_HP_MIN = 50;
const NPC_HP_MAX = 200;
const NPC_ACTIONBAR_DISTANCE = 6;
const NPC_ACTIONBAR_TICKS = 20;
const NPC_HP_SYNC_TICKS = 40;
const RECALL_DISTANCE_NORMAL = 80;
const RECALL_DISTANCE_REST = 32;
const RECALL_DISTANCE_SLEEP = 18;

const GIFT_COOLDOWN_TICKS = 100;        // 5 giĂ¢y: trĂ¡nh spam quĂ  Ä‘á»ƒ farm Ä‘iá»ƒm quĂ¡ nhanh
const TALK_COOLDOWN_TICKS = 1200;       // 60 giĂ¢y: nĂ³i chuyá»‡n chá»‰ tÄƒng Ä‘iá»ƒm nháº¹ theo cooldown
const TALK_TOPIC_COOLDOWN_TICKS = 6000;  // 5 phĂºt: má»—i nhĂ³m thoáº¡i cá»™ng Bond nháº¹
const AUTO_TALK_COOLDOWN_TICKS = 24000; // ~20 мин при auto chat   // 4 phĂºt: tá»± nĂ³i chuyá»‡n khi Ä‘á»©ng gáº§n
const DAILY_SCHEDULE_COOLDOWN_TICKS = 12000; // 5 phĂºt: lá»‹ch sinh hoáº¡t nháº¯c nháº¹
const REACTIVE_CHAT_COOLDOWN_TICKS = 600;
const HURT_MOB_CHAT_COOLDOWN_TICKS = 800;
const LOW_HP_CHAT_COOLDOWN_TICKS = 1200;
const CRITICAL_HP_CHAT_COOLDOWN_TICKS = 900;
const AMBIENT_CHAT_COOLDOWN_TICKS = 36000;
const HEAL_COOLDOWN_TICKS = 1200;       // 60 giĂ¢y
const MANUAL_GIFT_COOLDOWN_TICKS = 2400;// 120 giĂ¢y
const AUTO_GIFT_INTERVAL_TICKS = 6000;  // 5 phĂºt
const AUTO_HEAL_COOLDOWN_TICKS = 800;   // 40 giĂ¢y
const AUTO_FEATURE_CHECK_TICKS = 200;
const REST_SLEEP_TICK_INTERVAL = 80;
const REST_BOND_REWARD_COOLDOWN_TICKS = 12000;
const TARGET_ASSIST_DURATION_TICKS = 300;      // 15 giĂ¢y: NPC Æ°u tiĂªn mob báº¡n vá»«a Ä‘Ă¡nh
const TARGET_ASSIST_MAX_OWNER_DISTANCE = 24;
const TARGET_ASSIST_MAX_NPC_DISTANCE = 28;
const TARGET_ASSIST_STRIKE_DISTANCE = 6.0;
const TARGET_ASSIST_NUDGE_COOLDOWN_TICKS = 30;
const MOVE_TRACK_EVERY_TICKS = 2;
const MOVE_EPSILON_SQ = 0.0004;

const VOICE_COOLDOWN_TICKS = {
  hello: 1000,
  talk: 300,
  gift: 200,
  sleep: 150,
  wake: 150,
  hurt: 200,
  free_idle: 400
};


const UNLOCK_GIFT = 80;
const UNLOCK_HEAL = 100;
const UNLOCK_GUARD = 150;
const UNLOCK_AUTO_GIFT = 180;
const UNLOCK_GUARD_TIER_2 = 220;
const UNLOCK_GUARD_TIER_3 = 280;
const UNLOCK_STORAGE_1 = 80;
const UNLOCK_STORAGE_2 = 150;
const UNLOCK_STORAGE_3 = 220;
const UNLOCK_EQUIP_WEAPON = 150;
const UNLOCK_EQUIP_ARMOR = 220;
const QUICK_EQUIP_DISTANCE = 3.5;
const QUICK_EQUIP_MENU_BLOCK_TICKS = 12;
const NPC_EQUIPMENT_AUTO_SYNC_TICKS = 120;
const BOW_MIN_DISTANCE = 2.5;
const BOW_MAX_DISTANCE = 22.0;
const BOW_TARGET_SEARCH_RADIUS = 24.0;
const AUTO_ROAM_TAG = "lover_auto_roam";
const AUTO_ROAM_NEAR_DISTANCE = 8;
const AUTO_ROAM_FOLLOW_DISTANCE = 15;

const MODE_TAGS = [
  "lover_mode_follow",
  "lover_mode_stay",
  "lover_mode_guard",
  "lover_mode_idle",
  "lover_mode_sit",
  "lover_mode_sleep",
  "lover_mode_rest",
  "lover_mode_crawl"
];

const HP_SCALE_TAGS = [
  "lover_hp_50",
  "lover_hp_70",
  "lover_hp_90",
  "lover_hp_120",
  "lover_hp_150",
  "lover_hp_180",
  "lover_hp_200"
];

const OUTFITS = [
  { value: 0, name: "Chibi NPC" },
  { value: 1, name: "Ribbuny" },
  { value: 2, name: "Lemi the Cat" },
  { value: 3, name: "Rin the Kitsune" }
];

const FOX_SKINS = [{ value: 0, name: "Fox" }];

const OUTFIT_UNLOCKS = [0, 0, 0, 0];
const FOX_UNLOCK_AFFECTION = OUTFIT_UNLOCKS[1];

const UI_ICON = {
  status: "textures/ui/lover_panel/icon_relation",
  action: "textures/ui/lover_panel/icon_action",
  care: "textures/ui/lover_panel/care",
  combat: "textures/ui/lover_panel/icon_combat",
  inventory: "textures/ui/lover_panel/icon_bag",
  equipment: "textures/ui/lover_panel/equipment",
  outfit: "textures/ui/lover_panel/icon_outfit",
  settings: "textures/ui/lover_panel/icon_settings",
  close: "textures/ui/lover_panel/close_btn",
  ring: "textures/items/bonded_love_ring",
  follow: "textures/ui/lover_panel/icon_follow",
  sit: "textures/ui/lover_panel/icon_rest",
  heart: "textures/ui/lover_panel/icon_heart",
  heal: "textures/ui/lover_panel/icon_shield",
  gift: "textures/ui/lover_panel/icon_chest",
  storage: "textures/ui/lover_panel/icon_bag"
};


// --- Hunger system (Waifu Provence Furry) ---
const HUNGER_MAX = 20;
const HUNGER_DECAY_TICKS = 7200; // ~6 min per point when awake
const lastHungerDecayTick = new Map();

function getNpcHunger(npc) {
  try {
    const v = npc.getDynamicProperty("quan:hunger");
    if (typeof v === "number" && !Number.isNaN(v)) return Math.max(0, Math.min(HUNGER_MAX, Math.floor(v)));
  } catch (e) {}
  return HUNGER_MAX;
}

function setNpcHunger(npc, value) {
  try {
    const v = Math.max(0, Math.min(HUNGER_MAX, Math.floor(value)));
    npc.setDynamicProperty("quan:hunger", v);
  } catch (e) {}
}

function hungerFoodRestore(typeId) {
  if (!typeId) return 0;
  const id = String(typeId).replace("minecraft:", "");
  const table = {
    enchanted_golden_apple: 20,
    golden_apple: 12,
    golden_carrot: 10,
    cooked_beef: 10,
    cooked_porkchop: 10,
    cooked_mutton: 8,
    cooked_chicken: 8,
    cooked_salmon: 8,
    cooked_cod: 7,
    bread: 6,
    baked_potato: 6,
    pumpkin_pie: 8,
    cake: 10,
    cookie: 3,
    apple: 5,
    carrot: 4,
    beetroot: 2,
    melon_slice: 3,
    sweet_berries: 3,
    glow_berries: 3,
    honey_bottle: 6
  };
  if (table[id] != null) return table[id];
  if (id.includes("cooked")) return 8;
  if (id.includes("apple") || id.includes("bread") || id.includes("berry")) return 4;
  return 0;
}

function feedNpcFromItem(player, npc, itemTypeId) {
  const restore = hungerFoodRestore(itemTypeId);
  if (restore <= 0) return false;
  const before = getNpcHunger(npc);
  if (before >= HUNGER_MAX) {
    try { msg(player, "§7She is not hungry right now."); } catch (e) {}
    return false;
  }
  if (!removeItems(player, itemTypeId, 1)) return false;
  const after = Math.min(HUNGER_MAX, before + restore);
  setNpcHunger(npc, after);
  try {
    msg(player, `§aFed §f${getNpcDisplayNameFrom(player, npc)}§a. Hunger §e${after}/${HUNGER_MAX}`);
  } catch (e) {}
  try { spawnLoveParticles(npc, 4); } catch (e) {}
  return true;
}


function stickySleepPose() {
  for (const dimensionId of ["overworld", "nether", "the_end"]) {
    let dimension;
    try { dimension = world.getDimension(dimensionId); } catch (e) { continue; }
    for (const npc of dimension.getEntities({ type: NPC_ID })) {
      try {
        if (hasTag(npc, "lover_mode_sleep") || hasTag(npc, "lover_mode_rest")) {
          safeSetProperty(npc, "quan:is_sleeping", true);
          safeSetProperty(npc, "quan:is_sitting", false);
          safeSetProperty(npc, "quan:is_moving", false);
          safeSetProperty(npc, "quan:is_running", false);
        }
      } catch (e) {}
    }
  }
}

function updateNpcHungerDecay() {
  const now = tickNow();
  for (const dimensionId of ["overworld", "nether", "the_end"]) {
    let dimension;
    try { dimension = world.getDimension(dimensionId); } catch (e) { continue; }
    for (const npc of dimension.getEntities({ type: NPC_ID })) {
      try {
        if (safeGetProperty(npc, "quan:is_sleeping", false) === true) continue;
        if (safeGetProperty(npc, "quan:is_carrying", false) === true) continue;
        const last = lastHungerDecayTick.get(npc.id) ?? now;
        if (now - last < HUNGER_DECAY_TICKS) continue;
        lastHungerDecayTick.set(npc.id, now);
        const h = getNpcHunger(npc);
        if (h > 0) setNpcHunger(npc, h - 1);
        if (h - 1 <= 4 && h > 4) {
          const owner = getTrueOwner(npc);
          if (owner) try { msg(owner, "§eYour waifu is getting hungry. Feed her some food."); } catch (e) {}
        }
      } catch (e) {}
    }
  }
}

const lastNpcLocations = new Map();
const lastPlayerGiftTick = new Map();
const lastTalkTick = new Map();
const lastTalkTopicTick = new Map();
const lastAutoTalkTick = new Map();
const lastDailyScheduleTick = new Map();
const lastReactiveChatTick = new Map();
const lastPickedLineText = new Map();
const lastManualGiftTick = new Map();
const lastHealTick = new Map();
const lastAutoHealTick = new Map();
const lastAutoGiftTick = new Map();
const lastCombatMsgTick = new Map();
const lastScriptAttackTick = new Map();
const lastFoxRiderAttackPhaseV309 = new Map();
const targetAssistLocks = new Map();
const combatTargetCache = new Map();
const lastTargetAssistNudgeTick = new Map();
const sleepPoseMemory = new Map();
const lastRestHealTick = new Map();
const restBondNearTicks = new Map();
const lastRestBondRewardTick = new Map();
const lastEquipmentSyncReport = new Map();
const quickEquipMenuBlockUntil = new Map();
const loverVoiceCooldown = new Map();
const healthFinalizeTokens = new Map();

// v1.0.16: synchronized player/NPC interaction states.
const activeCarryTargets = new Map();
const activePairInteractions = new Map();


function tickNow() {
  try {
    return system.currentTick ?? 0;
  } catch (e) {
    return 0;
  }
}


const intervalErrorLogCooldown = new Map();

function warnIntervalErrorOnce(label, error, cooldownTicks = 200) {
  const now = tickNow();
  const last = intervalErrorLogCooldown.get(label) ?? -999999;
  if (now - last < cooldownTicks) return;
  intervalErrorLogCooldown.set(label, now);
  try {
    console.warn(`[LoverNPC] ${label}: ${String(error?.message ?? error)}`);
  } catch (e) {}
}

function safeInterval(label, callback) {
  try {
    callback();
  } catch (e) {
    warnIntervalErrorOnce(label, e);
  }
}



function playLoverVoice(npc, player, voiceKey, volume = 1.0, pitch = 1.0) {
  if (!voiceKey) return false;

  const now = tickNow();
  const id = `${npc?.id ?? player?.id ?? "lover_npc"}:${voiceKey}`;
  const cooldown = VOICE_COOLDOWN_TICKS[voiceKey] ?? 40;
  const last = loverVoiceCooldown.get(id) ?? -999999;

  if (now - last < cooldown) return false;
  loverVoiceCooldown.set(id, now);

  const soundId = `quan.lover_npc.${voiceKey}`;

  // CĂ¡ch 1: API trá»±c tiáº¿p cá»§a Bedrock. CĂ¡ch nĂ y cháº¯c hÆ¡n runCommandAsync.
  try {
    if (player && typeof player.playSound === "function") {
      player.playSound(soundId, { volume, pitch });
      return true;
    }
  } catch (e) {}

  // CĂ¡ch 2: fallback báº±ng lá»‡nh, phĂ¡t ngay táº¡i player.
  try {
    if (player) {
      player.runCommandAsync(`playsound ${soundId} @s ~ ~ ~ ${volume} ${pitch}`);
      return true;
    }
  } catch (e) {}

  // CĂ¡ch 3: fallback cuá»‘i cĂ¹ng, phĂ¡t quanh vá»‹ trĂ­ NPC cho má»i ngÆ°á»i gáº§n Ä‘Ă³.
  try {
    if (npc) {
      const loc = npc.location;
      npc.dimension.runCommandAsync(
        `playsound ${soundId} @a ${loc.x} ${loc.y} ${loc.z} ${volume} ${pitch}`
      );
      return true;
    }
  } catch (e) {}

  return false;
}


function openMenuLater(callback, delayTicks = 2) {
  try {
    system.runTimeout(() => {
      try { callback(); } catch (e) {}
    }, delayTicks);
  } catch (e) {
    try { system.run(() => callback()); } catch (err) {}
  }
}

function isRingTypeId(typeId) {
  return typeId === RING_ID || typeId === BONDED_RING_ID || typeId === BROKEN_RING_ID;
}

function isRingItemStack(item) {
  return !!(item && item.typeId && isRingTypeId(item.typeId));
}

function run(source, command) {
  try {
    source.runCommandAsync(command);
  } catch (e) {}
}

function runGlobal(command) {
  try {
    world.getDimension("overworld").runCommandAsync(command);
  } catch (e) {}
}

function msg(player, text) {
  try {
    player.sendMessage(text);
  } catch (e) {
    run(player, `tellraw @s {"rawtext":[{"text":"${text}"}]}`);
  }
}

function safeSetProperty(entity, name, value) {
  try {
    entity.setProperty(name, value);
    return true;
  } catch (e) {
    return false;
  }
}

function safeGetProperty(entity, name, fallback = undefined) {
  try {
    const value = entity.getProperty(name);
    return value === undefined ? fallback : value;
  } catch (e) {
    return fallback;
  }
}

function addTag(entity, tag) {
  try {
    entity.addTag(tag);
  } catch (e) {}
}

function removeTag(entity, tag) {
  try {
    entity.removeTag(tag);
  } catch (e) {}
}

function hasTag(entity, tag) {
  try {
    return entity.hasTag(tag);
  } catch (e) {
    return false;
  }
}


function ownerTagForPlayer(player) {
  const raw = String(player.name ?? player.id ?? "player");
  return "lover_owner_" + raw.replace(/[^A-Za-z0-9_]/g, "_").slice(0, 48);
}

function clearModeTags(npc) {
  for (const tag of MODE_TAGS) {
    removeTag(npc, tag);
  }
}


function isLoverNpcType(entity) {
  try { return entity && (entity.typeId === NPC_ID || entity.typeId === SLEEP_NPC_ID || entity.typeId === FOX_SLEEP_NPC_ID); } catch (e) {}
  return false;
}

function isSleepNpcType(entity) {
  try { return entity && (entity.typeId === SLEEP_NPC_ID || entity.typeId === FOX_SLEEP_NPC_ID); } catch (e) {}
  return false;
}


function getOwnedNpcsInDimensionV31(dimension) {
  const found = [];
  try { found.push(...dimension.getEntities({ type: NPC_ID })); } catch (e) {}
  try { found.push(...dimension.getEntities({ type: SLEEP_NPC_ID })); } catch (e) {}
  try { found.push(...dimension.getEntities({ type: FOX_SLEEP_NPC_ID })); } catch (e) {}
  return found;
}

function removeEntitySafeV31(entity) {
  try {
    if (entity && entity.isValid) {
      entity.remove();
      return true;
    }
  } catch (e) {}
  try {
    if (entity) entity.kill();
  } catch (e) {}
  return false;
}

function copyOwnerTagsV31(fromEntity, toEntity) {
  try {
    for (const tag of fromEntity.getTags()) {
      if (String(tag).startsWith("lover_owner_") || String(tag).startsWith("lover_mode_") || tag === "lover_npc") {
        try { toEntity.addTag(tag); } catch (e) {}
      }
    }
  } catch (e) {}
}

function copyLoverPropertiesV31(fromEntity, toEntity, sleeping) {
  for (const key of ["quan:outfit", "quan:fox_skin", "quan:sleep_pose"]) {
    try { toEntity.setProperty(key, fromEntity.getProperty(key)); } catch (e) {}
  }
  try { toEntity.setProperty("quan:is_sleeping", !!sleeping); } catch (e) {}
  try { toEntity.setProperty("quan:is_sitting", false); } catch (e) {}
  try { toEntity.setProperty("quan:is_moving", false); } catch (e) {}
  try { toEntity.setProperty("quan:is_running", false); } catch (e) {}
}

function copyHealthV31(fromEntity, toEntity) {
  try {
    const fromH = fromEntity.getComponent("minecraft:health");
    const toH = toEntity.getComponent("minecraft:health");
    if (fromH && toH) {
      const current = Math.max(1, Math.min(toH.effectiveMax ?? toH.defaultValue ?? 20, fromH.currentValue ?? fromH.effectiveMax ?? 20));
      toH.setCurrentValue(current);
    }
  } catch (e) {}
}

function copyDynamicNameV31(fromEntity, toEntity) {
  try {
    const n = fromEntity.getDynamicProperty(NPC_CUSTOM_NAME_PROPERTY);
    if (typeof n === "string") toEntity.setDynamicProperty(NPC_CUSTOM_NAME_PROPERTY, n);
  } catch (e) {}
  try {
    const hpApplied = fromEntity.getDynamicProperty(NPC_HP_APPLIED_PROPERTY);
    if (hpApplied !== undefined) toEntity.setDynamicProperty(NPC_HP_APPLIED_PROPERTY, hpApplied);
  } catch (e) {}
  try { toEntity.nameTag = fromEntity.nameTag; } catch (e) {}
}


function getHealthSnapshotV31_1(entity) {
  try {
    const hp = getNpcHealthValues(entity);
    const max = Math.max(1, Number(hp.max) || NPC_HP_MIN);
    const rawCurrent = Number(hp.current);
    const current = Math.max(1, Math.min(max, Number.isFinite(rawCurrent) ? rawCurrent : max));
    return {
      current,
      max,
      ratio: Math.max(0.01, Math.min(1, current / max)),
      valid: true
    };
  } catch (e) {
    return undefined;
  }
}

function isValidHealthSnapshotV31_2(snapshot) {
  if (!snapshot) return false;
  const current = Number(snapshot.current);
  const max = Number(snapshot.max);
  return Number.isFinite(current) && Number.isFinite(max) && current > 0 && max > 0;
}

function getHealthFinalizeKey(entity) {
  try { return String(entity.id ?? entity.typeId ?? "npc"); } catch (e) {}
  return "npc";
}

function nextHealthFinalizeToken(entity) {
  const key = getHealthFinalizeKey(entity);
  const token = (healthFinalizeTokens.get(key) || 0) + 1;
  healthFinalizeTokens.set(key, token);
  return { key, token };
}

function isCurrentHealthFinalizeToken(key, token) {
  return healthFinalizeTokens.get(key) === token;
}

function finalizeNpcStateHealth(npc, player, snapshot) {
  if (!isValidEntity(npc)) return;
  const guard = nextHealthFinalizeToken(npc);
  const snap = isValidHealthSnapshotV31_2(snapshot) ? snapshot : undefined;

  try { applyNpcHealthScale(npc, player); } catch (e) {}

  system.runTimeout(() => {
    if (!isCurrentHealthFinalizeToken(guard.key, guard.token) || !isValidEntity(npc)) return;

    try { applyNpcHealthScale(npc, player); } catch (e) {}

    system.runTimeout(() => {
      if (!isCurrentHealthFinalizeToken(guard.key, guard.token) || !isValidEntity(npc)) return;

      try {
        const hp = getNpcHealthValues(npc);
        const max = Math.max(1, Number(hp.max) || getNpcMaxHealthForAffection(player ? getAffection(player) : 0) || NPC_HP_MIN);

        // Important: never treat a missing/invalid snapshot as full health.
        // If there is no trusted old HP, only fix max HP and keep the entity's current HP.
        if (snap) {
          const oldCurrent = Math.max(1, Number(snap.current));
          const oldMax = Math.max(1, Number(snap.max));
          let target;

          if (Math.abs(max - oldMax) <= 1) {
            target = oldCurrent;
          } else {
            target = Math.round(max * Math.max(0.01, Math.min(1, oldCurrent / oldMax)));
          }

          target = Math.max(1, Math.min(max, target));
          setNpcCurrentHealth(npc, target);
        }

        try { npc.setDynamicProperty(NPC_HP_APPLIED_PROPERTY, max); } catch (e) {}
      } catch (e) {}

      system.runTimeout(() => {
        if (!isCurrentHealthFinalizeToken(guard.key, guard.token) || !isValidEntity(npc)) return;
        try {
          if (player) updateOwnedNpcNameTag(npc, player);
          else {
            const owner = getTrueOwner(npc);
            if (owner) updateOwnedNpcNameTag(npc, owner);
            else updateOwnedNpcNameTag(npc, getNpcDisplayNameFrom(undefined, npc));
          }
        } catch (e) {}
      }, 1);
    }, 1);
  }, 1);
}

function applyHealthAfterScaleV31_1(entity, player, snapshot) {
  finalizeNpcStateHealth(entity, player, snapshot);
}

function outfitEventName(value) {
  if (Number(value) === 1) return "quan:set_outfit_fox";
  if (Number(value) === 2) return "quan:set_outfit_lemi";
  if (Number(value) === 3) return "quan:set_outfit_rin";
  return "quan:set_outfit_npc";
}

function resetAwakePoseStateV31_1(entity) {
  try { entity.setProperty("quan:is_sleeping", false); } catch (e) {}
  try { entity.setProperty("quan:is_sitting", false); } catch (e) {}
  try { entity.setProperty("quan:is_moving", false); } catch (e) {}
  try { entity.setProperty("quan:is_running", false); } catch (e) {}
  try { entity.setProperty("quan:sleep_pose", 0); } catch (e) {}
}

function resetSleepPoseStateV31_1(entity) {
  try { entity.setProperty("quan:is_sleeping", true); } catch (e) {}
  try { entity.setProperty("quan:is_sitting", false); } catch (e) {}
  try { entity.setProperty("quan:is_moving", false); } catch (e) {}
  try { entity.setProperty("quan:is_running", false); } catch (e) {}
  try { entity.setProperty("quan:sleep_pose", 0); } catch (e) {}
}

function spawnSleepEntityV31(npc, player, mode = "sleep", snapshotOverride = undefined) {
  // Chibi fix: do NOT swap to old sleep entity (wrong geo → invisible + float).
  // Keep same NPC and only set sleep/rest pose properties + event.
  if (!npc) return npc;
  try {
    if (isSleepNpcType(npc)) {
      // already old sleep entity - try wake transform later; for now just set props
      clearModeTags(npc);
      addTag(npc, mode === "rest" ? "lover_mode_rest" : "lover_mode_sleep");
      resetSleepPoseStateV31_1(npc);
      try { npc.triggerEvent("quan:set_sleep"); } catch (e) {}
      return npc;
    }
    clearModeTags(npc);
    addTag(npc, mode === "rest" ? "lover_mode_rest" : "lover_mode_sleep");
    resetSleepPoseStateV31_1(npc);
    try { npc.triggerEvent("quan:set_sleep"); } catch (e) {}
    try {
      const owner = player || getTrueOwner(npc);
      if (owner) saveNpcState(owner, npc);
    } catch (e) {}
    return npc;
  } catch (e) {
    return npc;
  }
}

function spawnAwakeEntityV31(npc, player, mode = "stay", snapshotOverride = undefined) {
  if (!npc) return npc;
  try {
    // If already normal chibi NPC — only clear sleep and set mode
    if (!isSleepNpcType(npc)) {
      clearModeTags(npc);
      resetAwakePoseStateV31_1(npc);
      try { npc.triggerEvent(mode === "follow" ? "quan:set_follow" : "quan:set_wake"); } catch (e) {}
      if (mode === "follow") {
        try { setMode(npc, "follow"); } catch (e) {}
      } else {
        try { setMode(npc, "stay"); } catch (e) {}
      }
      return npc;
    }
    // Legacy: was transformed to sleep entity — convert back to main NPC
    const healthSnapshot = isValidHealthSnapshotV31_2(snapshotOverride) ? snapshotOverride : getHealthSnapshotV31_1(npc);
    const dim = npc.dimension;
    const loc = npc.location;
    const rot = typeof npc.getRotation === "function" ? npc.getRotation() : { x: 0, y: 0 };
    const awake = dim.spawnEntity(NPC_ID, loc);
    copyOwnerTagsV31(npc, awake);
    clearModeTags(awake);
    copyLoverPropertiesV31(npc, awake, false);
    resetAwakePoseStateV31_1(awake);
    copyDynamicNameV31(npc, awake);
    try { if (typeof awake.setRotation === "function") awake.setRotation(rot); } catch (e) {}
    try { forceTameToPlayer(awake, player); } catch (e) {}
    try { awake.triggerEvent(mode === "follow" ? "quan:set_follow" : "quan:set_wake"); } catch (e) {}
    applyHealthAfterScaleV31_1(awake, player, healthSnapshot);
    removeEntitySafeV31(npc);
    return awake;
  } catch (e) {
    return npc;
  }
}

function getOwnerPlayerForNpcV303(npc) {
  try {
    const ownerId = getTrueOwner(npc)?.id;
    if (!ownerId) return undefined;
    for (const player of world.getPlayers()) {
      if (player.id === ownerId) return player;
    }
  } catch (e) {}
  return undefined;
}

function normalizeFoxSleepStateV303(npc, player) {
  if (!npc || !isLoverNpcType(npc)) return npc;

  try {
    const outfit = safeGetProperty(npc, "quan:outfit", 0);
    // Outfit 1 is Ribbuny now — old "chibi fox sleep entity" migration
    // was clearing is_sleeping when the player walked away (Case B).
    if (npc.typeId === NPC_ID && outfit === 1) return npc;
    if (outfit !== 1 && npc.typeId !== FOX_SLEEP_NPC_ID) return npc;

    const hasSleepTag = hasTag(npc, "lover_mode_sleep");
    const hasRestTag = hasTag(npc, "lover_mode_rest");
    const propSleep = safeGetProperty(npc, "quan:is_sleeping", false) === true;
    const tagSaysLowPose = hasSleepTag || hasRestTag;

    // Case A: old normal skin 10 really has sleep/rest mode tag -> convert to fox sleep entity.
    if (npc.typeId === NPC_ID && outfit === 1 && tagSaysLowPose) {
      const owner = player ?? getOwnerPlayerForNpcV303(npc);
      if (!owner) return npc;
      return spawnSleepEntityV31(npc, owner, hasRestTag ? "rest" : "sleep");
    }

    // Case B: old normal skin 10 only has quan:is_sleeping=true but no sleep/rest tag.
    // This is the common "chÆ°a báº­t ngá»§ mĂ  Ä‘Ă£ ngá»§" stale-property bug. Reset to stay.
    if (npc.typeId === NPC_ID && outfit === 1 && propSleep && !tagSaysLowPose) {
      try { npc.setProperty("quan:is_sleeping", false); } catch (e) {}
      try { npc.setProperty("quan:is_sitting", false); } catch (e) {}
      try { npc.setProperty("quan:is_moving", false); } catch (e) {}
      try { npc.setProperty("quan:is_running", false); } catch (e) {}
      try { npc.setProperty("quan:sleep_pose", 0); } catch (e) {}
      try { npc.triggerEvent("quan:set_stay"); } catch (e) {}
      try { clearModeTags(npc); addTag(npc, "lover_mode_stay"); } catch (e) {}
      return npc;
    }

    // Case C: fox sleep entity exists but no sleep/rest state -> convert back to normal entity.
    if (npc.typeId === FOX_SLEEP_NPC_ID && !tagSaysLowPose && !propSleep) {
      const owner = player ?? getOwnerPlayerForNpcV303(npc);
      if (!owner) return npc;
      return spawnAwakeEntityV31(npc, owner, "stay");
    }

    // Case D: fox sleep entity has prop sleep but lost the visible mode tag.
    // Keep it as sleep, but restore the missing tag so menu/state is consistent.
    if (npc.typeId === FOX_SLEEP_NPC_ID && propSleep && !tagSaysLowPose) {
      try { clearModeTags(npc); addTag(npc, "lover_mode_sleep"); } catch (e) {}
      return npc;
    }
  } catch (e) {}

  return npc;
}

function normalizeFoxSleepStateForAllLoadedV303() {
  let players = [];
  try { players = world.getPlayers(); } catch (e) { return; }

  for (const player of players) {
    try {
      const npc = findOwnedNpc(player, 96);
      if (npc) normalizeFoxSleepStateV303(npc, player);
    } catch (e) {}
  }
}


function spawnSleepZzzParticlesV31(npc) {
  let dim, loc;
  try { dim = npc.dimension; loc = npc.location; } catch (e) { return; }
  const pos = { x: loc.x + (Math.random() - 0.5) * 0.6, y: loc.y + 2.1 + Math.random() * 0.35, z: loc.z + (Math.random() - 0.5) * 0.6 };
  try { dim.spawnParticle("quan:sleep_zzz", pos); } catch (e) {}
  try { dim.runCommandAsync(`particle quan:sleep_zzz ${pos.x} ${pos.y} ${pos.z}`); } catch (e) {}
}

function setModeTag(npc, mode) {
  clearModeTags(npc);
  addTag(npc, `lover_mode_${mode}`);
}

function getModeText(npc) {
  if (hasTag(npc, "lover_mode_follow")) return "following you";
  if (hasTag(npc, "lover_mode_guard")) return "guarding you";
  if (hasTag(npc, "lover_mode_idle")) return "roaming freely";
  if (hasTag(npc, "lover_mode_sit")) return "sitting";
  if (hasTag(npc, "lover_mode_rest")) return "resting";
  if (hasTag(npc, "lover_mode_sleep")) return "sleeping";
  return "standing still";
}

function clearPose(npc) {
  safeSetProperty(npc, "quan:is_sitting", false);
  safeSetProperty(npc, "quan:is_sleeping", false);
  safeSetProperty(npc, "quan:is_dancing", false);
  safeSetProperty(npc, "quan:is_hugging", false);
  safeSetProperty(npc, "quan:is_kissing", false);
  safeSetProperty(npc, "quan:is_carrying", false);
  safeSetProperty(npc, "quan:is_crawling", false);
  safeSetProperty(npc, "quan:is_heart", false);
  safeSetProperty(npc, "quan:sleep_pose", 0);
  safeSetProperty(npc, "quan:is_running", false);
}

function randomSleepPose(npc) {
  const pose = 0;
  sleepPoseMemory.set(npc.id, pose);
  safeSetProperty(npc, "quan:sleep_pose", pose);
  return pose;
}

function getSleepPoseName(pose) {
  return "cute side lying";
}

function triggerNpcEvent(npc, eventName) {
  try {
    npc.triggerEvent(eventName);
    return true;
  } catch (e) {
    return false;
  }
}

function getTameable(npc) {
  try {
    return npc.getComponent("minecraft:tameable");
  } catch (e) {
    return undefined;
  }
}

function getTrueOwner(npc) {
  try {
    const tameable = getTameable(npc);
    if (tameable && tameable.tamedToPlayer) {
      return tameable.tamedToPlayer;
    }
  } catch (e) {}

  // Fallback quan trá»ng cho lĂºc entityDie: má»™t sá»‘ báº£n API khĂ´ng cĂ²n Ä‘á»c Ä‘Æ°á»£c tameable owner khi mob Ä‘Ă£ cháº¿t.
  try {
    for (const player of world.getPlayers()) {
      if (hasTag(npc, ownerTagForPlayer(player))) return player;
    }
  } catch (e) {}

  return undefined;
}

function forceTameToPlayer(npc, player) {
  try {
    const tameable = getTameable(npc);
    if (!tameable) return false;

    try {
      if (tameable.tamedToPlayer && tameable.tamedToPlayer.id === player.id) {
        addTag(npc, ownerTagForPlayer(player));
        return true;
      }
    } catch (e) {}

    try {
      if (typeof tameable.tame === "function") {
        tameable.tame(player);
        addTag(npc, ownerTagForPlayer(player));
      }
    } catch (e) {
      return false;
    }

    return true;
  } catch (e) {
    return false;
  }
}

function ensureOwnerOrTame(npc, player) {
  const owner = getTrueOwner(npc);

  if (owner && owner.id !== player.id) {
    msg(player, "§cThis NPC already has an owner.");
    return false;
  }

  const tameOk = forceTameToPlayer(npc, player);

  if (!tameOk) {
    msg(player, "§cCould not find minecraft:tameable on the NPC, or the API does not allow taming by script.");
    return false;
  }

  return true;
}

function ensureScoreboard() {
  try {
    if (!world.scoreboard.getObjective(AFFECTION_OBJECTIVE)) {
      world.scoreboard.addObjective(AFFECTION_OBJECTIVE, "Lover Affection");
    }
  } catch (e) {
    runGlobal(`scoreboard objectives add ${AFFECTION_OBJECTIVE} dummy "Lover Affection"`);
  }
}

function clampAffection(value) {
  return Math.max(0, Math.min(AFFECTION_MAX, Math.floor(Number(value) || 0)));
}

function getDynamicAffection(player) {
  try {
    const value = player.getDynamicProperty(AFFECTION_PROPERTY);
    if (typeof value === "number") return clampAffection(value);
    if (typeof value === "string" && value.length > 0) return clampAffection(parseInt(value, 10));
  } catch (e) {}
  return undefined;
}

function setDynamicAffection(player, value) {
  try {
    player.setDynamicProperty(AFFECTION_PROPERTY, clampAffection(value));
    return true;
  } catch (e) {
    return false;
  }
}

function getScoreboardAffection(player) {
  ensureScoreboard();

  try {
    const obj = world.scoreboard.getObjective(AFFECTION_OBJECTIVE);
    if (!obj) return 0;

    try {
      if (player.scoreboardIdentity) {
        const value = obj.getScore(player.scoreboardIdentity);
        if (typeof value === "number") return clampAffection(value);
      }
    } catch (e) {}

    try {
      const participants = obj.getParticipants();
      for (const participant of participants) {
        if (participant.displayName === player.name) {
          const value = obj.getScore(participant);
          if (typeof value === "number") return clampAffection(value);
        }
      }
    } catch (e) {}
  } catch (e) {}

  return 0;
}

function setScoreboardAffection(player, value) {
  ensureScoreboard();
  const clamped = clampAffection(value);

  try {
    const obj = world.scoreboard.getObjective(AFFECTION_OBJECTIVE);
    if (obj) {
      try {
        obj.setScore(player, clamped);
        return true;
      } catch (e) {}

      try {
        if (player.scoreboardIdentity) {
          obj.setScore(player.scoreboardIdentity, clamped);
          return true;
        }
      } catch (e) {}
    }
  } catch (e) {}

  run(player, `scoreboard players set @s ${AFFECTION_OBJECTIVE} ${clamped}`);
  return false;
}

function getAffection(player) {
  const dynamicValue = getDynamicAffection(player);
  const scoreValue = getScoreboardAffection(player);

  if (dynamicValue === undefined) {
    if (scoreValue > 0) {
      setDynamicAffection(player, scoreValue);
      return scoreValue;
    }
    return 0;
  }

  if (scoreValue !== dynamicValue) {
    setScoreboardAffection(player, dynamicValue);
  }

  return dynamicValue;
}

function setAffection(player, value) {
  const clamped = clampAffection(value);
  setDynamicAffection(player, clamped);
  setScoreboardAffection(player, clamped);
  try {
    const npc = findOwnedNpc(player, 64);
    if (npc) applyNpcHealthScale(npc, clamped);
  } catch (e) {}
  return clamped;
}

function addAffection(player, amount, showMessage = true) {
  const before = getAffection(player);
  const after = setAffection(player, before + amount);
  const gained = after - before;

  if (showMessage) {
    if (gained > 0) {
      msg(player, `§dBond: §f${after}/${AFFECTION_MAX} §7(+${gained})`);
    } else {
      msg(player, `§dBond: §f${after}/${AFFECTION_MAX}`);
    }
  }

  if (before < 30 && after >= 30) msg(player, "§dNew milestone: NPC becomes friendlier when talking.");
  if (before < UNLOCK_GIFT && after >= UNLOCK_GIFT) msg(player, "§dNew milestone: unlocked asking NPC for gifts.");
  if (before < UNLOCK_HEAL && after >= UNLOCK_HEAL) msg(player, "§dNew milestone: unlocked asking NPC to heal you.");
  if (before < UNLOCK_GUARD && after >= UNLOCK_GUARD) msg(player, "§dNew milestone: NPC can protect you from monsters.");
  if (before < UNLOCK_AUTO_GIFT && after >= UNLOCK_AUTO_GIFT) msg(player, "§dNew milestone: NPC can automatically give gifts when nearby.");
  if (before < UNLOCK_GUARD_TIER_2 && after >= UNLOCK_GUARD_TIER_2) msg(player, "§dNew milestone: guard power increased to Tier II.");
  if (before < UNLOCK_GUARD_TIER_3 && after >= UNLOCK_GUARD_TIER_3) msg(player, "§dNew milestone: guard power increased to Tier III.");

  return after;
}

function getRankText(affection) {
  if (affection >= 300) return "§dAbsolute Bond";
  if (affection >= 280) return "§dSoulmate";
  if (affection >= 220) return "§dVery close";
  if (affection >= 180) return "§dTrusted";
  if (affection >= 150) return TEXT.rank.protector;
  if (affection >= 100) return TEXT.rank.caring;
  if (affection >= 80) return TEXT.rank.closeFriend;
  if (affection >= 30) return TEXT.rank.acquaintance;
  return TEXT.rank.shy;
}

function getNextUnlockText(affection) {
  if (affection < 30) return "30: friendlier dialogue";
  if (affection < UNLOCK_GIFT) return "80: ask NPC for gifts";
  if (affection < UNLOCK_HEAL) return "100: ask NPC to heal";
  if (affection < UNLOCK_GUARD) return "150: unlock guard";
  if (affection < UNLOCK_AUTO_GIFT) return "180: auto-gift when nearby";
  if (affection < UNLOCK_GUARD_TIER_2) return "220: guard tier II";
  if (affection < UNLOCK_GUARD_TIER_3) return "280: guard tier III";
  if (affection < 300) return "300: max bond";
  return "All main milestones unlocked";
}

function getGuardTier(affection) {
  if (affection >= UNLOCK_GUARD_TIER_3) return 3;
  if (affection >= UNLOCK_GUARD_TIER_2) return 2;
  if (affection >= UNLOCK_GUARD) return 1;
  return 0;
}

function getNpcMaxHealthForAffection(affection) {
  const value = Math.max(0, Math.min(AFFECTION_MAX, Number(affection) || 0));
  if (value >= 300) return 200;
  if (value >= 250) return 180;
  if (value >= 200) return 150;
  if (value >= 150) return 120;
  if (value >= 100) return 90;
  if (value >= 50) return 70;
  return 50;
}

function getNpcHpTierForAffection(affection) {
  return getNpcMaxHealthForAffection(affection);
}

function getHpScaleEventName(maxHp) {
  const hp = Math.max(NPC_HP_MIN, Math.min(NPC_HP_MAX, Number(maxHp) || NPC_HP_MIN));
  return `quan:hp_scale_${hp}`;
}

function getHpScaleTag(maxHp) {
  const hp = Math.max(NPC_HP_MIN, Math.min(NPC_HP_MAX, Number(maxHp) || NPC_HP_MIN));
  return `lover_hp_${hp}`;
}

function getNpcHealthValues(npc) {
  try {
    const health = npc.getComponent("minecraft:health");
    if (!health) return { current: 0, max: NPC_HP_MIN };
    const max = Math.ceil(health.effectiveMax ?? health.defaultValue ?? NPC_HP_MIN);
    const current = Math.ceil(health.currentValue ?? max);
    return { current, max };
  } catch (e) {
    return { current: 0, max: NPC_HP_MIN };
  }
}

function sanitizeNpcName(name) {
  const raw = String(name ?? "").replace(/[\r\n§]/g, " ").trim();
  const compact = raw.replace(/\s+/g, " ");
  if (!compact) return "Waifu Provence Furry";
  return compact.slice(0, 16);
}

function getNpcDisplayName(player) {
  return sanitizeNpcName(getPlayerString(player, NPC_CUSTOM_NAME_PROPERTY, "Waifu Provence Furry"));
}

function getNpcDisplayNameFrom(player, npc) {
  try {
    if (npc) {
      const stored = npc.getDynamicProperty(NPC_CUSTOM_NAME_PROPERTY);
      if (typeof stored === "string" && stored.trim()) return sanitizeNpcName(stored);
    }
  } catch (e) {}
  return getNpcDisplayName(player);
}

function setNpcDisplayName(player, name) {
  setPlayerString(player, NPC_CUSTOM_NAME_PROPERTY, sanitizeNpcName(name));
}

function updateOwnedNpcNameTag(npc, playerOrName) {
  if (!npc) return;
  let name = "Waifu Provence Furry";
  if (typeof playerOrName === "string") name = sanitizeNpcName(playerOrName);
  else if (playerOrName) name = getNpcDisplayName(playerOrName);
  try {
    const npcStoredName = npc.getDynamicProperty(NPC_CUSTOM_NAME_PROPERTY);
    if (typeof npcStoredName === "string" && npcStoredName.trim()) name = sanitizeNpcName(npcStoredName);
  } catch (e) {}

  const hp = getNpcHealthValues(npc);
  const hearts = hpHearts(hp.current, hp.max);
  const hunger = getNpcHunger(npc);
  try {
    npc.nameTag = `§d${name}
§c${hearts} §f${hp.current}/${hp.max}
§6🍖 §f${hunger}/${HUNGER_MAX}`;
  } catch (e) {}
}

function syncNpcNameTagsForAllLoaded() {
  for (const dimensionId of ["overworld", "nether", "the_end"]) {
    let dimension;
    try { dimension = world.getDimension(dimensionId); } catch (e) { continue; }
    let npcs = [];
    try { npcs = getOwnedNpcsInDimensionV31(dimension); } catch (e) { continue; }
    for (const npc of npcs) {
      const owner = getTrueOwner(npc);
      if (!owner) continue;
      updateOwnedNpcNameTag(npc, owner);
    }
  }
}

function setNpcCurrentHealth(npc, value) {
  try {
    const health = npc.getComponent("minecraft:health");
    if (!health) return false;
    const max = health.effectiveMax ?? health.defaultValue ?? NPC_HP_MIN;
    health.setCurrentValue(Math.max(1, Math.min(max, Number(value) || 1)));
    return true;
  } catch (e) {
    return false;
  }
}

function applyNpcHealthScale(npc, playerOrAffection) {
  if (!npc) return NPC_HP_MIN;

  const affection = typeof playerOrAffection === "number" ? playerOrAffection : getAffection(playerOrAffection);
  const maxHp = getNpcMaxHealthForAffection(affection);
  const targetTag = getHpScaleTag(maxHp);
  const before = getNpcHealthValues(npc);

  let appliedMax = 0;
  try { appliedMax = Number(npc.getDynamicProperty(NPC_HP_APPLIED_PROPERTY)) || 0; } catch (e) {}

  // KhĂ´ng chá»‰ dá»±a vĂ o tag. Báº£n cÅ© cĂ³ thá»ƒ Ä‘Ă£ cĂ³ tag lover_hp_200
  // nhÆ°ng component minecraft:health váº«n cĂ²n 50/50, nĂªn pháº£i kiá»ƒm tra cáº£ max tháº­t.
  if (hasTag(npc, targetTag) && before.max === maxHp && appliedMax === maxHp) {
    return maxHp;
  }

  const previousRatio = before.max > 0 ? Math.max(0.01, Math.min(1, before.current / before.max)) : 1;

  for (const tag of HP_SCALE_TAGS) removeTag(npc, tag);
  addTag(npc, targetTag);
  triggerNpcEvent(npc, getHpScaleEventName(maxHp));

  system.runTimeout(() => {
    const after = getNpcHealthValues(npc);
    const targetMax = after.max || maxHp;

    // Preserve the current HP ratio when re-applying health scale.
    // This avoids random full heals or HP drops during state changes.
    const nextCurrent = Math.max(1, Math.ceil(targetMax * previousRatio));
    setNpcCurrentHealth(npc, nextCurrent);
    try { npc.setDynamicProperty(NPC_HP_APPLIED_PROPERTY, maxHp); } catch (e) {}

    try {
      const owner = typeof playerOrAffection === "number" ? getTrueOwner(npc) : playerOrAffection;
      if (owner) updateOwnedNpcNameTag(npc, owner);
      else updateOwnedNpcNameTag(npc, getNpcDisplayNameFrom(undefined, npc));
    } catch (e) {}
  }, 1);

  return maxHp;
}

function getGuardStats(affection) {
  const tier = getGuardTier(affection);
  const maxHealth = getNpcMaxHealthForAffection(affection);
  if (tier === 3) return { tier, hp: maxHealth, maxHealth, damage: 10, text: `Tier III - HP ${maxHealth} / Damage 10` };
  if (tier === 2) return { tier, hp: maxHealth, maxHealth, damage: 8, text: `Tier II - HP ${maxHealth} / Damage 8` };
  if (tier === 1) return { tier, hp: maxHealth, maxHealth, damage: 6, text: `Tier I - HP ${maxHealth} / Damage 6` };
  return { tier, hp: maxHealth, maxHealth, damage: 0, text: `HP ${maxHealth} - Combat not unlocked` };
}

function isTargetAssistEnabled(player) {
  // Báº­t máº·c Ä‘á»‹nh Ä‘á»ƒ ngÆ°á»i chÆ¡i khĂ´ng pháº£i vĂ o menu chá»‰nh sau khi cáº­p nháº­t v16.
  return getPlayerFlag(player, TARGET_ASSIST_PROPERTY, true);
}

function setTargetAssistEnabled(player, enabled) {
  setPlayerFlag(player, TARGET_ASSIST_PROPERTY, enabled);
}

function isAutoCombatEnabled(player) {
  return getPlayerFlag(player, AUTO_COMBAT_PROPERTY, true);
}

function setAutoCombatEnabled(player, enabled) {
  setPlayerFlag(player, AUTO_COMBAT_PROPERTY, enabled);
}

function isAutoHealEnabled(player) {
  return getPlayerFlag(player, AUTO_HEAL_PROPERTY, true);
}

function setAutoHealEnabled(player, enabled) {
  setPlayerFlag(player, AUTO_HEAL_PROPERTY, enabled);
}

function isAutoGiftEnabled(player) {
  return getPlayerFlag(player, AUTO_GIFT_PROPERTY, true);
}

function setAutoGiftEnabled(player, enabled) {
  setPlayerFlag(player, AUTO_GIFT_PROPERTY, enabled);
}

function enabledText(value) {
  return value ? "§aOn" : "§cOff";
}

function isValidEntity(entity) {
  try {
    if (!entity) return false;
    if (entity.isValid === false) return false;
    // Äá»c location sáº½ nĂ©m lá»—i náº¿u entity Ä‘Ă£ bá»‹ xoĂ¡ á»Ÿ má»™t sá»‘ báº£n API.
    const loc = entity.location;
    return loc && typeof loc.x === "number";
  } catch (e) {
    return false;
  }
}

function isAssistBlockedTarget(entity) {
  if (!entity) return true;
  const id = entity.typeId ?? "";
  if (id === NPC_ID) return true;
  if (id === "minecraft:player") return true;
  if (id === "minecraft:villager" || id === "minecraft:villager_v2" || id === "minecraft:wandering_trader") return true;
  if (id === "minecraft:armor_stand" || id === "minecraft:item" || id === "minecraft:xp_orb") return true;
  if (id.includes("projectile") || id.includes("arrow") || id.includes("fireball")) return true;

  try {
    const tameable = entity.getComponent("minecraft:tameable");
    if (tameable && tameable.isTamed) return true;
    if (tameable && tameable.tamedToPlayer) return true;
  } catch (e) {}

  return false;
}

function isAllowedAssistTarget(entity) {
  if (!isValidEntity(entity)) return false;
  if (isAssistBlockedTarget(entity)) return false;

  try {
    if (entity.getComponent("minecraft:health")) return true;
  } catch (e) {}

  return false;
}

function lockTargetAssist(player, target) {
  if (!player || !target) return false;
  if (getAffection(player) < UNLOCK_GUARD) return false;
  if (!isTargetAssistEnabled(player)) return false;
  if (!isAllowedAssistTarget(target)) return false;

  let ownerDistance = 999;
  try {
    if (player.dimension.id !== target.dimension.id) return false;
    ownerDistance = distanceBetween(player.location, target.location);
  } catch (e) {
    return false;
  }

  if (ownerDistance > TARGET_ASSIST_MAX_OWNER_DISTANCE) return false;

  targetAssistLocks.set(player.id, {
    target,
    targetId: target.id,
    dimensionId: target.dimension.id,
    expiresAt: tickNow() + TARGET_ASSIST_DURATION_TICKS
  });

  const npc = findOwnedNpc(player, 32);
  if (npc && !isPassivePose(npc)) {
    setMode(npc, "guard");
    setModeTag(npc, "guard");
    applyGuardPower(npc, player);

    const now = tickNow();
    const lastMsg = lastCombatMsgTick.get(player.id) ?? -999999;
    if (now - lastMsg > 120) {
      lastCombatMsgTick.set(player.id, now);
      msg(player, "§cTarget locked.");
    }
  }

  return true;
}

function getLockedAssistTarget(player) {
  const data = targetAssistLocks.get(player.id);
  if (!data) return undefined;

  if (tickNow() > data.expiresAt) {
    targetAssistLocks.delete(player.id);
    return undefined;
  }

  const target = data.target;
  if (!isAllowedAssistTarget(target)) {
    targetAssistLocks.delete(player.id);
    return undefined;
  }

  try {
    if (target.dimension.id !== player.dimension.id) {
      targetAssistLocks.delete(player.id);
      return undefined;
    }

    const ownerDistance = distanceBetween(player.location, target.location);
    if (ownerDistance > TARGET_ASSIST_MAX_OWNER_DISTANCE) {
      targetAssistLocks.delete(player.id);
      return undefined;
    }
  } catch (e) {
    targetAssistLocks.delete(player.id);
    return undefined;
  }

  return target;
}

function clearLockedAssistTarget(player) {
  try { targetAssistLocks.delete(player.id); } catch (e) {}
}

function applyGuardPower(npc, player) {
  const affection = player ? getAffection(player) : 0;
  const tier = getGuardTier(affection);
  applyNpcHealthScale(npc, affection);
  triggerNpcEvent(npc, `quan:guard_power_${tier}`);
  return tier;
}

function spawnLoveParticles(npc, count = 8) {
  let dim;
  try {
    dim = npc.dimension;
  } catch (e) {
    return;
  }

  for (let i = 0; i < count; i++) {
    system.runTimeout(() => {
      let loc;
      try {
        loc = npc.location;
      } catch (e) {
        return;
      }

      const ox = (Math.random() - 0.5) * 1.25;
      const oy = 1.35 + Math.random() * 1.05;
      const oz = (Math.random() - 0.5) * 1.25;
      const pos = { x: loc.x + ox, y: loc.y + oy, z: loc.z + oz };

      // Custom particle cá»§a addon. Náº¿u mĂ¡y khĂ´ng load particle custom thĂ¬ cĂ¡c fallback vanilla váº«n cháº¡y.
      try { dim.spawnParticle("quan:love_heart", pos); } catch (e) {}
      try { dim.spawnParticle("minecraft:heart_particle", pos); } catch (e) {}
      try { dim.spawnParticle("minecraft:villager_happy", { x: pos.x, y: pos.y - 0.15, z: pos.z }); } catch (e) {}

      try { dim.runCommandAsync(`particle quan:love_heart ${pos.x} ${pos.y} ${pos.z}`); } catch (e) {}
      try { dim.runCommandAsync(`particle minecraft:heart_particle ${pos.x} ${pos.y} ${pos.z}`); } catch (e) {}
      try { dim.runCommandAsync(`particle minecraft:villager_happy ${pos.x} ${pos.y - 0.15} ${pos.z}`); } catch (e) {}
      try { npc.runCommandAsync("particle minecraft:heart_particle ~ ~2.1 ~"); } catch (e) {}
      try { npc.runCommandAsync("particle minecraft:villager_happy ~ ~1.8 ~"); } catch (e) {}
    }, i * 2);
  }
}


function getInventoryContainer(player) {
  try {
    const inv = player.getComponent("minecraft:inventory");
    return inv ? inv.container : undefined;
  } catch (e) {
    return undefined;
  }
}

function countItems(player, typeId) {
  const container = getInventoryContainer(player);
  if (!container) return 0;

  let count = 0;
  try {
    for (let i = 0; i < container.size; i++) {
      const item = container.getItem(i);
      if (item && item.typeId === typeId) count += item.amount ?? 1;
    }
  } catch (e) {}

  return count;
}

function giveItem(player, itemId, amount = 1) {
  let left = Math.max(1, Math.floor(Number(amount) || 1));
  const container = getInventoryContainer(player);

  if (container) {
    while (left > 0) {
      const stackAmount = Math.min(64, left);
      let stack;
      try { stack = new ItemStack(itemId, stackAmount); } catch (e) { break; }

      try {
        const leftover = container.addItem(stack);
        if (!leftover) {
          left -= stackAmount;
        } else {
          const failed = leftover.amount ?? stackAmount;
          left = left - stackAmount + failed;
          break;
        }
      } catch (e) {
        break;
      }
    }
  }

  if (left <= 0) return true;

  try {
    const loc = player.location;
    while (left > 0) {
      const stackAmount = Math.min(64, left);
      player.dimension.spawnItem(new ItemStack(itemId, stackAmount), { x: loc.x, y: loc.y + 0.75, z: loc.z });
      left -= stackAmount;
    }
    msg(player, "§eYour inventory is full; the item dropped near you.");
    return true;
  } catch (e) {}

  try {
    run(player, `give @s ${itemId} ${left}`);
    return true;
  } catch (e) {}

  return false;
}

function removeItems(player, itemId, amount = 1) {
  let need = Math.max(1, Math.floor(Number(amount) || 1));
  const container = getInventoryContainer(player);
  if (!container) return false;

  if (countItems(player, itemId) < need) return false;

  try {
    for (let i = 0; i < container.size && need > 0; i++) {
      const item = container.getItem(i);
      if (!item || item.typeId !== itemId) continue;

      const amountInSlot = item.amount ?? 1;
      const take = Math.min(amountInSlot, need);

      if (amountInSlot <= take) {
        container.setItem(i, undefined);
      } else {
        item.amount = amountInSlot - take;
        container.setItem(i, item);
      }

      need -= take;
    }
  } catch (e) {
    return false;
  }

  return need <= 0;
}

function removeAllItems(player, itemId) {
  const container = getInventoryContainer(player);
  if (!container) return 0;

  let removed = 0;
  try {
    for (let i = 0; i < container.size; i++) {
      const item = container.getItem(i);
      if (!item || item.typeId !== itemId) continue;
      removed += item.amount ?? 1;
      container.setItem(i, undefined);
    }
  } catch (e) {}

  return removed;
}

function giveOne(player, itemId) {
  if (countItems(player, itemId) <= 0) return giveItem(player, itemId, 1);
  return true;
}

function removeSoulRingItems(player) {
  removeAllItems(player, RING_ID);
  removeAllItems(player, BONDED_RING_ID);
}

function removeEverySoulRing(player) {
  removeAllItems(player, RING_ID);
  removeAllItems(player, BONDED_RING_ID);
  removeAllItems(player, BROKEN_RING_ID);
}

function keepOnlyOneRing(player, itemId) {
  removeEverySoulRing(player);
  return giveItem(player, itemId, 1);
}

function consumeOne(player, itemId) {
  return removeItems(player, itemId, 1);
}

function normalizeSoulRings(player) {
  try {
    if (!playerHasBond(player)) {
      if (hasTag(player, RING_RECEIVED_TAG)) {
        if (countItems(player, RING_ID) + countItems(player, BONDED_RING_ID) + countItems(player, BROKEN_RING_ID) <= 0) {
          giveItem(player, RING_ID, 1);
        }
      }
      if (countItems(player, BONDED_RING_ID) > 0 || countItems(player, BROKEN_RING_ID) > 0 || countItems(player, RING_ID) > 1) {
        keepOnlyOneRing(player, RING_ID);
      }
      return;
    }

    if (playerNpcAlive(player)) {
      if (countItems(player, BONDED_RING_ID) !== 1 || countItems(player, RING_ID) > 0 || countItems(player, BROKEN_RING_ID) > 0) {
        keepOnlyOneRing(player, BONDED_RING_ID);
      }
      return;
    }

    const brokenCount = countItems(player, BROKEN_RING_ID);
    if (countItems(player, RING_ID) > 0 || countItems(player, BONDED_RING_ID) > 0 || brokenCount > 1) {
      removeAllItems(player, RING_ID);
      removeAllItems(player, BONDED_RING_ID);
      if (brokenCount > 1) {
        removeAllItems(player, BROKEN_RING_ID);
        giveItem(player, BROKEN_RING_ID, 1);
      }
    }
  } catch (e) {}
}


function setPlayerFlag(player, propertyName, value) {
  try { player.setDynamicProperty(propertyName, value ? 1 : 0); } catch (e) {}
}

function getPlayerFlag(player, propertyName, fallback = false) {
  try {
    const value = player.getDynamicProperty(propertyName);
    if (typeof value === "boolean") return value;
    if (typeof value === "number") return value !== 0;
    if (typeof value === "string") return value === "true" || value === "1";
  } catch (e) {}
  return fallback;
}

function setPlayerNumber(player, propertyName, value) {
  try { player.setDynamicProperty(propertyName, Number(value) || 0); } catch (e) {}
}

function getPlayerNumber(player, propertyName, fallback = 0) {
  try {
    const value = player.getDynamicProperty(propertyName);
    if (typeof value === "number") return value;
    if (typeof value === "string" && value.length > 0) return Number(value) || fallback;
  } catch (e) {}
  return fallback;
}

function setPlayerString(player, propertyName, value) {
  try { player.setDynamicProperty(propertyName, String(value ?? "")); } catch (e) {}
}

function getPlayerString(player, propertyName, fallback = "") {
  try {
    const value = player.getDynamicProperty(propertyName);
    if (typeof value === "string") return value;
  } catch (e) {}
  return fallback;
}

function markNpcAlive(player, alive) {
  setPlayerFlag(player, HAS_NPC_PROPERTY, true);
  setPlayerFlag(player, NPC_ALIVE_PROPERTY, alive);
  addTag(player, NPC_SUMMONED_TAG);
}

function playerHasBond(player) {
  return hasTag(player, NPC_SUMMONED_TAG) || getPlayerFlag(player, HAS_NPC_PROPERTY, false) || getAffection(player) > 0;
}

function playerNpcAlive(player) {
  if (!playerHasBond(player)) return false;
  return getPlayerFlag(player, NPC_ALIVE_PROPERTY, true);
}

function getModeValue(npc) {
  if (hasTag(npc, "lover_mode_follow")) return "follow";
  if (hasTag(npc, "lover_mode_guard")) return "guard";
  if (hasTag(npc, "lover_mode_idle")) return "idle";
  if (hasTag(npc, "lover_mode_sit")) return "sit";
  if (hasTag(npc, "lover_mode_rest")) return "rest";
  if (hasTag(npc, "lover_mode_sleep")) return "sleep";
  if (hasTag(npc, "lover_mode_crawl")) return "crawl";
  return "stay";
}

function saveNpcState(player, npc) {
  setPlayerFlag(player, HAS_NPC_PROPERTY, true);
  setPlayerFlag(player, NPC_ALIVE_PROPERTY, true);
  setPlayerString(player, NPC_LAST_MODE_PROPERTY, getModeValue(npc));
  setPlayerNumber(player, NPC_OUTFIT_PROPERTY, safeGetProperty(npc, "quan:outfit", 0));
  setPlayerNumber(player, FOX_SKIN_PROPERTY, safeGetProperty(npc, "quan:fox_skin", getPlayerNumber(player, FOX_SKIN_PROPERTY, 0)));
}

function trySpawnItem(dimension, itemId, amount, location) {
  try {
    dimension.spawnItem(new ItemStack(itemId, amount), location);
    return true;
  } catch (e) {
    try {
      dimension.runCommandAsync(`give @p ${itemId} ${amount}`);
    } catch (e2) {}
    return false;
  }
}

function hasAnyOwnedNpcLoaded(player) {
  return findOwnedNpc(player) !== undefined;
}

function findOwnedNpc(player, maxDistance = 512) {
  for (const dimensionId of ["overworld", "nether", "the_end"]) {
    let dimension;
    try { dimension = world.getDimension(dimensionId); } catch (e) { continue; }
    const npcs = getOwnedNpcsInDimensionV31(dimension);
    for (const npc of npcs) {
      const owner = getTrueOwner(npc);
      if (!owner || owner.id !== player.id) continue;
      try {
        if (npc.dimension.id === player.dimension.id) {
          const distance = distanceBetween(npc.location, player.location);
          if (distance <= maxDistance) return npc;
        } else {
          return npc;
        }
      } catch (e) {
        return npc;
      }
    }
  }
  return undefined;
}

function convertToBondedRing(player) {
  markNpcAlive(player, true);
  keepOnlyOneRing(player, BONDED_RING_ID);
}

function convertToBrokenRing(player) {
  markNpcAlive(player, false);
  keepOnlyOneRing(player, BROKEN_RING_ID);
}

function ensureStarterRing(player) {
  if (playerHasBond(player)) {
    if (playerNpcAlive(player)) {
      if (countItems(player, RING_ID) > 0) convertToBondedRing(player);
    } else {
      if (countItems(player, BONDED_RING_ID) > 0 || countItems(player, RING_ID) > 0) convertToBrokenRing(player);
    }
    return;
  }

  if (!hasTag(player, RING_RECEIVED_TAG)) {
    addTag(player, RING_RECEIVED_TAG);
    if (countItems(player, RING_ID) <= 0 && countItems(player, BONDED_RING_ID) <= 0 && countItems(player, BROKEN_RING_ID) <= 0) {
      const ok = giveItem(player, RING_ID, 1);
      if (ok) msg(player, "§dReceived Love Ring.");
      else msg(player, "§cCould not put Love Ring into your inventory. Check custom item quan:love_ring.");
    }
  }

  normalizeSoulRings(player);
}

function callBondedNpc(player) {
  const npc = findOwnedNpc(player);

  if (!npc) {
    if (!playerNpcAlive(player)) {
      openBrokenRingMenu(player);
      return false;
    }

    msg(player, "§cCould not find the bonded NPC in the loaded area.");
    msg(player, "§7Use the Bonded Love Ring to open the remote menu. If the NPC is in an unloaded chunk, move near her location or use Come Here once she is loaded.");
    return false;
  }

  const ok = comeHere(player, npc);
  if (ok) system.runTimeout(() => setOwnedMode(npc, player, "follow"), 2);
  return ok;
}

function spawnAndBondNpc(player, revive = false) {
  const loc = player.location;
  const dir = player.getViewDirection();

  const spawnLoc = {
    x: loc.x + dir.x * 2,
    y: loc.y,
    z: loc.z + dir.z * 2
  };

  try {
    const npc = player.dimension.spawnEntity(NPC_ID, spawnLoc);
    resetAwakePoseStateV31_1(npc); // v31.1 summon reset

    updateOwnedNpcNameTag(npc, player);
    addTag(npc, ownerTagForPlayer(player));
    clearPose(npc);
    const _outfitLoad = Math.max(0, Math.min(3, getPlayerNumber(player, NPC_OUTFIT_PROPERTY, 0)));
    try { npc.setProperty("quan:outfit", _outfitLoad); } catch (e) {}
    try { npc.triggerEvent(outfitEventName(_outfitLoad)); } catch (e) {}
    safeSetProperty(npc, "quan:fox_skin", getPlayerNumber(player, FOX_SKIN_PROPERTY, 0));
    applyNpcEquipment(npc, player);
    triggerNpcEvent(npc, "quan:guard_power_0");

    system.runTimeout(() => {
      const tameOk = forceTameToPlayer(npc, player);

      if (!tameOk) {
        setMode(npc, "stay");
        convertToBondedRing(player);
        saveNpcState(player, npc);
        msg(player, "§cNPC spawned, but real owner could not be assigned. Check minecraft:tameable in BP/entities/lover_npc.json.");
        return;
      }

      system.runTimeout(() => {
        let mode = revive ? getPlayerString(player, NPC_LAST_MODE_PROPERTY, "follow") : "follow";
        if (mode === "sleep" || mode === "rest") mode = "stay";
        if (!["follow", "stay", "guard", "idle", "sit", "crawl"].includes(mode)) mode = "follow";

        const eventOk = setMode(npc, mode);
        convertToBondedRing(player);
        saveNpcState(player, npc);

        if (!eventOk) {
          msg(player, "§cNPC was tamed, but mode event could not be called. Check events in BP/entities/lover_npc.json.");
          return;
        }

        if (!revive) setAffection(player, Math.max(getAffection(player), 5));

        msg(player, revive
          ? `§dNPC revived. Bond: §f${getAffection(player)}/${AFFECTION_MAX}`
          : `§dNPC summoned. Bond: §f${getAffection(player)}/${AFFECTION_MAX}`
        );

        safeSetProperty(npc, "quan:is_heart", true);
        spawnLoveParticles(npc, 24);
        system.runTimeout(() => safeSetProperty(npc, "quan:is_heart", false), 80);
      }, 1);
    }, SPAWN_DELAY_TICKS);

    return true;
  } catch (e) {
    msg(player, "§cCould not summon/revive NPC. Check identifier quan:lover_npc.");
    return false;
  }
}

function openBondedRingMenu(player) {
  const npc = findOwnedNpc(player);
  const displayName = getNpcDisplayNameFrom(player, npc);
  const affection = getAffection(player);
  const capacity = getStorageCapacity(affection);
  const used = getStorageUsedCount(player);

  if (!playerNpcAlive(player)) {
    openBrokenRingMenu(player);
    return;
  }

  const status = npc ? getModeText(npc) : `${displayName} not loaded`;

  const form = new ActionFormData()
    .title(`§dBonded Love Ring §7| §f${displayName}`)
    .body(
      `§6Menu nhanh\n` +
      `§7Name: §d${displayName}\n` +
      `§7Mode: §e${status}\n` +
      `§7Bond: ${bondHearts(affection, AFFECTION_MAX)} §d${affection}/${AFFECTION_MAX} §7(${getRankText(affection)}§7)\n` +
      `§7Storage: §a${used}/${capacity}§7 slots`
    )
    .button("§dOpen control panel", UI_ICON.ring)
    .button(TEXT.buttons.call(displayName), UI_ICON.follow)
    .button(TEXT.buttons.openStorageEquipment, UI_ICON.inventory)
    .button(TEXT.buttons.careWithName(displayName), UI_ICON.care)
    .button(TEXT.menu.close);

  form.show(player).then((res) => {
    if (res.canceled || res.selection === undefined) return;
    if (res.selection === 0) {
      if (npc) return openMenuLater(() => openLoverMenu(player, npc));
      msg(player, `§c${displayName} is not loaded in this area.`);
      return;
    }
    if (res.selection === 1) return callBondedNpc(player);
    if (res.selection === 2) {
      if (npc) return openMenuLater(() => openV22FInventoryTab(player, npc));
      msg(player, `§c${displayName} is not loaded in this area.`);
      return;
    }
    if (res.selection === 3) return openMenuLater(() => openQuickCarePanel(player, npc));
  }).catch(() => {});
}


function isAutoTalkEnabled(player) {
  return getPlayerFlag(player, TALK_AUTO_PROPERTY, false);
}

function setAutoTalkEnabled(player, enabled) {
  setPlayerFlag(player, TALK_AUTO_PROPERTY, enabled);
}

function isDailyScheduleEnabled(player) {
  return getPlayerFlag(player, DAILY_SCHEDULE_PROPERTY, true);
}

function setDailyScheduleEnabled(player, enabled) {
  setPlayerFlag(player, DAILY_SCHEDULE_PROPERTY, enabled);
}

function openTalkMenuV52(player, npc) {
  const affection = getAffection(player);
  const displayName = getNpcDisplayNameFrom(player, npc);

  const form = new ActionFormData()
    .title(`§0${displayName} | Talk`)
    .body(`§0Bond: ${affection}/${AFFECTION_MAX}`)
    .button("§0Chat")
    .button("§bСпросить")
    .button("§cBack");

  form.show(player).then((res) => {
    if (res.canceled || res.selection === undefined) return;
    if (res.selection === 0) {
      talkToNpc(player, npc, "normal");
      playLoverVoice(npc, player, "talk", 1.0, 1.0);
      return openMenuLater(() => openTalkMenuV52(player, npc));
    }
    if (res.selection === 1) {
      return openKnowledgeChatMenu(player, npc);
    }
    openMenuLater(() => openQuickCarePanel(player, npc));
  }).catch(() => {});
}

function openQuickCarePanel(player, npc) {
  const affection = getAffection(player);
  const displayName = getNpcDisplayNameFrom(player, npc);
  const held = getHeldItem(player);
  const heldText = held && held.typeId ? `${shortItemName(held.typeId)} x${held.amount ?? 1}` : "none";

  const form = new ActionFormData()
    .title(TEXT.format.careTitle(displayName))
    .body(
      TEXT.body.careHeader +
      `§7Bond: ${bondHearts(affection, AFFECTION_MAX)} §d${affection}/${AFFECTION_MAX} §7(${getRankText(affection)}§7)\n` +
      `§7Held item: §f${heldText}\n` +
      `§8Use Control Panel > Give item to give inventory items.`
    )
    .button(TEXT.buttons.relation, UI_ICON.care)
    .button("§0Chat", UI_ICON.care)
    .button(affection >= UNLOCK_GIFT ? TEXT.buttons.receiveGiftFrom(displayName) : TEXT.buttons.receiveGiftNeed(UNLOCK_GIFT), UI_ICON.gift)
    .button(affection >= UNLOCK_HEAL ? TEXT.buttons.healFrom(displayName) : TEXT.buttons.healNeed(UNLOCK_HEAL), UI_ICON.heal)
    .button(TEXT.buttons.backGeneral, UI_ICON.ring)
    .button(TEXT.menu.close, UI_ICON.close);

  form.show(player).then((res) => {
    if (res.canceled || res.selection === undefined) return;
    if (res.selection === 0) return openMenuLater(() => openCareMenu(player, npc));
    if (res.selection === 1) {
      talkToNpc(player, npc, "normal");
      playLoverVoice(npc, player, "talk", 1.0, 1.0);
      return openMenuLater(() => openQuickCarePanel(player, npc));
    }
    if (res.selection === 2) return giveGiftToPlayer(player, affection, true);
    if (res.selection === 3) return healPlayer(player, affection, true);
    if (res.selection === 4) return openMenuLater(() => openLoverMenu(player, npc));
  }).catch(() => {});
}

function getGiftInventoryEntries(player) {
  const container = getInventoryContainer(player);
  if (!container) return [];

  const byType = new Map();
  try {
    for (let i = 0; i < container.size; i++) {
      const item = container.getItem(i);
      if (!item?.typeId || !isGiftItem(item.typeId) || isSoulRingItem(item.typeId)) continue;
      byType.set(item.typeId, (byType.get(item.typeId) ?? 0) + (item.amount ?? 1));
    }
  } catch (e) {}

  return [...byType.entries()]
    .map(([typeId, amount]) => ({ typeId, amount, info: getGiftInfo(typeId) }))
    .sort((a, b) => {
      const av = a.info?.amount ?? 0;
      const bv = b.info?.amount ?? 0;
      if (bv !== av) return bv - av;
      return shortItemName(a.typeId).localeCompare(shortItemName(b.typeId));
    });
}

function openGiftInventoryMenu(player, npc) {
  const loadedNpc = npc && npc.isValid ? npc : findOwnedNpc(player);
  const displayName = getNpcDisplayNameFrom(player, loadedNpc);
  if (!loadedNpc) {
    msg(player, `§c${displayName} is not loaded in this area.`);
    return;
  }

  const entries = getGiftInventoryEntries(player);
  if (entries.length <= 0) {
    msg(player, "§cNo valid gift item found in your inventory.");
    return openMenuLater(() => openLoverMenu(player, loadedNpc));
  }

  const visible = entries.slice(0, 24);
  const form = new ActionFormData()
    .title(`§dGift for ${displayName}`)
    .body("§7Choose one valid gift item from your inventory.");

  for (const entry of visible) {
    const points = entry.info?.amount ?? 0;
    form.button(`§0${shortItemName(entry.typeId)} x${entry.amount} §7(+${points})`);
  }
  form.button(TEXT.buttons.backGeneral, UI_ICON.ring);
  form.button(TEXT.menu.close, UI_ICON.close);

  form.show(player).then((res) => {
    if (res.canceled || res.selection === undefined) return;
    if (res.selection < visible.length) {
      receiveGiftFromPlayer(player, loadedNpc, visible[res.selection].typeId);
      return openMenuLater(() => openGiftInventoryMenu(player, loadedNpc));
    }
    if (res.selection === visible.length) return openMenuLater(() => openLoverMenu(player, loadedNpc));
  }).catch(() => {});
}

function giveItemToNpcFromControlPanel(player, npc) {
  const loadedNpc = npc && npc.isValid ? npc : findOwnedNpc(player);
  const displayName = getNpcDisplayNameFrom(player, loadedNpc);
  if (!loadedNpc) {
    msg(player, `§c${displayName} is not loaded in this area.`);
    return false;
  }

  const item = getHeldItem(player);
  if (item?.typeId && !isSoulRingItem(item.typeId) && isGiftItem(item.typeId)) {
    receiveGiftFromPlayer(player, loadedNpc, item.typeId);
    return true;
  }

  openMenuLater(() => openGiftInventoryMenu(player, loadedNpc));
  return true;
}

function openBrokenRingMenu(player) {
  const affection = getAffection(player);
  const diamonds = countItems(player, "minecraft:diamond");

  if (!playerHasBond(player)) {
    msg(player, "§cThis broken ring has no NPC bond data for you.");
    return;
  }

  if (playerNpcAlive(player)) {
    const loadedNpc = findOwnedNpc(player);
    if (loadedNpc) {
      msg(player, "§eYour NPC is still alive. The broken ring will be converted back into a Bonded Love Ring.");
      convertToBondedRing(player);
    } else {
      msg(player, "§eYour data does not mark the NPC as dead. Use the Bonded Love Ring to call/open the NPC menu first.");
    }
    return;
  }

  const form = new ActionFormData()
    .title("§cBroken Love Ring")
    .body(
      `§fYour NPC has died.\n` +
      `§fSaved Bond: §d${affection}/${AFFECTION_MAX}\n` +
      `§fDiamonds available: §b${diamonds}/20\n\n` +
      "§7Repairing the ring costs 20 diamonds and revives the NPC near you."
    )
    .button(diamonds >= 20 ? TEXT.buttons.repairRingRevive : TEXT.buttons.needDiamonds20)
    .button(TEXT.menu.close);

  form.show(player).then((res) => {
    if (res.canceled || res.selection === undefined) return;
    if (res.selection !== 0) return;

    if (countItems(player, "minecraft:diamond") < 20) {
      msg(player, "§cYou need 20 diamonds to repair the Broken Love Ring.");
      return;
    }

    if (!removeItems(player, "minecraft:diamond", 20)) {
      msg(player, "§cCould not remove 20 diamonds. Put diamonds in your main inventory and try again.");
      return;
    }

    if (!removeItems(player, BROKEN_RING_ID, 1)) {
      giveItem(player, "minecraft:diamond", 20);
      msg(player, "§cCould not remove the Broken Love Ring, so 20 diamonds were refunded.");
      return;
    }

    spawnAndBondNpc(player, true);
  }).catch(() => {});
}


function pickLine(lines) {
  if (!lines || lines.length <= 0) return "";
  if (lines.length === 1) return lines[0];

  const key = lines.join("||");
  const last = lastPickedLineText.get(key);
  let selected = lines[Math.floor(Math.random() * lines.length)];

  if (selected === last) {
    const alternatives = lines.filter((line) => line !== last);
    if (alternatives.length > 0) {
      selected = alternatives[Math.floor(Math.random() * alternatives.length)];
    }
  }

  lastPickedLineText.set(key, selected);
  return selected;
}

function getScheduleNameFromTime(time) {
  const t = Math.floor(Number(time) || 0) % 24000;
  if (t >= 23000 || t < 1000) return "early morning";
  if (t < 6000) return "morning";
  if (t < 12000) return "noon";
  if (t < 13000) return "afternoon";
  if (t < 18000) return "evening";
  return "night";
}

function getWorldScheduleName(player) {
  try {
    const time = player?.dimension?.getTimeOfDay ? player.dimension.getTimeOfDay() : world.getTimeOfDay();
    return getScheduleNameFromTime(time);
  } catch (e) {
    try { return getScheduleNameFromTime(world.getTimeOfDay()); } catch (e2) {}
  }
  return "today";
}

function getNpcStateTalkLine(npc, player) {
  const name = getNpcDisplayName(player);
  try {
    if (npc) {
      if (safeGetProperty(npc, "quan:is_sleeping", false) === true || hasTag(npc, "lover_mode_sleep")) {
        return `§d${name}: §fI am sleepy... let me rest a little longer.`;
      }
      if (hasTag(npc, "lover_mode_rest")) {
        return `§d${name}: §fResting beside you feels peaceful.`;
      }
      if (safeGetProperty(npc, "quan:is_sitting", false) === true || hasTag(npc, "lover_mode_sit")) {
        return `§d${name}: §fSitting beside you for a while is nice.`;
      }
      const hp = getNpcHealthValues(npc);
      if (hp.max > 0 && hp.current <= Math.max(10, Math.floor(hp.max * 0.35))) {
        return `§d${name}: §fI am hurt a little, but I am okay.`;
      }
    }
  } catch (e) {}
  return undefined;
}

function getTalkLineByTopic(player, npc, topic = "normal") {
  const affection = getAffection(player);
  const name = getNpcDisplayName(player);
  const schedule = getWorldScheduleName(player);
  const stateLine = getNpcStateTalkLine(npc, player);
  if (stateLine && (topic === "normal" || topic === "care")) return stateLine;

  if (topic === "care") {
    if (affection >= 180) return pickLine([
      `§d${name}: §fI am okay. Being with you is enough.`,
      `§d${name}: §fRemember to rest too.`,
      `§d${name}: §fIf you are tired, let us rest a little.`
    ]);
    return pickLine([
      `§d${name}: §fI am still okay.`,
      `§d${name}: §fIt makes me feel safer when you ask.`,
      `§d${name}: §fI will do my best today.`
    ]);
  }

  if (topic === "praise") {
    if (affection >= 150) return pickLine([
      `§d${name}: §fYou make me shy when you praise me...`,
      `§d${name}: §fReally? That makes me happy.`,
      `§d${name}: §fThen I will try to be even cuter.`
    ]);
    return pickLine([
      `§d${name}: §fThank you.`,
      `§d${name}: §fI am not used to being praised.`,
      `§d${name}: §fI am happy to hear that.`
    ]);
  }

  if (topic === "heart") {
    if (affection >= 220) return pickLine([
      `§d${name}: §fI want to stay with you longer.`,
      `§d${name}: §fWherever you go, I want to follow.`,
      `§d${name}: §fYou are the one I trust most.`
    ]);
    return pickLine([
      `§d${name}: §fI am still learning to trust you more.`,
      `§d${name}: §fTraveling with you makes me feel safe.`,
      `§d${name}: §fLet us grow closer slowly.`
    ]);
  }

  if (topic === "relation") {
    return pickLine([
      `§d${name}: §fCurrent Bond is §d${affection}/${AFFECTION_MAX}§f.`,
      `§d${name}: §fI think our relationship is getting better.`,
      `§d${name}: §fLet us keep taking care of each other.`
    ]);
  }

  if (topic === "foxbond") {
    return pickLine([
      `§d${name}: §fThe Fox Contract is my promise to always travel with you.`,
      `§d${name}: §fWhen riding the fox, I feel stronger.`,
      `§d${name}: §fDo not forget to choose the fox skin you like.`
    ]);
  }

  if (topic === "like") {
    return pickLine([
      `§d${name}: §fI like quiet places.`,
      `§d${name}: §fI like flowers... and I like when you call me along.`,
      `§d${name}: §fFor gifts, anything heartfelt is enough.`
    ]);
  }

  if (topic === "want") {
    return pickLine([
      `§d${name}: §fToday I want to go with you.`,
      `§d${name}: §fIf possible, let us find somewhere beautiful.`,
      `§d${name}: §fI want a peaceful day.`
    ]);
  }


  if (topic === "ambient") {
    if (affection >= 280) return pickLine([
      `§d${name}: §fAs long as you are near, I feel safe.`,
      `§d${name}: §fLet us walk a little farther.`,
      `§d${name}: §fI want to stay with you longer.`,
      `§d${name}: §fCall me and I will come right away.`
    ]);
    if (affection >= 180) return pickLine([
      `§d${name}: §fIf there is danger, let me help.`,
      `§d${name}: §fTraveling with you makes me feel safe.`,
      `§d${name}: §fI will watch our surroundings.`,
      `§d${name}: §fIf you are tired, let us rest a little.`
    ]);
    if (affection >= 100) return pickLine([
      `§d${name}: §fWhere are we going today?`,
      `§d${name}: §fI am used to traveling with you now.`,
      `§d${name}: §fRemember to rest too.`,
      `§d${name}: §fI am still following you.`
    ]);
    if (affection >= 30) return pickLine([
      `§d${name}: §fI will follow you.`,
      `§d${name}: §fDid you call me?`,
      `§d${name}: §fWhat are we doing today?`,
      `§d${name}: §fI am listening.`
    ]);
    return pickLine([
      `§d${name}: §fI am still getting used to this.`,
      `§d${name}: §fWhat do you need me to do?`,
      `§d${name}: §fI am here.`,
      `§d${name}: §fHello.`
    ]);
  }

  if (topic === "schedule") {
    if (schedule === "night") return pickLine([
      `§d${name}: §fIt is night; I want to rest a little.`,
      `§d${name}: §fNight is more dangerous, please be careful.`,
      `§d${name}: §fIf you get sleepy, let us rest together.`
    ]);
    if (schedule === "evening") return pickLine([
      `§d${name}: §fIt is evening; let us slow down.`,
      `§d${name}: §fIt is dark now; I will watch our surroundings.`,
      `§d${name}: §fThe evening is so quiet.`
    ]);
    if (schedule === "morning") return pickLine([
      `§d${name}: §fIt is a beautiful morning. Where are we going today?`,
      `§d${name}: §fMorning is here; I am ready to go with you.`,
      `§d${name}: §fPlease let me come with you today too.`
    ]);
    return pickLine([
      `§d${name}: §fIt is now ${schedule}; I am still beside you.`,
      `§d${name}: §fIt is ${schedule} now; let us continue.`,
      `§d${name}: §fI am okay. How about you?`
    ]);
  }

  if (affection >= 280) return pickLine([
    `§d${name}: §fWhenever you call, I will be here.`,
    `§d${name}: §fI trust you. If there is danger, call me.`,
    `§d${name}: §fWe are working together better now.`
  ]);
  if (affection >= 180) return pickLine([
    `§d${name}: §fI am ready for the trip.`,
    `§d${name}: §fWhen fighting monsters, choose the target first.`,
    `§d${name}: §fI will support you when needed.`
  ]);
  if (affection >= 100) return pickLine([
    `§d${name}: §fIf you are hurt, I will help.`,
    `§d${name}: §fI am getting used to traveling with you.`,
    `§d${name}: §fWhat are we doing today?`
  ]);
  if (affection >= 30) return pickLine([
    `§d${name}: §fI am listening.`,
    `§d${name}: §fWhat do you need me to do?`,
    `§d${name}: §fI will follow you.`
  ]);
  return pickLine([
    `§d${name}: §fHello.`,
    `§d${name}: §fWhat do you want me to do?`,
    `§d${name}: §fI am still getting used to this.`
  ]);
}

function getLoverLine(player) {
  return getTalkLineByTopic(player, findOwnedNpc(player, 64), "normal");
}

function getGiftInfo(typeId) {
  if (!typeId) return undefined;
  const id = typeId.replace("minecraft:", "");

  const exact = {
    diamond: { amount: 12, label: "diamond" },
    emerald: { amount: 8, label: "emerald" },
    amethyst_shard: { amount: 4, label: "amethyst" },
    gold_ingot: { amount: 4, label: "gold" },
    iron_ingot: { amount: 3, label: "iron" },
    golden_apple: { amount: 9, label: "golden apple" },
    enchanted_golden_apple: { amount: 22, label: "enchanted golden apple" },
    golden_carrot: { amount: 6, label: "golden carrot" },
    cake: { amount: 6, label: "cake" },
    pumpkin_pie: { amount: 4, label: "pumpkin pie" },
    honey_bottle: { amount: 4, label: "honey" },
    nether_star: { amount: 30, label: "sao Nether" }
  };

  if (exact[id]) return exact[id];

  const rareFlowers = ["wither_rose", "torchflower", "pitcher_plant"];
  if (rareFlowers.some((name) => id.includes(name))) return { amount: 5, label: "rare flower" };

  const flowers = ["flower", "poppy", "dandelion", "tulip", "rose", "orchid", "allium", "daisy", "cornflower", "lily_of_the_valley"];
  if (flowers.some((name) => id.includes(name))) return { amount: 2, label: "hoa" };

  const foods = ["apple", "bread", "cookie", "sweet_berries", "glow_berries", "melon_slice", "carrot", "beetroot", "baked_potato"];
  if (foods.some((name) => id.includes(name))) return { amount: 2, label: "food" };

  return undefined;
}

function scaleGiftAmount(baseAmount, before) {
  if (before >= 250 && baseAmount < 8) return Math.max(1, Math.floor(baseAmount * 0.35));
  if (before >= 180 && baseAmount < 8) return Math.max(1, Math.floor(baseAmount * 0.5));
  if (before >= 100 && baseAmount < 5) return Math.max(1, Math.floor(baseAmount * 0.75));
  return baseAmount;
}

function isGiftItem(typeId) {
  return getGiftInfo(typeId) !== undefined;
}

function receiveGiftFromPlayer(player, npc, itemTypeId) {
  if (!ensureOwnerOrTame(npc, player)) return;

  const info = getGiftInfo(itemTypeId);
  if (!info) return;

  const now = tickNow();
  const lastTick = lastPlayerGiftTick.get(player.id) ?? -999999;
  if (now - lastTick < GIFT_COOLDOWN_TICKS) {
    const remain = Math.ceil((GIFT_COOLDOWN_TICKS - (now - lastTick)) / 20);
    msg(player, `§e${getNpcDisplayName(player)} is waiting to receive a gift. Try again in ${remain}s.`);
    return;
  }

  lastPlayerGiftTick.set(player.id, now);

  const before = getAffection(player);
  const amount = scaleGiftAmount(info.amount, before);

  if (!removeItems(player, itemTypeId, 1)) {
    msg(player, "§cCould not remove the gifted item, so Bond did not increase.");
    return;
  }

  const after = addAffection(player, amount, true);

  msg(player, `§d${getNpcDisplayName(player)} received ${info.label}. §a+${amount} Bond`);
  try {
    const foodRest = hungerFoodRestore(itemTypeId);
    if (foodRest > 0) {
      const hb = getNpcHunger(npc);
      const ha = Math.min(HUNGER_MAX, hb + foodRest);
      setNpcHunger(npc, ha);
      msg(player, `§7Hunger: §e${ha}/${HUNGER_MAX}`);
    }
  } catch (e) {}
  playLoverVoice(npc, player, "gift", 1.0, 1.0);
  if (after >= 180 && info.amount < 8) {
    msg(player, "§7Tip: at high Bond, normal gifts give less. Diamonds / golden apples / emeralds work better.");
  }

  safeSetProperty(npc, "quan:is_heart", true);
  spawnLoveParticles(npc, 12);
  system.runTimeout(() => safeSetProperty(npc, "quan:is_heart", false), 55);
}

function giveGiftToPlayer(player, affection = getAffection(player), manual = true) {
  if (affection < UNLOCK_GIFT) {
    msg(player, `§cRequires Bond ${UNLOCK_GIFT}/${AFFECTION_MAX} to ask ${getNpcDisplayName(player)} for gifts.`);
    return false;
  }

  if (manual) {
    const now = tickNow();
    const lastTick = lastManualGiftTick.get(player.id) ?? -999999;
    if (now - lastTick < MANUAL_GIFT_COOLDOWN_TICKS) {
      const remain = Math.ceil((MANUAL_GIFT_COOLDOWN_TICKS - (now - lastTick)) / 20);
      msg(player, `§e${getNpcDisplayName(player)} is preparing a gift. Try again in ${remain}s.`);
      return false;
    }
    lastManualGiftTick.set(player.id, now);
  }

  let gifts = ["minecraft:apple 3", "minecraft:bread 4", "minecraft:cookie 6", "minecraft:torch 8"];

  if (affection >= 160) {
    gifts = ["minecraft:golden_carrot 3", "minecraft:emerald 2", "minecraft:iron_ingot 4", "minecraft:bread 8"];
  }

  if (affection >= 240) {
    gifts = ["minecraft:diamond 1", "minecraft:golden_apple 1", "minecraft:emerald 5", "minecraft:ender_pearl 2", "minecraft:experience_bottle 8"];
  }

  const gift = gifts[Math.floor(Math.random() * gifts.length)];
  const [giftId, amountText] = gift.split(" ");
  const amount = Math.max(1, parseInt(amountText ?? "1", 10) || 1);

  if (!giveItem(player, giftId, amount)) {
    msg(player, `§c${getNpcDisplayName(player)} wants to give a gift, but the item could not be added to your inventory.`);
    return false;
  }

  msg(player, `§dGift from ${getNpcDisplayName(player)} §7(${giftId.replace("minecraft:", "")} x${amount})`);
  return true;
}

function healPlayer(player, affection = getAffection(player), manual = true) {
  if (affection < UNLOCK_HEAL) {
    msg(player, `§cRequires Bond ${UNLOCK_HEAL}/${AFFECTION_MAX} to ask ${getNpcDisplayName(player)} to heal you.`);
    return false;
  }

  if (manual) {
    const now = tickNow();
    const lastTick = lastHealTick.get(player.id) ?? -999999;
    if (now - lastTick < HEAL_COOLDOWN_TICKS) {
      const remain = Math.ceil((HEAL_COOLDOWN_TICKS - (now - lastTick)) / 20);
      msg(player, `§e${getNpcDisplayName(player)} needs to rest before healing again. Remaining: ${remain}s.`);
      return false;
    }
    lastHealTick.set(player.id, now);
  }

  try {
    const health = player.getComponent("minecraft:health");
    if (health) {
      const max = health.effectiveMax ?? health.defaultValue ?? 20;
      const bonus = affection >= 220 ? 10 : 6;
      health.setCurrentValue(Math.min(max, (health.currentValue ?? max) + bonus));
    }
  } catch (e) {}

  try {
    if (affection >= 220) {
      player.addEffect("regeneration", 8 * 20, { amplifier: 2, showParticles: false });
      player.addEffect("absorption", 30 * 20, { amplifier: 1, showParticles: false });
    } else {
      player.addEffect("regeneration", 7 * 20, { amplifier: 1, showParticles: false });
      player.addEffect("absorption", 20 * 20, { amplifier: 0, showParticles: false });
    }
  } catch (e) {
    if (affection >= 220) {
      run(player, "effect @s regeneration 8 2 true");
      run(player, "effect @s absorption 30 1 true");
    } else {
      run(player, "effect @s regeneration 7 1 true");
      run(player, "effect @s absorption 20 0 true");
    }
  }

  msg(player, `§a${getNpcDisplayName(player)} healed you.`);
  return true;
}

function getRecallLimitInfo(npc) {
  const sleeping = hasTag(npc, "lover_mode_sleep") || safeGetProperty(npc, "quan:is_sleeping", false) === true;
  const resting = hasTag(npc, "lover_mode_rest");

  if (sleeping && !resting) {
    return { limit: RECALL_DISTANCE_SLEEP, state: "sleep", label: "sleeping" };
  }
  if (resting) {
    return { limit: RECALL_DISTANCE_REST, state: "rest", label: "resting" };
  }
  return { limit: RECALL_DISTANCE_NORMAL, state: "normal", label: "normal" };
}

function canRecallNpc(player, npc) {
  try {
    if (npc.dimension.id !== player.dimension.id) return { ok: true, distance: 0, info: getRecallLimitInfo(npc) };
  } catch (e) {
    return { ok: true, distance: 0, info: getRecallLimitInfo(npc) };
  }

  const info = getRecallLimitInfo(npc);
  const distance = distanceBetween(player.location, npc.location);
  return { ok: distance <= info.limit, distance, info };
}

function comeHere(player, npc) {
  if (safeGetProperty(npc, "quan:is_carrying", false) === true) return;
  if (!ensureOwnerOrTame(npc, player)) return false;

  const displayName = getNpcDisplayNameFrom(player, npc);
  const recall = canRecallNpc(player, npc);
  if (!recall.ok) {
    const dist = Math.ceil(recall.distance);
    if (recall.info.state === "sleep") {
      msg(player, `§c${displayName} is sleeping. Move closer to wake her up. §7(${dist}/${recall.info.limit} block)`);
    } else if (recall.info.state === "rest") {
      msg(player, `§c${displayName} is resting. Move closer to call her. §7(${dist}/${recall.info.limit} block)`);
    } else {
      msg(player, `§c${displayName} is too far away to call. §7(${dist}/${recall.info.limit} block)`);
    }
    return false;
  }

  const dir = player.getViewDirection();
  const loc = player.location;

  try {
    clearPose(npc);
    triggerNpcEvent(npc, "quan:guard_power_0");
    npc.teleport(
      {
        x: loc.x + dir.x * 1.5,
        y: loc.y,
        z: loc.z + dir.z * 1.5
      },
      {
        dimension: player.dimension,
        facingLocation: player.location
      }
    );

    if (recall.info.state === "sleep") msg(player, `§a${displayName} woke up.`);
    else if (recall.info.state === "rest") msg(player, `§a${displayName} stood up.`);
    else msg(player, `§aCalled ${displayName}.`);
    spawnLoveParticles(npc, 4);
    return true;
  } catch (e) {
    msg(player, `§cCould not pull ${displayName} closer.`);
    return false;
  }
}

function setMode(npc, mode, snapshotOverride = undefined) {
  if (mode === "crawl") mode = "follow";
  let eventName = "";

  if (mode === "follow") eventName = "quan:set_follow";
  if (mode === "stay") eventName = "quan:set_stay";
  if (mode === "guard") eventName = "quan:set_guard";
  if (mode === "idle") eventName = "quan:set_idle";
  if (mode === "sit") eventName = "quan:set_sit";
  if (mode === "sleep" || mode === "rest") eventName = "quan:set_sleep";
  if (mode === "wake") eventName = "quan:set_wake";

  if (!eventName) return false;

  const stateHealthSnapshot = isValidHealthSnapshotV31_2(snapshotOverride) ? snapshotOverride : getHealthSnapshotV31_1(npc);
  const ok = triggerNpcEvent(npc, eventName);

  if (ok) {
    if (mode !== "idle") removeTag(npc, AUTO_ROAM_TAG);
    if (mode === "wake") {
      setModeTag(npc, "stay");
    } else {
      setModeTag(npc, mode);
    }
    // Force client-synced pose properties (events alone can lag / miss on some builds)
    try {
      if (mode === "sit") {
        npc.setProperty("quan:is_sitting", true);
        npc.setProperty("quan:is_sleeping", false);
        npc.setProperty("quan:is_hugging", false);
        npc.setProperty("quan:is_kissing", false);
        npc.setProperty("quan:is_carrying", false);
        system.runTimeout(() => {
          try {
            npc.setProperty("quan:is_sitting", true);
            npc.setProperty("quan:is_sleeping", false);
          } catch (e2) {}
        }, 2);
      } else if (mode === "sleep" || mode === "rest") {
        npc.setProperty("quan:is_sitting", false);
        npc.setProperty("quan:is_sleeping", true);
        npc.setProperty("quan:is_hugging", false);
        npc.setProperty("quan:is_kissing", false);
        npc.setProperty("quan:is_carrying", false);
        system.runTimeout(() => {
          try {
            npc.setProperty("quan:is_sitting", false);
            npc.setProperty("quan:is_sleeping", true);
          } catch (e2) {}
        }, 2);
      } else if (mode === "wake" || mode === "follow" || mode === "stay") {
        npc.setProperty("quan:is_sitting", false);
        npc.setProperty("quan:is_sleeping", false);
      }
    } catch (e) {}

    try {
      const owner = getTrueOwner(npc);
      if (owner) finalizeNpcStateHealth(npc, owner, stateHealthSnapshot);
    } catch (e) {}
  }

  return ok;
}

function updateAutoRoamWhileFollowing(npc, owner, distance) {
  // Sleep must stay passive. Auto-waking when the player walks away made Ribbuny
  // stand up and freeze. Player wakes her from the menu only.
  try {
    if (safeGetProperty(npc, "quan:is_sleeping", false) === true || hasTag(npc, "lover_mode_sleep") || hasTag(npc, "lover_mode_rest")) {
      return;
    }
  } catch (e) {}

  // Auto-roam used to switch follow -> idle when close (<8 blocks).
  // That broke continuous follow: when the player walked away the NPC
  // stayed in idle/wander instead of reliably returning to follow_owner.
  // Keep pure follow mode; only clean leftover auto-roam tags.
  if (!npc || !owner) return;
  if (hasTag(npc, AUTO_ROAM_TAG)) {
    removeTag(npc, AUTO_ROAM_TAG);
    // If she was stuck in idle because of old auto-roam, restore follow.
    if (hasTag(npc, "lover_mode_idle") && !isPassivePose(npc)) {
      try { setMode(npc, "follow"); } catch (e) {}
    }
  }

  // Safety: while tagged as follow, periodically re-assert follow component
  // if the player is far (component can drop after pose/events).
  if (hasTag(npc, "lover_mode_follow") && !isPassivePose(npc) && distance > 6) {
    try {
      const last = Number(npc.getDynamicProperty("quan:follow_reassert_tick") || 0);
      const now = system.currentTick || 0;
      if (now - last > 20) {
        npc.setDynamicProperty("quan:follow_reassert_tick", now);
        triggerNpcEvent(npc, "quan:set_follow");
      }
    } catch (e) {}
  }
}

function setOwnedMode(npc, player, mode) {
  if (mode === "follow" && safeGetProperty(npc, "quan:is_carrying", false) === true) {
    try { msg(player, "§eСначала положи чибика (Put down)."); } catch (e) {}
    return;
  }

  npc = normalizeFoxSleepStateV303(npc, player) ?? npc;
  if (mode === "crawl") mode = "follow";
  if (!ensureOwnerOrTame(npc, player)) return false;
  removeTag(npc, AUTO_ROAM_TAG);

  const ownedStateHealthSnapshot = getHealthSnapshotV31_1(npc);

  if ((mode === "sleep" || mode === "rest") && npc.typeId === NPC_ID) {
    npc = spawnSleepEntityV31(npc, player, mode, ownedStateHealthSnapshot);
  } else if (mode === "wake" && isSleepNpcType(npc)) {
    npc = spawnAwakeEntityV31(npc, player, "stay", ownedStateHealthSnapshot);
  } else if (isSleepNpcType(npc) && mode !== "sleep" && mode !== "rest") {
    npc = spawnAwakeEntityV31(npc, player, mode, ownedStateHealthSnapshot);
  }

  const affection = getAffection(player);

  if (mode === "guard" && affection < UNLOCK_GUARD) {
    msg(player, `§cRequires Bond ${UNLOCK_GUARD}/${AFFECTION_MAX} to unlock guard.`);
    return false;
  }

  let selectedSleepPose = -1;

  if (mode === "sleep" || mode === "rest") {
    selectedSleepPose = randomSleepPose(npc);
  }

  system.runTimeout(() => {
    const stateHealthSnapshot = isValidHealthSnapshotV31_2(ownedStateHealthSnapshot) ? ownedStateHealthSnapshot : getHealthSnapshotV31_1(npc);
    const eventOk = setMode(npc, mode, stateHealthSnapshot);

    if (!eventOk) {
      msg(player, "§cCould not call mode event. Check BP/entities/lover_npc.json.");
      return;
    }

    if ((mode === "sleep" || mode === "rest") && selectedSleepPose >= 0) {
      // Some event/entity components may set the property after triggerEvent.
      // Set it again after 1 tick so the animation controller reads the right pose.
      system.runTimeout(() => {
        safeSetProperty(npc, "quan:sleep_pose", selectedSleepPose);
      }, 1);
    }

    // setMode already restores HP from stateHealthSnapshot. Do not finalize again here,
    // otherwise fast state changes can accidentally restore full HP.

    if (mode === "guard") {
      applyGuardPower(npc, player);
      const stats = getGuardStats(affection);
      msg(player, `§aGuard: ${stats.text}`);
    }

    if (mode === "follow") msg(player, "§aFollow.");
    if (mode === "stay") msg(player, "§7Standing still.");
    if (mode === "idle") msg(player, "§7Roaming freely.");
    if (mode === "sit") msg(player, "§eSitting.");
    if (mode === "rest") {
      msg(player, "§bResting.");
      playLoverVoice(npc, player, "sleep", 1.0, 0.95);
    }
    if (mode === "sleep") {
      msg(player, "§bSleeping.");
      playLoverVoice(npc, player, "sleep", 1.0, 0.95);
    }
    if (mode === "wake") {
      msg(player, "§aWoke up.");
      playLoverVoice(npc, player, "wake", 1.0, 1.05);
    }

    saveNpcState(player, npc);
    spawnLoveParticles(npc, 2);
  }, 1);

  return true;
}


function setOwnedSleepPose(npc, player, pose, mode = "sleep") {
  if (!ensureOwnerOrTame(npc, player)) return false;
  const selectedPose = Math.max(0, Math.min(3, Math.floor(Number(pose) || 0)));
  const selectedMode = mode === "rest" ? "rest" : "sleep";

  system.runTimeout(() => {
    safeSetProperty(npc, "quan:sleep_pose", selectedPose);
    const eventOk = setMode(npc, selectedMode);

    if (!eventOk) {
      msg(player, "§cCould not call sleep/rest animation.");
      return;
    }

    system.runTimeout(() => {
      safeSetProperty(npc, "quan:sleep_pose", selectedPose);
    }, 1);

    msg(player, selectedMode === "rest" ? `§bRest: ${getSleepPoseName(selectedPose)}.` : `§bSleep: ${getSleepPoseName(selectedPose)}.`);
    saveNpcState(player, npc);
    spawnLoveParticles(npc, 2);
  }, 1);

  return true;
}

function openSleepPoseMenu(player, npc, backTo = "command") {
  const resting = hasTag(npc, "lover_mode_rest");
  const sleeping = hasTag(npc, "lover_mode_sleep") || safeGetProperty(npc, "quan:is_sleeping", false) === true;

  const form = new ActionFormData()
    .title(`§d${getNpcDisplayName(player)} §7| §fSleep Pose`)
    .body(
      `§7Choose a preset sleep/rest animation.\n` +
      `§8Current: ${resting ? "§bresting" : sleeping ? "§3sleeping" : "§7not sleeping"}`
    )
    .button("§3Sleep - soft side lying", UI_ICON.sit)
    .button("§3Sleep - light curl", UI_ICON.sit)
    .button("§3Sleep - tail hug", UI_ICON.sit)
    .button("§bRest - soft lie", UI_ICON.sit)
    .button(TEXT.buttons.wake, UI_ICON.status)
    .button(TEXT.buttons.backGeneral, UI_ICON.close);

  form.show(player).then((res) => {
    if (res.canceled || res.selection === undefined) return;
    if (res.selection === 0) return setOwnedSleepPose(npc, player, 0, "sleep");
    if (res.selection === 1) return setOwnedSleepPose(npc, player, 2, "sleep");
    if (res.selection === 2) return setOwnedSleepPose(npc, player, 3, "sleep");
    if (res.selection === 3) return setOwnedSleepPose(npc, player, 1, "rest");
    if (res.selection === 4) return setOwnedMode(npc, player, "wake");
    if (res.selection === 5) {
      if (backTo === "action") return openMenuLater(() => openActionMenu(player, npc));
      return openMenuLater(() => openV22FCommandTab(player, npc));
    }
  }).catch(() => {});
}

function playPlayerInteractionAnimation(player, type) {
  // Disabled: needs full minecraft:player client override or content log spam / no anim.
  return false;
}


function faceNpcToPlayer(npc, player) {
  try {
    npc.setRotation({ x: 0, y: player.getRotation().y + 180 });
  } catch (e) {}
}

function positionInteractionNpc(player, npc, type) {
  try {
    const view = player.getViewDirection();
    const yaw = player.getRotation().y;
    let distance = 0.65;
    let yOffset = 0.02;
    let npcYaw = yaw + 180;

    if (type === "kiss") {
      distance = 0.52;
      yOffset = 0.05;
      npcYaw = yaw + 180;
    } else if (type === "carry") {
      // Lie against chest (Z90 pose) — keep tight so she does not slide
      distance = 0.20;
      yOffset = 1.05;
      npcYaw = yaw;
    }

    let posX = player.location.x + view.x * distance;
    let posZ = player.location.z + view.z * distance;
    if (type === "carry") {
      const rad = (yaw * Math.PI) / 180;
      // small right-arm offset
      posX += (-Math.cos(rad)) * 0.12;
      posZ += (-Math.sin(rad)) * 0.12;
    }
    const pos = {
      x: posX,
      y: player.location.y + yOffset,
      z: posZ
    };
    npc.teleport(pos, {
      dimension: player.dimension,
      rotation: { x: 0, y: npcYaw }
    });
    // hard lock movement while carried
    if (type === "carry") {
      try { safeSetProperty(npc, "quan:is_moving", false); } catch (e) {}
      try { safeSetProperty(npc, "quan:is_running", false); } catch (e) {}
      try { npc.triggerEvent("quan:set_stay"); } catch (e) {}
    }
  } catch (e) {}
}

function stopPairInteraction(player, npc) {
  if (!player) return;
  activePairInteractions.delete(player.id);
  try { playPlayerInteractionAnimation(player, "reset"); } catch (e) {}
  if (npc && npc.isValid) {
    safeSetProperty(npc, "quan:is_hugging", false);
    safeSetProperty(npc, "quan:is_kissing", false);
    safeSetProperty(npc, "quan:is_carrying", false);
  }
}

function playEmote(player, npc, emote) {
  if (!ensureOwnerOrTame(npc, player)) return;

  clearPose(npc);

  if (emote === "hug") {
    activePairInteractions.set(player.id, {
      npcId: npc.id,
      type: "hug",
      until: tickNow() + 60
    });
    safeSetProperty(npc, "quan:is_hugging", true);
    positionInteractionNpc(player, npc, "hug");
    playPlayerInteractionAnimation(player, "hug");
    msg(player, "§dОбъятие 💕");
    spawnLoveParticles(npc, 8);
    return;
  }

  if (emote === "kiss") {
    activePairInteractions.set(player.id, {
      npcId: npc.id,
      type: "kiss",
      until: tickNow() + 50
    });
    safeSetProperty(npc, "quan:is_kissing", true);
    positionInteractionNpc(player, npc, "kiss");
    playPlayerInteractionAnimation(player, "kiss");
    msg(player, "§dПоцелуй 💋");
    spawnLoveParticles(npc, 12);
    system.runTimeout(() => spawnLoveParticles(npc, 8), 12);
    return;
  }

  if (emote === "carry") {
    activeCarryTargets.set(player.id, npc.id);
    // Remember previous mode so we can restore follow later
    try {
      const prevMode = hasTag(npc, "lover_mode_follow") ? "follow" :
                       hasTag(npc, "lover_mode_guard") ? "guard" :
                       hasTag(npc, "lover_mode_idle") ? "idle" : "stay";
      npc.setDynamicProperty("quan:pre_carry_mode", prevMode);
    } catch (e) {}
    try { setMode(npc, "stay"); } catch (e) {}
    try { clearModeTags(npc); addTag(npc, "lover_mode_stay"); } catch (e) {}
    try { npc.triggerEvent("quan:set_stay"); } catch (e) {}
    safeSetProperty(npc, "quan:is_carrying", true);
    safeSetProperty(npc, "quan:is_moving", false);
    safeSetProperty(npc, "quan:is_sitting", false);
    safeSetProperty(npc, "quan:is_sleeping", false);
    try { npc.triggerEvent("quan:set_stay"); } catch (e) {}
    // sticky carry position for a few seconds
    for (let i = 1; i <= 80; i++) {
      system.runTimeout(() => {
        try {
          if (!npc.isValid) return;
          if (safeGetProperty(npc, "quan:is_carrying", false) !== true) return;
          positionInteractionNpc(player, npc, "carry");
        } catch (e) {}
      }, i);
    }
    positionInteractionNpc(player, npc, "carry");
    try { npc.setProperty("quan:is_moving", false); } catch (e) {}
    try { npc.setProperty("quan:is_carrying", true); } catch (e) {}
    msg(player, "§dВзял(а) чибика на руки. §7(ещё раз — положить)");
    return;
  }

  if (emote === "putdown") {
    activeCarryTargets.delete(player.id);
    safeSetProperty(npc, "quan:is_carrying", false);
    playPlayerInteractionAnimation(player, "reset");
    try {
      npc.teleport({
        x: player.location.x + player.getViewDirection().x * 0.75,
        y: player.location.y,
        z: player.location.z + player.getViewDirection().z * 0.75
      }, { dimension: player.dimension, rotation: { x: 0, y: player.getRotation().y } });
    } catch (e) {}
    // Restore previous mode (especially follow)
    try {
      const prev = npc.getDynamicProperty("quan:pre_carry_mode") || "follow";
      npc.setDynamicProperty("quan:pre_carry_mode", undefined);
      if (prev === "follow") {
        setMode(npc, "follow");
        try { npc.triggerEvent("quan:set_follow"); } catch (e2) {}
      } else if (prev === "guard") {
        setMode(npc, "guard");
      } else {
        setMode(npc, "stay");
      }
    } catch (e) {
      try { setMode(npc, "follow"); } catch (e2) {}
    }
    msg(player, "§7Чибик снова стоит на земле.");
    return;
  }

  if (emote === "dance") {
    safeSetProperty(npc, "quan:is_dancing", true);
    msg(player, `§d${getNpcDisplayName(player)} started jumping.`);
    spawnLoveParticles(npc, 4);
    system.runTimeout(() => safeSetProperty(npc, "quan:is_dancing", false), 100);
    return;
  }

  if (emote === "heart") {
    safeSetProperty(npc, "quan:is_heart", true);
    msg(player, `§d${getNpcDisplayName(player)}: 💖`);
    spawnLoveParticles(npc, 18);
    system.runTimeout(() => spawnLoveParticles(npc, 10), 20);
    system.runTimeout(() => safeSetProperty(npc, "quan:is_heart", false), 70);
  }
}

function getOutfitUnlockAffection(outfitValue) {
  const index = Math.max(0, Math.min(OUTFIT_UNLOCKS.length - 1, Math.floor(Number(outfitValue) || 0)));
  return OUTFIT_UNLOCKS[index] ?? 0;
}

function isOutfitUnlockedByAffection(player, outfitValue) {
  return getAffection(player) >= getOutfitUnlockAffection(outfitValue);
}

function isFoxSkinUnlockedByAffection(player) {
  return getAffection(player) >= FOX_UNLOCK_AFFECTION;
}

function getCurrentOutfitValueForMenu(player, npc) {
  try {
    const p = npc.getProperty("quan:outfit");
    if (p !== undefined && p !== null) {
      const n = Math.floor(Number(p));
      if (n === 0 || n === 1 || n === 2 || n === 3) return n;
    }
  } catch (e) {}
  const fromPlayer = getPlayerNumber(player, NPC_OUTFIT_PROPERTY, 0);
  return Math.max(0, Math.min(3, Math.floor(Number(fromPlayer) || 0)));
}

function getCurrentFoxSkinValueForMenu(player, npc) {
  return Math.max(0, Math.min(FOX_SKINS.length - 1, safeGetProperty(npc, "quan:fox_skin", getPlayerNumber(player, FOX_SKIN_PROPERTY, 0))));
}

function setOutfit(player, npc, outfitValue) {
  if (!npc || !player) return false;
  if (!ensureOwnerOrTame(npc, player)) return false;

  const value = Math.max(0, Math.min(3, Math.floor(Number(outfitValue) || 0)));
  const need = getOutfitUnlockAffection(value);
  const affection = getAffection(player);
  if (affection < need) {
    msg(player, `§cСкин закрыт. §eНужна связь: §f${need}.`);
    return false;
  }

  let ok = false;
  try {
    npc.setProperty("quan:outfit", value);
    ok = true;
  } catch (e) {
    ok = false;
  }
  // Event fallback (property sync on some builds)
  try {
    npc.triggerEvent(outfitEventName(value));
    ok = true;
  } catch (e) {}

  try {
    if (value === 1) npc.setProperty("quan:fox_skin", 0);
  } catch (e) {}

  setPlayerNumber(player, NPC_OUTFIT_PROPERTY, value);
  try { saveNpcState(player, npc); } catch (e) {}

  // verify
  let now = value;
  try {
    const p = npc.getProperty("quan:outfit");
    if (p !== undefined && p !== null) now = Number(p);
  } catch (e) {}

  const outfit = OUTFITS.find((entry) => entry.value === value);
  if (ok || now === value) {
    msg(player, `§aСкин: §f${outfit ? outfit.name : value} §7(id ${now})`);
    return true;
  }
  msg(player, `§cНе удалось сменить скин (prop=${now}). Перезаспавнь NPC.`);
  return false;
}

function talkToNpc(player, npc = undefined, topic = "normal") {
  const loadedNpc = npc && npc.isValid ? npc : findOwnedNpc(player, 64);
  msg(player, getTalkLineByTopic(player, loadedNpc, topic));

  const now = tickNow();
  const key = `${player.id}:${topic}`;
  const lastTopic = lastTalkTopicTick.get(key) ?? -999999;
  if (now - lastTopic >= TALK_TOPIC_COOLDOWN_TICKS) {
    lastTalkTopicTick.set(key, now);
    if (topic === "heart") addAffection(player, 2, true);
    else if (topic === "care" || topic === "praise") addAffection(player, 1, true);
  }

  const lastTick = lastTalkTick.get(player.id) ?? -999999;
  const elapsed = now - lastTick;
  if (elapsed >= TALK_COOLDOWN_TICKS) {
    lastTalkTick.set(player.id, now);
    if (topic === "normal") addAffection(player, 1, true);
  }
}


// v1.0.52 TEST CHAT: local Provence Furry knowledge for ore/structure questions.
// This is intentionally offline and self-contained: no external API, no network, no AI bridge.
// Later this can be expanded into a larger knowledge base or replaced by an external AI bridge.
const WAIFU_KNOWLEDGE = {
  ores: {
    diamond: "Алмазы: ищи глубоко под землёй. Самый удобный уровень для добычи — примерно Y=-59. Лучше идти по длинным тоннелям и проверять большие пещеры.",
    redstone: "Редстоун: лучше всего искать глубоко, примерно около Y=-59. В глубоких пещерах его обычно тоже много.",
    gold: "Золото: в обычном мире хорошо встречается на глубине примерно Y=-16. В Бэдлендс золота заметно больше и оно встречается выше.",
    iron: "Железо: хороший обычный вариант — около Y=16. В высоких горах железо может встречаться значительно выше, поэтому горные биомы тоже подходят.",
    copper: "Медь: чаще всего удобно искать примерно около Y=48. Большие залежи меди также встречаются в больших пещерах.",
    coal: "Уголь: чаще встречается выше глубокой подземной зоны, примерно около Y=96 и выше. В горах его особенно много.",
    lapis: "Лазурит: хороший уровень для поиска — примерно около Y=0. Его также можно найти в глубоких пещерах.",
    emerald: "Изумруды: ищи в горных биомах. Чем выше и гористее местность, тем лучше шанс найти руду.",
    quartz: "Кварц: это руда Незера. Ищи её в Незере почти на любой удобной высоте.",
    ancient_debris: "Древние обломки: ищи в Незере глубоко, чаще всего около Y=15. Для добычи удобно использовать длинные тоннели или взрывы.",
    nether_gold: "Золото Незера: встречается в Незере на разных высотах, особенно удобно добывать его в открытых участках пещер.",
    netherite: "Незерит напрямую не добывается: сначала нужны древние обломки. Переплавь их в незеритовый скрап и собери незеритовый слиток."
  },
  structures: {
    village: "Деревня: ищи в подходящих равнинных, пустынных, саванных, таёжных и снежных биомах.",
    mineshaft: "Заброшенная шахта: может генерироваться глубоко под землёй. Часто её видно по деревянным балкам и рельсам.",
    stronghold: "Крепость: подземная структура с порталом в Край. Для поиска можно использовать Око Края.",
    ancient_city: "Древний город: находится глубоко под землёй в биоме Deep Dark, обычно в районе очень низких Y.",
    trial_chambers: "Испытательная палата: подземная структура с испытаниями, ловушками и наградами. Ищи её под землёй.",
    desert_pyramid: "Пустынный храм: ищи в пустынях.",
    jungle_temple: "Храм в джунглях: ищи в джунглях.",
    swamp_hut: "Хижина ведьмы: ищи в болотах.",
    pillager_outpost: "Разбойничья застава: встречается рядом с некоторыми наземными биомами, особенно на открытой местности.",
    woodland_mansion: "Лесной особняк: редкая структура в тёмном лесу. Удобнее искать через карту картографа.",
    ocean_monument: "Океанский монумент: большой подводный храм в глубоких океанах.",
    shipwreck: "Кораблекрушение: ищи под водой у побережья и в океанах.",
    ocean_ruin: "Океанские руины: небольшие разрушенные строения под водой.",
    bastion: "Бастион: большая структура в Незере. Ищи в различных биомах Незера, кроме дельты базальта.",
    fortress: "Крепость Незера: ищи в Незере. Она нужна, например, для получения стержней ифрита.",
    end_city: "Город Края: появляется на внешних островах Края после победы над драконом. Там можно найти элитры.",
    nether_portal: "Разрушенный портал: встречается в обычном мире и в Незере. Его можно восстановить и использовать как портал.",
    ruined_portal: "Разрушенный портал: встречается в обычном мире и Незере; вокруг него часто лежат обсидиан и золото."
  }
};

function normalizeKnowledgeQuestion(value) {
  return String(value ?? "")
    .toLowerCase()
    .replace(/ё/g, "е")
    .replace(/[«»"']/g, " ")
    .replace(/[!?.,;:()[\]{}]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function getWaifuKnowledgeAnswer(question, player, npc) {
  const q = normalizeKnowledgeQuestion(question);
  if (!q) return "§dЯ: §fНапиши вопрос, например: §eгде найти алмазы§f или §eгде деревня§f.";

  const name = getNpcDisplayNameFrom(player, npc);
  const prefix = `§d${name}: §f`;

  // Help / topic discovery.
  if (
    q.includes("что ты знаешь") ||
    q.includes("что умеешь") ||
    q === "помощь" ||
    q === "помоги" ||
    q.includes("какие вопросы")
  ) {
    return prefix +
      "Я пока учусь отвечать. Спроси меня про §eруды§f или §eпостройки§f. " +
      "Например: «где алмазы?», «где искать железо?», «где деревня?» или «где крепость Незера?».";
  }

  const oreAliases = [
    [["алмаз", "алмазы", "diamond"], "diamond"],
    [["редстоун", "красный камень", "redstone"], "redstone"],
    [["золото", "золотая руда", "gold"], "gold"],
    [["железо", "железная руда", "iron"], "iron"],
    [["медь", "медная руда", "copper"], "copper"],
    [["уголь", "угольная руда", "coal"], "coal"],
    [["лазурит", "лапис", "lapis"], "lapis"],
    [["изумруд", "изумруды", "emerald"], "emerald"],
    [["кварц", "кварц незера", "quartz"], "quartz"],
    [["древние обломки", "древний обломок", "ancient debris"], "ancient_debris"],
    [["незерит", "незеритовая руда", "netherite"], "netherite"],
    [["золото незера", "золото в незере", "nether gold"], "nether_gold"]
  ];

  for (const [aliases, key] of oreAliases) {
    if (aliases.some((a) => q.includes(a))) return prefix + WAIFU_KNOWLEDGE.ores[key];
  }

  const structureAliases = [
    [["деревн", "village"], "village"],
    [["шахт", "заброшенная шахта", "mineshaft"], "mineshaft"],
    [["крепост", "стронгхолд", "stronghold"], "stronghold"],
    [["древний город", "deep dark", "диип дарк", "ancient city"], "ancient_city"],
    [["испытательн", "триал", "trial chamber", "trial chambers"], "trial_chambers"],
    [["пустынн", "пустынный храм", "desert temple"], "desert_pyramid"],
    [["джунглев", "храм в джунглях", "jungle temple"], "jungle_temple"],
    [["ведьм", "хижка ведьмы", "swamp hut"], "swamp_hut"],
    [["разбойнич", "застав", "pillager outpost"], "pillager_outpost"],
    [["особняк", "лесной особняк", "woodland mansion"], "woodland_mansion"],
    [["монумент", "океанский монумент", "ocean monument"], "ocean_monument"],
    [["кораблекруш", "корабль", "shipwreck"], "shipwreck"],
    [["океанск", "руины", "ocean ruin"], "ocean_ruin"],
    [["бастион", "bastion"], "bastion"],
    [["крепость незера", "незерная крепость", "nether fortress"], "fortress"],
    [["город края", "эндер город", "end city"], "end_city"],
    [["разрушенный портал", "руины портала", "ruined portal"], "ruined_portal"],
    [["портал", "nether portal"], "nether_portal"]
  ];

  for (const [aliases, key] of structureAliases) {
    if (aliases.some((a) => q.includes(a))) return prefix + WAIFU_KNOWLEDGE.structures[key];
  }

  if (
    q.includes("руда") ||
    q.includes("добы") ||
    q.includes("копать") ||
    q.includes("шахт")
  ) {
    return prefix +
      "Могу подсказать по руде. Назови её: §eалмазы, железо, медь, уголь, золото, редстоун, лазурит или изумруды§f. " +
      "Также знаю несколько подземных и наземных построек.";
  }

  if (
    q.includes("где найти") ||
    q.includes("где находится") ||
    q.includes("где искать") ||
    q.includes("где есть")
  ) {
    return prefix +
      "Уточни, что ищешь. Например: §eгде найти алмазы§f, §eгде железо§f, §eгде деревня§f или §eгде крепость Незера§f.";
  }

  return prefix +
    "Я пока не знаю ответа на этот вопрос. Попробуй спросить про §eруды§f или §eпостройки§f — это моя тестовая база знаний.";
}

function openKnowledgeChatMenu(player, npc) {
  const displayName = getNpcDisplayNameFrom(player, npc);
  const form = new ModalFormData().title(`§d${displayName} | Вопрос`);

  try {
    form.textField(
      "§fЧто хочешь спросить?",
      "Например: где найти алмазы?",
      { defaultValue: "" }
    );
  } catch (e) {
    try {
      form.textField("§fЧто хочешь спросить?", "Например: где найти алмазы?", "");
    } catch (err) {}
  }

  form.show(player).then((res) => {
    if (res.canceled) return openMenuLater(() => openTalkMenuV52(player, npc));

    const question = Array.isArray(res.formValues) ? String(res.formValues[0] ?? "") : "";
    const answer = getWaifuKnowledgeAnswer(question, player, npc);

    msg(player, `§8[Waifu Chat] §r${answer}`);
    playLoverVoice(npc, player, "talk", 1.0, 1.0);

    // Keep the test chat deliberately cheap: one question -> one answer.
    const key = `${player.id}:knowledge`;
    const now = tickNow();
    const last = lastTalkTopicTick.get(key) ?? -999999;
    if (now - last >= TALK_TOPIC_COOLDOWN_TICKS) {
      lastTalkTopicTick.set(key, now);
      addAffection(player, 1, true);
    }

    system.runTimeout(() => openTalkMenuV52(player, npc), 2);
  }).catch(() => {
    msg(player, "§cНе удалось открыть окно вопроса.");
    openMenuLater(() => openTalkMenuV52(player, npc));
  });
}

function getStorageCapacity(affection = 0) {
  if (affection >= UNLOCK_STORAGE_3) return 20;
  if (affection >= UNLOCK_STORAGE_2) return 15;
  if (affection >= UNLOCK_STORAGE_1) return 10;
  return 0;
}

function shortItemName(typeId) {
  return String(typeId ?? "")
    .replace("minecraft:", "")
    .replace("quan:", "")
    .replace(/_/g, " ");
}

function stackText(stack) {
  if (!stack || !stack.id) return TEXT.buttons.empty;
  return `§f${shortItemName(stack.id)} §ax${stack.amount ?? 1}`;
}

function cloneStoredItem(item) {
  if (!item || !item.id) return undefined;
  return { id: String(item.id), amount: Math.max(1, Math.floor(Number(item.amount) || 1)) };
}

function normalizeStorageSlots(value) {
  let slots = [];
  if (Array.isArray(value)) slots = value;

  const out = [];
  for (let i = 0; i < STORAGE_MAX_SLOTS; i++) {
    const item = slots[i];
    if (item && item.id && Number(item.amount) > 0) out.push(cloneStoredItem(item));
    else out.push(undefined);
  }
  return out;
}

function getNpcStorage(player) {
  try {
    const raw = player.getDynamicProperty(NPC_STORAGE_PROPERTY);
    if (typeof raw === "string" && raw.length > 0) {
      return normalizeStorageSlots(JSON.parse(raw));
    }
  } catch (e) {}
  return normalizeStorageSlots([]);
}

function saveNpcStorage(player, slots) {
  try {
    player.setDynamicProperty(NPC_STORAGE_PROPERTY, JSON.stringify(normalizeStorageSlots(slots)));
    return true;
  } catch (e) {
    msg(player, "§cCould not save NPC storage. Item data may be too long.");
    return false;
  }
}

function defaultNpcEquipment() {
  return {
    head: undefined,
    chest: undefined,
    legs: undefined,
    feet: undefined,
    mainhand: undefined,
    offhand: undefined
  };
}

function normalizeEquipment(value) {
  const base = defaultNpcEquipment();
  if (value && typeof value === "object") {
    for (const key of Object.keys(base)) {
      base[key] = cloneStoredItem(value[key]);
      if (base[key]) base[key].amount = 1;
    }
  }
  return base;
}

function getNpcEquipment(player) {
  try {
    const raw = player.getDynamicProperty(NPC_EQUIPMENT_PROPERTY);
    if (typeof raw === "string" && raw.length > 0) {
      return normalizeEquipment(JSON.parse(raw));
    }
  } catch (e) {}
  return defaultNpcEquipment();
}

function saveNpcEquipment(player, equipment) {
  try {
    player.setDynamicProperty(NPC_EQUIPMENT_PROPERTY, JSON.stringify(normalizeEquipment(equipment)));
    return true;
  } catch (e) {
    msg(player, "§cCould not save NPC equipment.");
    return false;
  }
}

function getSelectedSlotIndex(player) {
  try {
    const idx = player.selectedSlotIndex;
    if (typeof idx === "number" && idx >= 0) return idx;
  } catch (e) {}
  return 0;
}

function getHeldItem(player) {
  const container = getInventoryContainer(player);
  if (!container) return undefined;
  try {
    return container.getItem(getSelectedSlotIndex(player));
  } catch (e) {
    return undefined;
  }
}

function removeFromSelectedSlot(player, amount = 1) {
  const container = getInventoryContainer(player);
  if (!container) return false;

  const slot = getSelectedSlotIndex(player);
  try {
    const item = container.getItem(slot);
    if (!item || (item.amount ?? 1) < amount) return false;

    const left = (item.amount ?? 1) - amount;
    if (left <= 0) container.setItem(slot, undefined);
    else {
      item.amount = left;
      container.setItem(slot, item);
    }
    return true;
  } catch (e) {
    return false;
  }
}

function isSoulRingItem(typeId) {
  return typeId === RING_ID || typeId === BONDED_RING_ID || typeId === BROKEN_RING_ID;
}

function isArmorItem(typeId) {
  const id = String(typeId ?? "");
  return id.includes("helmet") || id.includes("chestplate") || id.includes("leggings") || id.includes("boots") || id.includes("elytra") || id.includes("carved_pumpkin") || id.includes("skull");
}

function isWeaponItem(typeId) {
  const id = String(typeId ?? "");
  return id.includes("sword") || id.includes("axe") || id.includes("trident") || id.includes("mace") || id.includes("bow") || id.includes("crossbow");
}

function isToolItem(typeId) {
  const id = String(typeId ?? "");
  return id.includes("pickaxe") || id.includes("shovel") || id.includes("hoe") || id.includes("shears") || id.includes("fishing_rod") || id.includes("flint_and_steel") || id.includes("brush");
}

function getMaxStackForItemId(typeId) {
  const id = String(typeId ?? "");
  if (isArmorItem(id) || isWeaponItem(id) || isToolItem(id)) return 1;
  if (id.includes("shield") || id.includes("totem") || id.includes("saddle")) return 1;
  if (id.includes("potion") || id.includes("bucket") || id.includes("minecart") || id.includes("boat")) return 1;
  if (id.includes("ender_pearl") || id.includes("snowball") || id.includes("egg")) return 16;
  return 64;
}

function findEquipSlotForItem(typeId) {
  const id = String(typeId ?? "");
  if (id.includes("helmet") || id.includes("carved_pumpkin") || id.includes("skull")) return "head";
  if (id.includes("chestplate") || id.includes("elytra")) return "chest";
  if (id.includes("leggings")) return "legs";
  if (id.includes("boots")) return "feet";
  if (id.includes("shield") || id.includes("totem") || id.endsWith(":torch") || id.endsWith(":soul_torch") || id.endsWith(":lantern") || id.endsWith(":soul_lantern")) return "offhand";
  if (isWeaponItem(id) || isToolItem(id)) return "mainhand";
  return undefined;
}

function isEquippableNpcItem(typeId) {
  if (!typeId || isSoulRingItem(typeId)) return false;
  return !!findEquipSlotForItem(typeId);
}

function markQuickEquipMenuBlock(player, ticks = QUICK_EQUIP_MENU_BLOCK_TICKS) {
  try {
    if (player?.id) quickEquipMenuBlockUntil.set(player.id, tickNow() + Math.max(2, ticks));
  } catch (e) {}
}

function isQuickEquipMenuBlocked(player) {
  try {
    const until = quickEquipMenuBlockUntil.get(player.id) ?? -999999;
    if (tickNow() <= until) return true;
    quickEquipMenuBlockUntil.delete(player.id);
  } catch (e) {}
  return false;
}

function canUseEquipSlot(player, slot) {
  const affection = getAffection(player);
  if (slot === "mainhand" || slot === "offhand") return affection >= UNLOCK_EQUIP_WEAPON;
  if (slot === "head" || slot === "chest" || slot === "legs" || slot === "feet") return affection >= UNLOCK_EQUIP_ARMOR;
  return false;
}

function getEquipUnlockText(slot) {
  if (slot === "mainhand" || slot === "offhand") return `${UNLOCK_EQUIP_WEAPON} Bond`;
  return `${UNLOCK_EQUIP_ARMOR} Bond`;
}

function addToNpcStorageArray(slots, itemId, amount, capacity) {
  let remaining = Math.max(1, Math.floor(Number(amount) || 1));
  const next = normalizeStorageSlots(slots);
  const maxStack = getMaxStackForItemId(itemId);

  for (let i = 0; i < capacity && remaining > 0; i++) {
    const slot = next[i];
    if (!slot || slot.id !== itemId) continue;
    const room = Math.max(0, maxStack - (slot.amount ?? 1));
    if (room <= 0) continue;
    const add = Math.min(room, remaining);
    slot.amount += add;
    remaining -= add;
  }

  for (let i = 0; i < capacity && remaining > 0; i++) {
    if (next[i]) continue;
    const add = Math.min(maxStack, remaining);
    next[i] = { id: itemId, amount: add };
    remaining -= add;
  }

  return { slots: next, remaining };
}

function tryStoreItem(player, itemId, amount, showFullMessage = true) {
  const capacity = getStorageCapacity(getAffection(player));
  if (capacity <= 0) {
    msg(player, `§cRequires Bond ${UNLOCK_STORAGE_1}/${AFFECTION_MAX} to open NPC storage.`);
    return false;
  }

  const current = getNpcStorage(player);
  const result = addToNpcStorageArray(current, itemId, amount, capacity);
  if (result.remaining > 0) {
    if (showFullMessage) msg(player, "§cNPC storage does not have enough space for this item.");
    return false;
  }

  saveNpcStorage(player, result.slots);
  return true;
}

function depositHeldItem(player, npc, amountMode = "all") {
  const item = getHeldItem(player);
  if (!item || !item.typeId) {
    msg(player, "§cYou are not holding any item.");
    return false;
  }

  if (isSoulRingItem(item.typeId)) {
    msg(player, "§cCannot store the Soul Bond ring in NPC storage to avoid losing the bond.");
    return false;
  }

  const heldAmount = item.amount ?? 1;
  const amount = amountMode === "one" ? 1 : heldAmount;
  const capacity = getStorageCapacity(getAffection(player));
  if (capacity <= 0) {
    msg(player, `§cRequires Bond ${UNLOCK_STORAGE_1}/${AFFECTION_MAX} to open NPC storage.`);
    return false;
  }

  const current = getNpcStorage(player);
  const result = addToNpcStorageArray(current, item.typeId, amount, capacity);
  if (result.remaining > 0) {
    msg(player, "§cNPC storage does not have enough space for this item.");
    return false;
  }

  if (!removeFromSelectedSlot(player, amount)) {
    msg(player, "§cCould not remove the held item, so it was not stored.");
    return false;
  }

  saveNpcStorage(player, result.slots);
  msg(player, `§aStored ${shortItemName(item.typeId)} x${amount} in NPC storage.`);
  return true;
}

function takeFromNpcStorage(player, slotIndex, amount) {
  const slots = getNpcStorage(player);
  const item = slots[slotIndex];
  if (!item) {
    msg(player, "§cThis slot is empty.");
    return false;
  }

  const take = Math.min(Math.max(1, Math.floor(Number(amount) || 1)), item.amount ?? 1);
  if (!giveItem(player, item.id, take)) {
    msg(player, "§cCould not return the item to the player inventory.");
    return false;
  }

  item.amount -= take;
  if (item.amount <= 0) slots[slotIndex] = undefined;
  saveNpcStorage(player, slots);
  msg(player, `§aTook ${shortItemName(item.id)} x${take}.`);
  return true;
}

function equipmentSlotLabel(slot) {
  const labels = {
    head: "Helmet",
    chest: "Chestplate",
    legs: "Leggings",
    feet: "Boots",
    mainhand: "Weapon",
    offhand: "Offhand"
  };
  return labels[slot] ?? slot;
}

function getEquipmentSlotEnum(slot) {
  const candidateNames = {
    head: ["Head", "head"],
    chest: ["Chest", "chest"],
    legs: ["Legs", "legs"],
    feet: ["Feet", "feet"],
    mainhand: ["Mainhand", "MainHand", "mainhand", "mainHand"],
    offhand: ["Offhand", "OffHand", "offhand", "offHand"]
  }[slot] ?? [];

  try {
    for (const name of candidateNames) {
      if (EquipmentSlot && EquipmentSlot[name] !== undefined) return EquipmentSlot[name];
    }
  } catch (e) {}

  // Runtime enum lĂ  string á»Ÿ Bedrock Script API, nĂªn fallback nĂ y váº«n há»¯u Ă­ch náº¿u tĂªn enum Ä‘á»•i nháº¹.
  return candidateNames[0];
}

function getCommandEquipmentSlot(slot) {
  if (slot === "head") return "slot.armor.head";
  if (slot === "chest") return "slot.armor.chest";
  if (slot === "legs") return "slot.armor.legs";
  if (slot === "feet") return "slot.armor.feet";
  if (slot === "mainhand") return "slot.weapon.mainhand";
  if (slot === "offhand") return "slot.weapon.offhand";
  return undefined;
}

function getEquippableComponent(npc) {
  if (!npc) return undefined;
  for (const id of ["minecraft:equippable", "equippable"]) {
    try {
      const component = npc.getComponent(id);
      if (component) return component;
    } catch (e) {}
  }
  return undefined;
}

function itemIdFromStack(stack) {
  try { return stack?.typeId ?? stack?.id ?? undefined; } catch (e) {}
  return undefined;
}

function readEntityEquipmentSlot(npc, slot) {
  const result = {
    component: false,
    slotEnum: String(getEquipmentSlotEnum(slot)),
    containerItemId: undefined,
    equipmentItemId: undefined,
    error: ""
  };

  try {
    const eq = getEquippableComponent(npc);
    if (!eq) return result;
    result.component = true;
    const slotEnum = getEquipmentSlotEnum(slot);

    try {
      const equipSlot = eq.getEquipmentSlot(slotEnum);
      if (equipSlot) result.containerItemId = itemIdFromStack(equipSlot.getItem?.());
    } catch (e) {
      result.error += `getEquipmentSlot:${String(e?.message ?? e)} `;
    }

    try {
      result.equipmentItemId = itemIdFromStack(eq.getEquipment?.(slotEnum));
    } catch (e) {
      result.error += `getEquipment:${String(e?.message ?? e)} `;
    }
  } catch (e) {
    result.error += String(e?.message ?? e);
  }

  return result;
}

function equipmentReadMatches(item, readInfo) {
  const wanted = item?.id;
  const got = readInfo?.containerItemId ?? readInfo?.equipmentItemId;
  if (!wanted) return !got;
  return got === wanted;
}

function runEquipmentCommand(npc, command) {
  const result = { attempted: true, ok: false, async: false, error: "" };
  try {
    if (typeof npc.runCommand === "function") {
      npc.runCommand(command);
      result.ok = true;
      return result;
    }
  } catch (e) {
    result.error = String(e?.message ?? e);
  }

  try {
    if (typeof npc.runCommandAsync === "function") {
      result.async = true;
      npc.runCommandAsync(command).catch(() => {});
      result.ok = true;
      return result;
    }
  } catch (e) {
    result.error = result.error ? `${result.error} | ${String(e?.message ?? e)}` : String(e?.message ?? e);
  }

  return result;
}

function buildEquipmentCommands(slot, item) {
  const cmdSlot = getCommandEquipmentSlot(slot);
  if (!cmdSlot) return [];
  if (item?.id) {
    return [
      `replaceitem entity @s ${cmdSlot} 0 ${item.id} 1`,
      `item replace entity @s ${cmdSlot} 0 with ${item.id} 1`
    ];
  }
  return [
    `replaceitem entity @s ${cmdSlot} 0 air 1`,
    `item replace entity @s ${cmdSlot} 0 with air 1`,
    `item replace entity @s ${cmdSlot} 0 with minecraft:air 1`
  ];
}

function setEntityEquipmentDetailed(npc, slot, item) {
  const report = {
    slot,
    label: equipmentSlotLabel(slot),
    wanted: item?.id,
    component: false,
    slotEnum: String(getEquipmentSlotEnum(slot)),
    actions: [],
    before: undefined,
    after: undefined,
    ok: false,
    note: ""
  };

  if (!npc || !slot) {
    report.note = "npc/slot missing";
    return report;
  }

  report.before = readEntityEquipmentSlot(npc, slot);
  report.component = !!report.before.component;

  let stack = undefined;
  if (item?.id) {
    try {
      stack = new ItemStack(item.id, 1);
      report.actions.push("ItemStack OK");
    } catch (e) {
      report.actions.push(`ItemStack error: ${String(e?.message ?? e)}`);
    }
  }

  const slotEnum = getEquipmentSlotEnum(slot);
  const eq = getEquippableComponent(npc);

  if (eq && slotEnum !== undefined) {
    try {
      const equipSlot = eq.getEquipmentSlot(slotEnum);
      if (equipSlot) {
        equipSlot.setItem(stack);
        report.actions.push("getEquipmentSlot.setItem OK");
      }
    } catch (e) {
      report.actions.push(`setItem error: ${String(e?.message ?? e)}`);
    }

    report.after = readEntityEquipmentSlot(npc, slot);
    if (equipmentReadMatches(item, report.after)) {
      report.ok = true;
      return report;
    }

    try {
      if (typeof eq.setEquipment === "function") {
        eq.setEquipment(slotEnum, stack);
        report.actions.push("setEquipment OK");
      }
    } catch (e) {
      report.actions.push(`setEquipment error: ${String(e?.message ?? e)}`);
    }

    report.after = readEntityEquipmentSlot(npc, slot);
    if (equipmentReadMatches(item, report.after)) {
      report.ok = true;
      return report;
    }
  } else {
    report.actions.push("Equippable component not found");
  }

  for (const command of buildEquipmentCommands(slot, item)) {
    const cmd = runEquipmentCommand(npc, command);
    report.actions.push(`${cmd.ok ? "CMD OK" : "CMD error"}${cmd.async ? " async" : ""}: ${command}${cmd.error ? " | " + cmd.error : ""}`);
    if (cmd.ok) break;
  }

  report.after = readEntityEquipmentSlot(npc, slot);
  report.ok = equipmentReadMatches(item, report.after);
  if (!report.ok && report.after?.component === false) {
    report.note = "Could not read real slot because entity does not return equippable component.";
  }
  return report;
}

function setEntityEquipment(npc, slot, item) {
  const visualItem = ["head", "chest", "legs", "feet"].includes(slot) ? undefined : item;
  const report = setEntityEquipmentDetailed(npc, slot, visualItem);
  if (["head", "chest", "legs", "feet"].includes(slot)) report.note = "v23: Hide armor visuals; protection stats are still kept.";
  try { lastEquipmentSyncReport.set(slot, report); } catch (e) {}
  return !!(report.ok || report.actions.some((a) => String(a).startsWith("CMD OK")));
}


function isFoxRiderOutfitV3032(npc) {
  try {
    return npc && npc.typeId === NPC_ID && Number(safeGetProperty(npc, "quan:outfit", 0)) === 1;
  } catch (e) {}
  return false;
}

function applyNpcEquipmentDetailed(npc, player) {
  if (!npc || !player) return [];
  const equipment = getNpcEquipment(player);
  const reports = [];
  const hideHeldItemForFoxRider = isFoxRiderOutfitV3032(npc);

  // v23: model má»›i quĂ¡ lá»›n so vá»›i armor vanilla. Giá»¯ dá»¯ liá»‡u/chá»‰ sá»‘ giĂ¡p,
  // nhÆ°ng khĂ´ng render visual mÅ©/Ă¡o/quáº§n/giĂ y lĂªn model.
  for (const slot of ["head", "chest", "legs", "feet"]) {
    const report = setEntityEquipmentDetailed(npc, slot, undefined);
    report.note = "v23: Hide armor visuals; protection stats are still kept.";
    reports.push(report);
    try { lastEquipmentSyncReport.set(slot, report); } catch (e) {}
  }

  for (const slot of ["mainhand", "offhand"]) {
    const visualItem = hideHeldItemForFoxRider ? undefined : equipment[slot];
    const report = setEntityEquipmentDetailed(npc, slot, visualItem);
    if (hideHeldItemForFoxRider) {
      report.note = "v3.0.3.2: Skin 10/fox riding hides mainhand/offhand visuals; equipment data and damage are still saved in dynamic properties.";
    }
    reports.push(report);
    try { lastEquipmentSyncReport.set(slot, report); } catch (e) {}
  }
  return reports;
}

function applyNpcEquipment(npc, player) {
  if (!npc || !player) return false;
  const reports = applyNpcEquipmentDetailed(npc, player);
  return reports.some((r) => r.ok || r.actions.some((a) => String(a).startsWith("CMD OK")));
}

function equipStoredItem(player, npc, slotIndex) {
  const slots = getNpcStorage(player);
  const item = slots[slotIndex];
  if (!item) {
    msg(player, "§cThis slot is empty.");
    return false;
  }

  const equipSlot = findEquipSlotForItem(item.id);
  if (!equipSlot) {
    msg(player, "§cThis item is not valid armor/weapon equipment for the NPC.");
    return false;
  }

  if (!canUseEquipSlot(player, equipSlot)) {
    msg(player, `§cRequires ${getEquipUnlockText(equipSlot)} to unlock slot ${equipmentSlotLabel(equipSlot)}.`);
    return false;
  }

  const equipment = getNpcEquipment(player);
  const old = equipment[equipSlot];
  if (old) giveItem(player, old.id, old.amount ?? 1);

  equipment[equipSlot] = { id: item.id, amount: 1 };
  item.amount -= 1;
  if (item.amount <= 0) slots[slotIndex] = undefined;

  saveNpcStorage(player, slots);
  saveNpcEquipment(player, equipment);
  if (npc) applyNpcEquipment(npc, player);

  msg(player, `§aEquipped ${shortItemName(equipment[equipSlot].id)} to slot ${equipmentSlotLabel(equipSlot)}.`);
  return true;
}

function equipHeldItem(player, npc) {
  const item = getHeldItem(player);
  if (!item || !item.typeId) {
    msg(player, "§cYou are not holding any item.");
    return false;
  }

  if (isSoulRingItem(item.typeId)) {
    msg(player, "§cCannot equip the Soul Bond ring.");
    return false;
  }

  const equipSlot = findEquipSlotForItem(item.typeId);
  if (!equipSlot) {
    msg(player, "§cHeld item is not valid armor/weapon equipment.");
    return false;
  }

  if (!canUseEquipSlot(player, equipSlot)) {
    msg(player, `§cRequires ${getEquipUnlockText(equipSlot)} to unlock slot ${equipmentSlotLabel(equipSlot)}.`);
    return false;
  }

  const equipment = getNpcEquipment(player);
  const old = equipment[equipSlot];

  if (!removeFromSelectedSlot(player, 1)) {
    msg(player, "§cCould not remove the held item, so it was not equipped.");
    return false;
  }

  if (old) giveItem(player, old.id, old.amount ?? 1);
  equipment[equipSlot] = { id: item.typeId, amount: 1 };
  saveNpcEquipment(player, equipment);
  if (npc) applyNpcEquipment(npc, player);

  msg(player, `§aEquipped ${shortItemName(item.typeId)} for NPC.`);
  return true;
}

function unequipNpcSlot(player, npc, slot) {
  const equipment = getNpcEquipment(player);
  const item = equipment[slot];
  if (!item) {
    msg(player, `§cSlot ${equipmentSlotLabel(slot)} is empty.`);
    return false;
  }

  giveItem(player, item.id, item.amount ?? 1);
  equipment[slot] = undefined;
  saveNpcEquipment(player, equipment);

  // v22V: xĂ³a visual báº±ng cáº£ API vĂ  replaceitem fallback Ä‘á»ƒ trĂ¡nh giĂ¡p/vÅ© khĂ­ bá»‹ káº¹t hĂ¬nh.
  if (npc) setEntityEquipment(npc, slot, undefined);

  msg(player, `§aRemoved ${equipmentSlotLabel(slot)}.`);
  return true;
}

function materialTierFromId(typeId) {
  const id = String(typeId ?? "");
  if (!id) return "";
  if (id.includes("netherite")) return "netherite";
  if (id.includes("diamond")) return "diamond";
  if (id.includes("iron") || id.includes("chainmail")) return "iron";
  if (id.includes("stone")) return "stone";
  if (id.includes("gold") || id.includes("golden")) return "gold";
  if (id.includes("wood") || id.includes("wooden")) return "wood";
  if (id.includes("leather") || id.includes("turtle")) return "leather";
  return "custom";
}

function getBondDamageBonusFromTier(tier) {
  if (tier >= 3) return 2;
  if (tier >= 2) return 1;
  return 0;
}

function getUnarmedNpcDamage(tier) {
  if (tier >= 3) return 5;
  if (tier >= 2) return 4;
  if (tier >= 1) return 3;
  return 0;
}

function getWeaponBaseDamageFromId(typeId) {
  const id = String(typeId ?? "");
  if (!id) return 0;

  if (id.includes("crossbow") || id.includes("bow")) return 0;

  if (id.includes("axe")) {
    if (id.includes("netherite")) return 10;
    if (id.includes("diamond")) return 9;
    if (id.includes("iron")) return 8;
    if (id.includes("stone")) return 7;
    if (id.includes("gold") || id.includes("golden") || id.includes("wood") || id.includes("wooden")) return 6;
    return 8; // v22X: vÅ© khĂ­ mod cĂ³ chá»¯ axe dĂ¹ng má»©c trung bĂ¬nh, cĂ³ thá»ƒ chá»‰nh riĂªng á»Ÿ báº£n tÆ°Æ¡ng thĂ­ch mod.
  }

  if (id.includes("sword")) {
    if (id.includes("netherite")) return 8;
    if (id.includes("diamond")) return 7;
    if (id.includes("iron")) return 6;
    if (id.includes("stone")) return 5;
    if (id.includes("gold") || id.includes("golden") || id.includes("wood") || id.includes("wooden")) return 4;
    return 6; // v22X: kiáº¿m mod chÆ°a khai bĂ¡o riĂªng.
  }

  if (id.includes("mace") || id.includes("trident")) return 8;
  return 0;
}

function getRangedWeaponBaseDamageFromId(typeId) {
  const id = String(typeId ?? "");
  if (!id) return 0;
  if (id.includes("crossbow")) return 6;
  if (id.includes("bow")) return 5;
  return 0;
}

function getWeaponKindFromId(typeId) {
  const id = String(typeId ?? "");
  if (!id) return "none";
  if (id.includes("crossbow")) return "crossbow";
  if (id.includes("bow")) return "bow";
  if (id.includes("axe")) return "axe";
  if (id.includes("sword")) return "sword";
  if (id.includes("mace")) return "mace";
  if (id.includes("trident")) return "trident";
  return "other";
}

function getMainhandItemId(player, npc) {
  try {
    const equipment = getNpcEquipment(player);
    if (equipment.mainhand?.id) return equipment.mainhand.id;
  } catch (e) {}

  // v22X: náº¿u dá»¯ liá»‡u lÆ°u chÆ°a ká»‹p Ä‘á»“ng bá»™, Ä‘á»c trá»±c tiáº¿p slot tháº­t Ä‘Ă£ render trĂªn NPC.
  if (npc) {
    try {
      const read = readEntityEquipmentSlot(npc, "mainhand");
      const realId = read?.containerItemId ?? read?.equipmentItemId;
      if (realId) return realId;
    } catch (e) {}
  }
  return "";
}

function getNpcWeaponBonus(player) {
  // Giá»¯ hĂ m cÅ© cho cĂ¡c menu chÆ°a dá»n háº¿t: tráº£ vá» damage cáº­n chiáº¿n thá»±c táº¿ tá»« vÅ© khĂ­, khĂ´ng cĂ²n lĂ  bonus giáº£.
  const stats = getEquipmentCombatStats(player, getAffection(player));
  return stats.weaponMeleeBase;
}

function getNpcWeaponCooldownDelta(player) {
  const id = String(getMainhandItemId(player) ?? "");
  if (id.includes("axe") || id.includes("mace")) return 6;
  if (id.includes("bow") || id.includes("crossbow")) return 0;
  return 0;
}

function armorSlotWeight(slot) {
  if (slot === "head") return 0.20;
  if (slot === "chest") return 0.40;
  if (slot === "legs") return 0.30;
  if (slot === "feet") return 0.10;
  return 0;
}

function getArmorFullSetReductionFromId(typeId) {
  const id = String(typeId ?? "");
  if (!id) return 0;
  if (id.includes("netherite_")) return 0.35;
  if (id.includes("diamond_")) return 0.30;
  if (id.includes("iron_") || id.includes("chainmail_")) return 0.20;
  if (id.includes("golden_") || id.includes("gold_")) return 0.12;
  if (id.includes("leather_") || id.includes("turtle_")) return 0.10;
  if (id.includes("elytra")) return 0.04;
  if (isArmorItem(id)) return 0.12; // giĂ¡p mod chÆ°a há»— trá»£ riĂªng: cho má»©c ná»n nháº¹, chÆ°a nháº­n hiá»‡u á»©ng bá»™.
  return 0;
}

function getArmorPieceReduction(typeId, slot) {
  return getArmorFullSetReductionFromId(typeId) * armorSlotWeight(slot);
}

function getNpcArmorReduction(player) {
  const equipment = getNpcEquipment(player);
  const total =
    getArmorPieceReduction(equipment.head?.id, "head") +
    getArmorPieceReduction(equipment.chest?.id, "chest") +
    getArmorPieceReduction(equipment.legs?.id, "legs") +
    getArmorPieceReduction(equipment.feet?.id, "feet");
  return Math.max(0, Math.min(0.45, total));
}

function getNpcArmorScore(player) {
  return Math.round(getNpcArmorReduction(player) * 100);
}

function formatPercent(value) {
  return `${Math.round((Number(value) || 0) * 100)}%`;
}

function getCustomArmorHint(player) {
  const equipment = getNpcEquipment(player);
  const ids = [equipment.head?.id, equipment.chest?.id, equipment.legs?.id, equipment.feet?.id].filter(Boolean).map(String);
  if (ids.length === 0) return "None";
  const custom = ids.filter((id) => isArmorItem(id) && !id.startsWith("minecraft:"));
  if (custom.length === 0) return "None";
  return "Has mod armor - base stats only, no custom set effect yet";
}

function getEquipmentCombatStats(player, affection = getAffection(player), npc = undefined) {
  const tier = getGuardTier(affection);
  const bondBonus = getBondDamageBonusFromTier(tier);
  const weaponId = getMainhandItemId(player, npc);
  const weaponKind = getWeaponKindFromId(weaponId);
  const weaponMeleeBase = getWeaponBaseDamageFromId(weaponId);
  const weaponRangedBase = getRangedWeaponBaseDamageFromId(weaponId);

  const unarmed = getUnarmedNpcDamage(tier);
  const meleeDamage = weaponMeleeBase > 0 ? weaponMeleeBase + bondBonus : unarmed;
  const rangedDamage = weaponRangedBase > 0 ? weaponRangedBase + bondBonus : 0;
  const armorReduction = getNpcArmorReduction(player);

  let meleeCooldown = getScriptAttackCooldown(tier);
  if (weaponKind === "axe" || weaponKind === "mace") meleeCooldown += 6;
  if (weaponKind === "sword" || weaponKind === "trident") meleeCooldown = Math.max(12, meleeCooldown - 2);

  let rangedCooldown = 0;
  if (weaponRangedBase > 0) {
    rangedCooldown = tier >= 3 ? 24 : tier >= 2 ? 30 : 36;
    if (weaponKind === "crossbow") rangedCooldown += 6;
  }

  return {
    tier,
    weaponId,
    weaponKind,
    weaponMeleeBase,
    weaponRangedBase,
    meleeDamage,
    rangedDamage,
    armorReduction,
    meleeCooldown,
    rangedCooldown,
    customArmorHint: getCustomArmorHint(player)
  };
}

function getEquipmentPowerText(player) {
  const equipment = getNpcEquipment(player);
  const stats = getEquipmentCombatStats(player, getAffection(player));
  const weapon = equipment.mainhand ? shortItemName(equipment.mainhand.id) : "none";
  const ranged = stats.rangedDamage > 0 ? `
§fRanged damage: §c${stats.rangedDamage}` : "";
  const custom = stats.customArmorHint !== "None" ? `
§7${stats.customArmorHint}` : "";
  return `Weapon: ${weapon}
§fMelee damage: §c${stats.meleeDamage}${ranged}
§fGuard: §b${formatPercent(stats.armorReduction)}${custom}`;
}

function applyEquipmentDefense(npc, player) {
  // v22X: khĂ´ng dĂ¹ng resistance/regeneration Ä‘á»ƒ trĂ¡nh lá»‡ch vá»›i chá»‰ sá»‘ hiá»ƒn thá»‹.
  // Giáº£m sĂ¡t thÆ°Æ¡ng Ä‘Æ°á»£c xá»­ lĂ½ trong entityHurt báº±ng Ä‘Ăºng getNpcArmorReduction().
  return getNpcArmorReduction(player);
}

function getInventoryItemAt(player, slotIndex) {
  const container = getInventoryContainer(player);
  if (!container) return undefined;
  try {
    if (slotIndex < 0 || slotIndex >= container.size) return undefined;
    return container.getItem(slotIndex);
  } catch (e) {
    return undefined;
  }
}

function removeFromInventorySlot(player, slotIndex, amount = 1) {
  const container = getInventoryContainer(player);
  if (!container) return false;

  try {
    if (slotIndex < 0 || slotIndex >= container.size) return false;
    const item = container.getItem(slotIndex);
    if (!item || (item.amount ?? 1) < amount) return false;

    const left = (item.amount ?? 1) - amount;
    if (left <= 0) container.setItem(slotIndex, undefined);
    else {
      item.amount = left;
      container.setItem(slotIndex, item);
    }
    return true;
  } catch (e) {
    return false;
  }
}

function getPlayerInventoryPageCount(player) {
  const container = getInventoryContainer(player);
  if (!container) return 1;
  try {
    return Math.max(1, Math.ceil(container.size / PLAYER_GRID_PAGE_SIZE));
  } catch (e) {
    return 4;
  }
}

function storageSlotButton(slots, index) {
  const item = slots[index];
  const label = String(index + 1).padStart(2, "0");
  if (!item) return `§7[${label}] §8Empty`;
  return `§7[${label}] §f${shortItemName(item.id)} §ax${item.amount ?? 1}`;
}

function playerSlotButton(player, index) {
  const item = getInventoryItemAt(player, index);
  const label = String(index + 1).padStart(2, "0");
  if (!item) return `§7[P${label}] §8Empty`;
  return `§7[P${label}] §f${shortItemName(item.typeId)} §ax${item.amount ?? 1}`;
}

function depositInventorySlotToNpcStorage(player, npc, slotIndex, amountMode = "all") {
  const item = getInventoryItemAt(player, slotIndex);
  if (!item || !item.typeId) {
    msg(player, "§cThis inventory slot is empty.");
    return false;
  }
  if (isSoulRingItem(item.typeId)) {
    msg(player, "§cCannot store the Soul Bond ring in NPC storage.");
    return false;
  }

  const stackAmount = item.amount ?? 1;
  let amount = stackAmount;
  if (amountMode === "one") amount = 1;
  if (amountMode === "half") amount = Math.max(1, Math.ceil(stackAmount / 2));

  const capacity = getStorageCapacity(getAffection(player));
  if (capacity <= 0) {
    msg(player, `§cRequires Bond ${UNLOCK_STORAGE_1}/${AFFECTION_MAX} to open NPC storage.`);
    return false;
  }

  const current = getNpcStorage(player);
  const result = addToNpcStorageArray(current, item.typeId, amount, capacity);
  if (result.remaining > 0) {
    msg(player, "§cNPC storage does not have enough space for this item.");
    return false;
  }

  if (!removeFromInventorySlot(player, slotIndex, amount)) {
    msg(player, "§cCould not remove the inventory item, so it was not stored.");
    return false;
  }

  saveNpcStorage(player, result.slots);
  msg(player, `§aMoved ${shortItemName(item.typeId)} x${amount} in NPC storage.`);
  return true;
}

function equipInventorySlotItem(player, npc, slotIndex) {
  const item = getInventoryItemAt(player, slotIndex);
  if (!item || !item.typeId) {
    msg(player, "§cThis inventory slot is empty.");
    return false;
  }
  if (isSoulRingItem(item.typeId)) {
    msg(player, "§cCannot equip the Soul Bond ring.");
    return false;
  }

  const equipSlot = findEquipSlotForItem(item.typeId);
  if (!equipSlot) {
    msg(player, "§cThis item is not valid armor/weapon equipment for the NPC.");
    return false;
  }

  if (!canUseEquipSlot(player, equipSlot)) {
    msg(player, `§cRequires ${getEquipUnlockText(equipSlot)} to unlock slot ${equipmentSlotLabel(equipSlot)}.`);
    return false;
  }

  if (!removeFromInventorySlot(player, slotIndex, 1)) {
    msg(player, "§cCould not remove the inventory item, so it was not equipped.");
    return false;
  }

  const equipment = getNpcEquipment(player);
  const old = equipment[equipSlot];
  if (old) giveItem(player, old.id, old.amount ?? 1);

  equipment[equipSlot] = { id: item.typeId, amount: 1 };
  saveNpcEquipment(player, equipment);
  if (npc) applyNpcEquipment(npc, player);
  msg(player, `§aEquipped ${shortItemName(item.typeId)} to slot ${equipmentSlotLabel(equipSlot)}.`);
  return true;
}

function moveNpcStorageSlot(player, fromIndex, toIndex) {
  const capacity = getStorageCapacity(getAffection(player));
  if (fromIndex < 0 || fromIndex >= capacity || toIndex < 0 || toIndex >= capacity) {
    msg(player, "§cInvalid storage slot.");
    return false;
  }

  const slots = getNpcStorage(player);
  const from = slots[fromIndex];
  if (!from) {
    msg(player, "§cSource slot is empty.");
    return false;
  }
  if (fromIndex === toIndex) return true;

  const to = slots[toIndex];
  if (!to) {
    slots[toIndex] = from;
    slots[fromIndex] = undefined;
  } else if (to.id === from.id) {
    const maxStack = getMaxStackForItemId(to.id);
    const room = Math.max(0, maxStack - (to.amount ?? 1));
    const moved = Math.min(room, from.amount ?? 1);
    if (moved <= 0) {
      // Náº¿u khĂ´ng gá»™p Ä‘Æ°á»£c thĂ¬ Ä‘á»•i chá»— Ä‘á»ƒ váº«n cĂ³ cáº£m giĂ¡c chá»n Ă´ -> chuyá»ƒn Ă´.
      slots[toIndex] = from;
      slots[fromIndex] = to;
    } else {
      to.amount += moved;
      from.amount -= moved;
      if (from.amount <= 0) slots[fromIndex] = undefined;
    }
  } else {
    slots[toIndex] = from;
    slots[fromIndex] = to;
  }

  saveNpcStorage(player, slots);
  msg(player, `§aMoved slot ${fromIndex + 1} → ${toIndex + 1}.`);
  return true;
}


function getStorageUsedCount(player) {
  const capacity = getStorageCapacity(getAffection(player));
  const slots = getNpcStorage(player);
  let used = 0;
  for (let i = 0; i < capacity; i++) {
    if (slots[i]) used++;
  }
  return used;
}

function compactNpcStorage(player) {
  const capacity = getStorageCapacity(getAffection(player));
  if (capacity <= 0) {
    msg(player, `§cRequires ${UNLOCK_STORAGE_1} Bond to use NPC storage.`);
    return false;
  }

  const slots = getNpcStorage(player);
  const counts = new Map();
  for (let i = 0; i < capacity; i++) {
    const item = slots[i];
    if (!item || !item.id) continue;
    counts.set(item.id, (counts.get(item.id) ?? 0) + Math.max(1, item.amount ?? 1));
  }

  const next = normalizeStorageSlots([]);
  let write = 0;
  for (const id of Array.from(counts.keys()).sort()) {
    let amount = counts.get(id) ?? 0;
    const maxStack = getMaxStackForItemId(id);
    while (amount > 0 && write < capacity) {
      const add = Math.min(maxStack, amount);
      next[write] = { id, amount: add };
      amount -= add;
      write++;
    }
  }

  saveNpcStorage(player, next);
  msg(player, "§aSorted and merged stacks in NPC storage.");
  return true;
}

function takeAllNpcStorage(player) {
  const capacity = getStorageCapacity(getAffection(player));
  if (capacity <= 0) {
    msg(player, `§cRequires ${UNLOCK_STORAGE_1} Bond to use NPC storage.`);
    return false;
  }

  const slots = getNpcStorage(player);
  let moved = 0;
  for (let i = 0; i < capacity; i++) {
    const item = slots[i];
    if (!item || !item.id) continue;
    const amount = Math.max(1, item.amount ?? 1);
    if (giveItem(player, item.id, amount)) {
      moved += amount;
      slots[i] = undefined;
    } else {
      msg(player, "§ePlayer inventory may be full. Some items are still in NPC storage.");
      break;
    }
  }
  saveNpcStorage(player, slots);
  msg(player, moved > 0 ? `§aTook ${moved} item from NPC storage.` : "§7NPC storage has no items to take.");
  return moved > 0;
}


function uiBar(value, max, length = 10, full = "█", empty = "░") {
  const safeMax = Math.max(1, Number(max) || 1);
  const safeValue = Math.max(0, Math.min(safeMax, Number(value) || 0));
  const filled = Math.max(0, Math.min(length, Math.round((safeValue / safeMax) * length)));
  return full.repeat(filled) + empty.repeat(length - filled);
}

function heartMeter(value, max, hearts = 10, fullColor = "§c", emptyColor = "§8") {
  const safeMax = Math.max(1, Number(max) || 1);
  const safeValue = Math.max(0, Math.min(safeMax, Number(value) || 0));
  const filled = Math.max(0, Math.min(hearts, Math.round((safeValue / safeMax) * hearts)));
  return `${fullColor}${"♥".repeat(filled)}${emptyColor}${"♡".repeat(hearts - filled)}§r`;
}

function hpHearts(value, max = 100) {
  return heartMeter(value, max, 10, "§c", "§8");
}

function bondHearts(value, max = AFFECTION_MAX) {
  return heartMeter(value, max, 10, "§d", "§8");
}

function compactModeText(npc) {
  const text = npc ? getModeText(npc) : "not loaded";
  return text.replace("", "");
}

function compactEquipText(item) {
  return item ? stackText(item).replace("minecraft:", "").replace("quan:", "") : "Empty";
}

function panelHeader(title = "WAIFU NPC") {
  return `§8╔════════════════════╗\n§8║ §d${title} §7v22V        §8║\n§8╚════════════════════╝`;
}

function getProfessionalStatusBody(player, npc) {
  const affection = getAffection(player);
  const stats = getGuardStats(affection);
  const capacity = getStorageCapacity(affection);
  const used = getStorageUsedCount(player);
  const equipment = getNpcEquipment(player);
  const locked = getLockedAssistTarget(player);
  const hpValues = npc ? getNpcHealthValues(npc) : { current: stats.maxHealth, max: stats.maxHealth };
  const hpTier = hpValues.max;
  const hpBar = hpHearts(hpValues.current, hpValues.max);
  const loveBar = bondHearts(affection, AFFECTION_MAX);
  const armorScore = getNpcArmorScore(player);
  const armorBar = uiBar(Math.min(armorScore, 40), 40, 12);
  return (
    `${panelHeader("NPC PANEL")}
` +
    `§8┌─────── AVATAR ───────┐  §8┌──── STATUS ────┐
` +
    `§8│ §d♥  Waifu NPC  ♥   §8│  §fMode: §e${compactModeText(npc)}
` +
    `§8│ §7[ model preview ] §8│  §fRank: §d${getRankText(affection)}
` +
    `§8└─────────────────────┘  §fTarget: ${locked ? "§eLock" : "§7None"}
` +
    `§cHP    §8[${hpBar}§8] §7${hpValues.current}/${hpValues.max}
` +
    `§dBond  §8[${loveBar}§8] §7${affection}/${AFFECTION_MAX}
` +
    `§bArmor §8[§b${armorBar}§8] §7protection ${armorScore}%
` +
    `§8┌──── EQUIPMENT ───────┐
` +
    `§fMain: §c${compactEquipText(equipment.mainhand)}
` +
    `§fHead: §7${compactEquipText(equipment.head)} §8| §fChest: §7${compactEquipText(equipment.chest)}
` +
    `§fLegs: §7${compactEquipText(equipment.legs)} §8| §fFeet: §7${compactEquipText(equipment.feet)}
` +
    `§8└──── STORAGE ${used}/${capacity} ────┘`
  );
}

function openStatusPanel(player, npc) {
  const form = new ActionFormData()
    .title(`§d${getNpcDisplayName(player)} §7| §fOverview`)
    .body(getProfessionalStatusBody(player, npc))
    .button(TEXT.buttons.backInfo, UI_ICON.close);

  form.show(player).then(() => {
    openMenuLater(() => openV22FInfoTab(player, npc));
  }).catch(() => {});
}

function openV19InventoryBoard(player, npc, npcPage = 0, playerPage = 0) {
  const affection = getAffection(player);
  const capacity = getStorageCapacity(affection);
  if (capacity <= 0) {
    msg(player, `§cRequires ${UNLOCK_STORAGE_1} Bond to open NPC storage.`);
    return;
  }

  const slots = getNpcStorage(player);
  const npcMaxPage = Math.max(0, Math.ceil(capacity / 9) - 1);
  const safeNpcPage = Math.max(0, Math.min(npcMaxPage, npcPage));
  const playerMaxPage = Math.max(0, getPlayerInventoryPageCount(player) - 1);
  const safePlayerPage = Math.max(0, Math.min(playerMaxPage, playerPage));
  const npcStart = safeNpcPage * 9;
  const playerStart = safePlayerPage * 9;
  const equipment = getNpcEquipment(player);

  const body =
    `§8╔════════ INVENTORY PANEL ════════╗\n` +
    `§8║ §dNPC BAG §7${safeNpcPage + 1}/${npcMaxPage + 1}     §bPLAYER §7${safePlayerPage + 1}/${playerMaxPage + 1} §8║\n` +
    `§8╚══════════════════════════════╝\n` +
    `§fMain §c${compactEquipText(equipment.mainhand)} §8| §fGuard §b${getNpcArmorScore(player)}% §8| §fSlots §a${getStorageUsedCount(player)}/${capacity}\n` +
    `§7NPC grid: [01]–[09]  |  Player grid: [P1]–[P9]\n` +
    `§7Choose a slot to take / store / equip / move.`;

  const form = new ActionFormData()
    .title(`§dLover Inventory §7| §fSafe Tabs v22V`)
    .body(body)
    .button(TEXT.buttons.equipmentShield, UI_ICON.equipment)
    .button(TEXT.buttons.npcLeft, UI_ICON.inventory)
    .button(TEXT.buttons.npcRight, UI_ICON.inventory);

  for (let i = 0; i < 9; i++) {
    const index = npcStart + i;
    if (index < capacity) form.button("§d" + storageSlotButton(slots, index));
    else form.button("§8[--] Locked");
  }

  form.button("§b◀ Bag", UI_ICON.inventory);
  form.button("§bBag ▶", UI_ICON.inventory);

  for (let i = 0; i < 9; i++) {
    form.button("§b" + playerSlotButton(player, playerStart + i));
  }

  form.button("§a⬇ Store held", UI_ICON.inventory);
  form.button("§e⇄ Merge / sort", UI_ICON.inventory);
  form.button("§b⬆ Take all", UI_ICON.inventory);
  form.button(TEXT.buttons.backGeneral, UI_ICON.close);

  form.show(player).then((res) => {
    if (res.canceled || res.selection === undefined) return;
    const sel = res.selection;

    if (sel === 0) return openMenuLater(() => openEquipmentMenu(player, npc));
    if (sel === 1) return openMenuLater(() => openV19InventoryBoard(player, npc, safeNpcPage - 1, safePlayerPage));
    if (sel === 2) return openMenuLater(() => openV19InventoryBoard(player, npc, safeNpcPage + 1, safePlayerPage));

    if (sel >= 3 && sel <= 11) {
      const slotIndex = npcStart + (sel - 3);
      if (slotIndex >= capacity) {
        msg(player, "§cThis slot is not unlocked.");
        return openMenuLater(() => openV22FInventoryTab(player, npc, safeNpcPage, safePlayerPage));
      }
      return openMenuLater(() => openV19NpcSlotMenu(player, npc, slotIndex, safeNpcPage, safePlayerPage));
    }

    if (sel === 12) return openMenuLater(() => openV19InventoryBoard(player, npc, safeNpcPage, safePlayerPage - 1));
    if (sel === 13) return openMenuLater(() => openV19InventoryBoard(player, npc, safeNpcPage, safePlayerPage + 1));

    if (sel >= 14 && sel <= 22) {
      const slotIndex = playerStart + (sel - 14);
      return openMenuLater(() => openV19PlayerSlotMenu(player, npc, slotIndex, safeNpcPage, safePlayerPage));
    }

    if (sel === 23) {
      depositHeldItem(player, npc, "all");
      return openMenuLater(() => openV22FInventoryTab(player, npc, safeNpcPage, safePlayerPage));
    }
    if (sel === 24) {
      compactNpcStorage(player);
      return openMenuLater(() => openV22FInventoryTab(player, npc, 0, safePlayerPage));
    }
    if (sel === 25) {
      takeAllNpcStorage(player);
      return openMenuLater(() => openV22FInventoryTab(player, npc, 0, safePlayerPage));
    }
    if (sel === 26) return openMenuLater(() => openLoverMenu(player, npc));
  }).catch(() => {});
}

function openV19NpcSlotMenu(player, npc, slotIndex, npcPage = 0, playerPage = 0) {
  const slots = getNpcStorage(player);
  const item = slots[slotIndex];
  const form = new ActionFormData()
    .title(`§aNPC Slot ${slotIndex + 1}`)
    .body(item ? `§fItem: §b${stackText(item)}\n§7Choose an action for this slot.` : "§7This slot is empty.")
    .button(item ? "§aTake 1" : TEXT.buttons.empty)
    .button(item ? "§aTake half" : TEXT.buttons.empty)
    .button(item ? TEXT.buttons.takeAll : TEXT.buttons.empty)
    .button(item ? TEXT.buttons.equipNpc : TEXT.buttons.empty)
    .button(item ? TEXT.buttons.moveSlot : TEXT.buttons.empty)
    .button(TEXT.buttons.backStorage);

  form.show(player).then((res) => {
    if (res.canceled || res.selection === undefined) return;
    if (!item && res.selection !== 5) return openMenuLater(() => openV22FInventoryTab(player, npc, npcPage, playerPage));

    if (res.selection === 0) takeFromNpcStorage(player, slotIndex, 1);
    if (res.selection === 1) takeFromNpcStorage(player, slotIndex, Math.max(1, Math.ceil((item.amount ?? 1) / 2)));
    if (res.selection === 2) takeFromNpcStorage(player, slotIndex, item.amount ?? 1);
    if (res.selection === 3) equipStoredItem(player, npc, slotIndex);
    if (res.selection === 4) return openMenuLater(() => openV19MoveTargetMenu(player, npc, slotIndex, npcPage, playerPage));
    return openMenuLater(() => openV22FInventoryTab(player, npc, npcPage, playerPage));
  }).catch(() => {});
}

function openV19MoveTargetMenu(player, npc, fromIndex, npcPage = 0, playerPage = 0) {
  const capacity = getStorageCapacity(getAffection(player));
  const slots = getNpcStorage(player);
  const maxPage = Math.max(0, Math.ceil(capacity / STORAGE_PAGE_SIZE) - 1);
  const safePage = Math.max(0, Math.min(maxPage, npcPage));
  const start = safePage * STORAGE_PAGE_SIZE;

  const form = new ActionFormData()
    .title(`§dMove slot ${fromIndex + 1}`)
    .body("§7Choose a target slot. If it has another item, the two items will swap.")
    .button(TEXT.buttons.prevPage)
    .button(TEXT.buttons.nextPage);

  for (let i = 0; i < STORAGE_PAGE_SIZE; i++) {
    const index = start + i;
    if (index < capacity) form.button(storageSlotButton(slots, index));
    else form.button("§8[--] Locked");
  }
  form.button(TEXT.buttons.backGeneral);

  form.show(player).then((res) => {
    if (res.canceled || res.selection === undefined) return;
    if (res.selection === 0) return openMenuLater(() => openV19MoveTargetMenu(player, npc, fromIndex, safePage - 1, playerPage));
    if (res.selection === 1) return openMenuLater(() => openV19MoveTargetMenu(player, npc, fromIndex, safePage + 1, playerPage));
    if (res.selection >= 2 && res.selection <= 10) {
      const targetIndex = start + (res.selection - 2);
      if (targetIndex < capacity) moveNpcStorageSlot(player, fromIndex, targetIndex);
      else msg(player, "§cThis slot is not unlocked.");
    }
    return openMenuLater(() => openV22FInventoryTab(player, npc, npcPage, playerPage));
  }).catch(() => {});
}

function openV19PlayerSlotMenu(player, npc, slotIndex, npcPage = 0, playerPage = 0) {
  const item = getInventoryItemAt(player, slotIndex);
  const form = new ActionFormData()
    .title(`§bPlayer Slot ${slotIndex + 1}`)
    .body(item ? `§fItem: §b${shortItemName(item.typeId)} x${item.amount ?? 1}\n§7Choose an action.` : "§7This slot is empty.")
    .button(item ? "§aStore 1 in NPC storage" : TEXT.buttons.empty)
    .button(item ? "§aStore half in NPC storage" : TEXT.buttons.empty)
    .button(item ? "§aStore all in NPC storage" : TEXT.buttons.empty)
    .button(item ? TEXT.buttons.equipNpc : TEXT.buttons.empty)
    .button(TEXT.buttons.backStorage);

  form.show(player).then((res) => {
    if (res.canceled || res.selection === undefined) return;
    if (!item && res.selection !== 4) return openMenuLater(() => openV22FInventoryTab(player, npc, npcPage, playerPage));

    if (res.selection === 0) depositInventorySlotToNpcStorage(player, npc, slotIndex, "one");
    if (res.selection === 1) depositInventorySlotToNpcStorage(player, npc, slotIndex, "half");
    if (res.selection === 2) depositInventorySlotToNpcStorage(player, npc, slotIndex, "all");
    if (res.selection === 3) equipInventorySlotItem(player, npc, slotIndex);
    return openMenuLater(() => openV22FInventoryTab(player, npc, npcPage, playerPage));
  }).catch(() => {});
}

function openInventoryHub(player, npc) {
  const affection = getAffection(player);
  const capacity = getStorageCapacity(affection);
  const equipment = getNpcEquipment(player);
  const held = getHeldItem(player);
  const used = getStorageUsedCount(player);

  const form = new ActionFormData()
    .title("§dStorage & Equipment")
    .body(
      `§8┌──── NPC PANEL ────┐\n` +
      `§fStorage: §a${used}/${capacity}/${STORAGE_MAX_SLOTS} slots\n` +
      `§fHolding: §b${held ? `${shortItemName(held.typeId)} x${held.amount ?? 1}` : "Empty"}\n` +
      `§fWeapon: §c${equipment.mainhand ? stackText(equipment.mainhand) : "Empty"}\n` +
      `§fGuard: §b${getNpcArmorScore(player)}%\n` +
      `§8└─────────────────┘`
    )
    .button(capacity > 0 ? "§dOpen storage panel" : `§8Storage locked: requires ${UNLOCK_STORAGE_1} Bond`, UI_ICON.inventory)
    .button(capacity > 0 ? "§bStore held item" : `§8Store locked: requires ${UNLOCK_STORAGE_1}`, UI_ICON.storage)
    .button("§6Equip held item", UI_ICON.equipment)
    .button("§eView / remove equipment", UI_ICON.equipment)
    .button(capacity > 0 ? "§eSort / merge storage" : `§8Sort locked: requires ${UNLOCK_STORAGE_1}`, UI_ICON.settings)
    .button(capacity > 0 ? "§bTake all from storage" : `§8Take locked: requires ${UNLOCK_STORAGE_1}`, UI_ICON.storage)
    .button(npc ? "§dSync equipment to NPC" : "§8NPC not loaded: save data only", UI_ICON.equipment)
    .button(TEXT.buttons.backGeneral, UI_ICON.close);

  form.show(player).then((res) => {
    if (res.canceled || res.selection === undefined) return;
    if (res.selection === 0) {
      if (capacity <= 0) msg(player, `§cRequires ${UNLOCK_STORAGE_1} Bond to open NPC storage.`);
      else return openMenuLater(() => openV22FInventoryTab(player, npc, 0, 0));
    }
    if (res.selection === 1) {
      if (capacity <= 0) msg(player, `§cRequires ${UNLOCK_STORAGE_1} Bond to store items.`);
      else return openMenuLater(() => openDepositMenu(player, npc));
    }
    if (res.selection === 2) {
      equipHeldItem(player, npc);
      return openMenuLater(() => openInventoryHub(player, npc));
    }
    if (res.selection === 3) return openMenuLater(() => openEquipmentMenu(player, npc));
    if (res.selection === 4) {
      if (capacity <= 0) msg(player, `§cRequires ${UNLOCK_STORAGE_1} Bond to sort storage.`);
      else compactNpcStorage(player);
      return openMenuLater(() => openInventoryHub(player, npc));
    }
    if (res.selection === 5) {
      if (capacity <= 0) msg(player, `§cRequires ${UNLOCK_STORAGE_1} Bond to take items.`);
      else takeAllNpcStorage(player);
      return openMenuLater(() => openInventoryHub(player, npc));
    }
    if (res.selection === 6) {
      if (npc) {
        applyNpcEquipment(npc, player);
        msg(player, "§dEquipment synced.");
      } else msg(player, "§eNPC not loaded. Equipment saved.");
      return openMenuLater(() => openInventoryHub(player, npc));
    }
    if (res.selection === 7) {
      if (npc) return openMenuLater(() => openLoverMenu(player, npc));
      return openMenuLater(() => openBondedRingMenu(player));
    }
  }).catch(() => {});
}

function openDepositMenu(player, npc) {
  const item = getHeldItem(player);
  const form = new ActionFormData()
    .title("§bStore items in NPC storage")
    .body(
      item
        ? `§fHolding: §b${shortItemName(item.typeId)} x${item.amount ?? 1}\n§7Choose the amount to store.`
        : "§cYou are not holding any item."
    )
    .button("§0Store 1 item")
    .button("§0Store full held stack")
    .button(TEXT.buttons.backGeneral);

  form.show(player).then((res) => {
    if (res.canceled || res.selection === undefined) return;
    if (res.selection === 0) depositHeldItem(player, npc, "one");
    if (res.selection === 1) depositHeldItem(player, npc, "all");
    if (res.selection === 2) openMenuLater(() => openInventoryHub(player, npc));
    if (res.selection === 0 || res.selection === 1) openMenuLater(() => openInventoryHub(player, npc));
  }).catch(() => {});
}


function formatDebugItem(id) {
  return id ? shortItemName(id) : "Empty";
}

function getEntityComponentSummary(entity) {
  try {
    if (typeof entity.getComponents === "function") {
      const ids = entity.getComponents().map((c) => c.typeId ?? c.id ?? "?").filter(Boolean);
      return ids.length ? ids.join(", ") : "could not read component list";
    }
  } catch (e) {}
  return "API getComponents is not available";
}

function buildEquipmentDebugBody(player, npc, reports) {
  const equipment = getNpcEquipment(player);
  const lines = [];
  const displayName = getNpcDisplayName(player);
  const eqComponent = getEquippableComponent(npc);

  lines.push(`§fNPC: §d${displayName}`);
  lines.push(`§fEquippable component: ${eqComponent ? "§aYES" : "§cNO"}`);
  const combatStats = getEquipmentCombatStats(player, getAffection(player), npc);
  lines.push(`§fMelee damage: §c${combatStats.meleeDamage} §8| §fRanged damage: §c${combatStats.rangedDamage || "None"}`);
  lines.push(`§fGuard: §b${formatPercent(combatStats.armorReduction)}`);
  if (combatStats.customArmorHint !== "None") lines.push(`§7${combatStats.customArmorHint}`);
  lines.push(`§7If Equippable is NO, the issue is in the entity/equipment slot or the API does not allow custom entities to use real slots.`);
  lines.push("");

  for (const slot of ["head", "chest", "legs", "feet", "mainhand", "offhand"]) {
    const report = reports.find((r) => r.slot === slot) ?? lastEquipmentSyncReport.get(slot);
    const readNow = readEntityEquipmentSlot(npc, slot);
    const saved = equipment[slot]?.id;
    const readId = readNow.containerItemId ?? readNow.equipmentItemId;
    const status = saved ? (readId === saved ? "§aOK" : "§cNOT IN SLOT") : (readId ? "§eSTILL STUCK" : "§aEMPTY");
    lines.push(`§f${equipmentSlotLabel(slot)}: §7saved §b${formatDebugItem(saved)} §8| §7real §e${formatDebugItem(readId)} §8| ${status}`);
    if (report?.actions?.length) lines.push(`§8- ${report.actions.slice(-2).join(" | ").slice(0, 140)}`);
    if (readNow.error) lines.push(`§8- read: ${readNow.error.slice(0, 120)}`);
  }

  lines.push("");
  lines.push("§eTest conclusion:");
  lines.push("§7- If the real slot is OK but visuals do not show: the issue is in geometry/render attachables.");
  lines.push("§7- If the real slot is not set: the issue is in equipment/script/entity slot sync.");
  lines.push("");
  lines.push(`§8Components: ${getEntityComponentSummary(npc).slice(0, 320)}`);
  return lines.join("\n");
}

function openEquipmentDebugMenu(player, npc) {
  if (!npc) {
    msg(player, "§cNPC not loaded, cannot check real slot.");
    return openMenuLater(() => openEquipmentMenu(player, npc));
  }

  const reports = applyNpcEquipmentDetailed(npc, player);

  // Chá» 5 tick Ä‘á»ƒ lá»‡nh command fallback/async cĂ³ thá»i gian Ă¡p dá»¥ng trÆ°á»›c khi Ä‘á»c láº¡i.
  system.runTimeout(() => {
    const form = new ActionFormData()
      .title("§dCheck equipment")
      .body(buildEquipmentDebugBody(player, npc, reports))
      .button("§dResync and check again", UI_ICON.equipment)
      .button(TEXT.buttons.backGeneral, UI_ICON.close);

    form.show(player).then((res) => {
      if (res.canceled || res.selection === undefined) return openMenuLater(() => openEquipmentMenu(player, npc));
      if (res.selection === 0) return openMenuLater(() => openEquipmentDebugMenu(player, npc));
      return openMenuLater(() => openEquipmentMenu(player, npc));
    }).catch(() => {});
  }, 5);
}

function openEquipmentMenu(player, npc) {
  const equipment = getNpcEquipment(player);
  const form = new ActionFormData()
    .title("§6NPC Equipment")
    .body(
      `§f${getEquipmentPowerText(player)}\n\n` +
      `§7Weapon unlock: ${UNLOCK_EQUIP_WEAPON} Bond.\n` +
      `§7Armor unlock: ${UNLOCK_EQUIP_ARMOR} Bond.\n` 
    )
    .button(`§0Helmet: §b${equipment.head ? stackText(equipment.head) : "Empty"}`)
    .button(`§0Chest: §b${equipment.chest ? stackText(equipment.chest) : "Empty"}`)
    .button(`§0Leggings: §b${equipment.legs ? stackText(equipment.legs) : "Empty"}`)
    .button(`§0Boots: §b${equipment.feet ? stackText(equipment.feet) : "Empty"}`)
    .button(`§0Weapon: §c${equipment.mainhand ? stackText(equipment.mainhand) : "Empty"}`)
    .button(`§0Offhand: §e${equipment.offhand ? stackText(equipment.offhand) : "Empty"}`)
    .button("§6Equip held item")
    .button("§dResync to NPC")
    .button("§eCheck real equipment")
    .button(TEXT.buttons.backGeneral);

  const slots = ["head", "chest", "legs", "feet", "mainhand", "offhand"];
  form.show(player).then((res) => {
    if (res.canceled || res.selection === undefined) return;
    if (res.selection >= 0 && res.selection < slots.length) {
      const slot = slots[res.selection];
      if (!equipment[slot]) {
        msg(player, `§7Slot ${equipmentSlotLabel(slot)} is empty.`);
        openMenuLater(() => openEquipmentMenu(player, npc));
      } else {
        openMenuLater(() => openUnequipConfirmMenu(player, npc, slot));
      }
      return;
    }
    if (res.selection === 6) {
      equipHeldItem(player, npc);
      openMenuLater(() => openEquipmentMenu(player, npc));
    }
    if (res.selection === 7) {
      if (npc) {
        applyNpcEquipment(npc, player);
        msg(player, "§dTried syncing equipment to NPC.");
      } else msg(player, "§eNPC is not loaded. Equipment was saved and will apply later.");
      openMenuLater(() => openEquipmentMenu(player, npc));
    }
    if (res.selection === 8) return openMenuLater(() => openEquipmentDebugMenu(player, npc));
    if (res.selection === 9) openMenuLater(() => openInventoryHub(player, npc));
  }).catch(() => {});
}

function openUnequipConfirmMenu(player, npc, slot) {
  const equipment = getNpcEquipment(player);
  const item = equipment[slot];
  const form = new ActionFormData()
    .title(`§eRemove ${equipmentSlotLabel(slot)}`)
    .body(`§0Currently equipped: §b${item ? stackText(item) : "Empty"}\n§7Removing will return the item to your inventory.`)
    .button("§4Remove equipment")
    .button(TEXT.buttons.backGeneral);

  form.show(player).then((res) => {
    if (res.canceled || res.selection === undefined) return;
    if (res.selection === 0) unequipNpcSlot(player, npc, slot);
    openMenuLater(() => openEquipmentMenu(player, npc));
  }).catch(() => {});
}

function openSettingsMenu(player, npc) {
  const autoCombat = isAutoCombatEnabled(player);
  const assistOn = isTargetAssistEnabled(player);
  const autoHeal = isAutoHealEnabled(player);
  const autoGift = isAutoGiftEnabled(player);
  const autoTalk = isAutoTalkEnabled(player);
  const scheduleOn = isDailyScheduleEnabled(player);

  const form = new ActionFormData()
    .title("§eSettings")
    .body(
      `§fAuto combat: ${enabledText(autoCombat)}\n` +
      `§fTarget assist: ${enabledText(assistOn)}\n` +
      `§fAuto heal: ${enabledText(autoHeal)}\n` +
      `§fAuto gift: ${enabledText(autoGift)}\n` +
      `§fAuto chat: ${enabledText(autoTalk)}\n` +
      `§fDaily schedule: ${enabledText(scheduleOn)}`
    )
    .button(autoCombat ? "§cTurn off auto combat" : "§aTurn on auto combat")
    .button(assistOn ? "§cTurn off target assist" : "§aTurn on target assist")
    .button(autoHeal ? "§cTurn off auto heal" : "§aTurn on auto heal")
    .button(autoGift ? "§cTurn off auto gift" : "§aTurn on auto gift")
    .button(autoTalk ? "§cTurn off auto chat" : "§aTurn on auto chat")
    .button(scheduleOn ? "§cTurn off daily schedule" : "§aTurn on daily schedule")
    .button("§0Ask schedule")
    .button(TEXT.buttons.backGeneral);

  form.show(player).then((res) => {
    if (res.canceled || res.selection === undefined) return;
    if (res.selection === 0) {
      setAutoCombatEnabled(player, !autoCombat);
      msg(player, !autoCombat ? "§aAuto combat: On." : "§cAuto combat: Off.");
      return openMenuLater(() => openSettingsMenu(player, npc));
    }
    if (res.selection === 1) {
      setTargetAssistEnabled(player, !assistOn);
      msg(player, !assistOn ? "§aTarget assist: On." : "§cTarget assist: Off.");
      return openMenuLater(() => openSettingsMenu(player, npc));
    }
    if (res.selection === 2) {
      setAutoHealEnabled(player, !autoHeal);
      msg(player, !autoHeal ? "§aAuto heal: On." : "§cAuto heal: Off.");
      return openMenuLater(() => openSettingsMenu(player, npc));
    }
    if (res.selection === 3) {
      setAutoGiftEnabled(player, !autoGift);
      msg(player, !autoGift ? "§aAuto gift: On." : "§cAuto gift: Off.");
      return openMenuLater(() => openSettingsMenu(player, npc));
    }
    if (res.selection === 4) {
      setAutoTalkEnabled(player, !autoTalk);
      msg(player, !autoTalk ? "§aAuto chat: On." : "§cAuto chat: Off.");
      return openMenuLater(() => openSettingsMenu(player, npc));
    }
    if (res.selection === 5) {
      setDailyScheduleEnabled(player, !scheduleOn);
      msg(player, !scheduleOn ? "§aDaily schedule: On." : "§cDaily schedule: Off.");
      return openMenuLater(() => openSettingsMenu(player, npc));
    }
    if (res.selection === 6) {
      talkToNpc(player, npc, "schedule");
      return openMenuLater(() => openSettingsMenu(player, npc));
    }
    if (res.selection === 7) return openMenuLater(() => openLoverMenu(player, npc));
  }).catch(() => {});
}

function openRenameNpcMenu(player, npc) {
  const currentName = getNpcDisplayName(player);
  const form = new ModalFormData().title(`§dRename ${currentName}`);

  // API server-ui cĂ³ khĂ¡c nhau giá»¯a vĂ i báº£n Minecraft: báº£n má»›i dĂ¹ng options object,
  // báº£n cÅ© dĂ¹ng defaultValue dáº¡ng string. Thá»­ cĂ¡ch má»›i trÆ°á»›c rá»“i fallback Ä‘á»ƒ form luĂ´n má»Ÿ Ä‘Æ°á»£c.
  try {
    form.textField("§fNew name §7(max 16 characters)", "Waifu Provence Furry", { defaultValue: currentName });
  } catch (e) {
    try { form.textField("§fNew name §7(max 16 characters)", "Waifu Provence Furry", currentName); } catch (err) {}
  }

  form.show(player).then((res) => {
    if (res.canceled) return openMenuLater(() => openNpcProfileMenu(player, npc));
    const value = Array.isArray(res.formValues) ? res.formValues[0] : currentName;
    const newName = sanitizeNpcName(value);

    setNpcDisplayName(player, newName);
    const loadedNpc = npc && npc.isValid ? npc : findOwnedNpc(player);
    if (loadedNpc) {
      try { loadedNpc.setDynamicProperty(NPC_CUSTOM_NAME_PROPERTY, newName); } catch (e) {}
      updateOwnedNpcNameTag(loadedNpc, player);
    }

    msg(player, `§aRenamed to: §d${newName}`);
    openMenuLater(() => openNpcProfileMenu(player, loadedNpc || npc));
  }).catch(() => {
    msg(player, "§cCould not open rename panel.");
    openMenuLater(() => openNpcProfileMenu(player, npc));
  });
}


function openActionMenu(player, npc) {
  const sitting = safeGetProperty(npc, "quan:is_sitting", false) === true;
  const resting = hasTag(npc, "lover_mode_rest");
  const sleeping = hasTag(npc, "lover_mode_sleep") || (safeGetProperty(npc, "quan:is_sleeping", false) === true && !resting);
  const lowPose = resting || sleeping;
  safeSetProperty(npc, "quan:is_crawling", false);

  const form = new ActionFormData()
    .title(`§d${getNpcDisplayName(player)} §7| §fВзаимодействия`)
    .body("§0Movement / pose / emote")
    .button("§0Follow", UI_ICON.follow)
    .button("§0Stand still", UI_ICON.status)
    .button(sitting ? "§0Stand up" : "§0Sit", UI_ICON.sit)
    .button(lowPose ? "§0Wake up" : "§0Rest", UI_ICON.sit)
    .button(sleeping ? "§0Wake up" : "§0Sleep", UI_ICON.sit)
    .button("§0Come here", UI_ICON.follow)
    .button("§0Roam freely", UI_ICON.action)
    .button("§0Hug", UI_ICON.heart)
    .button("§0Kiss", UI_ICON.heart)
    .button(safeGetProperty(npc, "quan:is_carrying", false) === true ? "§0Put down" : "§0Take in arms", UI_ICON.care)
    .button("§0Jump", UI_ICON.action)
    .button("§0Send heart", UI_ICON.heart)
    .button(TEXT.buttons.backGeneral);

  form.show(player).then((res) => {
    if (res.canceled || res.selection === undefined) return;
    if (res.selection === 0) setOwnedMode(npc, player, "follow");
    if (res.selection === 1) setOwnedMode(npc, player, "stay");
    if (res.selection === 2) setOwnedMode(npc, player, sitting ? "stay" : "sit");
    if (res.selection === 3) setOwnedMode(npc, player, lowPose ? "wake" : "rest");
    if (res.selection === 4) setOwnedMode(npc, player, sleeping ? "wake" : "sleep");
    if (res.selection === 5) comeHere(player, npc);
    if (res.selection === 6) setOwnedMode(npc, player, "idle");
    if (res.selection === 7) playEmote(player, npc, "hug");
    if (res.selection === 8) playEmote(player, npc, "kiss");
    if (res.selection === 9) playEmote(player, npc, safeGetProperty(npc, "quan:is_carrying", false) === true ? "putdown" : "carry");
    if (res.selection === 10) playEmote(player, npc, "dance");
    if (res.selection === 11) playEmote(player, npc, "heart");
    if (res.selection === 12) openMenuLater(() => openLoverMenu(player, npc));
  }).catch(() => {});
}

function openCareMenu(player, npc) {
  const affection = getAffection(player);
  const displayName = getNpcDisplayNameFrom(player, npc);

  const form = new ActionFormData()
    .title(TEXT.format.relationTitle(displayName))
    .body(
      TEXT.body.relationHeader +
      `§7Points: §d${affection}/${AFFECTION_MAX}\n` +
      `§7Rank: §d${getRankText(affection)}\n` +
      `§7Next unlock: §e${getNextUnlockText(affection)}`
    )
    .button(TEXT.menu.unlockMilestones)
    .button(TEXT.buttons.backCare(displayName))
    .button(TEXT.menu.close);

  form.show(player).then((res) => {
    if (res.canceled || res.selection === undefined) return;
    if (res.selection === 0) return openMenuLater(() => openUnlockMenu(player, npc));
    if (res.selection === 1) return openMenuLater(() => openQuickCarePanel(player, npc));
  }).catch(() => {});
}

function openCombatMenu(player, npc) {
  const affection = getAffection(player);
  const stats = getGuardStats(affection);
  const guardOn = hasTag(npc, "lover_mode_guard");
  const assistOn = isTargetAssistEnabled(player);
  const autoCombat = isAutoCombatEnabled(player);
  const locked = getLockedAssistTarget(player);
  const equipStats = getEquipmentCombatStats(player, affection, npc);

  const form = new ActionFormData()
    .title("§cLover Panel §0| §fCombat")
    .body(
      `§fBond: §d${affection}/${AFFECTION_MAX}\n` +
      `§fGuard: ${affection >= UNLOCK_GUARD ? "§aUnlocked" : "§cLocked"}\n` +
      `§fBase power: §e${stats.text}\n` +
      `§fMelee damage: §c${equipStats.meleeDamage}\n` +
      `${equipStats.rangedDamage > 0 ? `§fRanged damage: §c${equipStats.rangedDamage}\n` : ""}` +
      `§fGuard: §b${getNpcArmorScore(player)}%\n` +
      `§fAuto combat: ${enabledText(autoCombat)}\n` +
      `§fTarget assist: ${enabledText(assistOn)}\n` +
      `§fLocked target: ${locked ? "§eYes" : "§eNo"}`
    )
    .button(autoCombat ? "§cTurn off auto combat" : "§aTurn on auto combat")
    .button(guardOn ? "§eUpdate guard" : "§cEnable guard")
    .button("§7Disable guard / Follow")
    .button(assistOn ? "§cTurn off target assist" : "§aTurn on target assist")
    .button("§8Clear target")
    .button("§bCall NPC")
    .button(TEXT.buttons.backGeneral);

  form.show(player).then((res) => {
    if (res.canceled || res.selection === undefined) return;
    if (res.selection === 0) {
      setAutoCombatEnabled(player, !autoCombat);
      msg(player, !autoCombat ? "§aAuto combat: On." : "§cAuto combat: Off.");
      return openMenuLater(() => openCombatMenu(player, npc));
    }
    if (res.selection === 1) return setOwnedMode(npc, player, "guard");
    if (res.selection === 2) return setOwnedMode(npc, player, "follow");
    if (res.selection === 3) {
      setTargetAssistEnabled(player, !assistOn);
      msg(player, !assistOn ? "§aTarget assist: On." : "§cTarget assist: Off.");
      return openMenuLater(() => openCombatMenu(player, npc));
    }
    if (res.selection === 4) {
      clearLockedAssistTarget(player);
      msg(player, "§7Target cleared.");
      return openMenuLater(() => openCombatMenu(player, npc));
    }
    if (res.selection === 5) return comeHere(player, npc);
    if (res.selection === 6) return openMenuLater(() => openLoverMenu(player, npc));
  }).catch(() => {});
}

function openAffectionMenu(player, npc) {
  return openCareMenu(player, npc);
}

function openUnlockMenu(player, npc) {
  const affection = getAffection(player);
  const displayName = getNpcDisplayNameFrom(player, npc);

  const form = new ActionFormData()
    .title("§dUnlock Milestones")
    .body(
      `§7Current: §d${affection}/${AFFECTION_MAX}\n\n` +
      `§730  - ${displayName} becomes friendlier when talking\n` +
      `§780  - Ask ${displayName} for gifts\n` +
      `§7100 - Ask ${displayName} to heal\n` +
      "§7150 - Guard Tier I\n" +
      "§7180 - Auto gift when nearby\n" +
      "§7220 - Guard Tier II\n" +
      "§7280 - Guard Tier III\n" +
      "§7300 - Max Bond"
    )
    .button(TEXT.buttons.backRelation)
    .button(TEXT.menu.close);

  form.show(player).then((res) => {
    if (res.canceled || res.selection === undefined) return;
    if (res.selection === 0) return openMenuLater(() => openCareMenu(player, npc));
  }).catch(() => {});
}


function setFoxSkin(player, npc, foxSkinValue) {
  if (!ensureOwnerOrTame(npc, player)) return false;

  if (!isFoxSkinUnlockedByAffection(player)) {
    msg(player, `§cСкин лисы закрыт. §eНужна связь: §f${FOX_UNLOCK_AFFECTION}.`);
    return false;
  }

  const value = Math.max(0, Math.min(FOX_SKINS.length - 1, Math.floor(Number(foxSkinValue) || 0)));
  safeSetProperty(npc, "quan:fox_skin", value);
  setPlayerNumber(player, FOX_SKIN_PROPERTY, value);
  saveNpcState(player, npc);
  const skin = FOX_SKINS.find((entry) => entry.value === value);
  msg(player, `§aChanged fox skin: §f${skin ? skin.name : value}`);
  return true;
}

function openFoxSkinMenu(player, npc) {
  const displayName = getNpcDisplayNameFrom(player, npc);
  const currentValue = getCurrentFoxSkinValueForMenu(player, npc);
  const current = FOX_SKINS.find((entry) => entry.value === currentValue);

  if (!isFoxSkinUnlockedByAffection(player)) {
    const form = new ActionFormData()
      .title(`§0${displayName} | Fox Skin`)
      .body(`§cСкин лисы закрыт.\n§eНужна связь: §f${FOX_UNLOCK_AFFECTION}`)
      .button("§cBack");
    form.show(player).then(() => openMenuLater(() => openOutfitMenu(player, npc))).catch(() => {});
    return;
  }

  const form = new ActionFormData()
    .title(`§0${displayName} | Fox Skin`)
    .body(`§0Current fox skin: ${current ? current.name : `fox skin ${currentValue + 1}`}`);

  for (const skin of FOX_SKINS) {
    const mark = skin.value === currentValue ? "✓ " : "";
    form.button(`§0${mark}${skin.name}`);
  }

  form.button("§cBack");

  form.show(player).then((res) => {
    if (res.canceled || res.selection === undefined) return;

    if (res.selection >= 0 && res.selection < FOX_SKINS.length) {
      setFoxSkin(player, npc, FOX_SKINS[res.selection].value);
      return openMenuLater(() => openFoxSkinMenu(player, npc));
    }

    openMenuLater(() => openOutfitMenu(player, npc));
  }).catch(() => {});
}

function openOutfitMenu(player, npc) {
  const displayName = getNpcDisplayNameFrom(player, npc);
  const currentValue = getCurrentOutfitValueForMenu(player, npc);
  const current = OUTFITS.find((entry) => entry.value === currentValue);
  const affection = getAffection(player);

  const form = new ActionFormData()
    .title(`§0${displayName} | Внешний вид`)
    .body(`§0Текущий скин: §d${current ? current.name : currentValue}\n§0Связь: §d${affection}/${AFFECTION_MAX}\n§7Выбери чибика:`);

  for (const outfit of OUTFITS) {
    const selected = outfit.value === currentValue;
    const mark = selected ? "§a✓ " : "§0";
    form.button(`${mark}${outfit.name}`);
  }
  form.button("§cНазад");

  form.show(player).then((res) => {
    if (res.canceled || res.selection === undefined) return;
    if (res.selection >= 0 && res.selection < OUTFITS.length) {
      setOutfit(player, npc, OUTFITS[res.selection].value);
      return openMenuLater(() => openOutfitMenu(player, npc));
    }
    openMenuLater(() => openNpcProfileMenu(player, npc));
  }).catch(() => {});
}

function openNpcProfileMenu(player, npc) {
  const displayName = getNpcDisplayNameFrom(player, npc);
  const currentValue = getCurrentOutfitValueForMenu(player, npc);
  const current = OUTFITS.find((entry) => entry.value === currentValue);

  const form = new ActionFormData()
    .title(TEXT.buttons.profile(displayName))
    .body(
      `§7Name: §d${displayName}
` +
      `§7Skin: §d${current ? current.name : `skin${currentValue + 1}`}

` +
      `§7Rename and appearance are grouped in Profile.`
    )
    .button(TEXT.buttons.rename(displayName), UI_ICON.status)
    .button(TEXT.menu.outfit, UI_ICON.outfit)
    .button(TEXT.buttons.backGeneral, UI_ICON.close);

  form.show(player).then((res) => {
    if (res.canceled || res.selection === undefined) return;
    if (res.selection === 0) return openMenuLater(() => openRenameNpcMenu(player, npc));
    if (res.selection === 1) return openMenuLater(() => openOutfitMenu(player, npc));
    if (res.selection === 2) return openMenuLater(() => openLoverMenu(player, npc));
  }).catch(() => {});
}


function v22HSlotShortLabel(itemOrStored, prefix, index) {
  const label = String(index + 1).padStart(2, "0");
  if (!itemOrStored) return `§7[${prefix}${label}] §8Empty`;
  const id = itemOrStored.typeId ?? itemOrStored.id;
  const amount = itemOrStored.amount ?? 1;
  return `§7[${prefix}${label}] §f${shortItemName(id)} §ax${amount}`;
}

function v22HEquipButton(equipment, slot, iconText) {
  const item = equipment[slot];
  return `${iconText} §6${equipmentSlotLabel(slot)}: ${item ? "§f" + shortItemName(item.id) : TEXT.buttons.empty}`;
}

function v22HTabLabel(selected, symbol, text) {
  return selected ? `§e${symbol} ${text}` : `§7${symbol} ${text}`;
}

function migrateV22FStorageOverflow(player) {
  // v22H giáº£m kho NPC tá»« 27 xuá»‘ng 20. None xĂ³a Ä‘á»“ á»Ÿ Ă´ 21-27: Ä‘Æ°a vá» tĂºi ngÆ°á»i chÆ¡i, náº¿u tĂºi Ä‘áº§y thĂ¬ tháº£ ra gáº§n ngÆ°á»i chÆ¡i.
  try {
    const raw = player.getDynamicProperty(NPC_STORAGE_PROPERTY);
    if (typeof raw !== "string" || raw.length <= 0) return;
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length <= STORAGE_MAX_SLOTS) return;
    const keep = parsed.slice(0, STORAGE_MAX_SLOTS);
    const overflow = parsed.slice(STORAGE_MAX_SLOTS).filter((it) => it && it.id && Number(it.amount) > 0);
    if (overflow.length <= 0) {
      player.setDynamicProperty(NPC_STORAGE_PROPERTY, JSON.stringify(normalizeStorageSlots(keep)));
      return;
    }
    for (const item of overflow) {
      giveItem(player, item.id, Math.max(1, Math.floor(Number(item.amount) || 1)));
    }
    player.setDynamicProperty(NPC_STORAGE_PROPERTY, JSON.stringify(normalizeStorageSlots(keep)));
    msg(player, "§eNPC storage was reduced to 20 slots. Extra items were returned to your inventory.");
  } catch (e) {}
}

function v22HPanelBody(player, npc, tabName = "Kho") {
  const affection = getAffection(player);
  const capacity = getStorageCapacity(affection);
  const used = getStorageUsedCount(player);
  return `§6${tabName} §8| §7Bond §d${affection}/${AFFECTION_MAX} §8| §7Storage §a${used}/${capacity}`;
}

function openV22FEquipmentSlotMenu(player, npc, slot) {
  const equipment = getNpcEquipment(player);
  const item = equipment[slot];
  const form = new ActionFormData()
    .title(`§dSlot NPC §7| §f${equipmentSlotLabel(slot)}`)
    .body(`§fCurrent: §b${item ? stackText(item) : "Empty"}\n§7Old equipment will be returned safely to your inventory/storage.`)
    .button("§aEquip held item", UI_ICON.equipment)
    .button(item ? "§cRemove equipment" : "§8Slot is empty", UI_ICON.equipment)
    .button("§dSync to NPC", UI_ICON.equipment)
    .button(TEXT.buttons.backGeneral, UI_ICON.close);

  form.show(player).then((res) => {
    if (res.canceled || res.selection === undefined) return;
    if (res.selection === 0) equipHeldItem(player, npc);
    if (res.selection === 1 && item) unequipNpcSlot(player, npc, slot);
    if (res.selection === 2) {
      if (npc) {
        applyNpcEquipment(npc, player);
        msg(player, "§aEquipment synced.");
      }
    }
    openMenuLater(() => openV22FInventoryTab(player, npc));
  }).catch(() => {});
}

function openV22FInventoryTab(player, npc, npcPage = 0, playerPage = 0) {
  migrateV22FStorageOverflow(player);
  const affection = getAffection(player);
  const capacity = getStorageCapacity(affection);
  const slots = getNpcStorage(player);
  const equipment = getNpcEquipment(player);
  const npcMaxPage = Math.max(0, Math.ceil(Math.max(1, capacity) / STORAGE_PAGE_SIZE) - 1);
  const safeNpcPage = Math.max(0, Math.min(npcMaxPage, npcPage));
  const playerMaxPage = Math.max(0, getPlayerInventoryPageCount(player) - 1);
  const safePlayerPage = Math.max(0, Math.min(playerMaxPage, playerPage));
  const npcStart = safeNpcPage * STORAGE_PAGE_SIZE;
  const playerStart = safePlayerPage * PLAYER_GRID_PAGE_SIZE;

  const body =
    `§6Inventory / Equipment\n` +
    `§7Bond: §d${affection}/${AFFECTION_MAX} §8| §7Storage: §a${getStorageUsedCount(player)}/${capacity}\n` +
    `§6NPC Equipment §8→ §7Helmet / Chest / Legs / Boots / Weapon / Offhand\n` +
    `§aStorage utilities §8→ §7Store held / Sort / Take all\n` +
    `§eNPC Storage §7Page ${safeNpcPage + 1}/${npcMaxPage + 1} §8| §bPlayer Bag §7Page ${safePlayerPage + 1}/${playerMaxPage + 1}`;

  const form = new ActionFormData()
    .title(`§d${getNpcDisplayName(player)} §7| §fInventory / Equipment v22V`)
    .body(body)
    // Trang bá»‹ NPC.
    .button(v22HEquipButton(equipment, "head", "□"), UI_ICON.equipment)
    .button(v22HEquipButton(equipment, "chest", "□"), UI_ICON.equipment)
    .button(v22HEquipButton(equipment, "legs", "□"), UI_ICON.equipment)
    .button(v22HEquipButton(equipment, "feet", "□"), UI_ICON.equipment)
    .button(v22HEquipButton(equipment, "mainhand", "⚔"), UI_ICON.combat)
    .button(v22HEquipButton(equipment, "offhand", "🛡"), UI_ICON.equipment)
    // Tiện ích kho.
    .button("§aПоложить предмет из руки", UI_ICON.inventory)
    .button("§eСортировать", UI_ICON.settings)
    .button("§bЗабрать всё", UI_ICON.inventory);

  for (let i = 0; i < STORAGE_PAGE_SIZE; i++) {
    const index = npcStart + i;
    if (index < capacity) form.button(v22HSlotShortLabel(slots[index], "N", index), UI_ICON.inventory);
    else form.button("§8[N--] Закрыто", UI_ICON.inventory);
  }

  form.button("§b◀ Игрок", UI_ICON.inventory)
    .button("§bИгрок ▶", UI_ICON.inventory);

  for (let i = 0; i < PLAYER_GRID_PAGE_SIZE; i++) {
    const index = playerStart + i;
    const item = getInventoryItemAt(player, index);
    form.button(v22HSlotShortLabel(item, "P", index), UI_ICON.inventory);
  }

  form.button("§e◀ Хранилище NPC", UI_ICON.inventory)
    .button("§eХранилище NPC ▶", UI_ICON.inventory)
    .button(TEXT.buttons.backGeneral, UI_ICON.close);

  form.show(player).then((res) => {
    if (res.canceled || res.selection === undefined) return;
    const sel = res.selection;
    if (sel >= 0 && sel <= 5) return openMenuLater(() => openV22FEquipmentSlotMenu(player, npc, ["head", "chest", "legs", "feet", "mainhand", "offhand"][sel]));
    if (sel === 6) {
      depositHeldItem(player, npc, "all");
      return openMenuLater(() => openV22FInventoryTab(player, npc, safeNpcPage, safePlayerPage));
    }
    if (sel === 7) {
      compactNpcStorage(player);
      return openMenuLater(() => openV22FInventoryTab(player, npc, 0, safePlayerPage));
    }
    if (sel === 8) {
      takeAllNpcStorage(player);
      return openMenuLater(() => openV22FInventoryTab(player, npc, 0, safePlayerPage));
    }
    if (sel >= 9 && sel < 9 + STORAGE_PAGE_SIZE) {
      const slotIndex = npcStart + (sel - 9);
      if (slotIndex >= capacity) {
        msg(player, "§cThis slot is not unlocked.");
        return openMenuLater(() => openV22FInventoryTab(player, npc, safeNpcPage, safePlayerPage));
      }
      return openMenuLater(() => openV19NpcSlotMenu(player, npc, slotIndex, safeNpcPage, safePlayerPage));
    }
    const playerNavBase = 9 + STORAGE_PAGE_SIZE;
    if (sel === playerNavBase) return openMenuLater(() => openV22FInventoryTab(player, npc, safeNpcPage, safePlayerPage - 1));
    if (sel === playerNavBase + 1) return openMenuLater(() => openV22FInventoryTab(player, npc, safeNpcPage, safePlayerPage + 1));
    const playerBase = playerNavBase + 2;
    if (sel >= playerBase && sel < playerBase + PLAYER_GRID_PAGE_SIZE) {
      const slotIndex = playerStart + (sel - playerBase);
      return openMenuLater(() => openV19PlayerSlotMenu(player, npc, slotIndex, safeNpcPage, safePlayerPage));
    }
    const npcNavBase = playerBase + PLAYER_GRID_PAGE_SIZE;
    if (sel === npcNavBase) return openMenuLater(() => openV22FInventoryTab(player, npc, safeNpcPage - 1, safePlayerPage));
    if (sel === npcNavBase + 1) return openMenuLater(() => openV22FInventoryTab(player, npc, safeNpcPage + 1, safePlayerPage));
    if (sel === npcNavBase + 2) return openMenuLater(() => openLoverMenu(player, npc));
  }).catch(() => {});
}



function openV22FCommandTab(player, npc) {
  const sitting = safeGetProperty(npc, "quan:is_sitting", false) === true;
  const resting = hasTag(npc, "lover_mode_rest");
  const sleeping = hasTag(npc, "lover_mode_sleep") || (safeGetProperty(npc, "quan:is_sleeping", false) === true && !resting);
  const lowPose = resting || sleeping;
  safeSetProperty(npc, "quan:is_crawling", false);
  const assistOn = isTargetAssistEnabled(player);
  const autoCombat = isAutoCombatEnabled(player);

  const carrying = safeGetProperty(npc, "quan:is_carrying", false) === true;
  const form = new ActionFormData()
    .title(`§d${getNpcDisplayName(player)} §7| §fВзаимодействия`)
    .body(
      `§0Движение · Позы · Эмоции\n` +
      `§7Бой: ${autoCombat && assistOn ? "§aОхрана+помощь" : autoCombat ? "§aОхрана" : assistOn ? "§aПомощь" : "§cВыкл"}`
    )
    .button("§0Follow", UI_ICON.follow)
    .button("§0Stand still", UI_ICON.status)
    .button("§0Free roam", UI_ICON.action)
    .button("§1Recall", UI_ICON.follow)
    .button(sitting ? "§0Stand up" : "§0Sit", UI_ICON.sit)
    .button(lowPose ? "§0Wake up" : "§0Rest", UI_ICON.sit)
    .button(sleeping ? "§0Wake up" : "§0Sleep", UI_ICON.sit)
    .button("§0Hug", UI_ICON.heart)
    .button("§0Kiss", UI_ICON.heart)
    .button(carrying ? "§0Put down" : "§0Take in arms", UI_ICON.care)
    .button("§0Send heart", UI_ICON.heart)
    .button("§0Combat", UI_ICON.combat)
    .button(TEXT.buttons.backGeneral, UI_ICON.close);

  form.show(player).then((res) => {
    if (res.canceled || res.selection === undefined) return;
    const sel = res.selection;
    if (sel === 0) setOwnedMode(npc, player, "follow");
    if (sel === 1) setOwnedMode(npc, player, "stay");
    if (sel === 2) setOwnedMode(npc, player, "idle");
    if (sel === 3) comeHere(player, npc);
    if (sel === 4) setOwnedMode(npc, player, sitting ? "stay" : "sit");
    if (sel === 5) setOwnedMode(npc, player, lowPose ? "wake" : "rest");
    if (sel === 6) setOwnedMode(npc, player, sleeping ? "wake" : "sleep");
    if (sel === 7) playEmote(player, npc, "hug");
    if (sel === 8) playEmote(player, npc, "kiss");
    if (sel === 9) playEmote(player, npc, carrying ? "putdown" : "carry");
    if (sel === 10) playEmote(player, npc, "heart");
    if (sel === 11) return openMenuLater(() => openCommandCombatMenu(player, npc));
    if (sel === 12) return openMenuLater(() => openLoverMenu(player, npc));
  }).catch(() => {});
}

function openCommandCombatMenu(player, npc) {
  const assistOn = isTargetAssistEnabled(player);
  const autoCombat = isAutoCombatEnabled(player);
  const current = autoCombat && assistOn ? "§aGuard + assist" : autoCombat ? "§aGuard" : assistOn ? "§aAssist" : "§cOff";

  const form = new ActionFormData()
    .title(`§d${getNpcDisplayName(player)} §7| §fCombat`)
    .body(`§7Current: ${current}`)
    .button("§4Off", UI_ICON.combat)
    .button("§2Guard", UI_ICON.combat)
    .button("§2Assist", UI_ICON.combat)
    .button("§2Guard + Assist", UI_ICON.combat)
    .button(TEXT.buttons.backGeneral, UI_ICON.close);

  form.show(player).then((res) => {
    if (res.canceled || res.selection === undefined) return;
    const sel = res.selection;
    if (sel === 0) {
      setAutoCombatEnabled(player, false);
      setTargetAssistEnabled(player, false);
      setOwnedMode(npc, player, "follow");
      msg(player, "§cCombat: Off.");
      return openMenuLater(() => openCommandCombatMenu(player, npc));
    }
    if (sel === 1) {
      setAutoCombatEnabled(player, true);
      setTargetAssistEnabled(player, false);
      setOwnedMode(npc, player, "guard");
      msg(player, "§aCombat: Guard.");
      return openMenuLater(() => openCommandCombatMenu(player, npc));
    }
    if (sel === 2) {
      setAutoCombatEnabled(player, false);
      setTargetAssistEnabled(player, true);
      setOwnedMode(npc, player, "follow");
      msg(player, "§aCombat: Assist.");
      return openMenuLater(() => openCommandCombatMenu(player, npc));
    }
    if (sel === 3) {
      setAutoCombatEnabled(player, true);
      setTargetAssistEnabled(player, true);
      setOwnedMode(npc, player, "guard");
      msg(player, "§aCombat: Guard + assist.");
      return openMenuLater(() => openCommandCombatMenu(player, npc));
    }
    if (sel === 4) return openMenuLater(() => openV22FCommandTab(player, npc));
  }).catch(() => {});
}




function openV22FInfoTab(player, npc) {
  const affection = getAffection(player);
  const stats = getGuardStats(affection);
  const autoCombat = isAutoCombatEnabled(player);
  const assistOn = isTargetAssistEnabled(player);
  const combatText = autoCombat && assistOn ? "§aGuard + assist" : autoCombat ? "§aGuard" : assistOn ? "§aAssist" : "§cOff";
  const displayName = getNpcDisplayName(player);
  const hpValues = npc ? getNpcHealthValues(npc) : { current: stats.maxHealth ?? NPC_HP_MIN, max: stats.maxHealth ?? NPC_HP_MIN };
  const currentValue = getCurrentOutfitValueForMenu(player, npc);
  const currentSkin = OUTFITS.find((entry) => entry.value === currentValue);
  const body =
    `§6Info
` +
    `§7Name: §d${displayName}
` +
    `§7Skin: §d${currentSkin ? currentSkin.name : `skin${currentValue + 1}`}
` +
    `§7HP: §c${hpHearts(hpValues.current, hpValues.max)} §f${hpValues.current}/${hpValues.max}
` +
    `§7Bond: ${bondHearts(affection, AFFECTION_MAX)} §d${affection}/${AFFECTION_MAX}
` +
    `§7Rank: §d${getRankText(affection)}
` +
    `§7Combat: ${combatText}
` +
    `§7Guard: §b${getNpcArmorScore(player)}% §8| §7Dame: §c${getEquipmentCombatStats(player, getAffection(player)).meleeDamage}`;

  const form = new ActionFormData()
    .title(TEXT.format.infoTitle(displayName))
    .body(body)
    .button(TEXT.menu.detailStatus, UI_ICON.status)
    .button(TEXT.buttons.profile(displayName), UI_ICON.outfit)
    .button(TEXT.menu.settings, UI_ICON.settings)
    .button(TEXT.buttons.backGeneral, UI_ICON.close);

  form.show(player).then((res) => {
    if (res.canceled || res.selection === undefined) return;
    const sel = res.selection;
    if (sel === 0) return openMenuLater(() => openStatusPanel(player, npc));
    if (sel === 1) return openMenuLater(() => openNpcProfileMenu(player, npc));
    if (sel === 2) return openMenuLater(() => openSettingsMenu(player, npc));
    if (sel === 3) return openMenuLater(() => openLoverMenu(player, npc));
  }).catch(() => {});
}

function recoverBondedLoveRingFromMenu(player, npc) {
  npc = normalizeFoxSleepStateV303(npc, player) ?? npc;

  if (!isValidEntity(npc) || !isOwnLoverNpc(player, npc)) {
    msg(player, "§cYour Waifu NPC must be alive and loaded to recover the Bonded Love Ring.");
    return false;
  }

  if (!playerHasBond(player)) {
    msg(player, "§cYou do not have a bonded Waifu NPC yet.");
    return false;
  }

  if (!playerNpcAlive(player)) {
    msg(player, "§cYour Waifu NPC is marked as dead. Revive her with the Broken Love Ring instead.");
    return false;
  }

  const ringCount = countItems(player, RING_ID) + countItems(player, BONDED_RING_ID) + countItems(player, BROKEN_RING_ID);
  if (ringCount > 0) {
    msg(player, "§eYou already have a ring item in your inventory.");
    return false;
  }

  markNpcAlive(player, true);
  giveItem(player, BONDED_RING_ID, 1);
  msg(player, "§aYour Bonded Love Ring has been recovered.");
  playLoverVoice(npc, player, "happy", 1.0, 1.05);
  spawnLoveParticles(npc, 4);
  return true;
}

function openLoverMenu(player, npc) {
  npc = normalizeFoxSleepStateV303(npc, player) ?? npc;
  const affection = getAffection(player);
  const capacity = getStorageCapacity(affection);
  const used = getStorageUsedCount(player);
  const displayName = getNpcDisplayNameFrom(player, npc);
  const status = npc ? getModeText(npc) : `${displayName} not loaded`;
  playLoverVoice(npc, player, "hello", 1.0, 1.05);
  const form = new ActionFormData()
    .title(`§d${displayName} §7| §fControl Panel`)
    .body(
      `§6Overview\n` +
      `§7Mode: §e${status}\n` +
      `§7Bond: ${bondHearts(affection, AFFECTION_MAX)} §d${affection}/${AFFECTION_MAX}\n` +
      `§7Storage: §a${used}/${capacity} §8| §7Rank: §d${getRankText(affection)}`
    )
    .button("§0Взаимодействия", UI_ICON.action)
    .button("§0Инвентарь / Экипировка", UI_ICON.inventory)
    .button(TEXT.menu.care, UI_ICON.care)
    .button(TEXT.menu.outfit, UI_ICON.outfit)
    .button("§0Инфо", UI_ICON.status)
    .button("§0Отдать предмет", UI_ICON.gift)
    .button("§dВосстановить кольцо", UI_ICON.ring)
    .button(TEXT.menu.settings, UI_ICON.settings)
    .button(TEXT.menu.close, UI_ICON.close);

  form.show(player).then((res) => {
    if (res.canceled || res.selection === undefined) return;
    if (res.selection === 0) return openMenuLater(() => openV22FCommandTab(player, npc));
    if (res.selection === 1) return openMenuLater(() => openV22FInventoryTab(player, npc, 0, 0));
    if (res.selection === 2) return openMenuLater(() => openQuickCarePanel(player, npc));
    if (res.selection === 3) return openMenuLater(() => openNpcProfileMenu(player, npc));
    if (res.selection === 4) return openMenuLater(() => openV22FInfoTab(player, npc));
    if (res.selection === 5) return giveItemToNpcFromControlPanel(player, npc);
    if (res.selection === 6) return recoverBondedLoveRingFromMenu(player, npc);
    if (res.selection === 7) return openMenuLater(() => openSettingsMenu(player, npc));
  }).catch(() => {});
}





function findViewedOwnedNpcForEquip(player, maxDistance = QUICK_EQUIP_DISTANCE) {
  if (!player) return undefined;

  try {
    const hits = player.getEntitiesFromViewDirection({ maxDistance, ignoreBlockCollision: false });
    for (const hit of hits) {
      const entity = hit.entity ?? hit;
      if (!entity) continue;

      if (isLoverNpcType(entity) && isOwnLoverNpc(player, entity)) return entity;

      if (entity.typeId === PROXY_ID) {
        const ownerTags = getOwnerTags(entity);
        const preferredTag = ownerTags.length ? ownerTags[0] : ownerTagForPlayer(player);
        const nearby = [...entity.dimension.getEntities({ type: NPC_ID, location: entity.location, maxDistance: 4 }), ...entity.dimension.getEntities({ type: SLEEP_NPC_ID, location: entity.location, maxDistance: 4 }), ...entity.dimension.getEntities({ type: FOX_SLEEP_NPC_ID, location: entity.location, maxDistance: 4 })];
        for (const candidate of nearby) {
          if (hasTag(candidate, preferredTag) && isOwnLoverNpc(player, candidate)) return candidate;
        }
      }
    }
  } catch (e) {}

  return undefined;
}

function resolveOwnedNpcFromInteractionTarget(player, target) {
  if (!player || !target) return undefined;

  try {
    if (isLoverNpcType(target) && isOwnLoverNpc(player, target)) return target;
  } catch (e) {}

  try {
    if (target.typeId === PROXY_ID) {
      const ownerTags = getOwnerTags(target);
      const preferredTag = ownerTags.length ? ownerTags[0] : ownerTagForPlayer(player);
      const nearby = [...target.dimension.getEntities({ type: NPC_ID, location: target.location, maxDistance: 4 }), ...target.dimension.getEntities({ type: SLEEP_NPC_ID, location: target.location, maxDistance: 4 }), ...target.dimension.getEntities({ type: FOX_SLEEP_NPC_ID, location: target.location, maxDistance: 4 })];
      for (const candidate of nearby) {
        if (hasTag(candidate, preferredTag) && isOwnLoverNpc(player, candidate)) return candidate;
      }
    }
  } catch (e) {}

  return undefined;
}

function quickEquipSpecificNpc(player, npc, itemTypeId) {
  if (!player || !npc || !itemTypeId) return false;
  const equipSlot = findEquipSlotForItem(itemTypeId);
  if (!equipSlot) return false;
  if (!isOwnLoverNpc(player, npc)) return false;

  const npcName = getNpcDisplayName(player);
  const before = getNpcEquipment(player);
  const oldItem = before[equipSlot];

  const ok = equipHeldItem(player, npc);
  if (!ok) return true;

  if (oldItem) {
    msg(player, `§7Replaced old ${equipmentSlotLabel(equipSlot)} of ${npcName}.`);
  } else {
    msg(player, `§7${npcName} received ${equipmentSlotLabel(equipSlot)}.`);
  }
  return true;
}

function quickEquipViewedNpc(player, itemTypeId) {
  if (!player || !itemTypeId) return false;
  const equipSlot = findEquipSlotForItem(itemTypeId);
  if (!equipSlot) return false;

  const npc = findViewedOwnedNpcForEquip(player, QUICK_EQUIP_DISTANCE);
  if (!npc) return false;

  return quickEquipSpecificNpc(player, npc, itemTypeId);
}


// v22V: Báº¯t chÆ°á»›c Odyssey — báº¥m dĂ¹ng giĂ¡p/vÅ© khĂ­ khi Ä‘ang nhĂ¬n NPC sáº½ trang bá»‹ tháº³ng cho NPC,
// trĂ¡nh viá»‡c Bedrock tá»± máº·c giĂ¡p cho player trÆ°á»›c khi playerInteractWithEntity cháº¡y.
world.beforeEvents.itemUse.subscribe((event) => {
  const player = event.source;
  const item = event.itemStack;
  if (!player || !item || !item.typeId) return;
  if (isSoulRingItem(item.typeId)) return;
  if (!findEquipSlotForItem(item.typeId)) return;

  const npc = findViewedOwnedNpcForEquip(player, QUICK_EQUIP_DISTANCE);
  if (!npc) return;

  event.cancel = true;
  if (isQuickEquipMenuBlocked(player)) return;
  markQuickEquipMenuBlock(player);
  const itemTypeId = item.typeId;
  system.run(() => quickEquipViewedNpc(player, itemTypeId));
});

world.beforeEvents.playerInteractWithEntity.subscribe((event) => {
  const player = event.player;
  const target = event.target;

  if (!player || !target) return;

  // v22T: Khi ngÆ°á»i chÆ¡i dĂ¹ng Love Ring/Bonded Ring gáº§n NPC hoáº·c proxy,
  // Bedrock cĂ³ thá»ƒ báº¯n thĂªm sá»± kiá»‡n cháº¡m entity vĂ  má»Ÿ Báº£ng Ä‘iá»u khiá»ƒn Ä‘Ă¨ lĂªn menu ChÄƒm sĂ³c.
  // Náº¿u tay Ä‘ang cáº§m nháº«n, bá» qua interact entity Ä‘á»ƒ itemUse xá»­ lĂ½ menu nháº«n á»•n Ä‘á»‹nh.
  const touchItem = event.itemStack;
  if (isRingItemStack(touchItem) || isRingItemStack(getHeldItem(player))) {
    event.cancel = true;
    return;
  }

  const equipTouchItem = touchItem ?? getHeldItem(player);
  if (equipTouchItem?.typeId && isEquippableNpcItem(equipTouchItem.typeId)) {
    event.cancel = true;
    if (isQuickEquipMenuBlocked(player)) return;
    markQuickEquipMenuBlock(player);
    const itemTypeId = equipTouchItem.typeId;
    system.run(() => {
      const npc = resolveOwnedNpcFromInteractionTarget(player, target);
      if (npc) quickEquipSpecificNpc(player, npc, itemTypeId);
    });
    return;
  }

  if (target.typeId === PROXY_ID) {
    event.cancel = true;
    system.run(() => {
      let npc = undefined;
      try {
        const ownerTags = getOwnerTags(target);
        const tag = ownerTags.length ? ownerTags[0] : ownerTagForPlayer(player);
        const nearby = [...target.dimension.getEntities({ type: NPC_ID, location: target.location, maxDistance: 4 }), ...target.dimension.getEntities({ type: SLEEP_NPC_ID, location: target.location, maxDistance: 4 }), ...target.dimension.getEntities({ type: FOX_SLEEP_NPC_ID, location: target.location, maxDistance: 4 })];
        for (const candidate of nearby) {
          if (hasTag(candidate, tag) && isOwnLoverNpc(player, candidate)) { npc = candidate; break; }
        }
      } catch (e) {}
      if (!npc) npc = findOwnedNpc(player, 48);
      if (npc && isOwnLoverNpc(player, npc)) {
        openLoverMenu(player, npc);
      } else {
        msg(player, "§cNPC not found.");
      }
    });
    return;
  }

  if (!isLoverNpcType(target)) return;

  event.cancel = true;

  const item = event.itemStack;

  system.run(() => {
    if (item && item.typeId && item.typeId !== RING_ID && isGiftItem(item.typeId)) {
      receiveGiftFromPlayer(player, target, item.typeId);
      return;
    }

    openLoverMenu(player, target);
  });
});

world.afterEvents.itemUse.subscribe((event) => {
  const player = event.source;
  const item = event.itemStack;

  if (!player || !item) return;
  if (item.typeId !== RING_ID && item.typeId !== BONDED_RING_ID && item.typeId !== BROKEN_RING_ID) return;

  if (item.typeId === BROKEN_RING_ID) {
    openBrokenRingMenu(player);
    return;
  }

  if (item.typeId === BONDED_RING_ID) {
    if (player.isSneaking) {
      callBondedNpc(player);
    } else {
      openBondedRingMenu(player);
    }
    return;
  }

  if (playerHasBond(player) || hasAnyOwnedNpcLoaded(player)) {
    if (playerNpcAlive(player)) {
      convertToBondedRing(player);
      msg(player, "§eYou accepted the NPC's proposal. The Love Ring has been bonded to you.");
      openBondedRingMenu(player);
    } else {
      convertToBrokenRing(player);
      msg(player, "§eYour NPC died for you. The Love Ring has broken.");
      openBrokenRingMenu(player);
    }
    return;
  }

  spawnAndBondNpc(player, false);
});

try {
  world.afterEvents.entityDie.subscribe((event) => {
    const dead = event.deadEntity;
    if (!dead || !isLoverNpcType(dead)) return;

    let owner;
    try { owner = getTrueOwner(dead); } catch (e) { owner = undefined; }

    let loc;
    let dim;
    try {
      loc = dead.location;
      dim = dead.dimension;
    } catch (e) {
      loc = undefined;
      dim = undefined;
    }

    if (owner) {
      try {
        setPlayerFlag(owner, HAS_NPC_PROPERTY, true);
        setPlayerFlag(owner, NPC_ALIVE_PROPERTY, false);
        setPlayerString(owner, NPC_LAST_MODE_PROPERTY, getModeValue(dead));
        setPlayerNumber(owner, NPC_OUTFIT_PROPERTY, safeGetProperty(dead, "quan:outfit", getPlayerNumber(owner, NPC_OUTFIT_PROPERTY, 0)));
        if (loc) {
          setPlayerString(owner, NPC_DEATH_DIM_PROPERTY, dim ? dim.id : "overworld");
          setPlayerNumber(owner, NPC_DEATH_X_PROPERTY, Math.floor(loc.x));
          setPlayerNumber(owner, NPC_DEATH_Y_PROPERTY, Math.floor(loc.y));
          setPlayerNumber(owner, NPC_DEATH_Z_PROPERTY, Math.floor(loc.z));
        }
        removeEverySoulRing(owner);
        const returned = giveItem(owner, BROKEN_RING_ID, 1);
        if (returned) {
          msg(owner, "§cWaifu NPC has died. The Broken Love Ring has returned to you. Use 20 diamonds to revive her.");
        } else {
          msg(owner, "§cWaifu NPC has died, but the Broken Love Ring could not be returned. Use Creative/commands to recover quan:broken_love_ring.");
        }
      } catch (e) {}
    }

    if (dim && loc) {
      // If an owner is found, the Broken Love Ring returns directly to the owner instead of dropping at the NPC death location.
      // Fallback drop is only used when the owner cannot be resolved.
      if (!owner) trySpawnItem(dim, BROKEN_RING_ID, 1, { x: loc.x, y: loc.y + 0.25, z: loc.z });
      try { dim.runCommandAsync(`particle minecraft:heart_particle ${loc.x} ${loc.y + 1.2} ${loc.z}`); } catch (e) {}
    } else if (owner && countItems(owner, BROKEN_RING_ID) <= 0) {
      giveItem(owner, BROKEN_RING_ID, 1);
    }
  });
} catch (e) {}


world.afterEvents.playerSpawn.subscribe((event) => {
  const player = event.player;
  if (!player) return;

  system.runTimeout(() => {
    ensureStarterRing(player);
  }, 20);
});

function updateActiveNpcCarries() {
  const now = tickNow();

  // Hug / kiss: keep the pair aligned while the synchronized animation is playing.
  for (const [playerId, state] of activePairInteractions) {
    let player;
    let npc;
    try { player = world.getPlayers().find((p) => p.id === playerId); } catch (e) { player = undefined; }
    if (!player) { activePairInteractions.delete(playerId); continue; }
    try { npc = player.dimension.getEntities({ type: NPC_ID }).find((e) => e.id === state.npcId); } catch (e) { npc = undefined; }

    if (!npc || !npc.isValid || now >= state.until) {
      stopPairInteraction(player, npc);
      continue;
    }

    if (safeGetProperty(npc, state.type === "hug" ? "quan:is_hugging" : "quan:is_kissing", false) !== true) {
      stopPairInteraction(player, npc);
      continue;
    }

    positionInteractionNpc(player, npc, state.type);
  }

  // Carry: keep the chibi at chest height and keep the player's holding pose alive.
  for (const [playerId, npcId] of activeCarryTargets) {
    let player;
    let npc;
    try { player = world.getPlayers().find((p) => p.id === playerId); } catch (e) { player = undefined; }
    if (!player) { activeCarryTargets.delete(playerId); continue; }
    try { npc = player.dimension.getEntities({ type: NPC_ID }).find((e) => e.id === npcId); } catch (e) { npc = undefined; }
    if (!npc || !npc.isValid) {
      activeCarryTargets.delete(playerId);
      continue;
    }
    if (safeGetProperty(npc, "quan:is_carrying", false) !== true) {
      activeCarryTargets.delete(playerId);
      try { playPlayerInteractionAnimation(player, "reset"); } catch (e) {}
      continue;
    }

    positionInteractionNpc(player, npc, "carry");
    try { npc.setProperty("quan:is_moving", false); } catch (e) {}
    try { npc.setProperty("quan:is_carrying", true); } catch (e) {}
    try { npc.setProperty("quan:is_sitting", false); } catch (e) {}
    try { npc.setProperty("quan:is_sleeping", false); } catch (e) {}
    // Keep it in stay mode so movement AI does not fight the teleport
    try {
      if (!npc.hasTag("lover_mode_stay")) {
        npc.triggerEvent("quan:set_stay");
        npc.addTag("lover_mode_stay");
      }
    } catch (e) {}

    // Re-issue the looped player pose occasionally in case vanilla movement replaced it.
    if (now % 8 === 0) {
      playPlayerInteractionAnimation(player, "carry");
    }
  }
}

function updateNpcMovingProperties() {
  const aliveKeys = new Set();

  for (const dimensionId of ["overworld", "nether", "the_end"]) {
    let dimension;

    try {
      dimension = world.getDimension(dimensionId);
    } catch (e) {
      continue;
    }

    for (const npc of dimension.getEntities({ type: NPC_ID })) {
      const key = npc.id;
      aliveKeys.add(key);

      const loc = npc.location;
      const prev = lastNpcLocations.get(key);
      let moving = false;

      if (prev && prev.dimensionId === dimensionId) {
        const dx = loc.x - prev.x;
        const dy = loc.y - prev.y;
        const dz = loc.z - prev.z;
        moving = (dx * dx + dy * dy + dz * dz) > MOVE_EPSILON_SQ;
      }

      const lockedPose =
        safeGetProperty(npc, "quan:is_sitting", false) === true ||
        safeGetProperty(npc, "quan:is_sleeping", false) === true ||
        safeGetProperty(npc, "quan:is_hugging", false) === true ||
        safeGetProperty(npc, "quan:is_kissing", false) === true ||
        safeGetProperty(npc, "quan:is_carrying", false) === true ||
        safeGetProperty(npc, "quan:is_dancing", false) === true ||
        safeGetProperty(npc, "quan:is_heart", false) === true;

      safeSetProperty(npc, "quan:is_moving", lockedPose ? false : moving);

      lastNpcLocations.set(key, {
        dimensionId,
        x: loc.x,
        y: loc.y,
        z: loc.z
      });
    }
  }

  for (const key of lastNpcLocations.keys()) {
    if (!aliveKeys.has(key)) {
      lastNpcLocations.delete(key);
    }
  }
}

function rescueFarNpc() {
  for (const dimensionId of ["overworld", "nether", "the_end"]) {
    let dimension;

    try {
      dimension = world.getDimension(dimensionId);
    } catch (e) {
      continue;
    }

    for (const npc of dimension.getEntities({ type: NPC_ID })) {
      if (isPassivePose(npc)) continue;

      const owner = getTrueOwner(npc);
      if (!owner) continue;

      try {
        if (owner.dimension.id !== npc.dimension.id) continue;
      } catch (e) {
        continue;
      }

      const dx = owner.location.x - npc.location.x;
      const dy = owner.location.y - npc.location.y;
      const dz = owner.location.z - npc.location.z;
      const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);

      if (safeGetProperty(npc, "quan:is_carrying", false) === true) continue;
       if (distance < RESCUE_DISTANCE) continue;

      if (safeGetProperty(npc, "quan:is_carrying", false) === true) continue;
        try {
        npc.teleport(
          {
            x: owner.location.x + 1,
            y: owner.location.y,
            z: owner.location.z + 1
          },
          {
            dimension: owner.dimension
          }
        );

        spawnLoveParticles(npc, 3);
      } catch (e) {}
    }
  }
}

function distanceBetween(a, b) {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  const dz = a.z - b.z;
  return Math.sqrt(dx * dx + dy * dy + dz * dz);
}

function findNearbyMonsters(dimension, location, radius) {
  try {
    return dimension.getEntities({ location, maxDistance: radius, families: ["monster"] });
  } catch (e) {
    return [];
  }
}

function maybeAutoHeal(owner, npc, affection) {
  if (affection < 140) return;

  let current = 20;
  let max = 20;

  try {
    const health = owner.getComponent("minecraft:health");
    current = health.currentValue ?? 20;
    max = health.effectiveMax ?? 20;
  } catch (e) {
    return;
  }

  if (current > Math.max(8, max * 0.35)) return;

  const now = tickNow();
  const lastTick = lastAutoHealTick.get(owner.id) ?? -999999;
  if (now - lastTick < AUTO_HEAL_COOLDOWN_TICKS) return;

  lastAutoHealTick.set(owner.id, now);
  healPlayer(owner, affection, false);
  spawnLoveParticles(npc, 4);
}


function getScriptAttackDamage(tier) {
  return getUnarmedNpcDamage(tier);
}

function getScriptAttackCooldown(tier) {
  if (tier >= 3) return 18;
  if (tier >= 2) return 24;
  return 30;
}

function addTargetCandidate(list, seen, entity) {
  if (!isAllowedAssistTarget(entity)) return;
  try {
    if (seen.has(entity.id)) return;
    seen.add(entity.id);
    list.push(entity);
  } catch (e) {}
}

function findBestCombatTarget(owner, npc, radius = 9) {
  const now = tickNow();
  const cacheKey = npc?.id ?? "";
  const cached = cacheKey ? combatTargetCache.get(cacheKey) : undefined;

  if (cached && (now - cached.tick) < 12) {
    try {
      const target = cached.target;
      if (isAllowedAssistTarget(target)) {
        const dOwner = distanceBetween(owner.location, target.location);
        const dNpc = distanceBetween(npc.location, target.location);
        if (dOwner <= TARGET_ASSIST_MAX_OWNER_DISTANCE || dNpc <= Math.max(radius, TARGET_ASSIST_MAX_NPC_DISTANCE)) {
          return target;
        }
      }
    } catch (e) {}
  }

  const candidates = [];
  const seen = new Set();

  const lockedTarget = getLockedAssistTarget(owner);
  if (lockedTarget) {
    try {
      const dOwner = distanceBetween(owner.location, lockedTarget.location);
      const dNpc = distanceBetween(npc.location, lockedTarget.location);
      if (dOwner <= TARGET_ASSIST_MAX_OWNER_DISTANCE && dNpc <= TARGET_ASSIST_MAX_NPC_DISTANCE) {
        addTargetCandidate(candidates, seen, lockedTarget);
      }
    } catch (e) {}
  }

  try {
    const ownerMobs = owner.dimension.getEntities({ location: owner.location, maxDistance: radius, families: ["monster"] });
    for (const mob of ownerMobs) addTargetCandidate(candidates, seen, mob);
  } catch (e) {}

  try {
    const npcMobs = npc.dimension.getEntities({ location: npc.location, maxDistance: radius, families: ["monster"] });
    for (const mob of npcMobs) addTargetCandidate(candidates, seen, mob);
  } catch (e) {}

  let best;
  let bestScore = 999999;
  for (const target of candidates) {
    try {
      const dOwner = distanceBetween(owner.location, target.location);
      const dNpc = distanceBetween(npc.location, target.location);
      if (dOwner > TARGET_ASSIST_MAX_OWNER_DISTANCE && dNpc > radius) continue;
      const lockedBonus = lockedTarget && lockedTarget.id === target.id ? -100 : 0;
      const score = dNpc * 1.2 + dOwner * 0.8 + lockedBonus;
      if (score < bestScore) {
        best = target;
        bestScore = score;
      }
    } catch (e) {}
  }

  if (cacheKey) {
    if (best) combatTargetCache.set(cacheKey, { target: best, tick: now });
    else combatTargetCache.set(cacheKey, { target: undefined, tick: now });
  }

  return best;
}

function getNpcRangedWeaponId(player, npc = undefined) {
  const id = String(getMainhandItemId(player, npc) ?? "");
  if (id.includes("bow") || id.includes("crossbow")) return id;
  return "";
}

function getBowAttackDamage(tier, weaponId, owner = undefined, npc = undefined) {
  if (owner) return getEquipmentCombatStats(owner, getAffection(owner), npc).rangedDamage;
  const base = getRangedWeaponBaseDamageFromId(weaponId);
  return base + getBondDamageBonusFromTier(tier);
}

function getBowAttackCooldown(tier, weaponId, owner = undefined, npc = undefined) {
  if (owner) {
    const stats = getEquipmentCombatStats(owner, getAffection(owner), npc);
    if (stats.rangedCooldown > 0) return stats.rangedCooldown;
  }
  let cooldown = 36;
  if (tier >= 3) cooldown = 24;
  else if (tier >= 2) cooldown = 30;
  if (String(weaponId ?? "").includes("crossbow")) cooldown += 6;
  return cooldown;
}

function spawnBowShotEffects(npc, target) {
  try { npc.teleport(npc.location, { dimension: npc.dimension, facingLocation: target.location }); } catch (e) {}
  try { run(npc, "playsound random.bow @a[r=28] ~ ~ ~ 1 1.1"); } catch (e) {}

  try {
    const start = { x: npc.location.x, y: npc.location.y + 1.35, z: npc.location.z };
    const end = { x: target.location.x, y: target.location.y + 1.0, z: target.location.z };
    for (const t of [0.18, 0.36, 0.54, 0.72, 0.90]) {
      npc.dimension.spawnParticle("minecraft:critical_hit_emitter", {
        x: start.x + (end.x - start.x) * t,
        y: start.y + (end.y - start.y) * t,
        z: start.z + (end.z - start.z) * t
      });
    }
    npc.dimension.spawnParticle("minecraft:basic_crit_particle", end);
  } catch (e) {
    try {
      npc.dimension.spawnParticle("minecraft:critical_hit_emitter", {
        x: target.location.x,
        y: target.location.y + 1,
        z: target.location.z
      });
    } catch (e2) {}
  }
}


function triggerFoxRiderAttackAnimV307(npc) {
  try {
    if (!isFoxRiderOutfitV3032(npc)) return;
    if (isPassivePose(npc)) return;

    // v3.0.9: dĂ¹ng attack_phase 1/2 Ä‘á»ƒ Ă©p client vĂ o state attack má»›i má»—i láº§n Ä‘Ă¡nh.
    const key = npc.id ?? "fox_rider";
    const lastPhase = lastFoxRiderAttackPhaseV309.get(key) === 1 ? 1 : 2;
    const nextPhase = lastPhase === 1 ? 2 : 1;
    lastFoxRiderAttackPhaseV309.set(key, nextPhase);

    try { npc.setProperty("quan:is_attacking", false); } catch (e) {}
    try { npc.setProperty("quan:attack_phase", 0); } catch (e) {}

    system.runTimeout(() => {
      try {
        if (!npc || npc.isValid === false) return;
        npc.setProperty("quan:attack_phase", nextPhase);
      } catch (e) {}
    }, 1);

    system.runTimeout(() => {
      try {
        if (!npc || npc.isValid === false) return;
        if (Number(safeGetProperty(npc, "quan:attack_phase", 0)) === nextPhase) {
          npc.setProperty("quan:attack_phase", 0);
        }
      } catch (e) {}
    }, 18);
  } catch (e) {}
}

function scriptBowAttack(owner, npc, target, tier, weaponId) {
  const damage = Math.max(1, getBowAttackDamage(tier, weaponId, owner, npc));
  spawnBowShotEffects(npc, target);

  // v22X: dĂ¹ng entityAttack Ä‘á»ƒ trĂ¡nh má»™t sá»‘ báº£n Bedrock bá» qua projectile damage tá»« custom entity.
  try {
    target.applyDamage(damage, {
      cause: EntityDamageCause.entityAttack,
      damagingEntity: npc
    });
  } catch (e) {
    try { target.applyDamage(damage); } catch (e2) {}
  }

  return true;
}

function scriptAssistAttack(owner, npc, affection) {
  const tier = getGuardTier(affection);
  if (tier <= 0) return;
  if (isPassivePose(npc)) return;

  const rangedWeaponId = getNpcRangedWeaponId(owner, npc);
  const target = findBestCombatTarget(owner, npc, rangedWeaponId ? BOW_TARGET_SEARCH_RADIUS : 10);
  if (!target) return;

  const now = tickNow();
  const key = npc.id;
  const lastTick = lastScriptAttackTick.get(key) ?? -999999;
  const stats = getEquipmentCombatStats(owner, affection, npc);
  const cooldown = rangedWeaponId
    ? getBowAttackCooldown(tier, rangedWeaponId, owner, npc)
    : Math.max(12, stats.meleeCooldown);
  if (now - lastTick < cooldown) return;

  let dOwner = 999;
  let dNpc = 999;
  try {
    dOwner = distanceBetween(owner.location, target.location);
    dNpc = distanceBetween(npc.location, target.location);
  } catch (e) {}

  const lockedTarget = getLockedAssistTarget(owner);
  const isLockedTarget = lockedTarget && lockedTarget.id === target.id;

  if (!isLockedTarget) {
    if (rangedWeaponId) {
      if (dOwner > TARGET_ASSIST_MAX_OWNER_DISTANCE && dNpc > BOW_MAX_DISTANCE) return;
    } else if (dOwner > 6.5 && dNpc > 3.2) return;
  }
  if (isLockedTarget && (dOwner > TARGET_ASSIST_MAX_OWNER_DISTANCE || dNpc > TARGET_ASSIST_MAX_NPC_DISTANCE)) return;

  const attackReach = rangedWeaponId ? BOW_MAX_DISTANCE : TARGET_ASSIST_STRIKE_DISTANCE;
  if (dNpc > attackReach) {
    const lastNudge = lastTargetAssistNudgeTick.get(key) ?? -999999;
    if (now - lastNudge >= TARGET_ASSIST_NUDGE_COOLDOWN_TICKS) {
      lastTargetAssistNudgeTick.set(key, now);
      try {
        if (dNpc > 12 && dOwner <= 10) {
          const dx = target.location.x - owner.location.x;
          const dz = target.location.z - owner.location.z;
          const len = Math.max(0.1, Math.sqrt(dx * dx + dz * dz));
          npc.teleport(
            {
              x: owner.location.x + (dx / len) * 1.8,
              y: owner.location.y,
              z: owner.location.z + (dz / len) * 1.8
            },
            { dimension: owner.dimension, facingLocation: target.location }
          );
        } else {
          npc.teleport(npc.location, { dimension: npc.dimension, facingLocation: target.location });
        }
      } catch (e) {}
    }
    return;
  }

  if (rangedWeaponId && dNpc >= BOW_MIN_DISTANCE && dNpc <= BOW_MAX_DISTANCE) {
    lastScriptAttackTick.set(key, now);
    triggerFoxRiderAttackAnimV307(npc);
    scriptBowAttack(owner, npc, target, tier, rangedWeaponId);
    return;
  }

  lastScriptAttackTick.set(key, now);
  triggerFoxRiderAttackAnimV307(npc);
  const damage = Math.max(1, stats.meleeDamage);

  try {
    target.applyDamage(damage, {
      cause: EntityDamageCause.entityAttack,
      damagingEntity: npc
    });
  } catch (e) {
    try { target.applyDamage(damage); } catch (e2) {}
  }

  try {
    npc.teleport(npc.location, { dimension: npc.dimension, facingLocation: target.location });
  } catch (e) {}

  try {
    npc.dimension.spawnParticle("minecraft:critical_hit_emitter", {
      x: target.location.x,
      y: target.location.y + 1,
      z: target.location.z
    });
  } catch (e) {}
}

function handleNpcArmorDamageReduction(npc, event) {
  if (!npc || npc.typeId !== NPC_ID) return;
  const owner = getTrueOwner(npc);
  if (!owner) return;

  const reduction = getNpcArmorReduction(owner);
  if (reduction <= 0) return;

  let damage = 0;
  try { damage = Number(event.damage ?? 0); } catch (e) { damage = 0; }
  if (!(damage > 0)) return;

  const refund = Math.max(0, damage * reduction);
  if (refund <= 0) return;

  system.runTimeout(() => {
    if (!isValidEntity(npc)) return;
    healEntityAmount(npc, refund);
    try {
      npc.dimension.spawnParticle("minecraft:villager_happy", {
        x: npc.location.x,
        y: npc.location.y + 1.1,
        z: npc.location.z
      });
    } catch (e) {}
  }, 1);
}

function setActionbar(player, text) {
  try {
    player.onScreenDisplay.setActionBar(text);
    return true;
  } catch (e) {
    try { player.runCommandAsync(`title @s actionbar ${text}`); return true; } catch (e2) {}
  }
  return false;
}

function syncNpcHealthForAllLoaded() {
  for (const dimensionId of ["overworld", "nether", "the_end"]) {
    let dimension;
    try { dimension = world.getDimension(dimensionId); } catch (e) { continue; }
    let npcs = [];
    try { npcs = getOwnedNpcsInDimensionV31(dimension); } catch (e) { continue; }
    for (const npc of npcs) {
      const owner = getTrueOwner(npc);
      if (!owner) continue;
      applyNpcHealthScale(npc, owner);
      handleNpcHealthReactiveChatV53(npc, owner);
    }
  }
}

function updateNearbyNpcActionbar() {
  let players = [];
  try { players = world.getPlayers(); } catch (e) { return; }

  for (const player of players) {
    const npc = findOwnedNpc(player, NPC_ACTIONBAR_DISTANCE);
    if (!npc) continue;

    try {
      if (npc.dimension.id !== player.dimension.id) continue;
      const distance = distanceBetween(player.location, npc.location);
      if (distance > NPC_ACTIONBAR_DISTANCE) continue;
    } catch (e) {
      continue;
    }

    const affection = getAffection(player);
    applyNpcHealthScale(npc, affection);
    const hp = getNpcHealthValues(npc);
    const mode = compactModeText(npc);
    const combat = isAutoCombatEnabled(player) && isTargetAssistEnabled(player) ? "§aGuard+assist" : isAutoCombatEnabled(player) ? "§aGuard" : isTargetAssistEnabled(player) ? "§aAssist" : "§cOff";
    const text = `§dWaifu NPC §8| §cHP ${hpHearts(hp.current, hp.max)} §f${hp.current}/${hp.max} §8| §dBond ${affection}/${AFFECTION_MAX} §8| §e${mode} §8| ${combat}`;
    setActionbar(player, text);
  }
}

function protectOwnerAndAutoGift() {
  for (const dimensionId of ["overworld", "nether", "the_end"]) {
    let dimension;

    try {
      dimension = world.getDimension(dimensionId);
    } catch (e) {
      continue;
    }

    for (const npc of dimension.getEntities({ type: NPC_ID })) {
      const owner = getTrueOwner(npc);
      if (!owner) continue;

      try {
        if (owner.dimension.id !== npc.dimension.id) continue;
      } catch (e) {
        continue;
      }

      const distance = distanceBetween(owner.location, npc.location);
      const affection = getAffection(owner);
      updateAutoRoamWhileFollowing(npc, owner, distance);

      if (affection < UNLOCK_GUARD && hasTag(npc, "lover_mode_guard")) {
        setMode(npc, "follow");
        triggerNpcEvent(npc, "quan:guard_power_0");
      }

      // Follow counts as protect: no need to switch to Guard / Auto combat menu
      const followOrGuard = hasTag(npc, "lover_mode_guard") || hasTag(npc, "lover_mode_follow") || hasTag(npc, AUTO_ROAM_TAG);
      const combatAllowed = isAutoCombatEnabled(owner) || hasTag(npc, "lover_mode_follow") || hasTag(npc, "lover_mode_guard");
      if (combatAllowed && affection >= UNLOCK_GUARD && distance <= 16 && !isPassivePose(npc)) {
        const monsters = findNearbyMonsters(owner.dimension, owner.location, 10);
        const shouldGuard = followOrGuard;

        if (monsters.length > 0 && shouldGuard) {
          if (!hasTag(npc, "lover_mode_guard")) {
            setMode(npc, "guard");
            const now = tickNow();
            const lastMsg = lastCombatMsgTick.get(owner.id) ?? -999999;
            if (now - lastMsg > 600) {
              lastCombatMsgTick.set(owner.id, now);
              msg(owner, "§dNPC detected monsters near you and switched to guard mode.");
            }
          }
        }
      }

      if (hasTag(npc, "lover_mode_guard") && affection >= UNLOCK_GUARD && distance <= 18) {
        const tier = applyGuardPower(npc, owner);
        applyNpcEquipment(npc, owner);
        applyEquipmentDefense(npc, owner);

        run(npc, "effect @e[family=monster,r=8] slowness 2 1 true");
        if (tier >= 2) run(npc, "effect @e[family=monster,r=8] weakness 2 0 true");

        if (tier === 1) {
          run(npc, "effect @s resistance 6 0 true");
          run(npc, "effect @s regeneration 6 0 true");
        }
        if (tier === 2) {
          run(npc, "effect @s resistance 6 1 true");
          run(npc, "effect @s regeneration 6 0 true");
        }
        if (tier === 3) {
          run(npc, "effect @s resistance 6 1 true");
          run(npc, "effect @s regeneration 6 1 true");
        }
      }

      if (combatAllowed && followOrGuard && affection >= UNLOCK_GUARD && distance <= 18 && getNpcHunger(npc) > 4) {
        scriptAssistAttack(owner, npc, affection);
      }

      if (isAutoHealEnabled(owner)) maybeAutoHeal(owner, npc, affection);

      if (!isAutoGiftEnabled(owner) || affection < UNLOCK_AUTO_GIFT || distance > 8) continue;

      const now = tickNow();
      const lastTick = lastAutoGiftTick.get(npc.id) ?? 0;

      if (now - lastTick >= AUTO_GIFT_INTERVAL_TICKS) {
        lastAutoGiftTick.set(npc.id, now);
        if (Math.random() < 0.25) {
          giveGiftToPlayer(owner, affection, false);
          spawnLoveParticles(npc, 4);
        }
      }
    }
  }
}

function handleOwnerWasHurt(player) {
  const affection = getAffection(player);
  if (affection < UNLOCK_GUARD) return;
  // Allow protect on Follow even if Auto combat menu is Off

  let npcs = [];
  try {
    npcs = player.dimension.getEntities({ type: NPC_ID, location: player.location, maxDistance: 18 });
  } catch (e) {
    return;
  }

  for (const npc of npcs) {
    const owner = getTrueOwner(npc);
    if (!owner || owner.id !== player.id) continue;
    if (isPassivePose(npc)) continue;

    setMode(npc, "guard");
    applyGuardPower(npc, player);
    system.runTimeout(() => scriptAssistAttack(player, npc, affection), 2);

    const now = tickNow();
    const lastMsg = lastCombatMsgTick.get(player.id) ?? -999999;
    if (now - lastMsg > 600) {
      lastCombatMsgTick.set(player.id, now);
      msg(player, "§dNPC saw you being attacked and entered guard mode!");
    }
  }
}

function handleOwnerAttackedMob(player, target) {
  if (!player || !target) return;
  if (player.typeId !== "minecraft:player") return;
  if (target.typeId === "minecraft:player") return;

  if (!lockTargetAssist(player, target)) return;

  const affection = getAffection(player);
  const npc = findOwnedNpc(player, 32);
  if (npc) {
    system.runTimeout(() => scriptAssistAttack(player, npc, affection), 1);
    system.runTimeout(() => scriptAssistAttack(player, npc, affection), 12);
  }
}


function isOwnLoverNpc(player, npc) {
  if (!player || !npc || !isLoverNpcType(npc)) return false;
  try {
    const owner = getTrueOwner(npc);
    if (owner && owner.id === player.id) return true;
  } catch (e) {}
  try {
    if (hasTag(npc, ownerTagForPlayer(player))) return true;
  } catch (e) {}
  return false;
}

function isRestOrSleep(npc) {
  return hasTag(npc, "lover_mode_sleep") || hasTag(npc, "lover_mode_rest");
}

function isPassivePose(npc) {
  // Include property flags — sleep/sit can be set without matching tags (Ribbuny path)
  try {
    if (safeGetProperty(npc, "quan:is_sleeping", false) === true) return true;
    if (safeGetProperty(npc, "quan:is_sitting", false) === true) return true;
    if (safeGetProperty(npc, "quan:is_carrying", false) === true) return true;
  } catch (e) {}
  return hasTag(npc, "lover_mode_sit") || isRestOrSleep(npc);
}

function isLowPoseNpc(npc) {
  return isRestOrSleep(npc) || hasTag(npc, "lover_mode_crawl");
}

function handleLowPoseOwnerTapFallback(player, npc) {
  if (!isOwnLoverNpc(player, npc)) return false;
  if (!isLowPoseNpc(npc)) return false;

  // Fallback phá»¥: náº¿u ngÆ°á»i chÆ¡i váº«n Ä‘Ă¡nh nháº§m NPC khi Ä‘ang náº±m/bĂ², má»Ÿ menu vĂ  há»“i láº¡i mĂ¡u.
  // v19.6: náº¿u báº¥m trá»±c tiáº¿p khĂ´ng trĂºng, dĂ¹ng Ä‘iá»ƒm cháº¡m phĂ­a trĂªn NPC hoáº·c Bonded Ring.
  try { run(npc, "effect @s instant_health 1 1 true"); } catch (e) {}
  system.runTimeout(() => openLoverMenu(player, npc), 1);
  return true;
}

function getOwnerTags(entity) {
  try {
    return entity.getTags().filter((tag) => tag.startsWith("lover_owner_"));
  } catch (e) {
    return [];
  }
}

function proxyLocationForNpc(npc) {
  const loc = npc.location;
  // v19.6: Ä‘iá»ƒm cháº¡m Ä‘Æ°á»£c Ä‘áº·t cao hÆ¡n Ä‘áº§u NPC, khĂ´ng náº±m á»Ÿ vĂ¹ng ngÆ°á»i chÆ¡i Ä‘i qua.
  // Proxy chá»‰ Ä‘á»ƒ má»Ÿ menu, tuyá»‡t Ä‘á»‘i khĂ´ng dĂ¹ng Ä‘á»ƒ kĂ©o/Ä‘á»“ng bá»™ vá»‹ trĂ­ NPC.
  return { x: loc.x, y: loc.y + 1.95, z: loc.z };
}

function removeEntitySafe(entity) {
  try { entity.remove(); } catch (e) {}
}

function syncLowPoseInteractionProxies() {
  for (const dimensionId of ["overworld", "nether", "the_end"]) {
    let dimension;
    try { dimension = world.getDimension(dimensionId); } catch (e) { continue; }

    let npcs = [];
    let proxies = [];
    try { npcs = dimension.getEntities({ type: NPC_ID }); } catch (e) { npcs = []; }
    try { proxies = dimension.getEntities({ type: PROXY_ID }); } catch (e) { proxies = []; }

    const requiredOwnerTags = new Set();

    for (const npc of npcs) {
      if (!isLowPoseNpc(npc)) continue;

      const ownerTags = getOwnerTags(npc);
      if (ownerTags.length === 0) continue;
      const ownerTag = ownerTags[0];
      requiredOwnerTags.add(ownerTag);

      const desired = proxyLocationForNpc(npc);
      let proxy;
      for (const candidate of proxies) {
        if (!hasTag(candidate, ownerTag)) continue;
        if (!hasTag(candidate, "lover_pose_proxy")) continue;
        proxy = candidate;
        break;
      }

      if (!proxy) {
        try {
          proxy = dimension.spawnEntity(PROXY_ID, desired);
          addTag(proxy, "lover_pose_proxy");
          addTag(proxy, ownerTag);
          proxy.nameTag = "";
        } catch (e) {
          continue;
        }
      }

      try {
        proxy.teleport(desired, { dimension });
      } catch (e) {}
    }

    for (const proxy of proxies) {
      if (!hasTag(proxy, "lover_pose_proxy")) continue;
      const ownerTags = getOwnerTags(proxy);
      let keep = false;
      for (const tag of ownerTags) {
        if (requiredOwnerTags.has(tag)) { keep = true; break; }
      }
      if (!keep) removeEntitySafe(proxy);
    }
  }
}

try {
  world.afterEvents.entityHurt.subscribe((event) => {
    const hurt = event.hurtEntity;
    if (!hurt) return;

    if (isLoverNpcType(hurt)) {
      const owner = getTrueOwner(hurt);
      playLoverVoice(hurt, owner, "hurt", 1.0, 1.0);
      handleNpcReactiveHurtChatV53(hurt, event);
      // TNT warning when hit by player (restored)
      try {
        const atk = event.damageSource && event.damageSource.damagingEntity;
        if (atk && atk.typeId === "minecraft:player") {
          const loc = hurt.location;
          hurt.dimension.spawnEntity("minecraft:tnt", { x: loc.x, y: loc.y, z: loc.z });
          try { atk.sendMessage("§cя тебя предупреждала не бить меня"); } catch (e2) {}
        }
      } catch (e3) {}
    }

    if (hurt.typeId === "minecraft:player") {
      handleOwnerWasHurt(hurt);
      return;
    }

    if (isLoverNpcType(hurt)) {
      handleNpcArmorDamageReduction(hurt, event);
    }

    let attacker;
    try { attacker = event.damageSource?.damagingEntity; } catch (e) { attacker = undefined; }
    if (attacker && attacker.typeId === "minecraft:player") {
      if (isLoverNpcType(hurt) && handleLowPoseOwnerTapFallback(attacker, hurt)) return;
      handleOwnerAttackedMob(attacker, hurt);
    }
  });
} catch (e) {}


function healEntityAmount(entity, amount) {
  try {
    const health = entity.getComponent("minecraft:health");
    if (!health) return false;
    const max = health.effectiveMax ?? health.defaultValue ?? health.currentValue ?? 20;
    health.setCurrentValue(Math.min(max, (health.currentValue ?? max) + amount));
    return true;
  } catch (e) {
    return false;
  }
}

function spawnRestParticles(npc, strong = false) {
  let dim, loc;
  try { dim = npc.dimension; loc = npc.location; } catch (e) { return; }
  const y = strong ? 1.4 : 1.05;
  const pos = { x: loc.x + (Math.random() - 0.5) * 0.8, y: loc.y + y, z: loc.z + (Math.random() - 0.5) * 0.8 };
  try { dim.spawnParticle(strong ? "minecraft:heart_particle" : "minecraft:villager_happy", pos); } catch (e) {}
  try { dim.spawnParticle("minecraft:basic_smoke_particle", { x: pos.x, y: pos.y + 0.15, z: pos.z }); } catch (e) {}
}

function wakeForDanger(npc, owner, affection) {
  if (affection < UNLOCK_GUARD || !isAutoCombatEnabled(owner)) return false;
  let monsters = [];
  try { monsters = findNearbyMonsters(owner.dimension, owner.location, 6); } catch (e) { monsters = []; }
  if (!monsters || monsters.length <= 0) return false;
  setOwnedMode(npc, owner, "guard");
  msg(owner, "§cDanger nearby. NPC woke up.");
  return true;
}

function restAndSleepTick() {
  for (const player of world.getPlayers()) {
    const npc = findOwnedNpc(player, 48);
    if (!npc) continue;
    const resting = hasTag(npc, "lover_mode_rest");
    const sleeping = hasTag(npc, "lover_mode_sleep");
    if (!resting && !sleeping) continue;

    const affection = getAffection(player);
    try { applyNpcHealthScale(npc, player); } catch (e) {} // v31.1 rest/sleep hp scale
    const dist = distanceBetween(player.location, npc.location);

    // v19.6: khi ngá»§/nghá»‰, NPC giá»¯ nguyĂªn hÆ°á»›ng náº±m.
    // None teleport facingLocation ná»¯a Ä‘á»ƒ trĂ¡nh xoay ngÆ°á»i khi Ä‘ang náº±m.

    if (wakeForDanger(npc, player, affection)) continue;

    const npcHeal = sleeping ? (affection >= 220 ? 3 : 2) : 1;
    healEntityAmount(npc, npcHeal);

    if (dist <= 4 && affection >= (sleeping ? 180 : 150)) {
      healEntityAmount(player, 1);
      if (affection >= 220) {
        try { player.addEffect("regeneration", sleeping ? 5 * 20 : 3 * 20, { amplifier: 0, showParticles: false }); } catch (e) {}
      }
    }

    spawnRestParticles(npc, sleeping || affection >= 220);
    spawnSleepZzzParticlesV31(npc);

    if (dist <= 4 && affection >= 80) {
      const now = tickNow();
      const key = player.id;
      restBondNearTicks.set(key, (restBondNearTicks.get(key) ?? 0) + REST_SLEEP_TICK_INTERVAL);
      const nearTicks = restBondNearTicks.get(key) ?? 0;
      const lastReward = lastRestBondRewardTick.get(key) ?? -999999;
      if (nearTicks >= 1200 && now - lastReward >= REST_BOND_REWARD_COOLDOWN_TICKS) {
        lastRestBondRewardTick.set(key, now);
        restBondNearTicks.set(key, 0);
        addAffection(player, 1, false);
        msg(player, "§dRest Bond +1");
      }
    }
  }
}

function syncNpcEquipmentForAllLoaded() {
  let players = [];
  try { players = world.getPlayers(); } catch (e) { return; }

  for (const player of players) {
    const npc = findOwnedNpc(player, 48);
    if (!npc) continue;
    try {
      if (npc.dimension.id !== player.dimension.id) continue;
    } catch (e) {
      continue;
    }
    try {
      if (isSleepNpcType(npc) || isFoxRiderOutfitV3032(npc)) {
        setEntityEquipmentDetailed(npc, "mainhand", undefined);
        setEntityEquipmentDetailed(npc, "offhand", undefined);
        if (!isSleepNpcType(npc)) {
          // Skin 10: chá»‰ áº©n visual item; chá»‰ sá»‘/damage váº«n Ä‘á»c tá»« dá»¯ liá»‡u trang bá»‹ Ä‘Ă£ lÆ°u.
          applyNpcEquipmentDetailed(npc, player);
        }
      } else {
        applyNpcEquipment(npc, player);
      }
    } catch (e) {}
  }
}

function targetAssistCombatTick() {
  let players = [];
  try { players = world.getPlayers(); } catch (e) { return; }

  for (const player of players) {
    const target = getLockedAssistTarget(player);
    if (!target) continue;

    const affection = getAffection(player);
    if (affection < UNLOCK_GUARD || !isTargetAssistEnabled(player)) {
      clearLockedAssistTarget(player);
      continue;
    }

    const npc = findOwnedNpc(player, 32);
    if (!npc) continue;
    if (isPassivePose(npc)) continue;

    try {
      if (npc.dimension.id !== player.dimension.id) continue;
    } catch (e) {
      continue;
    }

    if (!hasTag(npc, "lover_mode_guard")) {
      setMode(npc, "guard");
      setModeTag(npc, "guard");
    }

    applyGuardPower(npc, player);
    scriptAssistAttack(player, npc, affection);
  }
}

system.runTimeout(() => {
  ensureScoreboard();
}, 1);


function freeIdleVoiceTick() {
  for (const player of world.getPlayers()) {
    const npc = findOwnedNpc(player, 16);
    if (!npc) continue;

    // Chá»‰ phĂ¡t khi NPC á»Ÿ cháº¿ Ä‘á»™ Tá»± do.
    if (!hasTag(npc, "lover_mode_idle")) continue;

    // None phĂ¡t khi sleeping/nghá»‰/ngá»“i hoáº·c Ä‘ang emote.
    if (hasTag(npc, "lover_mode_sleep") || hasTag(npc, "lover_mode_rest")) continue;
    if (safeGetProperty(npc, "quan:is_sleeping", false) === true) continue;
    if (safeGetProperty(npc, "quan:is_sitting", false) === true) continue;
    if (safeGetProperty(npc, "quan:is_hugging", false) === true) continue;
    if (safeGetProperty(npc, "quan:is_dancing", false) === true) continue;

    // Dá»… nghe hÆ¡n báº£n trÆ°á»›c: kiá»ƒm tra má»—i 5 giĂ¢y, 50% cÆ¡ há»™i.
    if (Math.random() > 0.5) continue;

    playLoverVoice(npc, player, "free_idle", 1.0, 1.0);
  }
}


function getDistanceSqV52(a, b) {
  try {
    const dx = (a.location?.x ?? 0) - (b.location?.x ?? 0);
    const dy = (a.location?.y ?? 0) - (b.location?.y ?? 0);
    const dz = (a.location?.z ?? 0) - (b.location?.z ?? 0);
    return dx * dx + dy * dy + dz * dz;
  } catch (e) {}
  return 999999;
}


function getReactiveNpcOwnerV53(npc) {
  try {
    const owner = getTrueOwner(npc);
    if (owner) return owner;
  } catch (e) {}
  try {
    const nearest = getNearestPlayerForNpcV24(npc);
    if (nearest?.player && nearest.distSq <= 1024) return nearest.player;
  } catch (e) {}
  return undefined;
}

function npcAutoChatV53(owner, npc, key, lines, cooldownTicks = REACTIVE_CHAT_COOLDOWN_TICKS) {
  if (!owner || !npc || !lines || lines.length <= 0) return false;
  const now = tickNow();
  const id = `${npc.id}:${key}`;
  const last = lastReactiveChatTick.get(id) ?? -999999;
  if (now - last < cooldownTicks) return false;
  lastReactiveChatTick.set(id, now);
  msg(owner, pickLine(lines));
  return true;
}

function getNpcReactiveNameV53(owner) {
  return getNpcDisplayName(owner);
}

function handleNpcReactiveHurtChatV53(npc, event) {
  if (!isLoverNpcType(npc)) return;
  const owner = getReactiveNpcOwnerV53(npc);
  if (!owner) return;
  const name = getNpcReactiveNameV53(owner);
  let attacker;
  try { attacker = event.damageSource?.damagingEntity; } catch (e) { attacker = undefined; }

  if (attacker && attacker.typeId === "minecraft:player") {
    if (attacker.id === owner.id) {
      npcAutoChatV53(owner, npc, "hurt_owner", [
        `§d${name}: §fThat hurts...`,
        `§d${name}: §fWhy did you hit me?`,
        `§d${name}: §fI do not want you to hurt me.`,
        `§d${name}: §fPlease be a little more careful.`
      ], REACTIVE_CHAT_COOLDOWN_TICKS);
    } else {
      npcAutoChatV53(owner, npc, "hurt_other_player", [
        `§d${name}: §cSomeone is attacking me!`,
        `§d${name}: §cDo not hurt me!`,
        `§d${name}: §fHelp me!`
      ], REACTIVE_CHAT_COOLDOWN_TICKS);
    }
    return;
  }

  if (attacker && attacker.typeId && attacker.typeId !== NPC_ID && attacker.typeId !== SLEEP_NPC_ID && attacker.typeId !== FOX_SLEEP_NPC_ID) {
    npcAutoChatV53(owner, npc, "hurt_mob", [
      `§d${name}: §cA monster is attacking me!`,
      `§d${name}: §eCareful, there is danger nearby!`,
      `§d${name}: §fI will protect myself.`,
      `§d${name}: §fWatch your back.`
    ], HURT_MOB_CHAT_COOLDOWN_TICKS);
  }
}

function handleNpcHealthReactiveChatV53(npc, owner) {
  if (!npc || !owner || !isLoverNpcType(npc)) return;
  try {
    if (safeGetProperty(npc, "quan:is_sleeping", false) === true || hasTag(npc, "lover_mode_sleep")) return;
  } catch (e) {}
  const hp = getNpcHealthValues(npc);
  if (!hp || hp.max <= 0) return;
  const ratio = hp.current / hp.max;
  const name = getNpcReactiveNameV53(owner);

  if (ratio <= 0.18) {
    npcAutoChatV53(owner, npc, "critical_hp", [
      `§d${name}: §cI cannot hold on much longer...`,
      `§d${name}: §cPlease do not let me fall...`,
      `§d${name}: §cI need healing now.`,
      `§d${name}: §fPlease help me...`
    ], CRITICAL_HP_CHAT_COOLDOWN_TICKS);
    return;
  }

  if (ratio <= 0.35) {
    npcAutoChatV53(owner, npc, "low_hp", [
      `§d${name}: §eI am hurt...`,
      `§d${name}: §eI need rest or healing.`,
      `§d${name}: §fI am okay, but it hurts a little.`,
      `§d${name}: §fPlease be more careful.`
    ], LOW_HP_CHAT_COOLDOWN_TICKS);
  }
}

function autoTalkTickV52() {
  const now = tickNow();
  for (const player of world.getPlayers()) {
    const npc = findOwnedNpc(player, 12);
    if (!npc) continue;
    if (safeGetProperty(npc, "quan:is_sleeping", false) === true || hasTag(npc, "lover_mode_sleep")) continue;

    const autoTalk = isAutoTalkEnabled(player);
    const cooldown = autoTalk ? AUTO_TALK_COOLDOWN_TICKS : AMBIENT_CHAT_COOLDOWN_TICKS;
    const chance = autoTalk ? 0.08 : 0.03;
    const last = lastAutoTalkTick.get(player.id) ?? -999999;
    if (now - last < cooldown) continue;
    if (Math.random() > chance) continue;

    lastAutoTalkTick.set(player.id, now);
    msg(player, getTalkLineByTopic(player, npc, "ambient"));
  }
}

function dailyScheduleTickV52() {
  const now = tickNow();
  for (const player of world.getPlayers()) {
    if (!isDailyScheduleEnabled(player)) continue;
    const npc = findOwnedNpc(player, 16);
    if (!npc) continue;
    if (getDistanceSqV52(player, npc) > 256) continue;
    const last = lastDailyScheduleTick.get(player.id) ?? -999999;
    if (now - last < DAILY_SCHEDULE_COOLDOWN_TICKS) continue;

    const schedule = getWorldScheduleName(player);
    const chance = (schedule === "night" || schedule === "evening") ? 0.22 : 0.08;
    if (Math.random() > chance) continue;

    lastDailyScheduleTick.set(player.id, now);
    msg(player, getTalkLineByTopic(player, npc, "schedule"));
  }
}

function getNearestPlayerForNpcV24(npc) {
  try {
    let best = undefined;
    let bestD = 999999;
    for (const player of world.getPlayers()) {
      if (player.dimension && npc.dimension && player.dimension.id !== npc.dimension.id) continue;
      const dx = (npc.location?.x ?? 0) - (player.location?.x ?? 0);
      const dy = (npc.location?.y ?? 0) - (player.location?.y ?? 0);
      const dz = (npc.location?.z ?? 0) - (player.location?.z ?? 0);
      const d = dx * dx + dy * dy + dz * dz;
      if (d < bestD) {
        bestD = d;
        best = player;
      }
    }
    return { player: best, distSq: bestD };
  } catch (e) {}
  return { player: undefined, distSq: 999999 };
}

function updateNpcRunAnimationStateV24(npc) {
  try {
    if (!npc || npc.typeId !== NPC_ID) return;

    if (safeGetProperty(npc, "quan:is_sitting", false) === true ||
        safeGetProperty(npc, "quan:is_sleeping", false) === true ||
        safeGetProperty(npc, "quan:is_hugging", false) === true ||
        safeGetProperty(npc, "quan:is_kissing", false) === true ||
        safeGetProperty(npc, "quan:is_carrying", false) === true ||
        safeGetProperty(npc, "quan:is_dancing", false) === true ||
        safeGetProperty(npc, "quan:is_heart", false) === true ||
        hasTag(npc, "lover_mode_sit") ||
        hasTag(npc, "lover_mode_sleep") ||
        hasTag(npc, "lover_mode_rest")) {
      setNpcRunningState(npc, false);
      return;
    }

    const nearest = getNearestPlayerForNpcV24(npc);
    let running = false;

    // Cháº¡y dá»… tháº¥y hÆ¡n: xa hÆ¡n 6 block thĂ¬ dĂ¹ng run, nhÆ°ng khĂ´ng can thiá»‡p walk gáº§n ngÆ°á»i chÆ¡i.
    if (nearest.player && (hasTag(npc, "lover_mode_follow") || hasTag(npc, "lover_mode_guard"))) {
      if (nearest.distSq > 36) running = true;
    }

    // Khi guard Ä‘ang lao tá»›i má»¥c tiĂªu, báº­t run theo váº­n tá»‘c ngang.
    if (hasTag(npc, "lover_mode_guard")) {
      try {
        const vel = npc.getVelocity();
        const speedSq = (vel.x ?? 0) * (vel.x ?? 0) + (vel.z ?? 0) * (vel.z ?? 0);
        if (speedSq > 0.09) running = true; // was 0.035 — less false sprint
      } catch (e) {}
    }

    setNpcRunningState(npc, running);
  } catch (e) {}
}

system.runInterval(() => {
  for (const dimensionId of ["overworld", "nether", "the_end"]) {
    try {
      const dimension = world.getDimension(dimensionId);
      for (const npc of dimension.getEntities({ type: NPC_ID })) {
        updateNpcRunAnimationStateV24(npc);
      }
    } catch (e) {}
  }
}, 6);

// v1.0.15: keep carried NPC aligned with the player while the carry pose is active.
system.runInterval(() => {
  safeInterval("updateActiveNpcCarries", updateActiveNpcCarries);
}, 2);


// Äá»“ng bá»™ mĂ¡u vĂ  báº£ng tĂªn Ä‘á»‹nh ká»³.
// KhĂ´ng gá»i actionbar á»Ÿ Ä‘Ă¢y Ä‘á»ƒ trĂ¡nh hiá»‡n dĂ²ng thĂ´ng tin dÆ°á»›i mĂ n hĂ¬nh.
system.runInterval(() => {
  try { syncNpcHealthForAllLoaded(); } catch (e) {}
  try { syncNpcNameTagsForAllLoaded(); } catch (e) {}
}, NPC_HP_SYNC_TICKS);

// Auto systems that were defined above but need a scheduler to run in-world.
system.runInterval(() => {
  safeInterval("protectOwnerAndAutoGift", protectOwnerAndAutoGift);
}, AUTO_FEATURE_CHECK_TICKS);

system.runInterval(() => {
  safeInterval("updateNpcHungerDecay", updateNpcHungerDecay);
}, 100);

system.runInterval(() => {
  safeInterval("restAndSleepTick", restAndSleepTick);
}, REST_SLEEP_TICK_INTERVAL);

system.runInterval(() => {
  safeInterval("autoTalkTickV52", autoTalkTickV52);
  safeInterval("dailyScheduleTickV52", dailyScheduleTickV52);
  safeInterval("freeIdleVoiceTick", freeIdleVoiceTick);
}, 100);


system.runInterval(() => {
  try { stickySleepPose(); } catch (e) {}
}, 10);
