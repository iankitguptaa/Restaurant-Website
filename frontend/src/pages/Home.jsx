import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { 
  FiArrowRight, 
  FiTruck, 
  FiRotateCcw, 
  FiShield, 
  FiHeadphones,
  FiPlay,
  FiChevronLeft,
  FiChevronRight
} from 'react-icons/fi';
import { fetchFoodItems } from '../services/data';
import Card from '../components/Card';
import Skeleton from '../components/Skeleton';
import OptimizedImage from '../components/OptimizedImage';

const Home = () => {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);
  const [heroIndex, setHeroIndex] = useState(0);

  const heroSlides = [
    {
      title: "Delicious Food",
      highlight: "Delivered Fast.",
      subtitle: "Discover the best restaurants, cuisines and exclusive offers near you.",
      dishName: "Spicy Zinger Burger",
      dishDesc: "Crispy chicken burger with extra cheese",
      price: "₹199",
      image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=75"
    },
    {
      title: "Artisan Wood-Fired",
      highlight: "Gourmet Pizzas.",
      subtitle: "Freshly baked Italian mozzarella, organic herbs, and hand-tossed dough.",
      dishName: "Margherita Supreme",
      dishDesc: "Fresh basil, plum tomatoes & parmesan",
      price: "₹299",
      image: "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?auto=format&fit=crop&w=800&q=75"
    },
    {
      title: "Authentic Asian",
      highlight: "Sushi & Bowls.",
      subtitle: "Fresh salmon rolls, ramen, and authentic Japanese delicacies.",
      dishName: "Dragon Roll Special",
      dishDesc: "Avocado, eel sauce & toasted sesame",
      price: "₹449",
      image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=800&q=75"
    }
  ];

  const cuisines = [
    { name: 'Italian', count: '120+ Dishes', bg: 'bg-[#E8F5E9] dark:bg-[#1C2C20]', text: 'text-[#2E7D32] dark:text-[#A5D6A7]', image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=400&q=75' },
    { name: 'Chinese', count: '150+ Dishes', bg: 'bg-[#E0F2F1] dark:bg-[#1A2E2C]', text: 'text-[#00695C] dark:text-[#80CBC4]', image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=400&q=75' },
    { name: 'Indian', count: '180+ Dishes', bg: 'bg-[#FFF3E0] dark:bg-[#332517]', text: 'text-[#E65100] dark:text-[#FFB74D]', image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=400&q=75' },
    { name: 'Mexican', count: '90+ Dishes', bg: 'bg-[#FFEBEE] dark:bg-[#361D20]', text: 'text-[#C62828] dark:text-[#EF9A9A]', image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=400&q=75' },
    { name: 'Japanese', count: '110+ Dishes', bg: 'bg-[#F3E5F5] dark:bg-[#2A1D2E]', text: 'text-[#6A1B9A] dark:text-[#CE93D8]', image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=400&q=75' },
  ];

  useEffect(() => {
    let mounted = true;
    const getFeatured = async () => {
      try {
        const data = await fetchFoodItems();
        if (mounted) {
          setFeatured(data.slice(0, 5));
        }
      } catch (error) {
        console.error("Error fetching items", error);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    getFeatured();
    return () => { mounted = false; };
  }, []);

  const currentHero = heroSlides[heroIndex];

  return (
    <div className="space-y-12">
      <Helmet>
        <title>TasteHouse — High Speed Gourmet Food Delivery</title>
      </Helmet>

      {/* Hero Section Banner */}
      <section className="relative rounded-3xl bg-[#FFF5EB] dark:bg-[#1E1914] border border-[#FFD8C2] dark:border-[#382619] p-6 sm:p-12 overflow-hidden shadow-warm-sm">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          
          {/* Left Text */}
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-block">
              <span className="text-[12px] font-extrabold uppercase tracking-widest text-[#FF5E1B] bg-[#FFE0CE] dark:bg-[#3D2517] px-3.5 py-1 rounded-full">
                Good Food, Good Mood
              </span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-extrabold text-[#1F1F1F] dark:text-white leading-[1.1] tracking-tight">
              {currentHero.title} <br />
              <span className="text-[#FF5E1B]">{currentHero.highlight}</span>
            </h1>

            <p className="text-[15px] text-[#5E5854] dark:text-[#B0A8A0] max-w-lg leading-relaxed font-medium">
              {currentHero.subtitle}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link to="/menu" className="btn-orange-pill">
                Order Now <FiArrowRight size={16} />
              </Link>
              <Link to="/menu" className="btn-white-pill">
                Explore Menu <FiPlay size={13} className="fill-current text-[#FF5E1B]" />
              </Link>
            </div>

            {/* Social Proof */}
            <div className="pt-4 flex items-center gap-3">
              <div className="flex -space-x-2 overflow-hidden">
                <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" alt="User" />
                <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80" alt="User" />
                <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80" alt="User" />
              </div>
              <span className="text-[13px] font-bold text-[#1F1F1F] dark:text-white">
                50K+ <span className="font-medium text-[#5E5854] dark:text-[#B0A8A0]">Happy Customers</span>
              </span>
            </div>
          </div>

          {/* Right Hero Image Showcase */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-full max-w-sm">
              <div className="aspect-square rounded-3xl overflow-hidden bg-white dark:bg-[#2A231C] p-3 shadow-warm-md border border-[#F0E8DF] dark:border-[#382D24]">
                <OptimizedImage 
                  src={currentHero.image}
                  alt={currentHero.dishName}
                  width={600}
                  quality={80}
                  loading="eager"
                  className="w-full h-full object-cover rounded-2xl"
                />
              </div>

              {/* Floating Product Spec Card */}
              <div className="absolute -bottom-4 left-4 right-4 bg-white dark:bg-[#1E1B18] p-3.5 rounded-2xl shadow-warm-lg border border-[#F0E8DF] dark:border-[#2A2520] flex items-center justify-between">
                <div>
                  <h4 className="text-[14px] font-bold text-[#1F1F1F] dark:text-white">
                    {currentHero.dishName}
                  </h4>
                  <p className="text-[11px] text-[#5E5854] dark:text-[#B0A8A0]">
                    {currentHero.dishDesc}
                  </p>
                </div>
                <span className="text-[16px] font-extrabold text-[#FF5E1B]">
                  {currentHero.price}
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Hero Carousel Navigation */}
        <div className="absolute bottom-4 right-6 hidden sm:flex items-center gap-2">
          <button 
            onClick={() => setHeroIndex((heroIndex - 1 + heroSlides.length) % heroSlides.length)}
            className="w-8 h-8 rounded-full bg-white dark:bg-[#26221F] text-[#1F1F1F] dark:text-white flex items-center justify-center hover:bg-[#FF5E1B] hover:text-white transition-colors shadow-warm-sm"
          >
            <FiChevronLeft size={16} />
          </button>
          
          <div className="flex gap-1.5 px-2">
            {heroSlides.map((_, i) => (
              <button
                key={i}
                onClick={() => setHeroIndex(i)}
                className={`h-2 rounded-full transition-all ${i === heroIndex ? 'w-6 bg-[#FF5E1B]' : 'w-2 bg-[#D1C7BD]'}`}
              />
            ))}
          </div>

          <button 
            onClick={() => setHeroIndex((heroIndex + 1) % heroSlides.length)}
            className="w-8 h-8 rounded-full bg-white dark:bg-[#26221F] text-[#1F1F1F] dark:text-white flex items-center justify-center hover:bg-[#FF5E1B] hover:text-white transition-colors shadow-warm-sm"
          >
            <FiChevronRight size={16} />
          </button>
        </div>
      </section>

      {/* Value Props Bar */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="warm-card p-4 flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-2xl bg-[#FFF0E6] dark:bg-[#382317] text-[#FF5E1B] flex items-center justify-center shrink-0">
            <FiTruck size={20} />
          </div>
          <div>
            <h4 className="text-[14px] font-bold text-[#1F1F1F] dark:text-white">Free Delivery</h4>
            <p className="text-[12px] text-[#5E5854] dark:text-[#B0A8A0]">On orders over ₹299</p>
          </div>
        </div>

        <div className="warm-card p-4 flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-2xl bg-[#FFF0E6] dark:bg-[#382317] text-[#FF5E1B] flex items-center justify-center shrink-0">
            <FiRotateCcw size={20} />
          </div>
          <div>
            <h4 className="text-[14px] font-bold text-[#1F1F1F] dark:text-white">Easy Returns</h4>
            <p className="text-[12px] text-[#5E5854] dark:text-[#B0A8A0]">100% money back policy</p>
          </div>
        </div>

        <div className="warm-card p-4 flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-2xl bg-[#FFF0E6] dark:bg-[#382317] text-[#FF5E1B] flex items-center justify-center shrink-0">
            <FiShield size={20} />
          </div>
          <div>
            <h4 className="text-[14px] font-bold text-[#1F1F1F] dark:text-white">Secure Payment</h4>
            <p className="text-[12px] text-[#5E5854] dark:text-[#B0A8A0]">100% encrypted checkout</p>
          </div>
        </div>

        <div className="warm-card p-4 flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-2xl bg-[#FFF0E6] dark:bg-[#382317] text-[#FF5E1B] flex items-center justify-center shrink-0">
            <FiHeadphones size={20} />
          </div>
          <div>
            <h4 className="text-[14px] font-bold text-[#1F1F1F] dark:text-white">24/7 Support</h4>
            <p className="text-[12px] text-[#5E5854] dark:text-[#B0A8A0]">We're here to help anytime</p>
          </div>
        </div>
      </section>

      {/* Explore by Cuisine Section */}
      <section className="space-y-4">
        <div className="flex justify-between items-end">
          <div>
            <h2 className="text-2xl font-extrabold text-[#1F1F1F] dark:text-white">Explore by Cuisine</h2>
          </div>
          <Link to="/menu" className="text-[13px] font-bold text-[#FF5E1B] hover:underline flex items-center gap-1">
            View All <FiArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {cuisines.map((c) => (
            <Link 
              key={c.name} 
              to={`/menu?category=${c.name}`}
              className={`${c.bg} rounded-3xl p-4 text-center hover:scale-105 transition-transform duration-300 block shadow-warm-sm border border-black/5 dark:border-white/5`}
            >
              <div className="w-20 h-20 mx-auto mb-3 rounded-full overflow-hidden shadow-warm-sm bg-white p-1">
                <OptimizedImage 
                  src={c.image} 
                  alt={c.name} 
                  width={200}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <h3 className={`text-[15px] font-extrabold ${c.text}`}>{c.name}</h3>
              <p className="text-[11px] font-medium text-[#5E5854] dark:text-[#B0A8A0] mt-0.5">{c.count}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Popular Dishes Section */}
      <section className="space-y-4">
        <div className="flex justify-between items-end">
          <div>
            <h2 className="text-2xl font-extrabold text-[#1F1F1F] dark:text-white">Popular Dishes</h2>
          </div>
          <Link to="/menu" className="text-[13px] font-bold text-[#FF5E1B] hover:underline flex items-center gap-1">
            View All <FiArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {loading ? (
            Array(5).fill(0).map((_, i) => <Skeleton key={i} />)
          ) : (
            featured.map((item) => (
              <Card key={item.id} item={item} />
            ))
          )}
        </div>
      </section>

      {/* Promotional Banners Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Banner 1: Limited Time Offer */}
        <div className="rounded-3xl bg-[#E8F5E9] dark:bg-[#1B2F21] p-6 sm:p-8 flex items-center justify-between gap-4 border border-[#C8E6C9] dark:border-[#2C4833] relative overflow-hidden shadow-warm-sm">
          <div className="space-y-3 z-10 max-w-xs">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#2E7D32] dark:text-[#81C784]">
              Limited Time Offer
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#1B5E20] dark:text-white leading-tight">
              Flat 30% OFF On Your First Order!
            </h3>
            <p className="text-[12px] text-[#388E3C] dark:text-[#A5D6A7] font-medium">
              Use code <strong className="font-extrabold">TASTY30</strong> at checkout and enjoy delicious rewards.
            </p>
            <Link to="/menu" className="btn-orange-pill !bg-[#2E7D32] hover:!bg-[#1B5E20] inline-flex">
              Order Now <FiArrowRight size={14} />
            </Link>
          </div>
          <div className="w-32 sm:w-40 shrink-0">
            <img 
              src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=400&q=75" 
              alt="Salad Bowl"
              className="w-full h-32 sm:h-40 object-cover rounded-full shadow-warm-md" 
            />
          </div>
        </div>

        {/* Banner 2: Weekend Special */}
        <div className="rounded-3xl bg-[#FFF0E6] dark:bg-[#382317] p-6 sm:p-8 flex items-center justify-between gap-4 border border-[#FFD8C2] dark:border-[#4D3222] relative overflow-hidden shadow-warm-sm">
          <div className="space-y-3 z-10 max-w-xs">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#FF5E1B]">
              Weekend Special
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#1F1F1F] dark:text-white leading-tight">
              Family Combo Meals
            </h3>
            <p className="text-[12px] text-[#5E5854] dark:text-[#B0A8A0] font-medium">
              Feed your family with our special combo deals.
            </p>
            <Link to="/menu" className="btn-orange-pill inline-flex">
              Order Now <FiArrowRight size={14} />
            </Link>
          </div>
          <div className="w-32 sm:w-40 shrink-0">
            <img 
              src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=400&q=75" 
              alt="Burger Meal Combo"
              className="w-full h-32 sm:h-40 object-cover rounded-full shadow-warm-md" 
            />
          </div>
        </div>

      </section>

      {/* Trusted by Thousands Logos */}
      <section className="warm-card p-6 text-center space-y-4">
        <span className="text-[12px] font-extrabold uppercase tracking-widest text-[#999088]">
          Trusted by Thousands
        </span>
        <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 opacity-70 grayscale hover:grayscale-0 transition-all font-extrabold text-xl tracking-wider text-[#5E5854] dark:text-[#B0A8A0]">
          <span>zomato</span>
          <span>SWIGGY</span>
          <span>UberEats</span>
          <span>DOORDASH</span>
          <span>Google</span>
        </div>
      </section>

    </div>
  );
};

export default Home;
