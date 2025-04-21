const SkeletonCard = () => (
  <div className="animate-pulse flex flex-col gap-2 p-4 border border-gray-200 dark:border-white/10 rounded-lg shadow-md bg-white dark:bg-neutral-900">
    <div className="rounded-md bg-gray-300 dark:bg-gray-700 h-[300px]" />
    <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2 mt-4" />
    <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-3/4" />
    <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-full" />
    <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-5/6" />
    <div className="h-2 bg-gray-300 dark:bg-gray-700 rounded w-1/3 mt-2" />
  </div>
);

export default SkeletonCard;
