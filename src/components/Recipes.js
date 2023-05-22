import React, { useEffect, useState, useCallback, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import '../styles/Recipes.css';
import All from '../images/All.svg';
import Breakfast from '../images/breakfast.svg';
import Chicken from '../images/chicken.svg';
import Dessert from '../images/dessert.svg';
import Goat from '../images/goat.svg';
import Beef from '../images/beef.svg';
import AllDrinks from '../images/AllDrinks.svg';
import ordinary from '../images/ordinary.svg';
import other from '../images/other.svg';
import shake from '../images/shake.svg';
import cocoa from '../images/cocoa.svg';
import cocktail from '../images/cocktail.svg';
import {
  allMeals,
  allDrinks,
  getCategories,
  mealCategoryFetch,
  drinkCategoryFetch,
} from '../services/APIsFetch';
import Context from '../context/Context';

export default function Recipes() {
  const [category, setCategory] = useState([]);
  const [specificCategory, setSpecificCategory] = useState('');
  const imgArray = [Beef, Breakfast, Chicken, Dessert, Goat];
  const { recipesData, setRecipesData } = useContext(Context);
  const maxLength = 12;
  const maxCategory = 5;
  const imgArrayDrinks = [ordinary, cocktail, shake, other, cocoa];
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
    history.location.pathname, setRecipesData,
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
    setRecipesData,
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
      <div className="buttons-container">
        <div>
          <button
            data-testid="All-category-filter"
            onClick={ getRecipes }
          >
            <img
              src={ history.location.pathname === '/meals' ? All : AllDrinks }
              alt="Filtro All"
            />
          </button>
        </div>
        {
          category
            .map((e, index) => (
              <div key={ e.strCategory }>
                <button
                  type="button"
                  data-testid={ `${e.strCategory}-category-filter` }
                  onClick={ () => fetchCategory(e.strCategory) }
                >
                  <img
                    src={ history.location.pathname === '/meals' ? imgArray[index]
                      : imgArrayDrinks[index] }
                    alt="Imagens dos Botoes"
                  />
                </button>
              </div>
            ))
        }
      </div>
      {history.location.pathname === '/meals'
        ? (
          <div className="recipes-container">
            {
              recipesData
                .map((e, index) => (
                  <div
                    className="cards-container"
                    key={ e.idMeal }
                    data-testid={ `${index}-recipe-card` }
                  >
                    <Link
                      to={ `/meals/${e.idMeal}` }
                    >
                      <img
                        className="image-card"
                        data-testid={ `${index}-card-img` }
                        src={ e.strMealThumb }
                        alt={ e.strMeal }
                      />
                    </Link>
                    <h2
                      data-testid={ `${index}-card-name` }
                    >
                      { e.strMeal }
                    </h2>
                  </div>))
            }
          </div>
        )
        : (
          <div className="recipes-container">
            {
              recipesData
                .map((e, index) => (
                  <div
                    className="cards-container"
                    key={ e.idDrink }
                    data-testid={ `${index}-recipe-card` }
                  >
                    <Link to={ `/drinks/${e.idDrink}` }>
                      <img
                        className="image-card"
                        data-testid={ `${index}-card-img` }
                        src={ e.strDrinkThumb }
                        alt={ e.strDrink }
                      />
                    </Link>
                    <h2
                      data-testid={ `${index}-card-name` }
                    >
                      { e.strDrink }
                    </h2>
                  </div>))
            }
          </div>
        )}
    </div>
  );
}
