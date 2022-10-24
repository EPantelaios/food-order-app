import { useReducer, useEffect } from 'react';

import CartContext from './cart-context';

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  if (action.type === 'ADD') {
    const updatedTotalAmount = state.totalAmount + action.item.price;

    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    const existingCartItem = state.items[existingCartItemIndex];
    let updatedItems;

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + 1,
      };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.item);
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  if (action.type === 'REMOVE') {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const existingItem = state.items[existingCartItemIndex];
    const updatedTotalAmount = state.totalAmount - existingItem.price;
    let updatedItems;
    if (existingItem.amount === 1) {
      updatedItems = state.items.filter((item) => item.id !== action.id);
    } else {
      const updatedItem = { ...existingItem, amount: existingItem.amount - 1 };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    }

    return {
      items: updatedItems,
      totalAmount: Math.abs(updatedTotalAmount),
    };
  }

  if (action.type === 'CLEAR') {
    return defaultCartState;
  }

  if (action.type === 'DISPLAY') {
    console.log('DISPLAY');
    console.log('action:', action);
    return {
      items: action.items,
      totalAmount: Math.abs(action.totalAmount),
    };
  }

  return defaultCartState;
};

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemToCartHandler = (item) => {
    dispatchCartAction({ type: 'ADD', item: item });
  };

  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({ type: 'REMOVE', id: id });
  };

  const clearCartHandler = () => {
    dispatchCartAction({ type: 'CLEAR' });
  };

  const displayCartInfoHandler = (items, totalAmount) => [
    dispatchCartAction({
      type: 'DISPLAY',
      items: items,
      totalAmount: totalAmount,
    }),
  ];

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
    clearCart: clearCartHandler,
  };

  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch(
        'https://order-food-app-ad148-default-rtdb.europe-west1.firebasedatabase.app/cart.json'
      );
      const responseData = await response.json();

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      let items = [];
      responseData?.items != null &&
        Object.entries(responseData.items).map((item, index) => {
          console.log('item:', index, item[1]);
          return items.push(item[1]);
        });

      return displayCartInfoHandler(
        items || [],
        responseData?.totalAmount || 0
      );
    };

    fetchMeals();
  }, []);

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
