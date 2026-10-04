import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import {
  FiSearch, FiArrowRight, FiStar, FiClock,
  FiTruck, FiShield, FiChevronRight, FiMapPin
} from 'react-icons/fi';
import { MdOutlineLocalOffer } from 'react-icons/md';
import { fetchFoodItems, fetchRestaurants } from '../services/data';
import OptimizedImage from '../components/OptimizedImage';
import Card from '../components/Card';
import RestaurantCard from '../components/RestaurantCard';
import Skeleton from '../components/Skeleton';

/* ─────────────────────────────────────────── */
const cuisines = [
  { name: 'Mediterranean', icon: '🥗', color: '#FFF0E0' },
  { name: 'Italian', icon: '🍝', color: '#FFF0F0' },
  { name: 'Asian', icon: '🍜', color: '#F0FFF0' },
  { name: 'American', icon: '🍔', color: '#F0F4FF' },
  { name: 'Mexican', icon: '🌮', color: '#FFF8E0' },
  { name: 'Healthy', icon: '🥦', color: '#E8FFF0' },
  { name: 'Desserts', icon: '🍰', color: '#FFF0F8' },
];

const testimonials = [
  {
    name: 'Sophia M.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80',
    rating: 5,
    text: 'The best Mediterranean platter I\'ve had in a while. Super fresh and delivered on time!'
  },
  {
    name: 'James T.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80',
    rating: 5,
    text: 'Great quality, easy ordering and the food is consistently amazing.'
  },
  {
    name: 'Ava L.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80',
    rating: 5,
    text: 'Love the tracking feature and exclusive offers. Highly recommended!'
  }
];

const orderSteps = [
  { label: 'Order Placed', time: '12:30 PM', icon: '📋' },
  { label: 'Preparing', time: '12:40 PM', icon: '👨‍🍳' },
  { label: 'On The Way', time: '12:55 PM', icon: '🛵' },
  { label: 'Delivered', time: '1:10 PM', icon: '✅' },
];

/* ─────────────────────────────────────────── */
const Home = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [trendingDishes, setTrendingDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeStep] = useState(2); // "On The Way"
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        const [rData, dData] = await Promise.all([fetchRestaurants(), fetchFoodItems()]);
        if (mounted) {
          setRestaurants(rData.slice(0, 4));
          setTrendingDishes(dData.filter(d => d.isPopular).slice(0, 5));
        }
      } catch (err) {
        console.error(err);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    load();
    return () => { mounted = false; };
  }, []);

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>BiteRoute — Good Food, Right When You Want It</title>
        <meta name="description" content="Order from the best restaurants near you. Fast delivery, great food." />
      </Helmet>

      {/* ══════════════════════════════════════
          HERO SECTION - Dark Background
      ══════════════════════════════════════ */}
      <section
        className="relative bg-[#1C1C1C] overflow-hidden"
        style={{ minHeight: '500px' }}
      >
        {/* Background food image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1600&q=80"
            alt="Delicious food"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1C1C1C] via-[#1C1C1C]/80 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.1] mb-6">
                Good Food,<br />
                Right When<br />
                <span className="text-[#E8232A]">You Want It</span>
              </h1>
              <p className="text-[#B0B0B0] text-lg mb-8 leading-relaxed">
                Your favorite meals, delivered hot and fresh to your door.
              </p>

              {/* Hero CTA Buttons */}
              <div className="flex flex-wrap items-center gap-4 mb-10">
                <Link to="/menu" className="btn-primary px-8 py-3 text-base rounded-xl">
                  Order Now <FiArrowRight size={18} />
                </Link>
                <Link to="/menu" className="flex items-center gap-2 text-white border border-white/20 rounded-xl px-6 py-3 text-sm font-medium hover:bg-white/5 transition-colors">
                  ▶ How It Works
                </Link>
              </div>
            </motion.div>

            {/* Stat chips */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-3"
            >
              {[
                { icon: '⭐', val: '4.8+', label: 'Rating' },
                { icon: '🍴', val: '500+', label: 'Restaurants' },
                { icon: '🚀', val: '30 min', label: 'Avg. Delivery' },
                { icon: '👥', val: '50K+', label: 'Customers' },
              ].map((s) => (
                <div key={s.label} className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/10 rounded-xl px-4 py-2">
                  <span className="text-lg">{s.icon}</span>
                  <div>
                    <p className="text-white font-bold text-sm leading-none">{s.val}</p>
                    <p className="text-[#9E9E9E] text-xs leading-none mt-0.5">{s.label}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          FIND RESTAURANTS NEAR YOU
      ══════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="bg-white rounded-3xl shadow-md p-6 sm:p-8 border border-[#EDE8E3]">
          <div className="flex flex-col lg:flex-row gap-6 items-start">
            {/* Left text */}
            <div className="lg:w-64 shrink-0">
              <h2 className="text-xl font-bold text-[#1C1C1C] mb-1">Find Restaurants<br />Near You</h2>
              <p className="text-sm text-[#6E6E6E]">Discover the best local restaurants that deliver to your location.</p>
            </div>

            {/* Search + location bar */}
            <div className="flex-1">
              <form className="flex gap-2 mb-5">
                <div className="flex-1 relative">
                  <FiMapPin size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#E8232A]" />
                  <input
                    type="text"
                    defaultValue="New Delhi, India"
                    className="w-full border border-[#E8E0D8] rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-[#E8232A] bg-[#F8F3EE]"
                  />
                </div>
                <Link to="/menu" className="btn-primary rounded-xl px-6">Search</Link>
                <Link to="/menu" className="text-sm text-[#E8232A] font-semibold flex items-center gap-1 ml-2 whitespace-nowrap">
                  View all <FiChevronRight size={15} />
                </Link>
              </form>

              {/* Restaurant mini cards row */}
              {loading ? (
                <div className="flex gap-4 overflow-x-auto hide-scrollbar">
                  {Array(4).fill(0).map((_, i) => (
                    <div key={i} className="shrink-0 w-36 h-24 bg-[#F0EBE5] rounded-2xl animate-pulse" />
                  ))}
                </div>
              ) : (
                <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-1">
                  {restaurants.map((r) => (
                    <Link
                      key={r.id}
                      to={`/restaurant/${r.id}`}
                      className="shrink-0 w-36 group"
                    >
                      <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-[#F0EBE5] mb-2">
                        <img
                          src={r.image}
                          alt={r.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute bottom-1.5 right-1.5 badge-green">
                          ★ {r.rating}
                        </div>
                      </div>
                      <p className="text-xs font-bold text-[#1C1C1C] line-clamp-1">{r.name}</p>
                      <p className="text-[11px] text-[#6E6E6E] line-clamp-1">{r.cuisine.split(',')[0]}</p>
                      <p className="text-[11px] text-[#6E6E6E]">{r.prepTime} · {r.costForTwo}</p>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          EXPLORE CUISINES
      ══════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="section-title">Explore Cuisines</h2>
          <Link to="/menu" className="text-sm text-[#E8232A] font-semibold flex items-center gap-1 hover:underline">
            View All <FiArrowRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-4 sm:grid-cols-7 gap-3">
          {cuisines.map((c) => (
            <Link
              key={c.name}
              to={`/menu?category=${c.name}`}
              className="flex flex-col items-center gap-2 group"
            >
              <div
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center text-2xl sm:text-3xl transition-transform duration-200 group-hover:scale-110 shadow-sm"
                style={{ backgroundColor: c.color }}
              >
                {c.icon}
              </div>
              <span className="text-xs font-semibold text-[#1C1C1C] text-center leading-tight">{c.name}</span>
            </Link>
          ))}
          <Link to="/menu" className="flex flex-col items-center gap-2 group">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center bg-[#1C1C1C] text-white transition-transform duration-200 group-hover:scale-110 shadow-sm">
              <span className="text-xs font-bold">All</span>
            </div>
            <span className="text-xs font-semibold text-[#1C1C1C] text-center">View All</span>
          </Link>
        </div>
      </section>

      {/* ══════════════════════════════════════
          CHEF'S SPECIALS + MEAL BUNDLES
      ══════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Chef's Specials Card */}
          <div className="bg-white rounded-3xl border border-[#EDE8E3] p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">👨‍🍳</span>
              <h3 className="font-bold text-[#1C1C1C] text-lg">Chef's Specials</h3>
            </div>
            <div className="flex gap-4 items-center">
              <div className="w-28 h-28 rounded-2xl overflow-hidden shrink-0">
                <img
                  src="https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=400&q=80"
                  alt="Chef's Special"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <p className="text-xs text-[#E8232A] font-bold uppercase tracking-wide mb-1">Today's Pick</p>
                <h4 className="font-bold text-[#1C1C1C] text-base mb-1">Lemon Herb Grilled Salmon</h4>
                <p className="text-xs text-[#6E6E6E] mb-3">Fresh, zesty & simply unforgettable.</p>
                <div className="flex items-center gap-3">
                  <span className="font-extrabold text-[#1C1C1C] text-lg">₹599</span>
                  <Link to="/menu?category=Healthy" className="btn-primary px-4 py-2 text-xs rounded-lg">
                    Order Now
                  </Link>
                </div>
              </div>
            </div>
            {/* Rating dots */}
            <div className="flex items-center gap-1 mt-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className={`w-2 h-2 rounded-full ${i === 0 ? 'bg-[#E8232A] w-4' : 'bg-[#E8E0D8]'}`} />
              ))}
            </div>
          </div>

          {/* Meal Bundles */}
          <div className="bg-white rounded-3xl border border-[#EDE8E3] p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🎁</span>
                <h3 className="font-bold text-[#1C1C1C] text-lg">Meal Bundles</h3>
              </div>
              <p className="text-xs text-[#6E6E6E]">Save more with combos.</p>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[
                { name: 'Family Feast', sub: 'Feeds 4 people', price: '₹1,999', img: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=300&q=75' },
                { name: 'Date Night', sub: 'For two', price: '₹899', img: 'https://images.unsplash.com/photo-1555126634-323283e090fa?auto=format&fit=crop&w=300&q=75' },
                { name: 'Solo Comfort', sub: 'Just for you', price: '₹449', img: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=300&q=75' },
              ].map((b) => (
                <Link to="/menu" key={b.name} className="group text-center">
                  <div className="aspect-square rounded-2xl overflow-hidden mb-2 bg-[#F8F3EE]">
                    <img src={b.img} alt={b.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  </div>
                  <p className="text-xs font-bold text-[#1C1C1C]">{b.name}</p>
                  <p className="text-[11px] text-[#6E6E6E]">{b.sub}</p>
                  <p className="text-xs font-extrabold text-[#E8232A] mt-1">{b.price}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          TRENDING DISHES
      ══════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="section-title">Trending Dishes</h2>
          <Link to="/menu" className="text-sm text-[#E8232A] font-semibold flex items-center gap-1 hover:underline">
            View All <FiArrowRight size={14} />
          </Link>
        </div>
        <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-2">
          {loading ? (
            Array(5).fill(0).map((_, i) => (
              <div key={i} className="shrink-0 w-44 h-52 bg-[#F0EBE5] rounded-2xl animate-pulse" />
            ))
          ) : (
            trendingDishes.map((dish) => (
              <Link
                key={dish.id}
                to={`/product/${dish.id}`}
                className="shrink-0 w-44 bg-white rounded-2xl border border-[#EDE8E3] shadow-sm overflow-hidden group hover:shadow-md transition-shadow"
              >
                <div className="relative h-28 overflow-hidden">
                  <img
                    src={dish.image}
                    alt={dish.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-3">
                  <h4 className="text-sm font-bold text-[#1C1C1C] line-clamp-1">{dish.name}</h4>
                  <div className="flex items-center gap-1 mt-1">
                    <span className="badge-green text-[10px] px-1.5 py-0.5">★ {dish.rating || 4.5}</span>
                  </div>
                  <p className="text-sm font-extrabold text-[#1C1C1C] mt-2">₹{dish.price}</p>
                </div>
              </Link>
            ))
          )}

          {/* Explore more card */}
          <Link
            to="/menu"
            className="shrink-0 w-44 bg-[#E8232A] rounded-2xl border border-[#D01E24] shadow-sm overflow-hidden flex flex-col items-center justify-center text-white p-6 gap-3 hover:bg-[#C41E24] transition-colors"
          >
            <span className="text-3xl">🍽️</span>
            <p className="text-sm font-bold text-center">Craving something special?</p>
            <span className="text-xs bg-white/20 rounded-full px-3 py-1 font-semibold">Explore More →</span>
          </Link>
        </div>
      </section>

      {/* ══════════════════════════════════════
          TRACK YOUR ORDER
      ══════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="bg-[#1C1C1C] rounded-3xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            <div className="p-8 lg:p-10">
              <h2 className="text-2xl font-bold text-white mb-1">Track Your Order</h2>
              <p className="text-[#9E9E9E] text-sm mb-8">Real-time updates, right to your door.</p>

              {/* Steps */}
              <div className="relative">
                {/* Progress line */}
                <div className="absolute left-5 top-6 bottom-6 w-0.5 bg-[#3A3A3A]" />
                <div
                  className="absolute left-5 top-6 w-0.5 bg-[#E8232A] transition-all duration-500"
                  style={{ height: `${(activeStep / (orderSteps.length - 1)) * 100}%` }}
                />

                <div className="space-y-6">
                  {orderSteps.map((step, i) => {
                    const done = i <= activeStep;
                    return (
                      <div key={step.label} className="flex items-center gap-4 relative">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg shrink-0 z-10 border-2 transition-all ${
                          done ? 'bg-[#E8232A] border-[#E8232A]' : 'bg-[#2C2C2C] border-[#3A3A3A]'
                        }`}>
                          {step.icon}
                        </div>
                        <div>
                          <p className={`font-semibold text-sm ${done ? 'text-white' : 'text-[#6E6E6E]'}`}>{step.label}</p>
                          <p className="text-xs text-[#6E6E6E]">{step.time}</p>
                        </div>
                        {i === activeStep && (
                          <span className="ml-auto text-xs text-[#E8232A] font-bold animate-pulse">Active</span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right side - delivery illustration */}
            <div className="relative hidden lg:flex items-center justify-center p-8 bg-gradient-to-br from-[#2C2C2C] to-[#1C1C1C]">
              <div className="text-center">
                <div className="text-8xl mb-4">🛵</div>
                <div className="bg-[#E8232A] rounded-2xl px-6 py-3 inline-block">
                  <p className="text-white text-xs font-semibold">Arriving in</p>
                  <p className="text-white font-extrabold text-2xl">15 min</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          WHAT OUR CUSTOMERS SAY
      ══════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <h2 className="section-title mb-6">What Our Customers Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {testimonials.map((t) => (
            <div key={t.name} className="bg-white rounded-2xl border border-[#EDE8E3] p-5 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <p className="font-bold text-sm text-[#1C1C1C]">{t.name}</p>
                  <div className="flex items-center gap-0.5">
                    {[...Array(t.rating)].map((_, i) => (
                      <FiStar key={i} size={12} className="fill-[#FFB800] text-[#FFB800]" />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-sm text-[#4E4E4E] leading-relaxed">"{t.text}"</p>
            </div>
          ))}

          {/* Refer & Earn CTA */}
          <div className="bg-gradient-to-br from-[#E8232A] to-[#FF5C62] rounded-2xl p-5 shadow-sm text-white flex flex-col justify-between">
            <div>
              <p className="text-xl mb-1">🎁</p>
              <h4 className="font-bold text-lg mb-1">Refer & Earn</h4>
              <p className="text-sm text-white/80">Invite friends and earn ₹100 credit!</p>
            </div>
            <button className="mt-4 bg-white text-[#E8232A] font-bold text-sm rounded-xl py-2.5 px-5 hover:bg-white/90 transition-colors">
              Invite Now
            </button>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          PROMOTIONAL OFFER BANNERS
      ══════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {/* Banner 1 */}
          <div className="bg-gradient-to-br from-[#FFF0E0] to-[#FFE0C0] rounded-2xl p-6 border border-[#FFD0A0] relative overflow-hidden">
            <p className="text-xs text-[#E8232A] font-bold uppercase tracking-wider mb-1">First Order</p>
            <h3 className="text-xl font-extrabold text-[#1C1C1C] mb-1">Flat 20% Off</h3>
            <p className="text-sm text-[#4E4E4E] mb-3">Use Code: <strong>WELCOME20</strong></p>
            <div className="w-16 h-16 absolute right-4 bottom-4 opacity-30 text-5xl">🎉</div>
          </div>

          {/* Banner 2 */}
          <div className="bg-gradient-to-br from-[#E8F5E9] to-[#C8E6C9] rounded-2xl p-6 border border-[#A5D6A7] relative overflow-hidden">
            <p className="text-xs text-[#2E7D32] font-bold uppercase tracking-wider mb-1">Always</p>
            <h3 className="text-xl font-extrabold text-[#1C1C1C] mb-1">Free Delivery</h3>
            <p className="text-sm text-[#4E4E4E] mb-3">On orders over <strong>₹299</strong></p>
            <div className="w-16 h-16 absolute right-4 bottom-4 opacity-30 text-5xl">🛵</div>
          </div>

          {/* Banner 3 */}
          <div className="bg-gradient-to-br from-[#EDE0FF] to-[#D4BBFF] rounded-2xl p-6 border border-[#C4A0FF] relative overflow-hidden">
            <p className="text-xs text-[#6A1B9A] font-bold uppercase tracking-wider mb-1">Weekend Special</p>
            <h3 className="text-xl font-extrabold text-[#1C1C1C] mb-1">Up to 30% Off</h3>
            <p className="text-sm text-[#4E4E4E] mb-3">On selected restaurants</p>
            <div className="w-16 h-16 absolute right-4 bottom-4 opacity-30 text-5xl">🍕</div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
