import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-[#fafafa] dark:bg-[#0a0a0a] border-t border-[#ebebeb] dark:border-[#222222] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          
          <div className="col-span-1 md:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-[#171717] dark:bg-white text-white dark:text-[#171717] rounded-sm flex items-center justify-center font-mono font-bold text-xs">
                C
              </div>
              <span className="text-lg font-bold font-sans tracking-tight text-[#171717] dark:text-white">
                CraveBite
              </span>
            </div>
            <p className="text-[14px] text-[#4d4d4d] dark:text-[#a1a1a1] max-w-sm leading-relaxed">
              Engineered culinary delivery. Connecting local master chefs directly with discerning palates in under 30 minutes.
            </p>
            <div className="pt-2 flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono bg-white dark:bg-[#121212] border border-[#ebebeb] dark:border-[#222222] text-[#4d4d4d] dark:text-[#a1a1a1]">
                <span className="w-2 h-2 rounded-full bg-[#50e3c2] animate-pulse"></span>
                API Operational
              </span>
              <span className="text-[12px] font-mono text-[#8f8f8f]">
                v2.4.0
              </span>
            </div>
          </div>

          <div>
            <span className="mono-eyebrow block mb-4">Platform Nav</span>
            <ul className="space-y-2.5 text-[14px]">
              <li>
                <Link to="/" className="text-[#4d4d4d] dark:text-[#a1a1a1] hover:text-[#171717] dark:hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/menu" className="text-[#4d4d4d] dark:text-[#a1a1a1] hover:text-[#171717] dark:hover:text-white transition-colors">
                  Full Menu
                </Link>
              </li>
              <li>
                <Link to="/offers" className="text-[#4d4d4d] dark:text-[#a1a1a1] hover:text-[#171717] dark:hover:text-white transition-colors">
                  Promotions
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-[#4d4d4d] dark:text-[#a1a1a1] hover:text-[#171717] dark:hover:text-white transition-colors">
                  About Geist Spec
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <span className="mono-eyebrow block mb-4">Support & Contact</span>
            <ul className="space-y-2.5 text-[14px] text-[#4d4d4d] dark:text-[#a1a1a1]">
              <li className="font-mono text-[13px]">Ghaziabad, UP 201002</li>
              <li><a href="mailto:support@cravebite.com" className="hover:text-[#171717] dark:hover:text-white transition-colors">support@cravebite.com</a></li>
              <li className="font-mono text-[13px]">+91 9990285721</li>
            </ul>
          </div>

        </div>

        <div className="border-t border-[#ebebeb] dark:border-[#222222] pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[13px] text-[#8f8f8f]">
          <p>&copy; {new Date().getFullYear()} CraveBite Systems, Inc. All rights reserved.</p>
          <div className="flex gap-6 font-mono text-[12px]">
            <Link to="/contact" className="hover:text-[#171717] dark:hover:text-white">Privacy</Link>
            <Link to="/contact" className="hover:text-[#171717] dark:hover:text-white">Terms</Link>
            <Link to="/contact" className="hover:text-[#171717] dark:hover:text-white">Status</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
