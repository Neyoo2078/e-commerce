import React from 'react';
import { Helmet } from 'react-helmet-async';
import StatusBar from '../Components/StatusBar';
import { useSelector, useDispatch } from 'react-redux';
import CartProductD from '../Components/CartProductD';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Api, azios } from '../Api/Api';
import { toast } from 'react-toastify';
import { ClearCarts } from '../Reducers/CartReducer';

const PlaceOrder = () => {
  const { PaymentMethod, Cart, address } = useSelector((state) => state.Cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { User } = useSelector((state) => state.Auth);
  console.log({ User });

  useEffect(() => {
    if (!address) {
      navigate('/Shipping');
    }
  }, [navigate, address]);
  const ItemsTotal = Cart.reduce((a, b) => a + b.price * b.quantity, 0);
  const Tax = Cart.reduce((a, b) => a + b.price * b.quantity * 0.02, 0);
  const TotalOrder =
    Cart.reduce((a, b) => a + b.price * b.quantity, 0) +
    Cart.reduce((a, b) => a + b.price * b.quantity * 0.02, 0);
  const ShippingPrice = 50;
  const order = {
    orderitems: Cart,
    ShippingAddress: address,
    PaymentMethod: PaymentMethod,
    itemsPrice: ItemsTotal,
    ShippingPrice,
    TaxPrice: Tax,
    TotalPrice: TotalOrder,
  };

  const SubmitHandler = async () => {
    try {
      const data = await azios.post('/order', order);
      navigate(`/CompleteOrder/${data.data._id}`);

      localStorage.setItem('order', JSON.stringify(data.data));

      dispatch(ClearCarts());
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  return (
    <>
      <div className='w-full p-10 flex flex-col '>
        <Helmet>
          <title>Ored items</title>
        </Helmet>
        <div className='w-[90%]  m-auto  '>
          <StatusBar order />
          <div className=' mx-auto my-7  flex  justify-start w-full gap-3'>
            <div className='w-[70%] p-2 flex flex-col'>
              <div className='flex flex-col gap-2 justify-start items-start  border-[2px] p-3'>
                <h1>Shipping</h1>
                <h1>Name: {address.FirstName}</h1>
                <h1>Address: {address.Address}</h1>

                <button
                  className='text-[#4e0afa] underline underline-offset-2 '
                  type='button'
                  onClick={() => {
                    navigate('/Shipping');
                  }}
                >
                  Edit
                </button>
              </div>
              <div className='flex flex-col gap-2 justify-start items-start my-[7px] border-[2px] p-3'>
                <h1>Payment</h1>

                <h1> {PaymentMethod}</h1>

                <button
                  className='text-[#4e0afa] underline underline-offset-4 '
                  type='button'
                >
                  Edit
                </button>
              </div>
              <div className='flex flex-col gap-2 justify-start items-start my-[7px] border-[2px] p-3'>
                <p className='text-[30px]'>Items</p>
                {Cart.slice(0, 2).map((item) => (
                  <div key={item._id} className='w-full p-4 border-[2px]'>
                    <CartProductD items={item} order />
                  </div>
                ))}
              </div>
            </div>
            <div className='w-[30%] p-3 flex flex-col border-[2px] items-center'>
              <p className=' text-[30px]'>Order Summary</p>
              <div className=' flex gap-2 justify-between items-center p-3 border-b-[2px] w-[90%]'>
                <p>items</p>
                <p>${ItemsTotal}</p>
              </div>
              <div className=' flex gap-2 justify-between items-center p-3 border-b-[2px] w-[90%]'>
                <p>Shipping</p>
                <p>$0.00</p>
              </div>
              <div className=' flex gap-2 justify-between items-center p-3 border-b-[2px] w-[90%]'>
                <p>Tax</p>
                <p>${Tax}</p>
              </div>
              <div className=' flex gap-2 justify-between items-center p-3 border-b-[2px] w-[90%]'>
                <p>Total Order</p>
                <p>${TotalOrder}</p>
              </div>
              <div className=' flex gap-2 justify-center items-center p-3 w-[90%]'>
                <button
                  onClick={SubmitHandler}
                  className='px-3 py-1  border-[1px] border-black bg-[#f6f209] w-full'
                >
                  Place Order
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PlaceOrder;
