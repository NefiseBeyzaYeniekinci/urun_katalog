import React from 'react';
import { MessageCircle, MapPin, Clock, Truck, Send, Sparkles } from 'lucide-react';
import InstagramIcon from './icons/InstagramIcon';

export default function Footer({ storeConfig }) {
  const config = storeConfig || {
    storeName: "elisi_sevdasi Store",
    username: "elisi_sevdasi",
    location: "Gaziantep, Türkiye",
    whatsappNumber: "+905551234567",
    announcement: "🌿 El Emeği Örgü & Amigurumi Koleksiyonları • 📱 Instagram DM Üzerinden Anında İletişim & Şeffaf Fiyat",
    responseTime: "~15 Dk",
    workingHours: "09:00 - 23:00",
    shippingTime: "1-3 İş Günü İçinde Teslimat"
  };

  return (
    <footer className="bg-[#2D2926] text-[#FAF6F0] pt-12 pb-8 border-t border-[#4A4540]">
      <div className="container space-y-8 px-4 sm:px-6">
        
        {/* Top Banner inside Footer */}
        <div className="bg-[#3D3834] p-4 rounded-2xl border border-[#4A4540] flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <Sparkles size={18} className="text-[#E8B4B8] shrink-0" />
            <span className="text-xs sm:text-sm font-semibold text-[#FAF6F0]">
              🌿 El Emeği Örgü & Amigurumi Koleksiyonları • 📱 Instagram DM Üzerinden Anında İletişim & Şeffaf Fiyat
            </span>
          </div>
          <a
            href={`https://instagram.com/${config.username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-instagram text-xs py-2 px-4 font-bold shrink-0"
          >
            <InstagramIcon size={14} /> Instagram'dan İncele
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-8 border-b border-[#4A4540]">
          
          {/* Brand Col */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl overflow-hidden shadow-xs border border-[#4A4540] bg-[#FFFFFF] shrink-0">
                <img src="/logo.png" alt="elisi_sevdasi logo" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-xl font-bold font-heading text-[#FFFFFF] flex items-center gap-2">
                {config.storeName}
                <span className="text-[10px] bg-[#E8B4B8] text-[#2D2926] font-bold px-2 py-0.5 rounded-full uppercase">
                  Dijital Katalog
                </span>
              </h3>
            </div>
            <p className="text-xs text-[#B5AEA7] leading-relaxed">
              Instagram hesabımızdaki el emeği ve özel tasarım ürün koleksiyonlarının tüm renk, boyut, fiyat ve detay bilgilerini barındıran resmi vitrin sayfasıdır.
            </p>
            <div className="flex items-center gap-3 pt-1">
              <a
                href={`https://instagram.com/${config.username}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-[#3D3834] text-[#E8B4B8] hover:bg-[#E8B4B8] hover:text-[#2D2926] flex items-center justify-center transition-colors"
                title="Instagram Sayfamız"
              >
                <InstagramIcon size={17} />
              </a>
              <a
                href={`https://wa.me/${config.whatsappNumber.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-[#3D3834] text-[#25D366] hover:bg-[#25D366] hover:text-[#FFFFFF] flex items-center justify-center transition-colors"
                title="WhatsApp Sipariş Hattı"
              >
                <MessageCircle size={17} />
              </a>
            </div>
          </div>

          {/* DM Ordering Explanation */}
          <div className="space-y-2 bg-[#36322F] p-4 rounded-2xl border border-[#4A4540]">
            <h4 className="text-xs font-bold text-[#E8B4B8] flex items-center gap-1.5 uppercase tracking-wider">
              <Send size={14} /> DM Üzerinden Satın Alma Nasıl Çalışır?
            </h4>
            <ol className="text-xs text-[#D4C4B7] space-y-1.5 list-decimal list-inside leading-relaxed">
              <li>Beğendiğiniz ürünün sayfasındaki <strong>"DM Sipariş"</strong> butonuna tıklayın.</li>
              <li>Otomatik oluşturulan ürün kodu ve seçtiğiniz renk/beden bilgisi Instagram DM kutunuza aktarılır.</li>
              <li>Yetkili ekibimiz size anında yanıt vererek siparişinizi onaylar.</li>
            </ol>
          </div>

          {/* Location & Working Info */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-[#FFFFFF] uppercase tracking-wider">Çalışma Konumu & İletişim Bilgileri</h4>
            <div className="text-xs text-[#B5AEA7] space-y-2">
              <p className="flex items-center gap-2">
                <MapPin size={15} className="text-[#E8B4B8]" />
                <span>📍 <strong>{config.location}</strong></span>
              </p>
              <p className="flex items-center gap-2">
                <Clock size={15} className="text-[#E8B4B8]" />
                <span>⏰ DM Yanıt Süresi: {config.responseTime} ({config.workingHours})</span>
              </p>
              <p className="flex items-center gap-2">
                <Truck size={15} className="text-[#E8B4B8]" />
                <span>📦 Kargo Süresi: {config.shippingTime}</span>
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Clean Credits */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-[#8C847C] gap-4">
          <p>© {new Date().getFullYear()} {config.storeName}. Tüm Hakları Saklıdır.</p>
        </div>

      </div>
    </footer>
  );
}
