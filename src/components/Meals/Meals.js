import { useEffect, useContext } from 'react';

import CartContext from '../../store/cart/cart-context';
import AvailableMeals from './AvailableMeals';
import MealsSummary from './MealsSummary';

const Meals = () => {
  const cartCtx = useContext(CartContext);

  useEffect(() => {
    const updateNewMeals = async () => {
      await fetch(
        'https://order-food-app-ad148-default-rtdb.europe-west1.firebasedatabase.app/cart.json',
        {
          method: 'PUT',
          body: cartCtx.items.length
            ? JSON.stringify({
                items: cartCtx.items,
                totalAmount: cartCtx.totalAmount,
              })
            : JSON.stringify({
                items: [],
                totalAmount: 0,
              }),
        }
      );
    };

    updateNewMeals().catch((error) => {
      console.error(error.message);
    });
  }, [cartCtx.items, cartCtx.totalAmount]);

  return (
    <>
      <MealsSummary />
      <AvailableMeals />
    </>
  );
};

export default Meals;
