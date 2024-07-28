function LoadingMenu() {
    return (
        <div className="p-4 space-y-4">
            {/* Header Skeleton */}
            <div className="w-full h-8 bg-gray-300 animate-pulse"></div>

            {/* Image Skeleton */}
            <div className="w-full h-56 bg-gray-300 animate-pulse"></div>

            {/* Content Skeleton */}
            <div className="space-y-2">
                <div className="w-3/4 h-10 bg-gray-300 animate-pulse"></div>
                <div className='flex'>
                    <div className="w-16 h-6 bg-gray-300 animate-pulse mr-10"></div>
                    <div className="w-16 h-6 bg-gray-300 animate-pulse mr-10"></div>
                    <div className="w-16 h-6 bg-gray-300 animate-pulse mr-10"></div>
                </div>
                <div className="mt-6 w-full h-6 bg-gray-300 animate-pulse"></div>
                <div className="w-full h-6 bg-gray-300 animate-pulse"></div>
                <div className="w-1/4 h-6 bg-gray-300 animate-pulse"></div>
            </div>
        </div>
    );
}

export default LoadingMenu;