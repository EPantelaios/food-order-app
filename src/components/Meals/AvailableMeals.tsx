import { useState, useRef, useCallback, useEffect } from 'react';

import Card from '../UI/Card';
import classes from './AvailableMeals.module.css';
import MealItem from './MealItem/MealItem';
import SearchInput from './SearchInput';

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [httpError, setHttpError] = useState<string>();
  const searchInputRef = useRef<HTMLInputElement>();
  const initMeals = useRef<any>([]);

  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch(
        'https://order-food-app-ad148-default-rtdb.europe-west1.firebasedatabase.app/meals.json'
      );
      const responseData = await response.json();

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const totalMeals = [];
      Object.entries(responseData).map((meal: any) => {
        return totalMeals.push({
          id: meal[0],
          name: meal[1].name,
          description: meal[1].description,
          price: meal[1].price,
        });
      });

      setMeals(totalMeals);
      setIsLoading(false);
      initMeals.current.value = totalMeals;
    };

    fetchMeals().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, []);

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
    if (!query) return initMeals.current.value;

    const queryLowerCase = query.toLowerCase();
    return initMeals.current.value?.filter((item) => {
      return item.name.toLowerCase().includes(queryLowerCase);
    });
  }, []);

  const onChangeSearch = () => {
    const newMeals = filteredItems(searchInputRef.current.value);
    setMeals(newMeals);
  };

  if (isLoading) {
    return (
      <section className={classes.MealsLoading}>
        <p>Loading...</p>
      </section>
    );
  }

  if (httpError) {
    return (
      <section className={classes.MealsError}>
        <p>{httpError}</p>
      </section>
    );
  }

  return (
    <section className={classes.meals}>
      <Card>
        <SearchInput
          titleClassName={classes.title}
          inputClassName={classes.search}
          title="Search Meals:"
          onChange={onChangeSearch}
          ref={searchInputRef}
        />
        {isLoading && (
          <section className={classes.MealsLoading}>
            <p>Loading...</p>
          </section>
        )}
        {httpError && (
          <section className={classes.MealsError}>
            <p>{httpError}</p>
          </section>
        )}
        {!isLoading && !httpError && <ul>{mealsList}</ul>}
      </Card>
    </section>
  );
};

export default AvailableMeals;
