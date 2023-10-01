import Image from 'next/image';
import React from 'react';

interface Props {
  images: string[];
}

const ImageSliderCard = (props: Props) => {
  const [currentSlider, setCurrentSlider] = React.useState(1);

  const imageLength = props.images.length;
  const repeat = currentSlider === imageLength ? 1 : currentSlider + 1;

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlider(repeat);
    }, 7000);
    return () => clearInterval(timer);
  }, [currentSlider, repeat]);

  const handleMoveDot = (index: number) => {
    setCurrentSlider(index);
  };

  return (
    <React.Fragment>
      {props.images.map(
        (image, index) =>
          index + 1 === currentSlider && (
            <Image
              key={index}
              width={1000}
              height={1000}
              className='absolute top-0 right-0 h-full w-full object-cover'
              src={image}
              alt='product image'
            />
          )
      )}

      <div className='absolute bottom-0 mb-4 flex w-full justify-center space-x-4'>
        {props.images.map((_, index) => (
          <div
            key={index}
            onClick={() => handleMoveDot(index + 1)}
            className={`h-3 w-3 rounded-full border-2 border-rose-700 ${
              index + 1 === currentSlider
            } ? 'bg-rose-700' : 'bg-transparent'`}
          ></div>
        ))}
      </div>
    </React.Fragment>
  );
};

export default ImageSliderCard;
