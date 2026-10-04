import { Link } from 'react-router-dom';
import { FaUtensils, FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';
import { FiMapPin } from 'react-icons/fi';
import { FaAndroid, FaApple } from 'react-icons/fa';
import { useState } from 'react';
import toast from 'react-hot-toast';

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      toast.success('Subscribed successfully!');
      setEmail('');
    }
  };

  return (
    <footer className="bg-[#1C1C1C] text-white pt-14 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-10 border-b border-[#2C2C2C]">

          {/* Brand column */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 bg-[#E8232A] rounded-full flex items-center justify-center shadow-md">
                <FaUtensils size={14} className="text-white" />
              </div>
              <div>
                <span className="text-white font-extrabold text-lg leading-none">BiteRoute</span>
                <p className="text-[#9E9E9E] text-[10px] leading-none mt-0.5">Good food delivered</p>
              </div>
            </Link>

            <p className="text-[#9E9E9E] text-sm leading-relaxed max-w-xs">
              Delicious meals from your favorite restaurants, delivered hot and fresh.
            </p>

            <div className="flex items-center gap-1 text-[#9E9E9E] text-sm">
              <FiMapPin size={13} className="text-[#E8232A]" />
              <span>New Delhi, India</span>
            </div>

            {/* Social icons */}
            <div className="flex items-center gap-2">
              {[
                { Icon: FaFacebookF, href: '#' },
                { Icon: FaInstagram, href: '#' },
                { Icon: FaTwitter, href: '#' },
                { Icon: FaYoutube, href: '#' },
              ].map(({ Icon, href }) => (
                <a
                  key={href + Icon.name}
                  href={href}
                  className="w-8 h-8 rounded-full bg-[#2C2C2C] text-[#9E9E9E] hover:bg-[#E8232A] hover:text-white flex items-center justify-center transition-all"
                >
                  <Icon size={13} />
                </a>
              ))}
            </div>
          </div>

          {/* Company */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm">Company</h4>
            <ul className="space-y-2 text-[13px] text-[#9E9E9E]">
              <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">Careers</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">Press</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">Blog</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm">Support</h4>
            <ul className="space-y-2 text-[13px] text-[#9E9E9E]">
              <li><Link to="/contact" className="hover:text-white transition-colors">Help Center</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Refund Policy</Link></li>
            </ul>
          </div>

          {/* For Partners + Download App */}
          <div className="space-y-6">
            <div className="space-y-3">
              <h4 className="text-white font-bold text-sm">For Partners</h4>
              <ul className="space-y-2 text-[13px] text-[#9E9E9E]">
                <li><a href="#" className="hover:text-white transition-colors">Partner With Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Restaurant Signup</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Delivery Jobs</a></li>
              </ul>
            </div>

            <div className="space-y-2">
              <h4 className="text-white font-bold text-sm">Download Our App</h4>
              <div className="space-y-2">
                <a href="#" className="flex items-center gap-2 bg-[#2C2C2C] hover:bg-[#3A3A3A] rounded-xl px-3 py-2 transition-colors">
                  <FaApple size={18} className="text-white" />
                  <div>
                    <p className="text-[10px] text-[#9E9E9E] leading-none">Download on the</p>
                    <p className="text-xs font-bold text-white leading-none mt-0.5">App Store</p>
                  </div>
                </a>
                <a href="#" className="flex items-center gap-2 bg-[#2C2C2C] hover:bg-[#3A3A3A] rounded-xl px-3 py-2 transition-colors">
                  <FaAndroid size={18} className="text-[#78C257]" />
                  <div>
                    <p className="text-[10px] text-[#9E9E9E] leading-none">Get it on</p>
                    <p className="text-xs font-bold text-white leading-none mt-0.5">Google Play</p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#6E6E6E]">
          <p>© 2026 BiteRoute. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
