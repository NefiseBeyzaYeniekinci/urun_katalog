import React from 'react';
import { Heart, Eye, Star, MessageCircle, Check, Tag } from 'lucide-react';
import InstagramIcon from './icons/InstagramIcon';
import { INSTAGRAM_CONFIG } from '../data/initialProducts';

export default function ProductCard({
  product,
  isFavorite,
  onToggleFavorite,
  onSelectProduct
}) {
  if (!product) return null;

  // Direct Instagram DM url
  const getInstagramDmUrl = () => {
    return `https://instagram.com/${INSTAGRAM_CONFIG.username}`;
  };

  // Safe Arrays
  const sizesArray = Array.isArray(product.sizes)
    ? product.sizes
    : (typeof product.sizes === 'string' ? product.sizes.split(',').map(s => s.trim()) : []);

  const primaryImage = (Array.isArray(product.images) && product.images[0]) || product.image || product.image_url || (typeof product.images === 'string' ? product.images : '');
  const imagesArray = primaryImage
    ? [primaryImage]
    : ['https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=800&q=80'];

  const formattedPrice = typeof product.price === 'number'
    ? product.price.toLocaleString('tr-TR')
    : (product.price || '0');

  const hasDiscount = product.oldPrice && Number(product.oldPrice) > Number(product.price) && (product.discountPercent != null);
  const formattedOldPrice = hasDiscount
    ? (typeof product.oldPrice === 'number' ? product.oldPrice.toLocaleString('tr-TR') : product.oldPrice)
    : null;

  return (
    <div className="group bg-[#FFFFFF] rounded-2xl border border-[#EFE8E1] shadow-xs hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col justify-between hover:-translate-y-1">
      
      {/* 1. Image Container */}
      <div
        className="relative aspect-[4/5] overflow-hidden bg-[#F9F6F3] cursor-pointer"
        onClick={() => onSelectProduct(product)}
      >
        <img
          src={imagesArray[0]}
          alt={product.title || 'Ürün Görseli'}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=800&q=80';
          }}
        />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1 z-10 pointer-events-none">
          {product.badgeText && (
            <span className="badge bg-[#C05663] text-white font-bold text-[10px] px-2.5 py-1 rounded-md shadow-xs">
              {product.badgeText}
            </span>
          )}
          {product.discountPercent && (
            <span className="badge bg-[#2D2926] text-[#E8B4B8] font-extrabold text-[10px] px-2 py-0.5 rounded-md">
              %{product.discountPercent} İNDİRİM
            </span>
          )}
        </div>

        {/* Favorite Heart Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(product.id);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all duration-200 z-10 ${
            isFavorite
              ? 'bg-[#C05663] text-[#FFFFFF] shadow-sm scale-110'
              : 'bg-[#FFFFFF]/90 text-[#5A5450] hover:bg-[#FFFFFF] hover:text-[#C05663]'
          }`}
          title={isFavorite ? "Favorilerden Çıkar" : "Favorilere Ekle"}
        >
          <Heart size={16} fill={isFavorite ? "#FFFFFF" : "none"} />
        </button>

        {/* Quick View Hover Overlay */}
        <div className="absolute inset-0 bg-[#2D2926]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
          <span className="bg-[#FFFFFF] text-[#2D2926] px-4 py-2 rounded-full text-xs font-bold shadow-md flex items-center gap-1.5">
            <Eye size={14} /> Detay & Yaş/Beden Seç
          </span>
        </div>
      </div>

      {/* 2. Product Details */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-2.5">
        
        <div>
          {/* Brand & Category */}
          <div className="flex items-center justify-between text-[11px] font-semibold text-[#8C7355] mb-1">
            <span>{product.brand || 'elisi_sevdasi'}</span>
            <span className="text-[#9E938B] font-normal">{product.category || 'Örgü'}</span>
          </div>

          {/* Title */}
          <h3
            onClick={() => onSelectProduct(product)}
            className="text-xs sm:text-sm font-bold text-[#2D2926] line-clamp-2 hover:text-[#C05663] cursor-pointer transition-colors leading-snug"
          >
            {product.title}
          </h3>

          {/* Rating Stars */}
          <div className="flex items-center gap-1.5 mt-1 text-[11px] text-[#736C65]">
            <div className="flex items-center text-[#E6A100]">
              <Star size={12} fill="#E6A100" />
              <span className="font-bold text-[#2D2926] ml-1">{product.rating || '5.0'}</span>
            </div>
            <span>({product.reviewCount || 42} Değerlendirme)</span>
          </div>

          {/* Age / Size / Specs Tags preview */}
          <div className="flex flex-wrap gap-1 mt-2">
            {sizesArray.slice(0, 3).map((s, idx) => (
              <span key={idx} className="text-[10px] font-medium bg-[#F6F0EA] text-[#5A5450] px-1.5 py-0.5 rounded">
                {s}
              </span>
            ))}
            {sizesArray.length > 3 && (
              <span className="text-[10px] font-medium text-[#9E938B]">
                +{sizesArray.length - 3} seçenek
              </span>
            )}
          </div>
        </div>

        {/* Price & Action */}
        <div className="pt-2 border-t border-[#F6F0EA] space-y-2.5">
          
          <div className="flex items-baseline justify-between">
            <div>
              <span className="text-base sm:text-lg font-extrabold text-[#C05663] font-heading">
                {formattedPrice} ₺
              </span>
              {formattedOldPrice && (
                <span className="text-xs text-[#9E938B] line-through ml-2 font-medium">
                  {formattedOldPrice} ₺
                </span>
              )}
            </div>

            <span className="text-[10px] font-bold text-[#4A7A56] bg-[#EBF5EE] px-2 py-0.5 rounded-full">
              Hızlı Kargo
            </span>
          </div>

          {/* CTA Buttons */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => onSelectProduct(product)}
              className="btn btn-outline text-xs py-2 px-1.5 border-[#EFE8E1] hover:border-[#D4C4B7]"
            >
              <Eye size={13} /> İncele
            </button>

            <a
              href={getInstagramDmUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-instagram text-xs py-2 px-1.5 text-center font-bold"
              title="Instagram DM üzerinden sipariş ver"
            >
              <InstagramIcon size={13} /> DM Sipariş
            </a>
          </div>

        </div>

      </div>

    </div>
  );
}
