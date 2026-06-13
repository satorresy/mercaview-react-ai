import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronRight, Heart, MapPin, Clock, Star, MessageSquare, Map, Plus, Check, Send, X } from 'lucide-react';
import Header from '../components/Header';
import BottomNavBar from '../components/BottomNavBar';
import { mockMarkets } from '../data';
import { Stall, Product } from '../types';

export default function StallDetailScreen() {
  const { stallId } = useParams<{ stallId: string }>();
  const navigate = useNavigate();

  // Find targeted stall by id across all markets; fallback to 'donia-maria'
  const allStalls: Stall[] = mockMarkets.flatMap(m => m.stalls);
  const currentStall = allStalls.find(s => s.id === stallId) || allStalls.find(s => s.id === 'donia-maria') || allStalls[0];

  const [isFav, setIsFav] = useState<boolean>(false);
  const [addedProducts, setAddedProducts] = useState<string[]>([]);
  // Simulated Chat Box overlay
  const [showChat, setShowChat] = useState<boolean>(false);
  const [typedMessage, setTypedMessage] = useState<string>('');
  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'user' | 'owner', text: string }>>([
    { sender: 'owner', text: '¡Hola! Bienvenidos a nuestro puesto. ¿Qué fruta o verdura fresca estabas buscando hoy?' }
  ]);

  // Simulated Map Path overlay
  const [showMapRoute, setShowMapRoute] = useState<boolean>(false);

  const handleAddProduct = (productId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (addedProducts.includes(productId)) {
      setAddedProducts(addedProducts.filter(id => id !== productId));
    } else {
      setAddedProducts([...addedProducts, productId]);
    }
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!typedMessage.trim()) return;

    const userMsg = typedMessage;
    setChatMessages(prev => [...prev, { sender: 'user', text: userMsg }]);
    setTypedMessage('');

    // Simulate response delay
    setTimeout(() => {
      setChatMessages(prev => [
        ...prev,
        {
          sender: 'owner',
          text: `Perfecto, ya te reservé el producto. Estará listo para recoger en el ${currentStall.location}. ¡Te esperamos!`
        }
      ]);
    }, 1500);
  };

  // Safe fallback list of products to match mockup
  const fallbackProducts: Product[] = [
    {
      id: "purple_corn",
      stallId: currentStall?.id || "donia-maria",
      name: "Maíz Morado",
      origin: "Valle Sagrado",
      price: 3.50,
      originalPrice: 4.20,
      discountText: "-20% OFERTA",
      imageUrl: "https://images.unsplash.com/photo-1508747703725-719777637510?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "lucuma",
      stallId: currentStall?.id || "donia-maria",
      name: "Lúcuma de Seda",
      origin: "Fruta Natural",
      price: 8.00,
      imageUrl: "https://images.unsplash.com/photo-1610970881699-44a5587cabec?auto=format&fit=crop&w=800&q=80"
    }
  ];

  const displayProducts = currentStall.products && currentStall.products.length > 0 
    ? currentStall.products 
    : fallbackProducts;

  return (
    <div className="min-h-screen bg-[#faf8f5] pb-24 max-w-md mx-auto relative overflow-x-hidden shadow-sm">
      <Header showBack={true} />

      {/* Banner stacked display image */}
      <div className="relative h-[210px] w-full bg-slate-100">
        <img
          src={currentStall.imageUrl}
          alt={currentStall.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover"
        />
        {/* Shadow Overlay */}
        <div className="absolute inset-0 bg-black/15" />
      </div>

      {/* Floating details white container card shifting upwards on top of banner */}
      <div className="px-5 -mt-16 relative z-10 mb-6">
        <div className="bg-white rounded-[32px] p-6 shadow-md border border-slate-100/60 relative">
          
          {/* Header line tag & heart rating alignment */}
          <div className="flex items-center justify-between gap-4 mb-3">
            <span className="bg-[#cbdccb]/45 text-[#214330] text-[10.5px] uppercase font-bold tracking-wider px-3.5 py-1.5 rounded-full inline-block leading-none">
              {currentStall.tags[0] || "FRUTAS Y VERDURAS ORGÁNICAS"}
            </span>

            <button
              id="like-stall-toggle-btn"
              onClick={() => setIsFav(!isFav)}
              className="p-1.5 rounded-full bg-slate-50 hover:bg-slate-100 transition-colors text-slate-400 hover:text-red-500 shadow-3xs"
            >
              <Heart
                className={`w-[18px] h-[18px] transition-transform active:scale-90 ${
                  isFav ? 'fill-red-500 text-red-500' : 'text-slate-800'
                }`}
              />
            </button>
          </div>

          {/* Title */}
          <h2 className="font-serif font-bold text-[22px] text-slate-900 leading-snug mb-4">
            {currentStall.name}
          </h2>

          {/* Info descriptor lines with rounded vector icons */}
          <div className="space-y-3 mb-2">
            <div className="flex items-center gap-2.5 text-[12.5px] text-slate-600 font-medium">
              <MapPin className="w-4 h-4 text-emerald-700/80" />
              <span>{currentStall.location}</span>
            </div>

            <div className="flex items-center gap-2.5 text-[12.5px] text-slate-600 font-medium">
              <Clock className="w-4 h-4 text-emerald-700/80" />
              <span>{currentStall.workingHours}</span>
            </div>

            <div className="flex items-center gap-2.5 text-[12.5px] text-slate-600 font-medium">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span className="font-bold text-slate-800">{currentStall.rating}</span>
              <span className="text-slate-400 text-[11px]">({currentStall.reviewsCount} opiniones)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Primary actionable controls row */}
      <div className="px-5 mb-7 flex items-center justify-between gap-4">
        <button
          id="btn-contact-stall"
          onClick={() => setShowChat(true)}
          className="flex-1 bg-[#3c7657] hover:bg-[#305e46] active:scale-95 text-white py-3.5 rounded-full flex items-center justify-center gap-2 text-[14px] font-semibold transition-all shadow-sm cursor-pointer"
        >
          <MessageSquare className="w-4.5 h-4.5" />
          <span>Contactar</span>
        </button>

        <button
          id="btn-preview-map-stall"
          onClick={() => setShowMapRoute(true)}
          className="flex-1 bg-white border border-slate-200 hover:bg-slate-50 active:scale-95 text-[#3c7657] py-3.5 rounded-full flex items-center justify-center gap-2 text-[14px] font-semibold transition-all shadow-3xs cursor-pointer"
        >
          <Map className="w-4.5 h-4.5 text-[#3c7657]" />
          <span>Ver Mapa</span>
        </button>
      </div>

      {/* Promociones Destacadas Section */}
      <div className="px-5 mb-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-serif text-[18px] font-bold text-slate-900 leading-none">
            Promociones Destacadas
          </h3>
          <button
            id="ver-todo-promociones"
            onClick={() => alert("Mostrando todo el catálogo de promociones... (¡Enhorabuena!)")}
            className="text-[12.5px] font-semibold text-[#3c7657] hover:underline"
          >
            Ver todo
          </button>
        </div>

        {/* Horizontal scroll slider container of products */}
        <div id="promos-slider" className="flex gap-4 overflow-x-auto no-scrollbar -mx-5 px-5 pb-4">
          {displayProducts.map((p) => {
            const isAdded = addedProducts.includes(p.id);
            return (
              <div
                key={p.id}
                id={`product-card-${p.id}`}
                className="w-[170px] flex-shrink-0 bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-2xs hover:shadow-xs transition-shadow"
              >
                {/* Image header with discount sticker */}
                <div className="relative h-[110px] bg-slate-50">
                  <img
                    src={p.imageUrl}
                    alt={p.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  {p.discountText && (
                    <div className="absolute top-2.5 left-2.5 bg-red-500 text-white font-bold text-[8px] uppercase px-2 py-0.5 rounded-md shadow-xs">
                      {p.discountText}
                    </div>
                  )}
                </div>

                {/* Body details */}
                <div className="p-3.5 relative">
                  <span className="text-[10px] font-medium text-slate-400 block mb-0.5 uppercase tracking-wider">
                    {p.origin}
                  </span>
                  
                  <h4 className="font-serif font-bold text-[13.5px] text-slate-900 line-clamp-1 mb-2 pr-4">
                    {p.name}
                  </h4>

                  {/* Price info line */}
                  <div className="flex flex-col">
                    <span className="text-[14px] font-extrabold text-[#3c7657] leading-none mb-0.5">
                      S/ {p.price.toFixed(2)}
                    </span>
                    {p.originalPrice && (
                      <span className="text-[10px] text-slate-400 line-through leading-none">
                        S/ {p.originalPrice.toFixed(2)}/kg
                      </span>
                    )}
                  </div>

                  {/* Bottom-right circle button */}
                  <button
                    id={`btn-add-product-${p.id}`}
                    onClick={(e) => handleAddProduct(p.id, e)}
                    className={`absolute bottom-3 right-3 w-8 h-8 rounded-full flex items-center justify-center border transition-all ${
                      isAdded
                        ? 'bg-[#3c7657] border-[#3c7657] text-white'
                        : 'border-slate-200 hover:border-slate-450 text-slate-600 active:scale-95'
                    }`}
                  >
                    {isAdded ? (
                      <Check className="w-3.5 h-3.5" strokeWidth={3} />
                    ) : (
                      <Plus className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* INTERACTIVE CHAT DRAWER */}
      {showChat && (
        <div className="fixed inset-0 bg-black/50 z-50 flex flex-col justify-end max-w-md mx-auto animate-fade-in">
          <div className="bg-white rounded-t-[32px] h-[480px] flex flex-col overflow-hidden">
            {/* Header */}
            <div className="bg-[#3c7657] text-white p-4 px-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-700 overflow-hidden border border-emerald-500-overlay">
                  <img src={currentStall.imageUrl} alt={currentStall.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-sm">{currentStall.name}</h4>
                  <span className="text-[10px] text-emerald-100 flex items-center gap-1">🟢 En línea • Conectado</span>
                </div>
              </div>
              <button id="close-chat-btn" onClick={() => setShowChat(false)} className="p-1 rounded-full hover:bg-white/10">
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 p-5 overflow-y-auto space-y-4 bg-slate-50">
              {chatMessages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[75%] p-3.5 rounded-2xl text-[12.5px] leading-relaxed shadow-3xs ${
                    msg.sender === 'user'
                      ? 'bg-[#3c7657] text-white rounded-tr-none'
                      : 'bg-white text-slate-800 rounded-tl-none border border-slate-100'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Message input */}
            <form onSubmit={handleSendMessage} className="p-4 border-t border-slate-100 bg-white flex items-center gap-2">
              <input
                type="text"
                value={typedMessage}
                onChange={(e) => setTypedMessage(e.target.value)}
                placeholder="Escribe un mensaje a Doña María..."
                className="flex-1 bg-slate-100 text-[13px] border border-transparent rounded-full py-2.5 px-4 outline-none focus:bg-white focus:border-[#3c7657]/50 transition-all font-medium"
              />
              <button
                type="submit"
                className="w-10 h-10 bg-[#3c7657] text-white rounded-full flex items-center justify-center hover:bg-[#305e46] active:scale-95 transition-all"
              >
                <Send className="w-4 h-4 text-white" />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* INTERACTIVE MAP ROUTE SHEET */}
      {showMapRoute && (
        <div className="fixed inset-0 bg-black/50 z-50 flex flex-col justify-end max-w-md mx-auto animate-fade-in">
          <div className="bg-[#faf8f5] rounded-t-[32px] p-6 max-h-[380px] flex flex-col overflow-hidden relative">
            <button id="close-map-sheet" onClick={() => setShowMapRoute(false)} className="absolute top-4 right-4 p-1.5 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors text-slate-500">
              <X className="w-5 h-5" />
            </button>

            <span className="text-[10px] font-extrabold text-[#3c7657] block mb-1 uppercase tracking-widest">Plano y Navegación</span>
            <h4 className="font-serif font-bold text-slate-900 text-lg mb-4">¿Cómo llegar a {currentStall.name}?</h4>

            {/* Custom map layout route simulation */}
            <div className="bg-white border text-center border-slate-200/60 p-5 rounded-2xl flex-1 flex flex-col items-center justify-center shadow-inner">
              <div className="w-16 h-16 rounded-full bg-emerald-50 text-[#3c7657] flex items-center justify-center mb-3">
                <MapPin className="w-8 h-8 animate-bounce text-[#3c7657]" />
              </div>
              <p className="text-[13px] text-slate-800 font-semibold mb-1">
                Ubicación: {currentStall.location}
              </p>
              <p className="text-[11.5px] text-slate-500 px-4 leading-relaxed">
                Entra por la puerta principal de la avenida de Magdalena, camina recto por el Pasillo Central y gira a la derecha en el tercer pasillo transversal.
              </p>
            </div>

            <button
              id="confirm-got-it-map-btn"
              onClick={() => setShowMapRoute(false)}
              className="mt-4 w-full bg-[#3c7657] text-white hover:bg-[#305e46] py-3 rounded-full text-[13.5px] font-semibold text-center"
            >
              Entendido, ya sé llegar
            </button>
          </div>
        </div>
      )}

      <BottomNavBar activeTab="search" />
    </div>
  );
}
