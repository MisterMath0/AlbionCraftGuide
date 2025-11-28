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
    tax: number,
    forceSingleCraft: boolean
  ): number {
    const price = itemmap.getPrice(this.result, quality, city) * this.quantity
    const hasExclusions = this.exlude.length > 0 || forceSingleCraft
    const revenue = hasExclusions ? price : (price / (1 - rrr))
    const cost = this.calcCost(itemmap, city, rrr, nutritioncost, hasExclusions)
    return revenue * (1 - tax) - cost
  }

  calcCost(itemmap: ItemMap, city: string, rrr: number, nutritioncost: number, hasExclusions: boolean): number {
    let investment = 0
    for (const key of this.ingredients.keys()) {
      const materialCost = this.ingredients.get(key)! * itemmap.getPrice(key, 1, city)
      if (!this.isExcluded(key)) {
        investment = investment + materialCost * (1 - rrr)
      } else {
        investment = investment + materialCost
      }
    }
    const nutritionMultiplier = hasExclusions ? 1 : (1 / (1 - rrr))
    return investment + (this.nutrition * nutritioncost * nutritionMultiplier)
  }

  isExcluded(itemname: string): boolean {
    return this.exlude.includes(itemname)
  }
}
