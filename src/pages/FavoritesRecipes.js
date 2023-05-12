import { useContext, useEffect } from 'react';
import Header from '../components/Header';
import Context from '../context/Context';

function FavoritesRecipes() {
  const { setTitleHeader, setLoadingSearch } = useContext(Context);

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
    type: 'meal',
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
          {mockRecipes.map((recipe, index) => (
            <div key={ index }>
              <p>{recipe.type}</p>
              <p data-testid={ `${index}-horizontal-name` }>{recipe.name}</p>
              <p data-testid={ `${index}-horizontal-top-text` }>{recipe.category}</p>
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
                data-testid={ `${index}-horizontal-share-btn` }
              >
                Share
              </button>
              <button
                data-testid={ `${index}-horizontal-favorite-btn` }
              >
                Favorite
              </button>
            </div>
          ))}
        </div>
      </form>
    </div>
  );
}

export default FavoritesRecipes;
