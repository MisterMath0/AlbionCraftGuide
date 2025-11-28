<template>
  <div class="flex flex-col gap-2">
    <Label for="tier">Tier</Label>
    <Select :model-value="String(modelValue)" @update:model-value="$emit('update:modelValue', parseInt($event))">
      <SelectTrigger id="tier" class="w-full">
        <SelectValue placeholder="Select tier" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem v-for="tier in tiers" :key="tier.value" :value="String(tier.value)">
          {{ tier.label }}
        </SelectItem>
      </SelectContent>
    </Select>
  </div>
</template>

<script setup>
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { TIERS } from '@/utils/constants'

defineProps({
  modelValue: Number
})

defineEmits(['update:modelValue'])

const tiers = TIERS
</script>