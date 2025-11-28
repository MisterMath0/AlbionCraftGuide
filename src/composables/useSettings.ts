import { ref, computed } from 'vue'
import { PREM_TAX, FREE_TAX, CITIES, SERVERS, TIERS, TAX_OPTIONS } from '../utils/constants'

const server = ref(SERVERS[0].value)
const startCity = ref(CITIES[0])
const endCity = ref(CITIES[0])
const rrrRate = ref(0.152)
const nutritionCost = ref(500)
const isPremium = ref(true)
const quality = ref(1)
const enchantmentLevel = ref(0)
const language = ref('EN-US')
const selectedCategory = ref(null)
const forceSingleCraft = ref(true)
const selectedTier = ref(null)
const enchantRefineLevel = ref(0)
const happiness = ref(850)
const taxSelection = ref(TAX_OPTIONS[1].value)
const hideUnprofitable = ref(false)
const useFocus = ref(false)
const useCityBonus = ref(false)

export function useSettings() {
  const tax = computed(() => isPremium.value ? PREM_TAX : FREE_TAX)
  
  const taxFromSelection = computed(() => {
    if (taxSelection.value === TAX_OPTIONS[0].value) return 0
    if (taxSelection.value === TAX_OPTIONS[1].value) return PREM_TAX
    return FREE_TAX
  })

  return {
    server,
    startCity,
    endCity,
    rrrRate,
    nutritionCost,
    isPremium,
    quality,
    enchantmentLevel,
    language,
    selectedCategory,
    forceSingleCraft,
    selectedTier,
    enchantRefineLevel,
    happiness,
    taxSelection,
    hideUnprofitable,
    useFocus,
    useCityBonus,
    tax,
    taxFromSelection,
    CITIES,
    SERVERS,
    TIERS,
    PREM_TAX,
    FREE_TAX
  }
}
