<template>
  <div class="flex flex-col gap-2">
    <Label for="nutrition">Nutrition Cost</Label>
    <InputGroup>
      <InputGroupButton @click="$emit('update:modelValue', Math.max(0, modelValue - 10))">
        <Minus class="w-4 h-4" />
      </InputGroupButton>
      <InputGroupInput
        id="nutrition"
        type="number"
        step="10"
        min="0"
        :model-value="modelValue"
        @update:model-value="$emit('update:modelValue', parseFloat($event) || 0)"
        class="text-center"
      />
      <InputGroupButton @click="$emit('update:modelValue', modelValue + 10)">
        <Plus class="w-4 h-4" />
      </InputGroupButton>
    </InputGroup>
  </div>
</template>

<script setup>
import { InputGroup, InputGroupButton, InputGroupInput } from '@/components/ui/input-group'
import { Label } from '@/components/ui/label'
import { Minus, Plus } from 'lucide-vue-next'

defineProps({
  modelValue: Number
})

defineEmits(['update:modelValue'])
</script>
