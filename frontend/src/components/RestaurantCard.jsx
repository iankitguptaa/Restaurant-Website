import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiStar, FiClock, FiMapPin, FiArrowRight } from 'react-icons/fi';
import OptimizedImage from './OptimizedImage';

const RestaurantCard = ({ restaurant }) => {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.2 }}
      className="warm-card group flex flex-col justify-between overflow-hidden h-full rounded-2xl bg-white dark:bg-[#1E1B18] border border-[#F0E8DF] dark:border-[#2A2520] shadow-warm-sm hover:shadow-warm-md"
    >
      <div>
        {/* Restaurant Image Header */}
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-gray-100 dark:bg-gray-800">
          <OptimizedImage
            src={restaurant.image}
            alt={restaurant.name}
            width={600}
            quality={75}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80" />

          {/* Discount Badge */}
          {restaurant.discount && (
            <div className="absolute bottom-3 left-3 bg-gradient-to-r from-[#FF3E6C] to-[#FF5E1B] text-white font-extrabold text-[11px] px-3 py-1 rounded-lg uppercase tracking-wider shadow-md">
              {restaurant.discount}
            </div>
          )}

          {/* Pure Veg Badge */}
          {restaurant.isPureVeg && (
            <div className="absolute top-3 right-3 bg-emerald-600 text-white font-bold text-[10px] px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              PURE VEG
            </div>
          )}
        </div>

        {/* Card Content */}
        <div className="p-4 space-y-3">
          {/* Header Row: Title & Rating */}
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-extrabold text-[16px] text-[#1F1F1F] dark:text-white line-clamp-1 group-hover:text-[#FF5E1B] transition-colors">
              {restaurant.name}
            </h3>
            <div className="flex items-center gap-1 bg-emerald-600 text-white font-extrabold text-[12px] px-2 py-0.5 rounded-md shrink-0">
              <span>{restaurant.rating}</span>
              <FiStar size={11} className="fill-current" />
            </div>
          </div>

          {/* Cuisines */}
          <p className="text-[13px] text-[#5E5854] dark:text-[#B0A8A0] line-clamp-1 font-medium">
            {restaurant.cuisine}
          </p>

          {/* Details Row: Prep Time, Cost, Location */}
          <div className="flex flex-wrap items-center justify-between text-[12px] text-[#857B74] dark:text-[#9E948A] pt-1 border-t border-[#F0E8DF] dark:border-[#2A2520]">
            <div className="flex items-center gap-1 font-semibold">
              <FiClock size={13} className="text-[#FF5E1B]" />
              <span>{restaurant.prepTime}</span>
            </div>
            <div className="font-bold text-[#1F1F1F] dark:text-[#E8E2DA]">
              {restaurant.costForTwo}
            </div>
          </div>

          {/* Location */}
          <div className="flex items-center gap-1 text-[12px] text-[#999088] line-clamp-1">
            <FiMapPin size={12} className="shrink-0 text-[#999088]" />
            <span className="truncate">{restaurant.location}</span>
          </div>
        </div>
      </div>

      {/* Card Action */}
      <div className="p-4 pt-0">
        <Link
          to={`/restaurant/${restaurant.id}`}
          className="w-full btn-orange-pill !py-2.5 !text-[13px] flex items-center justify-center gap-2 group/btn shadow-none hover:shadow-orange-glow"
        >
          <span>View Menu & Dishes</span>
          <FiArrowRight size={14} className="transition-transform group-hover/btn:translate-x-1" />
        </Link>
      </div>
    </motion.div>
  );
};

export default RestaurantCard;
