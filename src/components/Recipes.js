import React, { useEffect, useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import {
  allMeals,
  allDrinks,
  getCategories,
  mealCategoryFetch,
  drinkCategoryFetch,
} from '../services/APIsFetch';

export default function Recipes() {
  const [recipesData, setRecipesData] = useState([]);
  const [category, setCategory] = useState([]);
  const [specificCategory, setSpecificCategory] = useState('');

  const maxLength = 12;
  const maxCategory = 5;

  const history = useHistory();

  useEffect(() => {
    const firstTwelve = async () => {
      if (history.location.pathname === '/meals') {
        const meals = await allMeals();
        const twelveMeals = meals.meals.slice(0, maxLength);
        setRecipesData(twelveMeals || []);
      } else if (history.location.pathname === '/drinks') {
        const drinks = await allDrinks();
        const twelveDrinks = drinks.drinks.slice(0, maxLength);
        setRecipesData(twelveDrinks || []);
      }
    };

    const fetchCategories = async () => {
      if (history.location.pathname === '/meals') {
        const categories = await mealCategoryFetch();
        const fiveCategories = categories.meals.slice(0, maxCategory);
        setCategory(fiveCategories);
      } else if (history.location.pathname === '/drinks') {
        const categories = await drinkCategoryFetch();
        const fiveCategories = categories.drinks.slice(0, maxCategory);
        setCategory(fiveCategories);
      }
    };

    fetchCategories();
    firstTwelve();
  }, [
    history.location.pathname,
    setRecipesData,
    setCategory,
  ]);

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

  const fetchCategory = useCallback(async (categoryName) => {
    setSpecificCategory(categoryName);
    const categories = await getCategories(serverParameter(), categoryName);
    const categoryRecipes = categories.meals.slice(0, maxLength);
    console.log(categoryRecipes);
    setRecipesData(categoryRecipes || []);
  }, [
    serverParameter,
  ]);

  useEffect(() => {
    if (specificCategory) {
      fetchCategory(specificCategory);
    } else {
      fetchCategory('');
    }
  }, [
    specificCategory,
    fetchCategory,
  ]);

  return (
    <div>
      <h1>Recipes</h1>
      {/*      {history.location.pathname === '/meals'
        ? ( */}
      <div>
        {
          category
            .map((e) => (
              <div key={ e.strCategory }>
                <button
                  type="button"
                  data-testid={ `${e.strCategory}-category-filter` }
                  onClick={ () => fetchCategory(e.strCategory) }
                >
                  { e.strCategory }
                </button>
              </div>
            ))
        }
      </div>
      <button
        data-testid="All-category-filter"
        onClick={ () => fetchCategory('') }
      >
        All
      </button>

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
