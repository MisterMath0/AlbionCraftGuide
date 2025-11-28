<template>
  <Dialog v-model:open="isOpen">
    <DialogContent class="!max-w-3xl max-h-[90vh] overflow-y-auto w-[95vw]">
      <DialogHeader>
        <DialogTitle class="flex items-center gap-3">
          <ItemIcon 
            v-if="recipe"
            :item-id="recipe.productName" 
            :quality="quality"
            :size="217"
            class="w-12 h-12"
          />
          <div>
            <div class="text-xl">{{ productDisplayName }}</div>
            <div class="text-sm text-muted-foreground">
              Quantity: {{ recipe?.quantity || 1 }} | Enchantment: {{ recipe?.enchant || '0' }}
            </div>
          </div>
        </DialogTitle>
        <DialogDescription>
          Adjust prices, quantities, and calculate profit for your crafting plan
        </DialogDescription>
      </DialogHeader>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
        <!-- Left Column: Product Details -->
        <div class="space-y-4">
          <div class="rounded-lg border p-4 space-y-4">
            <h3 class="font-semibold text-lg">Product</h3>
            
            <!-- Craft Quantity -->
            <div class="space-y-2">
              <Label for="craftQty">Number of Crafts</Label>
              <Input 
                id="craftQty"
                v-model.number="localCraftQuantity"
                type="number"
                min="1"
                class="w-full"
              />
              <p class="text-xs text-muted-foreground">
                Total items produced: {{ totalProduced }}
              </p>
            </div>

            <!-- Product Price -->
            <div class="space-y-2">
              <Label for="productPrice">Sell Price (per item)</Label>
              <Input 
                id="productPrice"
                v-model.number="localProductPrice"
                type="number"
                min="0"
                class="w-full"
              />
            </div>

            <!-- Revenue Calculation -->
            <div class="rounded-md bg-muted p-3 space-y-1">
              <div class="flex justify-between text-sm">
                <span>Base Revenue:</span>
                <span class="font-medium">{{ formatNumber(baseRevenue) }}</span>
              </div>
              <div class="flex justify-between text-sm">
                <span>After RRR ({{ (rrrRate * 100).toFixed(1) }}%):</span>
                <span class="font-medium">{{ formatNumber(adjustedRevenue) }}</span>
              </div>
              <div class="flex justify-between text-sm">
                <span>After Tax ({{ (tax * 100).toFixed(1) }}%):</span>
                <span class="font-medium">{{ formatNumber(finalRevenue) }}</span>
              </div>
            </div>
          </div>

          <!-- Nutrition Cost (if applicable) -->
          <div v-if="recipe?.nutrition" class="rounded-lg border p-4 space-y-2">
            <h3 class="font-semibold">Nutrition Cost</h3>
            <div class="flex justify-between">
              <span class="text-sm">{{ recipe.nutrition }} nutrition × {{ nutritionCost }}</span>
              <span class="font-medium">{{ formatNumber(totalNutritionCost) }}</span>
            </div>
          </div>

          <!-- Profit Summary -->
          <div class="rounded-lg border p-4 space-y-3">
            <h3 class="font-semibold text-lg">Profit Summary</h3>
            <div class="space-y-2">
              <div class="flex justify-between text-sm">
                <span>Total Revenue:</span>
                <span class="font-medium text-green-600">{{ formatNumber(finalRevenue) }}</span>
              </div>
              <div class="flex justify-between text-sm">
                <span>Total Material Cost:</span>
                <span class="font-medium text-red-600">-{{ formatNumber(totalMaterialCost) }}</span>
              </div>
              <div v-if="recipe?.nutrition" class="flex justify-between text-sm">
                <span>Nutrition Cost:</span>
                <span class="font-medium text-red-600">-{{ formatNumber(totalNutritionCost) }}</span>
              </div>
              <Separator />
              <div class="flex justify-between text-lg font-bold">
                <span>Net Profit:</span>
                <span :class="netProfit >= 0 ? 'text-green-600' : 'text-red-600'">
                  {{ formatNumber(netProfit) }}
                </span>
              </div>
              <div class="flex justify-between text-sm text-muted-foreground">
                <span>Profit per item:</span>
                <span>{{ formatNumber(profitPerItem) }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Column: Materials -->
        <div class="space-y-4">
          <div class="rounded-lg border p-4">
            <h3 class="font-semibold text-lg mb-4">Materials Required</h3>
            
            <div class="space-y-3">
              <div 
                v-for="(ingredient, index) in localIngredients" 
                :key="index"
                class="rounded-md border p-3 space-y-3"
              >
                <!-- Material Header -->
                <div class="flex items-center gap-2">
                  <ItemIcon 
                    :item-id="ingredient.id" 
                    :quality="1"
                    :size="217"
                    class="w-8 h-8"
                  />
                  <div class="flex-1">
                    <div class="font-medium text-sm">
                      {{ getIngredientName(ingredient.id) }}
                    </div>
                    <div class="text-xs text-muted-foreground">
                      {{ ingredient.excluded ? 'Excluded from RRR' : 'Affected by RRR' }}
                    </div>
                  </div>
                </div>

                <!-- Material Inputs -->
                <div class="grid grid-cols-2 gap-2">
                  <div class="space-y-1">
                    <Label :for="`qty-${index}`" class="text-xs">Quantity per craft</Label>
                    <Input 
                      :id="`qty-${index}`"
                      v-model.number="ingredient.quantity"
                      type="number"
                      min="0"
                      class="h-8"
                      disabled
                    />
                  </div>
                  <div class="space-y-1">
                    <Label :for="`cost-${index}`" class="text-xs">Cost per item</Label>
                    <Input 
                      :id="`cost-${index}`"
                      v-model.number="ingredient.cost"
                      type="number"
                      min="0"
                      class="h-8"
                    />
                  </div>
                </div>

                <!-- Material Cost Breakdown -->
                <div class="rounded bg-muted p-2 space-y-1">
                  <div class="flex justify-between text-xs">
                    <span>Base cost:</span>
                    <span>{{ formatNumber(ingredient.quantity * ingredient.cost) }}</span>
                  </div>
                  <div class="flex justify-between text-xs">
                    <span>Total for {{ localCraftQuantity }} craft(s):</span>
                    <span class="font-medium">{{ formatNumber(calculateIngredientCost(ingredient)) }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <DialogFooter class="mt-6">
        <Button variant="outline" @click="resetToOriginal">
          Reset
        </Button>
        <Button @click="saveAndClose">
          Save Changes
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import ItemIcon from '@/components/ItemIcon.vue'
import { getItemName, type Language } from '@/utils/localization'

interface Ingredient {
  id: string
  name: string
  quantity: number
  cost: number
  excluded: boolean
}

interface RecipeData {
  productName: string
  quantity: number
  enchant: string
  productPrice: number
  nutrition?: number
  ingredients: Ingredient[]
}

interface Props {
  recipe: RecipeData | null
  itemNames: any
  language: Language
  quality: number
  rrrRate: number
  nutritionCost: number
  tax: number
  hasExclusions: boolean
}

const props = defineProps<Props>()

const emit = defineEmits<{
  'update:open': [value: boolean]
  'save': [data: { productPrice: number, ingredients: Ingredient[], craftQuantity: number }]
}>()

const isOpen = defineModel<boolean>('open', { default: false })

// Local state
const localCraftQuantity = ref(1)
const localProductPrice = ref(0)
const localIngredients = ref<Ingredient[]>([])

// Watch for recipe changes to initialize local state
watch(() => props.recipe, (newRecipe) => {
  if (newRecipe) {
    localProductPrice.value = newRecipe.productPrice
    localIngredients.value = JSON.parse(JSON.stringify(newRecipe.ingredients))
    localCraftQuantity.value = 1
  }
}, { immediate: true, deep: true })

// Computed values
const productDisplayName = computed(() => {
  if (!props.recipe) return ''
  return props.itemNames 
    ? getItemName(props.recipe.productName, props.language, props.itemNames)
    : props.recipe.productName
})

const totalProduced = computed(() => {
  return (props.recipe?.quantity || 1) * localCraftQuantity.value
})

const baseRevenue = computed(() => {
  return localProductPrice.value * totalProduced.value
})

const adjustedRevenue = computed(() => {
  if (props.hasExclusions) {
    return baseRevenue.value
  }
  return baseRevenue.value / (1 - props.rrrRate)
})

const finalRevenue = computed(() => {
  return adjustedRevenue.value * (1 - props.tax)
})

const totalMaterialCost = computed(() => {
  return localIngredients.value.reduce((sum, ing) => {
    return sum + calculateIngredientCost(ing)
  }, 0)
})

const totalNutritionCost = computed(() => {
  if (!props.recipe?.nutrition) return 0
  const nutritionPerCraft = props.recipe.nutrition * props.nutritionCost
  const multiplier = props.hasExclusions ? 1 : 1 / (1 - props.rrrRate)
  return nutritionPerCraft * multiplier * localCraftQuantity.value
})

const netProfit = computed(() => {
  return finalRevenue.value - totalMaterialCost.value - totalNutritionCost.value
})

const profitPerItem = computed(() => {
  return totalProduced.value > 0 ? netProfit.value / totalProduced.value : 0
})

// Methods
function calculateIngredientCost(ingredient: Ingredient): number {
  const baseCost = ingredient.quantity * ingredient.cost
  let multiplier = localCraftQuantity.value
  
  if (!ingredient.excluded && !props.hasExclusions) {
    // Affected by RRR
    multiplier *= (1 - props.rrrRate)
  }
  
  return baseCost * multiplier
}

function getIngredientName(itemId: string): string {
  return props.itemNames 
    ? getItemName(itemId, props.language, props.itemNames)
    : itemId
}

function formatNumber(value: number): string {
  return Math.trunc(value).toLocaleString()
}

function resetToOriginal() {
  if (props.recipe) {
    localProductPrice.value = props.recipe.productPrice
    localIngredients.value = JSON.parse(JSON.stringify(props.recipe.ingredients))
    localCraftQuantity.value = 1
  }
}

function saveAndClose() {
  emit('save', {
    productPrice: localProductPrice.value,
    ingredients: localIngredients.value,
    craftQuantity: localCraftQuantity.value
  })
  isOpen.value = false
}
</script>
