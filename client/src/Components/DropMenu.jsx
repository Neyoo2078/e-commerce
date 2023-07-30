import React from 'react';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Signout } from '../Reducers/Authreducer';

const DropMenu = ({ User }) => {
  const [DropOpen, setDropOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <div
      className="m-auto flex flex-col gap-4 mt-[15px]"
      onMouseEnter={() => {
        setDropOpen(true);
      }}
      onMouseLeave={() => {
        setDropOpen(false);
      }}
    >
      <button
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="button"
      >
        Hello {User.username ? User.username : User?.name?.split(' ')?.[0]}{' '}
        <svg
          className="w-4 h-4 ml-2"
          aria-hidden="true"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 9l-7 7-7-7"
          ></path>
        </svg>
      </button>

      <div
        class={` z-10 ${
          DropOpen ? 'block' : 'hidden'
        } bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 `}
      >
        <div
          class="py-2 text-sm text-gray-700 dark:text-gray-200 p-3"
          aria-labelledby="dropdownHoverButton"
        >
          {User.admin && (
            <div
              onClick={() => {
                navigate('/DashBoard');
                setDropOpen(false);
              }}
              className="cursor-pointer block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              Dashboard
            </div>
          )}
          <div
            onClick={() => {
              navigate('/OrderHistory');
              setDropOpen(false);
            }}
            className="cursor-pointer block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
          >
            Order History
          </div>
          <div
            onClick={() => {
              navigate('/UserProfile');
              setDropOpen(false);
            }}
            className="cursor-pointer block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
          >
            Settings
          </div>
          <div
            onClick={() => {
              dispatch(Signout());
            }}
            className="cursor-pointer block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
          >
            SignOut
          </div>
        </div>
      </div>
    </div>
  );
};

export default DropMenu;
