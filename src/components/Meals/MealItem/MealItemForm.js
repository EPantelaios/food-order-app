import Input from '../../UI/Input';
import classes from './MealItemForm.module.css';
import { useRef } from 'react';

const MealItemForm = (props) => {
  const inputRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();
    props.onAddToCart(+inputRef.current.value);
  };

  return (
    <form className={classes.form} type="submit" onSubmit={submitHandler}>
      <Input
        ref={inputRef}
        label="Amount"
        input={{
          id: 'amount_' + props.id,
          type: 'number',
          min: '1',
          max: '5',
          step: '1',
          defaultValue: '1',
        }}
      />
      <button>Add</button>
    </form>
  );
};

export default MealItemForm;
