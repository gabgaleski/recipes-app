import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import shareIcon from '../images/shareDone.svg';
import '../styles/DoneRecipes.css';
import AllDone from '../images/AllDone.svg';
import AllDrinks from '../images/AllDrinksDone.svg';
import All from '../images/AllMealsDone.svg';

function DoneRecipes() {
  const [recipesDone, setRecipesDone] = useState([]);
  const [renderRecipes, setRenderRecipes] = useState([]);
  const [copied, setCopied] = useState(false);

  const filterRecipes = (type) => {
    const newArray = recipesDone.filter((element) => element.type === type);
    setRenderRecipes(newArray);
    setCopied(false);
  };

  useEffect(() => {
    const recipes = JSON.parse(localStorage.getItem('doneRecipes'));
    setRecipesDone(recipes);
    setRenderRecipes(recipes);
  }, [setRecipesDone]);

  const copyLink = (link) => {
    navigator.clipboard.writeText(link);
    setCopied(true);
  };

  return (
    <div className="done-container">
      <div className="buttons-container-done">
        <button
          data-testid="filter-by-all-btn"
          onClick={ () => setRenderRecipes(recipesDone) }
        >
          <img src={ AllDone } alt="Button Filter Meals" />
        </button>
        <button
          data-testid="filter-by-meal-btn"
          onClick={ () => filterRecipes('meal') }
        >
          <img src={ All } alt="Button Filter All" />
        </button>
        <button
          data-testid="filter-by-drink-btn"
          onClick={ () => filterRecipes('drink') }
        >
          <img src={ AllDrinks } alt="Button Filter Drinks" />
        </button>
      </div>
      {renderRecipes && renderRecipes.map((recipe, index) => {
        if (recipe.type === 'drink') {
          return (
            <div className="card-container" key={ recipe.id }>
              <div className="img-container">
                <Link to={ `/drinks/${recipe.id}` }>
                  <img
                    className="image-recipe"
                    data-testid={ `${index}-horizontal-image` }
                    src={ recipe.image }
                    alt="Imagem da Receita"
                  />
                </Link>
              </div>
              <div className="infos-container">
                <div className="first-infos">
                  <Link to={ `/drinks/${recipe.id}` }>
                    <h4
                      className="recipe-name"
                      data-testid={ `${index}-horizontal-name` }
                    >
                      {recipe.name}
                    </h4>
                  </Link>
                  <button onClick={ () => copyLink(`http://localhost:3000/drinks/${recipe.id}`) }>
                    <img
                      className="image-recipe"
                      data-testid={ `${index}-horizontal-share-btn` }
                      src={ shareIcon }
                      alt="Compartilhar receita"
                    />
                  </button>
                </div>
                <p data-testid={ `${index}-horizontal-top-text` }>{recipe.category}</p>
                <p
                  className="date-done"
                  data-testid={ `${index}-horizontal-done-date` }
                >
                  {recipe.doneDate}
                </p>
                <div className="tags-container">
                  <p
                    className="date-done"
                    data-testid={ `${index}-${recipe.tags[0]}-horizontal-tag` }
                  >
                    {recipe.tags[0]}
                  </p>
                  <p
                    className="date-done"
                    data-testid={ `${index}-${recipe.tags[1]}-horizontal-tag` }
                  >
                    {recipe.tags[1]}
                  </p>
                </div>
                <p
                  className="alcoho date-done"
                  data-testid={ `${index}-horizontal-top-text` }
                >
                  {recipe.alcoholicOrNot}
                </p>
              </div>
            </div>
          );
        }
        return (
          <div className="card-container" key={ recipe.id }>
            <div className="img-container">
              <Link to={ `/meals/${recipe.id}` }>
                <img
                  className="image-recipe"
                  data-testid={ `${index}-horizontal-image` }
                  src={ recipe.image }
                  alt="Imagem da Receita"
                />
              </Link>
            </div>
            <div className="infos-container">
              <div className="first-infos">
                <Link to={ `/meals/${recipe.id}` }>
                  <h4
                    className="recipe-name"
                    data-testid={ `${index}-horizontal-name` }
                  >
                    {recipe.name}
                  </h4>
                </Link>
                <button onClick={ () => copyLink(`http://localhost:3000/meals/${recipe.id}`) }>
                  <img
                    data-testid={ `${index}-horizontal-share-btn` }
                    src={ shareIcon }
                    alt="Compartilhar receita"
                  />
                </button>
              </div>
              <p data-testid={ `${index}-horizontal-top-text` }>
                {`${recipe.nationality} - ${recipe.category}`}
              </p>
              <p
                className="date-done"
                data-testid={ `${index}-horizontal-done-date` }
              >
                {recipe.doneDate}

              </p>
              <p
                className="date-done"
                data-testid={ `${index}-${recipe.tags[0]}-horizontal-tag` }
              >
                {recipe.tags[0]}
              </p>
              <p
                data-testid={ `${index}-${recipe.tags[1]}-horizontal-tag` }
              >
                {recipe.tags[1]}
              </p>
            </div>
          </div>
        );
      })}
      {copied && <p>Link copied!</p>}
    </div>
  );
}

export default DoneRecipes;
