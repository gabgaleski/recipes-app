import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { FetchIdDrink, FetchIdMeals } from '../services/APIsFetch';
// import data from './data';

function RecipeDetails() {
  const [idDrinks, setIdDrinks] = useState([]);
  const [idMeals, setIdMeals] = useState([]);
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
        const dataIdMeals = await FetchIdMeals('52796');
        Object.keys(dataIdMeals.meals[0]).forEach((key) => {
          if (
            dataIdMeals.meals[0][key] === null || dataIdMeals.meals[0][key] === '') {
            delete dataIdMeals.meals[0][key];
          }
        });
        // setIdMeals(Object.entries(dataIdMeals.meals[0]));
      } else if (location.pathname.includes('/drinks')) {
        const dataIdDrinks = await FetchIdDrink('17256');
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
  }, [idMeals, location.pathname]);
  return (
    <div>
      {idDrinks.map((element, index) => {
        if (element[0].includes('Ingredient')) {
          return (
            <li
              key={ element[1] }
              data-testid={ `${index}-ingredient-name-and-measure` }
            >
              {element[1]}
            </li>
          );
        }
        switch (element[0]) {
        case 'strDrink':
          return <title data-testid="recipe-title">{element[1]}</title>;
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
        default:
        }
        return console.log('Deu bom!');
      })}

      {idMeals.map((element, index) => {
        if (element[0].includes('Ingredient')) {
          return (
            <li
              key={ element[1] }
              data-testid={ `${index}-ingredient-name-and-measure` }
            >
              {element[1]}
            </li>
          );
        }
        switch (element[0]) {
        case 'strMeal':
          return <title data-testid="recipe-title">{element[1]}</title>;
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
        default:
        }
        return console.log('DEU BOM DE NOVO');
      })}
    </div>
  );
}

export default RecipeDetails;
