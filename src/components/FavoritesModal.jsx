import React from 'react';
import { X, Heart, Eye, Trash2 } from 'lucide-react';
import InstagramIcon from './icons/InstagramIcon';
import { INSTAGRAM_CONFIG } from '../data/initialProducts';

export default function FavoritesModal({
  onClose,
  favoriteProducts,
  onToggleFavorite,
  onSelectProduct
}) {
  const [copied, setCopied] = React.useState(false);

  const handleBulkInstagramDm = () => {
    if (!favoriteProducts || favoriteProducts.length === 0) return;

    const itemsText = favoriteProducts
      .map((p, idx) => `${idx + 1}. ${p.title} (#${p.id}) - ${p.price} TL`)
      .join('\n');

    const totalPrice = favoriteProducts.reduce((sum, p) => sum + (Number(p.price) || 0), 0);

    const message = `Merhaba @${INSTAGRAM_CONFIG.username}! Beğendiğim favori ürünleriniz için stok ve sipariş bilgisi almak istiyorum:\n\n${itemsText}\n\n• Toplam Tutarlı Liste (${favoriteProducts.length} Ürün): ~${totalPrice} TL\n\nSipariş oluşturmak için yardımcı olabilir misiniz? 🌿`;

    try {
      navigator.clipboard.writeText(message);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch (e) {}

    window.open(`https://instagram.com/${INSTAGRAM_CONFIG.username}`, '_blank');
  };

  return (
    <div className="modal-overlay animate-fade-in" onClick={onClose}>
      <div
        className="bg-[#FFFFFF] w-full max-w-xl rounded-3xl overflow-hidden shadow-lg border border-[#EFE8E1] max-h-[85vh] flex flex-col relative animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#FAF0EB] p-5 border-b border-[#EFE2D8] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-[#D88E96] text-white">
              <Heart size={18} fill="#FFFFFF" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#2D2926]">Favori Ürünlerim ({favoriteProducts.length})</h3>
              <p className="text-xs text-[#736C65]">Beğendiğiniz ürünleri burada listeleyebilir ve DM ile sorabilirsiniz</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#FFFFFF] border border-[#EFE8E1] text-[#2D2926] flex items-center justify-center hover:bg-[#F6F0EA]"
          >
            <X size={16} />
          </button>
        </div>

        {/* List */}
        <div className="p-6 overflow-y-auto flex-1">
          {favoriteProducts.length === 0 ? (
            <div className="text-center py-10 space-y-3">
              <Heart size={36} className="mx-auto text-[#D4C4B7]" />
              <p className="text-sm font-bold text-[#2D2926]">Henüz favori ürün eklemediniz.</p>
              <p className="text-xs text-[#736C65]">Ürün kartlarındaki kalp ikonuna basarak listenizi oluşturabilirsiniz.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {favoriteProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center justify-between p-3.5 bg-[#F9F6F3] rounded-2xl border border-[#EFE8E1] hover:border-[#D4C4B7] transition-all"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={product.images[0]}
                      alt={product.title}
                      className="w-14 h-14 rounded-xl object-cover"
                    />
                    <div>
                      <h4 className="text-xs font-bold text-[#2D2926] line-clamp-1">{product.title}</h4>
                      <p className="text-xs font-extrabold text-[#2D2926] font-heading mt-0.5">
                        {product.price.toLocaleString('tr-TR')} ₺
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        onClose();
                        onSelectProduct(product);
                      }}
                      className="btn btn-outline text-xs py-1.5 px-3 bg-[#FFFFFF]"
                    >
                      <Eye size={14} /> İncele
                    </button>

                    <button
                      onClick={() => onToggleFavorite(product.id)}
                      className="p-2 text-[#C05663] hover:bg-[#FDF2F4] rounded-xl transition-colors"
                      title="Favorilerden Çıkar"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer CTA for Bulk Order */}
        {favoriteProducts.length > 0 && (
          <div className="p-5 border-t border-[#EFE8E1] bg-[#FAF6F0]">
            <a
              href={`https://instagram.com/${INSTAGRAM_CONFIG.username}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-instagram w-full py-3 text-xs shadow-md font-bold flex items-center justify-center gap-2"
            >
              <InstagramIcon size={16} />
              <span>Instagram DM İle İletişime Geç</span>
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
