import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import Context from '../context/Context';

function Header() {
  const { titleHeader, loadingSearch } = useContext(Context);
  const [searchInput, setSearchInput] = useState(false);

  const searchOnClick = () => {
    if (searchInput) {
      setSearchInput(false);
    } else {
      setSearchInput(true);
    }
  };

  return (
    <div>
      <Link to="/profile">
        <img
          data-testid="profile-top-btn"
          src={ profileIcon }
          alt="Profile Icon"
        />
      </Link>
      {
        loadingSearch
              && (
                <button onClick={ searchOnClick }>
                  <img
                    data-testid="search-top-btn"
                    src={ searchIcon }
                    alt="Search Icon"
                  />
                </button>)
      }
      {searchInput && <input type="text" data-testid="search-input" />}
      <h2 data-testid="page-title">{titleHeader}</h2>
    </div>
  );
}

export default Header;
