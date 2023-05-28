import React from 'react';
import './styles/App.css';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Done from './pages/Done';
import FavoriteRecipes from './pages/FavoriteRecipes';
import Meals from './pages/Meals';
import Drinks from './pages/Drinks';
import MealsDetails from './pages/MealsDetails';
import DrinksDetails from './pages/DrinksDetails';
import RecipeInProgress from './components/RecipeInProgress';

function App() {
  return (
    <Switch>
      <Route exact path="/meals" component={ Meals } />
      <Route exact path="/drinks" component={ Drinks } />
      <Route exact path="/meals/:id" component={ MealsDetails } />
      <Route exact path="/drinks/:id" component={ DrinksDetails } />
      <Route
        exact
        path="/meals/:id/in-progress"
        component={ RecipeInProgress }
      />
      <Route
        exact
        path="/drinks/:id/in-progress"
        component={ RecipeInProgress }
      />
      <Route exact path="/profile" component={ Profile } />
      <Route exact path="/done-recipes" component={ Done } />
      <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
      <Route exact path="/" component={ Login } />
    </Switch>
  );
}

export default App;
