import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { FiArrowRight, FiZap, FiShield, FiClock, FiCheckCircle, FiStar, FiTruck, FiShoppingBag } from 'react-icons/fi';
import { fetchFoodItems } from '../services/data';
import Card from '../components/Card';
import Skeleton from '../components/Skeleton';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1.0] }
  }
};

const Home = () => {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);

  // Background images for hero rotation
  const heroImages = [
    'https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=90', // Gourmet steak & feast
    'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=90', // Luxury dark dining
    'https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=90'  // Gourmet dish
  ];
  const [heroBgIndex, setHeroBgIndex] = useState(0);

  useEffect(() => {
    let mounted = true;
    const getFeatured = async () => {
      try {
        const data = await fetchFoodItems();
        if (mounted) {
          setFeatured(data.filter(item => item.isPopular).slice(0, 4));
        }
      } catch (error) {
        console.error("Error fetching featured items", error);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    getFeatured();

    // Auto switch hero background gently every 8 seconds
    const timer = setInterval(() => {
      setHeroBgIndex(prev => (prev + 1) % heroImages.length);
    }, 8000);

    return () => { 
      mounted = false; 
      clearInterval(timer);
    };
  }, []);

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>CraveBite — High Speed Gourmet Food Delivery</title>
        <meta name="description" content="Precision-crafted meals delivered with speed. Fast delivery, fresh ingredients, seamless ordering." />
      </Helmet>

      {/* Full Image Hero Section with Cinematic Transition & Mesh Gradient */}
      <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden border-b border-[#ebebeb] dark:border-[#222222]">
        
        {/* Animated Full Hero Background Image Carousel */}
        {heroImages.map((imgUrl, idx) => (
          <motion.div 
            key={imgUrl}
            initial={{ opacity: 0 }}
            animate={{ opacity: idx === heroBgIndex ? 1 : 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0 z-0 pointer-events-none"
          >
            <img 
              src={imgUrl} 
              alt="Luxury Gourmet Dining Feasts" 
              className="w-full h-full object-cover scale-105"
            />
          </motion.div>
        ))}

        {/* Multi-layered Dark Cinematic Mesh Gradient Overlays */}
        <div className="absolute inset-0 z-0 bg-gradient-to-r from-black/95 via-black/80 to-black/65"></div>
        <div className="absolute inset-0 z-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-black/40"></div>
        <div className="absolute inset-0 z-0 hero-mesh-gradient opacity-70 mix-blend-screen"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="lg:col-span-7 space-y-6 text-white"
            >
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-white/20 bg-white/10 backdrop-blur-md text-[12px] font-mono font-medium text-white shadow-whisper"
              >
                <span className="w-2 h-2 rounded-full bg-[#50e3c2] animate-pulse"></span>
                GEIST SPEC V2.0 • HIGH-SPEED CULINARY DISPATCH
              </motion.div>

              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="text-4xl sm:text-6xl lg:text-7xl font-bold font-sans text-white tracking-display-xl leading-[1.05]"
              >
                Precision taste. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00dfd8] via-[#7928ca] to-[#ff0080]">
                  Instant delivery.
                </span>
              </motion.h1>

              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="text-[16px] sm:text-[18px] text-white/85 max-w-xl leading-relaxed font-sans"
              >
                A minimalist food delivery platform crafted for discerning food lovers. Master chefs, farm-fresh organic ingredients, and live telemetry tracking.
              </motion.p>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2"
              >
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Link to="/menu" className="btn-primary-pill justify-center !bg-white !text-[#171717] hover:!bg-[#e1e1e1] !py-3 !px-7 font-bold shadow-lg">
                    Start Order <FiArrowRight size={16} />
                  </Link>
                </motion.div>
                
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Link to="/menu" className="btn-secondary-pill justify-center !bg-white/10 !text-white !border-white/20 hover:!bg-white/20 backdrop-blur-md !py-3 !px-7">
                    View Full Menu
                  </Link>
                </motion.div>
              </motion.div>

              {/* Telemetry Numbers & Carousel Dots */}
              <div className="pt-6 flex items-center justify-between border-t border-white/20 text-white">
                <div className="grid grid-cols-3 gap-6">
                  <div>
                    <span className="mono-eyebrow text-white/70 block">AVG DISPATCH</span>
                    <span className="text-2xl font-bold font-mono text-white">18.4m</span>
                  </div>
                  <div>
                    <span className="mono-eyebrow text-white/70 block">SATISFACTION</span>
                    <span className="text-2xl font-bold font-mono text-white">99.8%</span>
                  </div>
                  <div>
                    <span className="mono-eyebrow text-white/70 block">LIVE KITCHENS</span>
                    <span className="text-2xl font-bold font-mono text-white">42+</span>
                  </div>
                </div>

                {/* Carousel Dots */}
                <div className="hidden sm:flex items-center gap-2 font-mono text-xs">
                  {heroImages.map((_, i) => (
                    <button 
                      key={i}
                      onClick={() => setHeroBgIndex(i)}
                      className={`w-2.5 h-2.5 rounded-full transition-all ${i === heroBgIndex ? 'bg-white scale-125' : 'bg-white/30 hover:bg-white/60'}`}
                      aria-label={`Switch background image ${i+1}`}
                    />
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Right Side Ultra-Clean Integrated Showcase Card */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-5"
            >
              <div className="mx-auto max-w-md">
                
                {/* Sleek Floating Glass Showcase Container */}
                <motion.div 
                  whileHover={{ y: -4 }}
                  className="hairline-card p-4 bg-white/10 dark:bg-black/40 backdrop-blur-2xl shadow-floating rounded-2xl border border-white/20 space-y-3"
                >
                  {/* High Res Dish Image Container */}
                  <div className="relative h-72 rounded-xl overflow-hidden border border-white/20 group">
                    <img 
                      src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                      alt="Artisan Gourmet Pizza" 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent"></div>
                    
                    {/* Top Right Rating Tag */}
                    <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md text-white text-[11px] font-mono px-2.5 py-1 rounded-full border border-white/20 flex items-center gap-1">
                      <FiStar size={12} className="text-[#f5a623] fill-current" /> 4.9 (420 reviews)
                    </div>

                    {/* Top Left Chef Badge */}
                    <div className="absolute top-3 left-3 bg-[#171717]/80 backdrop-blur-md text-white text-[10px] font-mono font-medium uppercase tracking-wider px-2.5 py-1 rounded-full border border-white/20">
                      MASTER CHEF SPECIAL
                    </div>

                    {/* Bottom Image Details */}
                    <div className="absolute bottom-3 left-4 right-4 text-white">
                      <h3 className="text-xl font-bold font-sans tracking-tight">Artisan Truffle Pizza</h3>
                      <p className="text-xs text-white/80 line-clamp-1">Fresh mozzarella, black truffle oil & organic basil</p>
                    </div>
                  </div>

                  {/* Clean Telemetry Badges Strip */}
                  <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                    <div className="p-2.5 rounded-lg bg-white/10 dark:bg-white/5 border border-white/15 flex items-center gap-2 text-white">
                      <span className="w-2 h-2 rounded-full bg-[#50e3c2] animate-pulse"></span>
                      <div>
                        <span className="text-[10px] text-white/60 block">LIVE ROUTING</span>
                        <span className="font-bold text-[11px]">Sub-20 Min Delivery</span>
                      </div>
                    </div>

                    <div className="p-2.5 rounded-lg bg-white/10 dark:bg-white/5 border border-white/15 flex items-center gap-2 text-white">
                      <FiShield size={14} className="text-[#7928ca]" />
                      <div>
                        <span className="text-[10px] text-white/60 block">THERMAL SEALED</span>
                        <span className="font-bold text-[11px]">100% Hot Lock</span>
                      </div>
                    </div>
                  </div>

                  {/* Price & CTA Action Bar */}
                  <div className="p-3 bg-white/10 dark:bg-white/5 rounded-xl border border-white/15 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-mono text-white/60 block">SPECIAL OFFER PRICE</span>
                      <span className="text-xl font-bold font-mono text-white">₹349.00</span>
                    </div>

                    <Link 
                      to="/product/pizza-margherita" 
                      className="btn-primary-pill !bg-white !text-[#171717] hover:!bg-[#e1e1e1] !py-2 !px-4 !text-xs font-bold"
                    >
                      <FiShoppingBag size={13} /> Order Direct
                    </Link>
                  </div>

                </motion.div>

              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Popular Dishes Section with Stagger Animation */}
      <section className="py-20 bg-[#fafafa] dark:bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 pb-4 border-b border-[#ebebeb] dark:border-[#222222]"
          >
            <div>
              <span className="mono-eyebrow">CURATED SELECTION</span>
              <h2 className="text-2xl md:text-3xl font-bold font-sans text-[#171717] dark:text-white tracking-heading-md mt-1">
                Popular Dishes
              </h2>
            </div>
            <Link to="/menu" className="btn-ghost-sm mt-4 md:mt-0">
              View All Items <FiArrowRight size={14} />
            </Link>
          </motion.div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {loading ? (
              Array(4).fill(0).map((_, i) => <Skeleton key={i} />)
            ) : (
              featured.map((item) => (
                <motion.div key={item.id} variants={itemVariants}>
                  <Card item={item} />
                </motion.div>
              ))
            )}
          </motion.div>
        </div>
      </section>

      {/* How It Works Section with Micro Animations */}
      <section className="py-20 bg-white dark:bg-[#121212] border-y border-[#ebebeb] dark:border-[#222222]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-2xl mx-auto mb-16 space-y-2"
          >
            <span className="mono-eyebrow">SYSTEM WORKFLOW</span>
            <h2 className="text-3xl font-bold text-[#171717] dark:text-white tracking-heading-lg">
              Engineered for absolute freshness
            </h2>
            <p className="text-[14px] text-[#4d4d4d] dark:text-[#a1a1a1]">
              Every step optimized from kitchen preparation to insulated hot-bag delivery.
            </p>
          </motion.div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            <motion.div 
              variants={itemVariants} 
              whileHover={{ y: -6 }}
              className="hairline-card p-6 space-y-4 hover:border-[#0070f3]"
            >
              <div className="flex justify-between items-center">
                <span className="font-mono text-xs text-[#8f8f8f] font-bold">01 // DISPATCH</span>
                <div className="p-2 rounded-full bg-[#0070f3]/10 text-[#0070f3]">
                  <FiZap size={20} />
                </div>
              </div>
              <h3 className="text-lg font-bold text-[#171717] dark:text-white">Seamless Order Placement</h3>
              <p className="text-[14px] text-[#4d4d4d] dark:text-[#a1a1a1] leading-relaxed">
                Browse our curated menu, customize your order with one click, and check out securely.
              </p>
            </motion.div>

            <motion.div 
              variants={itemVariants} 
              whileHover={{ y: -6 }}
              className="hairline-card p-6 space-y-4 hover:border-[#7928ca]"
            >
              <div className="flex justify-between items-center">
                <span className="font-mono text-xs text-[#8f8f8f] font-bold">02 // PREPARATION</span>
                <div className="p-2 rounded-full bg-[#7928ca]/10 text-[#7928ca]">
                  <FiClock size={20} />
                </div>
              </div>
              <h3 className="text-lg font-bold text-[#171717] dark:text-[#ffffff]">Master Chef Cooking</h3>
              <p className="text-[14px] text-[#4d4d4d] dark:text-[#a1a1a1] leading-relaxed">
                Meals are cooked fresh to order by certified culinary specialists using top-tier ingredients.
              </p>
            </motion.div>

            <motion.div 
              variants={itemVariants} 
              whileHover={{ y: -6 }}
              className="hairline-card p-6 space-y-4 hover:border-[#50e3c2]"
            >
              <div className="flex justify-between items-center">
                <span className="font-mono text-xs text-[#8f8f8f] font-bold">03 // DELIVERY</span>
                <div className="p-2 rounded-full bg-[#50e3c2]/10 text-[#50e3c2]">
                  <FiShield size={20} />
                </div>
              </div>
              <h3 className="text-lg font-bold text-[#171717] dark:text-white">Thermal Insulated Transit</h3>
              <p className="text-[14px] text-[#4d4d4d] dark:text-[#a1a1a1] leading-relaxed">
                Riders deliver your package in climate-controlled containers straight to your doorstep.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Animated Call To Action Band */}
      <section className="py-20 bg-[#fafafa] dark:bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-[#171717] dark:bg-white text-white dark:text-[#171717] rounded-2xl p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8 shadow-floating relative overflow-hidden"
          >
            <div className="space-y-4 max-w-xl z-10">
              <span className="mono-eyebrow text-white/70 dark:text-[#171717]/70">READY TO ORDER?</span>
              <h2 className="text-3xl md:text-4xl font-bold tracking-heading-lg">
                Experience gourmet dining at home today.
              </h2>
              <p className="text-[15px] opacity-80 leading-relaxed">
                Sign up now to get ₹100 off your initial order. Fast dispatch guaranteed.
              </p>
            </div>
            <div className="shrink-0 flex flex-col sm:flex-row gap-3 z-10">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link to="/menu" className="btn-secondary-pill !bg-white !text-[#171717] dark:!bg-[#171717] dark:!text-white dark:!border-transparent !py-3 !px-8 font-bold">
                  Order Now <FiArrowRight size={16} />
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default Home;
