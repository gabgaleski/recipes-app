import { useContext, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import copy from 'clipboard-copy';
import YouTube from 'react-youtube';
import { FetchIdDrink, FetchIdMeals, allMeals, allDrinks } from '../services/APIsFetch';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import useLocalStorage from '../hooks/useLocalStorage';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import '../styles/Details.css';
import Context from '../context/Context';
import Carousel from './Carousel';

function RecipeDetails() {
  const [idDrinks, setIdDrinks] = useState([]);
  const [idMeals, setIdMeals] = useState([]);
  const [copyRecipe, setCopyRecipe] = useState(false);
  const [favoritMealOrDrink, setFavoriteMealOrDrink] = useState([]);
  const [saveFavorit, setSaveFavorit] = useLocalStorage('favoriteRecipes', []);
  const location = useLocation();
  const history = useHistory();
  const namePage = location.pathname.includes('drinks') ? 'Drink' : 'Meal';
  const id = `id${namePage}`;
  const { setRecommendationMeals, setRecommendationDrinks } = useContext(Context);

  useEffect(() => {
    const handleChange = async () => {
      if (location.pathname.includes('/meals')) {
        const recommendationDrink = await allDrinks();
        setRecommendationDrinks(recommendationDrink.drinks);
        const dataIdMeals = await FetchIdMeals((location.pathname.match(/\d+/g))[0]);
        setFavoriteMealOrDrink(dataIdMeals.meals[0]);
        Object.keys(dataIdMeals.meals[0]).forEach((key) => {
          if (
            dataIdMeals.meals[0][key] === null || dataIdMeals.meals[0][key] === '') {
            delete dataIdMeals.meals[0][key];
          }
        });
        setIdMeals(Object.entries(dataIdMeals.meals[0]));
      } else if (location.pathname.includes('/drinks')) {
        const recommendationMeal = await allMeals();
        setRecommendationMeals(recommendationMeal.meals);
        const dataIdDrinks = await FetchIdDrink(location.pathname.match(/\d+/g)[0]);
        setFavoriteMealOrDrink(dataIdDrinks.drinks[0]);
        Object.keys(dataIdDrinks.drinks[0]).forEach((key) => {
          if (
            dataIdDrinks.drinks[0][key] === null || dataIdDrinks.drinks[0][key] === '') {
            delete dataIdDrinks.drinks[0][key];
          }
        });
        setIdDrinks(Object.entries(dataIdDrinks.drinks[0]));
      }
    };
    handleChange();
  }, [location.pathname, setRecommendationDrinks, setRecommendationMeals]);

  const copyLink = () => {
    const local = location.pathname;
    copy(`http://localhost:3000${local}`);
    setCopyRecipe(true);
  };

  const favoriteRecipe = () => {
    const save = {
      id: favoritMealOrDrink[id],
      type: namePage.toLowerCase(),
      nationality: favoritMealOrDrink.strArea ? favoritMealOrDrink.strArea : '',
      category: favoritMealOrDrink.strCategory,
      alcoholicOrNot:
      favoritMealOrDrink.strAlcoholic ? favoritMealOrDrink.strAlcoholic : '',
      name:
      favoritMealOrDrink.strDrink
        ? favoritMealOrDrink.strDrink : favoritMealOrDrink.strMeal,
      image:
      favoritMealOrDrink.strDrinkThumb
        ? favoritMealOrDrink.strDrinkThumb : favoritMealOrDrink.strMealThumb,
    };
    if (saveFavorit.some((e) => e.id === save.id)) {
      const newArray = saveFavorit.filter((e) => e.id !== save.id);
      setSaveFavorit(newArray);
    } else {
      setSaveFavorit([...saveFavorit, save]);
    }
  };

  const measurements = idDrinks.filter((measure) => measure[0].includes('Measure'));
  const ingredients = idDrinks.filter((ingredint) => ingredint[0].includes('Ingredient'))
    .filter((e) => e.splice(0, 1));
  const measurementsMeals = idMeals.filter((measure) => measure[0].includes('Measure'));
  const ingredientsMeasl = idMeals
    .filter((ingredint) => ingredint[0].includes('Ingredient'));

  const handleRedirect = () => {
    if (location.pathname.includes('/meals')) {
      history
        .push(`/meals/${location.pathname.match(/\d+/g)[0]}/in-progress`);
    } else { history.push(`/drinks/${location.pathname.match(/\d+/g)[0]}/in-progress`); }
  };
  return (
    <div className="details-container">
      <div className="div-ingredients">
        <div className="title-div-ingredients">
          {ingredients.length > 0 && <h4>Ingredients</h4>}
        </div>
        <div className="ingredients-container">
          {ingredients.map((ingredient, index) => (
            <li
              key={ ingredient }
            >
              {`${ingredient} : ${measurements[index][1]}`}
            </li>
          ))}
        </div>
      </div>
      <div className="div-ingredients">
        <div className="title-div-ingredients">
          {ingredientsMeasl.length > 0 && <h4>Ingredients</h4>}
        </div>
        <div className="ingredients-container">
          {ingredientsMeasl.map((ingredien, index) => (
            <li
              key={ ingredien[0] }
              data-testid={ `${index}-ingredient-name-and-measure` }
            >
              {`${ingredien[1]}: ${measurementsMeals[index][1]}`}
            </li>
          ))}
        </div>
      </div>
      {idDrinks.length > 0 ? idDrinks.map(
        (element) => {
          switch (element[0]) {
          case 'strDrink':
            return (
              <h1
                className="title-recipe"
                data-testid="recipe-title"
              >
                {element[1]}
              </h1>
            );
          case 'strDrinkThumb':
            return (<img
              src={ element[1] }
              alt="Imagem da receita"
              data-testid="recipe-photo"
              className="recipePhoto"
            />);
          case 'strCategory':
            return <h5 className="caterg" data-testid="recipe-category">{element[1]}</h5>;
          case 'strAlcoholic':
            return <h5 className="alcoho" data-testid="recipe-category">{element[1]}</h5>;
          case 'strInstructions':
            return (
              <div className="div-ingredients">
                <div className="title-div-ingredients">
                  <h4>Instructions</h4>
                </div>
                <div className="ingredients-container">
                  <p data-testid="instructions">{element[1]}</p>
                </div>
              </div>
            );
          default: return null;
          }
        },
      )
        : idMeals.map((element) => {
          if (element[0] === 'strYoutube') {
            const getUrl = element[1];
            const delimiter = 'watch?v=';
            const partes = getUrl.split(delimiter);
            const codigoVideo = partes[1];
            return (
              <YouTube key={ element[0] } title="Video" videoId={ codigoVideo } />
            );
          }
          switch (element[0]) {
          case 'strMeal':
            return (
              <h1
                className="title-recipe"
                data-testid="recipe-title"
              >
                {element[1]}
              </h1>
            );
          case 'strMealThumb':
            return (<img
              src={ element[1] }
              alt="Imagem da receita"
              data-testid="recipe-photo"
              className="recipePhoto"
            />);
          case 'strCategory':
            return <h5 className="caterg" data-testid="recipe-category">{element[1]}</h5>;
          case 'strInstructions':
            return (
              <div className="div-ingredients">
                <div className="title-div-ingredients">
                  <h4>Instructions</h4>
                </div>
                <div className="ingredients-container">
                  <p data-testid="instructions">{element[1]}</p>
                </div>
              </div>
            );
          default: return null;
          }
        })}
      <h3>Recommended</h3>
      <Carousel />
      <div className="buttons-container">
        <button
          data-testid="start-recipe-btn"
          className="buttonStart"
          onClick={ handleRedirect }
        >
          Start Recipe
        </button>
        { copyRecipe && <p>Link copied!</p>}
        <button data-testid="share-btn" onClick={ copyLink }>
          <img src={ shareIcon } alt="Botao de Compartilhar" />
        </button>
        <button onClick={ favoriteRecipe }>
          <img
            data-testid="favorite-btn"
            src={ saveFavorit.some((e) => e.id === location.pathname.match(/\d+/g)[0]) ? blackHeartIcon : whiteHeartIcon }
            alt="Botao de Favoritar"
          />
        </button>
      </div>
    </div>
  );
}

export default RecipeDetails;
