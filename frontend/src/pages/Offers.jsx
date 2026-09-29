import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { FiTag, FiCopy, FiCheck } from 'react-icons/fi';
import { useState } from 'react';
import toast from 'react-hot-toast';

const Offers = () => {
  const [copiedCode, setCopiedCode] = useState(null);

  const offersList = [
    { id: 1, code: 'WELCOME50', discount: '50% OFF DISCOUNT', desc: 'Applies 50% discount up to ₹150 on initial culinary order', valid: 'Eligible for new user registrations' },
    { id: 2, code: 'CRAVE20', discount: '20% OFF DISCOUNT', desc: 'Flat 20% discount on cart value exceeding ₹500', valid: 'Valid across all menu categories' },
    { id: 3, code: 'FREEDEL', discount: 'FREE DELIV DISPATCH', desc: 'Waives ₹50 delivery fee on orders exceeding ₹300', valid: 'Unlimited uses per account' }
  ];

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    toast.success(`Promo code ${code} copied to clipboard!`);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="pt-20 pb-20 min-h-screen bg-[#fafafa] dark:bg-[#0a0a0a]">
      <Helmet><title>Promotional Offers | CraveBite Geist Spec</title></Helmet>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="py-6 border-b border-[#ebebeb] dark:border-[#222222] mb-8 text-center max-w-xl mx-auto">
          <span className="mono-eyebrow">DISCOUNT TELEMETRY // PROMOTIONS</span>
          <h1 className="text-3xl font-bold font-sans text-[#171717] dark:text-white tracking-tight mt-1">
            Active Promo Vouchers
          </h1>
          <p className="text-[14px] text-[#4d4d4d] dark:text-[#a1a1a1] mt-2">
            Copy code vouchers to apply at cart checkout for instant order discounts.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {offersList.map((offer, index) => (
            <motion.div
              key={offer.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
              className="hairline-card p-6 flex flex-col justify-between space-y-6 relative overflow-hidden"
            >
              <div className="space-y-2">
                <span className="mono-eyebrow text-[#0070f3] flex items-center gap-1.5">
                  <FiTag size={12} /> PROMO SPEC 0{offer.id}
                </span>
                <h3 className="text-xl font-bold font-mono text-[#171717] dark:text-white">
                  {offer.discount}
                </h3>
                <p className="text-[13px] text-[#4d4d4d] dark:text-[#a1a1a1] leading-relaxed">
                  {offer.desc}
                </p>
              </div>

              <div className="space-y-2 pt-4 border-t border-[#ebebeb] dark:border-[#222222]">
                <div 
                  onClick={() => handleCopy(offer.code)}
                  className="bg-[#fafafa] dark:bg-[#1a1a1a] border border-dashed border-[#ebebeb] dark:border-[#333333] hover:border-[#171717] dark:hover:border-white rounded-sm p-3 flex justify-between items-center cursor-pointer transition-colors"
                >
                  <span className="font-mono font-bold text-base tracking-wider text-[#171717] dark:text-white">
                    {offer.code}
                  </span>
                  <span className="text-xs font-mono text-[#8f8f8f] flex items-center gap-1">
                    {copiedCode === offer.code ? (
                      <>
                        <FiCheck className="text-[#50e3c2]" size={14} /> COPIED
                      </>
                    ) : (
                      <>
                        <FiCopy size={13} /> COPY
                      </>
                    )}
                  </span>
                </div>
                <span className="text-[11px] font-mono text-[#8f8f8f] block text-center">
                  {offer.valid}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Offers;
