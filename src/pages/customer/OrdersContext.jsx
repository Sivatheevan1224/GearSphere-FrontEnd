import React, { createContext, useContext, useState, useEffect } from 'react';

const OrdersContext = createContext();

export const useOrders = () => {
  const context = useContext(OrdersContext);
  if (!context) {
    throw new Error('useOrders must be used within an OrdersProvider');
  }
  return context;
};

export const OrdersProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);

  // Load orders from localStorage on component mount
  useEffect(() => {
    const savedOrders = localStorage.getItem('customerOrders');
    if (savedOrders) {
      try {
        setOrders(JSON.parse(savedOrders));
      } catch (error) {
        console.error('Error loading orders from localStorage:', error);
        setOrders([]);
      }
    }
  }, []);

  // Save orders to localStorage whenever orders changes
  useEffect(() => {
    localStorage.setItem('customerOrders', JSON.stringify(orders));
  }, [orders]);

  const addOrder = (orderData) => {
    const newOrder = {
      id: `ORD${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      status: 'Processing',
      total: orderData.total,
      items: orderData.items,
      shippingAddress: orderData.shippingAddress || 'Default Address',
      trackingNumber: `TRK${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      paymentMethod: orderData.paymentMethod,
      paymentStatus: 'Paid'
    };

    setOrders(prevOrders => [newOrder, ...prevOrders]);
    return newOrder;
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(prevOrders =>
      prevOrders.map(order =>
        order.id === orderId
          ? { ...order, status: newStatus }
          : order
      )
    );
  };

  const getOrderById = (orderId) => {
    return orders.find(order => order.id === orderId);
  };

  const getOrdersByStatus = (status) => {
    return orders.filter(order => order.status === status);
  };

  const value = {
    orders,
    addOrder,
    updateOrderStatus,
    getOrderById,
    getOrdersByStatus
  };

  return (
    <OrdersContext.Provider value={value}>
      {children}
    </OrdersContext.Provider>
  );
};

export { OrdersContext }; 