import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './pages/customer/CartContext';
import { OrdersProvider } from './pages/customer/OrdersContext';
import MainNavbar from './components/MainNavbar';
import HomePage from './pages/HomePage';
import Signup from './components/Signup';
import TechnicianManagement from './pages/admin/TechnicianManagement';

// Customer Pages
import Marketplace from './pages/customer/Marketplace';
import PCBuilder from './pages/customer/PCBuilder';
import FindTechnician from './pages/customer/FindTechnician';
import Orders from './pages/customer/Orders';
import CustomerProfile from './pages/customer/Profile';
import CustomerDashboard from './pages/customer/CustomerDashboard';

// Technician Pages
import TechnicianDashboard from './pages/technician/Dashboard';
import TechnicianServices from './pages/technician/Services';
import BuildRequests from './pages/technician/BuildRequests';
import TechnicianProfile from './pages/technician/Profile';
import Earnings from './pages/technician/Earnings';
import TechnicianReviews from './pages/technician/Reviews';
import Appointments from './pages/technician/Appointments';

// Admin Pages
import CustomerManagement from './pages/admin/CustomerManagement';
import OrderManagement from './pages/admin/OrderManagement';
import Analytics from './pages/admin/Analytics';
import SystemSettings from './pages/admin/SystemSettings';
import AdminMain from './pages/admin/AdminMain';
import SellerVerification from './pages/admin/SellerVerification';
import Reports from './pages/admin/Reports';

// Seller Pages
import ProductManagement from './pages/seller/ProductManagement';
import Inventory from './pages/seller/Inventory';
import SellerOrders from './pages/seller/Orders';
import SalesAnalytics from './pages/seller/Analytics';
import SellerProfile from './pages/seller/Profile';
import SellerMain from './pages/seller/SellerMain';
import Dashboard from './pages/seller/Dashboard';

import CustomerLayout from './pages/customer/CustomerLayout';
import AdminLayout from './pages/admin/AdminLayout';
import SellerLayout from './pages/seller/SellerLayout';
import TechnicianLayout from './pages/technician/TechnicianLayout';

function AppContent() {
  const location = useLocation();
  const hideNavbarRoutes = ["/customer", "/admin", "/seller", "/technician"];
  const shouldShowMainNavbar = !hideNavbarRoutes.includes(location.pathname);
  return (
    <>
      {shouldShowMainNavbar && <MainNavbar />}
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<Signup />} />
        
        {/* Customer Layout for all customer pages */}
        <Route element={<CustomerLayout />}>
          <Route path="/customer" element={<CustomerDashboard />} />
          <Route path="/customer/dashboard" element={<CustomerDashboard />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/pc-builder" element={<PCBuilder />} />
          <Route path="/find-technician" element={<FindTechnician />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/profile" element={<CustomerProfile />} />
        </Route>
        {/* Technician Layout for all technician pages */}
        <Route element={<TechnicianLayout />}>
          <Route path="/technician" element={<TechnicianDashboard />} />
          <Route path="/technician/dashboard" element={<TechnicianDashboard />} />
          <Route path="/technician/appointments" element={<Appointments />} />
          <Route path="/technician/profile" element={<TechnicianProfile />} />
          <Route path="/technician/services" element={<TechnicianServices />} />
          <Route path="/technician/build-requests" element={<BuildRequests />} />
          <Route path="/technician/earnings" element={<Earnings />} />
          <Route path="/technician/reviews" element={<TechnicianReviews />} />
        </Route>
        {/* Admin Layout for all admin pages */}
        <Route element={<AdminLayout />}>
          <Route path="/admin" element={<AdminMain />} />
          <Route path="/admin/customers" element={<CustomerManagement />} />
          <Route path="/admin/technicians" element={<TechnicianManagement />} />
          <Route path="/admin/seller-verification" element={<SellerVerification />} />
          <Route path="/admin/orders" element={<OrderManagement />} />
          <Route path="/admin/order-management" element={<OrderManagement />} />
          <Route path="/admin/analytics" element={<Analytics />} />
          <Route path="/admin/reports" element={<Reports />} />
          <Route path="/admin/system-settings" element={<SystemSettings />} />
        </Route>
        {/* Seller Layout for all seller pages */}
        <Route element={<SellerLayout />}>
          <Route path="/seller" element={<SellerMain />} />
          <Route path="/seller/products" element={<ProductManagement />} />
          <Route path="/seller/inventory" element={<Inventory />} />
          <Route path="/seller/orders" element={<SellerOrders />} />
          <Route path="/seller/analytics" element={<SalesAnalytics />} />
          <Route path="/seller/profile" element={<SellerProfile />} />
          <Route path="/seller/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <AuthProvider>
        <CartProvider>
          <OrdersProvider>
        <AppContent />
          </OrdersProvider>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;