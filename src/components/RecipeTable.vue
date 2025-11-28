<template>
  <div class="w-full">
    <div class="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
            <TableHead v-for="header in headerGroup.headers" :key="header.id">
              <FlexRender
                v-if="!header.isPlaceholder"
                :render="header.column.columnDef.header"
                :props="header.getContext()"
              />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <template v-if="table.getRowModel().rows?.length">
            <TableRow
              v-for="row in table.getRowModel().rows"
              :key="row.id"
              :data-state="row.getIsSelected() && 'selected'"
              class="cursor-pointer hover:bg-muted/50"
              :class="{ 'bg-muted': selectedRowId === row.id }"
              @click="handleRowClick(row)"
            >
              <TableCell v-for="cell in row.getVisibleCells()" :key="cell.id">
                <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()" />
              </TableCell>
            </TableRow>
          </template>
          <TableRow v-else>
            <TableCell :colspan="columns.length" class="h-24 text-center">
              No results.
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, h } from 'vue'
import {
  FlexRender,
  getCoreRowModel,
  useVueTable,
} from '@tanstack/vue-table'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Input } from '@/components/ui/input'
import { useSettings } from '@/composables/useSettings'
import { useMarketData } from '@/composables/useMarketData'
import { ItemMap } from '@/utils/Item_Map'
import { Recipe } from '@/utils/Recipe'

const props = defineProps({
  recipes: { type: Array, required: true },
  showEnchant: { type: Boolean, default: true },
  showNutrition: { type: Boolean, default: true },
  differentEndCity: { type: Boolean, default: false },
  enableEnchantUpgrade: { type: Boolean, default: false },
  forceSingleCraft: { type: Boolean, default: false },
  hideUnprofitable: { type: Boolean, default: false },
  enchantLevelFilter: { type: String, default: null } // Filter to show only specific enchant level
})

const emit = defineEmits(['rowSelect'])

const { startCity, endCity, quality, rrrRate, nutritionCost, tax } = useSettings()
const { itemMap } = useMarketData()

const selectedRowId = ref(null)

class OverridableItemMap extends ItemMap {
  constructor(baseMap, priceOverrides, costOverrides) {
    super()
    this.baseMap = baseMap
    this.priceOverrides = priceOverrides
    this.costOverrides = costOverrides
  }

  getPrice(itemId, quality, city) {
    if (this.priceOverrides.has(itemId)) {
      return this.priceOverrides.get(itemId)
    }
    if (this.costOverrides.has(itemId)) {
      return this.costOverrides.get(itemId)
    }
    return this.baseMap.getPrice(itemId, quality, city)
  }
}

// Store user-edited prices/costs
const priceOverrides = ref(new Map())
const costOverrides = ref(new Map())

// Create wrapped itemmap
const wrappedItemMap = computed(() => {
  return new OverridableItemMap(itemMap.value, priceOverrides.value, costOverrides.value)
})

// Transform recipes into table data
const tableData = computed(() => {
  const city = startCity.value
  const sellCity = props.differentEndCity ? endCity.value : city
  const qual = quality.value || 1
  const rrr = rrrRate.value
  const nutri = nutritionCost.value
  const taxRate = tax.value

  // Apply enchant upgrade transformation if enabled
  let processedRecipes = props.recipes
  if (props.enableEnchantUpgrade) {
    processedRecipes = processedRecipes.map(recipe => convertUpgrade(recipe))
  }

  let rows = processedRecipes.map(recipe => {
    const ingredients = Array.from(recipe.ingredients.entries())
    
    return {
      id: recipe.result,
      enchant: getEnchantLevel(recipe.result),
      productName: recipe.result,
      nutrition: recipe.nutrition || 0,
      quantity: recipe.quantity || 1,
      productPrice: wrappedItemMap.value.getPrice(recipe.result, qual, sellCity),
      profit: Math.trunc(recipe.calcProfit(wrappedItemMap.value, qual, city, rrr, nutri, taxRate)),
      recipe: recipe,
      ingredients: ingredients.map(([id, qty]) => ({
        id,
        name: id,
        quantity: qty,
        cost: wrappedItemMap.value.getPrice(id, 1, city),
        excluded: recipe.exlude?.includes(id) || false
      }))
    }
  })

  // Filter by enchant level if specified
  if (props.enchantLevelFilter !== null) {
    rows = rows.filter(row => row.enchant === props.enchantLevelFilter)
  }

  // Filter unprofitable if enabled
  if (props.hideUnprofitable) {
    rows = rows.filter(row => row.profit >= 1)
  }

  return rows
})

function getEnchantLevel(itemName) {
  if (itemName.indexOf('@') !== -1) {
    return itemName.at(-1)
  }
  return '0'
}

// Enchant upgrade helper functions (from legacy recipetable.js)
function convertUpgrade(recipe) {
  const runeAmount = selectRuneAmount(recipe.result)
  const runeId = selectRune(recipe.result)
  
  if (runeAmount === -1 || runeId === '' || getEnchantLevel(recipe.result) === '0') {
    return recipe
  }
  
  const newIngredientMap = downgradeIngredients(recipe.ingredients, recipe.exlude)
  const newRecipe = {
    result: recipe.result,
    ingredients: newIngredientMap,
    exlude: [...recipe.exlude, runeId],
    nutrition: recipe.nutrition,
    quantity: recipe.quantity,
    calcProfit: recipe.calcProfit.bind({ 
      ...recipe, 
      ingredients: newIngredientMap,
      exlude: [...recipe.exlude, runeId]
    }),
    calcCost: recipe.calcCost.bind({
      ...recipe,
      ingredients: newIngredientMap,
      exlude: [...recipe.exlude, runeId]
    }),
    isExcluded: recipe.isExcluded.bind({
      ...recipe,
      exlude: [...recipe.exlude, runeId]
    })
  }
  
  newRecipe.ingredients.set(runeId, runeAmount)
  
  return newRecipe
}

function downgradeIngredients(ingredientMap, exclusionArray) {
  const newMap = new Map()
  
  Array.from(ingredientMap.keys()).forEach(key => {
    let itemName = ''
    if (exclusionArray !== undefined && exclusionArray.includes(key)) {
      itemName = key
    } else {
      itemName = downgradeEnchant(key)
    }
    newMap.set(itemName, ingredientMap.get(key))
  })
  
  return newMap
}

function downgradeEnchant(itemName) {
  const item = itemName.split('@')
  if (item.length < 2) return itemName
  
  let enchant = parseInt(item[1]) - 1
  if (enchant === 3) return itemName
  if (enchant === 0) return item[0].replace('_LEVEL1', '')
  if (enchant === 1) return item[0].replace('_LEVEL2', '_LEVEL1') + '@' + enchant
  if (enchant === 2) return item[0].replace('_LEVEL3', '_LEVEL2') + '@' + enchant
  
  return itemName
}

function selectRune(itemName) {
  const runes = ['T%_RUNE', 'T%_SOUL', 'T%_RELIC']
  const tier = itemName.charAt(1)
  const item = itemName.split('@')
  
  if (parseInt(tier) < 4) return ''
  if (item.length < 2) return runes[0].replace('%', tier)
  if (item[1] === '4') return ''
  
  return runes[parseInt(item[1]) - 1].replace('%', tier)
}

function selectRuneAmount(itemName) {
  const runeCost = [96, 192, 288, 384]
  
  if (itemName.includes('2H')) return runeCost[3]
  if (itemName.includes('MAIN')) return runeCost[2]
  if (itemName.includes('ARMOR') || itemName.includes('BAG')) return runeCost[1]
  if (itemName.includes('HEAD') || itemName.includes('SHOES') || 
      itemName.includes('CAPE') || itemName.includes('OFF')) return runeCost[0]
  
  return -1
}

// Define columns dynamically
const columns = computed(() => {
  const cols = []
  
  // Enchantment column
  if (props.showEnchant) {
    cols.push({
      accessorKey: 'enchant',
      header: 'En',
      cell: ({ row }) => h('div', { class: 'text-sm text-center' }, row.getValue('enchant')),
      size: 40
    })
  }
  
  // Product name column
  cols.push({
    accessorKey: 'productName',
    header: 'Product',
    cell: ({ row }) => h('div', { class: 'text-sm' }, row.getValue('productName')),
    size: 200
  })
  
  // Nutrition column
  if (props.showNutrition) {
    cols.push({
      accessorKey: 'nutrition',
      header: 'Nutri',
      cell: ({ row }) => h('div', { class: 'text-sm text-center' }, row.getValue('nutrition')),
      size: 60
    })
  }
  
  // Quantity column
  cols.push({
    accessorKey: 'quantity',
    header: '#',
    cell: ({ row }) => h('div', { class: 'text-sm text-center' }, row.getValue('quantity')),
    size: 40
  })
  
  // Price column (editable)
  cols.push({
    accessorKey: 'productPrice',
    header: 'Price',
    cell: ({ row }) => {
      return h(Input, {
        type: 'number',
        class: 'w-20 h-8 text-sm',
        min: 0,
        modelValue: row.getValue('productPrice'),
        'onUpdate:modelValue': (value) => {
          priceOverrides.value.set(row.original.id, parseFloat(value) || 0)
        },
        onClick: (e) => e.stopPropagation()
      })
    },
    size: 80
  })
  
  // Profit column
  cols.push({
    accessorKey: 'profit',
    header: 'Profit',
    cell: ({ row }) => {
      const profit = row.getValue('profit')
      const color = profit > 0 ? 'text-green-500' : 'text-red-500'
      return h('div', { class: `text-sm font-medium ${color}` }, profit)
    },
    size: 100
  })
  
  // Ingredient columns - create sets of Material/Qty/Cost for max ingredients
  const maxIngredients = Math.max(...tableData.value.map(row => row.ingredients.length), 1)
  
  for (let i = 0; i < maxIngredients; i++) {
    // Material name
    cols.push({
      id: `material_${i}`,
      header: 'Material',
      cell: ({ row }) => {
        const ing = row.original.ingredients[i]
        if (!ing) return null
        return h('div', { class: 'text-sm' }, ing.name)
      },
      size: 150
    })
    
    // Material quantity  
    cols.push({
      id: `materialQty_${i}`,
      header: '#',
      cell: ({ row }) => {
        const ing = row.original.ingredients[i]
        if (!ing) return null
        return h('div', { class: 'text-sm text-center' }, ing.quantity)
      },
      size: 40
    })
    
    // Material cost (editable)
    cols.push({
      id: `materialCost_${i}`,
      header: 'Cost',
      cell: ({ row }) => {
        const ing = row.original.ingredients[i]
        if (!ing) return null
        
        return h(Input, {
          type: 'number',
          class: 'w-20 h-8 text-sm',
          min: 0,
          modelValue: ing.cost,
          'onUpdate:modelValue': (value) => {
            costOverrides.value.set(ing.id, parseFloat(value) || 0)
          },
          onClick: (e) => e.stopPropagation()
        })
      },
      size: 80
    })
  }
  
  return cols
})

const table = useVueTable({
  get data() { return tableData.value },
  get columns() { return columns.value },
  getCoreRowModel: getCoreRowModel(),
})

function handleRowClick(row) {
  selectedRowId.value = row.id
  emit('rowSelect', row.original)
}

// Force recalculation when overrides change
watch([priceOverrides, costOverrides], () => {
  // Trigger reactivity - tableData will automatically recompute
}, { deep: true })
</script>

