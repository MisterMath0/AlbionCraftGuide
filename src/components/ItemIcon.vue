<template>
  <img 
    :src="iconUrl" 
    :alt="alt || itemId"
    :class="cn('object-contain', props.class)"
    loading="lazy"
    @error="handleError"
  />
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { cn } from '@/lib/utils'

interface Props {
  itemId: string
  quality?: number // 1-5: Normal, Good, Outstanding, Excellent, Masterpiece
  size?: number // API fetch size: 1-217
  displaySize?: string // CSS class for display size (e.g., 'w-8 h-8')
  alt?: string
  class?: string
}

const props = withDefaults(defineProps<Props>(), {
  quality: 1,
  size: 217, // Fetch at max resolution
  displaySize: 'w-8 h-8',
  class: ''
})

const hasError = ref(false)

const iconUrl = computed(() => {
  if (hasError.value) {
    // Fallback to a simpler version without quality if error
    return `https://render.albiononline.com/v1/item/${encodeURIComponent(props.itemId)}.png?size=${props.size}`
  }
  return `https://render.albiononline.com/v1/item/${encodeURIComponent(props.itemId)}.png?quality=${props.quality}&size=${props.size}`
})

function handleError() {
  hasError.value = true
}
</script>
