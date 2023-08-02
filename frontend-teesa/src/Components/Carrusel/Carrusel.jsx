import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { useSelector } from 'react-redux';
import './slide.css';

const ImageCarousel = () => {
  const imagenes = useSelector(
    (state) => state?.detailState?.productDetail.imagenes
  );

  return (
    <div className='w-10/12 h-fit mx-auto bg-gray-300 '>
      {' '}
      <Carousel className='main-slide flex flex-col items-center w-full'>
        {imagenes?.map((image, index) => (
          <div
            key={index}
            className='w-[150px] h-[230px] md:h-[380px] md:w-[300px] mx-auto'
          >
            <img
              className='h-full object-contain'
              src={image}
              alt={`Imagen ${index}`}
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default ImageCarousel;
