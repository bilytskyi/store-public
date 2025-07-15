import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { createBrand, createDevice } from '../../http/deviceAPI';

const CreateMassDevices = ({ show, onHide }) => {
  const [value, setValue] = useState('');
  const [imgFiles, setImgFiles] = useState(null);
  const [jsonFile, setJsonFile] = useState(null);
  const selectImgFiles = e => {
    let imagesMap = new Map();
    imagesMap.clear();
    for (const file of e.target.files) {
      imagesMap.set(file.name, file);
    }
    setImgFiles(imagesMap);
  };
  const selectjsonFile = e => {
    setJsonFile(e.target.files[0]);
    console.log(e.target.files[0]);
  };
  const fetchLocalFile = async imageName => {
    return imgFiles.get(imageName) || null;
  };

  const characteristicsToInfo = characteristics => {
    const info = [];
    for (const [key, value] of Object.entries(characteristics)) {
      info.push({ title: key, description: value });
    }
    return info;
  };

  const reader = new FileReader();
  reader.onload = async e => {
    try {
      const devices = JSON.parse(e.target.result);

      if (!Array.isArray(devices)) {
        alert('Invalid JSON format: Expected an array of devices');
        return;
      }

      for (const device of devices) {
        // Convert local image path to File object
        const imgFile = await fetchLocalFile(device.image);

        if (!imgFile) {
          console.warn(`Image not found: ${device.image}`);
          continue;
        }

        const formData = new FormData();
        formData.append('name', device.name);
        formData.append('price', `${device.price}`);
        formData.append('img', imgFile);
        formData.append('brandId', Number(device.brandId));
        formData.append('typeId', Number(device.typeId));
        formData.append(
          'info',
          JSON.stringify(characteristicsToInfo(device.characteristics) || [])
        );

        await createDevice(formData);
      }

      alert('All devices uploaded successfully!');
    } catch (error) {
      console.error('Error parsing JSON:', error);
      alert('Invalid JSON file');
    }
  };

  const addDevices = () => {
    reader.readAsText(jsonFile);
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <title>Add new devices via json-file</title>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Add new devices via json-file
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Control
            style={{ border: 'solid #212529 1px', boxShadow: 'none' }}
            onChange={selectjsonFile}
            className="mt-3"
            type="file"
          />
          <Form.Control
            style={{ border: 'solid #212529 1px', boxShadow: 'none' }}
            onChange={selectImgFiles}
            className="mt-3"
            type="file"
            multiple
          />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant={'dark'} onClick={addDevices}>
          Add
        </Button>
        <Button variant={'dark'} onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateMassDevices;
