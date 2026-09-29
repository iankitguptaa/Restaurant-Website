import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useAuth } from '../context/AuthContext';
import { FiLock, FiMail, FiUser, FiArrowRight } from 'react-icons/fi';
import toast from 'react-hot-toast';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const { login, register } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isLogin) {
        await login(formData.email, formData.password);
        toast.success('Logged in successfully');
      } else {
        await register(formData.name, formData.email, formData.password);
        toast.success('Account created successfully');
      }
      navigate(from, { replace: true });
    } catch (error) {
      toast.error(error.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fafafa] dark:bg-[#0a0a0a] py-20 px-4">
      <Helmet><title>{isLogin ? 'Log In' : 'Sign Up'} — CraveBite Geist Spec</title></Helmet>
      
      <div className="max-w-md w-full hairline-card p-8 space-y-6">
        
        <div className="text-center space-y-2 border-b border-[#ebebeb] dark:border-[#222222] pb-6">
          <div className="w-10 h-10 bg-[#171717] dark:bg-white text-white dark:text-[#171717] rounded-sm flex items-center justify-center font-mono font-bold text-lg mx-auto shadow-whisper">
            C
          </div>
          <span className="mono-eyebrow block">AUTHENTICATION GATEWAY</span>
          <h2 className="text-2xl font-bold font-sans text-[#171717] dark:text-white tracking-tight">
            {isLogin ? 'Log In to CraveBite' : 'Create an Account'}
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin ? (
            <div>
              <label className="mono-eyebrow block mb-1.5">FULL NAME</label>
              <div className="relative">
                <FiUser className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8f8f8f]" size={14} />
                <input 
                  type="text" 
                  required 
                  placeholder="John Doe"
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  className="geist-input w-full pl-9" 
                />
              </div>
            </div>
          ) : null}

          <div>
            <label className="mono-eyebrow block mb-1.5">EMAIL ADDRESS</label>
            <div className="relative">
              <FiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8f8f8f]" size={14} />
              <input 
                type="email" 
                required 
                placeholder="name@example.com"
                onChange={e => setFormData({...formData, email: e.target.value})}
                className="geist-input w-full pl-9" 
              />
            </div>
          </div>

          <div>
            <label className="mono-eyebrow block mb-1.5">PASSWORD</label>
            <div className="relative">
              <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8f8f8f]" size={14} />
              <input 
                type="password" 
                required 
                placeholder="••••••••"
                onChange={e => setFormData({...formData, password: e.target.value})}
                className="geist-input w-full pl-9" 
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="btn-primary-pill w-full justify-center !py-3 !mt-6"
          >
            {loading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-2 border-white dark:border-[#171717] border-t-transparent"></div>
            ) : (
              <>
                {isLogin ? 'Log In' : 'Sign Up'} <FiArrowRight size={15} />
              </>
            )}
          </button>
        </form>

        <div className="pt-4 border-t border-[#ebebeb] dark:border-[#222222] text-center">
          <button 
            onClick={() => setIsLogin(!isLogin)}
            className="text-[13px] font-mono text-[#8f8f8f] hover:text-[#171717] dark:hover:text-white transition-colors"
          >
            {isLogin ? "Need an account? Create one" : "Already registered? Log in"}
          </button>
        </div>

      </div>
    </div>
  );
};

export default Login;
