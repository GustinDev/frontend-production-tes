import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUser, getCart } from '../../features/reduxReducer/carritoSlice';
// import { getCartGuestProducts } from '../../features/reduxReducer/cartGuestSlice';
import { Carrito } from '../Carrito/Carrito';
import { Link } from 'react-router-dom';
import { postLinkMercado } from '../../features/reduxReducer/mercadoSlice';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import loadingGif from '../../assets/icon/Loading.gif';
import { motion } from 'framer-motion';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import MessageIcon from '@mui/icons-material/Message';
import SpeedIcon from '@mui/icons-material/Speed';
import PaidIcon from '@mui/icons-material/Paid';

export const Cart = () => {
  //*Validar User:
  const navigate = useNavigate();

  const alertGoodbye = () => {
    Swal.fire({
      title: '¡Un momento!',
      text: 'Tienes que logearte para ingresar al carrito.',
      icon: 'info',
      confirmButtonText: 'Aceptar',
      confirmButtonColor: '#192C8C',
    }).then(() => {
      navigate('/login');
    });
  };

  const user = useSelector((state) => state.userState.user);
  //console.log(user);
  const [waiting, setWaiting] = useState(true);

  useEffect(() => {
    if (user === null) {
      const timeout = setTimeout(() => {
        if (waiting) {
          alertGoodbye();
        }
      }, 2000);

      return () => {
        clearTimeout(timeout);
      };
    } else {
      setWaiting(false);
    }
  }, [user, waiting]);

  useEffect(() => {
    if (user !== null && !waiting) {
      // Validar los datos después de que se hayan obtenido
      if (user === false) {
        alertGoodbye();
      }
    }
  }, [user, waiting]);

  //Andres

  const options = {
    style: 'decimal',
    useGrouping: true,
    minimumFractionDigits: 0,
  };

  function calculateTotal(cartProducts) {
    let total = 0;
    for (let i = 0; i < cartProducts.length; i++) {
      total += cartProducts[i].precioTotal;
    }
    return total;
  }

  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userState.userData);

  // const carrito = useSelector((state) => state.cart);

  // const userUUID = props.userId;
  // console.log(userUUID);

  // const [cart, setCart] = useState({
  //   CartId: cartId,
  // });
  const [info, setInfo] = useState({
    items: '',
  });

  useEffect(() => {
    dispatch(getUser()).then((action) => {
      const response = action.payload;

      const cartId = response.find((user) => user.id === userData.userId)?.Cart
        .id;

      if (cartId) {
        dispatch(getCart(cartId)).then((action) => {
          const response = action.payload;

          setInfo((prevInfo) => ({
            ...prevInfo,
            items: response,
          }));
        });
      }
    });
  }, [dispatch, userData, info]);
  //Cambio: [dispatch, userData, info]
  //console.log(info.items);

  //*MercadoPago Button:

  const userId = useSelector((state) => state.userState.userData.userId);

  const linkMercadoPago = useSelector(
    (state) => state.mercadoState.linkMercado
  );
  const status = useSelector((state) => state.mercadoState.status);

  useEffect(() => {
    if (userId !== null) {
      dispatch(postLinkMercado(userId));
    }
  }, [dispatch, userId]);

  //Respuestos - Equipo
  const [todosRepuestos, setTodosRepuestos] = useState(null);

  useEffect(() => {
    let encontramosEquipo = false;

    info?.items?.cartProducts?.forEach((element) => {
      if (element.Product.tipo === 'Equipo') {
        encontramosEquipo = true;
      }
    });

    setTodosRepuestos(!encontramosEquipo);
  }, [info.items]);

  // COMPRAR - BUTTON (FORM USER DATA):

  let handleBuyButton = () => {
    navigate(`/carrito/userform/${userId}`);
  };

  console.log(info.items.cartProducts);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className='flex flex-col items-center justify-start mt-10 h-screen '
    >
      <h2 className='text-white font-bold   xl:text-5xl lg:text-5xl md:text-4xl sm:text-4xl  bg-teesaBlueDark py-5 px-10 rounded-xl'>
        Carrito de Productos
      </h2>
      <main>
        <div className='max-w-5xl p-8 bg-white shadow-lg rounded-lg border-2 border-teesaBlueDark mt-5 mb-10'>
          {status === 'pending' ? (
            <div className='flex justify-center items-center w-[950px] h-[800px]'>
              <img
                className='w-1/3 mx-auto'
                src={loadingGif}
                alt='gif'
              />
            </div>
          ) : (
            <div className='allContainer w-full h-full '>
              {info.items ? (
                info.items.cartProducts?.length > 0 ? (
                  todosRepuestos ? (
                    // REPUESTOS
                    <div className='twoContainer flex flex-row w-full h-full'>
                      <div className='w-8/12 h-full '>
                        {info.items.cartProducts.map((item) => (
                          <Carrito
                            key={item.id}
                            id={item.id}
                            cantidad={item.cantidad}
                            precioTotal={item.precioTotal}
                            productId={item.ProductId}
                            nombre={item.Product?.nombre}
                            precio={item.Product?.precio}
                            imagen={item.Product?.imagenes}
                            tipo={item.Product?.tipo}
                            marca={item.Product?.marca}
                            categoria={item.Product?.categoria}
                          />
                        ))}
                        <div>
                          <div className='mt-8'>
                            <h2 className='text-2xl font-bold text-gray-800'>
                              Total:{' '}
                              <span className='text-2xl font-bold text-black'>
                                ${' '}
                                {calculateTotal(
                                  info.items.cartProducts ||
                                    info.items.cartGuestProducts
                                ).toLocaleString('es-ES', options)}{' '}
                                COP
                              </span>
                            </h2>
                          </div>
                          <div className='flex justify-center mt-8'>
                            <Link
                              to='/home'
                              className='7-80 px-4 py-3 border-4 bg-blue-900 rounded-lg text-white hover:bg-blue-900 transition duration-100 transform hover:scale-105 mr-4 font-bold text-lg'
                            >
                              Ver más productos
                            </Link>

                            <a href={linkMercadoPago}>
                              <button className='7-80 px-4 py-3 border-4 bg-blue-500  rounded-lg text-white hover:bg-blue-600 transition duration-100 transform hover:scale-105 font-bold text-lg'>
                                Comprar con MercadoPago
                              </button>
                            </a>
                          </div>
                        </div>
                      </div>
                      <div className='divider h-11/12 w-[8px] bg-gray-600 ml-12 mr-8 rounded-lg'></div>
                      <div className=' w-4/12 h-11/12   rounded-lg p-5 flex flex-col gap-6 text-center'>
                        <div>
                          <LocalShippingIcon
                            style={{ fontSize: '60px' }}
                            className=' text-blue-800'
                          />
                          <h2 className='text-md'>
                            ¡Realizamos envíos de respuestos a toda Colombia!
                          </h2>
                        </div>
                        <div>
                          <MessageIcon
                            style={{ fontSize: '60px' }}
                            className=' text-blue-800'
                          />
                          <h2 className='text-md'>
                            Te mantendremos informado del estado de tú envío.
                          </h2>
                        </div>
                        <div>
                          <SpeedIcon
                            style={{ fontSize: '60px' }}
                            className=' text-blue-800'
                          />
                          <h2 className='text-md'>
                            Enviaremos tu producto lo más rápido posible.
                          </h2>
                        </div>
                        <div>
                          <PaidIcon
                            style={{ fontSize: '60px' }}
                            className=' text-blue-800'
                          />
                          <h2 className='text-md'>
                            Pagas el envío cuando llegue el producto.
                          </h2>
                        </div>
                      </div>
                    </div>
                  ) : (
                    // EQUIPOS
                    <div className='econtainer flex flex-row w-full h-full'>
                      <div className='w-8/12 h-full '>
                        {info.items.cartProducts.map((item) => (
                          <Carrito
                            key={item.id}
                            id={item.id}
                            cantidad={item.cantidad}
                            productId={item.ProductId}
                            precioTotal={item.precioTotal}
                            nombre={item.Product?.nombre}
                            precio={item.Product?.precio}
                            imagen={item.Product?.imagenes}
                            tipo={item.Product?.tipo}
                            marca={item.Product?.marca}
                            categoria={item.Product?.categoria}
                          />
                        ))}
                        <div>
                          <div className='mt-8'>
                            <h2 className='text-2xl font-bold text-gray-800'>
                              Total:{' '}
                              <span className='text-2xl font-bold text-black'>
                                ${' '}
                                {calculateTotal(
                                  info.items.cartProducts ||
                                    info.items.cartGuestProducts
                                ).toLocaleString('es-ES', options)}{' '}
                                COP
                              </span>
                            </h2>
                          </div>
                          <div className='flex justify-center mt-8'>
                            <button
                              onClick={handleBuyButton}
                              className='7-80 px-4 py-3 border-4 bg-blue-900 rounded-lg text-white hover:bg-blue-900 transition duration-100 transform hover:scale-105 mr-4 font-bold text-lg'
                            >
                              Consulta con un asesor para adquirir el producto
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className='divider h-11/12 w-[8px] bg-gray-600 ml-12 mr-8 rounded-lg'></div>
                      <div className=' w-4/12 h-11/12   rounded-lg p-5 flex flex-col gap-6 text-center'>
                        <div className='w-full'>
                          <LocalShippingIcon
                            style={{ fontSize: '60px' }}
                            className=' text-blue-800'
                          />
                          <h1>Atención:</h1>
                          <h2 className='text-md'>
                            La compra de los equipos se realiza por medio un
                            asesor especializado.
                          </h2>
                        </div>
                        <div>
                          <MessageIcon
                            style={{ fontSize: '60px' }}
                            className=' text-blue-800'
                          />
                          <h2 className='text-md'>
                            La compra de los repuestos se realiza en línea y los
                            enviaremos a tu domicilio.
                          </h2>
                        </div>

                        <div>
                          <PaidIcon
                            style={{ fontSize: '60px' }}
                            className=' text-blue-800'
                          />
                          <h2 className='text-md'>
                            Se requiere pagar un adelanto para adquirir un
                            equipo.
                          </h2>
                        </div>
                        <div>
                          <SpeedIcon
                            style={{ fontSize: '60px' }}
                            className=' text-blue-800'
                          />
                          <h2 className='text-md'>
                            Te bridamos los equipos de mejor calidad del
                            mercado.
                          </h2>
                        </div>
                      </div>
                    </div>
                  )
                ) : (
                  <div className='flex flex-col items-center justify-center'>
                    <p className='text-2xl font-bold text-gray-800 mb-4'>
                      No hay productos en el carrito
                    </p>
                    <Link
                      to='/home'
                      className='7-80 px-4 py-3 border-4 bg-blue-800 rounded-lg text-white hover:bg-blue-900 transition duration-100 transform hover:scale-105'
                    >
                      Seguir comprando
                    </Link>
                  </div>
                )
              ) : (
                <div className='flex justify-center items-center w-[950px] h-[800px]'>
                  <img
                    className='w-1/3 mx-auto'
                    src={loadingGif}
                    alt='gif'
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </motion.div>
  );
};

export default Cart;
