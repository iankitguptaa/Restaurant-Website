import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { FiMapPin, FiPhone, FiMail, FiSend } from 'react-icons/fi';
import toast from 'react-hot-toast';

const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success('Support message transmitted successfully!');
    e.target.reset();
  };

  return (
    <div className="pt-20 pb-20 min-h-screen bg-[#fafafa] dark:bg-[#0a0a0a]">
      <Helmet><title>Contact Support | CraveBite Geist Spec</title></Helmet>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="py-6 border-b border-[#ebebeb] dark:border-[#222222] mb-8 text-center max-w-xl mx-auto">
          <span className="mono-eyebrow">COMMUNICATION // SUPPORT CHANNEL</span>
          <h1 className="text-3xl font-bold font-sans text-[#171717] dark:text-white tracking-tight mt-1">
            Contact Engineering Support
          </h1>
          <p className="text-[14px] text-[#4d4d4d] dark:text-[#a1a1a1] mt-2">
            Reach out to our customer telemetry team for inquiry response within 1 hour.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Contact Details & Map */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-5 space-y-6"
          >
            <div className="hairline-card p-6 space-y-6">
              <span className="mono-eyebrow block pb-2 border-b border-[#ebebeb] dark:border-[#222222]">
                HEADQUARTERS SPECS
              </span>

              <div className="space-y-5 text-[14px]">
                <div className="flex items-start gap-3">
                  <FiMapPin className="text-[#0070f3] shrink-0 mt-1" size={18} />
                  <div>
                    <span className="font-semibold block text-[#171717] dark:text-white">Physical Location</span>
                    <p className="text-[#4d4d4d] dark:text-[#a1a1a1] text-xs font-mono mt-0.5">
                      Ghaziabad, Uttar Pradesh, 201002
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <FiPhone className="text-[#7928ca] shrink-0 mt-1" size={18} />
                  <div>
                    <span className="font-semibold block text-[#171717] dark:text-white">Telemetry Phone</span>
                    <p className="text-[#4d4d4d] dark:text-[#a1a1a1] text-xs font-mono mt-0.5">
                      +91 9990285721
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <FiMail className="text-[#50e3c2] shrink-0 mt-1" size={18} />
                  <div>
                    <span className="font-semibold block text-[#171717] dark:text-white">Official Email</span>
                    <p className="text-[#4d4d4d] dark:text-[#a1a1a1] text-xs font-mono mt-0.5">
                      support@cravebite.com
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="hairline-card p-2 h-64 overflow-hidden">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d112028.98634860474!2d77.3486337854659!3d28.66531362796191!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cf1a4666d9c61%3A0xc0d718a221fdd086!2sGhaziabad%2C%20Uttar%20Pradesh%20201002!5e0!3m2!1sen!2sin!4v1703448496464!5m2!1sen!2sin" 
                width="100%" 
                height="100%" 
                style={{ border: 0, borderRadius: '8px' }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Maps Location"
              ></iframe>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-7"
          >
            <div className="hairline-card p-6 md:p-8">
              <span className="mono-eyebrow block pb-2 border-b border-[#ebebeb] dark:border-[#222222] mb-6">
                TRANSMIT INQUIRY FORM
              </span>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="mono-eyebrow block mb-1.5">SENDER NAME</label>
                  <input required type="text" placeholder="John Doe" className="geist-input w-full" />
                </div>

                <div>
                  <label className="mono-eyebrow block mb-1.5">EMAIL ADDRESS</label>
                  <input required type="email" placeholder="john@example.com" className="geist-input w-full" />
                </div>

                <div>
                  <label className="mono-eyebrow block mb-1.5">MESSAGE DETAILS</label>
                  <textarea required rows={5} placeholder="State your inquiry or feedback..." className="geist-input w-full"></textarea>
                </div>

                <button type="submit" className="btn-primary-pill w-full justify-center !py-3">
                  <FiSend size={15} /> Transmit Message
                </button>
              </form>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default Contact;
