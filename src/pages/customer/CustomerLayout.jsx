import React, { useEffect, useState } from "react";
import CustomerNavbar from "../pageNavbars/CustomerNavbar";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import DashboardFooter from "../pagefooter/DashboardFooter";
import { CartProvider } from "./CartContext";
import { OrdersProvider } from "./OrdersContext";
import useLayoutSessionValidation from "../../hooks/useLayoutSessionValidation";

function CustomerLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoading, isAuthenticated } = useLayoutSessionValidation("customer");

  // Define public routes that don't require authentication
  const publicRoutes = [
    "/marketplace",
    "/pc-builder",
    "/cpu",
    "/gpu",
    "/motherboard",
    "/memory",
    "/storage",
    "/powersupply",
    "/case",
    "/cpucooler",
    "/monitor",
    "/operatingsystem",
    "/compare-cpu",
    "/compare-gpu",
    "/compare-motherboard",
    "/compare-memory",
    "/compare-storage",
    "/compare-powersupply",
    "/compare-case",
    "/compare-cpucooler",
    "/compare-monitor",
    "/compare-operatingsystem",
  ];

  const isPublicRoute = publicRoutes.includes(location.pathname);

  if (isLoading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div>Loading...</div>
      </div>
    );
  }

  // For public routes, allow access even without authentication
  if (!isAuthenticated && !isPublicRoute) {
    return null; // Will redirect in useLayoutSessionValidation hook
  }

  return (
    <CartProvider>
      <OrdersProvider>
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <CustomerNavbar fixed="top" />
          <div style={{ flex: "1 0 auto", marginTop: 80 }}>
            <Outlet />
          </div>
          <DashboardFooter />
        </div>
      </OrdersProvider>
    </CartProvider>
  );
}

export default CustomerLayout;
