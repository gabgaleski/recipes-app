import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import '../styles/Login.css';
import Logo from '../images/logo.svg';

function Login() {
  const [userInfo, setUserInfo] = useState({ email: '', password: '' });
  const [disableButton, setDisableButton] = useState(false);

  const validateForm = () => {
    const emailValidate = userInfo.email.includes('.com');
    const PASSWORD_LENGTH = 6;
    const checkPassword = userInfo.password.length >= PASSWORD_LENGTH;
    if (checkPassword && emailValidate) {
      setDisableButton(true);
    } else {
      setDisableButton(false);
    }
  };

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setUserInfo((preveState) => ({ ...preveState, [name]: value }));
    validateForm();
  };
  const history = useHistory();
  const mealsRoute = () => {
    history.push('/meals');
  };

  const saveInStorage = () => {
    const user = userInfo.email;
    localStorage
      .setItem('user', JSON.stringify({ email: user }));
    mealsRoute();
  };
  return (
    <div className="login-space">
      <img src={ Logo } alt="Logo" />
      <form className="space-y-6 w-80" action="#" method="POST">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium leading-6 text-white"
          >
            Email
          </label>
          <div className="mt-2">
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              data-testid="email-input"
              onChange={ handleChange }
              value={ userInfo.email }
              required
              className="block w-full rounded-md border-0 py-1.5 text-gray-900
              shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400
              focus:ring-2
              focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div>
          <div className="flex items-center justify-between">
            <label
              htmlFor="password"
              className="block text-sm font-medium leading-6 text-white"
            >
              Senha
            </label>
            <a
              href="www.linkedin.com"
              target="_blank"
              className="font-semibold text-indigo-600 hover:text-indigo-500 text-sm"
            >
              Esqueceu a senha?
            </a>
          </div>
          <div className="mt-2">
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              data-testid="password-input"
              onChange={ handleChange }
              value={ userInfo.password }
              required
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm
              ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2
              focus:ring-inset
              focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div>
          <button
            data-testid="login-submit-btn"
            disabled={ !disableButton }
            onClick={ saveInStorage }
            type="button"
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5
             text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500
             focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
             focus-visible:outline-indigo-600"
          >
            Entrar
          </button>
        </div>
      </form>
      <p className="mt-10 text-center text-sm text-white">
        Nao tem conta ainda?
        <a
          href="https://www.linkedin.com/in/gabriel-galeski/"
          target="_blank"
          className="font-semibold
          leading-6 text-indigo-600 hover:text-indigo-500"
          rel="noreferrer"
        >
          <span className="span-login">
            Comece com 7 dias gratis
          </span>
        </a>
      </p>
    </div>

  );
}

export default Login;
