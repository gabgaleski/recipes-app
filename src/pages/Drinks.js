import { useContext, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
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
      <Footer />
    </div>
  );
}

export default Drinks;
