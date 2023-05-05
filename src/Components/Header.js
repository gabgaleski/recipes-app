import { useContext } from 'react';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import Context from '../context/Context';

function Header() {
  const { titleHeader, loadingSearch } = useContext(Context);

  return (
    <div>
      <Link to="/profile">
        <img
          data-testid="profile-top-btn"
          src={ profileIcon }
          alt="Profile Icon"
        />
      </Link>
      { loadingSearch
              && <img
                data-testid="search-top-btn"
                src={ searchIcon }
                alt="Search Icon"
              />}
      <h2 data-testid="page-title">{titleHeader}</h2>
      <button>R</button>
    </div>
  );
}

export default Header;
