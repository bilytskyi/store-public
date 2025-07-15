import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Context } from '..';
import DeviceItem from './DeviceItem';
import classes from '../styles/DeviceList.module.css';

const DeviceList = observer(() => {
  const { device } = useContext(Context);

  return (
    <div id="device-list" className={classes.deviceList}>
      {device.devices.map(deviceItem => {
        const brand = device.brands.find(
          brand => brand.id === deviceItem.brandId
        );
        return (
          <DeviceItem
            key={deviceItem.id}
            device={deviceItem}
            brand={brand ? brand.name : 'Unknown Brand'} // Prevents error
            info={deviceItem.info}
          />
        );
      })}
    </div>
  );
});

export default DeviceList;
