import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useLocation, useNavigate } from 'react-router-dom';
import Rating from '../Components/Rating';
import { priceArray, ratingArray } from '../asset/SearchData';
import { useEffect } from 'react';
import { Api } from '../Api/Api';
import { useState } from 'react';
import ProductCard from '../Components/ProductCard';
import Footer from '../Components/Footer';
import Loading from '../Components/Loading';

const Search = () => {
  const pagess = 7;
  const what = [...new Array(pagess).keys()];
  console.log({ what });

  const [catLoading, setcatLoading] = useState(true);
  const [catData, setcatData] = useState([]);
  const [SearchLoading, setSearchLoading] = useState(true);
  const [SearchData, setSearchData] = useState([]);
  const [numberOfPages, setnumberOfPages] = useState(null);
  console.log({ numberOfPages });

  useEffect(() => {
    const getCat = async () => {
      try {
        const { data } = await Api.get('/categories');
        setcatData(data.data);
        setcatLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getCat();
  }, []);
  const navigate = useNavigate();

  const { search } = useLocation();
  const QueryUrl = new URLSearchParams(search);
  const q = QueryUrl.get('q') || 'All';
  const Category = QueryUrl.get('Category') || 'All';
  const Price = QueryUrl.get('Price') || 'All';
  const Ratings = QueryUrl.get('Ratings') || 'All';
  const Sort = QueryUrl.get('Sort') || 'newest';
  const Page = QueryUrl.get('Page') || 1;

  useEffect(() => {
    const SearchFetch = async () => {
      setSearchLoading(true);
      try {
        const { data } = await Api.get(
          `/search?Category=${Category}&q=${q}&Price=${Price}&Ratings=${Ratings}&Sort=${Sort}&Page=${Page}`
        );
        console.log({ data });
        setSearchData(data.data);
        setnumberOfPages({
          numberOfPages: data.numberOfPages,
          page: data.page,
        });
        setSearchLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    SearchFetch();
  }, [Category, q, Price, Ratings, Sort, Page]);

  const FetchUrl = (fetch) => {
    const fetchq = fetch.q || 'All';
    const fetchCategory = fetch.Category || Category;
    const fetchPrice = fetch.Price || Price;
    const fetchRating = fetch.Ratings || Ratings;
    const fetchSort = fetch.Sort || Sort;
    const fetchPage = fetch.Page || Page;

    return `/search?Category=${fetchCategory}&q=${fetchq}&Price=${fetchPrice}&Ratings=${fetchRating}&Sort=${fetchSort}&Page=${fetchPage}`;
  };

  return (
    <div className='w-full'>
      {catLoading ? (
        <div className='mx-auto mt-9'>
          {' '}
          <Loading message='Loaing data' />
        </div>
      ) : (
        <div className='flex flex-col items-center p-[20px] w-full'>
          <div>
            <div></div>
            <div className='flex gap-3'>
              <label htmlFor='sort'>Sort Products:</label>
              <select
                onChange={(e) => {
                  const m = FetchUrl({ Sort: e.target.value });
                  navigate(m);
                  console.log(e.target.value);
                }}
                id='sort'
                className=' text-black'
              >
                <option className='text-black' value='newest'>
                  Newest Arrivals
                </option>
                <option value='lowest'>Price: Low to High</option>
                <option value='highest'>Price: High to low</option>
                <option value='toprated'>Avg:Customers Review</option>
              </select>
            </div>
          </div>
          <div className='flex  justify-between p-[20px]  w-[90%] m-auto'>
            <div className=' flex flex-col w-[20%] gap-1  p-[10px] border-[2px] justify-center'>
              <div>
                <h1 className='text-[20px] m-auto font-semibold'>Categories</h1>
              </div>
              <div className=' flex flex-col w-[100%] gap-2  p-[5px] justify-center'>
                <Link
                  className={`text-[15px] ${
                    Category === 'All' && 'text-[20px] text-[#7083ed]'
                  } `}
                  to={FetchUrl({ Category: 'All' })}
                >
                  Any
                </Link>
                {catData?.map((items) => (
                  <Link
                    className={`text-[15px]  ${
                      Category === items && 'text-[20px] text-[#7083ed]'
                    } `}
                    to={FetchUrl({ Category: items })}
                  >
                    {items}
                  </Link>
                ))}
              </div>
              <div className='border-[1px] w-[100%] m-auto' />
              <div>
                {' '}
                <h1 className='text-[20px] m-auto font-semibold'>Price</h1>
              </div>
              <div className=' flex flex-col w-full gap-2 border-[2px] p-2  justify-center'>
                <Link
                  className={`text-[15px]   ${
                    Price === 'All' && 'text-[20px] text-[#7083ed] underline'
                  }`}
                  to={FetchUrl({ Price: 'All' })}
                >
                  All
                </Link>
                {priceArray.map((price) => (
                  <Link
                    className={`text-[15px]   ${
                      Price === price.value &&
                      'text-[20px] text-[#7083ed] underline'
                    }`}
                    to={FetchUrl({ Price: price.value })}
                  >
                    {price.price}
                  </Link>
                ))}
              </div>
              <div className='border-[1px] w-[100%] m-auto' />
              <div>
                {' '}
                <h1 className='text-[20px] m-auto font-semibold'>
                  Customer Avg Review
                </h1>
              </div>
              <div className=' flex flex-col w-full gap-2  p-[5px] justify-center'>
                {ratingArray.map((rating) => (
                  <Link
                    className='text-[#FFD700] w-full flex'
                    to={FetchUrl({ Ratings: rating.value })}
                  >
                    <Rating rating={rating.rating} />
                    <span className='font-semibold'> & Up</span>
                  </Link>
                ))}
              </div>
            </div>
            <div className='w-[80%] px-[15px]'>
              <div>
                {SearchLoading ? (
                  <div className='flex flex-wrap gap-2 justify-center w-full  h-[550px]'>
                    Loading...
                  </div>
                ) : (
                  <div className='flex flex-col gap-2 '>
                    <div className='flex flex-wrap gap-2 justify-start w-full  h-[550px]'>
                      {SearchData?.map((items) => (
                        <>
                          <ProductCard product={items} />
                        </>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <div className='flex justify-center items-center'>
                {[...new Array(numberOfPages.numberOfPages).keys()].map((x) => (
                  <div
                    onClick={() => {
                      navigate(FetchUrl({ Page: x + 1 }));
                    }}
                    className={`border-[2px] px-2 py-1 shadow-md font-semibold ${
                      x + 1 === Number(numberOfPages?.page) &&
                      'font-bold text-[#49db3c]'
                    } cursor-pointer`}
                  >
                    {x + 1}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div>
            <Footer />
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
