import { atom } from "recoil";
import { ProductType } from "../types";

export const addToWishlistAtom = atom<Array<ProductType>>({
  key: "addToWishlist",
  default: [] as Array<ProductType>,
});
