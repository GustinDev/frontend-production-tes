import AboutDevCard from './AboutDevCard/AboutDevCard';
import developers from '../../developersData';

const AboutDevs = () => {
  return (
    <div className='w-full flex flex-col justify-center items-center bg-white text-black'>
      <div className='xl:w-4xl lg:max-w-3xl md:max-w-2xl sm:max-w-md'>
        <h1 className='xl:text-4xl lg:text-xl md:text-xl sm:text-xl font-bold mt-8 mb-4 text-teesaBlueDark md:text-left'>
          Desarrolladores Web
        </h1>
        <p className='xl:text-xl lg:text-md md:text-lg sm:text-md mb-[5%] text-blue-900 md:text-left'>
          Somos un equipo de 7 web developers provenientes de Colombia y
          Argentina unidos para desarrollar este proyecto, combinando nuestros
          conocimientos en bases de datos, back-end y front-end, y aplicando
          herramientas de diseño UX/UI para ofrecer una experiencia de
          navegación intuitiva.
        </p>
        <hr className='border-t border-teesaGreen my-8' />
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
        {developers.slice(0, 4).map((developer) => (
          <div
            key={developer.name}
            className='col-span-1 md:col-span-2 lg:col-span-1'
          >
            <AboutDevCard
              name={developer.name}
              country={developer.country}
              role={developer.role}
              linkedin={developer.linkedin}
              github={developer.github}
              image={developer.img ? developer.img : developer.image}
            />
          </div>
        ))}
      </div>

      <div className='flex justify-center mt-8'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
          {developers.slice(4, 7).map((developer) => (
            <div
              key={developer.name}
              className='col-span-1 md:col-span-2 lg:col-span-1'
            >
              <AboutDevCard
                name={developer.name}
                country={developer.country}
                role={developer.role}
                linkedin={developer.linkedin}
                github={developer.github}
                image={developer.img ? developer.img : developer.image}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutDevs;
