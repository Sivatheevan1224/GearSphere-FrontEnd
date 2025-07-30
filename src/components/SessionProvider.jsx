import React, { useEffect } from "react";
import useSessionValidation from "../hooks/useSessionValidation";

const SessionProvider = ({ children }) => {
  const { checkSessionOnMount, startPeriodicValidation } =
    useSessionValidation();

  useEffect(() => {
    // Check session when component mounts (page refresh)
    checkSessionOnMount();

    // Start periodic session validation
    const cleanup = startPeriodicValidation();

    // Handle page visibility change (when user returns to tab)
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        const currentPath = window.location.pathname;
        const isPublicRoute =
          currentPath === "/" || currentPath === "/register";
        const userType = localStorage.getItem("userType");
        const userId = localStorage.getItem("userId");

        // Only check session if user is logged in and not on public routes
        if (userType && userId && !isPublicRoute) {
          checkSessionOnMount();
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Cleanup on unmount
    return () => {
      cleanup();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [checkSessionOnMount, startPeriodicValidation]);

  return <>{children}</>;
};

export default SessionProvider;
