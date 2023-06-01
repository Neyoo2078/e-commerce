import React from 'react';
import { Feature } from '../Components';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { fetchPoducts } from '../ReduxMiddleware/ProductActions';
import ImageSlider from '../Components/Slider';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faShoppingCart,
  faTasks,
  faHome,
  faGem,
  faPhone,
  faDesktop,
  faCar,
  faRunning,
  faGamepad,
  faSoap,
  faTshirt,
  faTv,
} from '@fortawesome/free-solid-svg-icons';
import ImageSwiper from '../Components/Swiper';
import SwiperSl from '../Components/SwiperSlide';
import { useLocation } from 'react-router-dom';

const caterories = [
  { name: 'Supermarket', icon: faShoppingCart },
  { name: ' Beauty', icon: faGem },
  { name: 'Home & Office', icon: faHome },
  { name: 'Phone & Tablets', icon: faPhone },
  { name: 'Computing', icon: faDesktop },
  { name: 'Electronics', icon: faTv },
  { name: 'Fashion', icon: faTshirt },
  { name: 'Baby Products', icon: faSoap },
  { name: 'Gaming', icon: faGamepad },
  { name: 'Sporting Goods', icon: faRunning },
  { name: 'Automoile', icon: faCar },
];
const Home = ({ data, setdata }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  console.log({ location });

  useEffect(() => {
    dispatch(fetchPoducts());
  }, []);
  return (
    <div className='w-full flex flex-col gap-2 '>
      <div className='flex  flex-col md:flex-row justify-between w-[90%] mx-auto gap-2 my-[15px] '>
        <div className='md:flex hidden flex-col gap-1  w-[25%] border-[2px] p-5'>
          {caterories.map((items, i) => (
            <div className='flex gap-2 justify-start items-center hover:text-[#f5ea57] '>
              <FontAwesomeIcon icon={items?.icon} />
              <NavLink>{items.name}</NavLink>
            </div>
          ))}
        </div>
        <ImageSlider />

        <div className='flex flex-row md:flex-col gap-1 w-full md:w-[25%] border-[2px]'>
          <div className='w-full'>
            <img
              src='https://ng.jumia.is/cms/0-1-cpr/2022/june-14/free-delivery_218x184.png'
              alt='img'
            />
          </div>
          <div className='w-full'>
            <img
              src='https://ng.jumia.is/cms/0-1-cpr/2022/june-14/free-delivery_218x184.png'
              alt='img'
            />
          </div>
        </div>
      </div>

      <SwiperSl data={data} />
      <div>
        <Feature data={data} setdata={setdata} />
      </div>
    </div>
  );
};

export default Home;
