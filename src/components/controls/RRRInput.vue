<template>
  <div class="flex flex-col gap-2">
    <Label for="rrr" class="text-sm font-medium">{{ label }}</Label>
    <Input
      id="rrr"
      type="number"
      step="0.001"
      min="0"
      max="1"
      :model-value="modelValue"
      @update:model-value="$emit('update:modelValue', parseFloat($event) || 0)"
    />
  </div>
</template>

<script setup>
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
defineProps({
  modelValue: Number,
  label: { type: String, default: 'Resource Return Rate' }
})

defineEmits(['update:modelValue'])
</script>
