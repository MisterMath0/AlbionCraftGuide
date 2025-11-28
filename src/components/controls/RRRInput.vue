<template>
  <div class="flex flex-col gap-2">
    <Label for="rrr" class="text-sm font-medium">{{ label }}</Label>
    <InputGroup>
      <InputGroupButton @click="decrementValue">
        <Minus class="w-4 h-4" />
      </InputGroupButton>
      <InputGroupInput
        id="rrr"
        type="number"
        step="0.1"
        min="0"
        max="100"
        :model-value="displayValue"
        @update:model-value="handleUpdate"
        class="text-center"
      />
      <InputGroupButton @click="incrementValue">
        <Plus class="w-4 h-4" />
      </InputGroupButton>
    </InputGroup>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { InputGroup, InputGroupButton, InputGroupInput } from '@/components/ui/input-group'
import { Label } from '@/components/ui/label'
import { Minus, Plus } from 'lucide-vue-next'

const props = defineProps({
  modelValue: Number,
  label: { type: String, default: 'Resource Return Rate %' }
})

const emit = defineEmits(['update:modelValue'])

// Convert decimal to percentage for display
const displayValue = computed(() => {
  return (props.modelValue * 100).toFixed(1)
})

// Convert percentage back to decimal
function handleUpdate(value) {
  const percentage = parseFloat(value) || 0
  const decimal = percentage / 100
  emit('update:modelValue', decimal)
}

function decrementValue() {
  const current = parseFloat(displayValue.value)
  const newValue = Math.max(0, current - 0.1)
  emit('update:modelValue', newValue / 100)
}

function incrementValue() {
  const current = parseFloat(displayValue.value)
  const newValue = Math.min(100, current + 0.1)
  emit('update:modelValue', newValue / 100)
}
</script>
