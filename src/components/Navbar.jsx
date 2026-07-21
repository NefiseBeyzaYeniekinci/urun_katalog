import React from 'react';
import { Search, Heart, Lock, LogOut, PlusCircle, Settings, ShieldCheck } from 'lucide-react';
import InstagramIcon from './icons/InstagramIcon';
import { CATEGORIES } from '../data/initialProducts';

export default function Navbar({
  searchTerm,
  setSearchTerm,
  favoritesCount,
  onOpenFavorites,
  onOpenAdminAuth,
  isAdminLoggedIn,
  onLogoutAdmin,
  activeCategory,
  setActiveCategory,
  storeConfig,
  categories
}) {
  const config = storeConfig || {
    storeName: "elisi_sevdasi Store",
    username: "elisi_sevdasi",
    announcement: "🌿 El Emeği Özel Koleksiyonlar • 📱 Instagram DM Üzerinden Anında İletişim & Şeffaf Fiyat",
    responseTime: "~15 Dk"
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FFFFFF] border-b border-[#EFE8E1] shadow-xs">
      
      {/* 1. Announcement Bar */}
      <div className="bg-[#2D2926] text-[#FAF6F0] py-1.5 px-4 text-xs font-medium">
        <div className="container flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="truncate">
              📱 Instagram DM Üzerinden Anında İletişim & Şeffaf Fiyat
            </span>
          </div>

          <div className="hidden md:flex items-center gap-4 text-[11px] text-[#D4C4B7]">
            <span>Müşteri Yanıt Süresi: {config.responseTime}</span>
            <span>|</span>
            <a
              href={`https://instagram.com/${config.username}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#E8B4B8] transition-colors flex items-center gap-1 font-semibold"
            >
              <InstagramIcon size={13} /> @{config.username}
            </a>
          </div>
        </div>
      </div>

      {/* 2. Main Logo & Search Header */}
      <div className="container py-3.5 flex items-center justify-between gap-4">
        
        {/* Brand Logo Image */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveCategory('Tümü')}>
          <div className="w-11 h-11 rounded-2xl overflow-hidden shadow-xs border border-[#F6D6DA] bg-[#FFFFFF] flex items-center justify-center p-0.5">
            <img src="/logo.png" alt="elisi_sevdasi logo" className="w-full h-full object-cover rounded-[14px]" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-[#2D2926] tracking-tight flex items-center gap-2">
              {config.storeName}
            </h1>
            <p className="text-[11px] text-[#736C65] font-medium hidden sm:block">
              Özel El Örgüsü & Amigurumi Koleksiyonu
            </p>
          </div>
        </div>

        {/* Central Search Bar */}
        <div className="flex-1 max-w-lg mx-4 hidden md:block">
          <div className="relative">
            <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9E938B]" />
            <input
              type="text"
              placeholder="Ürün adı, yaş grubu, ebat, renk veya kategori ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-10 py-2.5 text-xs bg-[#F9F6F3] border border-[#EFE8E1] rounded-2xl focus:outline-none focus:bg-[#FFFFFF] focus:border-[#C05663] focus:ring-2 focus:ring-[#F5EAE6] transition-all text-[#2D2926] placeholder-[#9E938B]"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#9E938B] hover:text-[#2D2926] font-bold"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Admin Toggle / Login Button */}
          {isAdminLoggedIn ? (
            <div className="flex items-center gap-1.5 bg-[#F5EAE6] p-1 pr-3 rounded-full border border-[#F6D6DA]">
              <button
                onClick={onOpenAdminAuth}
                className="btn text-xs py-1.5 px-3 bg-[#C05663] text-white font-bold hover:bg-[#a84753]"
              >
                <Settings size={14} /> Yönetim Paneli
              </button>
              <button
                onClick={onLogoutAdmin}
                className="text-xs text-[#C05663] hover:text-[#2D2926] font-bold px-1"
                title="Yönetici Çıkışı"
              >
                <LogOut size={15} />
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenAdminAuth}
              className="btn btn-outline text-xs py-2 px-3 sm:px-3.5 bg-[#FFFFFF] hover:bg-[#F6F0EA] border-[#EFE8E1] text-[#736C65]"
              title="Yönetici Girişi"
            >
              <Lock size={15} className="text-[#9E938B]" />
              <span className="hidden sm:inline font-medium text-[11px]">Yönetici Girişi</span>
            </button>
          )}

          {/* Favorites Button */}
          <button
            onClick={onOpenFavorites}
            className="relative p-2.5 rounded-2xl bg-[#F9F6F3] border border-[#EFE8E1] text-[#2D2926] hover:bg-[#F5EAE6] hover:text-[#C05663] transition-colors"
            title="Favorilerim"
          >
            <Heart size={19} />
            {favoritesCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-[#C05663] text-white text-[10px] font-extrabold rounded-full flex items-center justify-center shadow-xs animate-scale-in">
                {favoritesCount}
              </span>
            )}
          </button>

          {/* Direct Instagram Link Button */}
          <a
            href={`https://instagram.com/${config.username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-instagram text-xs py-2.5 px-3.5 font-bold"
          >
            <InstagramIcon size={16} />
            <span className="hidden xs:inline">Instagram</span>
          </a>

        </div>

      </div>

      {/* 3. Main Category Navigation Bar */}
      <div className="bg-[#FAF6F0] border-t border-[#EFE8E1]">
        <div className="container flex items-center overflow-x-auto scrollbar-none gap-1 py-1">
          {(categories || CATEGORIES).map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`whitespace-nowrap px-4 py-2 text-xs font-bold transition-all relative ${
                  isActive
                    ? 'text-[#C05663] bg-[#FFFFFF] rounded-xl shadow-xs'
                    : 'text-[#5A5450] hover:text-[#2D2926] hover:bg-[#FFFFFF]/60 rounded-xl'
                }`}
              >
                {cat}
                {isActive && (
                  <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#C05663] rounded-full" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Mobile Search */}
      <div className="px-4 py-2 md:hidden bg-[#FFFFFF] border-t border-[#EFE8E1]">
        <div className="relative">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9E938B]" />
          <input
            type="text"
            placeholder="Ürün, yaş, ebat veya renk ara..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs bg-[#F9F6F3] border border-[#EFE8E1] rounded-xl text-[#2D2926]"
          />
        </div>
      </div>

    </header>
  );
}
