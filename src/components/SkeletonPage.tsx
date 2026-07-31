export default function SkeletonPage() {
  return (
    <div className="min-h-screen bg-[var(--bg-app)] flex flex-col md:flex-row relative overflow-hidden">
      {/* Sidebar skeleton */}
      <div className="hidden md:flex w-24 h-screen border-r border-[var(--border-color)] bg-[var(--bg-sidebar)] backdrop-blur-md flex-col items-center py-8 gap-12 fixed left-0 top-0 z-50">
        <div className="w-12 h-12 rounded-2xl skeleton-shimmer" />
        <div className="flex flex-col gap-6 flex-grow justify-center">
          <div className="w-8 h-8 rounded-xl skeleton-shimmer" />
          <div className="w-8 h-8 rounded-xl skeleton-shimmer" />
          <div className="w-8 h-8 rounded-xl skeleton-shimmer" />
          <div className="w-8 h-8 rounded-xl skeleton-shimmer" />
          <div className="w-8 h-8 rounded-xl skeleton-shimmer" />
        </div>
        <div className="w-10 h-10 rounded-full skeleton-shimmer" />
      </div>

      {/* Main content area skeleton */}
      <div className="flex-grow md:pl-28 min-h-screen w-full">
        {/* Hero Section Skeleton */}
        <div className="min-h-[90vh] flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20 max-w-5xl mx-auto py-20 px-6">
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left flex-1 w-full">
            {/* Badge skeleton */}
            <div className="w-48 h-8 rounded-full skeleton-shimmer mb-7" />
            {/* Title skeletons */}
            <div className="w-3/4 h-16 md:h-20 rounded-2xl skeleton-shimmer mb-4" />
            <div className="w-1/2 h-16 md:h-20 rounded-2xl skeleton-shimmer mb-7" />
            {/* Subtitle skeleton */}
            <div className="w-2/3 h-8 rounded-xl skeleton-shimmer mb-6" />
            {/* Description skeleton */}
            <div className="w-full h-4 rounded-lg skeleton-shimmer mb-3" />
            <div className="w-11/12 h-4 rounded-lg skeleton-shimmer mb-3" />
            <div className="w-4/5 h-4 rounded-lg skeleton-shimmer mb-10" />
            {/* Buttons skeleton */}
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mb-10">
              <div className="w-48 h-14 rounded-2xl skeleton-shimmer" />
              <div className="w-48 h-14 rounded-2xl skeleton-shimmer" />
            </div>
            {/* Socials skeleton */}
            <div className="flex gap-3">
              <div className="w-24 h-10 rounded-xl skeleton-shimmer" />
              <div className="w-24 h-10 rounded-xl skeleton-shimmer" />
            </div>
          </div>

          {/* Photo frame skeleton */}
          <div className="relative flex-shrink-0">
            <div className="w-[300px] h-[350px] md:w-[350px] md:h-[400px] rounded-[44px] skeleton-shimmer border border-[var(--border-color)]" />
          </div>
        </div>

        {/* About Section Skeleton */}
        <div className="py-24 px-6 max-w-5xl mx-auto">
          <div className="flex flex-col items-center mb-16">
            <div className="w-56 h-12 rounded-2xl skeleton-shimmer mb-4" />
            <div className="w-16 h-1.5 rounded-full skeleton-shimmer mb-4" />
            <div className="w-96 max-w-full h-5 rounded-lg skeleton-shimmer" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <div className="md:col-span-8 h-[240px] rounded-3xl skeleton-shimmer" />
            <div className="md:col-span-4 h-[240px] flex flex-col gap-4">
              <div className="h-16 rounded-3xl skeleton-shimmer" />
              <div className="h-16 rounded-3xl skeleton-shimmer" />
              <div className="h-16 rounded-3xl skeleton-shimmer" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
