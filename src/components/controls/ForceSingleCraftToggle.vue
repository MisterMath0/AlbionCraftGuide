<template>
  <div class="flex flex-col gap-2">
    <Label for="single" class="text-sm font-medium">Force Single Craft</Label>
    <div class="flex items-center gap-2">
      <Input
        id="single"
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
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

defineProps({
  modelValue: Boolean
})

defineEmits(['update:modelValue'])
</script>
