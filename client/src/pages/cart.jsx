import { useNavigate } from "react-router-dom";

function Cart({ cart, setCart }) {
    const navigate = useNavigate();

    // Increase product quantity
    const increaseQuantity = (productId) => {
        setCart((previousCart) =>
            previousCart.map((item) => {
                if (item._id !== productId) {
                    return item;
                }

                // Don't allow quantity to exceed available stock
                if (item.quantity >= item.stock) {
                    return item;
                }

                return {
                    ...item,
                    quantity: item.quantity + 1,
                };
            })
        );
    };

    // Decrease product quantity
    const decreaseQuantity = (productId) => {
        setCart((previousCart) =>
            previousCart.map((item) =>
                item._id === productId
                    ? {
                          ...item,
                          quantity:
                              item.quantity > 1
                                  ? item.quantity - 1
                                  : 1,
                      }
                    : item
            )
        );
    };

    // Remove product from cart
    const removeFromCart = (productId) => {
        setCart((previousCart) =>
            previousCart.filter((item) => item._id !== productId)
        );
    };

    // Calculate total price
    const total = cart.reduce((sum, item) => {
        return sum + item.price * item.quantity;
    }, 0);

    // Format price in Indian Rupees
    const formatPrice = (price) =>
        new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 2,
        }).format(price);

    // Empty cart screen
    if (cart.length === 0) {
        return (
            <div className="min-h-[70vh] bg-gray-50 px-4 py-16">
                <div className="mx-auto flex max-w-xl flex-col items-center rounded-3xl bg-white px-6 py-12 text-center shadow-sm sm:px-12">
                    <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-blue-50 text-5xl">
                        🛒
                    </div>

                    <h1 className="mb-3 text-3xl font-bold text-gray-900">
                        Your Cart is Empty
                    </h1>

                    <p className="mb-8 max-w-sm text-gray-500">
                        Looks like you haven't added anything to your cart yet.
                        Explore our collection and find something you love!
                    </p>

                    <button
                        onClick={() => navigate("/products")}
                        className="rounded-xl bg-blue-600 px-8 py-3 font-semibold text-white transition hover:bg-blue-700"
                    >
                        Continue Shopping
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 px-4 py-10 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-6xl">

                {/* Page Header */}
                <div className="mb-8">
                    <p className="mb-2 text-sm font-extrabold uppercase tracking-wider text-blue-600">
                        Your Shopping Bag
                    </p>

                    <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                        Shopping Cart
                    </h1>

                    <p className="mt-2 text-gray-500">
                        {cart.reduce(
                            (sum, item) => sum + item.quantity,
                            0
                        )}{" "}
                        items in your cart
                    </p>
                </div>

                <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-3">

                    {/* Cart Items */}
                    <div className="space-y-5 lg:col-span-2">
                        {cart.map((item) => (
                            <div
                                key={item._id}
                                className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition hover:shadow-md sm:p-6"
                            >
                                <div className="flex flex-col gap-5 sm:flex-row sm:items-center">

                                    {/* Product Image */}
                                    <div className="flex h-36 w-full shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gray-50 sm:h-32 sm:w-32">
                                        {item.image ? (
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="h-full w-full object-contain p-3"
                                            />
                                        ) : (
                                            <span className="text-4xl">
                                                🛍️
                                            </span>
                                        )}
                                    </div>

                                    {/* Product Details */}
                                    <div className="flex min-w-0 flex-1 flex-col justify-between gap-4">
                                        <div>
                                            <h2 className="text-lg font-bold text-gray-900 sm:text-xl">
                                                {item.name}
                                            </h2>

                                            <p className="mt-2 text-sm text-gray-500">
                                                Price per item
                                            </p>

                                            <p className="mt-1 text-lg font-semibold text-blue-600">
                                                {formatPrice(item.price)}
                                            </p>

                                            <p className="mt-1 text-xs text-gray-400">
                                                {item.stock} available
                                            </p>
                                        </div>

                                        {/* Quantity and Remove */}
                                        <div className="flex flex-wrap items-center justify-between gap-4">
                                            <div className="flex items-center gap-3 rounded-xl border border-gray-200 p-1">

                                                <button
                                                    onClick={() =>
                                                        decreaseQuantity(item._id)
                                                    }
                                                    disabled={item.quantity <= 1}
                                                    aria-label={`Decrease quantity of ${item.name}`}
                                                    className="flex h-9 w-9 items-center justify-center rounded-lg text-lg font-bold text-gray-700 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
                                                >
                                                    −
                                                </button>

                                                <span className="min-w-6 text-center font-semibold text-gray-900">
                                                    {item.quantity}
                                                </span>

                                                <button
                                                    onClick={() =>
                                                        increaseQuantity(item._id)
                                                    }
                                                    disabled={
                                                        item.quantity >= item.stock
                                                    }
                                                    aria-label={`Increase quantity of ${item.name}`}
                                                    className="flex h-9 w-9 items-center justify-center rounded-lg text-lg font-bold text-gray-700 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
                                                >
                                                    +
                                                </button>
                                            </div>

                                            <button
                                                onClick={() =>
                                                    removeFromCart(item._id)
                                                }
                                                className="rounded-lg px-3 py-2 text-sm font-medium text-red-500 transition hover:bg-red-50 hover:text-red-700"
                                            >
                                                Remove
                                            </button>
                                        </div>

                                        {item.quantity >= item.stock && (
                                            <p className="text-xs font-medium text-orange-600">
                                                Maximum available stock reached.
                                            </p>
                                        )}
                                    </div>

                                    {/* Item Subtotal */}
                                    <div className="border-t border-gray-100 pt-4 sm:border-0 sm:pt-0 sm:text-right">
                                        <p className="text-sm text-gray-500">
                                            Item total
                                        </p>

                                        <p className="mt-1 text-xl font-bold text-gray-900">
                                            {formatPrice(
                                                item.price * item.quantity
                                            )}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {/* Continue Shopping */}
                        <button
                            onClick={() => navigate("/products")}
                            className="inline-flex items-center gap-2 py-2 font-semibold text-blue-600 transition hover:text-blue-800"
                        >
                            <span>←</span>
                            Continue Shopping
                        </button>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:sticky lg:top-6">
                        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
                            <h2 className="mb-6 text-xl font-extrabold text-gray-900">
                                Order Summary
                            </h2>

                            <div className="space-y-4">
                                <div className="flex justify-between gap-4 text-gray-600">
                                    <span>
                                        Subtotal (
                                        {cart.reduce(
                                            (sum, item) =>
                                                sum + item.quantity,
                                            0
                                        )}{" "}
                                        items)
                                    </span>

                                    <span className="font-medium text-gray-900">
                                        {formatPrice(total)}
                                    </span>
                                </div>

                                <div className="flex justify-between text-gray-600">
                                    <span>Shipping</span>
                                    <span className="font-medium text-green-600">
                                        Free
                                    </span>
                                </div>

                                <div className="border-t border-gray-200 pt-4">
                                    <div className="flex items-center justify-between gap-4">
                                        <span className="text-lg font-bold text-gray-900">
                                            Total
                                        </span>

                                        <span className="text-2xl font-bold text-blue-600">
                                            {formatPrice(total)}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={() => navigate("/checkout")}
                                className="mt-8 w-full rounded-xl bg-blue-600 px-6 py-4 font-semibold text-white shadow-sm transition hover:bg-blue-700 hover:shadow-md"
                            >
                                Proceed to Checkout →
                            </button>

                            <p className="mt-4 text-center text-xs text-gray-400">
                                Your order details will be reviewed at checkout.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Cart;