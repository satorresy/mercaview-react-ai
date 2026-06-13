import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { Search, MapPin, Star, Plus, Check, Map, Compass, ChevronRight } from 'lucide-react';
import Header from '../components/Header';
import BottomNavBar from '../components/BottomNavBar';
import { mockMarkets } from '../data';

export default function MarketOverviewScreen() {
  const { marketId } = useParams<{ marketId: string }>();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Find targeted market under route; fallback to 'magdalena' to guarantee rendering
  const currentMarket = mockMarkets.find(m => m.id === marketId) || mockMarkets[0];

  const [cartBadge, setCartBadge] = useState<number>(0);
  const [addedItems, setAddedItems] = useState<string[]>([]);
  const [showMapLocator, setShowMapLocator] = useState<boolean>(false);
  const [locatedStall, setLocatedStall] = useState<string | null>(null);

  useEffect(() => {
    const locateId = searchParams.get('locate');
    if (locateId) {
      const targetStall = currentMarket.stalls.find(s => s.id === locateId);
      if (targetStall) {
        setShowMapLocator(true);
        setLocatedStall(`¡Puesto "${targetStall.name}" localizado en el ${targetStall.location}!`);
      }
    }
  }, [searchParams, currentMarket]);

  const handleAddItem = (itemId: string, name: string) => {
    if (addedItems.includes(itemId)) {
      // Remove or decrement
      setAddedItems(addedItems.filter(id => id !== itemId));
      setCartBadge(prev => Math.max(0, prev - 1));
    } else {
      setAddedItems([...addedItems, itemId]);
      setCartBadge(prev => prev + 1);
    }
  };

  const handleLocalize = () => {
    setShowMapLocator(true);
    setLocatedStall(null);
    // Auto showcase locations after small timeout
    setTimeout(() => {
      setLocatedStall("¡Pasillo 3, Stand 15 (Frutería Doña María) localizado!");
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#faf8f5] pb-24 max-w-md mx-auto relative overflow-x-hidden shadow-sm">
      <Header showBack={true} />

      {/* Dynamic Cart Indicator Overlay if user selects daily deals */}
      {cartBadge > 0 && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 bg-[#3c7657] text-white py-2 px-5 rounded-full shadow-lg z-50 text-xs font-semibold flex items-center gap-2 animate-bounce">
          <span>🛒 Carrito: {cartBadge} {cartBadge === 1 ? 'item' : 'items'} agregados</span>
          <button id="checkout-simulate-btn" onClick={() => {alert("¡Gracias por interactuar! Has simulado pedir del " + currentMarket.name); setCartBadge(0); setAddedItems([])}} className="underline decoration-dotted text-emerald-100 pl-1">Ver pedido</button>
        </div>
      )}

      {/* Top Banner Architectural layout representation */}
      <div className="relative h-[220px] bg-[#df8d4f] overflow-hidden flex flex-col justify-end">
        {/* Isometric view simulated overlay structure */}
        <div className="absolute inset-0 bg-gradient-to-[#df8d4f] opacity-80" />
        <img
          src="https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&w=800&q=80"
          alt="Market architectural grid layout background pattern"
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-35"
        />

        {/* Clean aesthetic isometric stylized layout rings mimicking map preview screen */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-[310px] h-[150px] bg-amber-500/10 border-2 border-white/25 rounded-[40px] rotate-[15deg] transform flex items-center justify-center shadow-inner">
          <div className="relative w-[240px] h-[110px] bg-amber-100/80 rounded-[30px] shadow-md flex flex-wrap p-2 items-center justify-center gap-2 text-[10px] font-mono font-bold text-amber-900 border border-white">
            <span className="absolute top-2 left-3 px-1.5 py-0.5 bg-[#3c7657] text-white rounded-md text-[8px] flex items-center gap-0.5">🏪 P12</span>
            <span className="absolute bottom-2 right-4 px-1.5 py-0.5 bg-green-700 text-white rounded-md text-[8px]">🍃 P15</span>
            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-orange-950/70 font-sans tracking-widest text-[11px] uppercase">Plano Interior</span>
          </div>
        </div>

        {/* Action button bar floating exactly below Map layout */}
        <div className="absolute -bottom-6 left-0 right-0 px-5 flex items-center justify-between gap-3.5 z-10">
          <button
            id="to-search-floating-btn"
            onClick={() => navigate('/search')}
            className="flex-1 bg-[#3c7657] hover:bg-[#305e46] active:scale-95 text-white h-[52px] rounded-2xl flex items-center justify-center gap-2 text-[14px] font-semibold shadow-md transition-all cursor-pointer"
          >
            <Search className="w-5 h-5 text-emerald-100" />
            <span>Buscar Productos</span>
          </button>

          <button
            id="localize-stall-floating-btn"
            onClick={handleLocalize}
            className="flex-1 bg-white hover:bg-slate-50 border border-slate-200 active:scale-95 text-[#3c7657] h-[52px] rounded-2xl flex items-center justify-center gap-2 text-[14px] font-semibold shadow-md transition-all cursor-pointer"
          >
            <MapPin className="w-5 h-5 text-[#3c7657]" />
            <span>Localizar Puesto</span>
          </button>
        </div>
      </div>

      {/* Screen body */}
      <div className="px-5 pt-11">
        {/* Dynamic Map Locator Interactive Overlay */}
        {showMapLocator && (
          <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200/80 rounded-2xl animate-fade-in relative">
            <button id="close-locator-btn" onClick={() => setShowMapLocator(false)} className="absolute top-2.5 right-2.5 font-bold text-slate-500 hover:text-slate-800 text-sm">✕</button>
            <div className="flex items-start gap-3">
              <div className="p-2 bg-[#d1ead6] rounded-full text-[#3c7657] flex-shrink-0">
                <Compass className="w-5 h-5 animate-spin-slow" />
              </div>
              <div>
                <h4 className="font-semibold text-[13px] text-emerald-900 leading-tight mb-1">Guía del Comprador Inteligente</h4>
                <p className="text-[11.5px] text-emerald-700/90 leading-relaxed">
                  {locatedStall ? locatedStall : "Escaneando el plano del mercado para trazar ruta corta a pie..."}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Explorar Categorías */}
        <div className="mb-7">
          <h3 className="font-serif text-[20px] font-bold text-slate-900 mb-4">
            Explorar Categorías
          </h3>

          {/* 2 column grid of fruit and protein categories */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div
              id="category-fruits-btn"
              onClick={() => navigate('/results?q=frutas')}
              className="bg-[#fcfaf7] hover:bg-slate-50 border border-slate-100 rounded-3xl p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:shadow-sm transition-all h-[155px]"
            >
              <div className="w-[50px] h-[50px] rounded-full bg-emerald-50 text-[#3c7657] flex items-center justify-center mb-3">
                {/* Custom fruit-shaped leaf icon */}
                <div className="relative w-6 h-6 border-2 border-[#3c7657] rounded-full flex items-center justify-center">
                  <span className="absolute -top-1 right-0.5 w-1.5 h-1.5 bg-[#3c7657] rounded-full"></span>
                  <span className="text-[10px] font-bold"></span>
                </div>
              </div>
              <span className="font-semibold text-[14px] text-slate-800 tracking-tight">
                Frutas & Verduras
              </span>
            </div>

            <div
              id="category-protein-btn"
              onClick={() => navigate('/results?q=carnes')}
              className="bg-[#fcfaf7] hover:bg-slate-50 border border-slate-100 rounded-3xl p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:shadow-sm transition-all h-[155px]"
            >
              <div className="w-[50px] h-[50px] rounded-full bg-orange-50 text-orange-800 flex items-center justify-center mb-3">
                {/* Meat/Fish representation icon */}
                <span className="text-xl font-bold">🥩</span>
              </div>
              <span className="font-semibold text-[14px] text-slate-800 tracking-tight">
                Carnes & Pescados
              </span>
            </div>
          </div>

          {/* Full-width horizontal grocery card */}
          <div
            id="category-grocery-btn"
            onClick={() => navigate('/results?q=abarrotes')}
            className="relative bg-gradient-to-r from-[#fbf7ee] to-[#faf8f5] hover:bg-slate-50 border border-slate-100 rounded-3xl p-5 flex items-center gap-4 cursor-pointer hover:shadow-xs transition-all"
          >
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-800 flex items-center justify-center border border-amber-100/50">
              <span className="text-xl">☕</span>
            </div>
            <div className="flex-1">
              <span className="text-[11px] font-semibold text-[#877855] block uppercase tracking-wider mb-0.5">
                Ver todo el catálogo
              </span>
              <h4 className="font-semibold text-[15px] text-slate-800 tracking-tight">
                Abarrotes & Especias
              </h4>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-400" />
          </div>
        </div>

        {/* Puestos Destacados */}
        {currentMarket.stalls.length > 0 && (
          <div className="mb-7">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-serif text-[20px] font-bold text-slate-900">
                Puestos Destacados
              </h3>
              <button
                id="ver-mapa-destacados"
                onClick={handleLocalize}
                className="text-[13px] font-semibold text-[#3c7657] hover:underline"
              >
                Ver mapa
              </button>
            </div>

            {/* Horizontal slider container */}
            <div id="outstanding-slider" className="flex gap-4 overflow-x-auto no-scrollbar -mx-5 px-5 pb-2">
              {currentMarket.stalls.map((stall) => (
                <div
                  key={stall.id}
                  id={`outstanding-${stall.id}`}
                  onClick={() => navigate(`/stall/${stall.id}`)}
                  className="w-[210px] flex-shrink-0 bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-xs hover:shadow-md cursor-pointer transition-all"
                >
                  <div className="relative h-[115px] bg-slate-50">
                    <img
                      src={stall.imageUrl}
                      alt={stall.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2.5 right-2.5 bg-white/95 px-2 py-0.5 rounded-full flex items-center gap-0.5 text-[10px] font-bold shadow-xs">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      <span>{stall.rating}</span>
                    </div>
                  </div>

                  <div className="p-4">
                    <span className="text-[11px] font-medium text-slate-400 block mb-0.5 uppercase tracking-wide truncate">
                      {stall.location}
                    </span>
                    <h4 className="font-serif font-bold text-[14.5px] text-slate-900 mb-1 truncate">
                      {stall.name}
                    </h4>
                    <p className="text-[11px] text-slate-500 leading-normal line-clamp-2">
                      {stall.description}
                    </p>

                    <button
                      id={`btn-details-${stall.id}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/stall/${stall.id}`);
                      }}
                      className="w-full mt-3 py-2 bg-[#fcf9f2] hover:bg-amber-100/30 text-slate-700 text-[11.5px] font-semibold rounded-xl text-center transition-colors"
                    >
                      Ver Detalles
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Ofertas del Día */}
        {currentMarket.highlightedOffers.length > 0 && (
          <div className="mb-4">
            <h3 className="font-serif text-[20px] font-bold text-slate-900 mb-4">
              Ofertas del Día
            </h3>

            {/* Item stack */}
            <div className="space-y-3.5">
              {currentMarket.highlightedOffers.map((offer) => {
                const isItemAdded = addedItems.includes(offer.id);
                return (
                  <div
                    key={offer.id}
                    id={`offer-row-${offer.id}`}
                    className="bg-white p-3 rounded-2xl flex items-center justify-between gap-4 border border-slate-100 hover:border-slate-200 shadow-3xs"
                  >
                    <div className="flex items-center gap-3.5">
                      {/* Image block */}
                      <div className="relative w-[64px] h-[64px] rounded-xl overflow-hidden bg-slate-100 flex-shrink-0">
                        <img
                          src={offer.imageUrl}
                          alt={offer.name}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                        {offer.discountText && (
                          <div className="absolute top-0 left-0 bg-red-500 text-white font-bold text-[8.5px] px-1.5 py-0.5 rounded-br-lg">
                            {offer.discountText}
                          </div>
                        )}
                      </div>

                      {/* Decriptive label */}
                      <div>
                        <h4 className="font-serif font-bold text-[14px] text-slate-900 leading-tight">
                          {offer.name}
                        </h4>
                        <span className="text-[11px] text-slate-400 block mt-0.5">
                          {offer.origin}
                        </span>
                        <div className="flex items-center gap-1.5 mt-1">
                          <span className="text-[13px] font-bold text-[#3c7657]">
                            S/ {offer.price.toFixed(2)}
                          </span>
                          {offer.originalPrice && (
                            <span className="text-[11px] text-slate-400 line-through">
                              S/ {offer.originalPrice.toFixed(2)}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Quantity Selector / Add To Cart button togglable */}
                    <button
                      id={`btn-add-offer-${offer.id}`}
                      onClick={() => handleAddItem(offer.id, offer.name)}
                      className={`w-9 h-9 rounded-full flex items-center justify-center border transition-all ${
                        isItemAdded
                          ? 'bg-[#3c7657] border-[#3c7657] text-white scale-105 shadow-sm shadow-[#3c7657]/15'
                          : 'border-slate-200 hover:border-slate-400 text-slate-600 active:scale-95'
                      }`}
                    >
                      {isItemAdded ? (
                        <Check className="w-[15px] h-[15px]" strokeWidth={3} />
                      ) : (
                        <Plus className="w-[15px] h-[15px]" />
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      <BottomNavBar activeTab="search" />
    </div>
  );
}
