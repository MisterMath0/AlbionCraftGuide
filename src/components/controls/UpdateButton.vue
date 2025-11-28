<template>
  <Button @click="$emit('click')" :disabled="loading">
    <Spinner v-if="loading" />
    {{ loading ? 'Updating...' : 'Update' }}
  </Button>
</template>

<script setup>
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'

defineProps({
  loading: { type: Boolean, default: false }
})

defineEmits(['click'])
</script>