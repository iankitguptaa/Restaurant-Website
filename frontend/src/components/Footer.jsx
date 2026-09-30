import { Link } from 'react-router-dom';
import { FaUtensils, FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';
import { useState } from 'react';
import toast from 'react-hot-toast';

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      toast.success('Thank you for subscribing to TasteHouse updates!');
      setEmail('');
    }
  };

  return (
    <footer className="mt-16 border-t border-[#F0E8DF] dark:border-[#2A2520] bg-white dark:bg-[#1A1715] pt-12 pb-6 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Main 4 Column Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Brand Info (2 Columns wide) */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-9 h-9 bg-[#FF5E1B] text-white rounded-xl flex items-center justify-center shadow-orange-glow">
                <FaUtensils size={16} />
              </div>
              <span className="text-xl font-extrabold font-sans tracking-tight text-[#1F1F1F] dark:text-white">
                TasteHouse
              </span>
            </Link>

            <p className="text-[13px] text-[#5E5854] dark:text-[#B0A8A0] max-w-sm leading-relaxed font-medium">
              Your favorite food, delivered fast to your doorstep. Enjoy a seamless gourmet ordering experience with live kitchen dispatch.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-2 pt-1">
              <a href="#" className="w-8 h-8 rounded-full bg-[#FFF5EB] dark:bg-[#26221F] text-[#5E5854] dark:text-[#B0A8A0] hover:text-[#FF5E1B] hover:bg-[#FF5E1B]/10 flex items-center justify-center transition-colors">
                <FaFacebookF size={14} />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-[#FFF5EB] dark:bg-[#26221F] text-[#5E5854] dark:text-[#B0A8A0] hover:text-[#FF5E1B] hover:bg-[#FF5E1B]/10 flex items-center justify-center transition-colors">
                <FaInstagram size={14} />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-[#FFF5EB] dark:bg-[#26221F] text-[#5E5854] dark:text-[#B0A8A0] hover:text-[#FF5E1B] hover:bg-[#FF5E1B]/10 flex items-center justify-center transition-colors">
                <FaTwitter size={14} />
              </a>
            </div>
          </div>

          {/* Company Column */}
          <div className="space-y-3">
            <h4 className="text-[14px] font-bold text-[#1F1F1F] dark:text-white">Company</h4>
            <ul className="space-y-2 text-[13px] text-[#5E5854] dark:text-[#B0A8A0] font-medium">
              <li><Link to="/about" className="hover:text-[#FF5E1B] transition-colors">About Us</Link></li>
              <li><Link to="/about" className="hover:text-[#FF5E1B] transition-colors">Careers</Link></li>
              <li><Link to="/about" className="hover:text-[#FF5E1B] transition-colors">Blog</Link></li>
              <li><Link to="/about" className="hover:text-[#FF5E1B] transition-colors">Press</Link></li>
              <li><Link to="/contact" className="hover:text-[#FF5E1B] transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Support Column */}
          <div className="space-y-3">
            <h4 className="text-[14px] font-bold text-[#1F1F1F] dark:text-white">Support</h4>
            <ul className="space-y-2 text-[13px] text-[#5E5854] dark:text-[#B0A8A0] font-medium">
              <li><Link to="/contact" className="hover:text-[#FF5E1B] transition-colors">Help Center</Link></li>
              <li><Link to="/orders" className="hover:text-[#FF5E1B] transition-colors">Track Order</Link></li>
              <li><Link to="/contact" className="hover:text-[#FF5E1B] transition-colors">Returns</Link></li>
              <li><Link to="/about" className="hover:text-[#FF5E1B] transition-colors">Shipping Info</Link></li>
              <li><Link to="/contact" className="hover:text-[#FF5E1B] transition-colors">FAQs</Link></li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="space-y-3">
            <h4 className="text-[14px] font-bold text-[#1F1F1F] dark:text-white">Newsletter</h4>
            <p className="text-[12px] text-[#5E5854] dark:text-[#B0A8A0] font-medium leading-relaxed">
              Subscribe to get latest updates and exclusive promo codes.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your Email"
                required
                className="w-full bg-[#FFF9F2] dark:bg-[#26221F] border border-[#F0E8DF] dark:border-[#38322C] text-[13px] px-3.5 py-2 rounded-xl focus:outline-none focus:border-[#FF5E1B]"
              />
              <button 
                type="submit" 
                className="w-full btn-orange-pill !py-2 !rounded-xl !text-xs"
              >
                Subscribe
              </button>
            </form>
          </div>

        </div>

        {/* Bottom Copyright Strip */}
        <div className="pt-6 border-t border-[#F0E8DF] dark:border-[#2A2520] flex flex-col sm:flex-row items-center justify-between gap-4 text-[12px] text-[#999088] font-medium">
          <p>© 2026 TasteHouse. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-[#FF5E1B] transition-colors">Privacy</a>
            <a href="#" className="hover:text-[#FF5E1B] transition-colors">Terms</a>
            <a href="#" className="hover:text-[#FF5E1B] transition-colors">Sitemap</a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
