import React, { useEffect, useMemo, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import YouTube from 'react-youtube';
import useLocalStorage from '../hooks/useLocalStorage';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import '../styles/Details.css';

function RecipeInProgress(props) {
  const [currentRecipe, setCurrentRecipe] = useState(null);
  const [concludedIngredients, setConcludedIngredients] = useState([]);
  const [meal, setMeal] = useLocalStorage('meals');
  const [drink, setDrinks] = useLocalStorage('drinks');
  const [doneRecipes, setDoneRecipes] = useLocalStorage('doneRecipes', []);
  const [errorNotification, setErrorNotification] = useState(null);
  const [allIngredientsCompleted, setAllIngredientsCompleted] = useState(false);
  const [getLocalFav, setGetLocalFav] = useState([]);
  const history = useHistory();
  const location = useLocation();
  const numIngredientes = 20;
  const ingredientesIndex = useMemo(() => Array.from(
    { length: numIngredientes },
    (_, index) => `strIngredient${index + 1}`,
  ), []);
  const { match: { params: { id } }, currentPage } = props;

  async function fetchAPI(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  }

  useEffect(() => {
    if (localStorage.getItem('favoriteRecipes')) {
      setGetLocalFav(JSON.parse(localStorage.getItem('favoriteRecipes')));
    } else {
      localStorage.setItem('favoriteRecipes', JSON.stringify([]));
    }
    const checkQuantity = () => {
      if (currentRecipe) {
        const cont = ingredientesIndex.reduce(
          (count, ingredients) => (currentRecipe[ingredients] ? count + 1 : count),
          0,
        );
        return cont;
      }
    };
    const updateIngredientCompletion = () => {
      if (currentPage === 'meals' && meal) {
        setConcludedIngredients(meal[id]);
        setAllIngredientsCompleted(meal[id].length === checkQuantity());
      }
      if (currentPage === 'drinks' && drink) {
        setConcludedIngredients(drink[id]);
        setAllIngredientsCompleted(drink[id].length === checkQuantity());
      }
    };
    updateIngredientCompletion();
  }, [meal, drink, id, currentPage, ingredientesIndex, currentRecipe]);

  useEffect(() => {
    async function fetchDataApi() {
      let apiURL = '';
      if (currentPage === 'meals') {
        apiURL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
      }
      if (currentPage === 'drinks') {
        apiURL = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
      }
      const { meals, drinks } = await fetchAPI(apiURL);
      const data = currentPage === 'meals' ? meals : drinks;
      const foundRecipe = data.find((item) => item.idMeal === id || item.idDrink === id);
      setCurrentRecipe(foundRecipe);
    }
    fetchDataApi();
  }, [currentPage, id]);

  const handleChangeCheckbox = (ingredients) => {
    const modifiedIngredients = concludedIngredients.includes(ingredients)
      ? concludedIngredients.filter(
        (currentIngredient) => currentIngredient !== ingredients,
      )
      : [...concludedIngredients, ingredients];
    setConcludedIngredients(modifiedIngredients);
    if (currentPage === 'meals') {
      setMeal({
        ...meal,
        [id]:
        [...modifiedIngredients],
      });
    }
    if (currentPage === 'drinks') {
      setDrinks({
        [id]:
        [...modifiedIngredients],
      });
    }
  };

  const favoriteRecipe = () => {
    const save = {
      id,
      type: currentPage === 'meals' ? 'meal' : 'drink',
      nationality: currentRecipe.strArea || '',
      category: currentRecipe.strCategory || '',
      alcoholicOrNot: currentRecipe.strAlcoholic || '',
      name: currentRecipe.strMeal || currentRecipe.strDrink,
      image: currentRecipe.strDrinkThumb || currentRecipe.strMealThumb,
    };
    if (getLocalFav.some((e) => e.id === save.id)) {
      const newArray = getLocalFav.filter((e) => e.id !== save.id);
      setGetLocalFav(newArray);
      localStorage.setItem('favoriteRecipes', JSON.stringify(newArray));
    } else {
      setGetLocalFav([...getLocalFav, save]);
      localStorage.setItem('favoriteRecipes', JSON.stringify([...getLocalFav, save]));
    }
  };

  function renderIngredients() {
    return ingredientesIndex.map((ingredient, index) => {
      const currentIngredientName = currentRecipe[ingredient];
      if (currentIngredientName) {
        const isChecked = concludedIngredients.includes(currentIngredientName);
        const labelStyle = isChecked
          ? { gap: 10,
            textDecoration: 'line-through solid rgb(0, 0, 0)',
          }
          : { gap: 10 };
        return (
          <label
            key={ currentIngredientName }
            data-testid={ `${index}-ingredient-step` }
            style={ labelStyle }
          >
            <input
              type="checkbox"
              checked={ isChecked }
              onChange={ () => handleChangeCheckbox(currentIngredientName) }
            />
            {currentIngredientName}
          </label>
        );
      }
      return null;
    });
  }

  function renderPage() {
    if (!currentRecipe) {
      return null;
    }

    const { strMeal, strMealThumb, strDrink, strDrinkThumb, strCategory,
      strInstructions, strYoutube } = currentRecipe;

    const returnVideo = () => {
      const getUrl = strYoutube;
      const delimiter = 'watch?v=';
      const partes = getUrl.split(delimiter);
      const codigoVideo = partes[1];
      return (
        <YouTube title="Video" videoId={ codigoVideo } />
      );
    };

    const handleCopyLink = async () => {
      const completeURL = window.location.href;
      const lastPosition = completeURL.lastIndexOf('/');
      const slicedURL = completeURL.slice(0, lastPosition);
      navigator.clipboard.writeText(slicedURL);
      setErrorNotification('Link copied!');
    };

    const concludeRecipe = () => {
      const currentDate = new Date();
      setDoneRecipes([...doneRecipes,
        {
          id,
          type: currentPage === 'meals' ? 'meal' : 'drink',
          nationality: currentRecipe.strArea || '',
          category: currentRecipe.strCategory || '',
          alcoholicOrNot: currentRecipe.strAlcoholic || '',
          name: currentRecipe.strMeal || currentRecipe.strDrink,
          image: currentRecipe.strDrinkThumb || currentRecipe.strMealThumb,
          doneDate: currentDate.toISOString(),
          tags: currentRecipe.strTags ? currentRecipe.strTags.split(',') : [],
        }]);
      localStorage.removeItem('meals');
      localStorage.removeItem('drinks');
      history.push('/done-recipes');
    };

    return (
      <div className="details-container">
        <h2
          className="title-recipe"
          data-testid="recipe-title"
        >
          {currentPage === 'meals' ? strMeal : strDrink}
        </h2>
        <img
          className="image"
          src={ currentPage === 'meals' ? strMealThumb : strDrinkThumb }
          alt={ currentPage === 'meals' ? 'Meal img' : 'Drink img' }
          data-testid="recipe-photo"
        />
        <h4 data-testid="recipe-category">{strCategory}</h4>
        <div className="div-ingredients">
          <div className="title-div-ingredients">
            <h4>Ingredients</h4>
          </div>
          <div className="ingredients-container">
            {renderIngredients()}
          </div>
        </div>
        <div className="div-ingredients">
          <div className="title-div-ingredients">
            <h4>Instruções</h4>
          </div>
          <div className="ingredients-container">
            <p data-testid="instructions">{strInstructions}</p>
          </div>
        </div>
        <span>{errorNotification}</span>
        <section className="buttons-container">
          <button
            src={ shareIcon }
            type="button"
            data-testid="share-btn"
            onClick={ handleCopyLink }
          >
            <img src={ shareIcon } alt="Botao compartilhar" />
          </button>
          <button
            onClick={ favoriteRecipe }
            src={ getLocalFav.some((e) => e.id === location.pathname.match(/\d+/g)[0]) ? blackHeartIcon : whiteHeartIcon }
            type="button"
            data-testid="favorite-btn"
          >
            <img src={ getLocalFav.some((e) => e.id === location.pathname.match(/\d+/g)[0]) ? blackHeartIcon : whiteHeartIcon } alt="Botao Favoritar" />
          </button>
        </section>
        { location.pathname.includes('meals') && returnVideo()}
        <button
          className="buttonStart"
          type="button"
          data-testid="finish-recipe-btn"
          onClick={ () => concludeRecipe() }
          disabled={ !allIngredientsCompleted }
        >
          Finalizar Receita
        </button>
      </div>
    );
  }
  return <div>{renderPage()}</div>;
}
RecipeInProgress.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  currentPage: PropTypes.string.isRequired,
};

export default RecipeInProgress;
