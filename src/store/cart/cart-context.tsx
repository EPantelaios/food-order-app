import React from 'react';

const CartContext = React.createContext({
  items: [],
  totalAmount: 0,
  // eslint-disable-next-line
  addItem: (item) => {},
  // eslint-disable-next-line
  removeItem: (id) => {},
  clearCart: () => {},
});

export default CartContext;
