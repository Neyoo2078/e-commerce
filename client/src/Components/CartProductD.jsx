import React from 'react';
import { Link } from 'react-router-dom';
import { AiFillDelete } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { Api } from '../Api/Api';
import { AddToCart, RemoveFromCart } from '../Reducers/CartReducer';

const CartProductD = ({ items, order }) => {
  const dispatch = useDispatch();
  const { Cart } = useSelector((state) => state.Cart);

  const AddCartHandler = async () => {
    const exist = Cart.find((p) => p._id === items._id);
    const quantity = exist ? exist.quantity + 1 : 1;
    const data = await Api.get(`/${items._id}`);
    if (data.countInStock < quantity) {
      window.alert('product of of Stock');
    }
    dispatch(AddToCart({ ...items, quantity }));
  };

  const RemoveCartHandler = async () => {
    const exist = Cart.find((p) => p._id === items._id);
    const quantity = exist ? exist.quantity - 1 : 1;
    const data = await Api.get(`/${items._id}`);
    if (data.countInStock < quantity) {
      window.alert('product of of Stock');
    }
    dispatch(AddToCart({ ...items, quantity }));
  };

  const DeleteItem = () => {
    dispatch(RemoveFromCart(items._id));
  };

  return (
    <div className='w-full flex justify-between items-center'>
      <div className='p-1 flex   h-[155px] my-auto w-[50%] '>
        <img
          className=' w-[115px] h-[145px] mr-3 '
          src={items.image}
          alt={items.name}
        />
        <Link
          to={`/productDetails/${items._id} `}
          className='m-auto cursor-pointer'
        >
          <p className='text-[#4954f8]'>{items.name}</p>
        </Link>
      </div>
      {!order && (
        <div className='flex  w-[17%] '>
          <button
            onClick={RemoveCartHandler}
            disabled={items.quantity === 1}
            className={`justify-center w-[35px] h-[35px] bg-slate-400  `}
          >
            -
          </button>

          <p className='m-auto '>{items.quantity}</p>
          <button
            onClick={AddCartHandler}
            disabled={items.quantity === items.countInStock}
            className='justify-center w-[35px] h-[35px] bg-slate-400 '
          >
            +
          </button>
        </div>
      )}
      {order && (
        <div className='w-[10%]'>
          <p className='m-auto '>{items.quantity}</p>
        </div>
      )}

      <div className='w-[10%]'>
        <p>${items.price}</p>
      </div>
      {!order && (
        <div className='w-[10%]' onClick={DeleteItem}>
          <AiFillDelete size={20} />
        </div>
      )}
    </div>
  );
};

export default CartProductD;
