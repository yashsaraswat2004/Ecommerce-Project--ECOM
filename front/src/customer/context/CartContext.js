import { createContext, useState, useContext } from "react";
import data from "../ShopByCategory/data";
export const CartContext = createContext();

export const CartProvider = ({ children, initialPrice, onPriceChange }) => {
  const [price, setPrice] = useState(initialPrice); // Total price state
  const [cartItems, setCartItems] = useState([]); // Array to store items in cart
  const [wishlistItems, setWishlistItems] = useState([]); // Array to store wishlist items
  const [count, setCount] = useState(0);
  // Function to calculate total price of all items in the cart
  const calculateTotalPrice = (cartItems) => {
    const totalPrice = cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    setPrice(totalPrice);
    if (onPriceChange) {
      onPriceChange(totalPrice);
    }
  };

  // Increment the quantity of a specific product
  const increment = (productId) => {
    setCartItems((prevCartItems) => {
      const updatedCart = prevCartItems.map((item) => {
        if (item.id === productId) {
          const newQuantity = item.quantity + 1;
          return { ...item, quantity: newQuantity };
        }
        return item;
      });
      calculateTotalPrice(updatedCart); // Use the updated cart
      return updatedCart; // Return the updated cart
    });
  };

  const addToCart = (product) => {
    const existingProduct = cartItems.find((item) => item.id === product.id);
    if (existingProduct) {
      increment(product.id); // Increment the quantity if product exists
    } else {
      setCartItems((prevCartItems) => {
        const updatedCart = [...prevCartItems, { ...product, quantity: 1 }];
        calculateTotalPrice(updatedCart); // Update the price after adding a new product
        return updatedCart;
      });
    }
  };

  const addToWishlist = (product) => {
    if (!wishlistItems.find((item) => item.id === product.id)) {
      setWishlistItems([...wishlistItems, product]);
    }
  };

  const removeFromWishlist = (id) => {
    setWishlistItems(wishlistItems.filter((item) => item.id !== id));
  };

  const removeFromCart = (id) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
    calculateTotalPrice(updatedCart); // Update price after removing an item
  };

  const updateItemQuantity = (id, newQuantity) => {
    setCartItems((prevCartItems) => {
      const updatedCart = prevCartItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      );
      calculateTotalPrice(updatedCart); // Use the updated cart
      return updatedCart; // Return the updated cart
    });
  };

  // displaying products based  on product categories
  const [productList, setProductList] = useState([]);
  const ShowproductList = ({
    categoryId = null,
    subcategoryId = null,
    thirdcategoryId = null,
  }) => {
    const filtered = data.products.filter((product) => {
      // Check categoryId
      const isCategoryMatch = categoryId
        ? product.categoryId === categoryId
        : true;

      // Check subcategoryId if provided
      const isSubcategoryMatch = subcategoryId
        ? product.subcategoryId === subcategoryId
        : true;

      // Check thirdcategoryId if provided
      const isThirdcategoryMatch = thirdcategoryId
        ? product.thirdcategoryId === thirdcategoryId
        : true;

      return isCategoryMatch && isSubcategoryMatch && isThirdcategoryMatch;
    });

    setProductList(filtered);
    console.log(filtered);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        wishlistItems,
        count,
        setCount: (newCount) => setCount(newCount),
        addToCart,
        addToWishlist,
        removeFromWishlist,
        removeFromCart,
        updateItemQuantity,
        price,
        ShowproductList,
        productList,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return {
    count: context.count,
    setCount: context.setCount,
    // Add other properties that you need
  };
};
