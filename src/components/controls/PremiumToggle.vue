<template>
  <div class="flex flex-col gap-2">
    <Label for="premium" class="text-sm font-medium">Premium</Label>
    <div class="flex items-center gap-2">
      <Input
        id="premium"
        type="checkbox"
        :checked="modelValue"
        @change="$emit('update:modelValue', $event.target.checked)"
        class="h-4 w-4 rounded border-gray-300 text-primary focus:ring-2 focus:ring-primary"
      />
      <span class="text-sm text-muted-foreground">{{ modelValue ? 'Enabled' : 'Disabled' }}</span>
    </div>
  </div>
</template>

<script setup>
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'

defineProps({
  modelValue: Boolean
})

defineEmits(['update:modelValue'])
</script>
