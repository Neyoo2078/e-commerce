import { useState } from 'react';
import { useEffect } from 'react';

const slideStyles = {
  width: '100%',
  height: '100%',
  borderRadius: '10px',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
};

const rightArrowStyles = {
  position: 'absolute',
  top: '50%',
  transform: 'translate(0, -50%)',
  right: '32px',
  fontSize: '45px',
  color: '#fff',
  zIndex: 1,
  cursor: 'pointer',
};

const leftArrowStyles = {
  position: 'absolute',
  top: '50%',
  transform: 'translate(0, -50%)',
  left: '32px',
  fontSize: '45px',
  color: '#fff',
  zIndex: 1,
  cursor: 'pointer',
};

const dotsContainerStyles = {
  display: 'flex',
  justifyContent: 'center',
  position: 'absolute',
  left: '45%',
  bottom: '30px',
};

const dotStyle = {
  margin: '0 3px',
  cursor: 'pointer',
  fontSize: '20px',
};

const ImageSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slides = [
    { url: 'http://localhost:3000/images/image-1.jpg', title: 'beach' },
    { url: 'http://localhost:3000/images/image-2.jpg', title: 'boat' },
    { url: 'http://localhost:3000/images/image-3.jpg', title: 'forest' },
    { url: 'http://localhost:3000/images/image-4.jpg', title: 'city' },
    { url: 'http://localhost:3000/images/image-5.jpg', title: 'italy' },
  ];
  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };
  const goToNext = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };
  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };
  const slideStylesWidthBackground = {
    ...slideStyles,
    backgroundImage: `url(${slides[currentIndex].url})`,
  };
  useEffect(() => {
    const m = setInterval(() => {
      goToNext();
    }, 9000);
    return () => clearInterval(m);
  }, [currentIndex]);

  return (
    <div className='border-[2px] relative w-full  md:w-[55%]  h-[300px] md:min-h-[400px]'>
      <div>
        <div onClick={goToPrevious} style={leftArrowStyles}>
          ❰
        </div>
        <div onClick={goToNext} style={rightArrowStyles}>
          ❱
        </div>
      </div>

      <div style={slideStylesWidthBackground}></div>
      <div style={dotsContainerStyles}>
        {slides.map((slide, slideIndex) => (
          <div
            style={dotStyle}
            key={slideIndex}
            onClick={() => goToSlide(slideIndex)}
            className={` ${
              slideIndex === currentIndex ? 'text-[#ea3d3d]' : 'text-[#fff]'
            } `}
          >
            ●
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
