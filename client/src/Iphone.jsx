import React from 'react';
import phone from "./asset/phone.png"

import "./Iphone.css"

function RotatingiPhone13() {
  return (
    <div className="iphone-container">
      <div className="iphone">
       <img id='phone' className='phone' src={phone} alt="phone"/>
      </div>
    </div>
  );
}

export default RotatingiPhone13;