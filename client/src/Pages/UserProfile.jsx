import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { azios, users } from '../Api/Api';
import { Signin } from '../Reducers/Authreducer';
import { useDispatch } from 'react-redux';

const UserProfile = () => {
  const { User } = useSelector((state) => state.Auth);
  const dispatch = useDispatch();
  const [user, setuser] = useState({
    email: User ? User.email : '',
    username: User ? User.username : '',
    password: '',
    repassword: '',
  });
  const UserHandler = (e) => {
    setuser({ ...user, [e.target.name]: e.target.value });
  };
  console.log({ user });
  const SubmitHandler = async (e) => {
    e.preventDefault();
    const pwdRegex = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;
    const Pwdgood = pwdRegex.test(user.password);
    if (!Pwdgood) {
      toast.error('Wrong Password Format');
    } else if (user.password !== user.repassword) {
      toast.error('password not matched');
      return;
    } else {
      try {
        const { data } = await users.post(`/update/${User.id}`, user);
        console.log({ data });
        dispatch(Signin(data));
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className='w-full p-10'>
      <Helmet>
        <title>User Profile</title>
      </Helmet>
      <div className='w-[80%]  m-auto '>
        <div className=' m-auto flex flex-col justify-center items-center w-full gap-3'>
          <div className='flex flex-col gap-2 justify-start p-5 w-4/5 items-start '>
            <h1 className='text-[50px]'>User Profile</h1>
          </div>
          <form
            onSubmit={SubmitHandler}
            className='flex flex-col gap-2 justify-start p-5 w-4/5 items-start '
          >
            <label htmlFor='Address'>User Name:</label>
            <input
              id='Address'
              className=' outline-2 w-3/5 border-[2px] p-2 '
              name='username'
              value={user.username}
              onChange={UserHandler}
              required
            />
            <label htmlFor='Email'>Email:</label>
            <input
              id='Email'
              className=' outline-2 w-3/5 border-[2px] p-2 '
              name='email'
              value={user.email}
              onChange={UserHandler}
              required
            />
            <label htmlFor='Password'>Password:</label>
            <input
              id='Password'
              name='password'
              className=' outline-2 w-3/5 border-[2px] p-2 '
              onChange={UserHandler}
              required
              type='password'
            />
            <label htmlFor='Confirm Password'>Confirm Password:</label>
            <input
              id='Confirm Password'
              type='password'
              className=' outline-2 w-3/5 border-[2px] p-2 '
              onChange={UserHandler}
              required
              name='repassword'
            />
            <button
              type='submit'
              className='bg-[#f5db17] py-2 px-4 outline-2 rounded-sm border-[1px] border-black'
            >
              Update
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
