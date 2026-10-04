import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';
import { FiPlus, FiHeart, FiStar, FiClock } from 'react-icons/fi';
import toast from 'react-hot-toast';
import OptimizedImage from './OptimizedImage';

const Card = ({ item }) => {
  const { addToCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();
  const isFav = isFavorite(item.id);

  const handleAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(item);
    toast.success(`${item.name} added to cart!`, {
      style: { borderRadius: '12px', background: '#1C1C1C', color: '#fff' },
    });
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className="bg-white border border-[#EDE8E3] rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full group"
    >
      {/* Image */}
      <Link to={`/product/${item.id}`} className="relative block h-40 overflow-hidden bg-[#F8F3EE]">
        <OptimizedImage
          src={item.image}
          alt={item.name}
          width={400}
          quality={75}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-400"
        />
        {/* Badges overlay */}
        <div className="absolute top-2 left-2 flex gap-1.5">
          {item.isVeg !== false ? (
            <span className="bg-[#E8F5E9] border border-[#3E9C4A] text-[#3E9C4A] text-[9px] font-extrabold px-1.5 py-0.5 rounded flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#3E9C4A] inline-block" /> VEG
            </span>
          ) : (
            <span className="bg-[#FFF0F0] border border-[#E8232A] text-[#E8232A] text-[9px] font-extrabold px-1.5 py-0.5 rounded flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E8232A] inline-block" /> NON-VEG
            </span>
          )}
          {item.isPopular && (
            <span className="bg-[#FFF3E0] text-[#E65100] text-[9px] font-extrabold px-1.5 py-0.5 rounded">
              BESTSELLER
            </span>
          )}
        </div>
        {/* Favorite */}
        <button
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleFavorite(item); }}
          className={`absolute top-2 right-2 w-7 h-7 rounded-full flex items-center justify-center transition-all ${
            isFav ? 'bg-[#E8232A] text-white' : 'bg-white/80 text-[#6E6E6E] hover:text-[#E8232A]'
          }`}
        >
          <FiHeart size={13} className={isFav ? 'fill-current' : ''} />
        </button>
      </Link>

      {/* Details */}
      <div className="p-3.5 flex flex-col flex-grow">
        <Link to={`/product/${item.id}`}>
          <h3 className="font-bold text-sm text-[#1C1C1C] line-clamp-1 hover:text-[#E8232A] transition-colors">
            {item.name}
          </h3>
        </Link>
        {item.restaurantName && (
          <p className="text-[11px] text-[#9E9E9E] mt-0.5 line-clamp-1">{item.restaurantName}</p>
        )}
        <p className="text-[11px] text-[#6E6E6E] line-clamp-1 mt-0.5">{item.description}</p>

        {/* Rating + Time */}
        <div className="flex items-center gap-2 mt-2">
          <span className="badge-green text-[10px] px-1.5 py-0.5">★ {item.rating || 4.5}</span>
          {item.prepTime && (
            <span className="flex items-center gap-0.5 text-[11px] text-[#9E9E9E]">
              <FiClock size={10} /> {item.prepTime}
            </span>
          )}
        </div>

        {/* Price + Add */}
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-[#F0EBE5] mt-3">
          <span className="font-extrabold text-base text-[#1C1C1C]">₹{item.price.toFixed(0)}</span>
          <button
            onClick={handleAdd}
            className="w-8 h-8 bg-white border-2 border-[#E8232A] text-[#E8232A] hover:bg-[#E8232A] hover:text-white rounded-xl flex items-center justify-center transition-all font-bold"
            aria-label="Add to cart"
          >
            <FiPlus size={16} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default Card;
