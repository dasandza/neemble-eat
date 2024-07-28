function LoadingOrders() {
    return (
        <div className="p-4 space-y-4">
            {/* Header Skeleton */}
            <div className="w-full h-8 bg-gray-300 animate-pulse"></div>

            {/* Image Skeleton */}
            <div className="w-full h-10 bg-gray-300 animate-pulse"></div>

            {/* Content Skeleton */}
            <div className="space-y-2">
                <div className="mt-28  w-full h-20 bg-gray-300 animate-pulse"></div>
                <div className="w-full h-20 bg-gray-300 animate-pulse"></div>
                <div className="w-full h-20 bg-gray-300 animate-pulse"></div>
            </div>
        </div>
    );
}

export default LoadingOrders;