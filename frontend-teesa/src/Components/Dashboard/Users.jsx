import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { useEffect } from 'react';
import { useTable } from 'react-table';
import { getUser } from '../../features/reduxReducer/adminSlice';

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
    Header: 'Historial de Compras', // Nueva columna: Historial de Compras
    accessor: 'historialCompras', // El accessor para esta columna no es necesario, ya que la información de compras está disponible en los datos.
    Cell: () => (
      <button className='px-3 py-2 bg-blue-600 text-white rounded-md'>
        Ver Historial
      </button>
    ),
  },
  {
    Header: 'Inhabilitar Usuario', // Nueva columna: Inhabilitar Usuario
    accessor: 'inhabilitarUsuario', // El accessor para esta columna no es necesario, ya que la información para el botón está disponible en los datos.
    Cell: () => (
      <button className='px-3 py-2 bg-red-600 text-white rounded-md'>
        Inhabilitar
      </button>
    ),
  },
];

const Users = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
  }, []);

  const users = useSelector((state) => state.admin.users);

  const data = users.map((usuario) => ({
    nombre: usuario.nombre,
    correo: usuario.correo || 'N/A',
    direccion: usuario.direccion || 'N/A',
    telefono: usuario.telefono || 'N/A',
    historialCompras: '', // Aquí puedes colocar la lógica para obtener el historial de compras del usuario y mostrarlo aquí.
    inhabilitarUsuario: '', // Aquí puedes colocar la lógica para inhabilitar al usuario.
  }));

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

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
