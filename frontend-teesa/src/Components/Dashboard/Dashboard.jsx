/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  //*Validar Admin - Juan:

  const navigate = useNavigate();
  const alertGoodbye = () => {
    Swal.fire({
      title: '¡Un momento!',
      text: 'No eres admin, no puedes estar aquí.',
      icon: 'info',
      confirmButtonText: 'Aceptar',
      confirmButtonColor: '#192C8C',
    }).then(() => {
      navigate('/home');
    });
  };

  const userAdmin = useSelector((state) => state.userState.userData.userType);
  // console.log('data' + userAdmin);
  const [waiting, setWaiting] = useState(true);

  useEffect(() => {
    if (userAdmin === null) {
      const timeout = setTimeout(() => {
        if (waiting) {
          alertGoodbye();
        }
      }, 3000);

      return () => {
        clearTimeout(timeout);
      };
    } else {
      setWaiting(false);
    }
  }, [userAdmin, waiting]);

  useEffect(() => {
    if (userAdmin !== null && !waiting) {
      // Validar los datos después de que se hayan obtenido
      if (userAdmin === false) {
        alertGoodbye();
      }
    }
  }, [userAdmin, waiting]);

  return (
    <div className='flex flex-col items-center min-h-screen  bg-teesaGrey'>
      <h1 className='text-5xl text-black font-bold my-6 underline'>
        Dashboard
      </h1>

      <h2 className='font-bold text-2xl text-black'>
        Selecciona la acción a realizar.
      </h2>
      <div className='flex flex-row justify-center items-center mt-4 gap-[6%]'>
        <NavLink to='/admin/createproduct'>
          <button className='bg-teesaBlueLight  text-white flex flex-row hover:bg-teesaBlueDark p-2'>
            Crear Producto Nuevo
          </button>
        </NavLink>
        <NavLink to='/admin/users'>
          <button className='bg-teesaBlueLight  text-white flex flex-row hover:bg-teesaBlueDark p-2'>
            Administrar Usuarios
          </button>
        </NavLink>
        <NavLink to='/admin/metrics'>
          <button className='bg-teesaBlueLight  text-white flex flex-row hover:bg-teesaBlueDark p-2'>
            Métricas y Gráficas
          </button>
        </NavLink>
      </div>
    </div>
  );
}

export default Dashboard;
