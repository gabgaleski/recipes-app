import { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';

function Provider({ children }) {
  const [titleHeader, setTitleHeader] = useState('Title');
  const [loadingSearch, setLoadingSearch] = useState(true);
  const [textSearch, setTextSearch] = useState('');
  const [recipesSearch, setRecipesSearch] = useState([]);

  const values = useMemo(
    () => ({
      titleHeader,
      setTitleHeader,
      loadingSearch,
      setLoadingSearch,
      textSearch,
      setTextSearch,
      recipesSearch,
      setRecipesSearch,
    }),
    [
      titleHeader,
      setTitleHeader,
      loadingSearch,
      setLoadingSearch,
      textSearch,
      setTextSearch,
      recipesSearch,
      setRecipesSearch,
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
