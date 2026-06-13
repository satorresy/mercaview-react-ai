import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Clock, Tag, Flame, Sparkles } from 'lucide-react';
import Header from '../components/Header';
import BottomNavBar from '../components/BottomNavBar';

export default function SearchScreen() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [recentQueries, setRecentQueries] = useState<string[]>([
    'Papas amarillas organicas',
    'Mercado Surquillo Carnes'
  ]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Add to recent queries if not already present
      if (!recentQueries.includes(searchQuery.trim())) {
        setRecentQueries([searchQuery.trim(), ...recentQueries.slice(0, 4)]);
      }
      navigate(`/results?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleRecentClick = (query: string) => {
    navigate(`/results?q=${encodeURIComponent(query)}`);
  };

  const handleClearRecents = () => {
    setRecentQueries([]);
  };

  const quickPills = [
    { label: 'Ofertas de hoy', icon: Tag, query: 'ofertas' },
    { label: 'Más buscados', icon: Flame, query: 'revelancia' },
    { label: 'Nuevos', icon: Sparkles, query: 'orgánico' },
  ];

  const gridCategories = [
    {
      title: 'Verduras',
      desc: 'Frescas y orgánicas',
      imageUrl: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80',
      query: 'verduras'
    },
    {
      title: 'Frutas',
      desc: 'De temporada',
      imageUrl: 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?auto=format&fit=crop&w=800&q=80',
      query: 'frutas'
    },
    {
      title: 'Carnes y Aves',
      desc: 'Cortes premium',
      imageUrl: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&w=800&q=80',
      query: 'carnes'
    },
    {
      title: 'Abarrotes',
      desc: 'Despensa básica',
      imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80',
      query: 'abarrotes'
    }
  ];

  return (
    <div className="min-h-screen bg-[#faf8f5] pb-24 max-w-md mx-auto relative overflow-x-hidden shadow-sm">
      <Header showBack={false} />

      {/* Main Search Engine Page Container */}
      <div className="px-5 pt-3">
        {/* Search Input Bar form */}
        <form onSubmit={handleSearchSubmit} className="mb-4">
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <Search className="h-5 h-5 text-slate-400" />
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="¿Qué estás buscando hoy?"
              className="w-full bg-[#f4ebd0]/10 border border-slate-200 focus:border-[#3c7657]/80 focus:ring-1 focus:ring-[#3c7657]/30 text-slate-800 placeholder-slate-400 font-medium text-[14px] rounded-2xl py-3.5 pl-11 pr-5 outline-none transition-all shadow-3xs"
            />
          </div>
        </form>

        {/* Quick Pills Row horizontal container */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-5 -mx-5 px-5">
          {quickPills.map((pill, idx) => {
            const Icon = pill.icon;
            return (
              <button
                key={idx}
                id={`quick-pill-${idx}`}
                type="button"
                onClick={() => navigate(`/results?q=${pill.query}`)}
                className="flex items-center gap-1.5 flex-shrink-0 bg-[#3c7657] text-white py-2 px-4 rounded-full text-[12.5px] font-semibold hover:bg-emerald-800 transition-colors shadow-2xs"
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{pill.label}</span>
              </button>
            );
          })}
        </div>

        {/* Búsquedas Recientes */}
        {recentQueries.length > 0 && (
          <div className="mb-7">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-serif text-[18px] font-bold text-slate-900">
                Búsquedas Recientes
              </h3>
              <button
                id="clear-recent-queries-btn"
                onClick={handleClearRecents}
                className="text-[12px] font-semibold text-[#3c7657] hover:underline"
              >
                Limpiar
              </button>
            </div>

            <div className="space-y-3">
              {recentQueries.map((query, idx) => (
                <div
                  key={idx}
                  id={`recent-query-${idx}`}
                  onClick={() => handleRecentClick(query)}
                  className="flex items-center gap-3 py-2 cursor-pointer hover:bg-slate-50 rounded-lg group transition-colors"
                >
                  <Clock className="w-4 h-4 text-slate-400 group-hover:text-[#3c7657]" />
                  <span className="text-[13.5px] text-slate-700 font-medium group-hover:text-slate-900">
                    {query}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Grid: Explorar Categorías */}
        <div className="mb-4">
          <h3 className="font-serif text-[18px] font-bold text-slate-900 mb-4">
            Explorar Categorías
          </h3>

          <div className="grid grid-cols-2 gap-4">
            {gridCategories.map((category, index) => (
              <div
                key={index}
                id={`grid-cat-card-${index}`}
                onClick={() => navigate(`/results?q=${category.query}`)}
                className="relative h-[165px] rounded-3xl overflow-hidden shadow-2xs cursor-pointer group"
              >
                {/* Image backdrop */}
                <img
                  src={category.imageUrl}
                  alt={category.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
                />
                
                {/* Gradient dark tint layer */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/10 transition-opacity" />

                {/* Grid card labels */}
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h4 className="font-serif text-[17px] font-bold leading-tight mb-0.5">
                    {category.title}
                  </h4>
                  <span className="text-[11px] text-slate-200/90 font-medium block">
                    {category.desc}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <BottomNavBar activeTab="search" />
    </div>
  );
}
