import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search } from 'lucide-react';

interface HeaderProps {
  showBack?: boolean;
}

export default function Header({ showBack = true }: HeaderProps) {
  const navigate = useNavigate();

  return (
    <header id="app-header" className="sticky top-0 bg-[#faf8f5]/95 backdrop-blur-md z-40 py-3.5 px-4 flex items-center justify-between border-b border-dashed border-slate-200/50 max-w-md mx-auto">
      {showBack ? (
        <button
          id="header-back-btn"
          onClick={() => {
            // If window.history length is 1, go to home
            if (window.history.length <= 1) {
              navigate('/');
            } else {
              navigate(-1);
            }
          }}
          className="p-1.5 rounded-full hover:bg-slate-100/80 active:scale-95 transition-all text-slate-800"
          aria-label="Volver"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
      ) : (
        <div className="w-8" />
      )}

      <button
        id="header-logo-btn"
        onClick={() => navigate('/')}
        className="font-serif text-[22px] font-semibold tracking-wide text-[#3c7657] cursor-pointer hover:opacity-90 active:scale-98 transition-all"
      >
        MercaView
      </button>

      <button
        id="header-search-btn"
        onClick={() => navigate('/search')}
        className="p-1.5 rounded-full hover:bg-slate-100/80 active:scale-95 transition-all text-slate-800"
        aria-label="Buscar"
      >
        <Search className="w-5 h-5" />
      </button>
    </header>
  );
}
