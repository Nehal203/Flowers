import { createContext, useContext, useState, useEffect } from 'react';

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedWishlist = localStorage.getItem('wishlist');
      return savedWishlist ? JSON.parse(savedWishlist) : [];
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const addToWishlist = (product) => {
    setWishlist(prevWishlist => {
      const productWithImages = {
        ...product,
        image_url: product.images && Array.isArray(product.images) && product.images.length > 0 
          ? product.images[0] 
          : product.image_url || '/placeholder-product.jpg',
        image: product.images && Array.isArray(product.images) && product.images.length > 0 
          ? product.images[0] 
          : product.image || product.image_url || '/placeholder-product.jpg'
      };

      const existingItem = prevWishlist.find(item => item.id === product.id);
      if (!existingItem) {
        return [...prevWishlist, productWithImages];
      }
      return prevWishlist;
    });
  };

  const removeFromWishlist = (productId) => {
    setWishlist(prevWishlist => 
      prevWishlist.filter(item => item.id !== productId)
    );
  };

  const isInWishlist = (productId) => {
    return wishlist.some(item => item.id === productId);
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        wishlistCount: wishlist.length,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
