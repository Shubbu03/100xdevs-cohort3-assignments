import { ProductType } from "../types";

const ItemCard = (props: ProductType) => {
  return (
    <>
      <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white hover:shadow-xl transition-shadow duration-300">
        <div className="flex justify-center p-4 bg-gray-50">
          <img
            className="w-48 h-48 object-contain"
            src={props.imageUrl}
            alt={props.name}
          />
        </div>
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2 text-gray-800">
            {props.name}
          </div>
          <p className="text-gray-600 text-sm mb-2 line-clamp-2">
            {props.description}
          </p>
          <p className="text-green-600 font-bold text-lg">{props.price}</p>
        </div>
        <div className="px-6 py-4 flex space-x-3">
          {props.onWishlistClick && (
            <button
              onClick={props.onWishlistClick}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full w-full"
            >
              Add to Wishlist
            </button>
          )}
          {props.onCartClick && (
            <button
              onClick={props.onCartClick}
              className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded-full w-full"
            >
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default ItemCard;
