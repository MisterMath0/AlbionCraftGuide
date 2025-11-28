import { ref, computed } from 'vue'
import { PREM_TAX, FREE_TAX, CITIES, SERVERS } from '../utils/constants'

// Global state (shared across all components)
const server = ref(SERVERS[0])
const startCity = ref(CITIES[0])
const endCity = ref(CITIES[0])
const rrrRate = ref(0.152)
const nutritionCost = ref(500)
const isPremium = ref(PREM_TAX)
const quality = ref(1)
const enchantmentLevel = ref(0)

export function useSettings() {
  const tax = computed(() => isPremium.value ? PREM_TAX : FREE_TAX)

  return {
    // Reactive state
    server,
    startCity,
    endCity,
    rrrRate,
    nutritionCost,
    isPremium,
    quality,
    enchantmentLevel,

    // Computed values
    tax,

    // Constants for dropdowns
    CITIES,
    SERVERS
  }
}
