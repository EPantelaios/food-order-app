import { useContext } from 'react';

import CartContext from '../../../store/cart/cart-context';
import classes from './MealItem.module.css';
import MealItemForm from './MealItemForm';

export type MealItemProps = {
  id: string;
  name: string;
  price: number;
  description: string;
};

const MealItem = (props: MealItemProps) => {
  const cartContext = useContext(CartContext);

  const price = `${props.price.toFixed(2)} €`;

  const addToCartHandler = (amount) => {
    cartContext.addItem({
      id: props.id,
      name: props.name,
      amount: amount,
      price: props.price,
    });
  };

  return (
    <li className={classes.meal}>
      <div>
        <h3>{props.name}</h3>
        <div className={classes.description}>{props.description}</div>
        <div className={classes.price}>{price}</div>
      </div>
      <div>
        <MealItemForm id={props.id} onAddToCart={addToCartHandler} />
      </div>
    </li>
  );
};

export default MealItem;
