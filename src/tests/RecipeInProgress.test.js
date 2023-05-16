import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route } from 'react-router-dom';
import RecipeInProgress from '../components/RecipeInProgress';
import renderWithRouter from '../services/renderWithRouter';
import Provider from '../context/Provider';

beforeEach(() => {
  localStorage.clear();
});

const Aquamarine = {
  drinks: [
    {
      idDrink: '178319',
      strDrink: 'Aquamarine',
      strDrinkAlternate: null,
      strTags: null,
      strVideo: null,
      strCategory: 'Cocktail',
      strIBA: null,
      strAlcoholic: 'Alcoholic',
      strGlass: 'Martini Glass',
      strInstructions: 'Shake well in a shaker with ice.\r\nStrain in a martini glass.',
      strInstructionsES: 'Agite bien en una coctelera con hielo. Cuela en una copa de Martini.',
      strInstructionsDE: null,
      strInstructionsFR: null,
      strInstructionsIT: 'Shakerare bene in uno shaker con ghiaccio.\r\nFiltrare in una coppetta Martini.',
      'strInstructionsZH-HANS': null,
      'strInstructionsZH-HANT': null,
      strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
      strIngredient1: 'Hpnotiq',
      strIngredient2: 'Pineapple Juice',
      strIngredient3: 'Banana Liqueur',
      strIngredient4: null,
      strIngredient5: null,
      strIngredient6: null,
      strIngredient7: null,
      strIngredient8: null,
      strIngredient9: null,
      strIngredient10: null,
      strIngredient11: null,
      strIngredient12: null,
      strIngredient13: null,
      strIngredient14: null,
      strIngredient15: null,
      strMeasure1: '2 oz',
      strMeasure2: '1 oz',
      strMeasure3: '1 oz',
      strMeasure4: '',
      strMeasure5: '',
      strMeasure6: '',
      strMeasure7: '',
      strMeasure8: null,
      strMeasure9: null,
      strMeasure10: null,
      strMeasure11: null,
      strMeasure12: null,
      strMeasure13: null,
      strMeasure14: null,
      strMeasure15: null,
      strImageSource: null,
      strImageAttribution: null,
      strCreativeCommonsConfirmed: 'No',
      dateModified: null,
    },
  ],
};
const Spice = {
  meals: [
    {
      idMeal: '52771',
      strMeal: 'Spicy Arrabiata Penne',
      strDrinkAlternate: null,
      strCategory: 'Vegetarian',
      strArea: 'Italian',
      strInstructions: 'Bring a large pot of water to a boil. Add kosher salt to the boiling water, then add the pasta. Cook according to the package instructions, about 9 minutes.\r\nIn a large skillet over medium-high heat, add the olive oil and heat until the oil starts to shimmer. Add the garlic and cook, stirring, until fragrant, 1 to 2 minutes. Add the chopped tomatoes, red chile flakes, Italian seasoning and salt and pepper to taste. Bring to a boil and cook for 5 minutes. Remove from the heat and add the chopped basil.\r\nDrain the pasta and add it to the sauce. Garnish with Parmigiano-Reggiano flakes and more basil and serve warm.',
      strMealThumb: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
      strTags: 'Pasta,Curry',
      strYoutube: 'https://www.youtube.com/watch?v=1IszT_guI08',
      strIngredient1: 'penne rigate',
      strIngredient2: 'olive oil',
      strIngredient3: 'garlic',
      strIngredient4: 'chopped tomatoes',
      strIngredient5: 'red chile flakes',
      strIngredient6: 'italian seasoning',
      strIngredient7: 'basil',
      strIngredient8: 'Parmigiano-Reggiano',
      strIngredient9: '',
      strIngredient10: '',
      strIngredient11: '',
      strIngredient12: '',
      strIngredient13: '',
      strIngredient14: '',
      strIngredient15: '',
      strIngredient16: null,
      strIngredient17: null,
      strIngredient18: null,
      strIngredient19: null,
      strIngredient20: null,
      strMeasure1: '1 pound',
      strMeasure2: '1/4 cup',
      strMeasure3: '3 cloves',
      strMeasure4: '1 tin ',
      strMeasure5: '1/2 teaspoon',
      strMeasure6: '1/2 teaspoon',
      strMeasure7: '6 leaves',
      strMeasure8: 'spinkling',
      strMeasure9: '',
      strMeasure10: '',
      strMeasure11: '',
      strMeasure12: '',
      strMeasure13: '',
      strMeasure14: '',
      strMeasure15: '',
      strMeasure16: null,
      strMeasure17: null,
      strMeasure18: null,
      strMeasure19: null,
      strMeasure20: null,
      strSource: null,
      strImageSource: null,
      strCreativeCommonsConfirmed: null,
      dateModified: null,
    },
  ],
};
it('Testa a renderização do Recipe in Progress da pagiga drinks', async () => {
  jest.spyOn(global, 'fetch').mockResolvedValue({
    json: jest.fn().mockResolvedValue(Aquamarine),
  });

  renderWithRouter(
    <Provider>
      <MemoryRouter initialEntries={ ['/drinks/178319/in-progress'] }>
        <Route
          exact
          path="/drinks/:id/in-progress"
          render={ (props) => <RecipeInProgress { ...props } currentPage="drinks" /> }
        />
      </MemoryRouter>
    </Provider>,
  );

  expect(global.fetch).toHaveBeenCalled();

  const image = await screen.findByRole('heading', { name: /aquamarine/i });
  const ingredientCheckbox = await screen.findByRole('checkbox', { name: /hpnotiq/i });

  expect(image).toBeInTheDocument();
  userEvent.click(ingredientCheckbox);
});

it('Testa drink e checkbox', async () => {
  jest.spyOn(global, 'fetch').mockResolvedValue({
    json: jest.fn().mockResolvedValue(Aquamarine),
  });

  renderWithRouter(
    <Provider>
      <MemoryRouter initialEntries={ ['/drinks/178319/in-progress'] }>
        <Route
          exact
          path="/drinks/:id/in-progress"
          render={ (props) => <RecipeInProgress { ...props } currentPage="drinks" /> }
        />
      </MemoryRouter>
    </Provider>,
  );

  const isCheck1 = await screen.findByRole('checkbox', { name: /hpnotiq/i });
  const isCheck2 = screen.getByRole('checkbox', { name: /pineapple juice/i });
  const isCheck3 = screen.getByRole('checkbox', { name: /banana liqueur/i });
  const finishButton = screen.getByRole('button', { name: /finalizar receita/i });
  expect(isCheck1).toBeInTheDocument();
  userEvent.click(isCheck1);
  expect(isCheck2).toBeInTheDocument();
  userEvent.click(isCheck2);
  expect(isCheck3).toBeInTheDocument();
  userEvent.click(isCheck3);
  userEvent.click(finishButton);
});

it('Testa a renderização do Recipe in Progress da pagiga meals', async () => {
  jest.spyOn(global, 'fetch').mockResolvedValue({
    json: jest.fn().mockResolvedValue(Spice),
  });
  global.navigator.clipboard = {
    writeText: jest.fn().mockReturnValueOnce('texto'),
  };
  renderWithRouter(
    <Provider>
      <MemoryRouter initialEntries={ ['/meals/52771/in-progress'] }>
        <Route
          exact
          path="/meals/:id/in-progress"
          render={ (props) => <RecipeInProgress { ...props } currentPage="meals" /> }
        />
      </MemoryRouter>
    </Provider>,
  );

  const button = await screen.findByRole('button', { name: /compartilhar/i });
  userEvent.click(button);
  const message = screen.getByText(/Link copied!/i);
  expect(message).toBeInTheDocument();
  const image = await screen.findByRole('img', { name: /meal img/i });
  const ingredient1 = await screen.findByRole('checkbox', { name: /penne rigate/i });
  const ingredient2 = screen.getByRole('checkbox', { name: /olive oil/i });
  const ingredient3 = screen.getByRole('checkbox', { name: /garlic/i });
  const ingredient4 = screen.getByRole('checkbox', { name: /chopped tomatoes/i });
  const ingredient5 = screen.getByRole('checkbox', { name: /red chile flakes/i });
  const ingredient6 = screen.getByRole('checkbox', { name: /italian seasoning/i });
  const ingredient7 = screen.getByRole('checkbox', { name: /basil/i });
  const ingredient8 = screen.getByRole('checkbox', { name: /parmigiano-reggiano/i });
  expect(image).toBeInTheDocument();
  const finishButton = screen.getByRole('button', { name: /finalizar receita/i });
  expect(finishButton).toBeDisabled();
  userEvent.click(ingredient1);
  userEvent.click(ingredient1);
  userEvent.click(ingredient1);
  userEvent.click(ingredient2);
  userEvent.click(ingredient3);
  userEvent.click(ingredient4);
  userEvent.click(ingredient5);
  userEvent.click(ingredient6);
  userEvent.click(ingredient7);
  userEvent.click(ingredient8);
  expect(finishButton).toBeEnabled();
  userEvent.click(finishButton);
});
