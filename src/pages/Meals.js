import { useContext, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
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
      <Footer />
    </div>
  );
}

export default Meals;
