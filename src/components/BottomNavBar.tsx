import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Search, Heart, User } from 'lucide-react';

interface BottomNavBarProps {
  activeTab?: 'home' | 'search' | 'favorites' | 'profile';
}

export default function BottomNavBar({ }: BottomNavBarProps) {
  const navigate = useNavigate();
  const location = useLocation();

  // Determine active tab based on path
  const getActiveTab = () => {
    const path = location.pathname;
    if (path === '/' || path.startsWith('/market/')) return 'home';
    if (path.startsWith('/search') || path.startsWith('/results') || path.startsWith('/stall/')) return 'search';
    if (path === '/favorites') return 'favorites';
    if (path === '/profile') return 'profile';
    return 'home';
  };

  const active = getActiveTab();

  const handleTabClick = (tab: string) => {
    switch (tab) {
      case 'home':
        navigate('/');
        break;
      case 'search':
        navigate('/search');
        break;
      case 'favorites':
        navigate('/favorites');
        break;
      case 'profile':
        navigate('/profile');
        break;
    }
  };

  const tabs = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'search', label: 'Search', icon: Search },
    { id: 'favorites', label: 'Favorites', icon: Heart },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <div id="bottom-navbar" className="fixed bottom-0 left-0 right-0 bg-[#fbf9f4] border-t border-slate-200/60 py-2.5 px-6 z-50 flex items-center justify-between max-w-md mx-auto shadow-lg shadow-black/5 rounded-t-3xl h-[68px]">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = active === tab.id;

        return (
          <button
            key={tab.id}
            id={`nav-item-${tab.id}`}
            onClick={() => handleTabClick(tab.id)}
            className="flex items-center justify-center focus:outline-none transition-all duration-200 ease-out"
          >
            {isActive ? (
              <div className="flex items-center gap-2 bg-[#d1ead6] text-[#3c7657] py-1.5 px-4 rounded-full font-medium text-[13px] animate-fade-in">
                <Icon className="w-[18px] h-[18px]" strokeWidth={2.5} />
                <span>{tab.label}</span>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center text-slate-500 hover:text-[#3c7657]/80 w-16 py-1">
                <Icon className="w-[18px] h-[18px]" strokeWidth={2} />
                <span className="text-[10px] mt-0.5 font-medium">{tab.label}</span>
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
}
