<template>
  <Button @click="toggleValue" variant="outline">
    {{ modelValue ? 'Show All' : 'Hide Unprofitable' }}
  </Button>
</template>

<script setup>
import { Button } from '@/components/ui/button'

const props = defineProps({
  modelValue: { type: Boolean, default: false }
})

const emit = defineEmits(['update:modelValue'])

function toggleValue() {
  emit('update:modelValue', !props.modelValue)
}
</script>
