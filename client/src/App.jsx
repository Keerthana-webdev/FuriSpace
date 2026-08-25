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
import AdminOrders from "./pages/AdminOrders/AdminOrders";
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard";

import Dashboard from "./pages/Admin/Dashboard";

import NotFound from "./pages/NotFound/NotFound";

import ProtectedRoute from "./components/common/ProtectedRoute";
import AdminRoute from "./components/common/AdminRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          {/* HOME */}

          <Route path="/" element={<Home />} />

          {/* PRODUCTS */}

          <Route path="/products" element={<Products />} />

          {/* PRODUCT DETAILS */}

          <Route path="/products/:id" element={<ProductDetails />} />

          {/* ORDER DETAILS */}

          <Route path="/orders/:orderId" element={<OrderDetails />} />

          {/* ADMIN ORDERS */}

          <Route path="/admin/orders" element={<AdminOrders />} />

          {/* ADMIN DASHBOARD */}

          <Route path="/admin" element={<AdminDashboard />} />

          {/* CART */}

          <Route path="/cart" element={<Cart />} />

          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <Checkout />
              </ProtectedRoute>
            }
          />

          <Route
            path="/orders"
            element={
              <ProtectedRoute>
                <Orders />
              </ProtectedRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
        </Route>

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
          <Route index element={<Dashboard />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
