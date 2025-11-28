<template>
  <div class="flex flex-col gap-2">
    <label :for="id" class="text-sm font-medium">{{ label }}</label>
    <Select :model-value="modelValue" @update:model-value="$emit('update:modelValue', $event)">
      <SelectTrigger :id="id" class="w-full">
        <SelectValue :placeholder="`Select ${label.toLowerCase()}`" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem v-for="city in cities" :key="city" :value="city">
          {{ city }}
        </SelectItem>
      </SelectContent>
    </Select>
  </div>
</template>

<script setup>
import { useSettings } from '@/composables/useSettings'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

defineProps({
  modelValue: String,
  label: { type: String, default: 'City' },
  id: { type: String, default: 'city' }
})

defineEmits(['update:modelValue'])

const { CITIES: cities } = useSettings()
</script>