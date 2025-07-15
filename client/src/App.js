import React, { useContext, useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './components/AppRouter';
import NavBar from './components/NavBar';
import { observer } from 'mobx-react-lite';
import { Context } from '.';
import { check } from './http/userAPI';
import Spinner from 'react-bootstrap/Spinner';
import NavbarClear from './components/NavbarClear';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Nav from './components/Nav';
import { fetchBrands, fetchTypes } from './http/deviceAPI';
import GeneralModal from './components/modals/GeneralModal';

const App = observer(() => {
  const { user, device } = useContext(Context);
  const [loading, setLoading] = useState(true);
  const [ctrl, setCtrl] = useState(false);

  useEffect(() => {
    check()
      .then(data => {
        user.setUser(data);
        user.setIsAuth(true);
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => setLoading(false));

    fetchTypes().then(data => device.setTypes(data));
    fetchBrands().then(data => device.setBrands(data));
  }, []);

  useEffect(() => {
    const handleKeyDown = e => {
      if (e.key === 'Enter' && e.ctrlKey) {
        setCtrl(true);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: window.innerHeight - 90 }}
      >
        <Spinner animation={'grow'} />
      </div>
    );
  }

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Nav />
      <AppRouter />
      <Footer />
      <GeneralModal
        show={ctrl}
        onHide={() => setCtrl(false)}
        message={'Thanks for your help! This will make our store even better.'}
        title={'Info'}
      />
    </BrowserRouter>
  );
});

export default App;
