import React, { useState, useEffect } from 'react';
import { X, MessageCircle, Check, Heart, Star, ShieldCheck, Truck, ArrowRight, Copy, Send, Ruler, Sparkles, Tag } from 'lucide-react';
import InstagramIcon from './icons/InstagramIcon';
import { INSTAGRAM_CONFIG } from '../data/initialProducts';

export default function ProductModal({
  product,
  allProducts,
  onClose,
  isFavorite,
  onToggleFavorite,
  onSelectProduct,
  storeConfig
}) {
  if (!product) return null;

  const config = storeConfig || INSTAGRAM_CONFIG;

  // Safe Array helpers
  const images = Array.isArray(product.images) && product.images.length > 0
    ? product.images
    : ['https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=800&q=80'];

  const colors = Array.isArray(product.colors)
    ? product.colors
    : (typeof product.colors === 'string' ? product.colors.split(',').map(c => c.trim()) : []);

  const sizes = Array.isArray(product.sizes)
    ? product.sizes
    : (typeof product.sizes === 'string' ? product.sizes.split(',').map(s => s.trim()) : []);

  const features = Array.isArray(product.features)
    ? product.features
    : (typeof product.features === 'string' ? product.features.split(',').map(f => f.trim()) : []);

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(colors[0] || '');
  const [selectedSize, setSelectedSize] = useState(sizes[0] || '');
  const [copied, setCopied] = useState(false);

  // Reset active image when product changes
  useEffect(() => {
    setActiveImageIndex(0);
    setSelectedColor(colors[0] || '');
    setSelectedSize(sizes[0] || '');
  }, [product]);

  // Find Similar / Related Products
  const similarProducts = (allProducts || [])
    .filter(p => p && p.id !== product.id && (p.category === product.category || p.gender === product.gender))
    .slice(0, 4);

  // Pre-filled DM message text
  const dmMessageText = `Merhaba @${config.username}! Kataloğunuzdaki "${product.title}" ürünü ile ilgileniyorum.\n\n• Fiyat: ${product.price} TL\n• Seçilen Renk: ${selectedColor || 'Belirtilmedi'}\n• Beden/Yaş Ölçüsü: ${selectedSize || 'Belirtilmedi'}\n• Ürün Kodu: #${product.id}\n\nStok durumu ve sipariş için bilgi alabilir miyim? 🌿`;

  const getInstagramUrl = () => {
    return `https://instagram.com/${config.username}`;
  };

  const handleCopyMessage = () => {
    navigator.clipboard.writeText(dmMessageText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="modal-overlay animate-fade-in" onClick={onClose}>
      <div
        className="bg-[#FFFFFF] w-full max-w-5xl max-w-[calc(100vw-24px)] rounded-3xl overflow-hidden shadow-lg border border-[#EFE8E1] max-h-[92vh] flex flex-col relative animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Modal Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-30 w-10 h-10 rounded-full bg-[#FFFFFF]/90 hover:bg-[#FFFFFF] border border-[#EFE8E1] text-[#2D2926] flex items-center justify-center transition-all shadow-sm"
          title="Kapat"
        >
          <X size={20} />
        </button>

        {/* Scrollable Container for Modal Body */}
        <div className="overflow-y-auto flex-1">
          
          {/* Main Top Section: Image & Specs */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 p-6 md:p-8">
            
            {/* Left Column (5/12): Multi-Image Gallery */}
            <div className="md:col-span-5 space-y-4">
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-[#F9F6F3] border border-[#EFE8E1] shadow-xs">
                <img
                  src={images[activeImageIndex] || images[0]}
                  alt={product.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=800&q=80';
                  }}
                />
                
                {product.badgeText && (
                  <span className="absolute top-3 left-3 bg-[#C05663] text-white text-xs font-bold px-3 py-1 rounded-md shadow-xs">
                    {product.badgeText}
                  </span>
                )}
                {product.discountPercent && (
                  <span className="absolute top-3 right-3 bg-[#2D2926] text-[#E8B4B8] text-xs font-extrabold px-2.5 py-1 rounded-md">
                    %{product.discountPercent} İndirim
                  </span>
                )}
              </div>

              {/* Thumbnail Bar */}
              {images.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-1">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all ${
                        activeImageIndex === idx
                          ? 'border-[#C05663] scale-105 shadow-sm'
                          : 'border-transparent opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              {/* Guarantees Box */}
              <div className="bg-[#FAF6F0] p-4 rounded-2xl border border-[#EFE8E1] space-y-2 text-xs text-[#5A5450]">
                <div className="flex items-center gap-2 font-bold text-[#2D2926]">
                  <Truck size={16} className="text-[#C05663]" />
                  <span>Kargo & Teslimat Bilgisi</span>
                </div>
                <p className="text-[11px] leading-relaxed text-[#736C65]">
                  Siparişleriniz Instagram DM üzerinden teyit edildikten sonra 1-3 iş günü içerisinde kargoya teslim edilir.
                </p>
              </div>
            </div>

            {/* Right Column (7/12): Product Details & DM Order Form */}
            <div className="md:col-span-7 space-y-5">
              
              {/* Header Info */}
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-[#C05663] tracking-wider uppercase">
                    {product.brand || 'elisi_sevdasi'} • {product.category}
                  </span>

                  <button
                    onClick={() => onToggleFavorite(product.id)}
                    className={`p-2 rounded-full border transition-all ${
                      isFavorite
                        ? 'bg-[#C05663] text-[#FFFFFF] border-[#C05663]'
                        : 'bg-[#F6F0EA] text-[#5A5450] border-[#EFE8E1] hover:text-[#C05663]'
                    }`}
                    title="Favorilere Ekle"
                  >
                    <Heart size={18} fill={isFavorite ? '#FFFFFF' : 'none'} />
                  </button>
                </div>

                <h1 className="text-xl md:text-2xl font-bold text-[#2D2926] mt-1 leading-tight">
                  {product.title}
                </h1>

                {/* Rating Stars */}
                <div className="flex items-center gap-2 mt-2 text-xs">
                  <div className="flex items-center text-[#E6A100] font-bold">
                    <Star size={14} fill="#E6A100" />
                    <span className="ml-1 text-[#2D2926]">{product.rating || '5.0'}</span>
                  </div>
                  <span className="text-[#9E938B]">|</span>
                  <span className="text-[#736C65] font-medium">{product.reviewCount || 42} Değerlendirme</span>
                  <span className="text-[#9E938B]">|</span>
                  <span className="text-[#4A7A56] font-bold bg-[#EBF5EE] px-2 py-0.5 rounded-full text-[11px]">
                    ✓ Stokta Var
                  </span>
                </div>
              </div>

              {/* Price Banner */}
              <div className="bg-[#F9F6F3] p-4 rounded-2xl border border-[#EFE8E1] flex items-center justify-between">
                <div>
                  <span className="text-2xl md:text-3xl font-extrabold text-[#C05663] font-heading">
                    {product.price ? product.price.toLocaleString('tr-TR') : '0'} ₺
                  </span>
                  {product.oldPrice && Number(product.oldPrice) > Number(product.price) && product.discountPercent != null && (
                    <span className="text-sm text-[#9E938B] line-through ml-3 font-medium">
                      {typeof product.oldPrice === 'number' ? product.oldPrice.toLocaleString('tr-TR') : product.oldPrice} ₺
                    </span>
                  )}
                </div>

                {product.oldPrice && Number(product.oldPrice) > Number(product.price) && product.discountPercent != null && (
                  <span className="bg-[#2D2926] text-[#E8B4B8] font-bold text-xs px-3 py-1 rounded-xl">
                    %{product.discountPercent} İndirim
                  </span>
                )}
              </div>

              {/* Beden / Yaş Seçimi */}
              {sizes.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-[#2D2926]">
                    <span>Beden / Yaş Ölçüsü Seçin:</span>
                    <span className="text-[#C05663]">{selectedSize || 'Lütfen Seçiniz'}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {sizes.map((s, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedSize(s)}
                        className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition-all ${
                          selectedSize === s
                            ? 'bg-[#C05663] text-[#FFFFFF] border-[#C05663] shadow-xs'
                            : 'bg-[#FFFFFF] text-[#5A5450] border-[#EFE8E1] hover:border-[#D4C4B7]'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Boy / Ebat / Ölçü Bilgileri */}
              {product.dimensions && (
                <div className="bg-[#FAF6F0] p-3.5 rounded-2xl border border-[#EFE8E1] space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#2D2926]">
                    <Ruler size={15} className="text-[#C05663]" />
                    <span>Boy / Ebat / Kalıp Detayı:</span>
                  </div>
                  <p className="text-xs text-[#6B5E57] font-medium pl-5">
                    {product.dimensions}
                  </p>
                </div>
              )}

              {/* Renk Seçimi */}
              {colors.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-[#2D2926]">
                    <span>Renk Seçeneği:</span>
                    <span className="text-[#C05663]">{selectedColor}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {colors.map((c, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedColor(c)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-all ${
                          selectedColor === c
                            ? 'bg-[#2D2926] text-[#FFFFFF] border-[#2D2926]'
                            : 'bg-[#FFFFFF] text-[#5A5450] border-[#EFE8E1] hover:border-[#D4C4B7]'
                        }`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Description */}
              <div className="text-xs text-[#5A5450] leading-relaxed">
                <p className="font-bold text-[#2D2926] mb-1">Ürün Açıklaması:</p>
                <p>{product.description}</p>
              </div>

              {/* Features Specs Table */}
              {features.length > 0 && (
                <div className="grid grid-cols-2 gap-2 text-xs text-[#736C65] bg-[#F9F6F3] p-3 rounded-xl">
                  {features.map((f, i) => (
                    <div key={i} className="flex items-center gap-1.5 font-medium">
                      <Check size={13} className="text-[#4A7A56]" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* DM Order Message Preview Box */}
              <div className="bg-[#FAF0EB] p-4 rounded-2xl border border-[#F6D6DA] space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-[#C05663]">
                  <span className="flex items-center gap-1.5">
                    <Send size={14} /> Otomatik Hazırlanan DM Sipariş Mesajınız:
                  </span>
                  <button
                    onClick={handleCopyMessage}
                    className="text-[11px] text-[#2D2926] hover:underline flex items-center gap-1 font-semibold"
                  >
                    {copied ? <Check size={12} className="text-[#4A7A56]" /> : <Copy size={12} />}
                    {copied ? 'Kopyalandı!' : 'Metni Kopyala'}
                  </button>
                </div>
                <p className="text-[11px] text-[#6B5E57] italic whitespace-pre-line bg-[#FFFFFF]/80 p-3 rounded-xl border border-[#F6E3E5]">
                  {dmMessageText}
                </p>
              </div>

              {/* Primary Order CTAs */}
              <div className="space-y-2.5 pt-2">
                <a
                  href={getInstagramUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-instagram w-full py-3.5 text-sm shadow-md font-bold flex items-center justify-center gap-2"
                >
                  <InstagramIcon size={18} />
                  <span>Instagram DM İle Sipariş Ver</span>
                </a>
              </div>

            </div>

          </div>

          {/* Benzer Ürünler / Same Tagged Products Section */}
          {similarProducts.length > 0 && (
            <div className="border-t border-[#EFE8E1] bg-[#FAF6F0] p-6 md:p-8 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-[#2D2926] flex items-center gap-2">
                    <Sparkles size={18} className="text-[#C05663]" />
                    Benzer Ürünler & Aynı Kategoriye Ait Koleksiyon
                  </h3>
                  <p className="text-xs text-[#736C65]">İncelediğiniz ürüne benzer diğer popüler seçenekler</p>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {similarProducts.map((simProd) => (
                  <div
                    key={simProd.id}
                    onClick={() => onSelectProduct(simProd)}
                    className="bg-[#FFFFFF] p-3 rounded-2xl border border-[#EFE8E1] hover:border-[#D4C4B7] shadow-xs cursor-pointer group transition-all"
                  >
                    <div className="aspect-square rounded-xl overflow-hidden bg-[#F6F0EA] mb-2 relative">
                      <img
                        src={Array.isArray(simProd.images) ? simProd.images[0] : simProd.images}
                        alt={simProd.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <span className="text-[10px] font-bold text-[#8C7355] block uppercase">{simProd.category}</span>
                    <h4 className="text-xs font-bold text-[#2D2926] line-clamp-1 group-hover:text-[#C05663]">
                      {simProd.title}
                    </h4>
                    <div className="mt-1 flex items-baseline justify-between text-xs">
                      <span className="font-extrabold text-[#C05663]">{simProd.price} ₺</span>
                      <span className="text-[10px] text-[#9E938B] font-medium">İncele →</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
