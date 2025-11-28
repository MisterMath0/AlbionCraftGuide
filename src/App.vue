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
        <CookingView v-if="currentView === 'cooking'" />
        <AlchemyView v-else-if="currentView === 'alchemy'" />
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
import { usePresets } from './composables/usePresets'

const currentView = ref('cooking')
const { presets, selectedPresetId, createPreset, deletePreset, selectPreset } = usePresets()

const currentViewTitle = computed(() => {
  const titles = {
    cooking: 'Cooking',
    alchemy: 'Alchemy',
    refining: 'Refining',
    crafting: 'Crafting',
  }
  return titles[currentView.value] || 'Craft Guide'
})

function handleNavigate(view) {
  currentView.value = view
  selectPreset(null)
}

function handleSelectPreset(id) {
  selectPreset(id)
  // TODO: Load preset data into the view
}

function handleDeletePreset(id) {
  if (confirm('Are you sure you want to delete this preset?')) {
    deletePreset(id)
  }
}

function handleCreatePreset() {
  const name = prompt('Enter preset name:')
  if (name && name.trim()) {
    // TODO: Get selected items from current view
    createPreset(name.trim(), currentView.value, [])
  }
}
</script>
