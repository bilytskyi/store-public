import React, { useContext, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { NavLink, useLocation } from 'react-router-dom';
import { LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from '../utils/consts';
import { login, registration } from '../http/userAPI';
import { observer } from 'mobx-react-lite';
import { Context } from '..';
import { useNavigate } from 'react-router-dom';
import GeneralModal from '../components/modals/GeneralModal';
import classes from '../styles/Auth.module.css';

const Auth = observer(() => {
  const { user } = useContext(Context);
  const location = useLocation();
  const history = useNavigate();
  const isLogin = location.pathname === LOGIN_ROUTE;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(true);
  const [errorVisible, setErrorVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const click = async () => {
    try {
      let data;
      if (isLogin) {
        data = await login(email, password);
      } else {
        data = await registration(email, password);
      }
      user.setUser(data);
      user.setIsAuth(true);
      history(SHOP_ROUTE);
    } catch (e) {
      setErrorVisible(true);
      setErrorMessage(e.response.data.message);
    }
  };

  return (
    <Container className={classes.main}>
      <title>{isLogin ? 'Authorization page' : 'Registration page'}</title>

      <h2 className={classes.title}>
        {isLogin ? 'Authorization' : 'Registration'}
      </h2>
      <Form
        onKeyDown={e => {
          if (e.key === 'Enter') {
            click();
          }
        }}
        className={classes.authForm}
      >
        <Form.Control
          value={email}
          style={{ border: 'solid #212529 1px', boxShadow: 'none' }}
          onChange={e => setEmail(e.target.value)}
          placeholder="Enter your login..."
        />
        <Form.Control
          value={password}
          style={{ border: 'solid #212529 1px', boxShadow: 'none' }}
          type="password"
          onChange={e => setPassword(e.target.value)}
          placeholder="Enter your password..."
        />
        <div className={classes.lastLine}>
          {isLogin ? (
            <div>
              No account?{' '}
              <NavLink className={classes.link} to={REGISTRATION_ROUTE}>
                Registration!
              </NavLink>
            </div>
          ) : (
            <div>
              Already have account?{' '}
              <NavLink className={classes.link} to={LOGIN_ROUTE}>
                Login!
              </NavLink>
            </div>
          )}
          <Button className={classes.btn} onClick={click} variant={'dark'}>
            Enter
          </Button>
        </div>
      </Form>

      <GeneralModal
        show={errorVisible}
        onHide={() => setErrorVisible(false)}
        message={errorMessage}
        title={'Error'}
      />
    </Container>
  );
});

export default Auth;
