import { useEffect, useState } from 'react';
// import { useLocation } from 'react-router-dom';
import { FetchIdDrink, FetchIdMeals } from '../services/APIsFetch';
import data from './data';

function RecipeDetails() {
  const [idDrinks, setIdDrinks] = useState([]);
  const [idMeals, setIdMeals] = useState([]);
  //   const location = useLocation;
  //   console.log(location.pathname); // Exibe o caminho atual
  //   console.log(location.search);

  function removerValoresNullEVazios() {
    Object.keys(idDrinks[0]).forEach((key) => {
      if (idDrinks[0][key] === null || idDrinks[0][key] === '') {
        delete idDrinks[key];
      }
      console.log(idDrinks);
    });
  }

  useEffect(() => {
    const handleChange = async () => {
      const dataIdM = await FetchIdMeals('52796');
      const dataIDD = await FetchIdDrink('17256');
      setIdMeals(dataIdM.meals);
      setIdDrinks(dataIDD.drinks);
      // if (location.pathname === '/meals') {
      //   const dataIdMeals = await FetchIdMeals(location.pathname.id);
      //   setIdMeals(dataIdMeals);
      // } else if (location.pathname === '/drinks') {
      //   const dataIdDrinks = await FetchIdDrink(location.pathname.id);
      //   setIdDrinks(dataIdDrinks);
      // }
    };
    handleChange();
  }, []);
  console.log(idDrinks);
  return (
    <div>
      {idDrinks.length > 0 ? idDrinks.map((drinkOrMeal, index) => (
        <>
          <title
            data-testid="recipe-title"
            key={ drinkOrMeal.idDrink }
          >
            {drinkOrMeal.strDrink}

          </title>
          <img
            data-testid="recipe-photo"
            src={ drinkOrMeal.strMealThumb }
            alt={ drinkOrMeal.strDrink }
          />
          <h4 data-testid="recipe-category">{drinkOrMeal.strCategory}</h4>
          <ol>
            <li
              data-testid={ `${index}-ingredient-name-and-measure` }
            >
              {`${drinkOrMeal.strIngredient1} `}

            </li>
            <li
              data-testid={ `${index + 1}-ingredient-name-and-measure` }
            >
              {drinkOrMeal.strIngredient2}
            </li>
            <li
              data-testid={ `${index}-ingredient-name-and-measure` }
            >
              {drinkOrMeal.strIngredient3}

            </li>
            <li
              data-testid={ `${index}-ingredient-name-and-measure` }
            >
              {drinkOrMeal.strIngredient4}

            </li>
            <li
              data-testid={ `${index}-ingredient-name-and-measure` }
            >
              {drinkOrMeal.strIngredient5}

            </li>
            <li
              data-testid={ `${index}-ingredient-name-and-measure` }
            >
              {drinkOrMeal.strIngredient6}

            </li>
            <li
              data-testid={ `${index}-ingredient-name-and-measure` }
            >
              {drinkOrMeal.strIngredient7}

            </li>
            <li
              data-testid={ `${index}-ingredient-name-and-measure` }
            >
              {drinkOrMeal.strIngredient8}

            </li>
            <li
              data-testid={ `${index}-ingredient-name-and-measure` }
            >
              {drinkOrMeal.strIngredient9}

            </li>
            <li
              data-testid={ `${index}-ingredient-name-and-measure` }
            >
              {drinkOrMeal.strIngredient10}

            </li>
            <li
              data-testid={ `${index}-ingredient-name-and-measure` }
            >
              {drinkOrMeal.strIngredient11}

            </li>
            <li
              data-testid={ `${index}-ingredient-name-and-measure` }
            >
              {drinkOrMeal.strIngredient12}

            </li>
            <li
              data-testid={ `${index}-ingredient-name-and-measure` }
            >
              {drinkOrMeal.strIngredient13}

            </li>
            <li
              data-testid={ `${index}-ingredient-name-and-measure` }
            >
              {drinkOrMeal.strIngredient14}

            </li>
            <li
              data-testid={ `${index}-ingredient-name-and-measure` }
            >
              {drinkOrMeal.strIngredient15}

            </li>
          </ol>
          <h4>instructions:</h4>
          <p data-testid="instructions">{drinkOrMeal.strInstructions}</p>
        </>
      )) : idMeals.map((meal) => (
        <>
          <title
            data-testid="recipe-title"
            key={ meal.idMeal }
          >
            {meal.strMeal}

          </title>
          <img
            data-testid="recipe-photo"
            src={ meal.strMealThumb }
            alt={ meal.strMeal }
          />
          <h4 data-testid="recipe-category">{meal.strCategory}</h4>
          <ol>
            <li
              data-testid="1-ingredient-name-and-measure"
            >
              {meal.strIngredient1}

            </li>
            <li
              data-testid="2-ingredient-name-and-measure"
            >
              {meal.strIngredient2}
            </li>
            <li
              data-testid="3-ingredient-name-and-measure"
            >
              {meal.strIngredient3}

            </li>
            <li
              data-testid="$4-ingredient-name-and-measure"
            >
              {drinkOrMeal.strIngredient4}

            </li>
            <li
              data-testid="5-ingredient-name-and-measure"
            >
              {drinkOrMeal.strIngredient5}

            </li>
            <li
              data-testid="6-ingredient-name-and-measure"
            >
              {drinkOrMeal.strIngredient6}

            </li>
            <li
              data-testid="7-ingredient-name-and-measure"
            >
              {drinkOrMeal.strIngredient7}

            </li>
            <li
              data-testid="8-ingredient-name-and-measure"
            >
              {drinkOrMeal.strIngredient8}

            </li>
            <li
              data-testid="9-ingredient-name-and-measure"
            >
              {drinkOrMeal.strIngredient9}

            </li>
          </ol>
          <h4>instructions:</h4>
          <p data-testid="instructions">{drinkOrMeal.strInstructions}</p>
        </>
      ))}
      <button onClick={ removerValoresNullEVazios }>Click</button>
    </div>
  );
}

export default RecipeDetails;
