import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { useSelector } from 'react-redux';
import './slide.css';

const ImageCarousel = () => {
  const imagenes = useSelector(
    (state) => state?.detailState?.productDetail.imagenes
  );

  return (
    <div className='w-2/3 h-full mx-auto'>
      {' '}
      {/* Ajusta el tamaño deseado para el contenedor */}
      <Carousel className='main-slide'>
        {imagenes?.map((image, index) => (
          <div
            key={index}
            className='h-[300px] w-[300px]'
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
