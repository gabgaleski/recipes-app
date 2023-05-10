import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import data from './teste';

function DoneRecipes() {
  const [recipesDone, setRecipesDone] = useState([]);
  const [renderRecipes, setRenderRecipes] = useState([]);

  const filterRecipes = (type) => {
    const newArray = recipesDone.filter((element) => element[`id${type}`]);
    setRenderRecipes(newArray);
  };

  useEffect(() => {
    // const recipes = localStorage.getItem('doneRecipes');
    setRecipesDone(data);
    setRenderRecipes(data);
  }, [setRecipesDone]);

  const copyLink = (link) => {
    navigator.clipboard.writeText(link);
    global.alert('Link copied!');
  };

  return (
    <div>
      <button
        data-testid="filter-by-meal-btn"
        onClick={ () => filterRecipes('Meal') }
      >
        Meals

      </button>
      <button
        data-testid="filter-by-drink-btn"
        onClick={ () => filterRecipes('Drink') }
      >
        Drinks

      </button>
      <button
        data-testid="filter-by-all-btn"
        onClick={ () => setRenderRecipes(recipesDone) }
      >
        All

      </button>
      {renderRecipes.map((recipe, index) => {
        if (recipe.idDrink) {
          return (
            <div key={ recipe.idDrink }>
              <img
                data-testid={ `${index}-horizontal-image` }
                src={ recipe.strDrinkThumb }
                alt="Imagem da Receita"
              />
              <p data-testid={ `${index}-horizontal-top-text` }>{recipe.strCategory}</p>
              <Link to="/">
                <h4 data-testid={ `${index}-horizontal-name` }>{recipe.strDrink}</h4>
              </Link>
              <p data-testid={ `${index}-horizontal-done-date` }>Data da receita feita</p>
              <button onClick={ () => copyLink(recipe.idDrink) }>
                <img
                  data-testid={ `${index}-horizontal-share-btn` }
                  src={ shareIcon }
                  alt="Compartilhar receita"
                />

              </button>
              <p
                data-testid={ `${index}-${recipe.strTags}-horizontal-tag ` }
              >
                {recipe.strTags}
              </p>
            </div>
          );
        }
        return (
          <div key={ recipe.idMeal }>
            <img
              data-testid={ `${index}-horizontal-image` }
              src={ recipe.strMealThumb }
              alt="Imagem da Receita"
            />
            <p data-testid={ `${index}-horizontal-top-text` }>{recipe.strCategory}</p>
            <Link to="/">
              <h4 data-testid={ `${index}-horizontal-name` }>{recipe.strMeal}</h4>
            </Link>
            <p data-testid={ `${index}-horizontal-done-date` }>Data da receita feita</p>
            <button onClick={ () => copyLink(recipe.idMeal) }>
              <img
                data-testid={ `${index}-horizontal-share-btn` }
                src={ shareIcon }
                alt="Compartilhar receita"
              />

            </button>
            <p
              data-testid={ `${index}-${recipe.strTags}-horizontal-tag ` }
            >
              {recipe.strTags}
            </p>
          </div>
        );
      })}
    </div>
  );
}

export default DoneRecipes;
