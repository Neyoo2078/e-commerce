import React from 'react';
import { useNavigate, useLoaderData, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import DropMenu from './DropMenu';
import FilterSearch from './FilterSearch';
const Header = ({ setdata, data }) => {
  const { Cart } = useSelector((state) => state.Cart);
  const { User } = useSelector((state) => state.Auth);
  const navigate = useNavigate();

  const location = useLocation();

  return (
    <div className="bg-[#4d4646] flex text-[#ffff] px-[20px] h-[70px] sticky top-0 z-10  items-center justify-between">
      <Link to="/">
        <div>
          <h1 className="text-[35px] font-bold">CartRite</h1>
        </div>
      </Link>
      <FilterSearch setdata={setdata} data={data} />
      <div className="flex  gap-1 md:gap-3 items-center overflow-visible justify-end  h-full w-[300px]">
        {User ? (
          <DropMenu User={User} />
        ) : (
          <button
            onClick={() => {
              navigate('/Signin');
            }}
            className={`text-white bg-blue-700 ${
              location.pathname === '/Signin' && 'hidden'
            } hover:bg-blue-800 focus:ring-4 $focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}
          >
            Sign In
          </button>
        )}
        {location.pathname === '/Signin' ? (
          ''
        ) : (
          <div
            className="relative p-1"
            onClick={() => {
              navigate('/cart');
            }}
          >
            <AiOutlineShoppingCart
              size={35}
              style={{ marginRight: '3px', marginTop: '5px' }}
            />
            <p className="absolute top-0 right-0 mb-3 font-semibold text-[#fab0b0]">
              {Cart.reduce((a, c) => a + c.quantity, 0)}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
