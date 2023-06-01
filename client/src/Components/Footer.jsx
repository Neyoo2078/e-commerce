import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className='bg-[#565454]'>
      <div className='container mx-auto px-4 py-8 md:py-12'>
        <div className='flex flex-wrap justify-between'>
          <div className='w-full md:w-1/4 mb-8'>
            <h5 className='text-lg font-bold mb-4 text-white'>About Us</h5>
            <p className='text-white text-sm'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
          </div>
          <div className='w-full md:w-1/4 mb-8'>
            <h5 className='text-lg font-bold mb-4 text-white'>Categories</h5>
            <ul className='list-none text-white text-sm'>
              <li>
                <Link to='/category1' className='hover:text-gray-900'>
                  Category 1
                </Link>
              </li>
              <li>
                <Link to='/category2' className='hover:text-gray-900'>
                  Category 2
                </Link>
              </li>
              <li>
                <Link to='/category3' className='hover:text-gray-900'>
                  Category 3
                </Link>
              </li>
              <li>
                <Link to='/category4' className='hover:text-gray-900'>
                  Category 4
                </Link>
              </li>
            </ul>
          </div>
          <div className='w-full md:w-1/4 mb-8'>
            <h5 className='text-lg font-bold mb-4 text-white'>
              Customer Service
            </h5>
            <ul className='list-none text-white text-sm'>
              <li>
                <Link to='/contact' className='hover:text-gray-900'>
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to='/faq' className='hover:text-gray-900'>
                  FAQ
                </Link>
              </li>
              <li>
                <Link to='/returns' className='hover:text-gray-900'>
                  Returns
                </Link>
              </li>
            </ul>
          </div>
          <div className='w-full md:w-1/4 mb-8'>
            <h5 className='text-lg font-bold text-white mb-4'>
              Connect With Us
            </h5>
            <ul className='list-none text-white text-sm'>
              <li>
                <a
                  href='https://www.facebook.com/'
                  className='hover:text-gray-900'
                >
                  Facebook
                </a>
              </li>
              <li>
                <a
                  href='https://www.twitter.com/'
                  className='hover:text-gray-900'
                >
                  Twitter
                </a>
              </li>
              <li>
                <a
                  href='https://www.instagram.com/'
                  className='hover:text-gray-900'
                >
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>
        <hr className='my-8 md:my-12' />
        <div className='flex flex-wrap justify-center'>
          <div className='w-full md:w-1/2 text-center text-white text-sm'>
            <p>&copy; 2023 Your E-commerce App Name</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
