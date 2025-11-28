<template>
  <div class="flex flex-col gap-2">
    <Label for="rrr" class="text-sm font-medium">{{ label }}</Label>
      <Input
        id="rrr"
        type="number"
        step="0.1"
        min="0"
        max="100"
        :model-value="displayValue"
        @update:model-value="handleUpdate"
      /> 
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const props = defineProps({
  modelValue: Number,
  label: { type: String, default: 'Resource Return Rate' }
})

const emit = defineEmits(['update:modelValue'])

// Convert decimal to percentage for display
const displayValue = computed(() => {
  return (props.modelValue * 100).toFixed(1)
})

// Convert percentage back to decimal
function handleUpdate(value) {
  const percentage = parseFloat(value) || 0
  const decimal = percentage / 100
  emit('update:modelValue', decimal)
}
</script>
