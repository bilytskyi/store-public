import React, { useContext, useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Dropdown from 'react-bootstrap/Dropdown';
import { Context } from '../..';
import { createDevice, fetchBrands, fetchTypes } from '../../http/deviceAPI';
import { observer } from 'mobx-react-lite';

const CreateDevice = observer(({ show, onHide }) => {
  const { device } = useContext(Context);
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [file, setFile] = useState(null);
  const [info, setInfo] = useState([]);
  const [type, setType] = useState({});
  const [brand, setBrand] = useState({});

  useEffect(() => {
    fetchTypes().then(data => device.setTypes(data));
    fetchBrands().then(data => device.setBrands(data));
  }, []);

  const addInfo = () => {
    setInfo([...info, { title: '', description: '', number: Date.now() }]);
    console.log(info);
  };

  const removeInfo = number => {
    setInfo(info.filter(i => i.number !== number));
    console.log(info);
  };

  const changeInfo = (key, value, number) => {
    setInfo(info.map(i => (i.number === number ? { ...i, [key]: value } : i)));
    console.log(info);
  };

  const selectFile = e => {
    setFile(e.target.files[0]);
    console.log(e.target.files[0]);
  };

  const addDevice = () => {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', `${price}`);
    formData.append('img', file);
    formData.append('brandId', brand.id);
    formData.append('typeId', type.id);
    formData.append('info', JSON.stringify(info));
    createDevice(formData).then(data => onHide());
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <title>Add new device</title>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Add new device
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form
          onKeyDown={e => {
            if (e.key === 'Enter') {
              addDevice();
            }
          }}
        >
          <Dropdown className="mt-2 mb-2">
            <Dropdown.Toggle variant="dark">
              {type.name || 'Select type'}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {device.types.map(type => (
                <Dropdown.Item onClick={() => setType(type)} key={type.id}>
                  {type.name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown className="mt-2 mb-2">
            <Dropdown.Toggle variant="dark">
              {brand.name || 'Select brand'}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {device.brands.map(brand => (
                <Dropdown.Item onClick={() => setBrand(brand)} key={brand.id}>
                  {brand.name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <Form.Control
            style={{ border: 'solid #212529 1px', boxShadow: 'none' }}
            value={name}
            onChange={e => setName(e.target.value)}
            className="mt-3"
            placeholder="Type device name"
          />
          <Form.Control
            style={{ border: 'solid #212529 1px', boxShadow: 'none' }}
            value={price}
            onChange={e => setPrice(Number(e.target.value))}
            className="mt-3"
            placeholder="Type device price"
            type="number"
          />
          <Form.Control
            style={{ border: 'solid #212529 1px', boxShadow: 'none' }}
            onChange={selectFile}
            className="mt-3"
            type="file"
          />
          <hr />
          <Button onClick={addInfo} variant={'outline-dark'}>
            Add new property
          </Button>
          {info.map(i => (
            <Row className="mt-2" key={i.number}>
              <Col md={4}>
                <Form.Control
                  value={i.title}
                  onChange={e => changeInfo('title', e.target.value, i.number)}
                  placeholder="Type property name"
                />
              </Col>
              <Col md={4}>
                <Form.Control
                  value={i.description}
                  onChange={e =>
                    changeInfo('description', e.target.value, i.number)
                  }
                  placeholder="Type property description"
                />
              </Col>
              <Col md={4}>
                <Button onClick={() => removeInfo(i.number)} variant={'dark'}>
                  Delete
                </Button>
              </Col>
            </Row>
          ))}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant={'dark'} onClick={addDevice}>
          Add
        </Button>
        <Button variant={'dark'} onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
});

export default CreateDevice;
