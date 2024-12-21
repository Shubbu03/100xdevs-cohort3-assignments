import { useRecoilValue, useSetRecoilState } from "recoil";
import { addToWishlistAtom } from "../store/addToWishlistStore";
import ItemCard from "./ItemCard";
import Navbar from "./Navbar";
import { ProductType, CartType } from "../types";
import { addToCartAtom } from "../store/addToCartStore";

const Wishlist = () => {
  const wishListProducts = useRecoilValue(addToWishlistAtom);
  const setItemToCart = useSetRecoilState(addToCartAtom);

  const addToCart = (item: ProductType) => {
    setItemToCart((prevItems: CartType[]) => {
      const existingItem = prevItems.find(
        (prevItem: CartType) => prevItem.id === item.id
      );
      if (existingItem) {
        if (existingItem.cartQuantity < item.quantity) {
          alert("Item quantity updated in cart!");
          return prevItems.map((cartItem: CartType) =>
            cartItem.id === item.id
              ? { ...cartItem, cartQuantity: cartItem.cartQuantity + 1 }
              : cartItem
          );
        } else {
          alert("Maximum available quantity reached!");
          return prevItems;
        }
      }
      const cartItem: CartType = { ...item, cartQuantity: 1 };
      alert("Added to cart!");
      return [...prevItems, cartItem];
    });
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
          {wishListProducts.length ? (
            wishListProducts.map((item) => (
              <ItemCard
                key={item.id}
                name={item.name}
                description={item.description}
                quantity={item.quantity}
                price={`₹ ${item.price}`}
                imageUrl={item.imageUrl}
                onCartClick={() => addToCart(item)}
              />
            ))
          ) : (
            <>
              <div>
                You dont have any item in the wishlist!! Add some to see here
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Wishlist;
