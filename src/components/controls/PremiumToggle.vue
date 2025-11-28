<template>
  <div class="flex items-center gap-2">
    <Switch
      id="premium"
      :checked="modelValue"
      @update:checked="$emit('update:modelValue', $event)"
    />
    <Label for="premium" class="text-sm font-medium">Premium</Label>
  </div>
</template>

<script setup>
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'

defineProps({
  modelValue: Boolean
})

defineEmits(['update:modelValue'])
</script>
