import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { FiSearch, FiSliders } from 'react-icons/fi';
import { fetchFoodItems, categories } from '../services/data';
import Card from '../components/Card';
import Skeleton from '../components/Skeleton';

const Menu = () => {
  const [searchParams] = useSearchParams();
  const initialSearch = searchParams.get('search') || '';
  const initialCategory = searchParams.get('category') || 'All';

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState(initialSearch);

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

  useEffect(() => {
    const s = searchParams.get('search');
    const c = searchParams.get('category');
    if (s !== null) setSearchQuery(s);
    if (c !== null) setActiveCategory(c);
  }, [searchParams]);

  const filteredItems = items.filter(item => {
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-8">
      <Helmet>
        <title>Menu — TasteHouse Gourmet Selection</title>
        <meta name="description" content="Explore TasteHouse's complete gourmet menu. Pizza, burgers, drinks, and desserts." />
      </Helmet>

      {/* Header Banner */}
      <div className="rounded-3xl bg-[#FFF5EB] dark:bg-[#1E1914] p-6 sm:p-8 border border-[#FFD8C2] dark:border-[#382619] flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <span className="text-[12px] font-extrabold uppercase tracking-widest text-[#FF5E1B]">
            TasteHouse Menu
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1F1F1F] dark:text-white mt-1">
            Gourmet Catalog
          </h1>
          <p className="text-[14px] text-[#5E5854] dark:text-[#B0A8A0] mt-1 max-w-xl font-medium">
            Explore our curated menu of master-chef prepared meals delivered straight to your door.
          </p>
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <FiSearch size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#999088]" />
          <input
            type="text"
            placeholder="Search dishes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white dark:bg-[#1E1B18] border border-[#F0E8DF] dark:border-[#2A2520] text-[#1F1F1F] dark:text-white placeholder-[#999088] text-[14px] rounded-full pl-10 pr-4 py-2.5 focus:outline-none focus:border-[#FF5E1B]"
          />
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2.5 overflow-x-auto pb-2 hide-scrollbar">
        <button
          onClick={() => setActiveCategory('All')}
          className={`px-5 py-2 rounded-full text-[14px] font-bold transition-all ${
            activeCategory === 'All'
              ? 'bg-[#FF5E1B] text-white shadow-orange-glow'
              : 'bg-white dark:bg-[#1E1B18] text-[#5E5854] dark:text-[#B0A8A0] hover:text-[#FF5E1B] border border-[#F0E8DF] dark:border-[#2A2520]'
          }`}
        >
          All Dishes
        </button>
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.name)}
            className={`px-5 py-2 rounded-full text-[14px] font-bold transition-all flex items-center gap-2 ${
              activeCategory === cat.name
                ? 'bg-[#FF5E1B] text-white shadow-orange-glow'
                : 'bg-white dark:bg-[#1E1B18] text-[#5E5854] dark:text-[#B0A8A0] hover:text-[#FF5E1B] border border-[#F0E8DF] dark:border-[#2A2520]'
            }`}
          >
            <span>{cat.icon}</span>
            <span>{cat.name}</span>
          </button>
        ))}
      </div>

      {/* Results Count */}
      <div className="flex justify-between items-center text-[12px] font-bold text-[#999088]">
        <span>SHOWING {filteredItems.length} OF {items.length} DISHES</span>
        <span>CATEGORY: {activeCategory.toUpperCase()}</span>
      </div>

      {/* Food Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {Array(10).fill(0).map((_, i) => <Skeleton key={i} />)}
        </div>
      ) : filteredItems.length > 0 ? (
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5"
        >
          {filteredItems.map((item) => (
            <Card key={item.id} item={item} />
          ))}
        </motion.div>
      ) : (
        <div className="warm-card p-12 text-center max-w-md mx-auto my-12 space-y-3">
          <div className="w-12 h-12 rounded-full bg-[#FFF0E6] text-[#FF5E1B] flex items-center justify-center mx-auto">
            <FiSliders size={20} />
          </div>
          <h3 className="text-lg font-bold text-[#1F1F1F] dark:text-white">No dishes found</h3>
          <p className="text-[13px] text-[#5E5854] dark:text-[#B0A8A0]">
            No menu items match your search query "{searchQuery}". Try selecting a different category.
          </p>
          <button 
            onClick={() => { setActiveCategory('All'); setSearchQuery(''); }}
            className="btn-white-pill !py-2 !px-4 !text-xs mt-2"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default Menu;
