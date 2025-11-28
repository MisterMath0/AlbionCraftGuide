
export const PREM_TAX = 0.065
export const FREE_TAX = 0.105

export const CITIES = [
  'Thetford',
  'Martlock',
  'Fort Sterling',
  'Bridgewatch',
  'Lymhurst',
  'Caerleon',
  'Brecilien'
]

export const AVALON_CITIES = [
  "Arthur's Rest",
  "Merlyn's Rest",
  "Morgana's Rest"
]

export const ALL_CITIES = [...CITIES, ...AVALON_CITIES]

export const SERVERS = [
  { value: 'west', label: 'America' },
  { value: 'east', label: 'Asia' },
  { value: 'europe', label: 'EU' }
]

export const TAX_OPTIONS = [
  { value: 1, label: 'Free to Play' },
  { value: 2, label: 'Premium' }
]

export const TIERS = [
  { value: 0, label: 'T4' },
  { value: 1, label: 'T5' },
  { value: 2, label: 'T6' },
  { value: 3, label: 'T7' },
  { value: 4, label: 'T8' }
]

export const ENCHANT_UPGRADES = [
  { value: 0, label: '.0 -> .1' },
  { value: 1, label: '.1 -> .2' },
  { value: 2, label: '.2 -> .3' }
]

// Category options for different pages
export const ARTIFACT_CATEGORIES = [
  { value: 0, label: 'Warrior' },
  { value: 1, label: 'Mage' },
  { value: 2, label: 'Hunter' },
  { value: 3, label: 'Any' }
]

export const BUTCHER_CATEGORIES = [
  { value: 0, label: 'Meat' },
  { value: 1, label: 'Fish' }
]

export const TOOLMAKER_CATEGORIES = [
  { value: 0, label: 'Tools' },
  { value: 1, label: 'Armor' }
]

export const HUNTERS_LODGE_CATEGORIES = [
  { value: 0, label: 'Light Armor' },
  { value: 1, label: 'Medium Armor' },
  { value: 2, label: 'Heavy Armor' },
  { value: 3, label: 'Bows' },
  { value: 4, label: 'Crossbows' },
  { value: 5, label: 'Spears' }
]

export const WARRIORS_FORGE_CATEGORIES = [
  { value: 0, label: 'Light Armor' },
  { value: 1, label: 'Medium Armor' },
  { value: 2, label: 'Heavy Armor' },
  { value: 3, label: 'Axes' },
  { value: 4, label: 'Swords' },
  { value: 5, label: 'Hammers' }
]

export const MAGES_TOWER_CATEGORIES = [
  { value: 0, label: 'Light Armor' },
  { value: 1, label: 'Medium Armor' },
  { value: 2, label: 'Heavy Armor' },
  { value: 3, label: 'Staffs' },
  { value: 4, label: 'Offhand' }
]

export const REFINE_CATEGORIES = [
  { value: 0, label: 'Wood' },
  { value: 1, label: 'Ore' },
  { value: 2, label: 'Hide' },
  { value: 3, label: 'Fiber' },
  { value: 4, label: 'Stone' }
]

export const ENCHANTING_CATEGORIES = [
  { value: 0, label: 'Armor' },
  { value: 1, label: 'Melee' },
  { value: 2, label: 'Magic' },
  { value: 3, label: 'Ranged' },
  { value: 4, label: 'Offhand' },
  { value: 5, label: 'Accessories' },
  { value: 6, label: 'Gathering' }
]

export const LABORER_CATEGORIES = [
  { value: 0, label: 'Trophies' },
  { value: 1, label: 'Gathering' },
  { value: 2, label: 'Mercenary' }
]

export const FARM_CATEGORIES = [
  { value: 0, label: 'Crops & Animal Products' },
  { value: 1, label: 'Livestock & Mounts' }
]
