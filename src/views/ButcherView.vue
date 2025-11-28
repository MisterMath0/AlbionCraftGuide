<template>
  <div class="butcher-view">
    <div class="controls-grid grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 mb-6 items-end">
        <ServerSelector v-model="server" />
        <CitySelector v-model="startCity" label="Start City" id="start-city" />
        <CitySelector v-model="endCity" label="End City" id="end-city" :include-avalon="true" />
        <RRRInput v-model="rrrRate" />
        <PremiumToggle v-model="isPremium" />
        <ForceSingleCraftToggle v-model="forceSingleCraft" />
    </div>

    <div class="actions flex gap-2 mb-4 items-center">
      <UpdateButton @click="updateTable" :loading="isLoading" />
      <HideUnprofitableButton v-model="hideUnprofitable" />
      <RecipeTableToolbar v-if="tableRef" :table="tableRef.table" :item-names="itemNames" @save-preset="handleSavePreset" />
    </div>

    <Empty v-if="isLoading">
      <EmptyContent>
        <Spinner class="size-8" />
        <EmptyHeader>
          <EmptyTitle>Loading Market Data</EmptyTitle>
          <EmptyDescription>
            Fetching prices from the Albion Online Data Project...
          </EmptyDescription>
        </EmptyHeader>
      </EmptyContent>
    </Empty>

    <RecipeTable
      v-else
      ref="tableRef"
      :recipes="recipes"
      :item-names="itemNames"
      :show-enchant="false"
      :show-nutrition="false"
      :different-end-city="true"
      :enable-enchant-upgrade="false"
      :hide-unprofitable="hideUnprofitable"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useSettings } from '@/composables/useSettings'
import { useMarketData } from '@/composables/useMarketData'
import { loadItemNames } from '@/utils/localization'
import { materials } from '@/data/materials/butcher'
import { recipes } from '@/data/recipes/butcher'
import ServerSelector from '@/components/controls/ServerSelector.vue'
import CitySelector from '@/components/controls/CitySelector.vue'
import RRRInput from '@/components/controls/RRRInput.vue'
import PremiumToggle from '@/components/controls/PremiumToggle.vue'
import ForceSingleCraftToggle from '@/components/controls/ForceSingleCraftToggle.vue'
import UpdateButton from '@/components/controls/UpdateButton.vue'
import HideUnprofitableButton from '@/components/controls/HideUnprofitableButton.vue'
import RecipeTable from '@/components/RecipeTable.vue'
import RecipeTableToolbar from '@/components/RecipeTableToolbar.vue'
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyTitle } from '@/components/ui/empty'
import { Spinner } from '@/components/ui/spinner'
import { updateItemMap } from '@/utils/api'
import { ItemMap } from '@/utils/Item_Map'

const { 
  server, 
  startCity, 
  endCity, 
  rrrRate,
  isPremium,
  forceSingleCraft,
  hideUnprofitable
} = useSettings()

const { itemMap, setItemMap } = useMarketData()
const isLoading = ref(false)
const itemNames = ref(null)
const tableRef = ref(null)

async function updateTable() {
  isLoading.value = true
  const newItemMap = new ItemMap()
  await updateItemMap(newItemMap, materials, server.value)
  setItemMap(newItemMap)
  isLoading.value = false
}

// Load item names and initial data
onMounted(async () => {
  itemNames.value = await loadItemNames()
  updateTable()
})

// Watch server changes to refetch prices
watch(server, () => {
  updateTable()
})

function handleSavePreset(selectedRows) {
  console.log('Save preset:', selectedRows)
}

function getCurrentState() {
  if (!tableRef.value) return []
  const selectedRows = tableRef.value.table.getFilteredSelectedRowModel().rows
  return selectedRows.map(row => ({
    id: row.original.id,
    name: row.original.name,
    productPrice: row.original.productPrice,
    profit: row.original.profit,
    ingredients: row.original.ingredients || []
  }))
}

function loadPreset(items) {
  console.log('Loading preset items:', items)
}

defineExpose({
  getCurrentState,
  loadPreset
})
</script>
