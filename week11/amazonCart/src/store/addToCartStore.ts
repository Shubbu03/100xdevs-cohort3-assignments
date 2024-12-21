import { atom } from "recoil";
import { CartType } from "../types";

export const addToCartAtom = atom<Array<CartType>>({
  key: "addToCart",
  default: [] as Array<CartType>,
});
