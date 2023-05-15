import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import Provider from '../context/Provider';
import renderWithRouter from '../services/renderWithRouter';
import FavoritesRecipes from '../pages/FavoritesRecipes';

describe('Testa componente Favorites Recipes', () => {
  beforeEach(() => {
    localStorage.clear(); // Limpa o localStorage antes de cada teste
  });
  it('testa se renderiza inputs no componente Favorites Recipes', async () => {
    renderWithRouter(
      <Provider>
        <FavoritesRecipes />
      </Provider>,
    );
    const filterBtnAll = screen.getByRole('button', {
      name: 'All',
    });
    const filterBtnMeal = screen.getByRole('button', {
      name: 'Meals',
    });
    const filterBtnDrink = screen.getByRole('button', {
      name: 'Drinks',
    });

    expect(filterBtnAll).toBeInTheDocument();
    expect(filterBtnMeal).toBeInTheDocument();
    expect(filterBtnDrink).toBeInTheDocument();
  });
});
