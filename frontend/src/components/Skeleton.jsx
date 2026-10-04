const Skeleton = () => {
  return (
    <div className="bg-white border border-[#EDE8E3] rounded-2xl overflow-hidden animate-pulse">
      {/* Image placeholder */}
      <div className="h-40 bg-[#F0EBE5] relative overflow-hidden">
        <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/40 to-transparent" />
      </div>
      {/* Content */}
      <div className="p-3.5 space-y-2">
        <div className="h-3.5 bg-[#F0EBE5] rounded-full w-3/4" />
        <div className="h-2.5 bg-[#F0EBE5] rounded-full w-1/2" />
        <div className="h-2.5 bg-[#F0EBE5] rounded-full w-full" />
        <div className="flex items-center justify-between pt-2">
          <div className="h-4 bg-[#F0EBE5] rounded-full w-12" />
          <div className="w-8 h-8 bg-[#F0EBE5] rounded-xl" />
        </div>
      </div>
    </div>
  );
};

export default Skeleton;
