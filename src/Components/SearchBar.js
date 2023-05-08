import React from 'react';

export default function SearchBar() {
  return (
    <div>
      <label>
        Ingredient:
        <input
          type="radio"
          data-testid="ingredient-search-radio"
          name="search-radio"
          value="ingredient"
        />
      </label>
      <label>
        Name:
        <input
          type="radio"
          data-testid="name-search-radio"
          name="search-radio"
          value="name"
        />
      </label>
      <label>
        First Letter:
        <input
          type="radio"
          data-testid="first-letter-search-radio"
          name="search-radio"
          value="first-letter"
        />
      </label>
      <button
        type="button"
        data-testid="exec-search-btn"
      >
        Busca
      </button>
    </div>
  );
}
