function LoadingProduct() {
    return (
        <div className="p-4 space-y-4">
            {/* Header Skeleton */}
            <div className="w-full h-8 bg-gray-300 animate-pulse"></div>

            {/* Image Skeleton */}
            <div className="w-full h-56 bg-gray-300 animate-pulse"></div>

            {/* Content Skeleton */}
            <div className="space-y-2">
                <div className="w-11/12 h-6 bg-gray-300 animate-pulse"></div>
                <div className="w-full h-20 bg-gray-300 animate-pulse"></div>
                <div className="w-4/12 h-6 bg-gray-300 animate-pulse"></div>
            </div>
            <div className='space-y-6'>
                <div className="mt-12 w-11/12 h-10 bg-gray-300 animate-pulse"></div>
                <div className="w-11/12 h-32 bg-gray-300 animate-pulse"></div>
            </div>
        </div>
    );
}

export default LoadingProduct;