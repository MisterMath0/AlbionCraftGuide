import { ref, watch } from 'vue'

export interface PresetItem {
  id: string
  name: string
  productPrice: number
  ingredients: Array<{
    id: string
    name: string
    quantity: number
    cost: number
    excluded: boolean
  }>
}

export interface Preset {
  id: string
  name: string
  craftType: string
  items: PresetItem[]
  createdAt: number
}

const STORAGE_KEY = 'albion-craft-presets'

const presets = ref<Preset[]>([])
const selectedPresetId = ref<string | null>(null)

// Load presets from localStorage
function loadPresets() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      presets.value = JSON.parse(stored)
    }
  } catch (error) {
    console.error('Failed to load presets:', error)
    presets.value = []
  }
}

// Save presets to localStorage
function savePresetsToStorage() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(presets.value))
  } catch (error) {
    console.error('Failed to save presets:', error)
  }
}

// Watch for changes and auto-save
watch(presets, savePresetsToStorage, { deep: true })

export function usePresets() {
  // Initialize on first use
  if (presets.value.length === 0) {
    loadPresets()
  }

  function createPreset(name: string, craftType: string, items: PresetItem[]) {
    const preset: Preset = {
      id: `preset_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      name,
      craftType,
      items,
      createdAt: Date.now(),
    }
    presets.value.push(preset)
    return preset
  }

  function deletePreset(id: string) {
    const index = presets.value.findIndex(p => p.id === id)
    if (index !== -1) {
      presets.value.splice(index, 1)
      if (selectedPresetId.value === id) {
        selectedPresetId.value = null
      }
    }
  }

  function updatePreset(id: string, updates: Partial<Preset>) {
    const preset = presets.value.find(p => p.id === id)
    if (preset) {
      Object.assign(preset, updates)
    }
  }

  function getPreset(id: string) {
    return presets.value.find(p => p.id === id)
  }

  function selectPreset(id: string | null) {
    selectedPresetId.value = id
  }

  function getPresetsForCraft(craftType: string) {
    return presets.value.filter(p => p.craftType === craftType)
  }

  return {
    presets,
    selectedPresetId,
    createPreset,
    deletePreset,
    updatePreset,
    getPreset,
    selectPreset,
    getPresetsForCraft,
  }
}
