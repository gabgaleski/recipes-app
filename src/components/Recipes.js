import React, { useEffect, useState, useCallback } from 'react';
import { Link, useHistory } from 'react-router-dom';
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

  const getRecipes = useCallback(async () => {
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

    getRecipes();
    fetchCategories();
  }, [
    history.location.pathname,
    getRecipes,
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
    if (!categoryName) return;
    setSpecificCategory(categoryName);
    const categories = await getCategories(serverParameter(), categoryName);
    if (history.location.pathname === '/meals') {
      const categoryRecipes = categories.meals.slice(0, maxLength);
      setRecipesData(categoryRecipes);
    } else if (history.location.pathname === '/drinks') {
      const categoryRecipes = categories.drinks.slice(0, maxLength);
      setRecipesData(categoryRecipes);
    }
  }, [
    serverParameter,

    history.location.pathname,
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
        onClick={ getRecipes }
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
                    <Link to={ `/meals/${e.idMeal}` }>
                      <img
                        data-testid={ `${index}-card-img` }
                        src={ e.strMealThumb }
                        alt={ e.strMeal }
                      />
                    </Link>
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
                    <Link to={ `/drinks/${e.idDrink}` }>
                      <img
                        data-testid={ `${index}-card-img` }
                        src={ e.strDrinkThumb }
                        alt={ e.strDrink }
                      />
                    </Link>
                  </div>))
            }
          </div>
        )}
    </div>
  );
}
