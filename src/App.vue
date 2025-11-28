<template>
  <SidebarProvider 
    variant="inset"
    style="--sidebar-width: calc(var(--spacing) * 72)"
  >
    <AppSidebar
      :current-view="currentView"
      :presets="presets"
      :selected-preset-id="selectedPresetId"
      @navigate="handleNavigate"
      @select-preset="handleSelectPreset"
      @delete-preset="handleDeletePreset"
      @create-preset="handleCreatePreset"
    />
    <SidebarInset class="flex flex-col overflow-hidden">
      <header class="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger class="-ml-1" />
        <Separator orientation="vertical" class="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbPage class="font-semibold">
                {{ currentViewTitle }}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>
      
      <main class="flex-1 overflow-auto p-4">
        <CookingView v-if="currentView === 'cooking'" ref="cookingViewRef" />
        <AlchemyView v-else-if="currentView === 'alchemy'" ref="alchemyViewRef" />
        <ButcherView v-else-if="currentView === 'butcher'" ref="butcherViewRef" />
        <SaddlerView v-else-if="currentView === 'saddler'" ref="saddlerViewRef" />
        <div v-else class="flex items-center justify-center h-full">
          <div class="text-center">
            <h2 class="text-2xl font-semibold mb-2">Coming Soon</h2>
            <p class="text-muted-foreground">This craft type is not yet implemented.</p>
          </div>
        </div>
      </main>
    </SidebarInset>
  </SidebarProvider>
</template>

<script setup>
import { ref, computed } from 'vue'
import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar'
import { Separator } from '@/components/ui/separator'
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage } from '@/components/ui/breadcrumb'
import AppSidebar from './components/AppSidebar.vue'
import CookingView from './views/CookingView.vue'
import AlchemyView from './views/AlchemyView.vue'
import ButcherView from './views/ButcherView.vue'
import SaddlerView from './views/SaddlerView.vue'
import { usePresets } from './composables/usePresets'

const currentView = ref('cooking')
const cookingViewRef = ref(null)
const alchemyViewRef = ref(null)
const butcherViewRef = ref(null)
const saddlerViewRef = ref(null)
const toolmakerViewRef = ref(null)
const warriorsforgeViewRef = ref(null)
const magestowerViewRef = ref(null)
const hunterslodgeViewRef = ref(null)
const { presets, selectedPresetId, createPreset, deletePreset, selectPreset, getPreset } = usePresets()

const currentViewTitle = computed(() => {
  const titles = {
    cooking: 'Cooking',
    alchemy: 'Alchemy',
    butcher: 'Butcher',
    saddler: 'Saddler',
    toolmaker: 'Toolmaker',
    warriorsforge: "Warrior's Forge",
    magestower: "Mage's Tower",
    hunterslodge: "Hunter's Lodge",
  }
  return titles[currentView.value] || 'Craft Guide'
})

function handleNavigate(view) {
  currentView.value = view
  selectPreset(null)
}

function handleSelectPreset(id) {
  selectPreset(id)
  const preset = getPreset(id)
  if (preset) {
    // Navigate to the preset's craft type if different
    if (preset.craftType !== currentView.value) {
      currentView.value = preset.craftType
    }
    // Load preset data into the view
    setTimeout(() => {
      const viewRefs = {
        cooking: cookingViewRef.value,
        alchemy: alchemyViewRef.value,
        butcher: butcherViewRef.value,
        saddler: saddlerViewRef.value,
        toolmaker: toolmakerViewRef.value,
        warriorsforge: warriorsforgeViewRef.value,
        magestower: magestowerViewRef.value,
        hunterslodge: hunterslodgeViewRef.value,
      }
      const viewRef = viewRefs[currentView.value]
      if (viewRef && viewRef.loadPreset) {
        viewRef.loadPreset(preset.items)
      }
    }, 100)
  }
}

function handleDeletePreset(id) {
  if (confirm('Are you sure you want to delete this preset?')) {
    deletePreset(id)
  }
}

function handleCreatePreset() {
  const name = prompt('Enter preset name:')
  if (name && name.trim()) {
    const viewRefs = {
      cooking: cookingViewRef.value,
      alchemy: alchemyViewRef.value,
      butcher: butcherViewRef.value,
      saddler: saddlerViewRef.value,
      toolmaker: toolmakerViewRef.value,
      warriorsforge: warriorsforgeViewRef.value,
      magestower: magestowerViewRef.value,
      hunterslodge: hunterslodgeViewRef.value,
    }
    const viewRef = viewRefs[currentView.value]
    const items = viewRef && viewRef.getCurrentState ? viewRef.getCurrentState() : []
    
    if (items.length === 0) {
      alert('Please select some items first!')
      return
    }
    
    createPreset(name.trim(), currentView.value, items)
  }
}
</script>
