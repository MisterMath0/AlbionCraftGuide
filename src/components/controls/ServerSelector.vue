<template>
  <div class="flex flex-col gap-2">
    <label for="server" class="text-sm font-medium">Server</label>
    <Select :model-value="modelValue" @update:model-value="$emit('update:modelValue', $event)">
      <SelectTrigger id="server" class="w-full">
        <SelectValue placeholder="Select server" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem v-for="srv in servers" :key="srv.value" :value="srv.value">
          {{ srv.label }}
        </SelectItem>
      </SelectContent>
    </Select>
  </div>
</template>

<script setup>
import { useSettings } from '@/composables/useSettings'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

defineProps({
  modelValue: String
})

defineEmits(['update:modelValue'])

const { SERVERS: servers } = useSettings()
</script>