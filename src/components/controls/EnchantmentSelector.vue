<template>
  <div class="flex flex-col gap-2">
    <Label class="text-sm font-medium">Enchantment</Label>
    <div class="flex gap-1">
      <Toggle
        :pressed="modelValue === 0"
        @click="$emit('update:modelValue', 0)"
        aria-label="No enchantment"
        class="data-[state=off]:bg-gray-500/20 data-[state=off]:text-gray-600 data-[state=on]:bg-gray-500 data-[state=on]:text-white"
      >
        0
      </Toggle>
      <Toggle
        :pressed="modelValue === 1"
        @click="$emit('update:modelValue', 1)"
        aria-label="Enchantment 1"
        class="data-[state=off]:bg-green-600/20 data-[state=off]:text-green-700 data-[state=on]:bg-green-600 data-[state=on]:text-white"
      >
        1
      </Toggle>
      <Toggle
        :pressed="modelValue === 2"
        @click="$emit('update:modelValue', 2)"
        aria-label="Enchantment 2"
        class="data-[state=off]:bg-blue-600/20 data-[state=off]:text-blue-700 data-[state=on]:bg-blue-600 data-[state=on]:text-white"
      >
        2
      </Toggle>
      <Toggle
        :pressed="modelValue === 3"
        @click="$emit('update:modelValue', 3)"
        aria-label="Enchantment 3"
        class="data-[state=off]:bg-purple-600/20 data-[state=off]:text-purple-700 data-[state=on]:bg-purple-600 data-[state=on]:text-white"
      >
        3
      </Toggle>
    </div>
  </div>
</template>

<script setup>
import { Toggle } from '@/components/ui/toggle'
import { Label } from '@/components/ui/label'

defineProps({
  modelValue: Number
})

defineEmits(['update:modelValue'])
</script>
