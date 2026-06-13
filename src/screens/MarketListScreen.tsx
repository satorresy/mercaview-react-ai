import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Star, Heart, Clock, Compass } from 'lucide-react';
import Header from '../components/Header';
import BottomNavBar from '../components/BottomNavBar';
import { mockMarkets } from '../data';
import { Market } from '../types';

export default function MarketListScreen() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState<string>('todos');
  const [favoriteMarkets, setFavoriteMarkets] = useState<string[]>(['surquillo']); // Default Surquillo as favorited as seen in screenshot (red heart)
  const [markets, setMarkets] = useState<Market[]>(mockMarkets);

  const filters = [
    { id: 'todos', label: 'Todos' },
    { id: 'comida', label: 'Comida' },
    { id: 'orgánico', label: 'Orgánico' },
    { id: 'pescadería', label: 'Pescadería' },
  ];

  const handleFavoriteToggle = (marketId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (favoriteMarkets.includes(marketId)) {
      setFavoriteMarkets(favoriteMarkets.filter(id => id !== marketId));
    } else {
      setFavoriteMarkets([...favoriteMarkets, marketId]);
    }
  };

  // Filter logic
  const filteredMarkets = markets.filter(market => {
    if (activeFilter === 'todos') return true;
    if (activeFilter === 'comida') {
      return market.tags.includes('Frutas') || market.tags.includes('Carnes') || market.tags.includes('Abarrotes');
    }
    if (activeFilter === 'orgánico') {
      return market.tags.includes('Orgánico');
    }
    if (activeFilter === 'pescadería') {
      return market.tags.includes('Pescados frescos') || market.tags.includes('Pescadería');
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-[#faf8f5] pb-24 max-w-md mx-auto relative overflow-x-hidden shadow-sm">
      <Header showBack={false} />

      {/* Main Container */}
      <div className="px-5 pt-4">
        {/* Title and map button */}
        <div className="flex items-center justify-between mb-4">
          <h1 className="font-serif text-[26px] font-bold text-slate-900 tracking-tight leading-none">
            Mercados Cercanos
          </h1>
          <button
            id="ver-mapa-btn"
            onClick={() => alert("Mostrando vista de mapa (Simulación de Google Maps)...")}
            className="flex items-center gap-1 text-[13px] font-semibold text-[#3c7657] hover:text-[#305e46] transition-colors py-1 px-2.5 rounded-lg hover:bg-[#3c7657]/10"
          >
            <Compass className="w-4 h-4 text-[#3c7657]" />
            Ver Mapa
          </button>
        </div>

        {/* Horizontal scroll filters */}
        <div id="filter-pills-container" className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-4 -mx-5 px-5">
          {filters.map((filter) => {
            const isSelected = activeFilter === filter.id;
            return (
              <button
                key={filter.id}
                id={`filter-${filter.id}`}
                onClick={() => setActiveFilter(filter.id)}
                className={`flex-shrink-0 px-5 py-2 rounded-full text-[13px] font-medium transition-all duration-200 ${
                  isSelected
                    ? 'bg-[#3c7657] text-white shadow-sm shadow-[#3c7657]/20 scale-[1.02]'
                    : 'bg-white border border-slate-200/80 text-slate-700 hover:border-slate-300'
                }`}
              >
                {filter.label}
              </button>
            );
          })}
        </div>

        {/* Markets list cards */}
        <div className="space-y-6 mt-2">
          {filteredMarkets.length === 0 ? (
            <div className="text-center py-12 text-slate-400 font-medium">
              No se encontraron mercados con esta categoría.
            </div>
          ) : (
            filteredMarkets.map((market) => {
              const isFav = favoriteMarkets.includes(market.id);
              const isMagdalena = market.id === 'magdalena';
              const isSurquillo = market.id === 'surquillo';
              const isSanIsidro = market.id === 'san-isidro';

              return (
                <div
                  key={market.id}
                  id={`market-card-${market.id}`}
                  onClick={() => market.isOpen && navigate(`/market/${market.id}`)}
                  className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 border border-slate-100 cursor-pointer group"
                >
                  {/* Image container */}
                  <div className="relative h-[190px] w-full overflow-hidden bg-slate-100">
                    <img
                      src={market.imageUrl}
                      alt={market.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                    />

                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />

                    {/* Opening status badge */}
                    <div className="absolute top-3 left-3">
                      {market.isOpen ? (
                        <div className="flex items-center gap-1 bg-[#f3edd3]/90 backdrop-blur-sm text-amber-900 text-[11px] font-semibold py-1 px-3 rounded-full shadow-sm">
                          <Clock className="w-3.5 h-3.5 text-amber-800" />
                          <span>Abierto ahora</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1 bg-slate-100/90 backdrop-blur-sm text-slate-600 text-[11px] font-semibold py-1 px-3 rounded-full shadow-sm">
                          <Clock className="w-3.5 h-3.5 text-slate-500" />
                          <span>{market.statusText}</span>
                        </div>
                      )}
                    </div>

                    {/* Like button */}
                    <button
                      id={`market-fav-${market.id}`}
                      onClick={(e) => handleFavoriteToggle(market.id, e)}
                      className="absolute top-3 right-3 p-2 rounded-full bg-white/90 backdrop-blur-sm shadow-sm text-slate-500 hover:text-red-500 active:scale-90 transition-all cursor-pointer"
                    >
                      <Heart
                        className={`w-[18px] h-[18px] transition-all ${
                          isFav
                            ? 'fill-red-500 text-red-500 scale-110'
                            : 'text-slate-800'
                        }`}
                      />
                    </button>
                  </div>

                  {/* Info Content Section */}
                  <div className="p-5">
                    <h2 className="font-serif text-[18px] font-bold text-slate-900 mb-1 leading-snug group-hover:text-[#3c7657] transition-colors">
                      {market.name}
                    </h2>

                    {/* Distance metadata */}
                    <div className="flex items-center gap-1 text-[13px] text-slate-500 mb-2">
                      <MapPin className="w-4 h-4 text-slate-400" />
                      <span>{market.distance}</span>
                    </div>

                    {/* Rating blocks */}
                    <div className="flex items-center gap-1 mb-3.5">
                      <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                      <span className="text-[13px] font-bold text-slate-800">{market.rating}</span>
                      <span className="text-[12px] text-slate-400">({market.reviewsCount} opiniones)</span>
                    </div>

                    {/* Category tags */}
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {market.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="bg-slate-100/80 text-slate-600 text-[11px] font-medium px-2.5 py-1 rounded-md"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Action buttons exactly matching mockup styles */}
                    {isMagdalena && (
                      <button
                        id="btn-magdalena-action"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate('/market/magdalena');
                        }}
                        className="w-full bg-[#3c7657] text-white hover:bg-[#305e46] py-3 px-4 rounded-full flex items-center justify-center gap-1.5 text-[14px] font-semibold shadow-sm transition-all duration-150 active:scale-[0.99] cursor-pointer"
                      >
                        Ver Mercado
                        <span className="text-base font-light">→</span>
                      </button>
                    )}

                    {isSurquillo && (
                      <button
                        id="btn-surquillo-action"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate('/market/surquillo');
                        }}
                        className="w-full bg-white border border-[#3c7657] text-[#3c7657] hover:bg-emerald-50 py-3 px-4 rounded-full flex items-center justify-center gap-1.5 text-[14px] font-semibold transition-all duration-150 active:scale-[0.99] cursor-pointer"
                      >
                        Ver Mercado
                        <span className="text-base font-light">→</span>
                      </button>
                    )}

                    {isSanIsidro && (
                      <button
                        id="btn-san-isidro-action"
                        disabled
                        className="w-full bg-slate-100 text-slate-400 py-3 px-4 rounded-full flex items-center justify-center gap-1.5 text-[14px] font-semibold cursor-not-allowed select-none"
                      >
                        Ver Mercado
                        <span className="text-base font-light">→</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      <BottomNavBar activeTab="home" />
    </div>
  );
}
