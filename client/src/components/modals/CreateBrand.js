import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { createBrand } from '../../http/deviceAPI';

const CreateBrand = ({ show, onHide }) => {
  const [value, setValue] = useState('');
  const addBrand = () => {
    createBrand({ name: value }).then(data => {
      setValue('');
      onHide();
    });
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <title>Add new brand</title>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Add new brand
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form
          onKeyDown={e => {
            if (e.key === 'Enter') {
              addBrand();
            }
          }}
        >
          <Form.Control
            style={{ border: 'solid #212529 1px', boxShadow: 'none' }}
            value={value}
            onChange={e => setValue(e.target.value)}
            placeholder={'Type new device brand'}
          />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant={'dark'} onClick={addBrand}>
          Add
        </Button>
        <Button variant={'dark'} onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateBrand;
