import React from 'react';
import { useSelector } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import CartProductD from '../Components/CartProductD';
import { useNavigate } from 'react-router-dom';

const Carts = () => {
  const { Cart } = useSelector((state) => state.Cart);
  const navigate = useNavigate();
  return (
    <>
      <Helmet>
        <title>Cart items</title>
      </Helmet>
      {!Cart || Cart.length === 0 ? (
        <div className='mx-auto mt-10'>Cart is Empty</div>
      ) : (
        <div className='w-full p-[20px] flex flex-col'>
          <div className='flex justify-between  w-[70%] m-auto'>
            <div className='flex flex-col  w-[70%] '>
              {Cart.map((items) => (
                <div key={items._id} className='w-full p-4 border-[2px]'>
                  <CartProductD items={items} />
                </div>
              ))}
            </div>
            <div className='flex flex-col  mx-4 p-4 w-[40%]'>
              <div className='flex flex-col  border-[2px] p-5 w-full'>
                <p className='text-[30px]'>
                  {' '}
                  {`SubTotal ${Cart.reduce(
                    (a, b) => a + b.quantity,
                    0
                  )} items: $${Cart.reduce(
                    (a, b) => a + b.quantity * b.price,
                    0
                  )} `}
                </p>
                <button
                  onClick={() => {
                    navigate('/Signin?redirect=/shipping');
                  }}
                  className='text-black w-full hover:text-white my-[10px] bg-[#d9df22] hover:bg-[#2323b5]'
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
          <div></div>
        </div>
      )}
    </>
  );
};

Carts.propTypes = {};

export default Carts;
