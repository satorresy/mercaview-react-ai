import { Market } from './types';

export const mockMarkets: Market[] = [
  {
    id: "magdalena",
    name: "Mercado Central de Magdalena",
    distance: "A 1.2 km de ti",
    rating: 4.6,
    reviewsCount: 245,
    tags: ["Frutas", "Carnes", "Abarrotes"],
    imageUrl: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80",
    isOpen: true,
    statusText: "Abierto ahora",
    highlightedOffers: [
      {
        id: "spinach_offer",
        stallId: "la-huerta",
        name: "Espinaca Orgánica",
        origin: "Verdulería \"La Huerta\"",
        price: 2.50,
        originalPrice: 3.50,
        imageUrl: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: "eggs_offer",
        stallId: "granja-molino",
        name: "Huevos de Corral (Docena)",
        origin: "Granja El Molino",
        price: 8.00,
        originalPrice: 9.50,
        discountText: "-15%",
        imageUrl: "https://images.unsplash.com/photo-1516448424440-9dbca97779c1?auto=format&fit=crop&w=800&q=80"
      }
    ],
    stalls: [
      {
        id: "donia-maria",
        marketId: "magdalena",
        name: "Frutería Doña María",
        category: "frutas",
        categoryLabel: "Frutas y Verduras Orgánicas",
        rating: 4.8,
        reviewsCount: 124,
        tags: ["FRUTAS Y VERDURAS ORGÁNICAS"],
        description: "Especialistas en la selección de frutas frescas de estación y verduras orgánicas de alta calidad.",
        location: "Pasillo 3, Stand 15",
        workingHours: "Hoy: 08:00 AM - 06:00 PM",
        imageUrl: "https://images.unsplash.com/photo-1516594798947-e65505dbb29d?auto=format&fit=crop&w=800&q=80",
        isOpen: true,
        products: [
          {
            id: "purple_corn",
            stallId: "donia-maria",
            name: "Maíz Morado",
            origin: "Valle Sagrado",
            price: 3.50,
            originalPrice: 4.20,
            discountText: "-20% OFERTA",
            imageUrl: "https://images.unsplash.com/photo-1508747703725-719777637510?auto=format&fit=crop&w=800&q=80",
            isOrganic: true
          },
          {
            id: "lucuma",
            stallId: "donia-maria",
            name: "Lúcuma de Seda",
            origin: "Fruta Natural",
            price: 8.00,
            imageUrl: "https://images.unsplash.com/photo-1610970881699-44a5587cabec?auto=format&fit=crop&w=800&q=80",
            isOrganic: false
          },
          {
            id: "platano",
            stallId: "donia-maria",
            name: "Plátano Orgánico",
            origin: "Fruta de la Selva",
            price: 4.50,
            imageUrl: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=800&q=80",
            isOrganic: true
          }
        ]
      },
      {
        id: "donia-juani",
        marketId: "magdalena",
        name: "Frutas Doña Juani",
        category: "frutas",
        categoryLabel: "Frutas y Verduras",
        rating: 4.9,
        reviewsCount: 310,
        tags: ["ORGÁNICO"],
        description: "Especialistas en frutas de temporada y verduras orgánicas traídas directamente del huerto.",
        location: "Pasillo 2, Stand 45",
        workingHours: "Abierto • Cierra 6:00 PM",
        imageUrl: "https://images.unsplash.com/photo-1610348725531-843dff563e2c?auto=format&fit=crop&w=800&q=80",
        isOpen: true,
        products: [
          {
            id: "naranjas",
            stallId: "donia-juani",
            name: "Naranjas de Chanchamayo",
            origin: "Chanchamayo",
            price: 4.00,
            imageUrl: "https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?auto=format&fit=crop&w=800&q=80",
            isOrganic: true
          },
          {
            id: "mango",
            stallId: "donia-juani",
            name: "Mango Kent Premium",
            origin: "Piura",
            price: 6.50,
            imageUrl: "https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=800&q=80"
          }
        ]
      },
      {
        id: "huerto-pedro",
        marketId: "magdalena",
        name: "El Huerto de Pedro",
        category: "frutas",
        categoryLabel: "Frutas y Verduras",
        rating: 4.7,
        reviewsCount: 198,
        tags: ["VERDURAS"],
        description: "Gran variedad de papas andinas, tubérculos y hortalizas frescas del día.",
        location: "Pasillo 4, Stand 12",
        workingHours: "Abierto • Cierra 7:00 PM",
        imageUrl: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80",
        isOpen: true,
        products: [
          {
            id: "papa_amarilla",
            stallId: "huerto-pedro",
            name: "Papa Amarilla Orgánica",
            origin: "Andes Centrales",
            price: 3.20,
            originalPrice: 3.80,
            discountText: "-15% Oferta",
            imageUrl: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=800&q=80"
          }
        ]
      },
      {
        id: "fruteria-el-sol",
        marketId: "magdalena",
        name: "Frutería El Sol",
        category: "frutas",
        categoryLabel: "Frutas & Verduras",
        rating: 4.9,
        reviewsCount: 88,
        tags: ["Frutas"],
        description: "Frutas orgánicas y de temporada. La mejor frescura del pasillo principal.",
        location: "Pasillo Principal",
        workingHours: "Hoy: 08:00 AM - 06:00 PM",
        imageUrl: "https://images.unsplash.com/photo-1610348725531-843dff563e2c?auto=format&fit=crop&w=800&q=80",
        isOpen: true,
        products: []
      },
      {
        id: "carniceria-gomez",
        marketId: "magdalena",
        name: "Carnicería Gomez",
        category: "carnes",
        categoryLabel: "Carnes & Pescados",
        rating: 4.8,
        reviewsCount: 142,
        tags: ["Carnes"],
        description: "Cortes premium y carnes frescas seleccionadas con cuidado todos los días.",
        location: "Sector C, Puesto 42",
        workingHours: "Hoy: 07:00 AM - 05:00 PM",
        imageUrl: "https://images.unsplash.com/photo-1603048588665-791ca8aea617?auto=format&fit=crop&w=800&q=80",
        isOpen: true,
        products: [
          {
            id: "carne_asado",
            stallId: "carniceria-gomez",
            name: "Asado de Tira Beef",
            origin: "La Pampa",
            price: 24.90,
            imageUrl: "https://images.unsplash.com/photo-1603048588665-791ca8aea617?auto=format&fit=crop&w=800&q=80"
          }
        ]
      }
    ]
  },
  {
    id: "surquillo",
    name: "Mercado Surquillo N° 1",
    distance: "A 2.5 km de ti",
    rating: 4.8,
    reviewsCount: 512,
    tags: ["Pescados frescos", "Especias"],
    imageUrl: "https://images.unsplash.com/photo-1534482421-64566f976cfa?auto=format&fit=crop&w=800&q=80",
    isOpen: true,
    statusText: "Abierto ahora",
    highlightedOffers: [
      {
        id: "fish_offer",
        stallId: "pescaderia-mar",
        name: "Filete de Corvina Fresca",
        origin: "Pescadería \"Del Mar\"",
        price: 18.00,
        originalPrice: 22.00,
        imageUrl: "https://images.unsplash.com/photo-1534482421-64566f976cfa?auto=format&fit=crop&w=800&q=80"
      }
    ],
    stalls: [
      {
        id: "pescaderia-mar",
        marketId: "surquillo",
        name: "Pescadería Del Mar",
        category: "pescados",
        categoryLabel: "Pescados & Mariscos",
        rating: 4.8,
        reviewsCount: 320,
        tags: ["PESCADOS FRESCOS"],
        description: "El mejor pescado fresco traído del terminal del Callao de madrugada.",
        location: "Pasillo Central, Stand 4",
        workingHours: "Hoy: 06:00 AM - 03:00 PM",
        imageUrl: "https://images.unsplash.com/photo-1534482421-64566f976cfa?auto=format&fit=crop&w=800&q=80",
        isOpen: true,
        products: []
      }
    ]
  },
  {
    id: "san-isidro",
    name: "Mercado de Productores de San Isidro",
    distance: "A 4.1 km de ti",
    rating: 4.9,
    reviewsCount: 890,
    tags: ["Premium", "Orgánico"],
    imageUrl: "https://images.unsplash.com/photo-1534080391025-347b4c98a0f7?auto=format&fit=crop&w=800&q=80",
    isOpen: false,
    statusText: "Cerrado (Abre 7:00 AM)",
    highlightedOffers: [],
    stalls: []
  }
];

export const searchSuggestions = [
  "Papas amarillas organicas",
  "Mercado Surquillo Carnes"
];
