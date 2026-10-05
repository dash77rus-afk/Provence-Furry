// Меню / чат Waifu NPC — русский интерфейс
// Команды действий (Follow, Sit, Sleep, Wake up...) оставляем на английском.

export const TEXT = {
  menu: {
    mainTitle: "§dWaifu NPC",
    info: "§0Инфо",
    infoLower: "§0Инфо",
    relation: "§0Отношения",
    care: "§0Забота",
    careNpc: "§0Забота о NPC",
    combat: "§0Бой",
    inventory: "§0Инвентарь",
    storage: "§0Хранилище NPC",
    equipment: "§2Экипировка",
    outfit: "§0Внешний вид",
    settings: "§0Настройки",
    action: "§0Действия",
    status: "§0Статус",
    detailStatus: "§0Подробный статус",
    unlockMilestones: "§0Вехи разблокировки",
    back: "§0Назад",
    close: "§4Закрыть",
    empty: "§8Пусто"
  },

  buttons: {
    call: (name) => `§2Позвать ${name}`,
    careWithName: (name) => `§0Забота: ${name}`,
    rename: (name) => `§0Переименовать ${name}`,
    profile: (name) => `§0Профиль ${name}`,
    receiveGiftFrom: (name) => `§0Принять подарок от ${name}`,
    receiveGiftNeed: (need) => `§0Подарок: нужно ${need}`,
    healFrom: (name) => `§aПопросить ${name} вылечить`,
    healNeed: (need) => `§0Лечение: нужно ${need}`,
    talk: "§0Поговорить",
    relation: "§0Отношения",
    giveHeldItem: "§0Отдать предмет в руке",
    openStorageEquipment: "§0Инвентарь / Экипировка",
    equipmentShield: "§0🛡 Экипировка",
    npcLeft: "§6◀ Сумка спереди",
    npcRight: "§6Сумка сзади ▶",
    takeAll: "§0Забрать всё",
    equipNpc: "§0Надеть на NPC",
    moveSlot: "§0В другой слот",
    prevPage: "§0Сумка спереди",
    nextPage: "§0Сумка сзади",
    backStorage: "§4К хранилищу",
    backInfo: "§4К инфо",
    backCare: (name) => `§4К заботе: ${name}`,
    backRelation: "§4К отношениям",
    backGeneral: "§4Назад",
    close: "§4Закрыть",
    empty: "§0Пусто",
    wake: "§0Wake up",
    softLie: "§0Soft lie",
    repairRingRevive: "§1Починить кольцо и воскресить",
    needDiamonds20: "§cНужно 20 алмазов"
  },

  body: {
    careHeader: "§0Отношения и забота\n",
    relationHeader: "§0Отношения\n",
    storageMoveHelp: "§eВыбери слот. Если там другой предмет — предметы поменяются местами.",
    unlockMilestones: "§6Вехи\n§730 — Знакомство\n§780 — Подарки\n§7100 — Лечение\n§7150 — Охрана\n§7220 — Охрана II\n§7280 — Охрана III\n§7300 — Макс. связь"
  },

  chat: {
    talkCooldown: (remain) => `§eГоворить можно, но бонус к связи через §f${remain}с§7.`,
    genericSuccess: "§aГотово.",
    genericFail: "§cНе удалось выполнить действие.",
    noNpcNearby: "§cРядом нет NPC.",
    notEnoughAffection: "§cСвязь слишком низкая.",
    saved: "§aСохранено.",
    enabled: "§aВключено.",
    disabled: "§cВыключено."
  },

  rank: {
    shy: "§0Ещё стесняется",
    acquaintance: "§dЗнакомый",
    closeFriend: "§dБлизкий друг",
    caring: "§dЗабота",
    protector: "§dОхрана"
  },

  dialogue: {
    hello: ["§dПривет!", "§dТы вернулся?", "§dЯ ждала тебя."],
    talk: ["§fКак дела?", "§fС тобой интересно путешествовать.", "§fНе оставляй меня одну."],
    gift: ["§eСпасибо!", "§eМне нравится этот подарок.", "§eТы такой добрый."],
    sleep: ["§9Хочется спать...", "§9Спокойной ночи."],
    wake: ["§eЯ проснулась.", "§eДоброе утро!"],
    hurt: ["§cБольно...", "§cЗащити меня!"],
    attack: ["§cНе трогай его!", "§cЯ защищу тебя!"]
  },

  format: {
    infoTitle: (name) => `§d${name} §7| §fИнфо`,
    careTitle: (name) => `§dЗабота: ${name}`,
    relationTitle: (name) => `§d${name} §7| §fОтношения`,
    outfitTitle: (name) => `§6${name} §7| §fВнешний вид`,
    statusTitle: (name) => `§d${name} §7| §fОбзор`,
    bondLine: (hearts, affection, max, rank) => `§7Связь: ${hearts} §d${affection}/${max} §7(${rank}§7)\n`,
    heldLine: (heldText) => `§7В руке: §f${heldText}`,
    relationBody: (affection, max, rank, nextUnlock) => `§6Отношения\n§7Очки: §d${affection}/${max}\n§7Ранг: §d${rank}\n§7След. открытие: §e${nextUnlock}`,
    outfitBody: (skinName) => `§7Текущий скин: §d${skinName}`
  }
};

export function pickText(list, fallback = "") {
  try {
    if (!Array.isArray(list) || list.length <= 0) return fallback;
    return list[Math.floor(Math.random() * list.length)] ?? fallback;
  } catch (e) {
    return fallback;
  }
}
