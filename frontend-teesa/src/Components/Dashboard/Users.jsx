import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useTable } from 'react-table';
import {
  getUser,
  enableUser,
  enableUserfalse,
  getShopId,
} from '../../features/reduxReducer/adminSlice';

const columns = [
  {
    Header: 'Nombre',
    accessor: 'nombre',
  },
  {
    Header: 'Correo',
    accessor: 'correo',
  },
  {
    Header: 'Dirección',
    accessor: 'direccion',
  },
  {
    Header: 'Teléfono',
    accessor: 'telefono',
  },
  {
    Header: 'Historial de Compras',
    accessor: 'historialCompras',
    Cell: ({ value }) => {
      return (
        <div>
          {value?.length > 0 ? (
            <ul className='divide-y divide-gray-300'>
              {value.map((compra) => (
                <li
                  key={compra.id}
                  className='py-2'
                >
                  <div className='flex items-center'>
                    <img
                      src={compra.Product.imagenes[0]}
                      alt='Producto'
                      className='w-8 h-8 mr-2'
                    />
                    <div>
                      <p className='text-sm font-semibold'>
                        {compra.Product.nombre}
                      </p>
                      <p className='text-xs text-gray-500'>
                        Fecha: {compra.fechaDeCompra}
                      </p>
                    </div>
                  </div>
                  <div className='text-xs'>
                    Precio: {compra.precio}, Cantidad: {compra.cantidad},
                    Estado: {compra.estado}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className='text-white'>
              Este usuario no ha realizado ninguna compra.
            </p>
          )}
        </div>
      );
    },
  },
  {
    Header: 'Inhabilitar Usuario',
    accessor: 'inhabilitarUsuario',
    Cell: ({ row }) => {
      const usuario = row.original;

      return (
        <button
          className={`px-3 py-2 rounded-md text-white ${
            usuario.enable
              ? 'bg-red-600 hover:bg-red-700'
              : 'bg-green-600 hover:bg-green-700'
          }`}
          onClick={() => handleHabilitarUsuario(usuario.id, !usuario.enable)}
        >
          {usuario.enable ? 'Inhabilitar' : 'Habilitar'}
        </button>
      );
    },
  },
];

const Users = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
  }, []);

  const users = useSelector((state) => state.admin.users);

  const [historialCompras, setHistorialCompras] = useState([]);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data: users });

  const handleHabilitarUsuario = async (userId, enableValue) => {
    try {
      if (enableValue) {
        await dispatch(enableUser(userId));
      } else {
        await dispatch(enableUserfalse(userId));
      }
      dispatch(getUser()); // Actualizamos la lista de usuarios después de habilitar o inhabilitar al usuario
    } catch (error) {
      console.error('Error al habilitar o inhabilitar al usuario:', error);
    }
  };

  return (
    <div className='w-full h-screen items-center justify-center'>
      <div className='w-full flex items-center'>
        <NavLink to='/admin'>
          <button className='bg-teesaBlueLight text-white flex flex-row hover:bg-teesaBlueDark p-2 m-5 rounded-xl text-center'>
            Volver
          </button>
        </NavLink>
      </div>
      <div className='w-full text-center flex justify-center'>
        <div>
          <h1 className='text-white text-4xl font-bold my-5 bg-teesaBlueDark rounded-2xl p-2 w-full'>
            Administrar Usuarios
          </h1>
        </div>
      </div>
      <div className='grid grid-cols-4 gap-1 mx-auto w-3/4'>
        <table
          {...getTableProps()}
          className='w-full border-collapse'
        >
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr
                {...headerGroup.getHeaderGroupProps()}
                className='text-left font-bold border-b border-black'
              >
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps()}
                    className='px-3 py-2 border-r border-black'
                  >
                    {column.render('Header')}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr
                  {...row.getRowProps()}
                  className='border-b border-black'
                >
                  {row.cells.map((cell) => (
                    <td
                      {...cell.getCellProps()}
                      className='px-3 py-2 border-r border-black'
                    >
                      {cell.render('Cell')}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
