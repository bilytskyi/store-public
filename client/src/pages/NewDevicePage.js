import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import car from '../assets/car.webp';
import phone1 from '../assets/phone1.webp';
import phone2 from '../assets/phone2.webp';
import ImgaeHolder from '../components/ImgaeHolder';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const NewDevicePage = () => {
  return (
    <Container className="mt-4">
      <Carousel style={{ width: 550 }}>
        <Carousel.Item>
          <ImgaeHolder>
            <Image src={car} width={400} height={400} text="First slide" />
          </ImgaeHolder>
          <Carousel.Caption>
            <h3>Model 3</h3>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <ImgaeHolder>
            <Image src={car} width={400} height={400} text="First slide" />
          </ImgaeHolder>
          <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <ImgaeHolder>
            <Image src={car} width={400} height={400} text="First slide" />
          </ImgaeHolder>
          <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      <Card className="m-4 d-flex flex-row" style={{ width: '60rem' }}>
        <Card.Img src={phone1} style={{ width: 400 }} />
        <Card.Body>
          <Card.Title>Iphone 13 pro | 4500$</Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text>
          <Button variant="primary">Go somewhere</Button>
        </Card.Body>
      </Card>
      <Card className="m-4" style={{ width: '18rem' }}>
        <Card.Img src={phone1} />
        <Card.Body>
          <Card.Title>Card Title</Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text>
          <Button variant="primary">Go somewhere</Button>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default NewDevicePage;
