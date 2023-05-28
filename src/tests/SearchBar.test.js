import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import Provider from '../context/Provider';
import renderWithRouter from '../services/renderWithRouter';
import SearchBar from '../components/SearchBar';
import App from '../App';
import { mockMeals } from '../services/Mocks';

describe('Testes do "SearchBar"', () => {
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
      history.push('/meals');
    });

    userEvent.click(screen.getByRole('img', {
      name: /search icon/i,
    }));

    const ingredientInput = screen.getByLabelText(/Ingredient:/i);
    const nameInput = screen.getByLabelText(/name/i);
    const firstLetterInput = screen.getByLabelText(/first letter/i);
    const searchButton = screen.getByRole('button', {
      name: 'Busca',
    });

    userEvent.click(ingredientInput);
    userEvent.click(searchButton);

    expect(global.fetch).toHaveBeenCalled();

    userEvent.click(nameInput);
    userEvent.click(searchButton);

    expect(global.fetch).toHaveBeenCalled();

    userEvent.click(firstLetterInput);
    userEvent.click(searchButton);

    expect(global.fetch).toHaveBeenCalled();
  });

  it('Testando alerts para mais de um caracter no "First Letter"', async () => {
    const { history } = renderWithRouter(
      <Provider>
        <App />
      </Provider>,
    );

    act(() => {
      history.push('/drinks');
    });

    userEvent.click(screen.getByRole('img', {
      name: /search icon/i,
    }));

    const searchButton = screen.getByRole('button', {
      name: 'Busca',
    });
    const firstLetter = screen.getByRole('radio', {
      name: /first letter:/i,
    });

    const buttonSearchInput = screen.getByRole('img', {
      name: /search icon/i,
    });

    act(() => {
      userEvent.click(buttonSearchInput);
    });

    const getText = screen.getByRole('textbox');

    userEvent.click(firstLetter);
    userEvent.type(getText, 'aq');

    act(() => {
      userEvent.click(searchButton);
    });
  });

  it('Testando alerts para receita nao encontrada', () => {
    const { history } = renderWithRouter(
      <Provider>
        <App />
      </Provider>,
    );

    act(() => {
      history.push('/meals');
    });

    userEvent.click(screen.getByRole('img', {
      name: /search icon/i,
    }));

    const searchBtn = screen.getByRole('button', {
      name: 'Busca',
    });
    const nameInput = screen.getByRole('radio', {
      name: /name:/i,
    });

    const btnInput = screen.getByRole('img', {
      name: /search icon/i,
    });

    act(() => {
      userEvent.click(btnInput);
    });

    const inputText = screen.getByRole('textbox');

    userEvent.click(nameInput);
    userEvent.type(inputText, 'cuzcuz');

    act(() => {
      userEvent.click(searchBtn);
    });
  });

  it('Testando redirecionamento quando encontrar apenas uma receita', () => {
    const { history } = renderWithRouter(
      <Provider>
        <App />
      </Provider>,
    );

    act(() => {
      history.push('/drinks');
    });

    userEvent.click(screen.getByRole('img', {
      name: /search icon/i,
    }));

    const searchButton = screen.getByRole('button', {
      name: 'Busca',
    });
    const nameInput = screen.getByRole('radio', {
      name: /name:/i,
    });

    const buttonSearchInput = screen.getByRole('img', {
      name: /search icon/i,
    });

    act(() => {
      userEvent.click(buttonSearchInput);
    });

    const getText = screen.getByRole('textbox');

    userEvent.click(nameInput);
    userEvent.type(getText, 'aquamarine');

    act(() => {
      userEvent.click(searchButton);
    });
  });

  it('Testando se dispara um alert quando a receita nao é encontrada', () => {
    const { history } = renderWithRouter(
      <Provider>
        <App />
      </Provider>,
    );

    act(() => {
      history.push('/meals');
    });

    userEvent.click(screen.getByRole('img', {
      name: /search icon/i,
    }));

    const searchButton = screen.getByRole('button', {
      name: 'Busca',
    });
    const nameInput = screen.getByRole('radio', {
      name: /name:/i,
    });

    const buttonSearchInput = screen.getByRole('img', {
      name: /search icon/i,
    });

    act(() => {
      userEvent.click(buttonSearchInput);
    });

    const getText = screen.getByRole('textbox');

    userEvent.click(nameInput);
    userEvent.type(getText, 'cacau');

    act(() => {
      userEvent.click(searchButton);
    });
  });
});
