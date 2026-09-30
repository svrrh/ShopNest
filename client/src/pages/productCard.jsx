import { Link } from "react-router-dom";

function ProductCard({ product, setCart }) {
    const handleAddToCart = () => {
        setCart((previousCart) => {
            const existingProduct = previousCart.find(
                (item) => item._id === product._id
            );

            if (existingProduct) {
                return previousCart.map((item) =>
                    item._id === product._id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }

            return [...previousCart, { ...product, quantity: 1 }];
        });
    };

    return (
        <div className="border p-4 rounded-xl shadow-sm space-y-4 transition hover:scale-105 hover:shadow-2xl">

            <Link to={`/products/${product._id}`}>
                <img
                    className="w-full h-52 object-contain"
                    src={product.image}
                    alt={product.name}
                />

                <h2 className="text-lg font-bold text-black">
                    {product.name}
                </h2>

                <p className="text-xl font-bold text-black">
                    ₹{product.price}
                </p>

                <p className="text-sm text-gray-500">
                    {product.category}
                </p>
            </Link>

            <button
                onClick={handleAddToCart}
                className="bg-blue-400 text-white p-4 rounded-2xl transition hover:scale-105 hover:bg-blue-700"
            >
                ADD TO CART
            </button>

        </div>
    );
}

export default ProductCard;