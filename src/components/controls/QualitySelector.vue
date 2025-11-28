<template>
  <div class="flex flex-col gap-2">
    <div class="flex items-center justify-between">
      <Label for="quality">Quality</Label>
      <span class="text-sm text-muted-foreground">{{ qualityLabel }}</span>
    </div>
    <Slider
      id="quality"
      :model-value="[modelValue]"
      @update:model-value="$emit('update:modelValue', $event[0])"
      :min="1"
      :max="5"
      :step="1"
      class="w-full"
    />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { Slider } from '@/components/ui/slider'
import { Label } from '@/components/ui/label'

const props = defineProps({
  modelValue: Number
})

defineEmits(['update:modelValue'])

const qualityLabels = {
  1: 'Normal',
  2: 'Good',
  3: 'Outstanding',
  4: 'Excellent',
  5: 'Masterpiece'
}

const qualityLabel = computed(() => qualityLabels[props.modelValue] || 'Normal')
</script>
