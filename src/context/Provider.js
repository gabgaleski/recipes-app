import { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';

function Provider({ children }) {
  const [titleHeader, setTitleHeader] = useState('Title');
  const [loadingSearch, setLoadingSearch] = useState(true);

  const values = useMemo(
    () => ({
      titleHeader,
      setTitleHeader,
      loadingSearch,
      setLoadingSearch,
    }),
    [
      titleHeader,
      setTitleHeader,
      loadingSearch,
      setLoadingSearch,

    ],
  );

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
