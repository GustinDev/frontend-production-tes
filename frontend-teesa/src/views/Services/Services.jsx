import preventivo from '../../img/imgs/preventivo.png';
import correctivo from '../../img/imgs/correctivo.png';
import tech from '../../img/imgs/tech.jpg';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

//Responsive:

function Services() {
  return (
    <motion.div className='flex flex-col justify-center items-center  h-full'>
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className='text-white font-bold   xl:text-5xl lg:text-5xl md:text-4xl sm:text-4xl my-10 bg-teesaBlueDark py-5 px-10 rounded-xl'
      >
        Nuestros Servicios
      </motion.h1>
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className='flex flex-col  md:flex-row justify-center items-center md:gap-[10%] gap-4 mb-[3%] text-center'
      >
        <div className='w-2/3 md:w-[25%] h-[40%] bg-teesaBlueDark flex flex-col justify-center items-center rounded-lg'>
          <img
            src={preventivo}
            alt='prev'
            className='border-4 border-teesaBlueDark rounded-t-lg'
          />
          <p className='text-teesaWhite  xl:text-xl lg:text-xl md:text-sm sm:text-sm mb-[2%] bg-teesaBlueDark rounded-b-lg py-2  px-2'>
            Mantenga sus equipos en óptimo estado para evitar fallos y pérdidas
            durante la producción.
          </p>
        </div>
        <div className='w-2/3 md:w-[25%] h-[40%] bg-teesaBlueDark flex flex-col justify-center items-center rounded-lg '>
          <img
            src={correctivo}
            alt='corr'
            className='border-4 border-teesaBlueDark rounded-t-lg'
          />
          <p className='text-teesaWhite  xl:text-xl lg:text-xl md:text-sm sm:text-sm mb-[2%] bg-teesaBlueDark rounded-b-lg py-2 px-2'>
            Ayudamos a resolver las fallas de sus equipos con diagnósticos
            precisos y tiempos mínimos.
          </p>
        </div>
      </motion.div>
      {/* AGENDAR */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className='bg-teesaBlueDark w-2/3 h-full text-teesaWhite flex flex-row justify-between items-center text-center   rounded-lg mb-40 '
      >
        <div className='flex flex-col justify-center items-center text-center w-full lg:w-1/2  p-4'>
          <h1 className='xl:text-2xl  font-bold lg:text-3xl md:text-xl sm:text-lg pb-3'>
            ¿Quieres agendar una visita técnica?
          </h1>
          <Link to='/contact'>
            <button className='inline-block  rounded bg-teesaBlueLight  px-6 pt-2.5 pb-2 text-lg uppercase leading-normal text-white shadow-lg hover:bg-blue-600 cursor-pointer xl:text-2xl  font-extrabold '>
              contáctanos
            </button>
          </Link>
          {/* MITAD */}
          <hr className='border-2 w-full border-white cursor-pointer my-2  xl:my-4 2xl:my-8' />
          <h2 className='mb-2 text-xl font-bold  xl:text-2xl'>
            Escríbenos por:
          </h2>
          <div className='flex flex-row justify-center items-center xl:gap-6 lg:gap-6 md:gap-4 gap-2'>
            <a
              target='_blank'
              rel='noreferrer'
              href='https://api.whatsapp.com/send?phone=%2B57+316+2432974&text=Hola%2C+vi+tu+pagina+web+y+deseo+mas+informaci%C3%B3n'
            >
              <i className='fa-brands fa-square-whatsapp text-4xl xl:text-7xl lg:text-7xl md:text-7xl hover:scale-125 duration-75'></i>
            </a>
            <a
              target='_blank'
              rel='noreferrer'
              href='https://www.facebook.com/profile.php?id=100068661421832&mibextid=ZbWKwL'
            >
              <i className='fa-brands fa-square-facebook xl:text-7xl lg:text-7xl md:text-7xl text-4xl hover:scale-125 duration-75'></i>
            </a>
            <a
              target='_blank'
              rel='noreferrer'
              href='https://www.instagram.com/teesa.tec/'
            >
              <i className='fa-brands fa-square-instagram xl:text-7xl lg:text-7xl md:text-7xl text-4xl hover:scale-125 duration-75'></i>
            </a>
          </div>
        </div>
        <div className='hidden lg:flex w-1/2 h-full'>
          <img
            src={tech}
            alt='tech'
            className=' rounded-r-lg object-contain h-full'
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

export default Services;
