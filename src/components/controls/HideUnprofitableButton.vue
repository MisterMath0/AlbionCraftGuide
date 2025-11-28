<template>
  <Button @click="$emit('click')" variant="outline">
    {{ hideUnprofitable ? 'Show All' : 'Hide Unprofitable' }}
  </Button>
</template>

<script setup>
import { Button } from '@/components/ui/button'

defineProps({
  hideUnprofitable: { type: Boolean, default: false }
})

defineEmits(['click'])
</script>
