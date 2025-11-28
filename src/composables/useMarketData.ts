import { ref } from 'vue'
import { ItemMap } from '../utils/Item_Map'
import { fetchPrices } from '../utils/api'

// Global state for market data
const itemMap = ref(new ItemMap())
const isLoading = ref(false)
const lastUpdate = ref<Date | null>(null)

export function useMarketData() {
  const updatePrices = async (server: string, itemString: string) => {
    isLoading.value = true
    try {
      const data = await fetchPrices(server, itemString)
      data.forEach(entry => itemMap.value.addItem(entry))
      lastUpdate.value = new Date()
    } finally {
      isLoading.value = false
    }
  }

  const clearData = () => {
    itemMap.value.clearMap()
  }

  const getPrice = (itemId: string, quality: number, city: string): number => {
    return itemMap.value.getPrice(itemId, quality, city)
  }

  return {
    itemMap,
    isLoading,
    lastUpdate,
    updatePrices,
    clearData,
    getPrice
  }
}
