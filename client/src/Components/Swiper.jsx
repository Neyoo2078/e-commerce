import React from 'react';
import SwiperCore, { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';

SwiperCore.use([Navigation, Pagination]);

const ImageSwiper = () => {
  const images = [
    { url: 'http://localhost:3000/images/image-1.jpg', title: 'beach' },
    { url: 'http://localhost:3000/images/image-2.jpg', title: 'boat' },
    { url: 'http://localhost:3000/images/image-3.jpg', title: 'forest' },
    { url: 'http://localhost:3000/images/image-4.jpg', title: 'city' },
    { url: 'http://localhost:3000/images/image-5.jpg', title: 'italy' },
  ];

  return (
    <Swiper
      navigation
      pagination={{ clickable: true }}
      loop={true}
      autoplay={{ delay: 1000 }}
    >
      {images.map((image, index) => (
        <SwiperSlide key={index}>
          <img src={image.url} alt={`Img ${index + 1}`} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ImageSwiper;
