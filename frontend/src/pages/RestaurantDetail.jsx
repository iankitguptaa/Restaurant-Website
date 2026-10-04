import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import {
  FiStar, FiClock, FiMapPin, FiArrowLeft,
  FiShare2, FiHeart, FiChevronDown
} from 'react-icons/fi';
import { fetchRestaurantById, categories } from '../services/data';
import Card from '../components/Card';
import Skeleton from '../components/Skeleton';

const RestaurantDetail = () => {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchDish, setSearchDish] = useState('');

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      setLoading(true);
      try {
        const data = await fetchRestaurantById(id);
        if (mounted) setRestaurant(data);
      } catch (err) {
        console.error(err);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    load();
    return () => { mounted = false; };
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8F3EE]">
        <div className="h-64 bg-[#E8E0D8] animate-pulse" />
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {Array(8).fill(0).map((_, i) => <Skeleton key={i} />)}
          </div>
        </div>
      </div>
    );
  }

  if (!restaurant) {
    return (
      <div className="min-h-screen bg-[#F8F3EE] flex items-center justify-center">
        <div className="text-center">
          <p className="text-5xl mb-4">🏪</p>
          <h2 className="text-xl font-bold text-[#1C1C1C] mb-2">Restaurant not found</h2>
          <Link to="/menu" className="btn-primary rounded-xl">Back to Menu</Link>
        </div>
      </div>
    );
  }

  const dishes = restaurant.dishes || [];
  const dishCategories = ['All', ...new Set(dishes.map(d => d.category).filter(Boolean))];

  const filteredDishes = dishes.filter(d => {
    const matchesCat = activeCategory === 'All' || d.category === activeCategory;
    const matchesSearch = d.name.toLowerCase().includes(searchDish.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#F8F3EE]">
      <Helmet>
        <title>{restaurant.name} — BiteRoute</title>
        <meta name="description" content={`Order from ${restaurant.name}. ${restaurant.cuisine}`} />
      </Helmet>

      {/* Restaurant Banner */}
      <div className="relative h-64 sm:h-80 bg-[#1C1C1C] overflow-hidden">
        <img
          src={restaurant.bannerImage || restaurant.image}
          alt={restaurant.name}
          className="w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1C1C1C] via-[#1C1C1C]/30 to-transparent" />

        {/* Back button */}
        <Link
          to="/menu"
          className="absolute top-4 left-4 flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white rounded-xl px-4 py-2 text-sm font-medium hover:bg-white/20 transition-colors border border-white/20"
        >
          <FiArrowLeft size={16} /> Back
        </Link>

        {/* Share */}
        <button className="absolute top-4 right-4 w-10 h-10 bg-white/10 backdrop-blur-sm text-white rounded-xl flex items-center justify-center hover:bg-white/20 transition-colors border border-white/20">
          <FiShare2 size={16} />
        </button>

        {/* Restaurant Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="max-w-7xl mx-auto flex items-end justify-between gap-4">
            <div>
              {restaurant.isPureVeg && (
                <span className="bg-[#3E9C4A] text-white text-xs font-bold px-2.5 py-0.5 rounded-full mb-2 inline-block">
                  🌿 PURE VEG
                </span>
              )}
              <h1 className="text-3xl font-extrabold text-white">{restaurant.name}</h1>
              <p className="text-[#B0B0B0] text-sm mt-1">{restaurant.cuisine}</p>
              <div className="flex items-center gap-3 text-sm mt-2">
                <div className="flex items-center gap-1 bg-[#3E9C4A] text-white font-bold px-2 py-0.5 rounded-md">
                  <FiStar size={12} className="fill-white" />
                  {restaurant.rating} ({restaurant.reviewsCount?.toLocaleString()} ratings)
                </div>
                <span className="text-[#B0B0B0] flex items-center gap-1">
                  <FiClock size={13} /> {restaurant.prepTime}
                </span>
                <span className="text-[#B0B0B0]">{restaurant.costForTwo}</span>
              </div>
            </div>

            {/* Discount badge */}
            {restaurant.discount && (
              <div className="bg-[#E8232A] text-white rounded-2xl px-4 py-3 text-center shrink-0 hidden sm:block">
                <p className="text-xs font-bold opacity-80">Offer</p>
                <p className="text-sm font-extrabold">{restaurant.discount}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Location strip */}
      <div className="bg-white border-b border-[#E8E0D8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-2 text-sm text-[#6E6E6E]">
          <FiMapPin size={14} className="text-[#E8232A]" />
          <span>{restaurant.location}</span>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Search + Category Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1 max-w-sm">
            <input
              type="text"
              placeholder="Search dishes..."
              value={searchDish}
              onChange={(e) => setSearchDish(e.target.value)}
              className="w-full border border-[#E8E0D8] rounded-2xl pl-4 pr-4 py-2.5 text-sm focus:outline-none focus:border-[#E8232A] bg-white"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar">
            {dishCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all ${
                  activeCategory === cat
                    ? 'bg-[#E8232A] text-white'
                    : 'bg-white text-[#4E4E4E] border border-[#E8E0D8] hover:border-[#E8232A] hover:text-[#E8232A]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Section title */}
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-bold text-[#1C1C1C]">
            Our Menu
            <span className="text-sm font-normal text-[#9E9E9E] ml-2">({filteredDishes.length} items)</span>
          </h2>
        </div>

        {/* Dishes Grid */}
        {filteredDishes.length > 0 ? (
          <motion.div layout className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
            {filteredDishes.map((dish) => (
              <Card key={dish.id || dish.id_string} item={{ ...dish, id: dish.id || dish.id_string }} />
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-16">
            <p className="text-4xl mb-4">🍽️</p>
            <h3 className="text-lg font-bold text-[#1C1C1C] mb-2">No dishes found</h3>
            <p className="text-sm text-[#6E6E6E]">Try a different search or category</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RestaurantDetail;
