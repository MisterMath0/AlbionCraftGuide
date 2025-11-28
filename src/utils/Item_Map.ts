import { Item, PriceEntry } from './Item'

export class ItemMap {
  map: Map<string, Item>

  constructor() {
    this.map = new Map()
  }

  addItem(entry: PriceEntry): void {
    if (!this.map.has(entry.item_id)) {
      this.map.set(entry.item_id, new Item(entry))
    } else {
      const date = entry.sell_price_min_date || ''
      this.map.get(entry.item_id)!.addPrice(entry.city, entry.quality, entry.sell_price_min, date)
    }
    if (entry.city === "Black Market" && entry.buy_price_max && entry.buy_price_max_date) {
      this.map.get(entry.item_id)!.addPrice("Black Market Buy", entry.quality, entry.buy_price_max, entry.buy_price_max_date)
    }
  }

  getPrice(id: string, quality: number, city: string): number {
    try {
      return this.map.get(id)!.prices.get(quality + ":" + city)![0]
    } catch (error) {
      return 0
    }
  }

  clearMap(): void {
    this.map = new Map()
  }
}
