export type Affinity = 'Braise' | 'Écryme' | 'Soléane' | 'Umbra' | 'Obsidienne' | 'Brume';
export type Rarity = 'Commune' | 'Peu Commune' | 'Rare' | 'Mythique';
export type CardStatus = 'Validée' | 'À revoir' | 'Draft';

export interface Card {
  id: string;
  setNumber: number;
  name: string;
  affinity: Affinity;
  rarity: Rarity;
  type: 'Créature';
  cost: number;
  atk: number;
  def: number;
  physical: string;
  spiritualBonus: string;
  spiritualEffect?: string;
  reincarnation: string;
  keywords?: string[];
  status: CardStatus;
  note?: string;
}
