import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { FetchIdDrink, FetchIdMeals, FetchRecommendationDrinks, FetchRecommendationMeals }
  from '../services/APIsFetch';
// import data from './data';

function RecipeDetails() {
  const [idDrinks, setIdDrinks] = useState([]);
  const [idMeals, setIdMeals] = useState([]);
  const [recommendationMeals, setRecommendationMeals] = useState([]);
  const [recommendationDrinks, setRecommendationDrinks] = useState([]);
  //   const location = useLocation;
  //   console.log(location.pathname); // Exibe o caminho atual
  //   console.log(location.search);

  const location = useLocation();

  useEffect(() => {
    const handleChange = async () => {
      // const dataIdM = await FetchIdMeals('52796');
      // const dataIDD = await FetchIdDrink('17256');
      // setIdMeals(dataIdM.meals);
      // setIdDrinks(dataIDD.drinks);

      if (location.pathname.includes('/meals')) {
        const recommendationDrink = await FetchRecommendationDrinks();
        setRecommendationDrinks(recommendationDrink.drinks);
        const dataIdMeals = await FetchIdMeals((location.pathname.match(/\d+/g))[0]);
        console.log(dataIdMeals);
        Object.keys(dataIdMeals.meals[0]).forEach((key) => {
          if (
            dataIdMeals.meals[0][key] === null || dataIdMeals.meals[0][key] === '') {
            delete dataIdMeals.meals[0][key];
          }
        });
        setIdMeals(Object.entries(dataIdMeals.meals[0]));
      } else if (location.pathname.includes('/drinks')) {
        const recommendationMeal = await FetchRecommendationMeals();
        setRecommendationMeals(recommendationMeal.meals);
        const dataIdDrinks = await FetchIdDrink(location.pathname.match(/\d+/g)[0]);
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
  }, [location.pathname]);
  console.log(recommendationMeals);
  console.log(recommendationDrinks);
  const magicNumberSix = 6;
  return (
    <div>
      {idDrinks.length > 0 ? idDrinks.map((element, index) => {
        if (element[0].includes('Ingredient')) {
          return (
            <li
              key={ element[0] }
              data-testid={ `${index}-ingredient-name-and-measure` }
            >
              {element[1]}
            </li>
          );
        }
        switch (element[0]) {
        case 'strDrink':
          return <h1 data-testid="recipe-title">{element[1]}</h1>;
        case 'strDrinkThumb':
          return (<img
            src={ element[1] }
            alt="Imagem da receita"
            data-testid="recipe-photo"
          />);
        case 'strCategory':
          return <h3 data-testid="recipe-category">{element[1]}</h3>;
        case 'strInstructions':
          return <li data-testid="instructions">{element[1]}</li>;
        default: return null;
        }
      })

        : idMeals.map((element, index) => {
          if (element[0].includes('Ingredient')) {
            return (
              <li
                key={ element[0] }
                data-testid={ `${index}-ingredient-name-and-measure` }
              >
                {element[1]}
              </li>

            );
          }
          switch (element[0]) {
          case 'strMeal':
            return <h1 data-testid="recipe-title">{element[1]}</h1>;
          case 'strMealThumb':
            return (<img
              src={ element[1] }
              alt="Imagem da receita"
              data-testid="recipe-photo"
            />);
          case 'strCategory':
            return <h3 data-testid="recipe-category">{element[1]}</h3>;
          case 'strInstructions':
            return <li data-testid="instructions">{element[1]}</li>;
          case 'strYoutube':
            return (
              <iframe
                data-testid="video"
                width="420"
                height="315"
                src={ element[1] }
                title="video"
              />
            );
          default: return null;
          }
        })}
      <div className="carousel">
        {

          recommendationMeals.slice(0, magicNumberSix).map((recommendation, index) => (

            <div
              className="displayCard"
              data-testid={ `${index}-recommendation-card` }
              key={ recommendation.idMeals }
            >
              <h2 data-testid={ `${index}-recommendation-title` }>
                {recommendation.strMeal}

              </h2>
              <img
                src={ recommendation.strMealThumb }
                alt={ recommendation.strArea }
                className="recommendationImage"
              />
            </div>

          ))
        }
      </div>
      <div className="carousel">
        {
          recommendationDrinks.slice(0, magicNumberSix).map((recommendation, index) => (

            <div
              key={ recommendation.idDrink }
              className="displayCard"
              data-testid={ `${index}-recommendation-card` }
            >

              <h2 data-testid={ `${index}-recommendation-title` }>
                {recommendation.strDrink}

              </h2>
              <img
                src={ recommendation.strDrinkThumb }
                alt={ recommendation.strArea }
                className="recommendationImage"
              />

            </div>

          ))
        }
      </div>
      <button data-testid="start-recipe-btn" className="buttonStart">
        Start Recipe
      </button>
    </div>
  );
}

export default RecipeDetails;
