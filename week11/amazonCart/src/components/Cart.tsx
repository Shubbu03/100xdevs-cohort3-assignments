import { useRecoilValue } from "recoil";

import ItemCard from "./ItemCard";
import Navbar from "./Navbar";
import { addToCartAtom } from "../store/addToCartStore";

const Cart = () => {
  const cartProducts = useRecoilValue(addToCartAtom);

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
          {cartProducts.length ? (
            cartProducts.map((item) => (
              <ItemCard
                key={item.id}
                name={item.name}
                description={item.description}
                quantity={item.quantity}
                price={`₹ ${item.price}`}
                imageUrl={item.imageUrl}
                // onWishlistClick={() => addToWishlist(item)}
                // onCartClick={() => addToCart(item)}
              />
            ))
          ) : (
            <>
              <div>
                You dont have any item in the cart!! Add some to see here
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Cart;
