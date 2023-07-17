import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className='flex w-full bg-teesaBlueDark text-white py-2 px-2 justify-between'>
      <h1>CME© 2023 | Derechos Reservados</h1>
      <h2>
        Creado por:{' '}
        <span className='text-teesaGreen hover:text-green-300'>
          <Link to='/aboutdevs'>Teesa Dev Team</Link>
        </span>
      </h2>
    </div>
  );
};

export default Footer;
