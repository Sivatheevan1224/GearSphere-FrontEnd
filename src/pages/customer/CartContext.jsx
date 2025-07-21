import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

const CartContext = createContext();
const BACKEND_URL = "http://localhost/gearsphere_api/GearSphere-BackEnd/";

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  const fetchCart = async () => {
    const user_id = sessionStorage.getItem("user_id");
    if (!user_id) {
      setCartItems([]); // Clear cart if no user is logged in
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const response = await axios.get(
        `${BACKEND_URL}getCart.php?user_id=${user_id}`
      );
      if (response.data.success && Array.isArray(response.data.cart)) {
        // Add full image URL to each cart item
        const itemsWithFullImageUrl = response.data.cart.map((item) => ({
          ...item,
          image_url: item.image_url ? `${BACKEND_URL}${item.image_url}` : null,
        }));
        setCartItems(itemsWithFullImageUrl);
      } else {
        setCartItems([]);
      }
    } catch (error) {
      console.error("Failed to fetch cart:", error);
      setCartItems([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch cart on initial load or when user_id changes
  useEffect(() => {
    fetchCart();
  }, [location.pathname]);

  const addToCart = async (product) => {
    const user_id = sessionStorage.getItem("user_id");
    if (!user_id) {
      alert("Please log in to add items to your cart.");
      return;
    }
    try {
      await axios.post(`${BACKEND_URL}addToCart.php`, {
        user_id,
        product_id: product.id,
        quantity: 1,
      });
      await fetchCart(); // Refetch cart to update state with the latest data
    } catch (error) {
      console.error("Failed to add to cart:", error);
      // Optionally show an error toast to the user
    }
  };

  const removeFromCart = async (productId) => {
    const user_id = sessionStorage.getItem("user_id");
    if (!user_id) return;
    try {
      await axios.post(`${BACKEND_URL}removeFromCart.php`, {
        user_id,
        product_id: productId,
      });
      await fetchCart();
    } catch (error) {
      console.error("Failed to remove from cart:", error);
    }
  };

  const updateQuantity = async (productId, newQuantity) => {
    const user_id = sessionStorage.getItem("user_id");
    if (!user_id) return;
    try {
      await axios.post(`${BACKEND_URL}updateCartQuantity.php`, {
        user_id,
        product_id: productId,
        quantity: newQuantity,
      });
      await fetchCart();
    } catch (error) {
      console.error("Failed to update quantity:", error);
    }
  };

  const clearCart = async () => {
    const user_id = sessionStorage.getItem("user_id");
    if (!user_id) return;
    try {
      await axios.post(`${BACKEND_URL}clearCart.php`, { user_id });
      setCartItems([]); // Optimistic update for immediate UI feedback
    } catch (error) {
      console.error("Failed to clear cart:", error);
    }
  };

  const getCartTotal = () => {
    return cartItems.reduce(
      (total, item) => total + Number(item.price) * item.quantity,
      0
    );
  };

  const getCartCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  const isInCart = (productId) => {
    return cartItems.some((item) => item.id === productId);
  };

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartCount,
    isInCart,
    loading,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export { CartContext };
