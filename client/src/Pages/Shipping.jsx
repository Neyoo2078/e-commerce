import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
import StatusBar from '../Components/StatusBar';
import { ShippingA } from '../Reducers/CartReducer';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Shipping = () => {
  const { address: add } = useSelector((state) => state.Cart);
  const navigate = useNavigate();

  const [address, setAddress] = useState({
    FirstName: add ? add.FirstName : '',
    Address: add ? add.Address : '',
    City: add ? add.City : '',
    PosterCode: add ? add.PosterCode : '',
    Country: add ? add.Country : '',
  });
  const dispatch = useDispatch();

  const AddressHandler = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  console.log({ address });
  const SubmitHandler = (e) => {
    e.preventDefault();
    dispatch(ShippingA(address));
    navigate('/Payment');
  };

  return (
    <div className='w-full p-10'>
      <Helmet>
        <title>Shipping info</title>
      </Helmet>
      <div className='w-[80%]  m-auto '>
        <StatusBar />
        <div className=' m-auto flex flex-col justify-center items-center w-full gap-3'>
          <div className='flex flex-col gap-2 justify-start p-5 w-4/5 items-start '>
            <h1 className='text-[50px]'>Shipping Address</h1>
          </div>
          <form
            onSubmit={SubmitHandler}
            className='flex flex-col gap-2 justify-start p-5 w-4/5 items-start '
          >
            <label htmlFor='First Name'>First name:</label>
            <input
              id='First Name'
              className=' outline-2 w-3/5 border-[2px] p-2 '
              name='FirstName'
              value={address?.FirstName}
              onChange={AddressHandler}
              required
            />
            <label htmlFor='Address'>Address:</label>
            <input
              id='Address'
              className=' outline-2 w-3/5 border-[2px] p-2 '
              name='Address'
              value={address?.Address}
              onChange={AddressHandler}
              required
            />
            <label htmlFor='City'>City:</label>
            <input
              id='City'
              className=' outline-2 w-3/5 border-[2px] p-2 '
              name='City'
              value={address?.City}
              onChange={AddressHandler}
              required
            />
            <label htmlFor='Poster code'>Poster code:</label>
            <input
              id='Poster code'
              name='PosterCode'
              className=' outline-2 w-3/5 border-[2px] p-2 '
              value={address?.PosterCode}
              onChange={AddressHandler}
              required
            />
            <label htmlFor='Country'>Country:</label>
            <input
              id='Country'
              className=' outline-2 w-3/5 border-[2px] p-2 '
              value={address?.Country}
              onChange={AddressHandler}
              required
              name='Country'
            />
            <button
              type='submit'
              className='bg-[#f5db17] py-2 px-4 outline-2 rounded-sm border-[1px] border-black'
            >
              Continue
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Shipping;
