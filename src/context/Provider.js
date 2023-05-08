import { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';

function Provider({ children }) {
  const [state] = useState('');
  const [inputEmail, setinputEmail] = useState('');
  const [inputPassword, setinputPassword] = useState('');
  const [disableButton, setdisableButton] = useState(false);

  const values = useMemo(() => ({
    state,
    inputEmail,
    setinputEmail,
    inputPassword,
    setinputPassword,
    disableButton,
    setdisableButton,
  }), [state,
    setinputEmail,
    inputEmail,
    inputPassword,
    setinputPassword,
    disableButton,
    setdisableButton,
  ]);

  return (
    <Context.Provider value={ values }>
      {children}
    </Context.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default Provider;
