import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { FiSearch, FiSliders } from 'react-icons/fi';
import { fetchFoodItems, categories } from '../services/data';
import Card from '../components/Card';
import Skeleton from '../components/Skeleton';

const Menu = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    let mounted = true;
    const getItems = async () => {
      setLoading(true);
      try {
        const data = await fetchFoodItems();
        if (mounted) setItems(data);
      } catch (error) {
        console.error("Error fetching menu", error);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    getItems();
    return () => { mounted = false; };
  }, []);

  const filteredItems = items.filter(item => {
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="pt-20 pb-20 min-h-screen bg-[#fafafa] dark:bg-[#0a0a0a]">
      <Helmet>
        <title>Menu | CraveBite Geist Spec</title>
        <meta name="description" content="Explore CraveBite's complete culinary menu. Pizza, burgers, drinks, and desserts." />
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="py-8 border-b border-[#ebebeb] dark:border-[#222222] mb-10">
          <span className="mono-eyebrow">CATALOG v2.4</span>
          <h1 className="text-3xl sm:text-4xl font-bold font-sans text-[#171717] dark:text-white tracking-heading-lg mt-1">
            Culinary Menu
          </h1>
          <p className="text-[14px] text-[#4d4d4d] dark:text-[#a1a1a1] mt-2 max-w-xl">
            Explore our curated menu of gourmet options prepared on-demand with fresh organic ingredients.
          </p>
        </div>

        {/* Filters & Search Toolbar */}
        <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4 mb-8">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
            <button
              onClick={() => setActiveCategory('All')}
              className={activeCategory === 'All' ? 'btn-category-pill-active' : 'btn-category-pill'}
            >
              All Items
            </button>
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.name)}
                className={activeCategory === cat.name ? 'btn-category-pill-active' : 'btn-category-pill'}
              >
                <span>{cat.icon}</span>
                <span>{cat.name}</span>
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <FiSearch size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8f8f8f]" />
            <input
              type="text"
              placeholder="Filter by name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="geist-input w-full pl-9 pr-4"
            />
          </div>
        </div>

        {/* Results Counter */}
        <div className="flex justify-between items-center mb-6 text-[12px] font-mono text-[#8f8f8f]">
          <span>SHOWING {filteredItems.length} OF {items.length} ITEMS</span>
          <span>CATEGORY: {activeCategory.toUpperCase()}</span>
        </div>

        {/* Food Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array(8).fill(0).map((_, i) => <Skeleton key={i} />)}
          </div>
        ) : filteredItems.length > 0 ? (
          <motion.div 
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {filteredItems.map((item) => (
              <Card key={item.id} item={item} />
            ))}
          </motion.div>
        ) : (
          <div className="hairline-card p-16 text-center max-w-md mx-auto my-12 space-y-3">
            <div className="w-12 h-12 rounded-full bg-[#f2f2f2] dark:bg-[#1a1a1a] flex items-center justify-center mx-auto text-[#8f8f8f]">
              <FiSliders size={20} />
            </div>
            <h3 className="text-lg font-bold text-[#171717] dark:text-white">No items found</h3>
            <p className="text-[13px] text-[#4d4d4d] dark:text-[#a1a1a1]">
              No menu items match your search query "{searchQuery}". Try selecting a different category.
            </p>
            <button 
              onClick={() => { setActiveCategory('All'); setSearchQuery(''); }}
              className="btn-ghost-sm mt-2"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Menu;
