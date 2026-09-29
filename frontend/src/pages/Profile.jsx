import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { FiUser, FiMapPin, FiCreditCard, FiCheck } from 'react-icons/fi';
import toast from 'react-hot-toast';

const Profile = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('details');

  const handleSave = (e) => {
    e.preventDefault();
    toast.success('Profile details updated');
  };

  if (!user) {
    return <div className="pt-24 text-center font-mono text-sm text-[#8f8f8f]">Authentication required.</div>;
  }

  return (
    <div className="pt-20 pb-20 min-h-screen bg-[#fafafa] dark:bg-[#0a0a0a]">
      <Helmet><title>User Profile | CraveBite Geist Spec</title></Helmet>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="py-6 border-b border-[#ebebeb] dark:border-[#222222] mb-8">
          <span className="mono-eyebrow">USER PROFILE TELEMETRY</span>
          <h1 className="text-3xl font-bold font-sans text-[#171717] dark:text-white tracking-tight mt-1">
            Account Preferences
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* Sidebar Nav */}
          <div className="md:col-span-4">
            <div className="hairline-card p-6 space-y-6">
              
              <div className="flex items-center gap-4 pb-6 border-b border-[#ebebeb] dark:border-[#222222]">
                <div className="w-14 h-14 bg-[#171717] dark:bg-white text-white dark:text-[#171717] rounded-full flex items-center justify-center text-xl font-bold font-mono shadow-whisper">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h2 className="font-bold text-base text-[#171717] dark:text-white">{user.name}</h2>
                  <p className="text-xs font-mono text-[#8f8f8f]">{user.email}</p>
                  <span className="inline-block mt-1 font-mono text-[10px] uppercase px-2 py-0.5 rounded-sm bg-[#fafafa] dark:bg-[#1a1a1a] border border-[#ebebeb] dark:border-[#222222] text-[#0070f3]">
                    {user.role || 'STANDARD USER'}
                  </span>
                </div>
              </div>

              <div className="space-y-1">
                <button 
                  onClick={() => setActiveTab('details')}
                  className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-sm text-[14px] font-medium transition-colors ${
                    activeTab === 'details' 
                      ? 'bg-[#171717] text-white dark:bg-white dark:text-[#171717]' 
                      : 'text-[#4d4d4d] dark:text-[#a1a1a1] hover:bg-[#fafafa] dark:hover:bg-[#1a1a1a]'
                  }`}
                >
                  <FiUser size={15} /> Personal Details
                </button>
                <button 
                  onClick={() => setActiveTab('addresses')}
                  className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-sm text-[14px] font-medium transition-colors ${
                    activeTab === 'addresses' 
                      ? 'bg-[#171717] text-white dark:bg-white dark:text-[#171717]' 
                      : 'text-[#4d4d4d] dark:text-[#a1a1a1] hover:bg-[#fafafa] dark:hover:bg-[#1a1a1a]'
                  }`}
                >
                  <FiMapPin size={15} /> Saved Addresses
                </button>
                <button 
                  onClick={() => setActiveTab('payments')}
                  className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-sm text-[14px] font-medium transition-colors ${
                    activeTab === 'payments' 
                      ? 'bg-[#171717] text-white dark:bg-white dark:text-[#171717]' 
                      : 'text-[#4d4d4d] dark:text-[#a1a1a1] hover:bg-[#fafafa] dark:hover:bg-[#1a1a1a]'
                  }`}
                >
                  <FiCreditCard size={15} /> Payment Methods
                </button>
              </div>

            </div>
          </div>

          {/* Content Area */}
          <div className="md:col-span-8">
            <div className="hairline-card p-6 md:p-8">
              
              {activeTab === 'details' ? (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                  <span className="mono-eyebrow block pb-2 border-b border-[#ebebeb] dark:border-[#222222]">
                    PERSONAL INFORMATION
                  </span>

                  <form onSubmit={handleSave} className="space-y-4 max-w-lg">
                    <div>
                      <label className="mono-eyebrow block mb-1.5">FULL NAME</label>
                      <input type="text" defaultValue={user.name} className="geist-input w-full" />
                    </div>

                    <div>
                      <label className="mono-eyebrow block mb-1.5">EMAIL ADDRESS (VERIFIED)</label>
                      <input type="email" defaultValue={user.email} disabled className="geist-input w-full opacity-60 cursor-not-allowed font-mono" />
                    </div>

                    <div>
                      <label className="mono-eyebrow block mb-1.5">PHONE CONTACT</label>
                      <input type="tel" defaultValue="+91 9990285721" className="geist-input w-full font-mono" />
                    </div>

                    <button type="submit" className="btn-primary-pill !py-2.5">
                      <FiCheck size={14} /> Save Profile Changes
                    </button>
                  </form>
                </motion.div>
              ) : null}

              {activeTab === 'addresses' ? (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                  <div className="flex justify-between items-center pb-2 border-b border-[#ebebeb] dark:border-[#222222]">
                    <span className="mono-eyebrow">ADDRESS BOOK</span>
                    <button className="btn-ghost-sm">+ Add Address</button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-[#fafafa] dark:bg-[#1a1a1a] border border-[#ebebeb] dark:border-[#222222] space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-sm text-[#171717] dark:text-white">Primary Home Address</span>
                        <span className="mono-eyebrow text-[#0070f3]">DEFAULT</span>
                      </div>
                      <p className="text-xs font-mono text-[#4d4d4d] dark:text-[#a1a1a1]">
                        Ghaziabad, Uttar Pradesh, 201002
                      </p>
                    </div>
                  </div>
                </motion.div>
              ) : null}

              {activeTab === 'payments' ? (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                  <div className="flex justify-between items-center pb-2 border-b border-[#ebebeb] dark:border-[#222222]">
                    <span className="mono-eyebrow">PAYMENT METHODS</span>
                    <button className="btn-ghost-sm">+ Add Card</button>
                  </div>

                  <div className="p-4 rounded-xl bg-[#fafafa] dark:bg-[#1a1a1a] border border-[#ebebeb] dark:border-[#222222] flex justify-between items-center max-w-md">
                    <div className="flex items-center gap-3">
                      <div className="px-2 py-1 bg-[#171717] text-white rounded text-[10px] font-mono font-bold">VISA</div>
                      <span className="font-mono text-sm">•••• •••• •••• 4242</span>
                    </div>
                    <span className="mono-eyebrow text-[#50e3c2]">ACTIVE</span>
                  </div>
                </motion.div>
              ) : null}

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Profile;
