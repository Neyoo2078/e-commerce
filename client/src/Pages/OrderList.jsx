import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';
import { azios } from '../Api/Api';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import dateFormat from 'dateformat';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';

const OrderList = () => {
  const { User } = useSelector((state) => state.Auth);
  const [AllOrders, setAllOrders] = useState(null);
  const navigate = useNavigate();

  const FetchOrder = async () => {
    try {
      const { data } = await azios.get(`/allorders/${User.id}`);
      setAllOrders(data);
      console.log({ data });
    } catch (error) {
      const { msg } = error?.response.data;
      toast.error(msg);
      if (msg === 'jwt expired') {
        navigate('/Signin');
      }
    }
  };
  useEffect(() => {
    FetchOrder();
  }, []);
  if (!AllOrders) {
    return (
      <div className='w-full p-[20px] flex justify-center items-center'>
        <div className=' flex flex-col justify-center items-center'>
          <ClipLoader className='m-auto' />
          <p>Loading Order </p>
        </div>
      </div>
    );
  }
  return (
    <div className='w-full p-[20px] flex flex-col justify-center items-center'>
      <Helmet>
        <title>Order History</title>
      </Helmet>
      <div className='w-[80%]'>
        <table className='w-full border-[2px] '>
          <thead className='w-full m-2 border-[2px]'>
            <tr className='p-2 border-[2px]  '>
              <th className='p-2 border-[2px]'> Order Id</th>
              <th className='p-2 border-[2px] '>Date Created</th>
              <th className='p-2 border-[2px] '>Total Price</th>
              <th className='p-2 border-[2px] '>Ordered Paid</th>
              <th className='p-2 border-[2px] '>Ordered Delivered</th>
            </tr>
          </thead>
          <tbody>
            {AllOrders?.map((items, i) => (
              <tr key={i}>
                <td className='p-2 border-[2px]'>{items._id}</td>
                <td className='p-2 border-[2px]'>{`${dateFormat(
                  items.createdAt,
                  'mmmm dS, yyyy'
                )} `}</td>
                <td className='p-2 border-[2px]'>${items.TotalPrice}</td>
                {items.isPaid ? (
                  <td className='p-2 border-[2px]'>
                    Paid: {moment(items.paidAt).fromNow()}
                  </td>
                ) : (
                  <td className='p-2 border-[2px]'>Not Paid</td>
                )}
                <td className='p-2 border-[2px]'>
                  {items.isDelivered ? 'Item Delivered' : 'Not Delivered'}
                </td>
                <td className='p-2 border-[2px]'>
                  <button
                    onClick={() => {
                      navigate(`/CompleteOrder/${items._id} `);
                    }}
                    className='bg-[#9e9a9a] p-2 hover:bg-slate-500 w-[80%] m-auto'
                  >
                    Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderList;
