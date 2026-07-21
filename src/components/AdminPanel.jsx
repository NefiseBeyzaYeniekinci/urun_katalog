import React, { useState, useMemo } from 'react';
import {
  Plus, Trash2, Tag, Check, Sparkles, Settings, Layers, MapPin,
  Phone, MessageSquare, Clock, ShieldCheck, FolderPlus, Edit3,
  Store, ArrowLeft, Search, PackageCheck, Database, LogOut, ExternalLink, RefreshCw
} from 'lucide-react';
import { isSupabaseConfigured } from '../lib/supabase';

export default function AdminPanel({
  onClose,
  products,
  onAddProduct,
  onDeleteProduct,
  storeConfig,
  onUpdateStoreConfig,
  categories,
  onUpdateCategories,
  onLogoutAdmin
}) {
  const [activeTab, setActiveTab] = useState('list'); // 'list' | 'add' | 'categories' | 'settings'
  const [productSearch, setProductSearch] = useState('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('Tümü');

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
  const [sizesText, setSizesText] = useState('0-6 Ay, 1-2 Yaş');
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

  // Filtered Products for Admin List
  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchesSearch = !productSearch || p.title.toLowerCase().includes(productSearch.toLowerCase());
      const matchesCat = selectedCategoryFilter === 'Tümü' || p.category === selectedCategoryFilter;
      return matchesSearch && matchesCat;
    });
  }, [products, productSearch, selectedCategoryFilter]);

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
    setTimeout(() => setFormSuccess(false), 3000);
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
    setTimeout(() => setConfigSuccess(false), 3000);
  };

  return (
    <div className="min-h-screen bg-[#FAF6F0] flex flex-col text-[#2D2926]">
      
      {/* Admin Top Navigation Header */}
      <header className="bg-[#FFFFFF] border-b border-[#EFE8E1] sticky top-0 z-30 shadow-xs">
        <div className="container py-3 flex items-center justify-between gap-4">
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl overflow-hidden border border-[#F6D6DA] bg-[#FFFFFF] shadow-xs p-0.5">
              <img src="/logo.png" alt="elisi_sevdasi" className="w-full h-full object-cover rounded-[14px]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base font-extrabold text-[#2D2926]">Yönetim Kontrol Paneli</h1>
                <span className="bg-[#2D2926] text-[#FAF6F0] text-[10px] font-bold px-2 py-0.5 rounded-full">
                  Admin
                </span>
              </div>
              <p className="text-[11px] text-[#736C65]">
                Mağaza Kataloğu & Veritabanı Yönetimi
              </p>
            </div>
          </div>

          {/* Top Status & Store Switcher */}
          <div className="flex items-center gap-3">
            {/* Supabase Status Pill */}
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EBF5EE] text-[#4A7A56] text-xs font-bold border border-[#C6E6CF]">
              <Database size={13} />
              <span>{isSupabaseConfigured ? 'Supabase Bağlı' : 'Yerel Depo'}</span>
            </div>

            <button
              onClick={onClose}
              className="btn btn-outline text-xs py-2 px-3.5 bg-[#FFFFFF] border-[#EFE8E1] hover:bg-[#F6F0EA] font-bold flex items-center gap-2"
            >
              <Store size={15} className="text-[#C05663]" />
              <span>Mağazaya Dön</span>
            </button>

            <button
              onClick={() => {
                if (onLogoutAdmin) onLogoutAdmin();
                onClose();
              }}
              className="p-2.5 rounded-2xl bg-[#FDF2F4] text-[#C05663] hover:bg-[#F6D6DA] transition-colors"
              title="Yönetici Çıkışı Yap"
            >
              <LogOut size={16} />
            </button>
          </div>

        </div>
      </header>

      {/* Main Admin Dashboard Container */}
      <div className="container py-6 flex-1 flex flex-col md:flex-row gap-6">
        
        {/* Left Sidebar Navigation */}
        <aside className="w-full md:w-64 shrink-0 space-y-4">
          
          {/* Quick Summary Cards */}
          <div className="bg-[#FFFFFF] p-4 rounded-3xl border border-[#EFE8E1] shadow-xs space-y-3">
            <h3 className="text-xs font-bold text-[#9E938B] uppercase tracking-wider">Özet İstatistikler</h3>
            
            <div className="grid grid-cols-2 gap-2">
              <div className="p-3 bg-[#F9F6F3] rounded-2xl border border-[#EFE8E1]">
                <span className="text-[10px] text-[#736C65] font-bold block">Toplam Ürün</span>
                <span className="text-xl font-extrabold text-[#C05663]">{products.length}</span>
              </div>
              
              <div className="p-3 bg-[#F9F6F3] rounded-2xl border border-[#EFE8E1]">
                <span className="text-[10px] text-[#736C65] font-bold block">Kategoriler</span>
                <span className="text-xl font-extrabold text-[#2D2926]">{categories.length}</span>
              </div>
            </div>
          </div>

          {/* Navigation Menu Links */}
          <nav className="bg-[#FFFFFF] p-2.5 rounded-3xl border border-[#EFE8E1] shadow-xs space-y-1">
            <button
              onClick={() => setActiveTab('list')}
              className={`w-full text-left px-4 py-3 rounded-2xl text-xs font-bold transition-all flex items-center justify-between ${
                activeTab === 'list'
                  ? 'bg-[#2D2926] text-white shadow-md'
                  : 'text-[#5A5450] hover:bg-[#F6F0EA] hover:text-[#2D2926]'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Layers size={16} />
                <span>Ürün Listesi & Stok</span>
              </div>
              <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                activeTab === 'list' ? 'bg-[#FFFFFF]/20 text-white' : 'bg-[#F6F0EA] text-[#736C65]'
              }`}>
                {products.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('add')}
              className={`w-full text-left px-4 py-3 rounded-2xl text-xs font-bold transition-all flex items-center justify-between ${
                activeTab === 'add'
                  ? 'bg-[#C05663] text-white shadow-md'
                  : 'text-[#5A5450] hover:bg-[#F6F0EA] hover:text-[#2D2926]'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Plus size={16} />
                <span>Yeni Ürün Ekle</span>
              </div>
            </button>

            <button
              onClick={() => setActiveTab('categories')}
              className={`w-full text-left px-4 py-3 rounded-2xl text-xs font-bold transition-all flex items-center justify-between ${
                activeTab === 'categories'
                  ? 'bg-[#2D2926] text-white shadow-md'
                  : 'text-[#5A5450] hover:bg-[#F6F0EA] hover:text-[#2D2926]'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <FolderPlus size={16} />
                <span>Kategori Yönetimi</span>
              </div>
              <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                activeTab === 'categories' ? 'bg-[#FFFFFF]/20 text-white' : 'bg-[#F6F0EA] text-[#736C65]'
              }`}>
                {categories.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`w-full text-left px-4 py-3 rounded-2xl text-xs font-bold transition-all flex items-center justify-between ${
                activeTab === 'settings'
                  ? 'bg-[#2D2926] text-white shadow-md'
                  : 'text-[#5A5450] hover:bg-[#F6F0EA] hover:text-[#2D2926]'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Settings size={16} />
                <span>Mağaza Ayarları</span>
              </div>
            </button>
          </nav>

        </aside>

        {/* Right Main Content Area */}
        <main className="flex-1 space-y-6">
          
          {/* TAB 1: PRODUCT LIST VIEW */}
          {activeTab === 'list' && (
            <div className="bg-[#FFFFFF] p-6 rounded-3xl border border-[#EFE8E1] shadow-xs space-y-5">
              
              {/* Header & Filter Controls */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#EFE8E1]">
                <div>
                  <h2 className="text-lg font-bold text-[#2D2926]">Kayıtlı Ürünler</h2>
                  <p className="text-xs text-[#736C65]">Veritabanınızdaki tüm ürünleri görüntüleyin ve yönetin</p>
                </div>

                <button
                  onClick={() => setActiveTab('add')}
                  className="btn btn-primary text-xs py-2.5 px-4 bg-[#C05663] hover:bg-[#a84753] font-bold rounded-2xl shadow-xs self-start sm:self-auto"
                >
                  <Plus size={15} /> + Yeni Ürün Ekle
                </button>
              </div>

              {/* Search & Category Filter Bar */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2 relative">
                  <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9E938B]" />
                  <input
                    type="text"
                    placeholder="Ürün adı ile ara..."
                    value={productSearch}
                    onChange={(e) => setProductSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 text-xs bg-[#F9F6F3] border border-[#EFE8E1] rounded-2xl focus:outline-none focus:border-[#C05663]"
                  />
                </div>

                <div>
                  <select
                    value={selectedCategoryFilter}
                    onChange={(e) => setSelectedCategoryFilter(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs bg-[#F9F6F3] border border-[#EFE8E1] rounded-2xl focus:outline-none focus:border-[#C05663]"
                  >
                    <option value="Tümü">Tüm Kategoriler</option>
                    {categories.filter(c => c !== 'Tümü').map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Products Data Table / Cards */}
              {filteredProducts.length === 0 ? (
                <div className="py-12 text-center space-y-3">
                  <div className="w-14 h-14 bg-[#F6F0EA] text-[#736C65] rounded-full flex items-center justify-center mx-auto">
                    <Layers size={28} />
                  </div>
                  <h4 className="text-sm font-bold text-[#2D2926]">Henüz Ürün Bulunmuyor</h4>
                  <p className="text-xs text-[#736C65] max-w-sm mx-auto">
                    Arama kriterinizle eşleşen ürün yok veya henüz veritabanınıza ürün eklemediniz.
                  </p>
                  <button
                    onClick={() => setActiveTab('add')}
                    className="btn btn-primary text-xs py-2 px-4 bg-[#2D2926]"
                  >
                    + İlk Ürünü Ekle
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredProducts.map((p) => (
                    <div
                      key={p.id}
                      className="p-4 bg-[#FDFBF7] rounded-2xl border border-[#EFE8E1] flex items-center justify-between gap-4 hover:border-[#D9C3B0] transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-xl overflow-hidden bg-[#FFFFFF] border border-[#EFE8E1] shrink-0">
                          <img
                            src={Array.isArray(p.images) ? p.images[0] : p.image}
                            alt=""
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.src = 'https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=800&q=80';
                            }}
                          />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-bold text-[#C05663] bg-[#F5EAE6] px-2 py-0.5 rounded-full">
                              {p.category || 'Örgü'}
                            </span>
                            {p.badgeText && (
                              <span className="text-[10px] font-bold text-[#2D2926] bg-[#EDE4DA] px-2 py-0.5 rounded-full">
                                {p.badgeText}
                              </span>
                            )}
                          </div>
                          <h4 className="text-xs sm:text-sm font-bold text-[#2D2926] mt-1">{p.title}</h4>
                          <p className="text-xs font-extrabold text-[#C05663] mt-0.5">
                            {p.price} ₺ {p.oldPrice && <span className="text-[11px] text-[#9E938B] line-through font-normal ml-1.5">{p.oldPrice} ₺</span>}
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={() => onDeleteProduct(p.id)}
                        className="p-2.5 text-[#C05663] bg-[#FFFFFF] hover:bg-[#FDF2F4] rounded-2xl border border-[#EFE8E1] hover:border-[#F6D6DA] transition-colors flex items-center gap-1 text-xs font-bold shrink-0"
                        title="Ürünü Sil"
                      >
                        <Trash2 size={16} />
                        <span className="hidden sm:inline">Sil</span>
                      </button>
                    </div>
                  ))}
                </div>
              )}

            </div>
          )}

          {/* TAB 2: ADD PRODUCT VIEW */}
          {activeTab === 'add' && (
            <div className="bg-[#FFFFFF] p-6 rounded-3xl border border-[#EFE8E1] shadow-xs space-y-6">
              
              <div className="pb-4 border-b border-[#EFE8E1]">
                <h2 className="text-lg font-bold text-[#2D2926]">Yeni Ürün Ekle</h2>
                <p className="text-xs text-[#736C65]">Vitrininizde ve Supabase veritabanınızda yayınlanacak yeni bir el emeği ürün oluşturun</p>
              </div>

              {formSuccess && (
                <div className="p-4 bg-[#EBF5EE] text-[#4A7A56] rounded-2xl text-xs font-bold flex items-center gap-2 border border-[#C6E6CF] animate-fade-in">
                  <Check size={18} /> Harika! Ürün vitrine ve veritabanına başarıyla eklendi.
                </div>
              )}

              <form onSubmit={handleProductSubmit} className="space-y-6">
                
                {/* 1. Basic Info */}
                <div className="p-4 bg-[#FDFBF7] rounded-2xl border border-[#EFE8E1] space-y-4">
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
                        className="w-full px-3.5 py-2.5 text-xs bg-[#FFFFFF] border border-[#EFE8E1] rounded-2xl focus:outline-none focus:border-[#C05663]"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-[#2D2926] block mb-1">Marka / Etiket</label>
                      <input
                        type="text"
                        placeholder="elisi_sevdasi Kids"
                        value={brand}
                        onChange={(e) => setBrand(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-xs bg-[#FFFFFF] border border-[#EFE8E1] rounded-2xl focus:outline-none focus:border-[#C05663]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-[#2D2926] block mb-1">Kategori Seçin</label>
                      <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-xs bg-[#FFFFFF] border border-[#EFE8E1] rounded-2xl focus:outline-none focus:border-[#C05663]"
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
                        className="w-full px-3.5 py-2.5 text-xs bg-[#FFFFFF] border border-[#EFE8E1] rounded-2xl focus:outline-none focus:border-[#C05663]"
                      >
                        <option value="Unisex">Unisex</option>
                        <option value="Çocuk & Bebek">Çocuk & Bebek</option>
                        <option value="Kadın">Kadın</option>
                        <option value="Erkek">Erkek</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* 2. Price & Image */}
                <div className="p-4 bg-[#FDFBF7] rounded-2xl border border-[#EFE8E1] space-y-4">
                  <h4 className="text-xs font-bold text-[#C05663] uppercase tracking-wider">2. Fiyat & Görsel Bağlantısı</h4>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-[#2D2926] block mb-1">Satış Fiyatı (₺) *</label>
                      <input
                        type="number"
                        required
                        placeholder="480"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-xs bg-[#FFFFFF] border border-[#EFE8E1] rounded-2xl focus:outline-none focus:border-[#C05663]"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-[#2D2926] block mb-1">Eski Fiyat (İndirim Gösterimi)</label>
                      <input
                        type="number"
                        placeholder="590"
                        value={oldPrice}
                        onChange={(e) => setOldPrice(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-xs bg-[#FFFFFF] border border-[#EFE8E1] rounded-2xl focus:outline-none focus:border-[#C05663]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-[#2D2926] block mb-1">Görsel URL Bağlantısı *</label>
                      <input
                        type="url"
                        required
                        placeholder="https://images.unsplash.com/..."
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-xs bg-[#FFFFFF] border border-[#EFE8E1] rounded-2xl focus:outline-none focus:border-[#C05663]"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-[#2D2926] block mb-1">Rozet Etiketi (Örn: Çok Satan)</label>
                      <input
                        type="text"
                        placeholder="El Emeği"
                        value={badgeText}
                        onChange={(e) => setBadgeText(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-xs bg-[#FFFFFF] border border-[#EFE8E1] rounded-2xl focus:outline-none focus:border-[#C05663]"
                      />
                    </div>
                  </div>
                </div>

                {/* 3. Specs & Colors */}
                <div className="p-4 bg-[#FDFBF7] rounded-2xl border border-[#EFE8E1] space-y-4">
                  <h4 className="text-xs font-bold text-[#C05663] uppercase tracking-wider">3. Detaylar, Beden ve Renkler</h4>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-[#2D2926] block mb-1">Bedenler / Yaşlar (Virgülle)</label>
                      <input
                        type="text"
                        placeholder="0-6 Ay, 6-12 Ay, 1-2 Yaş"
                        value={sizesText}
                        onChange={(e) => setSizesText(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-xs bg-[#FFFFFF] border border-[#EFE8E1] rounded-2xl focus:outline-none focus:border-[#C05663]"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-[#2D2926] block mb-1">Ebat / Ölçü Detayı</label>
                      <input
                        type="text"
                        placeholder="Boy: 36 cm | Kol: 28 cm"
                        value={dimensions}
                        onChange={(e) => setDimensions(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-xs bg-[#FFFFFF] border border-[#EFE8E1] rounded-2xl focus:outline-none focus:border-[#C05663]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[#2D2926] block mb-1">Renkler (Virgülle)</label>
                    <input
                      type="text"
                      placeholder="Krem, Toz Pembe, Nane Yeşili"
                      value={colorsText}
                      onChange={(e) => setColorsText(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs bg-[#FFFFFF] border border-[#EFE8E1] rounded-2xl focus:outline-none focus:border-[#C05663]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[#2D2926] block mb-1">Ürün Açıklaması</label>
                    <textarea
                      rows="3"
                      placeholder="%100 antialerjik bebek ipiyle örülmüştür..."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs bg-[#FFFFFF] border border-[#EFE8E1] rounded-2xl focus:outline-none focus:border-[#C05663]"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-full py-4 text-xs font-bold bg-[#C05663] hover:bg-[#a84753] text-white rounded-2xl shadow-md"
                >
                  + Ürünü Yayınla ve Kaydet
                </button>

              </form>

            </div>
          )}

          {/* TAB 3: CATEGORY MANAGEMENT VIEW */}
          {activeTab === 'categories' && (
            <div className="bg-[#FFFFFF] p-6 rounded-3xl border border-[#EFE8E1] shadow-xs space-y-6">
              
              <div className="pb-4 border-b border-[#EFE8E1]">
                <h2 className="text-lg font-bold text-[#2D2926]">Kategori Yönetimi</h2>
                <p className="text-xs text-[#736C65]">Mağazada müşterilerin filtreleme yapabileceği kategorileri ekleyin veya silin</p>
              </div>

              {/* Add Category Form */}
              <form onSubmit={handleAddCategory} className="p-4 bg-[#FDFBF7] rounded-2xl border border-[#EFE8E1] space-y-3">
                <h4 className="text-xs font-bold text-[#C05663] uppercase tracking-wider">Yeni Kategori Ekle</h4>
                <div className="flex gap-2">
                  <input
                    type="text"
                    required
                    placeholder="Örn: Bebek Patikleri & Çorap"
                    value={newCatName}
                    onChange={(e) => setNewCatName(e.target.value)}
                    className="flex-1 px-3.5 py-2.5 text-xs bg-[#FFFFFF] border border-[#EFE8E1] rounded-2xl focus:outline-none focus:border-[#C05663]"
                  />
                  <button
                    type="submit"
                    className="btn btn-primary py-2.5 px-5 text-xs font-bold bg-[#C05663] hover:bg-[#a84753] rounded-2xl"
                  >
                    + Ekle
                  </button>
                </div>
              </form>

              {/* Categories Grid */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-[#2D2926] uppercase tracking-wider">Mevcut Kategoriler ({categories.length})</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {categories.map((cat) => (
                    <div
                      key={cat}
                      className="p-3.5 bg-[#FDFBF7] rounded-2xl border border-[#EFE8E1] flex items-center justify-between gap-2"
                    >
                      <span className="text-xs font-bold text-[#2D2926]">{cat}</span>
                      {cat !== 'Tümü' && cat !== 'İndirimdekiler' && (
                        <button
                          onClick={() => handleDeleteCategory(cat)}
                          className="p-1.5 text-[#C05663] hover:bg-[#FDF2F4] rounded-xl transition-colors"
                          title="Kategoriyi Sil"
                        >
                          <Trash2 size={15} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* TAB 4: STORE SETTINGS VIEW */}
          {activeTab === 'settings' && (
            <div className="bg-[#FFFFFF] p-6 rounded-3xl border border-[#EFE8E1] shadow-xs space-y-6">
              
              <div className="pb-4 border-b border-[#EFE8E1]">
                <h2 className="text-lg font-bold text-[#2D2926]">Mağaza Ayarları</h2>
                <p className="text-xs text-[#736C65]">Mağaza başlığı, Instagram hesabı, konum ve üst duyuru bandı ayarları</p>
              </div>

              {configSuccess && (
                <div className="p-4 bg-[#EBF5EE] text-[#4A7A56] rounded-2xl text-xs font-bold flex items-center gap-2 border border-[#C6E6CF] animate-fade-in">
                  <Check size={18} /> Mağaza bilgileri başarıyla güncellendi!
                </div>
              )}

              <form onSubmit={handleConfigSubmit} className="space-y-6">
                
                <div className="p-4 bg-[#FDFBF7] rounded-2xl border border-[#EFE8E1] space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-[#2D2926] block mb-1">Mağaza Adı</label>
                      <input
                        type="text"
                        required
                        value={configForm.storeName}
                        onChange={(e) => setConfigForm({ ...configForm, storeName: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-xs bg-[#FFFFFF] border border-[#EFE8E1] rounded-2xl focus:outline-none focus:border-[#C05663]"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-[#2D2926] block mb-1">Instagram Kullanıcı Adı</label>
                      <input
                        type="text"
                        required
                        value={configForm.username}
                        onChange={(e) => setConfigForm({ ...configForm, username: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-xs bg-[#FFFFFF] border border-[#EFE8E1] rounded-2xl focus:outline-none focus:border-[#C05663]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-[#2D2926] block mb-1">Şehir / Konum</label>
                      <input
                        type="text"
                        required
                        value={configForm.location}
                        onChange={(e) => setConfigForm({ ...configForm, location: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-xs bg-[#FFFFFF] border border-[#EFE8E1] rounded-2xl focus:outline-none focus:border-[#C05663]"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-[#2D2926] block mb-1">WhatsApp Numarası</label>
                      <input
                        type="text"
                        required
                        value={configForm.whatsappNumber}
                        onChange={(e) => setConfigForm({ ...configForm, whatsappNumber: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-xs bg-[#FFFFFF] border border-[#EFE8E1] rounded-2xl focus:outline-none focus:border-[#C05663]"
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
                      className="w-full px-3.5 py-2.5 text-xs bg-[#FFFFFF] border border-[#EFE8E1] rounded-2xl focus:outline-none focus:border-[#C05663]"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-full py-4 text-xs font-bold bg-[#2D2926] hover:bg-[#4A4540] text-white rounded-2xl shadow-md"
                >
                  Ayarları Kaydet ve Güncelle
                </button>

              </form>

            </div>
          )}

        </main>

      </div>

    </div>
  );
}
