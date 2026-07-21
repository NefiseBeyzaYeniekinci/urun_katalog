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
    <div className="sticky top-[108px] z-30 py-3 bg-[#FDFBF7]/90 backdrop-blur-md transition-all">
      <div className="container">
        
        {/* Floating Glassmorphic Filter Card */}
        <div className="bg-[#FFFFFF] p-3 sm:p-4 rounded-3xl border border-[#EFE8E1] shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Target Audience Pills */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none px-1">
            
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-[#F6F0EA] text-[#2D2926] text-xs font-bold shrink-0 border border-[#EFE8E1]">
              <Users size={14} className="text-[#C05663]" />
              <span>Kitle:</span>
            </div>

            <div className="flex items-center gap-1.5">
              {GENDER_FILTERS.map((g) => {
                const isSelected = selectedGender === g;
                return (
                  <button
                    key={g}
                    onClick={() => setSelectedGender(g)}
                    className={`whitespace-nowrap px-3.5 py-1.5 rounded-2xl text-xs font-semibold transition-all duration-300 ${
                      isSelected
                        ? 'bg-[#C05663] text-[#FFFFFF] shadow-sm font-bold scale-105 border border-[#C05663]'
                        : 'bg-[#FAF6F0] text-[#5A5450] hover:bg-[#F5EAE6] hover:text-[#C05663] border border-transparent'
                    }`}
                  >
                    {g}
                  </button>
                );
              })}
            </div>

          </div>

          {/* Right Section: Product Count & Sorting */}
          <div className="flex items-center justify-between md:justify-end w-full md:w-auto gap-4 text-xs pt-2 md:pt-0 border-t md:border-t-0 border-[#F6F0EA] px-1">
            
            <div className="text-[#736C65] font-medium flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#4A7A56]" />
              <span>Toplu Gösterim: <strong className="text-[#2D2926] font-bold">{filteredCount}</strong> Örgü Ürünü</span>
            </div>

            <div className="flex items-center gap-2 bg-[#F9F6F3] px-3.5 py-2 rounded-2xl border border-[#EFE8E1] hover:border-[#D88E96] transition-colors">
              <ArrowUpDown size={14} className="text-[#C05663]" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent text-[#2D2926] text-xs font-bold focus:outline-none cursor-pointer"
              >
                <option value="featured">Sıralama: Öne Çıkanlar</option>
                <option value="price-low">Fiyat: Düşükten Yükseğe</option>
                <option value="price-high">Fiyat: Yüksekten Düşüğe</option>
                <option value="newest">En Yeni Örgü Koleksiyonu</option>
              </select>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
