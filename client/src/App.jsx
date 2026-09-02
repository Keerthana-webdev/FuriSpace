import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import AdminLayout from "./layouts/AdminLayout";

import Home from "./pages/Home/Home";
import Products from "./pages/Products/Products";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import OrderDetails from "./pages/OrderDetails/OrderDetails";
import Cart from "./pages/Cart/Cart";
import Checkout from "./pages/Checkout/Checkout";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Profile from "./pages/Profile/Profile";
import Orders from "./pages/Orders/Orders";

import Dashboard from "./pages/Admin/Dashboard";
import AdminOrders from "./pages/AdminOrders/AdminOrders";
import AdminOrderDetails from "./pages/AdminOrderDetails/AdminOrderDetails";

import NotFound from "./pages/NotFound/NotFound";

import ProtectedRoute from "./components/common/ProtectedRoute";
import AdminRoute from "./components/common/AdminRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* =====================================================
            CUSTOMER WEBSITE
        ===================================================== */}

        <Route element={<MainLayout />}>

          {/* HOME */}
          <Route path="/" element={<Home />} />

          {/* PRODUCTS */}
          <Route path="/products" element={<Products />} />

          {/* PRODUCT DETAILS */}
          <Route path="/products/:id" element={<ProductDetails />} />

          {/* CART */}
          <Route path="/cart" element={<Cart />} />

          {/* CHECKOUT */}
          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <Checkout />
              </ProtectedRoute>
            }
          />

          {/* CUSTOMER ORDERS */}
          <Route
            path="/orders"
            element={
              <ProtectedRoute>
                <Orders />
              </ProtectedRoute>
            }
          />

          {/* CUSTOMER ORDER DETAILS */}
          <Route
            path="/orders/:orderId"
            element={
              <ProtectedRoute>
                <OrderDetails />
              </ProtectedRoute>
            }
          />

          {/* PROFILE */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
        </Route>

        {/* =====================================================
            AUTHENTICATION
        ===================================================== */}

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }
        >

          {/* ADMIN DASHBOARD */}
          <Route index element={<Dashboard />} />

          {/* ADMIN ORDERS */}
          <Route path="orders" element={<AdminOrders />} />

          {/* ADMIN ORDER DETAILS */}
          <Route
            path="orders/:orderId"
            element={<AdminOrderDetails />}
          />

        </Route>

        <Route path="*" element={<NotFound />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;