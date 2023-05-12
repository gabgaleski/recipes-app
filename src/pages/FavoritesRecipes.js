import React, { useContext, useEffect, useState } from 'react';
import clipboardCopy from 'clipboard-copy';
import Header from '../components/Header';
import Context from '../context/Context';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function FavoritesRecipes() {
  const { setTitleHeader, setLoadingSearch } = useContext(Context);
  const [alert, setAlert] = useState(false);

  const mockRecipes = [{
    id: '52940',
    type: 'meal',
    nationality: 'italian',
    category: 'Vegetarian',
    alcoholicOrNot: 'Alcoholic',
    name: 'Vegan Chocolate Cake',
    image: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
  },
  {
    id: '52940',
    type: 'drink',
    nationality: 'italian',
    category: 'Vegetarian',
    alcoholicOrNot: 'Alcoholic',
    name: 'Vegan Chocolate Cake',
    image: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
  }];

  useEffect(() => {
    setTitleHeader('Favorite Recipes');
    setLoadingSearch(false);
  }, [setTitleHeader, setLoadingSearch]);

  const handleShareBtn = (element) => {
    clipboardCopy(`http://localhost:3000${element}`);
    setAlert(true);
    const duration = 3000;
    setTimeout(() => {
      setAlert(false);
    }, duration);
  };

  return (
    <div>
      <Header />
      <form>
        <fieldset>
          <button
            type="button"
            data-testid="filter-by-all-btn"
          >
            All
          </button>
          <button
            type="button"
            data-testid="filter-by-meal-btn"
          >
            Meals
          </button>
          <button
            type="button"
            data-testid="filter-by-drink-btn"
          >
            Drinks
          </button>
        </fieldset>
        <div>
          {
            mockRecipes.map((recipe, index) => {
              if (recipe.type === 'meal') {
                return (
                  <div key={ index }>
                    <p>{recipe.type}</p>
                    <p data-testid={ `${index}-horizontal-name` }>{recipe.name}</p>
                    <p data-testid={ `${index}-horizontal-top-text` }>
                      {`${recipe.nationality} - ${recipe.category}`}
                    </p>
                    <p
                      data-testid={ `${index}-horizontal-top-text` }
                    >
                      {recipe.alcoholicOrNot}

                    </p>
                    <img
                      data-testid={ `${index}-horizontal-image` }
                      src={ recipe.image }
                      alt={ recipe.name }
                    />
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
                    >
                      <img
                        src={ blackHeartIcon }
                        alt="Favorite Icon"
                      />
                    </button>
                  </div>
                );
              } if (recipe.type === 'drink') {
                return (
                  <div key={ index }>
                    <p>{recipe.type}</p>
                    <p data-testid={ `${index}-horizontal-name` }>{recipe.name}</p>
                    <p data-testid={ `${index}-horizontal-top-text` }>
                      {`${recipe.alcoholicOrNot} - ${recipe.category}`}
                    </p>
                    <p
                      data-testid={ `${index}-horizontal-top-text` }
                    >
                      {recipe.alcoholicOrNot}

                    </p>
                    <img
                      data-testid={ `${index}-horizontal-image` }
                      src={ recipe.image }
                      alt={ recipe.name }
                    />
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
                    >
                      <img
                        src={ blackHeartIcon }
                        alt="Favorite Icon"
                      />
                    </button>
                  </div>
                );
              }
              return null;
            })
          }
        </div>
      </form>
      {alert && <p>Link copiado!</p>}
    </div>
  );
}

export default FavoritesRecipes;
