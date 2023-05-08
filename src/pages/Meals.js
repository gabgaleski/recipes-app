import { useContext, useEffect } from 'react';
import Header from '../components/Header';
import Context from '../context/Context';

function Meals() {
  const { setTitleHeader, setLoadingSearch } = useContext(Context);

  useEffect(() => {
    setTitleHeader('Meals');
    setLoadingSearch(true);
  }, [setTitleHeader, setLoadingSearch]);

  return (
    <div>
      <Header />
    </div>
  );
}

export default Meals;
