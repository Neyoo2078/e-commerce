import React from 'react';
import { Helmet } from 'react-helmet-async';
import StatusBar from '../Components/StatusBar';
import { useState, useEffect } from 'react';
import { PaymentM } from '../Reducers/CartReducer';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Payment = () => {
  const { address } = useSelector((state) => state.Cart);
  const navigate = useNavigate();

  const [paymentMethod, setpaymentMethod] = useState('Paypal');
  const dispatch = useDispatch();
  const SubmitHandler = (e) => {
    e.preventDefault();
    dispatch(PaymentM(paymentMethod));
    navigate('/Order');
  };
  useEffect(() => {
    if (!address) {
      navigate('/Shipping');
    }
  }, [address, navigate]);

  return (
    <div className='w-full p-10'>
      <Helmet>
        <title>Payment</title>
      </Helmet>
      <div className='w-[80%]  m-auto '>
        <StatusBar payment={true} />
        <div className=' m-auto flex flex-col justify-center items-center w-full gap-3'>
          <div className='flex flex-col gap-2 justify-start p-5 w-4/5 items-start '>
            <h1 className='text-[50px]'>Payment Method</h1>
          </div>
          <form
            onSubmit={SubmitHandler}
            className='flex flex-col gap-2 justify-start p-5 w-4/5 items-start '
          >
            <div className='flex items-center gap-2'>
              <input
                type='radio'
                value='Paypal'
                name='Paypal'
                id='Paypal'
                checked={paymentMethod === 'Paypal'}
                onChange={(e) => {
                  setpaymentMethod(e.target.value);
                }}
              />
              <label className='text-[25px]' htmlFor='Paypal'>
                PayPal
              </label>
            </div>
            <div className='flex items-center gap-2'>
              <input
                type='radio'
                value='Stripe'
                name='Stripe'
                id='Stripe'
                checked={paymentMethod === 'Stripe'}
                onChange={(e) => {
                  setpaymentMethod(e.target.value);
                }}
              />
              <label className='text-[25px]' htmlFor='Paypal'>
                Stripe
              </label>
            </div>
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

export default Payment;
