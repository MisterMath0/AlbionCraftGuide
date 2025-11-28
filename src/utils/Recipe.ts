import { ItemMap } from './Item_Map'

export class Recipe {
  result: string
  ingredients: Map<string, number>
  nutrition: number
  quantity: number
  exlude: string[] // Note: typo from legacy code, kept for compatibility

  constructor(
    resultId: string,
    ingredientMap: Map<string, number>,
    exludeFromRRR: string[],
    nutrition: number,
    quantity: number
  ) {
    this.result = resultId
    this.ingredients = ingredientMap
    this.nutrition = nutrition
    this.quantity = quantity
    this.exlude = exludeFromRRR
  }

  calcProfit(
    itemmap: ItemMap,
    quality: number,
    city: string,
    rrr: number,
    nutritioncost: number,
    tax: number
  ): number {
    const profit = itemmap.getPrice(this.result, quality, city) * this.quantity * (1 - tax)
    return profit - this.calcCost(itemmap, city, rrr, nutritioncost)
  }

  calcCost(itemmap: ItemMap, city: string, rrr: number, nutritioncost: number): number {
    let investment = 0
    for (const key of this.ingredients.keys()) {
      if (!this.isExcluded(key)) {
        investment = investment + (this.ingredients.get(key)! * itemmap.getPrice(key, 1, city)) * (1 - rrr)
      } else {
        investment = investment + this.ingredients.get(key)! * itemmap.getPrice(key, 1, city)
      }
    }
    return investment + this.nutrition * nutritioncost
  }

  isExcluded(itemname: string): boolean {
    return this.exlude.includes(itemname)
  }
}
