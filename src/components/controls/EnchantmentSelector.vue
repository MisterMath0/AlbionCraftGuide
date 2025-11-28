<template>
  <div class="flex flex-col gap-2">
    <div class="flex items-center justify-between">
      <Label for="enchantment">Enchantment</Label>
      <span class="text-sm text-muted-foreground">{{ enchantmentLabel }}</span>
    </div>
    <Slider
      id="enchantment"
      :model-value="[modelValue]"
      @update:model-value="$emit('update:modelValue', $event[0])"
      :min="0"
      :max="4"
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

const enchantmentLabels = {
  0: '.0',
  1: '.1',
  2: '.2',
  3: '.3',
  4: '.4'
}

const enchantmentLabel = computed(() => enchantmentLabels[props.modelValue] || '.0')
</script>
