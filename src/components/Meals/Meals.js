import { useEffect, useContext } from 'react';
import MealsSummary from './MealsSummary';
import AvailableMeals from './AvailableMeals';
import CartContext from '../../store/cart-context';

const Meals = () => {
  const cartCtx = useContext(CartContext);

  useEffect(() => {
    console.log('items', cartCtx.items);

    const updateNewMeals = async () => {
      console.log(cartCtx.items);
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
    updateNewMeals();
  }, [cartCtx.items, cartCtx.totalAmount]);

  return (
    <>
      <MealsSummary />
      <AvailableMeals />
    </>
  );
};

export default Meals;
