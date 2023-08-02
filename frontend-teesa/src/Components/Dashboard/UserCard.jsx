/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getShopId } from '../../features/reduxReducer/adminSlice';

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

  return (
    <div className='w-full '>
      <button
        onClick={handleMostrarHistorial}
        className='bg-blue-600 rounded-md text-white hover:bg-blue-700 p-2 mt-2'
        style={{ marginLeft: '10px' }}
      >
        {mostrarHistorial
          ? 'Ocultar historial de compras'
          : 'Mostrar historial de compras'}
      </button>

      {/* HISTORIAL DE COMPRAS */}
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
  );
};
export { UserCard };
