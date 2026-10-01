
import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";

function ProductDetails({ setCart }) {
    const { id } = useParams();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchProduct = async () => {
            try {
    setLoading(true);
    setError("");

    const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/products/${id}`
    );

                if (!response.ok) {
                    throw new Error(
                        response.status === 404
                            ? "Product not found."
                            : "Failed to load product."
                    );
                }

                const data = await response.json();
                setProduct(data);
            } catch (err) {
                setError(
                    err.message || "Something went wrong. Please try again."
                );
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    const handleAddToCart = () => {
        if (!product || product.stock <= 0) return;

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

    // Loading State
    if (loading) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center">
                <div className="text-center">
                    <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600" />
                    <p className="font-medium text-gray-600">
                        Loading product...
                    </p>
                </div>
            </div>
        );
    }

    // Error State
    if (error) {
        return (
            <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
                <h2 className="text-2xl font-bold text-gray-900">
                    Unable to load product
                </h2>

                <p className="mt-3 text-gray-500">{error}</p>

                <Link
                    to="/products"
                    className="mt-6 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
                >
                    Back to Products
                </Link>
            </div>
        );
    }

    if (!product) return null;

    const isOutOfStock = product.stock <= 0;

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">

                {/* Back Link */}
                <Link
                    to="/products"
                    className="mb-8 inline-flex items-center gap-2 font-semibold text-gray-500 transition hover:text-blue-600"
                >
                    <span aria-hidden="true">←</span>
                    Back to Products
                </Link>

                {/* Product Details */}
                <div className="grid overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm md:grid-cols-2">

                    {/* Product Image */}
                    <div className="flex min-h-[350px] items-center justify-center bg-gray-50 p-8 sm:p-12">
                        <img
                            src={product.image}
                            alt={product.name}
                            className="h-80 w-full max-w-md object-contain transition duration-300 hover:scale-105 sm:h-96"
                        />
                    </div>

                    {/* Product Information */}
                    <div className="flex flex-col justify-center gap-6 p-6 sm:p-10 lg:p-14">

                        <div>
                            <p className="mb-3 text-sm font-bold uppercase tracking-widest text-blue-600">
                                ShopNest Collection
                            </p>

                            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                                {product.name}
                            </h1>
                        </div>

                        {/* Price */}
                        <div className="border-b border-gray-100 pb-6">
                            <p className="text-sm font-medium text-gray-500">
                                Price
                            </p>

                            <p className="mt-2 text-3xl font-extrabold text-gray-900">
                                ₹{Number(product.price).toLocaleString("en-IN")}
                            </p>
                        </div>

                        {/* Rating */}
                        <div className="flex items-center gap-2">
                            <span className="text-xl text-amber-500">★</span>

                            <span className="font-bold text-gray-900">
                                {product.rating}
                            </span>

                            <span className="text-sm text-gray-500">
                                / 5 rating
                            </span>
                        </div>

                        {/* Description */}
                        <div>
                            <h2 className="mb-2 text-lg font-bold text-gray-900">
                                Product Description
                            </h2>

                            <p className="leading-7 text-gray-600">
                                {product.description}
                            </p>
                        </div>

                        {/* Stock Status */}
                        <div>
                            <span
                                className={`inline-flex items-center rounded-full px-4 py-2 text-sm font-semibold ${
                                    isOutOfStock
                                        ? "bg-red-50 text-red-600"
                                        : "bg-green-50 text-green-700"
                                }`}
                            >
                                {isOutOfStock
                                    ? "Out of Stock"
                                    : `${product.stock} items available`}
                            </span>
                        </div>

                        {/* Add to Cart */}
                        <button
                            onClick={handleAddToCart}
                            disabled={isOutOfStock}
                            className={`w-full rounded-xl px-6 py-4 text-base font-bold transition ${
                                isOutOfStock
                                    ? "cursor-not-allowed bg-gray-200 text-gray-500"
                                    : "bg-blue-600 text-white shadow-md hover:bg-blue-700 hover:shadow-lg active:scale-[0.98]"
                            }`}
                        >
                            {isOutOfStock ? "Out of Stock" : "🛒 Add to Cart"}
                        </button>

                        <p className="text-center text-sm text-gray-400">
                            A great choice, waiting to be yours.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductDetails;
