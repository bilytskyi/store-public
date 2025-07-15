import React, { useContext, useState } from 'react';
import classes from '../styles/Footer.module.css';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/esm/Button';
import { Context } from '..';
import { HashLink } from 'react-router-hash-link';
import { observer } from 'mobx-react-lite';
import GeneralModal from './modals/GeneralModal';

const Footer = observer(() => {
  const { device } = useContext(Context);
  const [show, setShow] = useState(false);

  const platforms = [
    'Instagram',
    'Telegram',
    'Facebook',
    'X (twitter)',
    'Youtube',
    'All platforms',
  ];
  return (
    <footer className={classes.footer}>
      <Container>
        <div className={classes.grid}>
          <div className={classes['footer-nav']}>
            <div className={classes.left}>
              <span className={classes.title}>BRANDS</span>
              <ul className={classes.ul}>
                {device.brands.map(brand => (
                  <li className={classes.li} key={brand.id}>
                    <HashLink
                      onClick={() => {
                        device.setSelectedBrand(brand);
                        device.setSelectedType({});
                      }}
                      smooth
                      to="/#device-list"
                      className={classes.li}
                    >
                      {brand.name}
                    </HashLink>
                  </li>
                ))}
              </ul>
            </div>
            <div className={classes.right}>
              <span className={classes.title}>TYPES</span>
              <ul className={classes.ul}>
                {device.types.map(type => (
                  <li className={classes.li} key={type.id}>
                    <HashLink
                      onClick={() => {
                        device.setSelectedType(type);
                        device.setSelectedBrand({});
                      }}
                      smooth
                      to="/#device-list"
                      className={classes.li}
                    >
                      {type.name}
                    </HashLink>
                  </li>
                ))}
              </ul>
            </div>
            <div className={classes.full}>
              <span className={classes.title}>PLATFORMS</span>
              <ul className={classes.ul}>
                {platforms.map((platform, index) => (
                  <li className={classes.li} key={index}>
                    {platform}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div>
            <span className={classes.title}>NEWSLETTER</span>
            <p className={classes.text}>
              Subscribe to the DEVICE STORE newsletter. It's another way to stay
              in touch with us — and get news, no matter what. And in this
              newsletter, we talk about blocking and how to safely bypass it.
              Unfortunately, we're sure it will come in handy.
            </p>
            <div className="d-flex justify-content-between">
              <input className={classes.input} placeholder="email"></input>
              <Button onClick={() => setShow(true)} variant="light">
                send
              </Button>
            </div>
          </div>
        </div>
        <hr></hr>
        <div className={classes.lastLine}>
          <span>All right reserved by this pet-project "DEVICE-STORE"</span>
          <span className={classes.mistake}>
            Found a mistake? Select it and press Ctrl+Enter © DEVICE-STORE, 2025
          </span>
        </div>
      </Container>
      <GeneralModal
        show={show}
        onHide={() => setShow(false)}
        message={'Thanks for your email, now we can stay in touch with you!'}
        title={'Info'}
      />
    </footer>
  );
});

export default Footer;
