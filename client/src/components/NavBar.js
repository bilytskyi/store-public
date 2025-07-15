import React, { useContext } from 'react';
import { Context } from '..';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';
import {
  ADMIN_ROUTE,
  BASKET_ROUTE,
  LOGIN_ROUTE,
  SHOP_ROUTE,
} from '../utils/consts';
import Button from 'react-bootstrap/Button';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';

const NavBar = observer(() => {
  const { user } = useContext(Context);
  const history = useNavigate();

  const logOut = () => {
    user.setUser({});
    user.setIsAuth(false);
    localStorage.removeItem('token');
  };

  return (
    <Navbar bg="dark" data-bs-theme="dark" style={{ height: 60 }}>
      <Container>
        <NavLink
          style={{ color: 'white', textDecoration: 'none', paddingLeft: 10 }}
          to={SHOP_ROUTE}
        >
          --main
        </NavLink>
        {user.isAuth ? (
          <Nav
            className="ms-auto d-flex justify-content-center align-items-center ms-2 p-1 gap-4"
            style={{ color: 'white' }}
          >
            <div className="d-flex justify-content-center align-items-center me-2">
              <span>
                wellcome,{' '}
                <span style={{ color: 'orange' }}>{user.user.email}</span>!
              </span>
            </div>

            {user.user.role === 'ADMIN' && (
              <NavLink
                style={{ color: 'white', textDecoration: 'none' }}
                to={ADMIN_ROUTE}
              >
                admin page
              </NavLink>
            )}

            <NavLink
              style={{ color: 'white', textDecoration: 'none' }}
              to={BASKET_ROUTE}
            >
              basket <span style={{ color: 'orange' }}>(6)</span>
            </NavLink>

            <NavLink
              style={{ color: 'white', textDecoration: 'none' }}
              onClick={() => logOut()}
            >
              logout
            </NavLink>
          </Nav>
        ) : (
          <Nav className="ms-auto" style={{ color: 'white' }}>
            <NavLink
              style={{ color: 'white', textDecoration: 'none' }}
              to={LOGIN_ROUTE}
            >
              login
            </NavLink>
          </Nav>
        )}
      </Container>
    </Navbar>
  );
});

export default NavBar;
