import React, { useState, useContext } from 'react';
import Context from '../context/Context';
import {
  ingredientFetchMeal,
  nameFetchMeal, firsLetterFetchMeal,
  ingredientFetchDrink,
  nameFetchDrink, firsLetterFetchDrink,
} from '../Services/APIsFetch';

export default function SearchBar() {
  const { textSearch, titleHeader, setRecipesSearch } = useContext(Context);
  const [inputSearch, setInputSearch] = useState('');

  const recipeFilter = async (ingredientAPI, nameAPI, firstLetterAPI) => {
    if (inputSearch === 'ingredient') {
      const ingredients = await ingredientAPI(textSearch);
      setRecipesSearch(ingredients);
    } else if (inputSearch === 'name') {
      const names = await nameAPI(textSearch);
      setRecipesSearch(names);
    } else if (inputSearch === 'first-letter') {
      if (textSearch.length > 1) {
        global.alert('Your search must have only 1 (one) character');
      } else {
        const firstLetters = await firstLetterAPI(textSearch);
        setRecipesSearch(firstLetters);
      }
    }
  };

  const handleSubbmit = async () => {
    if (titleHeader === 'Meals') {
      recipeFilter(ingredientFetchMeal, nameFetchMeal, firsLetterFetchMeal);
    } else {
      recipeFilter(ingredientFetchDrink, nameFetchDrink, firsLetterFetchDrink);
    }
  };

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
