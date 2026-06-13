export interface Product {
  id: string;
  stallId: string;
  name: string;
  origin: string; // e.g. "Valle Sagrado" or "Verdulería Lomas"
  price: number; // e.g. 3.50
  originalPrice?: number; // e.g. 4.20
  discountText?: string; // e.g. "-20% OFERTA"
  imageUrl: string;
  isOrganic?: boolean;
}

export interface Stall {
  id: string;
  marketId: string;
  name: string;
  category: 'frutas' | 'carnes' | 'especias' | 'abarrotes' | 'pescados';
  categoryLabel: string;
  rating: number;
  reviewsCount: number;
  tags: string[];
  description: string;
  location: string; // e.g. "Pasillo 3, Stand 15"
  workingHours: string; // e.g. "Hoy: 08:00 AM - 06:00 PM"
  imageUrl: string;
  isOpen: boolean;
  products: Product[];
}

export interface Market {
  id: string;
  name: string;
  distance: string; // e.g. "A 1.2 km de ti"
  rating: number;
  reviewsCount: number;
  tags: string[];
  imageUrl: string;
  isOpen: boolean;
  statusText: string; // e.g. "Abierto ahora", "Cerrado (Abre 7:00 AM)"
  stalls: Stall[];
  highlightedOffers: Product[];
}
