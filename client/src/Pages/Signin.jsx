import React from 'react';
import { FaLock } from 'react-icons/fa';
import { MdOutlineVisibilityOff, MdOutlineVisibility } from 'react-icons/md';
import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { Signin as Sign } from '../Reducers/Authreducer';
import { toast } from 'react-toastify';
import decode from 'jwt-decode';
import { url } from '../Api/Api';

const Signin = () => {
  const { search } = useLocation();
  const redirectUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectUrl ? redirectUrl : '/';

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { User } = useSelector((state) => state.Auth);
  console.log({ User });

  useEffect(() => {
    if (User) {
      const token = User?.token;
      if (token) {
        const decodetoken = decode(token);
        if (decodetoken.exp * 1000 < new Date().getTime()) {
          toast.error('token expire ');
          return;
        } else {
          navigate(redirect);
        }
      } else {
        toast.error('token not available ');
        return;
      }
    }
  }, [User, navigate, redirect]);

  const [ShowPassword, setShowPassword] = useState(false);
  const [Signup, setSignup] = useState(false);
  const [SignupD, setSignupD] = useState({
    username: '',
    email: '',
    password: '',
    repassword: '',
  });
  const [SigninD, setSigninD] = useState({});
  const [EmailFocus, setEmailFocus] = useState(false);
  const [ESignFocus, setESignFocus] = useState(false);
  const [PSignFocus, setPSignFocus] = useState(false);
  const [RePwdFocus, setRePwdFocus] = useState(false);
  const [RePwdMatch, setRePwdMatch] = useState(false);
  const [PwdFocus, setPwdFocus] = useState(false);
  const [EmailOk, setEmailOk] = useState(false);
  const [PwdOk, setPwdOk] = useState(false);
  const [EmailValid, setEmailValid] = useState(false);
  const [PwdValid, setPwdValid] = useState(false);

  const FormHandler = async (e) => {
    e.preventDefault();

    if (Signup) {
      await axios.post(`${url}/user/signup`, SignupD);

      setSignup(false);
      setSignupD({
        username: '',
        email: '',
        password: '',
        repassword: '',
      });
    } else {
      try {
        const userdata = await axios.post(`${url}/user/signin`, SigninD);

        dispatch(Sign(userdata.data));

        navigate(`${redirect}`);
      } catch (error) {
        toast.error(error.response.data);
      }
    }
  };

  useEffect(() => {
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/;
    const good = regex.test(SignupD.email || SigninD.email);
    setEmailOk(good);
    const pwdRegex = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;
    const Pwdgood = pwdRegex.test(SignupD.password || SigninD.password);
    setPwdOk(Pwdgood);
  }, [SignupD.email, SignupD.password, SigninD.email, SigninD.password]);

  useEffect(() => {
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/;
    const good = regex.test(SigninD.email);
    setEmailValid(good);

    const pwdRegex = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;
    const Pwdgood = pwdRegex.test(SigninD.password);
    setPwdValid(Pwdgood);
  }, [SigninD.email, SigninD.password]);

  useEffect(() => {
    if (SignupD.repassword === SignupD.password) {
      setRePwdMatch(true);
    } else {
      setRePwdMatch(false);
    }
  }, [SignupD.repassword, SignupD.password]);

  const DetailHandler = (e) => {
    if (Signup) {
      setSignupD({ ...SignupD, [e.target.name]: e.target.value });
    } else {
      setSigninD({ ...SigninD, [e.target.name]: e.target.value });
    }
  };

  return (
    <div className="w-full p-[30px] h-screen bg-slate-400">
      <Helmet>
        <title>{Signup ? 'Sign up' : 'Sign in'}</title>
      </Helmet>
      <div className="w-full flex  h-full items-center">
        <div className="m-auto flex flex-col gap-5 border-[2px] p-7 w-[25%] ">
          <div className=" w-full  m-auto p-2">
            <p className="text-center">
              {EmailFocus && !EmailOk && 'Invalid Email Address'}
            </p>
            <p className="text-center">
              {ESignFocus && !EmailValid && 'Invalid Email Address'}
            </p>

            <p className="text-center">
              {RePwdFocus && !RePwdMatch && 'Password Not Match'}
            </p>
            <p className="w-[300px] justify-center text-center">
              {PwdFocus &&
                !PwdOk &&
                ' Minimum of 8 character including an Upercase,Lower case & any special character or Number'}
            </p>
            <p className="w-[300px] justify-center text-center">
              {PSignFocus &&
                !PwdValid &&
                ' Minimum of 8 character including an Upercase,Lower case & any special character or Number'}
            </p>
          </div>
          <div className="flex items-center justify-center gap-2">
            <h1 className="font-semibold text-[20px]">
              {Signup ? 'Sign up' : 'Sign in'}
            </h1>
            <div className="rounded-full bg-[#c92424] p-2">
              <FaLock size={20} color="#FFFFFF" />
            </div>
          </div>
          <form
            className="flex flex-col justify-center gap-5"
            onSubmit={FormHandler}
          >
            {!Signup && (
              <div className="flex flex-col justify-center gap-5">
                <input
                  placeholder="Email"
                  className=" outline-none p-2 rounded-sm"
                  type="email"
                  name="email"
                  onChange={DetailHandler}
                  required
                  onFocus={() => {
                    setESignFocus(true);
                  }}
                  onBlur={() => {
                    setESignFocus(false);
                  }}
                />
                <input
                  name="password"
                  type={ShowPassword ? `text` : `password`}
                  placeholder="Password"
                  className=" outline-none p-2 rounded-sm "
                  onChange={DetailHandler}
                  required
                  onFocus={() => {
                    setPSignFocus(true);
                  }}
                  onBlur={() => {
                    setPSignFocus(false);
                  }}
                />
              </div>
            )}
            {Signup && (
              <div className="flex flex-col justify-center gap-5">
                <input
                  placeholder="User Name"
                  className=" outline-none p-2 rounded-sm"
                  type="text"
                  value={SignupD.username}
                  required
                  onChange={DetailHandler}
                  name="username"
                  maxLength="15"
                />

                <input
                  placeholder="Email"
                  value={SignupD.email}
                  className=" outline-none p-2 rounded-sm"
                  type="email"
                  name="email"
                  required
                  onChange={DetailHandler}
                  onFocus={() => {
                    setEmailFocus(true);
                  }}
                  onBlur={() => {
                    setEmailFocus(false);
                  }}
                />
                <div className="bg-white flex items-center justify-between">
                  <input
                    name="password"
                    value={SignupD.password}
                    type={ShowPassword ? `text` : `password`}
                    placeholder="Password"
                    className=" outline-none p-2 rounded-sm "
                    required
                    onChange={DetailHandler}
                    onFocus={() => {
                      setPwdFocus(true);
                    }}
                    onBlur={() => {
                      setPwdFocus(false);
                    }}
                  />
                  {ShowPassword ? (
                    <MdOutlineVisibility
                      size={20}
                      onClick={() => {
                        setShowPassword(!ShowPassword);
                      }}
                    />
                  ) : (
                    <MdOutlineVisibilityOff
                      size={20}
                      onClick={() => {
                        setShowPassword(!ShowPassword);
                      }}
                    />
                  )}
                </div>

                <div className="bg-white flex items-center">
                  <input
                    name="repassword"
                    value={SigninD.repassword}
                    required
                    onFocus={() => {
                      setRePwdFocus(true);
                    }}
                    onChange={DetailHandler}
                    onBlur={() => {
                      setRePwdFocus(false);
                    }}
                    type={`password`}
                    placeholder=" Confirm Password"
                    className=" outline-none p-2 rounded-sm  w-full"
                  />
                </div>
              </div>
            )}
            <button
              className="bg-white outline-none p-2 rounded-sm"
              type="submit"
            >
              {Signup ? 'Sign up' : 'Sign in'}
            </button>
          </form>
          <div>
            {!Signup && (
              <h1>
                Dont have an account
                <span
                  onClick={() => {
                    setSignup(!Signup);
                  }}
                  className="text-[#613fe9] mx-1 cursor-pointer italic"
                >
                  Sign up
                </span>
              </h1>
            )}
            {Signup && (
              <h1>
                Already have an account
                <span
                  onClick={() => {
                    setSignup(!Signup);
                  }}
                  className="text-[#613fe9] mx-1 cursor-pointer italic"
                >
                  Log In
                </span>
              </h1>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
