import React, { useEffect, useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import {
  allMeals,
  allDrinks,
  getCategories,
} from '../services/APIsFetch';

export default function Recipes() {
  const [recipesData, setRecipesData] = useState([]);
  const [specificCategory, setSpecificCategory] = useState([]);
  const maxLength = 12;

  const history = useHistory();

  const serverParameter = useCallback(() => {
    if (history.location.pathname === '/meals') {
      const server = 'themealdb';
      return server;
    }
    if (history.location.pathname === '/drinks') {
      const server = 'thecocktaildb';
      return server;
    }
  }, [
    history.location.pathname,
  ]);

  const fetchCategory = useCallback(async () => {
    setSpecificCategory(specificCategory);
    const categories = await getCategories(serverParameter(), specificCategory);
    return categories;
  }, [
    serverParameter,
    specificCategory,
  ]);

  const firstTwelve = useCallback(async () => {
    if (history.location.pathname === '/meals') {
      const meals = await allMeals();
      const twelveMeals = meals.meals.slice(0, maxLength);
      setRecipesData(twelveMeals || []);
    } else if (history.location.pathname === '/drinks') {
      const drinks = await allDrinks();
      const twelveDrinks = drinks.drinks.slice(0, maxLength);
      setRecipesData(twelveDrinks || []);
    }
  }, [
    history.location.pathname,
  ]);

  useEffect(() => {
    fetchCategory();
    firstTwelve();
  }, [
    fetchCategory,
    firstTwelve,
  ]);

  return (
    <div>
      <h1>Recipes</h1>
      {history.location.pathname === '/meals'
        ? (
          <div>
            {
              specificCategory
                .map((e) => (
                  <div key={ e }>
                    <button
                      type="button"
                      data-testid={ `${e.strCategory}-category-filter` }
                      onClick={ fetchCategory }
                    >
                      { e.strCategory }
                    </button>
                  </div>
                ))
            }
            <button
              data-testid="All-category-filter"
            >
              All
            </button>
          </div>
        )
        : (
          <div>
            {
              category
                .map((e) => (
                  <div key={ e }>
                    <button
                      type="button"
                      data-testid={ `${e.strCategory}-category-filter` }
                    >
                      { e.strCategory }
                    </button>
                  </div>
                ))
            }
            <button
              data-testid="All-category-filter"
            >
              All
            </button>
          </div>
        )}

      {history.location.pathname === '/meals'
        ? (
          <div>
            {
              recipesData
                .map((e, index) => (
                  <div
                    key={ e.idMeal }
                    data-testid={ `${index}-recipe-card` }
                  >
                    <h2
                      data-testid={ `${index}-card-name` }
                    >
                      { e.strMeal }
                    </h2>
                    <img
                      data-testid={ `${index}-card-img` }
                      src={ e.strMealThumb }
                      alt={ e.strMeal }
                    />
                  </div>))
            }
          </div>
        )
        : (
          <div>
            {
              recipesData
                .map((e, index) => (
                  <div
                    key={ e.idDrink }
                    data-testid={ `${index}-recipe-card` }
                  >
                    <h2
                      data-testid={ `${index}-card-name` }
                    >
                      { e.strDrink }
                    </h2>
                    <img
                      data-testid={ `${index}-card-img` }
                      src={ e.strDrinkThumb }
                      alt={ e.strDrink }
                    />
                  </div>))
            }
          </div>
        )}
    </div>
  );
}
