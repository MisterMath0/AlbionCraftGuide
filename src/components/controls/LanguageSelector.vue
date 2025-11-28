<template>
  <Popover>
    <PopoverTrigger as-child>
      <Button variant="outline" class="w-[180px] justify-between">
        {{ modelValue }}
        <ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
      </Button>
    </PopoverTrigger>
    <PopoverContent class="w-[180px] p-0">
      <Command>
        <CommandInput placeholder="Search language..." />
        <CommandEmpty>No language found.</CommandEmpty>
        <CommandList>
          <CommandGroup>
            <CommandItem
              v-for="lang in languages"
              :key="lang"
              :value="lang"
              @select="$emit('update:modelValue', lang)"
            >
              <Check
                class="mr-2 h-4 w-4"
                :class="modelValue === lang ? 'opacity-100' : 'opacity-0'"
              />
              {{ lang }}
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </PopoverContent>
  </Popover>
</template>

<script setup>
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { Check, ChevronsUpDown } from 'lucide-vue-next'
import { LANGUAGES } from '@/utils/localization'

defineProps({
  modelValue: String
})

defineEmits(['update:modelValue'])

const languages = LANGUAGES
</script>
