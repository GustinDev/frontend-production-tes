import { Link } from 'react-router-dom';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  return (
    <div className='flex flex-col w-full'>
      <div className='flex justify-end p-5 '>
        <i
          className='fa-solid fa-circle-arrow-up text-teesaBlueLight transition duration-100 transform hover:scale-125 '
          style={{
            fontSize: '35px',
            cursor: 'pointer',
          }}
          onClick={scrollToTop}
        ></i>
      </div>
      <div className='flex w-full bg-teesaBlueDark text-white py-2 px-2 justify-between'>
        <h1>TEESA S.A.S © 2023 | Derechos Reservados</h1>
        <h2>
          Creado por:{' '}
          <span className='text-teesaGreen hover:text-green-300'>
            <Link to='/aboutdevs'>Teesa Dev Team</Link>
          </span>
        </h2>
      </div>
    </div>
  );
};

export default Footer;
