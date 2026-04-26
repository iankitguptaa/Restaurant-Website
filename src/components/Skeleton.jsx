const Skeleton = () => {
  return (
    <div className="bg-white dark:bg-dark-surface rounded-2xl shadow-sm border border-gray-100 dark:border-white/5 overflow-hidden animate-pulse">
      <div className="h-48 bg-gray-200 dark:bg-dark-surfaceHover"></div>
      <div className="p-5">
        <div className="flex justify-between mb-4">
          <div className="h-6 bg-gray-200 dark:bg-dark-surfaceHover rounded w-2/3"></div>
          <div className="h-6 bg-gray-200 dark:bg-dark-surfaceHover rounded w-12"></div>
        </div>
        <div className="h-4 bg-gray-200 dark:bg-dark-surfaceHover rounded w-full mb-2"></div>
        <div className="h-4 bg-gray-200 dark:bg-dark-surfaceHover rounded w-4/5 mb-6"></div>
        <div className="flex justify-between items-center">
          <div className="h-6 bg-gray-200 dark:bg-dark-surfaceHover rounded w-16"></div>
          <div className="h-10 w-10 bg-gray-200 dark:bg-dark-surfaceHover rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default Skeleton;
