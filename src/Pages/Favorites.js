import { useContext, useEffect } from 'react';
import Header from '../Components/Header';
import Context from '../context/Context';

function Favorites() {
  const { setTitleHeader, setLoadingSearch } = useContext(Context);

  useEffect(() => {
    setTitleHeader('Favorite Recipes');
    setLoadingSearch(false);
  }, [setTitleHeader, setLoadingSearch]);

  return (
    <div>
      <Header />
    </div>
  );
}

export default Favorites;
