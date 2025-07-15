import React, { useContext, useEffect, useRef } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import TypeBar from '../components/TypeBar';
import BrandBar from '../components/BrandBar';
import DeviceList from '../components/DeviceList';
import { observer } from 'mobx-react-lite';
import { Context } from '..';
import { fetchBrands, fetchDevices, fetchTypes } from '../http/deviceAPI';
import Pages from '../components/Pages';
import Accordion from 'react-bootstrap/Accordion';
import Dropdown from 'react-bootstrap/Dropdown';
import MainCarousel from '../components/MainCarousel';

const Shop = observer(() => {
  const { device } = useContext(Context);
  const deviceListRef = useRef(null);

  let title = 'Device Store - best devices, for best prices!';
  if (device.selectedBrand.name && device.selectedType.name) {
    title = `${
      device.selectedBrand.name
    } ${device.selectedType.name.toLowerCase()} for best prices!`;
  }
  if (device.selectedBrand.name && !device.selectedType.name) {
    title = `${device.selectedBrand.name} devices for best prices!`;
  }
  if (!device.selectedBrand.name && device.selectedType.name) {
    title = `${device.selectedType.name} for best prices!`;
  }

  useEffect(() => {
    fetchDevices(
      device.selectedType.id,
      device.selectedBrand.id,
      device.page,
      device.limit
    ).then(data => {
      device.setDevices(data.rows);
      device.setTotalCount(data.count);
      device.setDeviceRef(deviceListRef);
    }); // data.rows because of pagination
  }, [device.page, device.selectedType, device.selectedBrand]);

  return (
    <Container>
      <MainCarousel />
      <title>{title}</title>
      <div ref={deviceListRef}>
        <DeviceList />
      </div>
      <Pages deviceListRef={deviceListRef} />
    </Container>
  );
});

export default Shop;
