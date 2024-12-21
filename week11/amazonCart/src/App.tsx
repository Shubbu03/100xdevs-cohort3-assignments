import { BrowserRouter, Route, Routes } from "react-router-dom";
import Cart from "./components/Cart";
import Wishlist from "./components/Wishlist";
import Landing from "./components/Landing";
import { RecoilRoot } from "recoil";

function App() {
  return (
    <>
      <RecoilRoot>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </BrowserRouter>
      </RecoilRoot>
    </>
  );
}

export default App;
