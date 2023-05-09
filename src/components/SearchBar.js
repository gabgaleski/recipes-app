import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Context from '../context/Context';
import {
  ingredientFetchMeal,
  nameFetchMeal, firsLetterFetchMeal,
  ingredientFetchDrink,
  nameFetchDrink, firsLetterFetchDrink,
} from '../services/APIsFetch';

export default function SearchBar() {
  const {
    textSearch,
    titleHeader,
    recipesSearch,
    setRecipesSearch } = useContext(Context);
  const [inputSearch, setInputSearch] = useState('');
  const history = useHistory();

  const recipeFilter = async (ingredientAPI, nameAPI, firstLetterAPI) => {
    let response = null;
    if (inputSearch === 'ingredient') {
      response = await ingredientAPI(textSearch);
      setRecipesSearch(response);
    } else if (inputSearch === 'name') {
      response = await nameAPI(textSearch);
      setRecipesSearch(response);
    } else if (inputSearch === 'first-letter') {
      if (textSearch.length > 1) {
        return global.alert('Your search must have only 1 (one) character');
      }
      response = await firstLetterAPI(textSearch);
      setRecipesSearch(response);
    }
    if (titleHeader === 'Meals' && response.meals.length === 1) {
      const { idMeal } = response.meals[0];
      history.push(`/meals/${idMeal}`);
    } else if (titleHeader === 'Drinks' && response.drinks.length === 1) {
      const { idDrink } = response.drinks[0];
      history.push(`/drinks/${idDrink}`);
    }
  };

  const handleSubbmit = () => {
    if (titleHeader === 'Meals') {
      recipeFilter(ingredientFetchMeal, nameFetchMeal, firsLetterFetchMeal);
    } else {
      recipeFilter(ingredientFetchDrink, nameFetchDrink, firsLetterFetchDrink);
    }
  };

  console.log(recipesSearch);
  return (
    <div>
      <label>
        Ingredient:
        <input
          type="radio"
          data-testid="ingredient-search-radio"
          name="search-radio"
          value="ingredient"
          onChange={ ({ target }) => setInputSearch(target.value) }
        />
      </label>
      <label>
        Name:
        <input
          type="radio"
          data-testid="name-search-radio"
          name="search-radio"
          value="name"
          onChange={ ({ target }) => setInputSearch(target.value) }
        />
      </label>
      <label>
        First Letter:
        <input
          type="radio"
          data-testid="first-letter-search-radio"
          name="search-radio"
          value="first-letter"
          onChange={ ({ target }) => setInputSearch(target.value) }
        />
      </label>
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ handleSubbmit }
      >
        Busca
      </button>
    </div>
  );
}
