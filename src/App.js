import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Profile from './Pages/Profile';
import Done from './Pages/Done';
import Favorites from './Pages/Favorites';
import Meals from './Pages/Meals';
import Drinks from './Pages/Drinks';
import MealsDetails from './Pages/MealsDetails';
import DrinksDetails from './Pages/DrinksDetails';
import DrinksProgress from './Pages/DrinksProgress';
import MealsProgress from './Pages/MealsProgress';
import Login from './Pages/Login';

function App() {
  return (
    <Switch>
      <Route exact path="/meals" component={ Meals } />
      <Route exact path="/drinks" component={ Drinks } />
      <Route exact path="/meals/:id-da-receita" component={ MealsDetails } />
      <Route exact path="/drinks/:id-da-receita" component={ DrinksDetails } />
      <Route exact path="/meals/:id-da-receita/in-progress" component={ MealsProgress } />
      <Route
        exact
        path="/drinks/:id-da-receita/in-progress"
        component={ DrinksProgress }
      />
      <Route exact path="/profile" component={ Profile } />
      <Route exact path="/done-recipes" component={ Done } />
      <Route exact path="/favorite-recipes" component={ Favorites } />
      <Route exact path="/" component={ Login } />
    </Switch>
  );
}

export default App;
