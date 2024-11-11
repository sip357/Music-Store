import ProductCard from "../components/product/ProductCard";


const products = [
    { title: 'Product 1', bpm: 130, imageUrl: '/Someone.jpg', tags: ["Emo", "Trap"] },
    { title: 'Product 2', bpm: 129, imageUrl: '/Someone.jpg', tags: ["Emo", "Guitar"]},
    { title: 'Product 3', bpm: 180, imageUrl: '/Someone.jpg', tags: ["Piano", "Trap"]}
    // Add more products as needed or fetch them from an API
];

export default function ProductContainer() {
    return (
        <div className="flex flex-wrap items-center justify-center gap-2">
            {products.map((product, index) => (
                <ProductCard
                    key={index}
                    ProductPicture={product.imageUrl}
                    ProductBPM={product.bpm}
                    ProductTitle={product.title}
                    ProductTags={product.tags}
                />
            ))}
        </div>
    );
}
