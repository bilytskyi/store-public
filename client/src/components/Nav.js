import React, { useContext, useState } from 'react';
import classes from '../styles/Nav.module.css';
import Container from 'react-bootstrap/Container';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Context } from '..';
import {
  ADMIN_ROUTE,
  BASKET_ROUTE,
  LOGIN_ROUTE,
  SHOP_ROUTE,
} from '../utils/consts';
import { observer } from 'mobx-react-lite';
import BurgerSvg from './BurgerSvg';
import Button from 'react-bootstrap/esm/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { HashLink } from 'react-router-hash-link';
import DropdownTypes from './DropdownTypes';
import DropdownBrands from './DropdownBrands';

const Nav = observer(() => {
  const { user, device } = useContext(Context);
  const deviceListRef = device.deviceRef;
  const deviceListRef2 = document.getElementById('device-list');
  console.log(deviceListRef2);
  const history = useNavigate();

  const handleScroll = () => {
    history('/');
    setTimeout(() => {
      const rect = deviceListRef2.getBoundingClientRect();
      const absoluteY = window.scrollY + rect.top;
      window.scrollTo({ top: absoluteY, behavior: 'smooth' });
    }, 300);
  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const logOut = () => {
    user.setUser({});
    user.setIsAuth(false);
    localStorage.removeItem('token');
  };

  return (
    <nav className={classes.nav}>
      <Container className={classes.flex}>
        <div className={classes.left}>
          <NavLink
            className={`${classes.link} ${classes.name}`}
            to={SHOP_ROUTE}
          >
            Main page
          </NavLink>
        </div>

        {user.isAuth ? (
          <div className={classes.right}>
            <span>
              Wellcome,
              <span> {user.user.email}</span>!
            </span>
            <DropdownBrands />
            <DropdownTypes />

            {user.user.role === 'ADMIN' && (
              <NavLink className={classes.link} to={ADMIN_ROUTE}>
                Admin page
              </NavLink>
            )}

            <NavLink className={classes.link} to={BASKET_ROUTE}>
              Basket
            </NavLink>

            <NavLink
              className={classes.link}
              to={SHOP_ROUTE}
              onClick={() => logOut()}
            >
              Logout
            </NavLink>
          </div>
        ) : (
          <div className={classes.right}>
            <DropdownBrands />
            <DropdownTypes />
            <NavLink className={classes.link} to={LOGIN_ROUTE}>
              Login
            </NavLink>
          </div>
        )}
        <div className={classes.burger}>
          <Button onClick={handleShow} variant="dark">
            <BurgerSvg />
          </Button>
        </div>
      </Container>
      <Offcanvas placement="end" show={show} onHide={handleClose}>
        <Offcanvas.Header
          style={{ backgroundColor: '#212529', color: 'white' }}
          closeButton
        >
          <Offcanvas.Title>
            {user.isAuth ? (
              <div>Wellcome, {user.user.email}</div>
            ) : (
              <div>Menu</div>
            )}
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {user.isAuth ? (
            <div className="d-flex flex-column gap-2">
              {user.user.role === 'ADMIN' && (
                <Button
                  variant="dark"
                  onClick={() => {
                    history('/admin');
                    handleClose();
                  }}
                >
                  Admin page
                </Button>
              )}

              <DropdownBrands handleClose={handleClose} />
              <DropdownTypes handleClose={handleClose} />
              {/* ТУТ НАСТРОЙКИ ВСТАВИТЬ ТИПА БРЕНД И ТИП */}

              <Button
                variant="dark"
                onClick={() => {
                  history('/basket');
                  handleClose();
                }}
              >
                Basket
              </Button>

              <Button
                variant="dark"
                onClick={() => {
                  logOut();
                  handleClose();
                }}
              >
                Logout
              </Button>
            </div>
          ) : (
            <div className="d-flex flex-column gap-2">
              <DropdownBrands handleClose={handleClose} />
              <DropdownTypes handleClose={handleClose} />
              <Button
                variant="dark"
                onClick={() => {
                  history('/login');
                  handleClose();
                }}
              >
                Login
              </Button>
            </div>
          )}
        </Offcanvas.Body>
      </Offcanvas>
    </nav>
  );
});

export default Nav;
