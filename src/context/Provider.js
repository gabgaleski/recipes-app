import { useState } from 'react';
import Context from './Context';

function Provider({ children }) {
  const [state] = useState('');

  const values = useMemo(() => (state), [state]);

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
