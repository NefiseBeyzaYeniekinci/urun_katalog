import React from 'react';
import { ArrowUpDown, Users, Filter, Sparkles } from 'lucide-react';
import { GENDER_FILTERS } from '../data/initialProducts';

export default function CategoryFilter({
  selectedGender,
  setSelectedGender,
  sortBy,
  setSortBy,
  filteredCount
}) {
  return (
    <div className="py-2.5 bg-[#FDFBF7]/90 backdrop-blur-md transition-all">
      <div className="container">
        
        {/* Clean Minimal Bar */}
        <div className="bg-[#FFFFFF] px-4 py-3 rounded-2xl border border-[#EFE8E1] shadow-xs flex flex-row items-center justify-between gap-4">
          
          {/* Left: Product Count */}
          <div className="flex items-center gap-2 text-xs font-bold text-[#2D2926]">
            <Sparkles size={16} className="text-[#C05663]" />
            <span>Katalog: <strong className="text-[#C05663] font-extrabold">{filteredCount}</strong> Ürün Listeleniyor</span>
          </div>

          {/* Right: Sort Dropdown */}
          <div className="flex items-center gap-2 bg-[#F9F6F3] px-3.5 py-1.5 rounded-xl border border-[#EFE8E1] hover:border-[#D88E96] transition-colors">
            <ArrowUpDown size={14} className="text-[#C05663]" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent text-[#2D2926] text-xs font-bold focus:outline-none cursor-pointer"
            >
              <option value="featured">Sıralama: Öne Çıkanlar</option>
              <option value="price-low">Fiyat: Düşükten Yükseğe</option>
              <option value="price-high">Fiyat: Yüksekten Düşüğe</option>
              <option value="newest">En Yeni Koleksiyon</option>
            </select>
          </div>

        </div>

      </div>
    </div>
  );
}
