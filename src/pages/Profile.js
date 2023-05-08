import { useContext, useEffect } from 'react';
import Header from '../components/Header';
import Context from '../context/Context';

function Profile() {
  const { setTitleHeader, setLoadingSearch } = useContext(Context);

  useEffect(() => {
    setTitleHeader('Profile');
    setLoadingSearch(false);
  }, [setTitleHeader, setLoadingSearch]);

  return (
    <div>
      <Header />
    </div>
  );
}

export default Profile;
