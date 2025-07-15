import React, { useContext, useEffect, useState } from 'react';
import { Context } from '..';
import { fetchDevicesFromBasket } from '../http/basketAPI';
import Table from 'react-bootstrap/Table';
import Image from 'react-bootstrap/Image';
import { NavLink } from 'react-router-dom';
import { DEVICE_ROUTE } from '../utils/consts';
import RatingDisplay from '../components/RatingDisplay';
import classes from '../styles/Basket.module.css';
import Container from 'react-bootstrap/esm/Container';

const Basket = () => {
  const { user } = useContext(Context);
  const [basket, setBasket] = useState([]);

  const showBasket = basketId => {
    fetchDevicesFromBasket(basketId).then(data => {
      setBasket(data);
    });
  };
  useEffect(() => {
    showBasket(user.user.id);
  }, []);

  return (
    <Container>
      <Table style={{ minHeight: 300 }} striped>
        <title>
          {basket.length > 0
            ? `Basket - ${basket.length} new devices`
            : 'Basket'}
        </title>
        <thead>
          <tr class="align-middle text-center">
            <th>#</th>
            <th>Preview</th>
            <th>Name</th>
            <th className={classes.mobile}>Price</th>
            <th className={classes.mobile}>Rating</th>
          </tr>
        </thead>
        <tbody>
          {basket?.length > 0 ? (
            basket.map((entity, index) => (
              <tr className="align-middle text-center" key={entity.id}>
                <td>{index + 1}</td>
                <td>
                  <Image
                    width={50}
                    height={50}
                    src={process.env.REACT_APP_API_URL + entity.device.img}
                  />
                </td>
                <td>
                  <NavLink
                    style={{
                      color: '#212529',
                      textDecoration: 'none',
                      fontWeight: 500,
                    }}
                    to={DEVICE_ROUTE + '/' + entity.device.id}
                  >
                    {entity.device.name}
                  </NavLink>
                </td>
                <td className={classes.mobile}>{entity.device.price}$</td>
                <td className={classes.mobile}>
                  <RatingDisplay rating={entity.device.rating} />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="text-center p-3">
                No devices in basket!
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
};

export default Basket;
