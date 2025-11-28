<script setup lang="ts">
import { computed } from 'vue'
import {
  IconChefHat,
  IconFlask,
  IconMeat,
  IconHorse,
  IconTool,
  IconSword,
  IconWand,
  IconBow,
  IconHelp,
  IconInnerShadowTop,
  IconSearch,
  IconSettings,
  IconBookmark,
} from "@tabler/icons-vue"

import NavDocuments from '@/components/NavDocuments.vue'
import NavMain from '@/components/NavMain.vue'
import NavSecondary from '@/components/NavSecondary.vue'
import NavUser from '@/components/NavUser.vue'

interface Preset {
  id: string
  name: string
  craftType: string
}

const props = defineProps<{
  currentView?: string
  presets?: Preset[]
  selectedPresetId?: string
}>()

const emit = defineEmits<{
  navigate: [view: string]
  selectPreset: [id: string]
  deletePreset: [id: string]
  createPreset: []
}>()
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Cooking",
      url: "cooking",
      icon: IconChefHat,
    },
    {
      title: "Alchemy",
      url: "alchemy",
      icon: IconFlask,
    },
    {
      title: "Butcher",
      url: "butcher",
      icon: IconMeat,
    },
    {
      title: "Saddler",
      url: "saddler",
      icon: IconHorse,
    },
    {
      title: "Toolmaker",
      url: "toolmaker",
      icon: IconTool,
    },
    {
      title: "Warrior's Forge",
      url: "warriorsforge",
      icon: IconSword,
    },
    {
      title: "Mage's Tower",
      url: "magestower",
      icon: IconWand,
    },
    {
      title: "Hunter's Lodge",
      url: "hunterslodge",
      icon: IconBow,
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "#",
      icon: IconSettings,
    },
    {
      title: "Get Help",
      url: "#",
      icon: IconHelp,
    }
  ],
}

const presetsDocuments = computed(() => {
  if (!props.presets || props.presets.length === 0) return []
  
  return props.presets.map(preset => ({
    name: preset.name,
    url: preset.id,
    icon: IconBookmark,
  }))
})
</script>

<template>
  <Sidebar collapsible="offcanvas">
    <SidebarHeader>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton
            as-child
            class="data-[slot=sidebar-menu-button]:!p-1.5"
          >
            <a href="#">
              <IconInnerShadowTop class="!size-5" />
              <span class="text-base font-semibold">Albion Craft</span>
            </a>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
    <SidebarContent>
      <NavMain 
        :items="data.navMain" 
        :active-url="currentView"
        @navigate="emit('navigate', $event)"
        @create="emit('createPreset')"
      />
      <NavDocuments 
        v-if="presetsDocuments.length > 0" 
        :items="presetsDocuments" 
        :active-url="selectedPresetId"
        @select="emit('selectPreset', $event)"
        @delete="emit('deletePreset', $event)"
      />
      <NavSecondary :items="data.navSecondary" class="mt-auto" />
    </SidebarContent>
    <SidebarFooter>
      <NavUser :user="data.user" />
    </SidebarFooter>
  </Sidebar>
</template>
