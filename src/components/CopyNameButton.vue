<template>
  <span
    class="inline-flex items-center justify-center cursor-pointer opacity-60 hover:opacity-100 transition-opacity relative z-10"
    @click.stop="copyName"
    :title="`Copy ${displayName}`"
  >
    <Check v-if="copied" class="h-3 w-3 text-green-600" />
    <Copy v-else class="h-3 w-3" />
  </span>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Copy, Check } from 'lucide-vue-next'

interface Props {
  displayName: string
}

const props = defineProps<Props>()

const copied = ref(false)
let timeoutId: number | null = null

async function copyName() {
  try {
    await navigator.clipboard.writeText(props.displayName)
    copied.value = true
    
    // Clear existing timeout if any
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
    
    // Reset after 2 seconds
    timeoutId = window.setTimeout(() => {
      copied.value = false
      timeoutId = null
    }, 2000)
  } catch (err) {
    console.error('Failed to copy:', err)
  }
}
</script>
