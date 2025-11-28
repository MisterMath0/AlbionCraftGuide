import { PriceEntry } from './Item'

export async function fetchPrices(server: string, itemString: string): Promise<PriceEntry[]> {
  const url = `https://${server}.albion-online-data.com/api/v2/stats/prices/${itemString}`
  const response = await fetch(url)
  return response.json()
}

export function convertNut(itemvalue: number): number {
  return itemvalue / 20 / (400 / 9)
}
