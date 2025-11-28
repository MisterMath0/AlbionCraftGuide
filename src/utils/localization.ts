export type Language = 'EN-US' | 'DE-DE' | 'FR-FR' | 'RU-RU' | 'PL-PL' | 'ES-ES' | 'PT-BR' | 'IT-IT' | 'ZH-CN' | 'KO-KR' | 'JA-JP' | 'ZH-TW' | 'ID-ID' | 'TR-TR' | 'AR-SA'

export const LANGUAGES: Language[] = [
  'EN-US',
  'DE-DE',
  'FR-FR',
  'RU-RU',
  'PL-PL',
  'ES-ES',
  'PT-BR',
  'IT-IT',
  'ZH-CN',
  'KO-KR',
  'JA-JP',
  'ZH-TW',
  'ID-ID',
  'TR-TR',
  'AR-SA'
]

export interface LocalizedItemNames {
  get(itemId: string): string
  localized_map: Map<string, Map<Language, string>>
}

export async function loadItemNames(): Promise<LocalizedItemNames> {
  // Dynamic import to avoid blocking initial load
  const module = await import('./names.js')
  return (module as any).ITEM_NAMES
}

// Helper function to get item name with fallback
export function getItemName(itemId: string, language: Language, itemNames: LocalizedItemNames | null): string {
  if (!itemNames) return itemId

  const item = itemNames.localized_map.get(itemId)
  if (!item) {
    // Try without enchantment suffix (@1, @2, @3)
    if (itemId.includes('@')) {
      const baseId = itemId.substring(0, itemId.length - 2)
      const baseItem = itemNames.localized_map.get(baseId)
      if (baseItem) {
        return baseItem.get(language) || itemId
      }
    }
    return itemId
  }

  return item.get(language) || itemId
}
