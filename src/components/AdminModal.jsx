import React, { useState } from 'react';
import { X, Plus, Trash2, Tag, Check, Sparkles, Settings, Layers, MapPin, Phone, MessageSquare, Clock, ShieldCheck, FolderPlus, Edit3 } from 'lucide-react';

export default function AdminModal({
  onClose,
  products,
  onAddProduct,
  onDeleteProduct,
  storeConfig,
  onUpdateStoreConfig,
  categories,
  onUpdateCategories
}) {
  const [activeTab, setActiveTab] = useState('add'); // 'add' | 'list' | 'categories' | 'settings'

  // Product Form State
  const [title, setTitle] = useState('');
  const [brand, setBrand] = useState('elisi_sevdasi');
  const [category, setCategory] = useState(categories[1] || categories[0] || 'Hırka & Ceketler');
  const [gender, setGender] = useState('Unisex');
  const [price, setPrice] = useState('');
  const [oldPrice, setOldPrice] = useState('');
  const [badgeText, setBadgeText] = useState('El Emeği');
  const [imageUrl, setImageUrl] = useState('');
  const [description, setDescription] = useState('');
  const [colorsText, setColorsText] = useState('Krem, Toz Pembe');
  const [sizesText, setSizesText] = useState('0-6 Ay, 1-2 Yaş, S, M');
  const [dimensions, setDimensions] = useState('Boy: 36 cm | Kol: 28 cm');

  const [formSuccess, setFormSuccess] = useState(false);

  // New Category Input State
  const [newCatName, setNewCatName] = useState('');

  // Store Settings Form State
  const [configForm, setConfigForm] = useState(storeConfig || {
    storeName: "elisi_sevdasi Store",
    username: "elisi_sevdasi",
    location: "Gaziantep, Türkiye",
    whatsappNumber: "+905551234567",
    announcement: "🌿 El Emeği Örgü & Amigurumi Koleksiyonları • 📱 Instagram DM Üzerinden Anında İletişim & Şeffaf Fiyat",
    responseTime: "~15 Dk",
    workingHours: "09:00 - 23:00",
    shippingTime: "1-3 İş Günü İçinde Teslimat"
  });

  const [configSuccess, setConfigSuccess] = useState(false);

  // Handle Adding Product
  const handleProductSubmit = (e) => {
    e.preventDefault();
    if (!title || !price || !imageUrl) return;

    const parsedPrice = parseFloat(price);
    const parsedOldPrice = oldPrice ? parseFloat(oldPrice) : null;
    const discount = parsedOldPrice ? Math.round(((parsedOldPrice - parsedPrice) / parsedOldPrice) * 100) : null;

    const newProd = {
      id: `prod-${Date.now()}`,
      title,
      brand: brand || 'elisi_sevdasi',
      category,
      gender,
      price: parsedPrice,
      oldPrice: parsedOldPrice,
      discountPercent: discount,
      rating: 5.0,
      reviewCount: 1,
      isNew: true,
      isBestSeller: false,
      inStock: true,
      badgeText: badgeText || null,
      colors: colorsText.split(',').map(s => s.trim()).filter(Boolean),
      sizes: sizesText.split(',').map(s => s.trim()).filter(Boolean),
      dimensions: dimensions || 'Standart Ölçü',
      description: description || 'Özel el örgüsü üründür. Detaylar için Instagram DM üzerinden iletişime geçebilirsiniz.',
      images: [imageUrl],
      features: ['Özel El Örgüsü', 'Gaziantep Atölye Üretimi', 'DM Sipariş']
    };

    onAddProduct(newProd);

    // Reset Form
    setTitle('');
    setPrice('');
    setOldPrice('');
    setImageUrl('');
    setDescription('');
    setFormSuccess(true);
    setTimeout(() => setFormSuccess(false), 2500);
  };

  // Handle Category Add & Delete
  const handleAddCategory = (e) => {
    e.preventDefault();
    if (!newCatName.trim()) return;
    if (categories.includes(newCatName.trim())) return;

    onUpdateCategories([...categories, newCatName.trim()]);
    setNewCatName('');
  };

  const handleDeleteCategory = (catToDelete) => {
    if (catToDelete === 'Tümü' || catToDelete === 'İndirimdekiler') return;
    onUpdateCategories(categories.filter(c => c !== catToDelete));
  };

  // Handle Config Submit
  const handleConfigSubmit = (e) => {
    e.preventDefault();
    onUpdateStoreConfig(configForm);
    setConfigSuccess(true);
    setTimeout(() => setConfigSuccess(false), 2500);
  };

  return (
    <div className="modal-overlay animate-fade-in" onClick={onClose}>
      <div
        className="bg-[#FFFFFF] w-full max-w-4xl rounded-3xl overflow-hidden shadow-lg border border-[#EFE8E1] max-h-[92vh] flex flex-col relative animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#FAF0EB] p-5 border-b border-[#EFE2D8] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl overflow-hidden border border-[#F6D6DA] bg-[#FFFFFF] shadow-xs p-0.5">
              <img src="/logo.png" alt="elisi_sevdasi" className="w-full h-full object-cover rounded-[14px]" />
            </div>
            <div>
              <h3 className="text-lg font-extrabold text-[#2D2926]">Yönetici Kontrol Paneli</h3>
              <p className="text-xs text-[#736C65]">Ürün yükleme, kategori ve mağaza ayarlarını yönetin</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-[#FFFFFF] border border-[#EFE8E1] text-[#2D2926] flex items-center justify-center hover:bg-[#F6F0EA] transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modern Navigation Tabs */}
        <div className="flex border-b border-[#EFE8E1] bg-[#F6F0EA] overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveTab('add')}
            className={`flex-1 min-w-[130px] py-3 px-4 text-xs font-bold transition-all flex items-center justify-center gap-2 ${
              activeTab === 'add'
                ? 'bg-[#FFFFFF] text-[#C05663] border-t-2 border-[#C05663] shadow-xs'
                : 'text-[#736C65] hover:text-[#2D2926]'
            }`}
          >
            <Plus size={15} /> + Yeni Ürün Ekle
          </button>

          <button
            onClick={() => setActiveTab('list')}
            className={`flex-1 min-w-[130px] py-3 px-4 text-xs font-bold transition-all flex items-center justify-center gap-2 ${
              activeTab === 'list'
                ? 'bg-[#FFFFFF] text-[#C05663] border-t-2 border-[#C05663] shadow-xs'
                : 'text-[#736C65] hover:text-[#2D2926]'
            }`}
          >
            <Layers size={15} /> Ürünler ({products.length})
          </button>

          <button
            onClick={() => setActiveTab('categories')}
            className={`flex-1 min-w-[150px] py-3 px-4 text-xs font-bold transition-all flex items-center justify-center gap-2 ${
              activeTab === 'categories'
                ? 'bg-[#FFFFFF] text-[#C05663] border-t-2 border-[#C05663] shadow-xs'
                : 'text-[#736C65] hover:text-[#2D2926]'
            }`}
          >
            <FolderPlus size={15} /> Kategori Yönetimi
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`flex-1 min-w-[150px] py-3 px-4 text-xs font-bold transition-all flex items-center justify-center gap-2 ${
              activeTab === 'settings'
                ? 'bg-[#FFFFFF] text-[#C05663] border-t-2 border-[#C05663] shadow-xs'
                : 'text-[#736C65] hover:text-[#2D2926]'
            }`}
          >
            <Settings size={15} /> Mağaza Ayarları
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1 bg-[#FDFBF7]">
          
          {/* TAB 1: ADD PRODUCT */}
          {activeTab === 'add' && (
            <form onSubmit={handleProductSubmit} className="space-y-5">
              
              {formSuccess && (
                <div className="p-3.5 bg-[#EBF5EE] text-[#4A7A56] rounded-2xl text-xs font-bold flex items-center gap-2 border border-[#C6E6CF] animate-fade-in">
                  <Check size={16} /> Harika! Ürün vitrine başarıyla eklendi.
                </div>
              )}

              {/* Card 1: Main Product Details */}
              <div className="bg-[#FFFFFF] p-4 rounded-2xl border border-[#EFE8E1] space-y-4">
                <h4 className="text-xs font-bold text-[#C05663] uppercase tracking-wider">1. Temel Ürün Bilgileri</h4>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-[#2D2926] block mb-1">Ürün Başlığı *</label>
                    <input
                      type="text"
                      required
                      placeholder="Örn: El Örgüsü Krem Bebek Hırkası"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs bg-[#F9F6F3] border border-[#EFE8E1] rounded-xl focus:outline-none focus:border-[#C05663] focus:bg-[#FFFFFF]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[#2D2926] block mb-1">Marka / Etiket</label>
                    <input
                      type="text"
                      placeholder="elisi_sevdasi Kids"
                      value={brand}
                      onChange={(e) => setBrand(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs bg-[#F9F6F3] border border-[#EFE8E1] rounded-xl focus:outline-none focus:border-[#C05663] focus:bg-[#FFFFFF]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-[#2D2926] block mb-1">Kategori Seçin</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs bg-[#F9F6F3] border border-[#EFE8E1] rounded-xl focus:outline-none focus:border-[#C05663] focus:bg-[#FFFFFF]"
                    >
                      {categories.filter(c => c !== 'Tümü' && c !== 'İndirimdekiler').map(c => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[#2D2926] block mb-1">Kitle / Cinsiyet</label>
                    <select
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs bg-[#F9F6F3] border border-[#EFE8E1] rounded-xl focus:outline-none focus:border-[#C05663] focus:bg-[#FFFFFF]"
                    >
                      <option value="Unisex">Unisex</option>
                      <option value="Çocuk & Bebek">Çocuk & Bebek</option>
                      <option value="Kadın">Kadın</option>
                      <option value="Erkek">Erkek</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Card 2: Price & Images */}
              <div className="bg-[#FFFFFF] p-4 rounded-2xl border border-[#EFE8E1] space-y-4">
                <h4 className="text-xs font-bold text-[#C05663] uppercase tracking-wider">2. Fiyat & Görsel Bilgisi</h4>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-[#2D2926] block mb-1">Satış Fiyatı (₺) *</label>
                    <input
                      type="number"
                      required
                      placeholder="480"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs bg-[#F9F6F3] border border-[#EFE8E1] rounded-xl focus:outline-none focus:border-[#C05663] focus:bg-[#FFFFFF]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[#2D2926] block mb-1">Eski Fiyat (İndirim Gösterimi)</label>
                    <input
                      type="number"
                      placeholder="590"
                      value={oldPrice}
                      onChange={(e) => setOldPrice(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs bg-[#F9F6F3] border border-[#EFE8E1] rounded-xl focus:outline-none focus:border-[#C05663] focus:bg-[#FFFFFF]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-[#2D2926] block mb-1">Görsel Bağlantısı (URL) *</label>
                    <input
                      type="url"
                      required
                      placeholder="https://images.unsplash.com/..."
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs bg-[#F9F6F3] border border-[#EFE8E1] rounded-xl focus:outline-none focus:border-[#C05663] focus:bg-[#FFFFFF]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[#2D2926] block mb-1">Rozet Etiketi</label>
                    <input
                      type="text"
                      placeholder="Örn: El Emeği, Çok Satan, Yeni"
                      value={badgeText}
                      onChange={(e) => setBadgeText(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs bg-[#F9F6F3] border border-[#EFE8E1] rounded-xl focus:outline-none focus:border-[#C05663] focus:bg-[#FFFFFF]"
                    />
                  </div>
                </div>
              </div>

              {/* Card 3: Specs, Sizes & Colors */}
              <div className="bg-[#FFFFFF] p-4 rounded-2xl border border-[#EFE8E1] space-y-4">
                <h4 className="text-xs font-bold text-[#C05663] uppercase tracking-wider">3. Renk, Beden ve Ölçüler</h4>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-[#2D2926] block mb-1">Bedenler / Yaş Seçenekleri (Virgülle)</label>
                    <input
                      type="text"
                      placeholder="0-6 Ay, 6-12 Ay, 1-2 Yaş veya S, M, L"
                      value={sizesText}
                      onChange={(e) => setSizesText(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs bg-[#F9F6F3] border border-[#EFE8E1] rounded-xl focus:outline-none focus:border-[#C05663] focus:bg-[#FFFFFF]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[#2D2926] block mb-1">Boy / Ebat / Kalıp Detayı</label>
                    <input
                      type="text"
                      placeholder="Boy: 36 cm | Kol: 28 cm | Çap: 14 cm"
                      value={dimensions}
                      onChange={(e) => setDimensions(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs bg-[#F9F6F3] border border-[#EFE8E1] rounded-xl focus:outline-none focus:border-[#C05663] focus:bg-[#FFFFFF]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-[#2D2926] block mb-1">Renk Seçenekleri (Virgülle)</label>
                  <input
                    type="text"
                    placeholder="Krem, Toz Pembe, Nane Yeşili"
                    value={colorsText}
                    onChange={(e) => setColorsText(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs bg-[#F9F6F3] border border-[#EFE8E1] rounded-xl focus:outline-none focus:border-[#C05663] focus:bg-[#FFFFFF]"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-[#2D2926] block mb-1">Ürün Açıklaması</label>
                  <textarea
                    rows="3"
                    placeholder="El yapımı örgü ve malzeme detayları..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs bg-[#F9F6F3] border border-[#EFE8E1] rounded-xl focus:outline-none focus:border-[#C05663] focus:bg-[#FFFFFF]"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-primary w-full py-3.5 text-xs shadow-md font-bold bg-[#C05663] hover:bg-[#a84753]"
              >
                + Ürünü Yayınla
              </button>

            </form>
          )}

          {/* TAB 2: PRODUCT LIST */}
          {activeTab === 'list' && (
            <div className="space-y-3">
              {products.map((p) => (
                <div key={p.id} className="flex items-center justify-between p-3.5 bg-[#FFFFFF] rounded-2xl border border-[#EFE8E1] shadow-xs">
                  <div className="flex items-center gap-3">
                    <img src={p.images[0]} alt="" className="w-12 h-12 rounded-xl object-cover" />
                    <div>
                      <h4 className="text-xs font-bold text-[#2D2926]">{p.title}</h4>
                      <p className="text-[11px] text-[#736C65]">{p.category} • <strong>{p.price} ₺</strong></p>
                    </div>
                  </div>

                  <button
                    onClick={() => onDeleteProduct(p.id)}
                    className="p-2 text-[#C05663] hover:bg-[#FDF2F4] rounded-xl border border-transparent hover:border-[#F6D6DA] transition-colors"
                    title="Ürünü Sil"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* TAB 3: CATEGORY MANAGEMENT */}
          {activeTab === 'categories' && (
            <div className="space-y-5">
              
              {/* Add Category Form */}
              <form onSubmit={handleAddCategory} className="bg-[#FFFFFF] p-4 rounded-2xl border border-[#EFE8E1] space-y-3">
                <h4 className="text-xs font-bold text-[#C05663] uppercase tracking-wider">Yeni Kategori Ekle</h4>
                <div className="flex gap-2">
                  <input
                    type="text"
                    required
                    placeholder="Örn: Bebek Patikleri & Çorap"
                    value={newCatName}
                    onChange={(e) => setNewCatName(e.target.value)}
                    className="flex-1 px-3.5 py-2.5 text-xs bg-[#F9F6F3] border border-[#EFE8E1] rounded-xl focus:outline-none focus:border-[#C05663]"
                  />
                  <button
                    type="submit"
                    className="btn btn-primary py-2.5 px-4 text-xs font-bold bg-[#C05663] hover:bg-[#a84753]"
                  >
                    + Kategori Ekle
                  </button>
                </div>
              </form>

              {/* Current Categories List */}
              <div className="bg-[#FFFFFF] p-4 rounded-2xl border border-[#EFE8E1] space-y-3">
                <h4 className="text-xs font-bold text-[#2D2926] uppercase tracking-wider">Aktif Filtre Kategorileri ({categories.length})</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {categories.map((cat) => (
                    <div key={cat} className="flex items-center justify-between p-2.5 bg-[#F9F6F3] rounded-xl border border-[#EFE8E1]">
                      <span className="text-xs font-bold text-[#2D2926]">{cat}</span>
                      {cat !== 'Tümü' && cat !== 'İndirimdekiler' && (
                        <button
                          onClick={() => handleDeleteCategory(cat)}
                          className="text-[#C05663] hover:bg-[#FDF2F4] p-1 rounded-lg transition-colors"
                          title="Kategoriyi Sil"
                        >
                          <Trash2 size={14} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* TAB 4: STORE SETTINGS */}
          {activeTab === 'settings' && (
            <form onSubmit={handleConfigSubmit} className="space-y-4">
              
              {configSuccess && (
                <div className="p-3.5 bg-[#EBF5EE] text-[#4A7A56] rounded-2xl text-xs font-bold flex items-center gap-2 border border-[#C6E6CF] animate-fade-in">
                  <Check size={16} /> Mağaza bilgileri başarıyla güncellendi!
                </div>
              )}

              <div className="bg-[#FFFFFF] p-4 rounded-2xl border border-[#EFE8E1] space-y-4">
                <h4 className="text-xs font-bold text-[#C05663] uppercase tracking-wider">Mağaza İletişim & Konum Bilgileri</h4>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-[#2D2926] block mb-1">Mağaza Adı</label>
                    <input
                      type="text"
                      required
                      value={configForm.storeName}
                      onChange={(e) => setConfigForm({ ...configForm, storeName: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs bg-[#F9F6F3] border border-[#EFE8E1] rounded-xl focus:outline-none focus:border-[#C05663]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[#2D2926] block mb-1">Instagram Kullanıcı Adı</label>
                    <input
                      type="text"
                      required
                      value={configForm.username}
                      onChange={(e) => setConfigForm({ ...configForm, username: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs bg-[#F9F6F3] border border-[#EFE8E1] rounded-xl focus:outline-none focus:border-[#C05663]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-[#2D2926] block mb-1">Çalışma Yeri / Şehir</label>
                    <input
                      type="text"
                      required
                      value={configForm.location}
                      onChange={(e) => setConfigForm({ ...configForm, location: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs bg-[#F9F6F3] border border-[#EFE8E1] rounded-xl focus:outline-none focus:border-[#C05663]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[#2D2926] block mb-1">WhatsApp Numarası</label>
                    <input
                      type="text"
                      required
                      value={configForm.whatsappNumber}
                      onChange={(e) => setConfigForm({ ...configForm, whatsappNumber: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs bg-[#F9F6F3] border border-[#EFE8E1] rounded-xl focus:outline-none focus:border-[#C05663]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-[#2D2926] block mb-1">Üst Duyuru Metni</label>
                  <input
                    type="text"
                    required
                    value={configForm.announcement}
                    onChange={(e) => setConfigForm({ ...configForm, announcement: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs bg-[#F9F6F3] border border-[#EFE8E1] rounded-xl focus:outline-none focus:border-[#C05663]"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-primary w-full py-3.5 text-xs shadow-md font-bold bg-[#2D2926] hover:bg-[#4A4540]"
              >
                Bilgileri Güncelle
              </button>

            </form>
          )}

        </div>

      </div>
    </div>
  );
}
