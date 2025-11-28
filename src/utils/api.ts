import { PriceEntry } from './Item'
import { ItemMap } from './Item_Map'

export async function fetchPrices(server: string, itemString: string): Promise<PriceEntry[]> {
  const url = `https://${server}.albion-online-data.com/api/v2/stats/prices/${itemString}`
  const response = await fetch(url)
  return response.json()
}

export async function updateItemMap(itemMap: ItemMap, materials: string, server: string = 'west'): Promise<void> {
  const data = await fetchPrices(server, materials)
  data.forEach(entry => itemMap.addItem(entry))
}

export function convertNut(itemvalue: number): number {
  return itemvalue / 20 / (400 / 9)
}
