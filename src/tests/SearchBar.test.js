import React from 'react';
import Provider from '../context/Provider';
import SearchBar from '../components/SearchBar';

describe('Testa o componente SearchBar;', () => {
  test('Verifica se a SearchBar é renderizada na tela;', () => {
    renderWithRouter(
      <Provider>
        <SearchBar />
      </Provider>,
    );
  });
});
