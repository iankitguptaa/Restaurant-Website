const Skeleton = () => {
  return (
    <div className="bg-white dark:bg-[#121212] border border-[#ebebeb] dark:border-[#222222] rounded-xl overflow-hidden animate-pulse">
      <div className="h-48 bg-[#f2f2f2] dark:bg-[#1a1a1a]"></div>
      <div className="p-4 space-y-3">
        <div className="flex justify-between items-center">
          <div className="h-5 bg-[#ebebeb] dark:bg-[#222222] rounded-sm w-2/3"></div>
          <div className="h-5 bg-[#ebebeb] dark:bg-[#222222] rounded-sm w-12"></div>
        </div>
        <div className="h-4 bg-[#f2f2f2] dark:bg-[#1a1a1a] rounded-sm w-full"></div>
        <div className="h-4 bg-[#f2f2f2] dark:bg-[#1a1a1a] rounded-sm w-4/5"></div>
        <div className="pt-3 border-t border-[#ebebeb] dark:border-[#222222] flex justify-between items-center">
          <div className="h-6 bg-[#ebebeb] dark:bg-[#222222] rounded-sm w-16"></div>
          <div className="h-8 w-16 bg-[#ebebeb] dark:bg-[#222222] rounded-sm"></div>
        </div>
      </div>
    </div>
  );
};

export default Skeleton;
