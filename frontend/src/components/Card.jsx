import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';
import { FiPlus, FiHeart, FiStar, FiClock } from 'react-icons/fi';
import toast from 'react-hot-toast';

const Card = ({ item }) => {
  const { addToCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();

  const isFav = isFavorite(item.id);

  const handleAdd = (e) => {
    e.preventDefault();
    addToCart(item);
    toast.success(`${item.name} added to cart`);
  };

  return (
    <motion.div 
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className="bg-white dark:bg-[#121212] border border-[#ebebeb] dark:border-[#222222] hover:border-[#171717] dark:hover:border-[#555555] rounded-xl shadow-whisper hover:shadow-floating transition-all duration-200 flex flex-col h-full overflow-hidden group"
    >
      <Link to={`/product/${item.id}`} className="block relative h-48 overflow-hidden bg-[#fafafa] dark:bg-[#1a1a1a]">
        <img 
          src={item.image} 
          alt={item.name} 
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {item.isPopular ? (
          <div className="absolute top-3 left-3 bg-[#171717] dark:bg-white text-white dark:text-[#171717] text-[11px] font-mono font-medium uppercase tracking-wider px-2 py-0.5 rounded-sm shadow-sm">
            Featured
          </div>
        ) : null}

        <button 
          onClick={(e) => { 
            e.preventDefault(); 
            e.stopPropagation(); 
            toggleFavorite(item); 
          }}
          aria-label="Toggle favorite"
          className={`absolute top-3 right-3 p-2 rounded-full border transition-all z-10 ${
            isFav 
              ? 'bg-[#ee0000] border-[#ee0000] text-white shadow-sm' 
              : 'bg-white/80 dark:bg-[#121212]/80 backdrop-blur-sm border-[#ebebeb] dark:border-[#333333] text-[#8f8f8f] hover:text-[#ee0000]'
          }`}
        >
          <FiHeart size={14} className={isFav ? 'fill-current' : ''} />
        </button>
      </Link>
      
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex justify-between items-start gap-2 mb-1.5">
          <Link to={`/product/${item.id}`} className="hover:text-[#0070f3] transition-colors">
            <h3 className="text-[16px] font-semibold text-[#171717] dark:text-white line-clamp-1 tracking-tight">
              {item.name}
            </h3>
          </Link>
          <div className="flex items-center gap-1 bg-[#fafafa] dark:bg-[#1a1a1a] border border-[#ebebeb] dark:border-[#222222] px-2 py-0.5 rounded-sm text-[12px] font-mono font-medium text-[#171717] dark:text-[#ededed] shrink-0">
            <FiStar size={11} className="text-[#f5a623] fill-current" />
            {item.rating}
          </div>
        </div>
        
        <p className="text-[13px] text-[#4d4d4d] dark:text-[#a1a1a1] line-clamp-2 mb-4 flex-grow leading-relaxed">
          {item.description}
        </p>

        <div className="flex items-center gap-3 text-[12px] font-mono text-[#8f8f8f] dark:text-[#707070] mb-4">
          <span className="flex items-center gap-1">
            <FiClock size={12} /> {item.prepTime || '15-20 min'}
          </span>
          <span>•</span>
          <span className="capitalize">{item.category}</span>
        </div>
        
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-[#ebebeb] dark:border-[#222222]">
          <div>
            <span className="text-[11px] font-mono text-[#8f8f8f] block uppercase tracking-wider">Price</span>
            <span className="text-[18px] font-bold font-mono text-[#171717] dark:text-white">
              ₹{item.price.toFixed(2)}
            </span>
          </div>
          <button 
            onClick={handleAdd}
            className="btn-primary-sm"
          >
            <FiPlus size={14} /> Add
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default Card;
