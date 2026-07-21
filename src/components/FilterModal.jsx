import React, { useState } from 'react';
import { X, Filter, RotateCcw, Check, Sparkles, SlidersHorizontal } from 'lucide-react';
import { CATEGORIES, GENDER_FILTERS } from '../data/initialProducts';

export default function FilterModal({
  isOpen,
  onClose,
  categories = CATEGORIES,
  activeCategory,
  setActiveCategory,
  selectedGender,
  setSelectedGender,
  sortBy,
  setSortBy,
  onApplyFilters,
  totalProductsCount
}) {
  const [tempCategory, setTempCategory] = useState(activeCategory);
  const [tempGender, setTempGender] = useState(selectedGender);
  const [tempSortBy, setTempSortBy] = useState(sortBy);

  if (!isOpen) return null;

  const handleApply = () => {
    setActiveCategory(tempCategory);
    setSelectedGender(tempGender);
    setSortBy(tempSortBy);
    if (onApplyFilters) onApplyFilters();
    onClose();
  };

  const handleReset = () => {
    setTempCategory('Tümü');
    setTempGender('Tüm Cinsiyetler');
    setTempSortBy('featured');
  };

  const hasActiveFilters = tempCategory !== 'Tümü' || tempGender !== 'Tüm Cinsiyetler' || tempSortBy !== 'featured';

  return (
    <div className="modal-overlay animate-fade-in" onClick={onClose}>
      <div
        className="bg-[#FFFFFF] w-full max-w-lg max-w-[calc(100vw-24px)] rounded-3xl overflow-hidden shadow-2xl border border-[#EFE8E1] p-5 sm:p-7 relative animate-scale-in space-y-6 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#EFE8E1] pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-[#F5EAE6] text-[#C05663] flex items-center justify-center">
              <SlidersHorizontal size={18} />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-[#2D2926]">Katalog Filtreleme</h3>
              <p className="text-[11px] text-[#736C65]">İstediğiniz kategoriyi ve ürün sıralamasını seçin</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#F6F0EA] hover:bg-[#EDE4DA] text-[#2D2926] flex items-center justify-center transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Scrollable Filter Body */}
        <div className="overflow-y-auto space-y-6 pr-1 flex-1">
          
          {/* 1. Categories */}
          <div className="space-y-2.5">
            <label className="text-xs font-bold text-[#2D2926] uppercase tracking-wider block">
              1. Kategori Seçimi
            </label>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => {
                const isSelected = tempCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setTempCategory(cat)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 border ${
                      isSelected
                        ? 'bg-[#C05663] text-white border-[#C05663] shadow-xs'
                        : 'bg-[#F9F6F3] text-[#5A5450] hover:bg-[#F5EAE6] hover:text-[#C05663] border-[#EFE8E1]'
                    }`}
                  >
                    {isSelected && <Check size={14} />}
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Gender / Audience */}
          <div className="space-y-2.5">
            <label className="text-xs font-bold text-[#2D2926] uppercase tracking-wider block">
              2. Kitle / Cinsiyet Seçimi
            </label>
            <div className="flex flex-wrap gap-2">
              {GENDER_FILTERS.map((g) => {
                const isSelected = tempGender === g;
                return (
                  <button
                    key={g}
                    onClick={() => setTempGender(g)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all border ${
                      isSelected
                        ? 'bg-[#2D2926] text-white border-[#2D2926] font-bold shadow-xs'
                        : 'bg-[#F9F6F3] text-[#5A5450] hover:bg-[#F6F0EA] border-[#EFE8E1]'
                    }`}
                  >
                    {g}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. Sorting */}
          <div className="space-y-2.5">
            <label className="text-xs font-bold text-[#2D2926] uppercase tracking-wider block">
              3. Ürün Sıralaması
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {[
                { id: 'featured', label: 'Öne Çıkanlar' },
                { id: 'price-low', label: 'Fiyat: Düşükten Yükseğe' },
                { id: 'price-high', label: 'Fiyat: Yüksekten Düşüğe' },
                { id: 'newest', label: 'En Yeni Koleksiyon' }
              ].map((sortOption) => {
                const isSelected = tempSortBy === sortOption.id;
                return (
                  <button
                    key={sortOption.id}
                    onClick={() => setTempSortBy(sortOption.id)}
                    className={`px-3.5 py-2.5 rounded-xl text-xs font-bold text-left transition-all border flex items-center justify-between ${
                      isSelected
                        ? 'bg-[#F5EAE6] text-[#C05663] border-[#D88E96]'
                        : 'bg-[#F9F6F3] text-[#5A5450] hover:bg-[#F6F0EA] border-[#EFE8E1]'
                    }`}
                  >
                    <span>{sortOption.label}</span>
                    {isSelected && <Check size={14} className="text-[#C05663]" />}
                  </button>
                );
              })}
            </div>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-[#EFE8E1] flex items-center justify-between gap-3">
          <button
            onClick={handleReset}
            disabled={!hasActiveFilters}
            className="px-4 py-2.5 rounded-2xl text-xs font-bold text-[#736C65] hover:text-[#2D2926] bg-[#F6F0EA] hover:bg-[#EDE4DA] transition-colors flex items-center gap-1.5 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <RotateCcw size={14} /> Sıfırla
          </button>

          <button
            onClick={handleApply}
            className="btn btn-primary flex-1 py-3 text-xs font-bold bg-[#C05663] hover:bg-[#a84753] text-white rounded-2xl shadow-md transition-all flex items-center justify-center gap-2"
          >
            <Sparkles size={15} /> Filtreleri Uygula
          </button>
        </div>
      </div>
    </div>
  );
}
