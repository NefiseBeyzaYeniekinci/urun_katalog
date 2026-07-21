import React from 'react';
import { Sparkles, ShieldCheck, HeartHandshake, MessageCircle, Star } from 'lucide-react';
import { INSTAGRAM_CONFIG } from '../data/initialProducts';

export default function HeroSection() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-[#FAF6F0] via-[#FDFBF7] to-[#FBF8F5] border-b border-[#EFE8E1] py-8 sm:py-12">
      {/* Subtle Warm Background Glows */}
      <div className="absolute -top-20 -right-20 w-80 h-80 bg-[#F5EAE6] rounded-full blur-3xl opacity-70 pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-[#EDE4DA] rounded-full blur-3xl opacity-60 pointer-events-none" />

      <div className="container relative z-10">
        <div className="max-w-3xl mx-auto text-center space-y-4">
          


          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#2D2926] tracking-tight leading-tight">
            Göz At, Fiyatını Öğren, <br />
            <span className="bg-gradient-to-r from-[#C05663] via-[#833AB4] to-[#2D2926] bg-clip-text text-transparent">
              DM'den Anında Sipariş Ver
            </span>
          </h2>

          {/* Subtitle */}
          <p className="text-sm sm:text-base text-[#6E6761] leading-relaxed max-w-2xl mx-auto">
            Sayfamızdaki tüm el yapımı ürünlerin güncel fiyat, boyut ve renk detaylarını burada inceleyebilirsiniz. 
            Sorularınız ve doğrudan siparişleriniz için <strong className="text-[#2D2926]">Instagram DM</strong> üzerinden 7/24 bizimle iletişime geçebilirsiniz.
          </p>

          {/* Customer Trust Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 max-w-2xl mx-auto text-left">
            
            <div className="bg-[#FFFFFF] p-3.5 rounded-2xl border border-[#EFE8E1] shadow-xs flex items-center gap-3 hover:border-[#D88E96] transition-colors">
              <div className="p-2.5 rounded-xl bg-[#F5EAE6] text-[#C05663]">
                <HeartHandshake size={20} />
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#2D2926]">%100 El Emeği</h4>
                <p className="text-[11px] text-[#736C65]">Özenli dikiş & antialerjik</p>
              </div>
            </div>

            <div className="bg-[#FFFFFF] p-3.5 rounded-2xl border border-[#EFE8E1] shadow-xs flex items-center gap-3 hover:border-[#D88E96] transition-colors">
              <div className="p-2.5 rounded-xl bg-[#EDE4DA] text-[#4A4540]">
                <ShieldCheck size={20} />
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#2D2926]">Şeffaf Fiyatlar</h4>
                <p className="text-[11px] text-[#736C65]">DM trafiğine takılmadan incele</p>
              </div>
            </div>

            <div className="bg-[#FFFFFF] p-3.5 rounded-2xl border border-[#EFE8E1] shadow-xs flex items-center gap-3 hover:border-[#D88E96] transition-colors">
              <div className="p-2.5 rounded-xl bg-[#EBF5EE] text-[#4A7A56]">
                <MessageCircle size={20} />
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#2D2926]">Hızlı DM İletişimi</h4>
                <p className="text-[11px] text-[#736C65]">7/24 canlı destek ve bilgi</p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
