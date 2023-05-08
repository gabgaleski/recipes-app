import { useContext, useEffect } from 'react';
import Header from '../components/Header';
import Context from '../context/Context';

function Done() {
  const { setTitleHeader, setLoadingSearch } = useContext(Context);

  useEffect(() => {
    setTitleHeader('Done Recipes');
    setLoadingSearch(false);
  }, [setTitleHeader, setLoadingSearch]);

  return (
    <div>
      <Header />
    </div>
  );
}

export default Done;
