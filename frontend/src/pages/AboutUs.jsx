import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { FiCheckCircle, FiAward, FiShield, FiTrendingUp } from 'react-icons/fi';

const AboutUs = () => {
  return (
    <div className="pt-20 pb-20 min-h-screen bg-[#fafafa] dark:bg-[#0a0a0a]">
      <Helmet><title>About CraveBite | Geist Architecture</title></Helmet>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="py-6 border-b border-[#ebebeb] dark:border-[#222222] mb-8 text-center">
          <span className="mono-eyebrow">COMPANY MANIFEST // SPECIFICATION</span>
          <h1 className="text-3xl sm:text-4xl font-bold font-sans text-[#171717] dark:text-white tracking-tight mt-1">
            Engineered Food Delivery
          </h1>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="hairline-card p-8 md:p-12 space-y-8"
        >
          <div className="space-y-4">
            <span className="mono-eyebrow">OUR MISSION</span>
            <h2 className="text-2xl font-bold text-[#171717] dark:text-white">
              Subtraction of friction between farm, chef, and palate.
            </h2>
            <p className="text-[15px] text-[#4d4d4d] dark:text-[#a1a1a1] leading-relaxed">
              Founded in 2026, CraveBite was built on a simple premise: apply modern developer-grade precision and telemetry to food dispatch. We partner exclusively with top-tier culinary kitchens and maintain strict temperature-controlled transit standards.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-[#ebebeb] dark:border-[#222222]">
            <div className="p-4 rounded-xl bg-[#fafafa] dark:bg-[#1a1a1a] border border-[#ebebeb] dark:border-[#222222] space-y-2">
              <span className="mono-eyebrow text-[#0070f3] flex items-center gap-1.5">
                <FiAward size={14} /> CERTIFIED CHEFS
              </span>
              <h3 className="font-bold text-[#171717] dark:text-white">Master Culinary Partners</h3>
              <p className="text-[13px] text-[#4d4d4d] dark:text-[#a1a1a1]">
                Every item is crafted by verified culinary artists adhering to organic ingredient sourcing.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#fafafa] dark:bg-[#1a1a1a] border border-[#ebebeb] dark:border-[#222222] space-y-2">
              <span className="mono-eyebrow text-[#50e3c2] flex items-center gap-1.5">
                <FiTrendingUp size={14} /> SUB-30 MIN SLA
              </span>
              <h3 className="font-bold text-[#171717] dark:text-white">Predictive Routing</h3>
              <p className="text-[13px] text-[#4d4d4d] dark:text-[#a1a1a1]">
                Real-time dispatch optimization guarantees sub-30 minute average transit times.
              </p>
            </div>
          </div>

          <div className="pt-6 border-t border-[#ebebeb] dark:border-[#222222] space-y-3">
            <span className="mono-eyebrow">QUALITY VERIFICATION SPECS</span>
            <ul className="space-y-2 text-[14px] font-mono text-[#4d4d4d] dark:text-[#a1a1a1]">
              <li className="flex items-center gap-2">
                <FiCheckCircle className="text-[#0070f3]" size={15} /> 100% Sealed Eco-Thermal Packaging
              </li>
              <li className="flex items-center gap-2">
                <FiCheckCircle className="text-[#0070f3]" size={15} /> Zero Artificial Flavor Enhancers
              </li>
              <li className="flex items-center gap-2">
                <FiCheckCircle className="text-[#0070f3]" size={15} /> Continuous Telemetry Temperature Monitoring
              </li>
              <li className="flex items-center gap-2">
                <FiCheckCircle className="text-[#0070f3]" size={15} /> 24/7 Dedicated Support Dispatch
              </li>
            </ul>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutUs;
