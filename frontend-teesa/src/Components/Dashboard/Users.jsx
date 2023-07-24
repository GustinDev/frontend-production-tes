import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { getUser } from '../../features/reduxReducer/adminSlice';
import { useEffect } from 'react';
import { UserCard } from './UserCard';

const Users = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);
  const users = useSelector((state) => state.admin.users); // Obtener la lista de usuarios del estado

  return (
    <div className='w-full h-screen items-center justify-center'>
      <div className='w-full flex items-center'>
        <NavLink to='/admin'>
          <button className='bg-teesaBlueLight text-white flex flex-row hover:bg-teesaBlueDark p-2 m-5 rounded-xl text-center'>
            Volver
          </button>
        </NavLink>
      </div>
      <div className=' w-full text-center'>
        <h1 className='text-4xl font-bold my-2 w-30 '>Administrar Usuarios</h1>
      </div>
      <div className='grid grid-cols-2 gap-1  mx-auto w-3/4'>
        {users?.map((usuario) => (
          <div
            key={usuario.id}
            className='p-4 bg-white rounded-lg shadow'
          >
            <UserCard usuario={usuario} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Users;
