import React from 'react';
import ProductCard from './ProductCard';
import { PackageSearch, Sparkles } from 'lucide-react';

export default function ProductGrid({
  products,
  favorites,
  onToggleFavorite,
  onSelectProduct,
  onResetFilters
}) {
  if (products.length === 0) {
    return (
      <div className="container py-16 text-center">
        <div className="max-w-md mx-auto bg-[#FFFFFF] p-8 rounded-3xl border border-[#EFE8E1] shadow-sm space-y-4">
          <div className="w-16 h-16 bg-[#F5EAE6] text-[#C05663] rounded-full flex items-center justify-center mx-auto">
            <PackageSearch size={32} />
          </div>
          <h3 className="text-xl font-bold text-[#2D2926]">Henüz Ürün Bulunmuyor</h3>
          <p className="text-xs text-[#736C65] leading-relaxed">
            Veritabanınızda veya aramanızda henüz eklenmiş bir ürün yok. Yönetici panelinden ilk ürününüzü ekleyebilirsiniz.
          </p>
          <button
            onClick={onResetFilters}
            className="btn btn-primary text-xs py-2.5 px-5 rounded-2xl font-bold bg-[#2D2926] hover:bg-[#4A4540] text-white"
          >
            Filtreleri Sıfırla
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((prod) => (
          <ProductCard
            key={prod.id}
            product={prod}
            isFavorite={favorites.includes(prod.id)}
            onToggleFavorite={onToggleFavorite}
            onSelectProduct={onSelectProduct}
          />
        ))}
      </div>
    </div>
  );
}
