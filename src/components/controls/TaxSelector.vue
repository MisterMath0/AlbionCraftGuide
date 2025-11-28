<template>
  <div class="flex flex-col gap-2">
    <Label for="tax">Tax</Label>
    <Select :model-value="String(modelValue)" @update:model-value="$emit('update:modelValue', parseInt($event))">
      <SelectTrigger id="tax" class="w-full">
        <SelectValue placeholder="Select tax" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem v-for="tax in taxOptions" :key="tax.value" :value="String(tax.value)">
          {{ tax.label }}
        </SelectItem>
      </SelectContent>
    </Select>
  </div>
</template>

<script setup>
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { TAX_OPTIONS } from '@/utils/constants'

defineProps({
  modelValue: Number
})

defineEmits(['update:modelValue'])

const taxOptions = TAX_OPTIONS
</script>