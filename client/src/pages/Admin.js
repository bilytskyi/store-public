import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import CreateBrand from '../components/modals/CreateBrand';
import CreateDevice from '../components/modals/CreateDevice';
import CreateType from '../components/modals/CreateType';
import CreateMassDevices from '../components/modals/CreateMassDevices';

const Admin = () => {
  const [brandVisible, setBrandVisible] = useState(false);
  const [typeVisible, setTypeVisible] = useState(false);
  const [deviceVisible, setDeviceVisible] = useState(false);
  const [massDevicesVisible, setMassDevicesVisible] = useState(false);
  return (
    <Container className="d-flex flex-column" style={{ height: 700 }}>
      <title>Admin page</title>
      <Button
        variant={'outline-dark'}
        className="mt-2 p-2"
        onClick={() => setTypeVisible(true)}
      >
        Add new device type
      </Button>
      <Button
        variant={'outline-dark'}
        className="mt-2 p-2"
        onClick={() => setBrandVisible(true)}
      >
        Add new device brand
      </Button>
      <Button
        variant={'outline-dark'}
        className="mt-2 p-2"
        onClick={() => setDeviceVisible(true)}
      >
        Add new device
      </Button>
      <Button
        variant={'outline-dark'}
        className="mt-2 p-2"
        onClick={() => setMassDevicesVisible(true)}
      >
        Add new devices via json-file
      </Button>
      <CreateBrand show={brandVisible} onHide={() => setBrandVisible(false)} />
      <CreateDevice
        show={deviceVisible}
        onHide={() => setDeviceVisible(false)}
      />
      <CreateType show={typeVisible} onHide={() => setTypeVisible(false)} />
      <CreateMassDevices
        show={massDevicesVisible}
        onHide={() => setMassDevicesVisible(false)}
      />
    </Container>
  );
};

export default Admin;
