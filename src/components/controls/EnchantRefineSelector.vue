<template>
  <div class="flex flex-col gap-2">
    <Label for="enchant-refine">Enchant Refine</Label>
    <Select :model-value="String(modelValue)" @update:model-value="$emit('update:modelValue', parseInt($event))">
      <SelectTrigger id="enchant-refine" class="w-full">
        <SelectValue placeholder="Select upgrade" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem v-for="upgrade in upgrades" :key="upgrade.value" :value="String(upgrade.value)">
          {{ upgrade.label }}
        </SelectItem>
      </SelectContent>
    </Select>
  </div>
</template>

<script setup>
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { ENCHANT_UPGRADES } from '@/utils/constants'

defineProps({
  modelValue: Number
})

defineEmits(['update:modelValue'])

const upgrades = ENCHANT_UPGRADES
</script>
