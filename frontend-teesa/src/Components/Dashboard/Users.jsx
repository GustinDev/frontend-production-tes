/* eslint-disable react/prop-types */
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useTable } from 'react-table';
import {
  getUser,
  enableUser,
  enableUserfalse,
} from '../../features/reduxReducer/adminSlice';
import { motion } from 'framer-motion';

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
    Cell: ({ value }) => (
      <>
        {value.length ? (
          <ul>
            {value.map((compra, index) => (
              <li key={index}>
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
                  Precio: {compra.precio}, Cantidad: {compra.cantidad}, Estado:{' '}
                  {compra.estado}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>Este usuario no realizó ninguna compra.</p>
        )}
      </>
    ),
  },
  {
    Header: 'Inhabilitar Usuario',
    accessor: 'enable',
    Cell: ({ value, row }) => {
      const [isUsuarioHabilitado, setIsUsuarioHabilitado] = useState(value);
      const dispatch = useDispatch();

      const handleHabilitarUsuario = () => {
        setIsUsuarioHabilitado(true);
        dispatch(enableUser(row.original.id));
      };

      const handleDesactivarUsuario = () => {
        setIsUsuarioHabilitado(false);
        dispatch(enableUserfalse(row.original.id));
      };

      return (
        <button
          onClick={
            isUsuarioHabilitado
              ? handleDesactivarUsuario
              : handleHabilitarUsuario
          }
          className={`px-3 py-2 ${
            isUsuarioHabilitado
              ? 'bg-red-600 hover:bg-red-700'
              : 'bg-green-600 hover:bg-green-700'
          } text-white rounded-md`}
        >
          {isUsuarioHabilitado ? 'Inhabilitar Usuario' : 'Habilitar Usuario'}
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

  const data = users.map((usuario) => ({
    id: usuario.id,
    nombre: usuario.nombre,
    correo: usuario.correo || 'N/A',
    direccion: usuario.direccion || 'N/A',
    telefono: usuario.telefono || 'N/A',
    historialCompras: [],
    enable: usuario.enable, // Estado para controlar si el usuario está habilitado o no.
  }));

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className='w-full h-full items-center justify-center'
    >
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
      <div className='h-full gap-1 mx-auto w-3/4 mb-[10px] border-black border-2'>
        <table
          {...getTableProps()}
          className='w-full border-collapse'
        >
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr
                {...headerGroup.getHeaderGroupProps()}
                className='text-left font-bold border-b border-black'
                key={headerGroup.id}
              >
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps()}
                    className='px-3 py-2 border-r border-black'
                    key={column.id}
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
                  key={row.id}
                >
                  {row.cells.map((cell) => (
                    <td
                      {...cell.getCellProps()}
                      className='px-3 py-2 border-r border-black'
                      key={cell.column.id}
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
      <div className='w-full h-10'></div>
    </motion.div>
  );
};

export default Users;
