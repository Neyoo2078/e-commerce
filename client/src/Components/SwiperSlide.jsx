import React from 'react';
import SwiperCore, { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { FreeMode } from 'swiper';
import 'swiper/css/free-mode';
import { useNavigate } from 'react-router-dom';

SwiperCore.use([Navigation, Pagination]);

const data = [
  { url: '/swipeImg/img-01.jpg', title: 'Refrigirator' },
  { url: '/swipeImg/img-02.jpg', title: 'Groceries' },
  { url: '/swipeImg/img-03.jpg', title: 'Ladies Wear' },
  { url: '/swipeImg/img-04.jpg', title: 'Home and Offices' },
  { url: '/swipeImg/img-05.jpg', title: 'Sneakers' },
  { url: '/swipeImg/img-06.jpg', title: 'Phone accessories' },
  { url: '/swipeImg/img-07.jpg', title: 'Phone and Tablet' },
  { url: '/swipeImg/img-08.jpg', title: 'Nike Shop' },
];

const SwiperSl = () => {
  const navigate = useNavigate();
  return (
    <>
      {' '}
      {!data ? (
        <div />
      ) : (
        <div className='p-2  flex items-center w-[90%] m-auto'>
          <Swiper
            navigation
            freeMode={true}
            grabCursor={true}
            modules={[FreeMode]}
            className='mySwiper'
            slidesPerView={5}
            spaceBetween={0}
            breakpoints={{
              0: {
                slidesPerView: 1,
                spaceBetween: 10,
              },
              480: {
                slidesPerView: 2,
                spaceBetween: 10,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 15,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 15,
              },
              1280: {
                slidesPerView: 6,
                spaceBetween: 15,
              },
            }}
          >
            {data?.map((items, i) => (
              <SwiperSlide
                key={i}
                onClick={() => {
                  navigate(`/Search?Category=${items.title} `);
                }}
                className='cursor-pointer'
              >
                <div
                  style={{
                    background: `url(${items.url})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                  }}
                  className='text-white w-[150px] h-[150px] rounded-lg  shadow-sm'
                />
                <div>{items.title}</div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </>
  );
};

export default SwiperSl;
