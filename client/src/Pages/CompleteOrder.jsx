import React from 'react';
import CartProductD from '../Components/CartProductD';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import { useSelector, useDispatch } from 'react-redux';
import { FetchOrder, OrderLoading } from '../Reducers/Order';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import dateFormat from 'dateformat';
import Loading from '../Components/Loading';
import { url } from '../Api/Api';

const CompleteOrder = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { order, OLoading } = useSelector((state) => state.Order);

  const getOrder = async (a) => {
    try {
      const data = await axios.get(`${url}/cart/getorder/${a}`);
      dispatch(FetchOrder(data.data));
      dispatch(OrderLoading(false));
    } catch (error) {
      console.log(error);
    }
  };
  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();
  const cliendid = process.env.REACT_APP_PAYPAL_CLIENTID || 'sb';

  const ceateOrder = (data, actions) => {
    return actions.order
      .create({
        purchase_units: [{ amount: { value: order.TotalPrice } }],
      })
      .then((orderID) => {
        return orderID;
      });
  };
  const onApprove = (data, actions) => {
    return actions.order.capture().then(async (details) => {
      try {
        console.log({ details });
        const { data } = await axios.post(
          `${url}/cart/updateorder/${id}`,
          details
        );
        dispatch(FetchOrder(data));
        toast.success('Payment Succesful');
      } catch (error) {
        toast.error(error.message);
      }
    });
  };
  const onError = () => {};

  useEffect(() => {
    getOrder(id);
  }, [id]);

  useEffect(() => {
    paypalDispatch({
      type: 'resetOptions',
      value: {
        'client-id': cliendid,
        currency: 'USD',
      },
    });
    paypalDispatch({
      type: 'setLoadingStatus',
      value: 'pending',
    });
  }, [cliendid, paypalDispatch]);
  if (OLoading) {
    return <div>Loading</div>;
  }
  return (
    <div className="w-full p-5 flex flex-col justify-start items-start">
      <div className=" text-[50px] w-[90%] m-auto">
        <h1>Order: {order._id}</h1>
      </div>
      <div className="w-[90%] m-auto flex justify-center gap-2">
        <div className="w-[70%] flex flex-col">
          <div className="w-full flex flex-col border-[2px] p-2 justify-start mb-[10px]">
            <h1>Shipping</h1>
            <h1>Name: {order.ShippingAddress.FirstName}</h1>
            <h1>Address: {order.ShippingAddress.Address}</h1>
            <div className="p-[20px] w-[96%] border-[2px] flex items-center bg-[#fbe4e4]">
              <h1 className="text-center">not delivered</h1>
            </div>
          </div>
          <div className="w-full flex flex-col border-[2px] p-2 justify-start my-[10px]">
            <h1>Payment</h1>
            <h1>Method: {order.PaymentMethod}</h1>
            {order.isPaid ? (
              <div className="p-[20px] w-[96%] border-[2px] flex flex-col items-start bg-[#96f97e]">
                <h1 className="text-center ">Payment Recieved</h1>
                <h1 className="text-center ">
                  {' '}
                  Payment Recieved on:{' '}
                  {`${dateFormat(order.paidAt, 'mmmm dS, yyyy')} `}
                </h1>
              </div>
            ) : (
              <div className="p-[20px] w-[96%] border-[2px] flex items-center bg-[#fbe4e4]">
                <h1 className="text-center ">Not Paid</h1>
              </div>
            )}
          </div>
          <div className="w-full flex flex-col border-[2px] p-2 justify-start my-[10px]">
            <h1>Items</h1>
            <div>
              {order.orderitems.map((item) => (
                <div key={item._id} className="w-full p-4 border-[2px]">
                  <CartProductD items={item} order />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="w-[30%] p-2 flex flex-col border-[2px]">
          <p className=" text-[30px]">Order Summary</p>
          <div className=" flex gap-2 justify-between items-center p-3 border-b-[2px] w-[90%]">
            <p>items</p>
            <p>${order.itemsPrice}</p>
          </div>
          <div className=" flex gap-2 justify-between items-center p-3 border-b-[2px] w-[90%]">
            <p>Shipping</p>
            <p>${order.ShippingPrice}</p>
          </div>
          <div className=" flex gap-2 justify-between items-center p-3 border-b-[2px] w-[90%]">
            <p>Tax</p>
            <p>${order.TaxPrice}</p>
          </div>
          <div className=" flex gap-2 justify-between items-center p-3 border-b-[2px] w-[90%]">
            <p>Total Order</p>
            <p>${order.TotalPrice}</p>
          </div>
          <div>
            {!order?.isPaid ? (
              <div>
                {isPending ? (
                  <div className="m-auto">
                    <Loading />
                  </div>
                ) : (
                  <PayPalButtons
                    createOrder={ceateOrder}
                    onApprove={onApprove}
                    onError={onError}
                    className="cursor-pointer"
                  />
                )}
              </div>
            ) : (
              <div className="w-full my-2 flex items-center">
                <button
                  type="button"
                  onClick={() => {
                    navigate('/');
                  }}
                  className="bg-[#ede919] w-[90%] px-3 py-1 m-auto"
                >
                  back to shopping
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompleteOrder;
