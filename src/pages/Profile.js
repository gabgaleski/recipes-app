import { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Context from '../context/Context';
import doneProfile from '../images/doneProfile.svg';
import favoriteProfile from '../images/favoriteProfile.svg';
import logoutProfile from '../images/logoutProfile.svg';
import '../styles/Profile.css';

function Profile() {
  const { setTitleHeader, setLoadingSearch } = useContext(Context);

  useEffect(() => {
    setTitleHeader('Profile');
    setLoadingSearch(false);
  }, [setTitleHeader, setLoadingSearch]);

  const getEmail = () => {
    const savedEmail = JSON.parse(localStorage.getItem('user'));
    const storedEmail = savedEmail ? savedEmail.email : '';
    return storedEmail;
  };

  const history = useHistory();

  const doneRecipesRoute = () => {
    history.push('/done-recipes');
  };

  const favoriteRecipesRoute = () => {
    history.push('/favorite-recipes');
  };

  const logoutRoute = () => {
    localStorage.clear();
    history.push('/');
  };

  return (
    <div>
      <Header />
      <div className="profile-body">
        <p
          data-testid="profile-email"
        >
          {getEmail()}
        </p>
        <button
          type="button"
          data-testid="profile-done-btn"
          onClick={ doneRecipesRoute }
        >
          <img src={ doneProfile } alt="Botao para ir a pagina Done" />
        </button>
        <hr />
        <button
          type="button"
          data-testid="profile-favorite-btn"
          onClick={ favoriteRecipesRoute }
        >
          <img src={ favoriteProfile } alt="Botao para ir a pagina Favorite" />
        </button>
        <hr />

        <button
          type="button"
          data-testid="profile-logout-btn"
          onClick={ logoutRoute }
        >
          <img src={ logoutProfile } alt="Botao para deslogar" />
        </button>
      </div>
      <Footer />
    </div>
  );
}

export default Profile;
