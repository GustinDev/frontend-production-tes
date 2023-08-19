/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from 'react';
import { useState, useEffect } from 'react';
import {
  postCart,
  getUser,
  getUserCartNumber,
  setProductNumber,
} from '../../features/reduxReducer/carritoSlice';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { motion } from 'framer-motion';

export const Card = ({
  nombre,
  categoria,
  imagenes,
  precio,
  marca,
  id,
  tipo,
  refe,
}) => {
  const options = {
    style: 'decimal',
    useGrouping: true,
    minimumFractionDigits: 0,
  };
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userState.userData);
  const [cartId, setCartId] = useState('');
  const [cart, setCart] = useState({
    ProductId: id,
    CartId: cartId,
    cantidad: 0,
  });
  const [cartGuest, setCartGuest] = useState({
    ProductId: id,
    cantidad: 0,
  });

  //*Cart - Fix

  const user = useSelector((state) => state.userState.user);
  const [loadingUser, setLoadingUser] = useState(null);

  useEffect(() => {
    if (user) {
      setLoadingUser(true);
      dispatch(getUser())
        .then((action) => {
          const response = action.payload;
          // console.log(response);
          const cartId = response.find((user) => user.id === userData.userId)
            ?.Cart.id;
          // console.log(cartId);
          setCartId(cartId);
          setCart((prevCart) => ({
            ...prevCart,
            CartId: cartId,
          }));
        })
        .finally(() => {
          setLoadingUser(false);
        });
    }
  }, [dispatch, userData, user]);

  const handleIncrement = async () => {
    if (user) {
      if (cart.CartId) {
        setCart((prevCart) => ({
          ...prevCart,
          cantidad: Number(prevCart.cantidad) + 1,
        }));
      } else
        setCartGuest((prevCartGuest) => ({
          ...prevCartGuest,
          cantidad: Number(prevCartGuest.cantidad) + 1,
        }));
      //GetNumber
    } else {
      Swal.fire({
        icon: 'warning',
        title: '¡Error!',
        text: 'Ingresa a tu cuenta para agregar productos.',
        showConfirmButton: false,
        timer: 4000,
        timerProgressBar: true,
        toast: true,
        position: 'top-end',
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer);
          toast.addEventListener('mouseleave', Swal.resumeTimer);
          toast.style.marginTop = '80px';
        },
      });
    }
  };

  const handleDecrement = () => {
    if (user) {
      if (cart.cantidad > 0) {
        if (cart.CartId) {
          setCart((prevCart) => ({
            ...prevCart,
            cantidad: Number(prevCart.cantidad) - 1,
          }));
        } else
          setCartGuest((prevCartGuest) => ({
            ...prevCartGuest,
            cantidad: Number(prevCartGuest.cantidad) - 1,
          }));
      }
    } else {
      Swal.fire({
        icon: 'warning',
        title: '¡Error!',
        text: 'Ingresa a tu cuenta para agregar productos.',
        showConfirmButton: false,
        timer: 4000,
        timerProgressBar: true,
        toast: true,
        position: 'top-end',
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer);
          toast.addEventListener('mouseleave', Swal.resumeTimer);
          toast.style.marginTop = '80px';
        },
      });
    }
  };

  const userId = useSelector((state) => state.userState.userData.userId);
  //console.log(userId);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (cart.CartId && cart.cantidad > 0) {
        //Resetear Estados
        setCart({
          ProductId: id,
          CartId: cartId,
          cantidad: 0,
        });
        //Mostrar Alerta
        Swal.fire({
          icon: 'success',
          title: 'Producto agregado al carrito.',
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
          toast: true,
          position: 'top-end',
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);
            toast.style.marginTop = '80px';
          },
        });

        // Submit
        const postCartAction = await dispatch(postCart(cart)).unwrap();

        //*  Update Cart Number
        if (postCartAction) {
          const getUserCartNumberAction = await dispatch(
            getUserCartNumber({ userId, dispatch })
          );

          if (
            getUserCartNumberAction.type === getUserCartNumber.fulfilled.type
          ) {
            const updatedCartNumber = getUserCartNumberAction.payload;
            dispatch(setProductNumber(updatedCartNumber));
          }
        }
      } else if (!user) {
        Swal.fire({
          icon: 'warning',
          title: '¡Error!',
          text: 'Ingresa a tu cuenta para agregar productos.',
          showConfirmButton: false,
          timer: 4000,
          timerProgressBar: true,
          toast: true,
          position: 'top-end',
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);
            toast.style.marginTop = '80px';
          },
        });
      } else if (cartGuest.cantidad > 0) {
        Swal.fire({
          icon: 'warning',
          title: 'Error',
          text: 'Lo sentimos, inténtalo de nuevo.',
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
          toast: true,
          position: 'top-end',
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);
            toast.style.marginTop = '80px';
          },
        });
      }
    } catch (error) {
      console.error('Error en handleSubmit:', error);
    }
  };

  //*Animation - Fix Boton Carrito:

  const containerVariants = {
    initial: {
      opacity: 0,
    },
    animateInstant: {
      opacity: 1,
    },
    animateFadeIn: {
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
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
    <div className='flex w-[260px] h-[480px] my-2 mx-6 transition duration-100 transform hover:scale-105 hover:cursor-pointer'>
      <div className='shadow-md border bg-teesaWhite border-gray-400 rounded-md flex flex-col h-full'>
        <div className='h-full'>
          <NavLink to={`/home/${id}`}>
            <img
              className='w-[290px] h-[260px] object-fill rounded-lg'
              src={imagenes[0]}
              alt='x'
            />
          </NavLink>
          <div className='flex flex-col h-fit p-5 bg-white'>
            <NavLink to={`/home/${id}`}>
              <p className='text-[15px] m-0 font-medium'>
                {tipo} | {categoria} {marca}
              </p>
              <h2 className='h-[85px] text-[18px] mb-1 text-black font-light'>
                {nombreN} <br />{' '}
                <span>
                  <p
                    className='text-[14px] m-0 font-medium uppercase
                  '
                  >
                    ref: {refe}
                  </p>
                </span>
              </h2>

              <h4 className='text-black text-[15px] font-bold'>
                {`$${precio.toLocaleString('es-ES', options)} COP`}
              </h4>
            </NavLink>
            <form onSubmit={(e) => handleSubmit(e)}>
              <motion.div
                className='flex items-center justify-start mt-2 gap-[5px]'
                variants={containerVariants}
                initial={user ? 'animateInstant' : 'initial'}
                animate={
                  loadingUser
                    ? 'initial'
                    : user
                    ? 'animateFadeIn'
                    : 'animateInstant'
                }
              >
                <motion.button
                  type='button'
                  id='decrement'
                  onClick={handleDecrement}
                  className={`px-[10px] py-1 border rounded-md border-gray-600 text md ${
                    loadingUser ? 'bg-red-500' : ''
                  }`}
                  style={{
                    opacity: loadingUser ? 0 : 1,
                  }}
                >
                  -
                </motion.button>
                <span
                  id='quantity'
                  className='px-[4px] py-1 rounded-md border-gray-600 text md'
                >
                  {cart.CartId ? cart.cantidad : cartGuest.cantidad}
                </span>
                <motion.button
                  type='button'
                  id='increment'
                  onClick={handleIncrement}
                  className={`px-2 py-1 border rounded-md border-gray-600 text-md ${
                    loadingUser ? 'bg-red-500' : ''
                  }`}
                  style={{
                    opacity: loadingUser ? 0 : 1,
                  }}
                >
                  +
                </motion.button>
                <motion.button
                  type='submit'
                  className={`px-[10px] py-1 border rounded-md border-gray-600 text md font-bold bg-green-400 hover:bg-green-500`}
                >
                  Agregar
                  <i className='fa-solid fa-cart-shopping  ml-1'></i>
                </motion.button>
              </motion.div>
              <h6 className='hidden'>{id}</h6>
              <h6 className='hidden'>{cart.CartId}</h6>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
