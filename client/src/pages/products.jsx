

import { useEffect, useState } from "react";
import ProductCard from "./productCard";

function Products({ setCart }) {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                setError("");

                const response = await fetch(
    `${import.meta.env.VITE_API_URL}/api/products`
);
                if (!response.ok) {
                    throw new Error("Failed to load products.");
                }

                const data = await response.json();
                setProducts(data);
            } catch (err) {
                setError(
                    err.message || "Something went wrong. Please try again."
                );
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">

                {/* Page Heading */}
                <div className="mb-10">
                    <p className="mb-2 text-sm font-bold uppercase tracking-widest text-blue-600">
                        Discover Your Favorites
                    </p>

                    <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                        <div>
                            <h1
    className="text-3xl tracking-tight text-gray-900 sm:text-4xl font-extrabold"
>
Explore Our Prodcuts
</h1>

                            <p className="mt-3 text-gray-500">
                                Find something you’ll love.
                            </p>
                        </div>

                        {!loading && !error && (
                            <p className="text-sm font-medium text-gray-500">
                                {products.length}{" "}
                                {products.length === 1 ? "product" : "products"} available
                            </p>
                        )}
                    </div>
                </div>

                {/* Loading State */}
                {loading && (
                    <div className="flex min-h-64 items-center justify-center">
                        <div className="text-center">
                            <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600" />

                            <p className="font-medium text-gray-600">
                                Loading products...
                            </p>
                        </div>
                    </div>
                )}

                {/* Error State */}
                {!loading && error && (
                    <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center">
                        <h2 className="text-xl font-bold text-red-700">
                            Unable to load products
                        </h2>

                        <p className="mt-2 text-red-600">
                            {error}
                        </p>

                        <button
                            onClick={() => window.location.reload()}
                            className="mt-5 rounded-xl bg-red-600 px-6 py-3 font-semibold text-white transition hover:bg-red-700"
                        >
                            Try Again
                        </button>
                    </div>
                )}

                {/* Empty State */}
                {!loading && !error && products.length === 0 && (
                    <div className="rounded-2xl border border-gray-200 bg-white p-10 text-center">
                        <h2 className="text-xl font-bold text-gray-800">
                            No products available
                        </h2>

                        <p className="mt-2 text-gray-500">
                            Check back later for new products.
                        </p>
                    </div>
                )}

                {/* Product Grid */}
                {!loading && !error && products.length > 0 && (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {products.map((product) => (
                            <ProductCard
                                key={product._id}
                                product={product}
                                setCart={setCart}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Products;