import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // Load initial cart from localStorage
  const [cartItems, setCartItems] = useState(() => {
    try {
      const savedCart = localStorage.getItem('bloomora_cart');
      return savedCart ? JSON.parse(savedCart) : [];
    } catch {
      return [];
    }
  });

  // Wishlist/Favorites stored in localStorage
  const [favorites, setFavorites] = useState(() => {
    try {
      const savedFavs = localStorage.getItem('bloomora_favorites');
      return savedFavs ? JSON.parse(savedFavs) : [];
    } catch {
      return [];
    }
  });

  // Notification toast state for adding flowers to cart
  const [toastMessage, setToastMessage] = useState(null);

  // Sync cart with localStorage
  useEffect(() => {
    try {
      localStorage.setItem('bloomora_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [cartItems]);

  // Sync favorites with localStorage
  useEffect(() => {
    try {
      localStorage.setItem('bloomora_favorites', JSON.stringify(favorites));
    } catch (e) {
      console.error('Failed to save favorites to localStorage', e);
    }
  }, [favorites]);

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  // Add item to cart
  const addToCart = (product, quantity = 1) => {
    const qty = Math.max(1, parseInt(quantity, 10) || 1);
    const productId = product._id || product.id;

    setCartItems((prevItems) => {
      const existingIndex = prevItems.findIndex(
        (item) => (item._id || item.id) === productId
      );

      if (existingIndex > -1) {
        // Increase existing quantity
        const updated = [...prevItems];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + qty,
        };
        return updated;
      } else {
        // Add new item
        return [
          ...prevItems,
          {
            ...product,
            _id: productId,
            quantity: qty,
          },
        ];
      }
    });

    showToast(`Added ${qty} × "${product.name}" to your basket! 🌸`);
  };

  // Remove single item completely
  const removeFromCart = (productId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => (item._id || item.id) !== productId)
    );
  };

  // Increase quantity by 1
  const increaseQuantity = (productId) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        (item._id || item.id) === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  // Decrease quantity by 1 (or remove if 1)
  const decreaseQuantity = (productId) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) => {
          if ((item._id || item.id) === productId) {
            return { ...item, quantity: item.quantity - 1 };
          }
          return item;
        })
        .filter((item) => item.quantity > 0)
    );
  };

  // Clear entire cart
  const clearCart = () => {
    setCartItems([]);
  };

  // Toggle favorite / wishlist
  const toggleFavorite = (productId) => {
    setFavorites((prev) => {
      if (prev.includes(productId)) {
        return prev.filter((id) => id !== productId);
      } else {
        return [...prev, productId];
      }
    });
  };

  const isFavorite = (productId) => favorites.includes(productId);

  // Calculations
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + (Number(item.price) || 0) * item.quantity,
    0
  );

  // Delivery calculation: Free delivery over $60, otherwise $5.00 delivery fee
  const deliveryFee = subtotal === 0 ? 0 : subtotal > 60 ? 0 : 5.0;
  const totalAmount = subtotal + deliveryFee;

  return (
    <CartContext.Provider
      value={{
        cartItems,
        totalItems,
        subtotal,
        deliveryFee,
        totalAmount,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        favorites,
        toggleFavorite,
        isFavorite,
        toastMessage,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
