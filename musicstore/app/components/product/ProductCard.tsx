interface ProductCardProps {
    ProductTitle: string;
    ProductBPM: number;
    ProductTags: string[];
}

export default function ProductCard({
    ProductTitle,
    ProductBPM,
    ProductTags
}: ProductCardProps) {
        return (                
            <div className="p-10">  
            {/* Product Card */}
            <div className="max-w-sm rounded overflow-hidden shadow-lg">
                <img className="w-full" src="/mountain.jpg" alt="Mountain"/>
                <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{ProductTitle}</div>
                <p className="text-gray-700 text-base">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, Nonea! Maiores et perferendis eaque, exercitationem praesentium nihil.
                </p>
                </div>
                <div className="px-6 pt-4 pb-2">
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#photography</span>
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#travel</span>
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#winter</span>
                </div>
            </div>
            </div>
        )
}