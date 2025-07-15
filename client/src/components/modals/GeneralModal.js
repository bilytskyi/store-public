import React from 'react';
import Modal from 'react-bootstrap/Modal';

const GeneralModal = ({ show, onHide, message, title }) => {
  return (
    <Modal show={show} onHide={onHide} size="sm" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{message}</Modal.Body>
    </Modal>
  );
};

export default GeneralModal;
