import React from 'react';
import { MealItemProps } from '../../components/Meals/MealItem/MealItem';

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
  // eslint-disable-next-line
  addItem: (item) => {},
  // eslint-disable-next-line
  removeItem: (id) => {},
  clearCart: () => {},
});

export default CartContext;
