import React from 'react';
import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../services/renderWithRouter';
import Provider from '../context/Provider';
import RecipeDetails from '../components/RecipeDetails';

describe('Testa a tela de detalhes de uma receita:', () => {
  test('Verifica se a tela é renderizada corretamente', async () => {
    const { history } = renderWithRouter(
      <Provider>
        <RecipeDetails />
      </Provider>,
    );
    act(() => {
      history.push('/drinks/178319');
    });

    const favBtn = await screen.findByTestId('favorite-btn');

    expect(history.location.pathname).toBe('/drinks/178319');
    expect(screen.getByTestId('start-recipe-btn')).toBeInTheDocument();
    expect(await screen.findByTestId('1-recommendation-card')).toBeInTheDocument();
    expect(await screen.findByRole('heading', {
      name: /alcoholic/i,
    })).toBeInTheDocument();
    expect(favBtn).toBeInTheDocument();

    userEvent.click(favBtn);
  });
});
