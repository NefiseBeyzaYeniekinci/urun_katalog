import React from 'react';
import { Search, Heart, Lock, LogOut, Settings, SlidersHorizontal } from 'lucide-react';
import InstagramIcon from './icons/InstagramIcon';

export default function Navbar({
  searchTerm,
  setSearchTerm,
  favoritesCount,
  onOpenFavorites,
  onOpenAdminAuth,
  isAdminLoggedIn,
  onLogoutAdmin,
  activeCategory,
  onOpenFilterModal,
  storeConfig
}) {
  const config = storeConfig || {
    storeName: "elisi_sevdasi Store",
    username: "elisi_sevdasi",
    announcement: "🌿 El Emeği Özel Koleksiyonlar",
    responseTime: "~15 Dk"
  };

  const isFilterActive = activeCategory !== 'Tümü';

  return (
    <header className="sticky top-0 z-40 bg-[#FFFFFF] border-b border-[#EFE8E1] shadow-xs">
      
      {/* 1. Announcement Bar */}
      <div className="bg-[#2D2926] text-[#FAF6F0] py-1.5 px-3 sm:px-4 text-[11px] sm:text-xs font-medium overflow-hidden">
        <div className="container flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 min-w-0 shrink">
            <span className="truncate">
              🌿 El Emeği Örgü Koleksiyonları
            </span>
          </div>

          <div className="flex items-center gap-2.5 text-[11px] text-[#D4C4B7] shrink-0">
            <a
              href={`https://instagram.com/${config.username}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#E8B4B8] transition-colors flex items-center gap-1 font-semibold"
            >
              <InstagramIcon size={13} /> @{config.username}
            </a>
            {!isAdminLoggedIn && (
              <button
                onClick={onOpenAdminAuth}
                className="opacity-30 hover:opacity-100 transition-opacity p-0.5 text-[#FAF6F0]"
                title="Yönetici Girişi"
              >
                <Lock size={12} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 2. Main Navigation Bar */}
      <div className="container py-3.5 flex items-center justify-between gap-3 sm:gap-4">
        
        {/* Brand Logo Image */}
        <div className="flex items-center gap-2.5 sm:gap-3 cursor-pointer shrink-0" onClick={onOpenFilterModal}>
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl overflow-hidden shadow-xs border border-[#F6D6DA] bg-[#FFFFFF] flex items-center justify-center p-0.5">
            <img src="/logo.png" alt="elisi_sevdasi logo" className="w-full h-full object-cover rounded-[14px]" />
          </div>
          <div>
            <h1 className="text-base sm:text-2xl font-extrabold text-[#2D2926] tracking-tight flex items-center gap-2">
              {config.storeName}
            </h1>
            <p className="text-[11px] text-[#736C65] font-medium hidden sm:block">
              Özel El Örgüsü & Amigurumi Koleksiyonu
            </p>
          </div>
        </div>

        {/* Central Search Bar + Filter Button (Desktop) */}
        <div className="flex-1 max-w-lg mx-2 sm:mx-4 hidden md:flex items-center gap-2">
          <div className="relative flex-1">
            <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9E938B]" />
            <input
              type="text"
              placeholder="Ürün adı, yaş grubu, ebat veya renk ara..."
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

          <button
            onClick={onOpenFilterModal}
            className={`btn py-2.5 px-3.5 text-xs font-bold rounded-2xl border shadow-xs transition-all flex items-center gap-1.5 shrink-0 ${
              isFilterActive
                ? 'bg-[#C05663] text-white border-[#C05663]'
                : 'bg-[#F5EAE6] hover:bg-[#C05663] hover:text-white text-[#C05663] border-[#F6D6DA]'
            }`}
            title="Kategori & Ürün Filtrele"
          >
            <SlidersHorizontal size={16} />
            <span>Filtrele</span>
            {isFilterActive && (
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            )}
          </button>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          
          {/* Admin Panel Link */}
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
              className="p-2.5 rounded-2xl bg-[#F9F6F3] border border-[#EFE8E1] text-[#9E938B] hover:text-[#2D2926] hover:bg-[#F6F0EA] transition-colors md:hidden"
              title="Yönetici Girişi"
            >
              <Lock size={17} />
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
              <span className="absolute -top-1 -right-1 bg-[#C05663] text-[#FFFFFF] text-[10px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center border-2 border-[#FFFFFF] animate-scale-in">
                {favoritesCount}
              </span>
            )}
          </button>
        </div>

      </div>

      {/* Mobile Search & Filter Row */}
      <div className="px-4 py-2.5 md:hidden bg-[#FFFFFF] border-t border-[#EFE8E1] flex items-center gap-2">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9E938B]" />
          <input
            type="text"
            placeholder="Ürün veya kategori ara..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-8 py-2 text-xs bg-[#F9F6F3] border border-[#EFE8E1] rounded-2xl focus:outline-none focus:bg-[#FFFFFF] focus:border-[#C05663] text-[#2D2926] placeholder-[#9E938B]"
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

        <button
          onClick={onOpenFilterModal}
          className={`py-2 px-3 text-xs font-bold rounded-2xl border transition-all flex items-center gap-1.5 shrink-0 ${
            isFilterActive
              ? 'bg-[#C05663] text-white border-[#C05663]'
              : 'bg-[#F5EAE6] text-[#C05663] border-[#F6D6DA]'
          }`}
        >
          <SlidersHorizontal size={15} />
          <span>Filtrele</span>
        </button>
      </div>

    </header>
  );
}
