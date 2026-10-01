

import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Checkout({ cart, setCart }) {
  const navigate = useNavigate();

  const [showPayment, setShowPayment] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Format prices in Indian Rupees
  const formatPrice = (price) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 2,
    }).format(price);

  // Calculate total
  const total = cart.reduce((sum, item) => {
    return sum + item.price * item.quantity;
  }, 0);


// Create order after simulated successful payment
const handlePaymentSuccess = async () => {
    try {
        setLoading(true);
        setError("");

        const token = localStorage.getItem("token");

        if (!token) {
            throw new Error("Token not found. Please login again.");
        }

        const response = await fetch(
            `${import.meta.env.VITE_API_URL}/api/orders`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    items: cart.map((item) => ({
                        productId: item._id,
                        quantity: item.quantity,
                    })),
                }),
            }
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Failed to create order");
        }

        setPaymentStatus("success");
        setCart([]);
    } catch (error) {
        setError(error.message);
    } finally {
        setLoading(false);
    }
};

  // Payment success screen
  if (paymentStatus === "success") {
    return (
      <div className="min-h-[70vh] bg-gray-50 px-4 py-16">
        <div className="mx-auto flex max-w-xl flex-col items-center rounded-3xl bg-white px-6 py-12 text-center shadow-sm sm:px-12">
          <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-green-100 text-5xl">
            ✓
          </div>

          <h1 className="mb-4 text-3xl font-extrabold text-green-600 sm:text-4xl">
            Order Successful!
          </h1>

          <p className="mb-2 text-lg font-semibold text-gray-800">
            Thank you for your purchase!
          </p>

          <p className="mb-8 text-gray-500">
            Your mock payment was successful and your order has been placed.
          </p>

          <button
            onClick={() => navigate("/products")}
            className="rounded-xl bg-blue-600 px-8 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            Continue Shopping
          </button>

          <button
            onClick={() => navigate("/my-orders")}
            className="mt-4 font-semibold text-blue-600 transition hover:text-blue-800"
          >
            View My Orders
          </button>
        </div>
      </div>
    );
  }

  // Empty cart screen
  if (cart.length === 0) {
    return (
      <div className="min-h-[70vh] bg-gray-50 px-4 py-16">
        <div className="mx-auto flex max-w-xl flex-col items-center rounded-3xl bg-white px-6 py-12 text-center shadow-sm sm:px-12">
          <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-blue-50 text-5xl">
            🛒
          </div>

          <h1 className="mb-4 text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Your Cart is Empty
          </h1>

          <p className="mb-8 text-gray-500">
            Add some products to your cart before proceeding to checkout.
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

  // Payment failure screen
  if (paymentStatus === "failed") {
    return (
      <div className="min-h-[70vh] bg-gray-50 px-4 py-16">
        <div className="mx-auto flex max-w-xl flex-col items-center rounded-3xl bg-white px-6 py-12 text-center shadow-sm sm:px-12">
          <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-red-100 text-5xl text-red-600">
            ✕
          </div>

          <h1 className="mb-4 text-3xl font-extrabold text-red-600 sm:text-4xl">
            Payment Failed!
          </h1>

          <p className="mb-8 text-gray-500">
            Your mock payment failed. Your cart is still available. Please try again.
          </p>

          <button
            onClick={() => {
              setPaymentStatus("");
              setShowPayment(true);
            }}
            className="w-full max-w-xs rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            Try Again
          </button>

          <button
            onClick={() => {
              setPaymentStatus("");
              setShowPayment(false);
            }}
            className="mt-4 font-semibold text-gray-500 transition hover:text-gray-800"
          >
            Back to Checkout
          </button>
        </div>
      </div>
    );
  }

  // Mock payment screen
  if (showPayment) {
    return (
      <div className="min-h-screen bg-gray-50 px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl">
          <button
            onClick={() => {
              setShowPayment(false);
              setError("");
            }}
            className="mb-6 font-semibold text-blue-600 transition hover:text-blue-800"
          >
            ← Back to Checkout
          </button>

          <div className="mb-8">
            <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-blue-600">
              Secure Checkout
            </p>

            <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Mock Payment
            </h1>

            <p className="mt-3 text-gray-500">
              Review your payment amount and choose a test payment option.
            </p>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
            <div className="mb-6 rounded-xl bg-blue-50 p-6">
              <p className="text-sm font-medium text-gray-600">
                Total Amount to Pay
              </p>

              <h2 className="mt-2 text-3xl font-extrabold text-blue-700 sm:text-4xl">
                {formatPrice(total)}
              </h2>
            </div>

            <div className="mb-6 rounded-xl border border-gray-200 p-4">
              <div className="flex items-center justify-between gap-4">
                <span className="font-semibold text-gray-800">
                  Order Total
                </span>

                <span className="font-bold text-gray-900">
                  {formatPrice(total)}
                </span>
              </div>

              <p className="mt-3 text-sm text-gray-500">
                This is a simulated payment for testing. No real money will be charged.
              </p>
            </div>

            {error && (
              <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                {error}
              </div>
            )}

            <button
              onClick={handlePaymentSuccess}
              disabled={loading}
              className="mb-4 w-full rounded-xl bg-green-600 px-6 py-4 font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Processing..." : "✓ Simulate Successful Payment"}
            </button>

            <button
              onClick={() => {
                setError("");
                setPaymentStatus("failed");
              }}
              disabled={loading}
              className="mb-4 w-full rounded-xl bg-red-50 px-6 py-4 font-semibold text-red-600 transition hover:bg-red-100 disabled:opacity-50"
            >
              ✕ Simulate Failed Payment
            </button>

            <button
              onClick={() => {
                setShowPayment(false);
                setError("");
              }}
              disabled={loading}
              className="w-full rounded-xl border border-gray-200 px-6 py-4 font-semibold text-gray-700 transition hover:bg-gray-50 disabled:opacity-50"
            >
              Back to Checkout
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Checkout summary screen
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Page Header */}
        <div className="mb-8">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-blue-600">
            Almost There
          </p>

          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Checkout
          </h1>

          <p className="mt-3 text-gray-500">
            Review your order before proceeding to payment.
          </p>
        </div>

        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-3">
          {/* Order Items */}
          <div className="space-y-5 lg:col-span-2">
            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-8">
              <h2 className="mb-6 text-xl font-extrabold text-gray-900 sm:text-2xl">
                Order Summary
              </h2>

              <div className="space-y-5">
                {cart.map((item) => (
                  <div
                    key={item._id}
                    className="flex flex-col gap-4 border-b border-gray-100 pb-5 last:border-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="flex min-w-0 items-center gap-4">
                      <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gray-50">
                        {item.image ? (
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-full w-full object-contain p-2"
                          />
                        ) : (
                          <span className="text-3xl">🛍️</span>
                        )}
                      </div>

                      <div className="min-w-0">
                        <h3 className="font-bold text-gray-900">
                          {item.name}
                        </h3>

                        <p className="mt-1 text-sm text-gray-500">
                          Quantity: {item.quantity}
                        </p>

                        <p className="mt-1 text-sm text-gray-500">
                          {formatPrice(item.price)} each
                        </p>
                      </div>
                    </div>

                    <p className="shrink-0 font-bold text-gray-900 sm:text-right">
                      {formatPrice(item.price * item.quantity)}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => navigate("/cart")}
              className="inline-flex items-center gap-2 py-2 font-semibold text-blue-600 transition hover:text-blue-800"
            >
              ← Back to Cart
            </button>
          </div>

          {/* Payment Summary */}
          <div className="lg:sticky lg:top-6">
            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
              <h2 className="mb-6 text-xl font-extrabold text-gray-900">
                Payment Summary
              </h2>

              <div className="space-y-4">
                <div className="flex justify-between gap-4 text-gray-600">
                  <span>
                    Subtotal (
                    {cart.reduce((sum, item) => sum + item.quantity, 0)} items)
                  </span>

                  <span className="font-semibold text-gray-900">
                    {formatPrice(total)}
                  </span>
                </div>

                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="font-semibold text-green-600">Free</span>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-lg font-bold text-gray-900">
                      Total
                    </span>

                    <span className="text-2xl font-extrabold text-blue-600">
                      {formatPrice(total)}
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  setError("");
                  setShowPayment(true);
                }}
                className="mt-8 w-full rounded-xl bg-blue-600 px-6 py-4 font-semibold text-white shadow-sm transition hover:bg-blue-700 hover:shadow-md"
              >
                Proceed to Payment →
              </button>

              <p className="mt-4 text-center text-xs text-gray-400">
                This checkout uses a simulated payment for testing.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;