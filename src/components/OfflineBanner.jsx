import React, { useEffect, useState } from "react";

const OfflineBanner = () => {
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  useEffect(() => {
    const handleOffline = () => setIsOffline(true);
    const handleOnline = () => setIsOffline(false);

    window.addEventListener("offline", handleOffline);
    window.addEventListener("online", handleOnline);

    return () => {
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("online", handleOnline);
    };
  }, []);

  if (!isOffline) return null;

  return (
    <div
      style={{
        background: "#ffcccc",
        color: "#a00",
        padding: "10px",
        textAlign: "center",
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        zIndex: 2000,
      }}
    >
      You are offline. Please check your internet connection.
    </div>
  );
};

export default OfflineBanner;
