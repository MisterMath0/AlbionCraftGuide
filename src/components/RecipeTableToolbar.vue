<template>
  <div class="flex items-center justify-between gap-2 py-4">
    <div class="flex flex-1 items-center gap-2">
      <Input
        placeholder="Filter by name..."
        :model-value="filterValue"
        class="h-8 w-[150px] lg:w-[250px]"
        @update:model-value="updateFilter"
      />
    </div>
    
    <div class="flex items-center gap-2">
      <DropdownMenu v-if="table">
        <DropdownMenuTrigger as-child>
          <Button variant="outline" size="sm" class="h-8">
            <MoreHorizontal class="mr-2 h-4 w-4" />
            View
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" class="w-[150px]">
          <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuCheckboxItem
            v-for="column in table.getAllColumns().filter((col: any) => col.getCanHide())"
            :key="column.id"
            class="capitalize"
            :checked="column.getIsVisible()"
            @update:checked="(value: any) => column.toggleVisibility(!!value)"
          >
            {{ column.id }}
          </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>
      
      <Button
        v-if="table && table.getFilteredSelectedRowModel().rows.length > 0"
        variant="default"
        size="sm"
        class="h-8"
        @click="emit('savePreset')"
      >
        Save as Preset
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { MoreHorizontal } from 'lucide-vue-next'

const props = defineProps<{
  table?: any
  itemNames?: any
}>()

const emit = defineEmits<{
  savePreset: []
}>()

const filterValue = computed(() => 
  props.table?.getColumn('productName')?.getFilterValue() || ''
)

const updateFilter = (value: string | number) => {
  props.table?.getColumn('productName')?.setFilterValue(String(value))
}
</script>
