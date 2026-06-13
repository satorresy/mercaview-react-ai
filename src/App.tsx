import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import MarketListScreen from './screens/MarketListScreen';
import MarketOverviewScreen from './screens/MarketOverviewScreen';
import SearchScreen from './screens/SearchScreen';
import SearchResultsScreen from './screens/SearchResultsScreen';
import StallDetailScreen from './screens/StallDetailScreen';
import BottomNavBar from './components/BottomNavBar';
import Header from './components/Header';
import { Heart, User, MapPin, Mail, Award, ArrowLeft } from 'lucide-react';
import { useState, useEffect } from 'react';

// Elegant sub-route for Favorites to avoid any broken links
function FavoritesTabScreen() {
  const [favStalls, setFavStalls] = useState<any[]>([
    { id: 'donia-maria', name: 'Frutería Doña María', location: 'Pasillo 3, Stand 15', rating: 4.8 },
    { id: 'donia-juani', name: 'Frutas Doña Juani', location: 'Pasillo 2, Stand 45', rating: 4.9 }
  ]);

  return (
    <div className="min-h-screen bg-[#faf8f5] pb-24 max-w-md mx-auto relative overflow-x-hidden shadow-sm">
      <Header showBack={false} />
      <div className="px-5 pt-4">
        <h1 className="font-serif text-[26px] font-bold text-slate-900 mb-2 tracking-tight">Mis Favoritos</h1>
        <p className="text-[13px] text-slate-500 mb-6">Puestos y mercados que has guardado para acceso rápido.</p>

        {favStalls.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-3xl p-6 border border-slate-100">
            <span className="text-3xl block mb-2">❤️</span>
            <p className="text-slate-500 text-sm font-medium">Aún no tienes favoritos seleccionados.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {favStalls.map((s) => (
              <div
                key={s.id}
                className="bg-white p-4 rounded-3xl border border-slate-100/80 shadow-3xs flex items-center justify-between"
              >
                <div>
                  <h3 className="font-serif font-bold text-slate-900 text-base">{s.name}</h3>
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{s.location}</span>
                  </div>
                </div>
                <button
                  id={`remove-fav-${s.id}`}
                  onClick={() => setFavStalls(favStalls.filter(st => st.id !== s.id))}
                  className="bg-red-50 hover:bg-red-100/60 text-red-500 p-2.5 rounded-full transition-colors cursor-pointer"
                  aria-label="Eliminar de favoritos"
                >
                  <Heart className="w-4 h-4 fill-red-500 text-red-500" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      <BottomNavBar activeTab="favorites" />
    </div>
  );
}

// Elegant sub-route for Profile to avoid any broken links
function ProfileTabScreen() {
  return (
    <div className="min-h-screen bg-[#faf8f5] pb-24 max-w-md mx-auto relative overflow-x-hidden shadow-sm">
      <Header showBack={false} />
      <div className="px-5 pt-4">
        <div className="flex flex-col items-center text-center mt-4 mb-7">
          <div className="w-24 h-24 rounded-full bg-emerald-100 border-2 border-[#3c7657]/45 overflow-hidden mb-3">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&h=400&q=80"
              alt="User profile avatar"
              className="w-full h-full object-cover"
            />
          </div>
          <h2 className="font-serif font-bold text-slate-900 text-xl">Sebastián Torres</h2>
          <span className="bg-[#cbdccb]/45 text-[#214330] text-[10px] uppercase font-bold tracking-wider px-3.5 py-1 rounded-full mt-1.5">
            Miembro MercaView
          </span>
        </div>

        {/* Profile Card features */}
        <div className="bg-white rounded-[32px] p-5 border border-slate-100/80 space-y-4 mb-4 shadow-3xs">
          <div className="flex items-center gap-3.5 py-1">
            <div className="p-2.5 bg-emerald-50 rounded-xl text-[#3c7657]">
              <Mail className="w-4.5 h-4.5" />
            </div>
            <div className="text-left">
              <span className="text-[10px] font-bold text-slate-400 block uppercase">Correo Eléctronico</span>
              <span className="text-[13px] font-semibold text-slate-800">sebastian1torrespro@gmail.com</span>
            </div>
          </div>

          <div className="flex items-center gap-3.5 py-1 border-t border-slate-50 pt-3">
            <div className="p-2.5 bg-emerald-50 rounded-xl text-[#3c7657]">
              <Award className="w-4.5 h-4.5" />
            </div>
            <div className="text-left">
              <span className="text-[10px] font-bold text-slate-400 block uppercase">Nivel MercaAhorro</span>
              <span className="text-[13px] font-semibold text-slate-800">Súper Comprador (15 compras)</span>
            </div>
          </div>
        </div>
      </div>
      <BottomNavBar activeTab="profile" />
    </div>
  );
}

export default function App() {
  return (
    <HashRouter>
      <Routes>
        {/* Five core mockup routes */}
        <Route path="/" element={<MarketListScreen />} />
        <Route path="/market/:marketId" element={<MarketOverviewScreen />} />
        <Route path="/search" element={<SearchScreen />} />
        <Route path="/results" element={<SearchResultsScreen />} />
        <Route path="/stall/:stallId" element={<StallDetailScreen />} />

        {/* Support subroutes */}
        <Route path="/favorites" element={<FavoritesTabScreen />} />
        <Route path="/profile" element={<ProfileTabScreen />} />

        {/* Fallback to homepage */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </HashRouter>
  );
}
