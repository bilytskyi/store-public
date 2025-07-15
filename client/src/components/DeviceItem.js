import React from 'react';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';
import { DEVICE_ROUTE } from '../utils/consts';
import RatingDisplay from './RatingDisplay';
import classes from '../styles/DeviceItem.module.css';

const DeviceItem = ({ device, brand, info }) => {
  const history = useNavigate();
  let text;
  const getText = arr => {
    arr.forEach(i => {
      if (i.title === 'Description') {
        text = i.description;
      }
    });
  };

  getText(info);

  return (
    <Card
      className={classes.deviceCard}
      onClick={() => history(DEVICE_ROUTE + '/' + device.id)}
    >
      <Card.Img
        variant="top"
        className={classes.deviceImg}
        src={process.env.REACT_APP_API_URL + device.img}
      />
      <Card.Body>
        <Card.Title>
          {brand} {device.name}
        </Card.Title>
        <div className="d-flex align-items-center justify-content-between">
          <div>
            <span className={classes.price}>{device.price}$</span>
          </div>
          <span className={classes.oldPrice}>
            {(device.price * 1.22).toFixed(0)}$
          </span>
        </div>
        {text ? <div>{text.slice(0, 75)}...</div> : <></>}

        <RatingDisplay rating={device.rating} full={true} />
      </Card.Body>
    </Card>
  );
};

export default DeviceItem;
