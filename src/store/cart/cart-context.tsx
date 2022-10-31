/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';

type CartItemProps = {
  id: string;
  name: string;
  amount: number;
  price: number;
};

type Props = {
  items: CartItemProps[];
  totalAmount: number;
  addItem: (item: CartItemProps) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
};

const CartContext = React.createContext<Props>({
  items: [],
  totalAmount: 0,
  addItem: (item) => {},
  removeItem: (id) => {},
  clearCart: () => {},
});

export default CartContext;
