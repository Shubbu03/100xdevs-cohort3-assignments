export interface ProductType {
  id?: number;
  name: string;
  description: string;
  quantity: number;
  price: number | string;
  imageUrl: string;
  onWishlistClick?: () => void;
  onCartClick?: () => void;
}

export interface CartType extends ProductType {
  cartQuantity: number;
}
