import React, { useContext, useEffect, useMemo, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Context from '../context/Context';
import shareIcon from '../images/shareDone.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import '../styles/DoneRecipes.css';
import All from '../images/AllDone.svg';
import AllDrinks from '../images/AllDrinksDone.svg';
import AllMeals from '../images/AllMealsDone.svg';

function FavoriteRecipes() {
  const { setTitleHeader, setLoadingSearch } = useContext(Context);
  const [alert, setAlert] = useState(false);
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [recipeFilter, setRecipeFilter] = useState('All');

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

  const handleRemoveFavorite = (recipeIndex) => {
    const spliceFavorite = favoriteRecipes.filter((_e, index) => index !== recipeIndex);
    console.log(spliceFavorite);
    setFavoriteRecipes(spliceFavorite);
    localStorage.setItem('favoriteRecipes', JSON.stringify(spliceFavorite));
  };

  const handleShareBtn = (element) => {
    navigator.clipboard.writeText(`http://localhost:3000${element}`);
    setAlert(true);
    const duration = 3000;
    setTimeout(() => {
      setAlert(false);
    }, duration);
    global.alert('Link copied!');
  };

  return (
    <div>
      <Header />
      <div className="done-container">
        <div className="buttons-container-done">
          <button
            type="button"
            data-testid="filter-by-all-btn"
            onClick={ () => handleFilter('All') }
          >
            <img src={ All } alt="Imagem do botao filtrar" />
          </button>
          <button
            type="button"
            data-testid="filter-by-meal-btn"
            onClick={ () => handleFilter('meal') }
          >
            <img src={ AllMeals } alt="Imagem do botao filtrar Meals" />
          </button>
          <button
            type="button"
            data-testid="filter-by-drink-btn"
            onClick={ () => handleFilter('Drinks') }
          >
            <img src={ AllDrinks } alt="Imagem do botao filtrar Drinks" />
          </button>
        </div>
        {
          favoriteRecipes.map((recipe, index) => (
            <div className="card-container" key={ index }>
              <div className="img-container">
                <Link
                  to={ recipe.type === 'meal'
                    ? `/meals/${recipe.id}` : `/drinks/${recipe.id}` }
                >
                  <img
                    data-testid={ `${index}-horizontal-image` }
                    src={ recipe.image }
                    alt={ recipe.name }
                    className="image-recipe image-fav"
                  />
                </Link>
              </div>
              <div className="infos-container">
                <div className="first-infos">
                  <Link
                    to={ recipe.type === 'meal'
                      ? `/meals/${recipe.id}` : `/drinks/${recipe.id}` }
                  >
                    <p data-testid={ `${index}-horizontal-name` }>{recipe.name}</p>
                  </Link>
                  <button
                    type="button"
                    src={ shareIcon }
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
                </div>
                <p>{recipe.type}</p>
                <p data-testid={ `${index}-horizontal-top-text` }>
                  {recipe.type === 'meal'
                    ? `${recipe.nationality} - ${recipe.category}`
                    : `${recipe.alcoholicOrNot}`}
                </p>
                <button
                  type="button"
                  src={ blackHeartIcon }
                  data-testid={ `${index}-horizontal-favorite-btn` }
                  onClick={ () => handleRemoveFavorite(index) }
                >
                  <img
                    src={ blackHeartIcon }
                    alt="Favorite Icon"
                  />
                </button>
              </div>
            </div>))
        }
        {alert && <p>Link copied!</p>}
      </div>
    </div>
  );
}

export default FavoriteRecipes;
