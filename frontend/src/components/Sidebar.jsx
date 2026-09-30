import { Link, useLocation } from 'react-router-dom';
import { 
  FiHome, 
  FiBookOpen, 
  FiGrid, 
  FiPercent, 
  FiCalendar, 
  FiPackage, 
  FiStar, 
  FiHelpCircle,
  FiArrowRight,
  FiX
} from 'react-icons/fi';
import { FaUtensils } from 'react-icons/fa';

const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  const navItems = [
    { name: 'Home', path: '/', icon: FiHome },
    { name: 'Menu', path: '/menu', icon: FiBookOpen },
    { name: 'Categories', path: '/menu', icon: FiGrid },
    { name: 'Offers', path: '/offers', icon: FiPercent },
    { name: 'Reservations', path: '/about', icon: FiCalendar },
    { name: 'Orders', path: '/orders', icon: FiPackage },
    { name: 'Reviews', path: '/about', icon: FiStar },
    { name: 'Support', path: '/contact', icon: FiHelpCircle },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          onClick={onClose}
          className="lg:hidden fixed inset-0 bg-black/40 backdrop-blur-xs z-40 transition-opacity"
        />
      )}

      {/* Sidebar Container */}
      <aside className={`
        fixed top-0 left-0 bottom-0 z-50 w-64 bg-white dark:bg-[#1A1715] border-r border-[#F0E8DF] dark:border-[#2A2520] p-5 flex flex-col justify-between transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div>
          {/* Logo */}
          <div className="flex items-center justify-between mb-8 px-2">
            <Link to="/" onClick={onClose} className="flex items-center gap-3 group">
              <div className="w-10 h-10 bg-[#FF5E1B] text-white rounded-xl flex items-center justify-center shadow-orange-glow transition-transform group-hover:scale-105">
                <FaUtensils size={18} />
              </div>
              <span className="text-xl font-extrabold font-sans tracking-tight text-[#1F1F1F] dark:text-white">
                TasteHouse
              </span>
            </Link>

            {/* Mobile close button */}
            <button 
              onClick={onClose}
              className="lg:hidden p-1.5 text-[#5E5854] dark:text-[#B0A8A0] hover:text-[#FF5E1B]"
            >
              <FiX size={20} />
            </button>
          </div>

          {/* Nav Items List */}
          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);

              return (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={onClose}
                  className={`
                    flex items-center gap-3.5 px-4 py-3 rounded-2xl text-[14px] font-semibold transition-all duration-200
                    ${active 
                      ? 'bg-[#FF5E1B] text-white shadow-orange-glow' 
                      : 'text-[#5E5854] dark:text-[#B0A8A0] hover:text-[#FF5E1B] dark:hover:text-white hover:bg-[#FFF5EB] dark:hover:bg-[#26221F]'
                    }
                  `}
                >
                  <Icon size={18} className={active ? 'text-white' : 'text-[#999088]'} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Sidebar Promo Box */}
        <div className="mt-6 p-4 rounded-2xl bg-gradient-to-br from-[#FFF0E6] to-[#FFE5D4] dark:from-[#2C2119] dark:to-[#38271B] border border-[#FFD8C2] dark:border-[#4A3222] relative overflow-hidden">
          <div className="relative z-10 space-y-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#FF5E1B]">
              Get 20% OFF
            </span>
            <p className="text-[12px] text-[#5E5854] dark:text-[#D4C9BF] leading-snug font-medium">
              on your first order with TasteHouse!
            </p>
            <Link 
              to="/menu" 
              onClick={onClose}
              className="inline-flex items-center gap-1.5 text-[12px] font-bold text-[#FF5E1B] hover:text-[#E04B0E] transition-colors pt-1"
            >
              Order Now <FiArrowRight size={13} />
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
