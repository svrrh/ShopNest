

import { useEffect, useState } from "react";

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(
  `${import.meta.env.VITE_API_URL}/api/orders/my-orders`,
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch orders");
        }

        setOrders(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const getStatusStyle = (status) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-800";
      case "Shipped":
        return "bg-blue-100 text-blue-800";
      case "Cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-yellow-100 text-yellow-800";
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-lg font-medium text-gray-600 animate-pulse">
          Loading your orders...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center">
          <h1 className="text-2xl font-bold text-red-700 mb-3">
            Unable to Load Orders
          </h1>
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="bg-white border border-gray-200 rounded-2xl p-8 sm:p-12 text-center shadow-sm">
          <div className="text-5xl mb-5">📦</div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            My Orders
          </h1>
          <p className="text-gray-500 text-lg">
            You haven't placed any orders yet.
          </p>
          <p className="text-gray-400 mt-2">
            Your orders will appear here once you place one.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
          My Orders
        </h1>
        <p className="text-gray-500 mt-2">
          Track your orders and view your purchase details.
        </p>
      </div>

      <div className="space-y-6">
        {orders.map((order) => (
          <div
            key={order._id}
            className="bg-white border border-gray-200 rounded-2xl p-5 sm:p-6 shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            {/* Order Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-5 border-b border-gray-100">
              <div>
                <p className="text-sm text-gray-500 mb-1">
                  Order ID
                </p>
                <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                  #{order._id.slice(-6).toUpperCase()}
                </h2>
                <p className="text-sm text-gray-500 mt-2">
                  Ordered on:{" "}
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>

              <span
                className={`inline-flex w-fit items-center px-4 py-2 rounded-full text-sm font-semibold ${getStatusStyle(
                  order.orderStatus
                )}`}
              >
                {order.orderStatus}
              </span>
            </div>

            {/* Order Items */}
            <div className="py-4 space-y-4">
              {order.items.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center justify-between gap-4 py-3 border-b border-gray-100 last:border-b-0"
                >
                  <div className="min-w-0">
                    <p className="font-semibold text-gray-900 ">
                      {item.name}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      Quantity: {item.quantity}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      ₹{item.price} per item
                    </p>
                  </div>

                  <p className="font-semibold text-gray-900 whitespace-nowrap">
                    ₹{item.price * item.quantity}
                  </p>
                </div>
              ))}
            </div>

            {/* Payment and Total */}
            <div className="border-t border-gray-200 pt-5 space-y-3">
              <div className="flex items-center justify-between gap-4">
                <span className="text-gray-600">Payment Status</span>
                <span
                  className={`font-semibold capitalize ${
                    order.paymentStatus === "success"
                      ? "text-green-600"
                      : order.paymentStatus === "failed"
                      ? "text-red-600"
                      : "text-yellow-600"
                  }`}
                >
                  {order.paymentStatus}
                </span>
              </div>

              <div className="flex items-center justify-between gap-4 pt-3">
                <span className="text-lg font-bold text-gray-900">
                  Total Amount
                </span>
                <span className="text-xl font-bold text-gray-900">
                  ₹{order.totalAmount}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyOrders;