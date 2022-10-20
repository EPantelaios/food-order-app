import { useState, useEffect, useRef, useCallback } from 'react';

import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import classes from './AvailableMeals.module.css';
import SearchInput from './SearchInput';

const ALL_MEALS = [
  {
    id: 'm1',
    name: 'Sushi',
    description: 'Finest fish and veggies',
    price: 22.99,
  },
  {
    id: 'm2',
    name: 'Schnitzel',
    description: 'A german specialty!',
    price: 16.5,
  },
  {
    id: 'm3',
    name: 'Barbecue Burger',
    description: 'American, raw, meaty',
    price: 12.99,
  },
  {
    id: 'm4',
    name: 'Green Bowl',
    description: 'Healthy...and green...',
    price: 18.99,
  },
];

const AvailableMeals = () => {
  const [meals, setMeals] = useState(ALL_MEALS);
  const searchInputRef = useRef('');

  const mealsList = meals?.map((meal) => {
    return (
      <MealItem
        key={meal.id}
        id={meal.id}
        name={meal.name}
        description={meal.description}
        price={meal.price}
      />
    );
  });

  const filteredItems = useCallback((query) => {
    if (!query) return ALL_MEALS;

    const queryLowerCase = query.toLowerCase();
    return ALL_MEALS.filter((item) => {
      return item.name.toLowerCase().includes(queryLowerCase);
    });
  }, []);

  const onChangeSearch = () => {
    const newMeals = filteredItems(searchInputRef.current.value);
    setMeals(newMeals);
  };

  return (
    <section className={classes.meals}>
      <Card>
        <SearchInput
          titleClassName={classes.title}
          inputClassName={classes.search}
          title="Search Meals:"
          items={ALL_MEALS}
          onChange={onChangeSearch}
          ref={searchInputRef}
        />
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
