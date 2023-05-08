import React from 'react';
import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Provider from '../context/Provider';
import renderWithRouter from '../Services/RenderWithRouter';
import SearchBar from '../Components/SearchBar';
import App from '../App';
import { mockMeals } from '../Services/Mocks';

describe('', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: async () => (mockMeals),
    });
  });

  it('Testa se renderiza inputs no componente SearchBar', async () => {
    renderWithRouter(
      <Provider>
        <SearchBar />
      </Provider>,
    );
    const ingredientInput = await screen.findByLabelText(/Ingredient:/i);
    const nameInput = await screen.findByLabelText(/name/i);
    const firstLetterInput = await screen.findByLabelText(/first letter/i);
    const searchButton = screen.getByRole('button', {
      name: 'Busca',
    });

    expect(ingredientInput).toBeInTheDocument();
    expect(nameInput).toBeInTheDocument();
    expect(firstLetterInput).toBeInTheDocument();
    expect(searchButton).toBeInTheDocument();
  });
  it('testa se input chama a função no componente drink', () => {
    const { history } = renderWithRouter(
      <Provider>
        <App />
      </Provider>,
    );

    act(() => {
      history.push('/drinks');
    });

    const ingredientInput = screen.getByLabelText(/Ingredient:/i);
    const nameInput = screen.getByLabelText(/name/i);
    const firstLetterInput = screen.getByLabelText(/first letter/i);
    const searchButton = screen.getByRole('button', {
      name: 'Busca',
    });

    act(() => {
      userEvent.click(ingredientInput);
      userEvent.click(searchButton);
    });

    expect(global.fetch).toHaveBeenCalled();

    act(() => {
      userEvent.click(nameInput);
      userEvent.click(searchButton);
    });

    expect(global.fetch).toHaveBeenCalled();

    act(() => {
      userEvent.click(firstLetterInput);
      userEvent.click(searchButton);
    });

    expect(global.fetch).toHaveBeenCalled();
  });
});
