import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import Provider from '../context/Provider';
import renderWithRouter from '../services/renderWithRouter';
import Done from '../pages/Done';

describe('Testes no componente "Done"', () => {
  it('Testes se tudo é renderizado', () => {
    renderWithRouter(
      <Provider>
        <Done />
      </Provider>,
    );

    expect(screen.getByRole('button', {
      name: /meals/i,
    })).toBeInTheDocument();
    expect(screen.getByRole('button', {
      name: /drinks/i,
    })).toBeInTheDocument();

    expect(screen.getByRole('button', {
      name: /all/i,
    })).toBeInTheDocument();

    expect(screen.getByTestId('0-horizontal-name'));
    expect(screen.getByTestId('0-IBA,Classic-horizontal-tag'));
  });

  it('testa os botoes fe filtro', async () => {
    renderWithRouter(
      <Provider>
        <Done />
      </Provider>,
    );

    const getImgMeals = screen.getByTestId('2-horizontal-name');
    const getImgDrink1 = screen.getByTestId('1-horizontal-name');
    const getImgDrink2 = screen.getByTestId('0-horizontal-name');

    const getMeals = screen.getByRole('button', {
      name: /meals/i,
    });

    const getDrinks = screen.getByRole('button', {
      name: /drinks/i,
    });

    const getAll = screen.getByRole('button', {
      name: /all/i,
    });

    act(() => {
      userEvent.click(getMeals);
    });

    expect(getImgMeals).toBeInTheDocument();
    expect(getImgDrink1).not.toBeInTheDocument();
    expect(getImgDrink2).not.toBeInTheDocument();

    act(() => {
      userEvent.click(getDrinks);
    });

    waitFor(() => {
      expect(getImgMeals).not.toBeInTheDocument();
      expect(getImgDrink1).toBeInTheDocument();
      expect(getImgDrink2).toBeInTheDocument();
    });

    act(() => {
      userEvent.click(getAll);
    });

    expect(await screen.findByTestId('2-horizontal-image')).toBeInTheDocument();
    expect(await screen.findByTestId('1-horizontal-image')).toBeInTheDocument();
    expect(await screen.findByTestId('0-horizontal-image')).toBeInTheDocument();
  });
});
