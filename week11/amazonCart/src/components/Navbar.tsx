import { FaShoppingCart, FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div 
            className="text-xl font-bold cursor-pointer hover:text-blue-200 transition-colors"
            onClick={() => navigate("/")}
          >
            Amazon.in
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="text-sm">Hello, User</div>
            
            <div className="flex items-center space-x-4">
              <FaHeart 
                onClick={() => navigate("/wishlist")}
                className="text-xl cursor-pointer hover:text-pink-300 transition-colors"
                title="Wishlist"
              />
              <FaShoppingCart
                onClick={() => navigate("/cart")}
                className="text-xl cursor-pointer hover:text-blue-300 transition-colors"
                title="Cart"
              />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;