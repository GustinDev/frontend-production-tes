/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  updateCart,
  deleteCart,
} from '../../features/reduxReducer/carritoSlice';
import {
  updateCartGuestProducts,
  deleteCartGuestProducts,
} from '../../features/reduxReducer/cartGuestSlice';
import Swal from 'sweetalert2';
import { NavLink, useNavigate } from 'react-router-dom';

export const CarritoSummary = ({
  id,
  productId,
  cantidad,
  precioTotal,
  nombre,
  precio,
  imagen,
  userUUID,
  tipo,
  marca,
  categoria,
}) => {
  const options = {
    style: 'decimal',
    useGrouping: true,
    minimumFractionDigits: 0,
  };
  const userData = useSelector((state) => state.userState.userData);
  const [cart, setCart] = useState({
    cantidad: cantidad,
  });
  const [cartGuest, setCartGuest] = useState({
    cantidad: cantidad,
  });
  const dispatch = useDispatch();

  useEffect(() => {
    if (userData.userId) {
      setCart((prevCart) => ({
        ...prevCart,
        cantidad: cantidad,
      }));
    } else
      setCartGuest((prevCartGuest) => ({
        ...prevCartGuest,
        cantidad: cantidad,
      }));
  }, [cantidad, userData.userId]);

  useEffect(() => {
    if (userData.userId) {
      const total = precio * cart.cantidad;
      setCart((prevCart) => ({
        ...prevCart,
        precioTotal: total,
      }));
    } else {
      const totalGuest = precio * cartGuest.cantidad;
      setCartGuest((prevCartGuest) => ({
        ...prevCartGuest,
        precioTotal: totalGuest,
      }));
    }
  }, [precio, cart.cantidad, cartGuest.cantidad, userData.userId]);

  const handleIncrement = () => {
    if (userData.userId) {
      setCart((prevCart) => ({
        ...prevCart,
        cantidad: prevCart.cantidad + 1,
      }));

      dispatch(updateCart({ CartProductId: id, cantidad: cart.cantidad + 1 }));
    } else
      setCartGuest((prevCartGuest) => ({
        ...prevCartGuest,
        cantidad: prevCartGuest.cantidad + 1,
      }));
    dispatch(
      updateCartGuestProducts({
        CartGuestProductId: id,
        cantidad: cartGuest.cantidad + 1,
      })
    );
  };

  const handleDecrement = () => {
    if (userData.userId) {
      if (cart.cantidad > 1) {
        setCart((prevCart) => ({
          ...prevCart,
          cantidad: prevCart.cantidad - 1,
        }));
        dispatch(
          updateCart({ CartProductId: id, cantidad: cart.cantidad - 1 })
        );
      }
    } else {
      if (cartGuest.cantidad > 1) {
        setCartGuest((prevCartGuest) => ({
          ...prevCartGuest,
          cantidad: prevCartGuest.cantidad - 1,
        }));
        dispatch(
          updateCartGuestProducts({
            CartGuestProductId: id,
            cantidad: cartGuest.cantidad - 1,
          })
        );
      }
    }
  };

  const navigate = useNavigate();
  const alertConfirm = () => {
    Swal.fire({
      title: 'Producto Eliminado',
      icon: 'success',
      confirmButtonText: 'Aceptar',
      confirmButtonColor: '#192C8C',
    }).then(() => {
      navigate(0);
    });
  };

  const handleDelete = (e) => {
    e.preventDefault();
    if (userData.userId) {
      dispatch(deleteCart(id)).then(() => {
        alertConfirm();
      });
    } else
      dispatch(deleteCartGuestProducts(id))
        .then(() => {})
        .catch((error) => {
          console.error(
            'Error al eliminar el producto del carrito de invitado:',
            error
          );
        });
  };

  const [nombreN, setNombreN] = useState('');

  function capitalizeFirstLetters(str) {
    return str.replace(/\b\w/g, (char) => char.toUpperCase());
  }
  useEffect(() => {
    const nombreEnMayusculas = capitalizeFirstLetters(nombre);
    setNombreN(nombreEnMayusculas);
  }, [nombre]);

  return (
    <div className='flex items-center   my-1 bg-gray-50 p-2 border-t-2 border-t-gray-300'>
      <NavLink to={`/home/${productId}`}>
        <img
          className='w-20 object-contain rounded-lg '
          src={imagen[0]}
          alt={nombre}
        />
      </NavLink>
      <div>
        <NavLink to={`/home/${productId}`}>
          <div className='ml-4'>
            <p className='text-[14px]'>
              {tipo} <span className=' font-bold '>|</span> {categoria} {marca}
            </p>
            <h2 className=' font-medium text-black mb-1 text-lg'>{nombreN}</h2>

            <span
              id='quantity'
              className=' text-black  flex text-md'
            >
              Cantidad {userData.userId ? cart.cantidad : cartGuest.cantidad}{' '}
              |&nbsp;
              <h4 className='text-black text-md'>
                ${' '}
                {cart.precioTotal
                  ? cart.precioTotal.toLocaleString('en-US', options)
                  : cartGuest.precioTotal
                  ? cartGuest.precioTotal.toLocaleString('en-US', options)
                  : '0'}{' '}
                COP
              </h4>
            </span>
          </div>
        </NavLink>
      </div>
    </div>
  );
};

export default CarritoSummary;
