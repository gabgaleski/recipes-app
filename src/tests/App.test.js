import React from 'react';
import App from '../App';
import Provider from '../context/Provider';
import renderWithRouter from '../services/renderWithRouter';

test('Farewell, front-end', () => {
  // Este arquivo pode ser modificado ou deletado sem problemas
  renderWithRouter(
    <Provider>
      <App />
    </Provider>,
  );
});
