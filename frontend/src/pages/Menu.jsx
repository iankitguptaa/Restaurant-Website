import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { FiSearch, FiChevronRight, FiFilter } from 'react-icons/fi';
import { fetchFoodItems, fetchRestaurants, categories } from '../services/data';
import Card from '../components/Card';
import RestaurantCard from '../components/RestaurantCard';
import Skeleton from '../components/Skeleton';

const Menu = () => {
  const [searchParams] = useSearchParams();
  const initialSearch = searchParams.get('search') || '';
  const initialCategory = searchParams.get('category') || 'All';

  const [items, setItems] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [activeTab, setActiveTab] = useState('dishes'); // 'dishes' | 'restaurants'
  const [sortBy, setSortBy] = useState('popular'); // 'popular' | 'rating' | 'price'

  useEffect(() => {
    let mounted = true;
    const getItems = async () => {
      setLoading(true);
      try {
        const [dData, rData] = await Promise.all([fetchFoodItems(), fetchRestaurants()]);
        if (mounted) {
          setItems(dData);
          setRestaurants(rData);
        }
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

  const filteredItems = items
    .filter(item => {
      const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
      if (sortBy === 'price') return a.price - b.price;
      return (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0); // popular first
    });

  const filteredRestaurants = restaurants.filter(r =>
    r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.cuisine.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const allCategories = [{ id: 0, name: 'All', icon: '🍽️' }, ...categories];

  return (
    <div className="min-h-screen bg-[#F8F3EE]">
      <Helmet>
        <title>Menu — BiteRoute Food Delivery</title>
        <meta name="description" content="Explore BiteRoute's complete menu. Pizza, burgers, sushi, drinks, and more." />
      </Helmet>

      {/* Page Hero Banner */}
      <div className="bg-[#1C1C1C] py-10 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-extrabold text-white mb-2">Explore Our Menu</h1>
          <p className="text-[#9E9E9E] text-sm mb-6">Order from the best restaurants near you</p>

          {/* Search */}
          <div className="max-w-xl relative">
            <FiSearch size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9E9E9E]" />
            <input
              type="text"
              placeholder="Search dishes or restaurants..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#2C2C2C] border border-[#3A3A3A] text-white placeholder-[#6E6E6E] text-sm rounded-2xl pl-12 pr-4 py-3.5 focus:outline-none focus:border-[#E8232A] transition-colors"
            />
          </div>
        </div>
      </div>

      {/* Tabs: Dishes vs Restaurants */}
      <div className="bg-white border-b border-[#E8E0D8] sticky top-16 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-8">
            {[
              { key: 'dishes', label: `Dishes (${items.length})` },
              { key: 'restaurants', label: `Restaurants (${restaurants.length})` },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`py-4 text-sm font-semibold border-b-2 transition-colors ${
                  activeTab === tab.key
                    ? 'border-[#E8232A] text-[#E8232A]'
                    : 'border-transparent text-[#6E6E6E] hover:text-[#1C1C1C]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* DISHES TAB */}
        {activeTab === 'dishes' && (
          <div>
            {/* Category Pills + Sort */}
            <div className="flex items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar pb-1">
                {allCategories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.name)}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all ${
                      activeCategory === cat.name
                        ? 'bg-[#E8232A] text-white shadow-sm'
                        : 'bg-white text-[#4E4E4E] border border-[#E8E0D8] hover:border-[#E8232A] hover:text-[#E8232A]'
                    }`}
                  >
                    <span>{cat.icon}</span>
                    <span>{cat.name}</span>
                  </button>
                ))}
              </div>

              {/* Sort Dropdown */}
              <div className="flex items-center gap-2 shrink-0">
                <FiFilter size={14} className="text-[#6E6E6E]" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="text-sm border border-[#E8E0D8] rounded-xl px-3 py-2 focus:outline-none focus:border-[#E8232A] bg-white text-[#1C1C1C]"
                >
                  <option value="popular">Most Popular</option>
                  <option value="rating">Top Rated</option>
                  <option value="price">Price: Low to High</option>
                </select>
              </div>
            </div>

            {/* Results */}
            <div className="flex items-center justify-between text-xs text-[#9E9E9E] mb-4">
              <span>{filteredItems.length} items found</span>
              <span>Category: <strong className="text-[#1C1C1C]">{activeCategory}</strong></span>
            </div>

            {loading ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
                {Array(10).fill(0).map((_, i) => <Skeleton key={i} />)}
              </div>
            ) : filteredItems.length > 0 ? (
              <motion.div layout className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
                {filteredItems.map((item) => (
                  <Card key={item.id} item={item} />
                ))}
              </motion.div>
            ) : (
              <div className="text-center py-16">
                <div className="text-5xl mb-4">🍽️</div>
                <h3 className="text-lg font-bold text-[#1C1C1C] mb-2">No dishes found</h3>
                <p className="text-sm text-[#6E6E6E] mb-4">No items match "{searchQuery}" in {activeCategory}</p>
                <button
                  onClick={() => { setActiveCategory('All'); setSearchQuery(''); }}
                  className="btn-primary rounded-xl"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        )}

        {/* RESTAURANTS TAB */}
        {activeTab === 'restaurants' && (
          <div>
            <div className="flex items-center justify-between text-xs text-[#9E9E9E] mb-6">
              <span>{filteredRestaurants.length} restaurants found</span>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {Array(8).fill(0).map((_, i) => (
                  <div key={i} className="h-64 bg-[#F0EBE5] rounded-2xl animate-pulse" />
                ))}
              </div>
            ) : filteredRestaurants.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {filteredRestaurants.map((r) => (
                  <RestaurantCard key={r.id} restaurant={r} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="text-5xl mb-4">🏪</div>
                <h3 className="text-lg font-bold text-[#1C1C1C] mb-2">No restaurants found</h3>
                <p className="text-sm text-[#6E6E6E]">Try a different search</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Menu;
