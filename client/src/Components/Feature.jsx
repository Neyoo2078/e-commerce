import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import Loading from './Loading';
import ProductCard from './ProductCard';

const Feauture = ({ data, setdata }) => {
  const { products, isLoading } = useSelector((state) => state.products);

  useEffect(() => {
    setdata(products);
  }, [products, setdata]);

  const [Alert, setAlert] = useState(false);
  const SelectHandler = () => {};

  if (data.length === 0 && !isLoading) {
    return (
      <div className='w-full  flex justify-center items-center flex-col'>
        <p className='mt-[80px] font-semibold'>No Product Is Available</p>
      </div>
    );
  }

  return (
    <div className='w-full flex justify-center items-center flex-col'>
      <div className='w-[85%] flex flex-col p-3'>
        <div className='h-[50px] p-2 m-auto'>
          {Alert && (
            <h1 className='text-[20px] m-auto p-2 bg-[#48f631]'>
              item added to cart
            </h1>
          )}
        </div>

        <h1 className=' text-[20px] md:text-[40px]'>Feature Product</h1>

        {isLoading ? (
          <Loading message='Loading products' />
        ) : (
          <div className='flex justify-center items-center gap-2 md:gap-3 flex-wrap'>
            {data.map((product) => {
              return (
                <div key={product._id}>
                  <ProductCard product={product} setAlert={setAlert} />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Feauture;
