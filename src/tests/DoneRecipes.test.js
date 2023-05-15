import React from 'react';
// import { screen, waitFor } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
// import { act } from 'react-dom/test-utils';
import Provider from '../context/Provider';
import renderWithRouter from '../services/renderWithRouter';
import Done from '../pages/Done';
import doneRecipes from '../services/MockLocalStorageDone';

const setLocalStorage = (dataTest) => ({
  getItem: (key) => dataTest[key],
  setItem: (key, value) => {
    dataTest[key] = value;
  },
  removeItem: (key) => {
    delete dataTest[key];
  },
});

describe('Testes no componente "Done"', () => {
  beforeEach(() => {
    // Simula o localStorage antes de cada teste
    Object.defineProperty(window, 'localStorage', {
      value: setLocalStorage(doneRecipes),
    });
  });

  it('Testes se tudo é renderizado', () => {
    renderWithRouter(
      <Provider>
        <Done />
      </Provider>,
    );
  });
});
