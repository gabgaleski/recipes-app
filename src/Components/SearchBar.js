import React, { useState, useContext } from 'react';
import Context from '../context/Context';
import { ingredientFetch, nameFetch, firsLetterFetch } from '../Services/APIsFetch';

export default function SearchBar() {
  const { textSearch } = useContext(Context);
  const [inputSearch, setInputSearch] = useState('');

  const handleSubbmit = async () => {
    if (inputSearch === 'ingredient') {
     const ingredients = await ingredientFetch(textSearch);
    } else if (inputSearch === 'name') {
      const names = await nameFetch(textSearch);
    } else if (inputSearch === 'first-letter') {
      if (textSearch.length > 1) {
        global.alert('Your search must have only 1 (one) character');
      } else {
      const firstLetters = await firsLetterFetch(textSearch);
      }
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
