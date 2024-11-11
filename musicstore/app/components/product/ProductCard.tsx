
interface ProductCardProps {
    ProductPicture: string;
    ProductTitle: string;
    ProductBPM: number;
    ProductTags: string[];
}

export default function ProductCard({
    ProductPicture,
    ProductTitle,
    ProductBPM,
    ProductTags
}: ProductCardProps) {
        return (                
            <div className="p-10">  
                {/* Product Card */}
                <div className="max-w-md rounded-lg overflow-hidden shadow-lg bg-pro productCardBackground">
                    <div className="flex">
                        <img className="relative inset-y-0 left-0 w-1/4" src={ProductPicture} alt={ProductTitle} />
                        <div className="px-6 m-auto">
                            <div className="font-bold text-xl mb-2 text-center">{ProductTitle}</div>
                            <p className="text-gray-700 text-base text-center">
                                {ProductBPM} bpm
                            </p>
                        </div>
                        <div className="flex text-center m-auto">
                            {ProductTags.map((tag, index) =>
                                <span 
                                    key={index}
                                    className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
                                >
                                    #{tag}
                                </span>
                            )}
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-9 m-auto mx-4 right-0">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5V18M15 7.5V18M3 16.811V8.69c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061A1.125 1.125 0 0 1 3 16.811Z" />
                        </svg>
                    </div>
                </div>
            </div>
        );
}