import React from 'react';
import { useSelector } from 'react-redux';
import { BiSearch } from 'react-icons/bi';
import { useState, useEffect } from 'react';
import { fetchAll } from '../Reducers/ProductReducer';
import { useDispatch } from 'react-redux';
import List from './List';
import { useNavigate } from 'react-router-dom';

const FilterSearch = ({ setdata, data }) => {
  const { products } = useSelector((state) => state.products);
  const [Filter, setFilter] = useState([]);
  const navigate = useNavigate();

  const [searchF, setsearchF] = useState(false);
  const [searcTerm, setsearcTerm] = useState('');
  console.log({ searcTerm });

  useEffect(() => {
    if (searcTerm.length === 0) {
      setdata(products);
    }
  }, [searcTerm, products, setdata]);

  const inputHandler = (e) => {
    setsearcTerm(e.target.value);
    const filterItem = products.filter((items) =>
      items.name.toLowerCase().includes(searcTerm.toLowerCase())
    );
    setFilter(filterItem);
  };

  return (
    <div className='z-10 md:flex hidden h-[70px] overflow-visible mt-[20px]'>
      <div className='flex flex-col gap-4'>
        <div className='flex my-[5px] justify-between bg-white items-center rounded-md p-2 h-[40px]'>
          <input
            onFocus={() => {
              setsearchF(true);
            }}
            onChange={inputHandler}
            type='text'
            className='my-[10px] outline-none  text-black p-2 rounded-sm font-san'
            placeholder='Search products'
            value={searcTerm}
          />
          <BiSearch
            size={25}
            className='text-black'
            onClick={() => {
              if (searcTerm.length === 0) {
                return;
              }
              navigate(`/Search?q=${searcTerm}`);
              setsearchF(false);
            }}
          />
        </div>

        <div
          className={`text-black bg-[#fcfafa] ${
            !searchF || searcTerm.length === 0 || data.length === 0
              ? 'hidden'
              : 'block'
          } p-4 shadow-md rounded-md `}
        >
          {Filter?.map((items, i) => {
            return (
              <div key={i}>
                <List
                  setsearcTerm={setsearcTerm}
                  items={items}
                  setsearchF={setsearchF}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FilterSearch;
