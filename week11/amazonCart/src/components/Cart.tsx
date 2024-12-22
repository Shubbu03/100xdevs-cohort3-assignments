import { useRecoilValue, useSetRecoilState } from "recoil";
import Navbar from "./Navbar";
import { addToCartAtom } from "../store/addToCartStore";

const Cart = () => {
  const cartProducts = useRecoilValue(addToCartAtom);
  const setCartProducts = useSetRecoilState(addToCartAtom);

  const updateQuantity = (id: number | undefined, change: number) => {
    setCartProducts((prevCart) =>
      prevCart.map((item) =>
        item.id === id
          ? { ...item, cartQuantity: Math.max(1, item.cartQuantity + change) }
          : item
      )
    );
  };

  const deleteItem = (id: number | undefined) => {
    setCartProducts((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const total = cartProducts.reduce(
    (sum, item) =>
      sum +
      (typeof item.price === "string" ? parseFloat(item.price) : item.price) *
        item.cartQuantity,
    0
  );

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8">
          {/* Main Cart Section */}
          <div className="lg:w-2/3 bg-white rounded-lg shadow p-6">
            <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>

            <div className="space-y-6">
              {cartProducts.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col sm:flex-row gap-4 pb-6 border-b"
                >
                  <div className="w-24 h-24 bg-gray-200 rounded-md"></div>
                  <div className="flex-grow">
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-green-600 text-sm">In stock</p>

                    <div className="mt-4 flex items-center gap-4">
                      <div className="flex items-center border rounded-md">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="px-3 py-1 hover:bg-gray-100"
                        >
                          -
                        </button>
                        <span className="px-3 py-1">{item.cartQuantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="px-3 py-1 hover:bg-gray-100"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => deleteItem(item.id)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-medium">₹{item.price}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>
              <div className="flex justify-between mb-4">
                <span>Items ({cartProducts.length}):</span>
                <span>₹{total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold mb-6">
                <span>Order Total:</span>
                <span>₹{total.toFixed(2)}</span>
              </div>
              <button className="w-full bg-yellow-400 py-2 px-4 rounded hover:bg-yellow-500 transition-colors">
                Proceed to Buy
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
