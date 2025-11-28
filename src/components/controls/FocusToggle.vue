<template>
  <div class="flex items-center gap-2">
    <Switch
      id="focus"
      :checked="modelValue"
      @update:checked="$emit('update:modelValue', $event)"
    />
    <Label for="focus" class="text-sm font-medium">Focus</Label>
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