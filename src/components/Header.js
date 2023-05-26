import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import searchIcon from '../images/searchIcon.svg';
import Context from '../context/Context';
import SearchBar from './SearchBar';
import icon from '../images/icon.svg';
import '../styles/Header.css';
import logoRecipe from '../images/logoRecipe.svg';
import iconProfile from '../images/iconProfile.svg';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import doneProfile from '../images/doneRecipeHeader.svg';
import favoriteProfile from '../images/favoriteRecipeHeader.svg';
import profileHeader from '../images/profileHeader.svg';

function Header() {
  const { titleHeader, loadingSearch, textSearch, setTextSearch } = useContext(Context);
  const [searchInput, setSearchInput] = useState(false);

  const searchOnClick = () => {
    if (searchInput) {
      setSearchInput(false);
    } else {
      setSearchInput(true);
    }
  };

  const changeLogoImg = () => {
    switch (titleHeader) {
    case 'Meals':
      return mealIcon;
    case 'Drinks':
      return drinkIcon;
    case 'Favorite Recipes':
      return favoriteProfile;
    case 'Done Recipes':
      return doneProfile;
    case 'Profile':
      return profileHeader;
    default:
      return mealIcon;
    }
  };
  return (
    <div className="all-header-container">
      <div className="fixed-header">
        <div className="img-recipe">
          <img className="img-profile" src={ icon } alt="Icone" />
          <img src={ logoRecipe } alt="Logo Recipe APP" />
        </div>
        <div className="header-buttons">
          {
            loadingSearch
              && (
                <div>
                  <button onClick={ searchOnClick }>
                    <img
                      data-testid="search-top-btn"
                      src={ searchIcon }
                      alt="Search Icon"
                    />
                  </button>
                </div>
              )
          }
          <Link to="/profile">
            <img
              data-testid="profile-top-btn"
              src={ iconProfile }
              alt="Profile Icon"
            />
          </Link>
        </div>
      </div>
      <div className="div-image-title">
        <img
          className="image-title"
          src={ changeLogoImg() }
          alt="Logo da pagina"
        />
      </div>
      <h2
        className="title-header"
        data-testid="page-title"
      >
        {titleHeader.toUpperCase()}

      </h2>
      {
        searchInput
      && (
        <div className="container-searchbar-inputs">
          <input
            className="block w-full rounded-md border-0 px-3.5 py-2
            text-gray-900 shadow-sm
             ring-1 ring-inset ring-gray-300 placeholder:text-gray-400
             focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6
             search-input"
            type="text"
            data-testid="search-input"
            placeholder="Procurar..."
            value={ textSearch }
            onChange={ ({ target }) => setTextSearch(target.value) }
          />
          <SearchBar />
        </div>
      )
      }
    </div>
  );
}

export default Header;
