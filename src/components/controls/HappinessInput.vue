<template>
  <div class="flex flex-col gap-2">
    <Label for="happiness">Happiness</Label>
    <Input
      id="happiness"
      type="number"
      step="0.1"
      min="0"
      :model-value="modelValue"
      @update:model-value="$emit('update:modelValue', parseFloat($event) || 0)"
    />
  </div>
</template>

<script setup>
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

defineProps({
  modelValue: Number
})

defineEmits(['update:modelValue'])
</script>