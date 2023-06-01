import React from 'react';

const StatusBar = ({ payment, order }) => {
  return (
    <div className='w-full flex'>
      <div className='w-[25%]'>
        Signing-In
        <div className='w-full border-[#eff314] border-[2px] my-1' />
      </div>
      <div className='w-[25%]'>
        Shipping
        <div className='w-full border-[#eff314] border-[2px] my-1' />
      </div>
      <div className='w-[25%]'>
        Payment
        <div
          className={`w-full ${
            payment || order ? 'border-[#eff314]' : 'border-[#c3c3be]'
          }  border-[2px] my-1 `}
        />
      </div>
      <div className='w-[25%]'>
        Place Order
        <div
          className={`w-full ${
            order ? 'border-[#eff314]' : 'border-[#c3c3be]'
          }  border-[2px] my-1 `}
        />
      </div>
    </div>
  );
};

export default StatusBar;
