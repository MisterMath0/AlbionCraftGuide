export interface PriceEntry {
  item_id: string
  city: string
  quality: number
  sell_price_min: number
  sell_price_min_date?: string
  sell_price_max_date?: string
  buy_price_max?: number
  buy_price_max_date?: string
}

export class Item {
  id: string
  prices: Map<string, [number, string]>

  constructor(entry: PriceEntry) {
    this.id = entry.item_id
    this.prices = new Map()
    const date = entry.sell_price_max_date || entry.sell_price_min_date || ''
    this.addPrice(entry.city, entry.quality, entry.sell_price_min, date)
  }

  addPrice(city: string, quality: number, price: number, date: string): void {
    // Date is for freshness comparison
    let city_name = city
    if (city_name.endsWith(" Portal")) {
      city_name = city.substring(0, city.lastIndexOf(" "))
    }
    city_name = quality + ":" + city_name

    if (!this.prices.has(city_name)) {
      this.prices.set(city_name, [price, date])
    }
    if (this.prices.get(city_name)![1] < date) {
      this.prices.set(city_name, [price, date])
    }
  }
}