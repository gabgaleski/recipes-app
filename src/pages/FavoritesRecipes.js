import React, { useContext, useEffect, useMemo, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Context from '../context/Context';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function FavoritesRecipes() {
  const { setTitleHeader, setLoadingSearch } = useContext(Context);
  const [alert, setAlert] = useState(false);
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [recipeFilter, setRecipeFilter] = useState('All');

  const mockRecipes = [{
    id: '52940',
    type: 'meal',
    nationality: 'italian',
    category: 'Vegetarian',
    alcoholicOrNot: 'Alcoholic',
    name: 'Vegan Chocolate Cake',
    image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
  },
  {
    id: '52940',
    type: 'drink',
    nationality: 'italian',
    category: 'Vegetarian',
    alcoholicOrNot: 'Alcoholic',
    name: 'Vegan Chocolate Cake',
    image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
  }];

  localStorage.setItem('favoriteRecipes', JSON.stringify(mockRecipes));

  const getFavoriteRecipes = useCallback(() => {
    const favoriteRecipesStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (favoriteRecipesStorage) {
      setRecipeFilter(favoriteRecipesStorage);
      setFavoriteRecipes(favoriteRecipesStorage);
    }
  }, [setRecipeFilter]);

  useMemo(() => {
    getFavoriteRecipes();
  }, [getFavoriteRecipes]);

  useEffect(() => {
    setTitleHeader('Favorite Recipes');
    setLoadingSearch(false);
    getFavoriteRecipes();
  }, [setTitleHeader, setLoadingSearch, setFavoriteRecipes, getFavoriteRecipes]);

  const handleFilter = (filter) => {
    if (filter === 'All') {
      setFavoriteRecipes(recipeFilter);
    } else if (filter === 'meal') {
      setFavoriteRecipes(recipeFilter.filter((recipe) => recipe.type === 'meal'));
    } else {
      setFavoriteRecipes(recipeFilter.filter((recipe) => recipe.type === 'drink'));
    }
  };

  const handleRemoveFavorite = (index) => {
    const spliceFavorite = [...favoriteRecipes].toSpliced(index, 1);
    setFavoriteRecipes(spliceFavorite);
    localStorage.removeItem('favoriteRecipes');
    localStorage.setItem('favoriteRecipes', JSON.stringify(spliceFavorite));
  };

  const handleShareBtn = (element) => {
    navigator.clipboard.writeText(`http://localhost:3000${element}`);
    setAlert(true);
    const duration = 3000;
    setTimeout(() => {
      setAlert(false);
    }, duration);
    global.alert('Link copiado!');
  };

  console.log(favoriteRecipes);
  return (
    <div>
      <Header />
      <form>
        <fieldset>
          <button
            type="button"
            data-testid="filter-by-all-btn"
            onClick={ () => handleFilter('All') }
          >
            All
          </button>
          <button
            type="button"
            data-testid="filter-by-meal-btn"
            onClick={ () => handleFilter('meal') }
          >
            Meals
          </button>
          <button
            type="button"
            data-testid="filter-by-drink-btn"
            onClick={ () => handleFilter('Drinks') }
          >
            Drinks
          </button>
        </fieldset>
        <div>
          {
            favoriteRecipes.map((recipe, index) => (
              <div key={ index }>
                <p>{recipe.type}</p>
                <p data-testid={ `${index}-horizontal-name` }>{recipe.name}</p>
                <p data-testid={ `${index}-horizontal-top-text` }>
                  {recipe.type === 'meal'
                    ? `${recipe.nationality} - ${recipe.category}`
                    : `${recipe.alcoholicOrNot}`}
                </p>
                <Link
                  to={ recipe.type === 'meal'
                    ? `/meals/${recipe.id}` : `/drinks/${recipe.id}` }
                >
                  <img
                    data-testid={ `${index}-horizontal-image` }
                    src={ recipe.image }
                    alt={ recipe.name }
                  />
                </Link>
                <button
                  type="button"
                  data-testid={ `${index}-horizontal-share-btn` }
                  onClick={ () => handleShareBtn(
                    recipe.type === 'meal'
                      ? `/meals/${recipe.id}` : `/drinks/${recipe.id}`,
                  ) }
                >
                  <img
                    src={ shareIcon }
                    alt="Share Icon"
                  />
                </button>
                <button
                  type="button"
                  data-testid={ `${index}-horizontal-favorite-btn` }
                  onClick={ () => handleRemoveFavorite(index) }
                >
                  <img
                    src={ blackHeartIcon }
                    alt="Favorite Icon"
                  />
                </button>
              </div>))
          }
        </div>
      </form>
      {alert && <p>Link copiado!</p>}
    </div>
  );
}

export default FavoritesRecipes;
