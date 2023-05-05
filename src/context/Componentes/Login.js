import { useContext } from 'react';
import Context from '../Context';

function Login() {
  const { inputEmail,
    setinputEmail,
    inputPassword,
    setinputPassword } = useContext(Context);
  return (
    <div>
      <form>
        <input
          type="email"
          data-testid="email-input"
          onChange={ ({ target }) => setinputEmail(target.value) }
          value={ inputEmail }
        />
        <input
          type="text"
          data-testid="password-input"
          onChange={ ({ target }) => setinputPassword(target.value) }
          value={ inputPassword }
        />
        <button
          type="button"
          data-testid="login-submit-btn"
        >
          Enter
        </button>
      </form>
    </div>

  );
}

export default Login;
