/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  getShopId,
  enableUser,
  enableUserfalse,
} from '../../features/reduxReducer/adminSlice';

const UserCard = ({ usuario }) => {
  const dispatch = useDispatch();

  const [historialCompras, setHistorialCompras] = useState([]);

  const [mostrarHistorial, setMostrarHistorial] = useState(false); // Estado para controlar la visibilidad del historial

  useEffect(() => {
    const fetchHistorialCompras = async () => {
      const shopId = await dispatch(getShopId(usuario.id));
      setHistorialCompras(shopId.payload);
    };

    if (mostrarHistorial) {
      fetchHistorialCompras();
    } else {
      setHistorialCompras([]); // Limpiar el historial de compras cuando se oculta
    }
  }, [dispatch, usuario.id, mostrarHistorial]);
  const handleMostrarHistorial = () => {
    setMostrarHistorial(!mostrarHistorial);
  };

  //User Habilitado

  const [isUsuarioHabilitado, setIsUsuarioHabilitado] = useState(
    usuario.enable
  );

  const handleHabilitarUsuario = () => {
    const enableValue = !isUsuarioHabilitado;
    setIsUsuarioHabilitado(enableValue);
    dispatch(enableUser(usuario.id));
  };

  const handleDesactivarUsuario = () => {
    const enableValue = false;
    setIsUsuarioHabilitado(enableValue);
    dispatch(enableUserfalse(usuario.id));
  };

  return (
    <div className='w-full '>
      <div
        className={`bg-white rounded-lg p-4 mb-4 ${
          isUsuarioHabilitado ? '' : 'opacity-50'
        }`}
      >
        <h3 className='text-lg font-semibold'>{usuario.nombre}</h3>
        <p className='text-sm'>
          <strong>Dirección:</strong> {usuario.direccion}
        </p>
        <p className='text-sm'>
          <strong>Teléfono:</strong> {usuario.telefono}
        </p>
        <p className='text-sm'>
          <strong>Correo:</strong> {usuario.correo}
        </p>

        <button
          onClick={
            isUsuarioHabilitado
              ? handleDesactivarUsuario
              : handleHabilitarUsuario
          }
          className={`rounded-md text-white p-2 mt-2 ${
            isUsuarioHabilitado
              ? 'bg-red-600 hover:bg-red-700'
              : 'bg-green-600 hover:bg-green-700'
          }`}
          style={{ marginRight: '10px' }}
        >
          {isUsuarioHabilitado ? 'Inhabilitar Usuario' : 'Habilitar Usuario'}
        </button>

        <button
          onClick={handleMostrarHistorial}
          className='bg-blue-600 rounded-md text-white hover:bg-blue-700 p-2 mt-2'
          style={{ marginLeft: '10px' }}
        >
          {mostrarHistorial
            ? 'Ocultar historial de compras'
            : 'Ver historial de compras'}
        </button>

        {mostrarHistorial && (
          <>
            {historialCompras.length ? (
              <ul className='mt-4'>
                {historialCompras.map((compra) => (
                  <li
                    key={compra.id}
                    className='mb-2'
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
              <h1>Este usuario no realizo ninguna compra</h1>
            )}
          </>
        )}
      </div>
    </div>
  );
};
export { UserCard };
