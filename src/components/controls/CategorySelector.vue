<template>
  <div class="flex flex-col gap-2">
    <Label for="category">Category</Label>
    <Select :model-value="String(modelValue)" @update:model-value="$emit('update:modelValue', parseInt($event))">
      <SelectTrigger id="category" class="w-full">
        <SelectValue placeholder="Select category" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem v-for="cat in categories" :key="cat.value" :value="String(cat.value)">
          {{ cat.label }}
        </SelectItem>
      </SelectContent>
    </Select>
  </div>
</template>

<script setup>
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Label } from '@/components/ui/label'

defineProps({
  modelValue: Number,
  categories: { type: Array, required: true }
})

defineEmits(['update:modelValue'])
</script>