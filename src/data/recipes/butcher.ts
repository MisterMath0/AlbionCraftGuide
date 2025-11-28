import { Recipe } from '@/utils/Recipe'

function createMeatRecipe(animalId: string, meatId: string) {
  return new Recipe(meatId, new Map([[animalId, 1]]), [animalId], 0, 1)
}

function createFishRecipe(fishId: string, choppedFishAmount: number) {
  return new Recipe('T1_FISHCHOPS', new Map([[fishId, 1]]), [fishId], 0, choppedFishAmount)
}

export const recipes = [
  // Meat recipes
  createMeatRecipe('T3_FARM_CHICKEN_GROWN', 'T3_MEAT'),
  createMeatRecipe('T4_FARM_GOAT_GROWN', 'T4_MEAT'),
  createMeatRecipe('T5_FARM_GOOSE_GROWN', 'T5_MEAT'),
  createMeatRecipe('T6_FARM_SHEEP_GROWN', 'T6_MEAT'),
  createMeatRecipe('T7_FARM_PIG_GROWN', 'T7_MEAT'),
  createMeatRecipe('T8_FARM_COW_GROWN', 'T8_MEAT'),
  
  // Fish recipes - Freshwater
  createFishRecipe('T1_FISH_FRESHWATER_ALL_COMMON', 1),
  createFishRecipe('T2_FISH_FRESHWATER_ALL_COMMON', 2),
  createFishRecipe('T3_FISH_FRESHWATER_ALL_COMMON', 3),
  createFishRecipe('T4_FISH_FRESHWATER_ALL_COMMON', 4),
  createFishRecipe('T5_FISH_FRESHWATER_ALL_COMMON', 6),
  createFishRecipe('T6_FISH_FRESHWATER_ALL_COMMON', 8),
  createFishRecipe('T7_FISH_FRESHWATER_ALL_COMMON', 10),
  createFishRecipe('T8_FISH_FRESHWATER_ALL_COMMON', 14),
  
  // Fish recipes - Saltwater
  createFishRecipe('T1_FISH_SALTWATER_ALL_COMMON', 1),
  createFishRecipe('T2_FISH_SALTWATER_ALL_COMMON', 2),
  createFishRecipe('T3_FISH_SALTWATER_ALL_COMMON', 3),
  createFishRecipe('T4_FISH_SALTWATER_ALL_COMMON', 4),
  createFishRecipe('T5_FISH_SALTWATER_ALL_COMMON', 6),
  createFishRecipe('T6_FISH_SALTWATER_ALL_COMMON', 8),
  createFishRecipe('T7_FISH_SALTWATER_ALL_COMMON', 10),
  createFishRecipe('T8_FISH_SALTWATER_ALL_COMMON', 14),
  
  // Fish recipes - Rare
  createFishRecipe('T3_FISH_FRESHWATER_FOREST_RARE', 10),
  createFishRecipe('T5_FISH_FRESHWATER_FOREST_RARE', 20),
  createFishRecipe('T7_FISH_FRESHWATER_FOREST_RARE', 30),
  createFishRecipe('T3_FISH_FRESHWATER_MOUNTAIN_RARE', 10),
  createFishRecipe('T5_FISH_FRESHWATER_MOUNTAIN_RARE', 20),
  createFishRecipe('T7_FISH_FRESHWATER_MOUNTAIN_RARE', 30),
  createFishRecipe('T3_FISH_FRESHWATER_HIGHLANDS_RARE', 10),
  createFishRecipe('T5_FISH_FRESHWATER_HIGHLANDS_RARE', 20),
  createFishRecipe('T7_FISH_FRESHWATER_HIGHLANDS_RARE', 30),
  createFishRecipe('T3_FISH_FRESHWATER_STEPPE_RARE', 10),
  createFishRecipe('T5_FISH_FRESHWATER_STEPPE_RARE', 20),
  createFishRecipe('T7_FISH_FRESHWATER_STEPPE_RARE', 30),
  createFishRecipe('T3_FISH_FRESHWATER_SWAMP_RARE', 10),
  createFishRecipe('T5_FISH_FRESHWATER_SWAMP_RARE', 20),
  createFishRecipe('T7_FISH_FRESHWATER_SWAMP_RARE', 30),
  createFishRecipe('T3_FISH_SALTWATER_ALL_RARE', 10),
  createFishRecipe('T5_FISH_SALTWATER_ALL_RARE', 20),
  createFishRecipe('T7_FISH_SALTWATER_ALL_RARE', 30),
  createFishRecipe('T3_FISH_FRESHWATER_AVALON_RARE', 10),
  createFishRecipe('T5_FISH_FRESHWATER_AVALON_RARE', 20),
  createFishRecipe('T7_FISH_FRESHWATER_AVALON_RARE', 30),
  createFishRecipe('T8_FISH_SALTWATER_ALL_BOSS_SHARK', 50),
]
