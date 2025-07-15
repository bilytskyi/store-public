import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { createType } from '../../http/deviceAPI';

const CreateType = ({ show, onHide }) => {
  const [value, setValue] = useState('');
  const addType = () => {
    createType({ name: value }).then(data => {
      setValue('');
      onHide();
    });
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <title>Add new type</title>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Add new type
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form
          onKeyDown={e => {
            if (e.key === 'Enter') {
              addType();
            }
          }}
        >
          <Form.Control
            style={{ border: 'solid #212529 1px', boxShadow: 'none' }}
            value={value}
            onChange={e => setValue(e.target.value)}
            placeholder={'Type new device type'}
          />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant={'dark'} onClick={addType}>
          Add
        </Button>
        <Button variant={'dark'} onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateType;
