import React from 'react';
import Image from 'react-bootstrap/Image';
import Carousel from 'react-bootstrap/Carousel';
import banner1 from '../assets/banner-1.webp';
import banner2 from '../assets/banner-2.webp';
import banner3 from '../assets/banner-3.webp';
import classes from '../styles/MainCarousel.module.css';

const MainCarousel = () => {
  return (
    <Carousel interval={null} className={classes.carousel}>
      <Carousel.Item>
        <Image className={classes.img} src={banner3} />
      </Carousel.Item>
      <Carousel.Item>
        <Image className={classes.img} src={banner1} />
      </Carousel.Item>
      <Carousel.Item>
        <Image className={classes.img} src={banner2} />
      </Carousel.Item>
    </Carousel>
  );
};

export default MainCarousel;
