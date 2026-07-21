import React, { useState, useEffect, useMemo } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import CategoryFilter from './components/CategoryFilter';
import ProductGrid from './components/ProductGrid';
import ProductModal from './components/ProductModal';
import AdminPanel from './components/AdminPanel';
import AdminAuthModal from './components/AdminAuthModal';
import FavoritesModal from './components/FavoritesModal';
import Footer from './components/Footer';
import { INITIAL_PRODUCTS, INITIAL_CONFIG, INITIAL_CATEGORIES } from './data/initialProducts';
import { supabase, isSupabaseConfigured } from './lib/supabase';

export default function App() {
  // Store Config State (Loaded safely from LocalStorage or INITIAL_CONFIG)
  const [storeConfig, setStoreConfig] = useState(() => {
    try {
      const saved = localStorage.getItem('elisi_store_config_v2');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === 'object' && parsed.storeName) {
          return parsed;
        }
      }
    } catch (e) {}
    return INITIAL_CONFIG;
  });

  useEffect(() => {
    try {
      localStorage.setItem('elisi_store_config_v2', JSON.stringify(storeConfig));
    } catch (e) {}
  }, [storeConfig]);

  // Categories State (Admin Editable)
  const [categories, setCategories] = useState(() => {
    try {
      const saved = localStorage.getItem('elisi_categories_v2');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {}
    return INITIAL_CATEGORIES;
  });

  useEffect(() => {
    try {
      localStorage.setItem('elisi_categories_v2', JSON.stringify(categories));
    } catch (e) {}
  }, [categories]);

  // Products State
  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem('elisi_products_v2');
      if (saved) {
        const parsed = JSON.parse(saved);
        // Filter out legacy mock data IDs like prod-1, prod-2 if user wants purely real data
        if (Array.isArray(parsed)) {
          const nonMock = parsed.filter(p => p && p.id && !p.id.startsWith('prod-'));
          return nonMock;
        }
      }
    } catch (e) {}
    return [];
  });

  // Supabase Data Fetching
  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) return;

    async function loadSupabaseData() {
      try {
        const { data: dbProducts, error: prodErr } = await supabase.from('products').select('*');
        if (!prodErr && dbProducts) {
          setProducts(dbProducts);
        }

        const { data: dbCats, error: catErr } = await supabase.from('categories').select('name');
        if (!catErr && dbCats && dbCats.length > 0) {
          const catNames = dbCats.map(c => c.name);
          setCategories(['Tümü', ...catNames.filter(n => n !== 'Tümü')]);
        }
      } catch (e) {
        console.error("Supabase yükleme hatası:", e);
      }
    }

    loadSupabaseData();
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('elisi_products_v2', JSON.stringify(products));
    } catch (e) {}
  }, [products]);


  // Favorites State
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem('elisi_favorites_v2');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {}
    return ['prod-1', 'prod-2', 'prod-4'];
  });

  useEffect(() => {
    try {
      localStorage.setItem('elisi_favorites_v2', JSON.stringify(favorites));
    } catch (e) {}
  }, [favorites]);

  // Admin Session State
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() => {
    try {
      return localStorage.getItem('elisi_admin_session') === 'true';
    } catch (e) {
      return false;
    }
  });

  const [isAdminAuthOpen, setIsAdminAuthOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Filter & Search States
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('Tümü');
  const [selectedGender, setSelectedGender] = useState('Tüm Cinsiyetler');
  const [sortBy, setSortBy] = useState('featured');

  // Product Modal State
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);

  // Admin Trigger
  const handleOpenAdminTrigger = () => {
    if (isAdminLoggedIn) {
      setIsAdminOpen(true);
    } else {
      setIsAdminAuthOpen(true);
    }
  };

  const handleAdminLoginSuccess = () => {
    setIsAdminLoggedIn(true);
    try {
      localStorage.setItem('elisi_admin_session', 'true');
    } catch (e) {}
    setIsAdminAuthOpen(false);
    setIsAdminOpen(true);
  };

  const handleLogoutAdmin = () => {
    setIsAdminLoggedIn(false);
    try {
      localStorage.removeItem('elisi_admin_session');
    } catch (e) {}
    setIsAdminOpen(false);
  };

  // Toggle Favorite
  const handleToggleFavorite = (productId) => {
    setFavorites((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  // Add / Delete Product (Admin)
  const handleAddProduct = async (newProduct) => {
    setProducts((prev) => [newProduct, ...prev]);

    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('products').insert([newProduct]);
      } catch (e) {
        console.error("Supabase ürün ekleme hatası:", e);
      }
    }
  };

  const handleDeleteProduct = async (productId) => {
    setProducts((prev) => prev.filter((p) => p.id !== productId));

    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('products').delete().eq('id', productId);
      } catch (e) {
        console.error("Supabase ürün silme hatası:", e);
      }
    }
  };

  // Reset Filters
  const handleResetFilters = () => {
    setSearchTerm('');
    setActiveCategory('Tümü');
    setSelectedGender('Tüm Cinsiyetler');
    setSortBy('featured');
  };

  // Filtered & Sorted Products
  const filteredProducts = useMemo(() => {
    return (products || []).filter((prod) => {
      if (!prod || !prod.title) return false;

      // Search term
      const matchesSearch =
        !searchTerm ||
        prod.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (prod.description && prod.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (prod.category && prod.category.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (Array.isArray(prod.colors) && prod.colors.some(c => typeof c === 'string' && c.toLowerCase().includes(searchTerm.toLowerCase()))) ||
        (Array.isArray(prod.sizes) && prod.sizes.some(s => typeof s === 'string' && s.toLowerCase().includes(searchTerm.toLowerCase())));

      // Category filter
      const matchesCategory =
        activeCategory === 'Tümü' ||
        (activeCategory === 'İndirimdekiler' ? prod.oldPrice != null || prod.discountPercent != null : prod.category === activeCategory);

      // Gender filter
      const matchesGender =
        selectedGender === 'Tüm Cinsiyetler' ||
        prod.gender === selectedGender ||
        prod.gender === 'Unisex';

      return matchesSearch && matchesCategory && matchesGender;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return (a.price || 0) - (b.price || 0);
      if (sortBy === 'price-high') return (b.price || 0) - (a.price || 0);
      if (sortBy === 'newest') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      return 0;
    });
  }, [products, searchTerm, activeCategory, selectedGender, sortBy]);

  // Favorite Products List
  const favoriteProducts = useMemo(() => {
    return (products || []).filter((p) => p && favorites.includes(p.id));
  }, [products, favorites]);

  // Full Page Admin Dashboard View
  if (isAdminOpen) {
    return (
      <AdminPanel
        onClose={() => setIsAdminOpen(false)}
        products={products}
        onAddProduct={handleAddProduct}
        onDeleteProduct={handleDeleteProduct}
        storeConfig={storeConfig}
        onUpdateStoreConfig={setStoreConfig}
        categories={categories}
        onUpdateCategories={setCategories}
        onLogoutAdmin={handleLogoutAdmin}
      />
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFBF7] text-[#2D2926] selection:bg-[#F5EAE6] selection:text-[#C05663]">
      
      {/* Navigation Bar */}
      <Navbar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        favoritesCount={favorites.length}
        onOpenFavorites={() => setIsFavoritesOpen(true)}
        onOpenAdminAuth={handleOpenAdminTrigger}
        isAdminLoggedIn={isAdminLoggedIn}
        onLogoutAdmin={handleLogoutAdmin}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        storeConfig={storeConfig}
        categories={categories}
      />

      {/* Hero Section */}
      <HeroSection />

      {/* Audience Filter Pills & Sorting */}
      <CategoryFilter
        selectedGender={selectedGender}
        setSelectedGender={setSelectedGender}
        sortBy={sortBy}
        setSortBy={setSortBy}
        filteredCount={filteredProducts.length}
      />

      {/* Main Catalog Grid */}
      <main className="flex-1">
        <ProductGrid
          products={filteredProducts}
          favorites={favorites}
          onToggleFavorite={handleToggleFavorite}
          onSelectProduct={setSelectedProduct}
          onResetFilters={handleResetFilters}
        />
      </main>

      {/* Footer */}
      <Footer storeConfig={storeConfig} />

      {/* Product Detail Modal */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          allProducts={products}
          onClose={() => setSelectedProduct(null)}
          isFavorite={favorites.includes(selectedProduct.id)}
          onToggleFavorite={handleToggleFavorite}
          onSelectProduct={setSelectedProduct}
          storeConfig={storeConfig}
        />
      )}

      {/* Admin Auth Modal (Email & Password Login) */}
      {isAdminAuthOpen && (
        <AdminAuthModal
          onClose={() => setIsAdminAuthOpen(false)}
          onLoginSuccess={handleAdminLoginSuccess}
        />
      )}



      {/* Favorites Wishlist Modal */}
      {isFavoritesOpen && (
        <FavoritesModal
          onClose={() => setIsFavoritesOpen(false)}
          favoriteProducts={favoriteProducts}
          onToggleFavorite={handleToggleFavorite}
          onSelectProduct={setSelectedProduct}
        />
      )}

    </div>
  );
}
