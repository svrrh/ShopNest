import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import Products from "./pages/products";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/cart";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
 const [cart, setCart] = useState(() => {
  const savedCart = localStorage.getItem("cart");
  return savedCart ? JSON.parse(savedCart) : [];
});

useEffect(() => {
  localStorage.setItem("cart", JSON.stringify(cart));
}, [cart]);

  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Navigate to="/products" replace />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/products"
          element={<Products cart={cart} setCart={setCart} />}
        />

        <Route
          path="/products/:id"
          element={<ProductDetails cart={cart} setCart={setCart} />}
        />
       <Route element={<ProtectedRoute />}>
  <Route
    path="/cart"
    element={<Cart cart={cart} setCart={setCart} />}
  />
  <Route
    path="/checkout"
    element={<Checkout cart={cart} setCart={setCart}  />}
  />
  <Route
    path="/my-orders"
    element={<MyOrders />}
  />
</Route>




        
      </Routes>
    </>
  );
}

export default App;