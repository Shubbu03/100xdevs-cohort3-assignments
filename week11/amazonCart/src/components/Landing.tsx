import { useSetRecoilState } from "recoil";
import ItemCard from "./ItemCard";
import Navbar from "./Navbar";
import { addToWishlistAtom } from "../store/addToWishlistStore";
import { addToCartAtom } from "../store/addToCartStore";
import { CartType, ProductType } from "../types";

const products = [
  {
    id: 1,
    name: "Keyboard",
    description: "The best Keyboard you can buy!!",
    quantity: 10,
    price: 1000,
    imageUrl:
      "https://m.media-amazon.com/images/I/61JyZxQ36lL._AC_UF1000,1000_QL80_.jpg",
  },
  {
    id: 2,
    name: "Usb",
    description: "adapter for macs",
    quantity: 5,
    price: 350,
    imageUrl:
      "https://www.belkin.com/dw/image/v2/BGBH_PRD/on/demandware.static/-/Sites-master-product-catalog-blk/default/dw35fc2389/images/hi-res/8/24ab26877cf66a7a_Copy%20of%20AVI207_UsbC5in1Adapter_Top_Angled_Web.png?sw=700&sh=700&sm=fit",
  },
  {
    id: 3,
    name: "Monitor",
    description: "4k tv for you",
    quantity: 6,
    price: 10000,
    imageUrl:
      "https://www.lg.com/content/dam/channel/wcms/in/images/tvs/43uq7350pta_atrq_eail_in_c/43UQ7350PTA-Basic-450.jpg",
  },
];

const Landing = () => {
  const setItemToWishlist = useSetRecoilState(addToWishlistAtom);
  const setItemToCart = useSetRecoilState(addToCartAtom);

  const addToWishlist = (item: ProductType) => {
    setItemToWishlist((prevItems: ProductType[]) => {
      const exists = prevItems.some(
        (prevItem: ProductType) => prevItem.id === item.id
      );
      if (exists) {
        alert("Item already in wishlist!");
        return prevItems;
      }
      alert("Added to wishlist!");
      return [...prevItems, item];
    });
  };

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
          {products.map((item) => (
            <ItemCard
              key={item.id}
              name={item.name}
              description={item.description}
              quantity={item.quantity}
              price={`₹ ${item.price}`}
              imageUrl={item.imageUrl}
              onWishlistClick={() => addToWishlist(item)}
              onCartClick={() => addToCart(item)}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Landing;
