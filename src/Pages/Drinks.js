import { useContext, useEffect } from 'react';
import Header from '../Components/Header';
import Context from '../context/Context';

function Drinks() {
  const { setTitleHeader, setLoadingSearch } = useContext(Context);

  useEffect(() => {
    setTitleHeader('Drinks');
    setLoadingSearch(true);
  }, [setTitleHeader, setLoadingSearch]);

  return (
    <div>
      <Header />
    </div>
  );
}

export default Drinks;
