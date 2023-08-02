import { useNavigate, NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Carrusel from '../Carrusel/Carrusel';
//Reviews
import Review from './Review';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import ReviewForm from './ReviewForm';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { getUser, postCart } from '../../features/reduxReducer/carritoSlice';
import {
  fetchReviews,
  verifyUserReview,
} from '../../features/reduxReducer/reviewSlice';
// import { v4 as uuidv4 } from 'uuid';
// import {Cart} from '../Carrito/Cart';
import Swal from 'sweetalert2';
// import { postCartGuestProducts } from '../../features/reduxReducer/cartGuestSlice';

/* eslint-disable react/prop-types */
const CardDetail = ({
  id,
  nombre,
  descripcion,
  caracteristicas,
  categoria,
  precio,
  stock,
  marca,
  estado,
  productRef,
}) => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userState.userData);

  const userAdmin = useSelector((state) => state.userState.userData.userType);
  console.log(userAdmin);

  const [cartId, setCartId] = useState('');
  const [cart, setCart] = useState({
    ProductId: id,
    CartId: cartId,
    cantidad: 0,
  });

  const [cartGuest, setCartGuest] = useState({
    ProductId: id,
    cantidad: 0,
    // userId: localStorage.getItem('guestUserId') || uuidv4(),
  });

  //Cart - Fix

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
          setLoadingUser(false); // Se establece loadingUser en false al finalizar la carga
        });
    }
  }, [dispatch, userData]);

  const handleIncrement = () => {
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
    } else {
      Swal.fire({
        icon: 'warning',
        title: '¡Error!',
        text: 'Ingresa a tu cuenta para agregar productos.',
        showConfirmButton: false,
        timer: 3000,
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
        timer: 3000,
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (cart.CartId && cart.cantidad > 0) {
      dispatch(postCart(cart));
      setCart({
        ProductId: id,
        CartId: cartId,
        cantidad: 0,
      });
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
    } else if (!user) {
      Swal.fire({
        icon: 'warning',
        title: '¡Error!',
        text: 'Ingresa a tu cuenta para agregar productos.',
        showConfirmButton: false,
        timer: 3000,
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

  console.log(cartGuest);

  //* Datos Descripción:

  const options = {
    style: 'decimal',
    useGrouping: true,
    minimumFractionDigits: 0,
  };

  function capitalizeWord(word) {
    if (!word) {
      return '';
    }
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  const estadoMayus = capitalizeWord(estado || '');

  //*Datos de las Reviews: reviewState
  //General
  const reviewState = useSelector((state) => state?.reviewState);
  let avgStars = reviewState?.reviewsData?.avgStars;
  let totalReviews = reviewState?.reviewsData?.users;
  //Reviews
  let reviews = reviewState?.reviewsData?.reviews;

  useEffect(() => {
    dispatch(fetchReviews(id));
  }, [dispatch, id]);

  // console.log(reviewState);
  // console.log(reviews, avgStars, totalReviews);

  if (avgStars === null && totalReviews === null) {
    avgStars = 0;
  }

  let newAvgStars = Math.round(avgStars);

  //*Datos Usuario
  const userId = useSelector((state) => state.userState.userData.userId);

  //*Verify User Review

  const userReviewEnabled = useSelector(
    (state) => state.reviewState.userReviewEnabled
  );

  //console.log('E', userReviewEnabled);

  useEffect(() => {
    dispatch(verifyUserReview({ userID: userId, productID: id }));
  }, [dispatch, userId, id]);
  //Si no funciona con eso, recargar la página.

  //Edit Product

  let handleEdit = () => {
    navigate(`/dashboard/editproduct/${id}`);
  };

  //Nombre:

  const [nombreN, setNombreN] = useState('');

  function capitalizeFirstLetters(str) {
    return str?.replace(/\b\w/g, (char) => char?.toUpperCase());
  }
  useEffect(() => {
    const nombreEnMayusculas = capitalizeFirstLetters(nombre);
    setNombreN(nombreEnMayusculas);
  }, [nombre]);

  return (
    <div className='w-full h-full mt-12 flex flex-col justify-center items-center bg-white p-5 lg:p-0'>
      <div className='detailContainer flex flex-col lg:flex-row w-full lg:w-3/4  rounded-xl border-2 border-gray-300  mt-6'>
        <div className='flex justify-start items-start w-5 -mt-16 '>
          <NavLink className=' justify-self-start mb-1  transition duration-300 ease-in-out transform m-2'>
            <button
              onClick={handleGoBack}
              className='bg-blue-600 rounded-md text-white hover:bg-blue-700 p-2'
            >
              Volver
            </button>
          </NavLink>
        </div>
        <div className='w-11/12 lg:w-1/2 m-4 flex items-start justify-center bg-gray-300 md:p-5 rounded-lg mt-8'>
          <Carrusel />
        </div>
        <div className='w-full lg:w-1/2  px-8 py-6'>
          <div className='text-teesaBlueDark font-bold text-lg mb-2'>
            {categoria} {marca}
          </div>
          <h2 className='text-teesaBlueDark text-3xl font-light mb-4'>
            {nombreN}
          </h2>

          <div className='flex items-center '>
            {avgStars !== null && totalReviews !== null ? (
              <div className='flex my-4 items-center '>
                <Rating
                  name='size-medium'
                  value={newAvgStars}
                  precision={1}
                  size='medium'
                  readOnly
                  emptyIcon={<StarBorderIcon style={{ color: '#192C8C' }} />}
                  icon={<StarIcon style={{ color: '#192C8C' }} />}
                />
                <span className='ml-2 text-teesaBlueDark '>{`(${totalReviews} opiniones).`}</span>
              </div>
            ) : (
              <div className=''></div>
            )}
          </div>
          <h2 className='font-bold text-xl text-gray-900 mb-4'>
            Referencia <br /> <span className=' font-normal'>{productRef}</span>
          </h2>
          <p className='text-gray-900 text-xl mb-6'>
            <span className='font-bold text-md'>Descripcion</span> <br />{' '}
            {descripcion}
          </p>
          <p className='text-gray-900 text-xl mb-6'>
            <span className='font-bold text-md'>Características</span> <br />{' '}
            {caracteristicas}
          </p>
          <div className='flex flex-col mb-6'>
            <h2 className='text-teesaBlueDark text-2xl font-bold'>{`$${
              precio ? precio.toLocaleString('es-ES', options) : ''
            } COP`}</h2>

            <h2 className='text-xl text-teesaBlueDark'>
              Stock: {stock === 0 ? 'Bajo Pedido.' : stock}
            </h2>
            <h2 className='text-teesaBlueDark text-xl'>
              Estado: {estadoMayus}.
            </h2>
          </div>
          {userAdmin == true ? (
            <button
              onClick={handleEdit}
              className='my-2 px-8 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-800'
            >
              Editar{' '}
            </button>
          ) : (
            <div></div>
          )}
          <form onSubmit={(e) => handleSubmit(e)}>
            <motion.div
              className='flex items-center justify-start mt-2 gap-[8px]'
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
                className={`px-[11px] py-1 border rounded-md border-gray-600 text-2xl ${
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
                className='px-[4px] py-1 rounded-md border-gray-600 text-2xl'
              >
                {cart.CartId ? cart.cantidad : cartGuest.cantidad}
              </span>
              <motion.button
                type='button'
                id='increment'
                onClick={handleIncrement}
                className={`px-2 py-1 border rounded-md border-gray-600 text-2xl ${
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
                className={`text-white px-[10px] py-1 border-blue-800 rounded-md border-2 text-2xl font-bold bg-blue-700`}
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
      {/* Reviews */}
      <div className='reviewsContainer w-full m-0 lg:m-4 lg:w-3/4  mt-4 border-t-2 border-blue-950'>
        {/* Review Form */}
        {userReviewEnabled && (
          <ReviewForm
            productId={id}
            userId={userId}
          />
        )}

        <h1 className='font-bold text-lg m-4'>Opiniones:</h1>
        {/* Client Reviews*/}
        {totalReviews === 0 ||
        totalReviews === null ||
        totalReviews === undefined ? (
          <h1 className=' text-lg m-4'>
            Aún no hay opiniones de este producto.
          </h1>
        ) : (
          reviews.map((review, index) => (
            <Review
              key={index}
              userName={review.User.nombre}
              userRating={review.estrellas}
              userComment={review.comentario}
              userDate={reviews.fecha}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default CardDetail;
