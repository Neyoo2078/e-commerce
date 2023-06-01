import React from 'react';
import { ClipLoader } from 'react-spinners';

const Loading = ({ message }) => {
  return (
    <div className='m-auto flex items-center flex-col'>
      <ClipLoader />
      <p>{message}</p>
    </div>
  );
};

export default Loading;
