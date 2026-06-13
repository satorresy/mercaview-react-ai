import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Search, X, ChevronDown, Star, Heart, MapPin, Clock, Map } from 'lucide-react';
import Header from '../components/Header';
import BottomNavBar from '../components/BottomNavBar';
import { mockMarkets } from '../data';
import { Stall } from '../types';

export default function SearchResultsScreen() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const rawQuery = searchParams.get('q') || 'Frutas y Verduras';
  const [query, setQuery] = useState(rawQuery);

  // Sync state if query in URL shifts
  useEffect(() => {
    setQuery(rawQuery);
  }, [rawQuery]);

  // Local state for interactive favoriting of stalls
  const [favStalls, setFavStalls] = useState<string[]>([]);
  // Local active filters
  const [filterOfertas, setFilterOfertas] = useState<boolean>(false);
  const [filterCerca, setFilterCerca] = useState<boolean>(false);
  const [showCategoryMenu, setShowCategoryMenu] = useState<boolean>(false);

  // Retrieve all stalls from all open markets to build dynamic, responsive search index
  const allStalls: Stall[] = mockMarkets.flatMap(market => market.stalls);

  const handleQueryChange = (val: string) => {
    setQuery(val);
  };

  const handleClearQuery = () => {
    setQuery('');
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchParams({ q: query });
  };

  const toggleFavStall = (stallId: string) => {
    if (favStalls.includes(stallId)) {
      setFavStalls(favStalls.filter(id => id !== stallId));
    } else {
      setFavStalls([...favStalls, stallId]);
    }
  };

  // Filter & match logic
  const filteredStalls = allStalls.filter(stall => {
    // Exact text search match
    const textToSearch = `${stall.name} ${stall.description} ${stall.tags.join(' ')} ${stall.categoryLabel}`.toLowerCase();
    const searchTerms = rawQuery.toLowerCase().split(/\s+/);
    const matchesQuery = searchTerms.every(term => textToSearch.includes(term));

    // Offer filter check
    if (filterOfertas) {
      // Find if stall has any items with originalPrice or active discounts
      const hasDiscountedProducts = stall.products.some(p => p.originalPrice !== undefined || p.discountText !== undefined);
      if (!hasDiscountedProducts && stall.id !== 'huerto-pedro') return false; // Pedro is marked as offer
    }

    return matchesQuery;
  });

  return (
    <div className="min-h-screen bg-[#faf8f5] pb-24 max-w-md mx-auto relative overflow-x-hidden shadow-sm">
      <Header showBack={true} />

      {/* Main Results Container */}
      <div className="px-5 pt-3">
        {/* Real-time prefilled Search input bar with Clear cross */}
        <form onSubmit={handleSearchSubmit} className="mb-4">
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-slate-400" />
            </span>
            <input
              type="text"
              value={query}
              onChange={(e) => handleQueryChange(e.target.value)}
              placeholder="Escribe tu búsqueda..."
              className="w-full bg-white border border-slate-200 focus:border-[#3c7657]/80 focus:ring-1 focus:ring-[#3c7657]/30 text-slate-800 placeholder-slate-400 font-medium text-[14px] rounded-2xl py-3.5 pl-11 pr-10 outline-none transition-all shadow-3xs"
            />
            {query && (
              <button
                id="clear-query-results-btn"
                type="button"
                onClick={handleClearQuery}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 active:scale-90"
              >
                <X className="w-5 h-5 bg-slate-100 p-1 rounded-full text-slate-500" />
              </button>
            )}
          </div>
        </form>

        {/* Filter Pills with Toggle active state visual style */}
        <div id="results-filter-pills" className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-4 -mx-5 px-5">
          <button
            id="filter-category-btn"
            onClick={() => setShowCategoryMenu(!showCategoryMenu)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-[12px] font-medium border transition-all ${
              showCategoryMenu
                ? 'bg-[#d1ead6] border-[#3c7657] text-[#3c7657]'
                : 'bg-[#faf8f5] border-slate-200 text-slate-700'
            }`}
          >
            <span>Categorías</span>
            <ChevronDown className="w-3.5 h-3.5" />
          </button>

          <button
            id="filter-offers-btn"
            onClick={() => setFilterOfertas(!filterOfertas)}
            className={`px-4 py-2 rounded-full text-[12px] font-medium border transition-all ${
              filterOfertas
                ? 'bg-[#3c7657] text-white border-[#3c7657] shadow-3xs'
                : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
            }`}
          >
            Ofertas
          </button>

          <button
            id="filter-nearme-btn"
            onClick={() => setFilterCerca(!filterCerca)}
            className={`px-4 py-2 rounded-full text-[12px] font-medium border transition-all ${
              filterCerca
                ? 'bg-[#3c7657] text-white border-[#3c7657] shadow-3xs'
                : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
            }`}
          >
            Cerca de mí
          </button>
        </div>

        {/* Temporary simulation menu for category selection filter dropdown */}
        {showCategoryMenu && (
          <div className="mb-4 p-3 bg-white border border-slate-100 rounded-2xl shadow-md space-y-1 animate-fade-in">
            {['Frutas y Verduras', 'Carnes y Aves', 'Especias', 'Carnes & Pescados'].map((cat, idx) => (
              <button
                key={idx}
                id={`sim-cat-option-${idx}`}
                onClick={() => {
                  setSearchParams({ q: cat });
                  setShowCategoryMenu(false);
                }}
                className="w-full text-left p-2 hover:bg-slate-50 text-[12.5px] font-medium rounded-lg text-slate-700 hover:text-slate-900 transition-colors"
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* Results title line */}
        <div className="flex items-center justify-between mb-4 px-1">
          <h3 className="font-serif font-bold text-[18px] text-slate-900">
            Resultados ({filteredStalls.length})
          </h3>
          <span className="text-[12px] text-slate-400 font-medium">
            Ordenado por: Relevancia
          </span>
        </div>

        {/* Stalls Cards stack */}
        <div className="space-y-6">
          {filteredStalls.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-3xl border border-slate-100 p-6">
              <span className="text-3xl block mb-2">🔍</span>
              <h4 className="font-serif font-bold text-slate-800 text-[15px] mb-1">No hay resultados exactos</h4>
              <p className="text-[12px] text-slate-400">Intenta buscar "Frutas", "Verduras", "Carnes" o borra los filtros de arriba.</p>
              <button
                id="reset-search-btn"
                onClick={() => {
                  setSearchParams({ q: 'Frutas y Verduras' });
                  setFilterOfertas(false);
                  setFilterCerca(false);
                }}
                className="mt-4 px-4 py-1.5 bg-[#f5f2eb] hover:bg-amber-100/50 text-slate-700 font-semibold text-xs rounded-lg transition-colors"
              >
                Restaurar búsqueda por defecto
              </button>
            </div>
          ) : (
            filteredStalls.map((stall) => {
              const isFav = favStalls.includes(stall.id);
              // Setup custom route parameters or fallback behavior to Screen 5
              // Clicking "Ver Productos" from any card directs to that stall on Screen 5.
              // To match Screen 5 mockup exactly, we render its banner block. 
              const isPedro = stall.id === 'huerto-pedro';

              return (
                <div
                  key={stall.id}
                  id={`stall-result-card-${stall.id}`}
                  className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100/80 hover:shadow-md transition-shadow duration-200"
                >
                  {/* Image container */}
                  <div className="relative h-[155px] bg-slate-50">
                    <img
                      src={stall.imageUrl}
                      alt={stall.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />

                    {/* Left overlay ⭐ rating index badge */}
                    <div className="absolute top-3 left-3 bg-white/95 px-2.5 py-0.5 rounded-full flex items-center gap-0.5 text-[10px] font-bold shadow-xs">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      <span>{stall.rating}</span>
                    </div>

                    {/* Left bottom discount banner if Pedro */}
                    {isPedro && (
                      <div className="absolute bottom-3 left-3 bg-red-500 text-white font-bold text-[10px] px-2.5 py-1 rounded-lg shadow-sm">
                        -15% Oferta
                      </div>
                    )}
                  </div>

                  {/* Info contents card section */}
                  <div className="p-5">
                    {/* Tags row and like icon */}
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="bg-[#cbdccb]/40 text-[#2c583f] text-[10px] uppercase font-extrabold tracking-wider px-2.5 py-0.5 rounded-md">
                        {stall.tags[0]}
                      </span>
                      <button
                        id={`fav-stall-${stall.id}`}
                        onClick={() => toggleFavStall(stall.id)}
                        className="p-1 rounded-full text-slate-400 hover:text-red-500 hover:bg-slate-50 transition-colors"
                      >
                        <Heart
                          className={`w-[18px] h-[18px] transition-transform active:scale-90 ${
                            isFav ? 'fill-red-500 text-red-500 scale-110' : 'text-slate-400'
                          }`}
                        />
                      </button>
                    </div>

                    {/* Stall Title */}
                    <h4 className="font-serif font-bold text-[18px] text-slate-900 leading-snug mb-1">
                      {stall.name}
                    </h4>

                    {/* Sub description */}
                    <p className="text-[12px] text-slate-500 leading-normal mb-4">
                      {stall.description}
                    </p>

                    {/* Location fields with icons */}
                    <div className="space-y-2 mb-5">
                      <div className="flex items-center gap-2 text-[12px] text-slate-500 font-medium">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        <span>{stall.location}</span>
                      </div>

                      <div className="flex items-center gap-2 text-[12px] text-slate-500 font-medium">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span className="capitalize">{stall.workingHours}</span>
                      </div>
                    </div>

                    {/* Dual Action control strip footer */}
                    <div className="flex items-center gap-2">
                      <button
                        id={`btn-ver-prod-${stall.id}`}
                        onClick={() => {
                          // Goes to screen 5 for stall details
                          navigate(`/stall/${stall.id}`);
                        }}
                        className="flex-1 bg-[#3c7657] hover:bg-[#305e46] text-white py-3.5 px-4 rounded-full text-[13.5px] font-semibold text-center select-none active:scale-[0.99] transition-all cursor-pointer"
                      >
                        Ver Productos
                      </button>

                      <button
                        id={`btn-loc-map-${stall.id}`}
                        onClick={() => {
                          navigate(`/market/${stall.marketId}?locate=${stall.id}`);
                        }}
                        className="w-[50px] h-[50px] flex items-center justify-center border border-[#3c7657]/40 rounded-2xl hover:bg-emerald-50 text-[#3c7657] active:scale-95 transition-all cursor-pointer"
                        aria-label="Localizar puesto en mapa"
                      >
                        <Map className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      <BottomNavBar activeTab="search" />
    </div>
  );
}
