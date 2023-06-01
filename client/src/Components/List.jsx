import React from 'react';

const List = ({ setsearcTerm, items, setsearchF }) => {
  const HandleClick = () => {
    setsearcTerm(items.name);
    setsearchF(false);
  };

  return (
    <div className='my-[10px] text-black p-2 font-san cursor-pointer hover:bg-slate-400 '>
      <p onClick={HandleClick}>{items.name}</p>
    </div>
  );
};

export default List;
