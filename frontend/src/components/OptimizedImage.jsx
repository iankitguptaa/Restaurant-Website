import { useState } from 'react';
import { getOptimizedImageUrl } from '../utils/imageOptimizer';

const OptimizedImage = ({
  src,
  alt = '',
  width = 600,
  quality = 75,
  className = '',
  loading = 'lazy',
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);

  const optimizedSrc = getOptimizedImageUrl(
    error
      ? 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c'
      : src,
    width,
    quality
  );

  return (
    <div className={`relative overflow-hidden bg-[#f0f0f0] dark:bg-[#1a1a1a] ${className}`}>
      {/* Skeleton Pulse loader before image finishes loading */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 dark:via-white/5 to-transparent animate-shimmer" />
      )}

      <img
        src={optimizedSrc}
        alt={alt}
        loading={loading}
        decoding="async"
        onLoad={() => setIsLoaded(true)}
        onError={() => {
          setError(true);
          setIsLoaded(true);
        }}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        {...props}
      />
    </div>
  );
};

export default OptimizedImage;
