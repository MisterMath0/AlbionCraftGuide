<template>
  <div id="app" class="min-h-screen bg-background">
    <header class="border-b">
      <div class="container mx-auto px-4 py-4">
        <nav class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <h1 class="text-xl font-bold">Albion Craft Guide</h1>
          </div>
          
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink href="#" :class="navigationMenuTriggerStyle()">
                  Cooking
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink href="#" :class="navigationMenuTriggerStyle()">
                  Alchemy
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink href="#" :class="navigationMenuTriggerStyle()">
                  Refining
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink href="#" :class="navigationMenuTriggerStyle()">
                  Crafting
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </nav>
      </div>
    </header>
    
    <main class="container mx-auto px-4 py-6">
      <CookingView />
    </main>
  </div>
</template>

<script setup>
import CookingView from './views/CookingView.vue'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
</script>
