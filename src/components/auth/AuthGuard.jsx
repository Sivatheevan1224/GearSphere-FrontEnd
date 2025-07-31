import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

/**
 * AuthGuard component that prevents authenticated users from accessing public routes
 * and redirects them to their appropriate dashboard
 */
const AuthGuard = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkAuthAndRedirect = async () => {
      const userType = sessionStorage.getItem("user_type");
      const justLoggedOut = sessionStorage.getItem("just_logged_out");

      // Don't redirect if user just logged out
      if (justLoggedOut) {
        return;
      }

      // Public routes that authenticated users shouldn't access
      const publicRoutes = ["/", "/register"];
      const currentPath = location.pathname;

      // If user is authenticated and trying to access a public route
      if (userType && publicRoutes.includes(currentPath)) {
        try {
          // Verify session with backend
          const response = await fetch(
            "http://localhost/gearsphere_api/GearSphere-BackEnd/getSession.php",
            {
              method: "GET",
              credentials: "include",
            }
          );

          if (response.ok) {
            const sessionData = await response.json();
            if (sessionData.success) {
              const type = userType.toLowerCase();
              console.log(
                `🚫 AuthGuard: Preventing authenticated ${type} from accessing ${currentPath}`
              );

              // Redirect to appropriate dashboard with replace to prevent back navigation
              if (type === "admin") {
                navigate("/admin", { replace: true });
              } else if (type === "customer") {
                navigate("/customer/dashboard", { replace: true });
              } else if (type === "seller") {
                navigate("/seller", { replace: true });
              } else if (type === "technician") {
                navigate("/technician/dashboard", { replace: true });
              }

              // Additional history manipulation
              setTimeout(() => {
                window.history.replaceState(null, null, window.location.href);
              }, 100);
            } else {
              // Session invalid, clear storage
              console.log("🗑️ AuthGuard: Invalid session, clearing user_type");
              sessionStorage.removeItem("user_type");
            }
          } else {
            // Session check failed, clear storage
            console.log(
              "🗑️ AuthGuard: Session check failed, clearing user_type"
            );
            sessionStorage.removeItem("user_type");
          }
        } catch (error) {
          console.error("AuthGuard: Session verification failed:", error);
          sessionStorage.removeItem("user_type");
        }
      }
    };

    checkAuthAndRedirect();
  }, [navigate, location.pathname]);

  // Add additional protection on window focus
  useEffect(() => {
    const handleFocus = () => {
      const userType = sessionStorage.getItem("user_type");
      const justLoggedOut = sessionStorage.getItem("just_logged_out");
      const publicRoutes = ["/", "/register"];

      if (
        userType &&
        !justLoggedOut &&
        publicRoutes.includes(location.pathname)
      ) {
        console.log(
          "🔄 AuthGuard: Window focus - redirecting authenticated user"
        );
        const type = userType.toLowerCase();

        if (type === "admin") {
          navigate("/admin", { replace: true });
        } else if (type === "customer") {
          navigate("/customer/dashboard", { replace: true });
        } else if (type === "seller") {
          navigate("/seller", { replace: true });
        } else if (type === "technician") {
          navigate("/technician/dashboard", { replace: true });
        }
      }
    };

    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, [navigate, location.pathname]);

  return children;
};

export default AuthGuard;
