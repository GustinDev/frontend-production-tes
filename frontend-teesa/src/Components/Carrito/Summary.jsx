import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchUserById } from '../../features/reduxReducer/userSlice';
import { getCart, getUser } from '../../features/reduxReducer/carritoSlice';
import CarritoSummary from './CarritoSummary';
import loadingGif from '../../assets/icon/Loading.gif';
import Swal from 'sweetalert2';
import { postLinkMercado } from '../../features/reduxReducer/mercadoSlice';
import { motion } from 'framer-motion';

const Summary = () => {
  //Button Back
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1);
  };

  //*User
  const userData = useSelector((state) => state.userState);
  const {
    //user,
    userData: {
      userName,
      userEmail,
      userNit,
      userAddress,
      userPhone,
      userDetail,
      userCity,
    } = {},
  } = userData;

  const dispatch = useDispatch();

  const userDataId = useSelector((state) => state.userState.userData.userId);

  useEffect(() => {
    if (userDataId) {
      dispatch(fetchUserById(userDataId));
    }
  }, [dispatch, userDataId]);

  //*Products

  function calculateTotal(cartProducts) {
    let total = 0;
    for (let i = 0; i < cartProducts?.length; i++) {
      total += cartProducts[i].precioTotal;
    }
    return total;
  }

  const [info, setInfo] = useState({
    items: '',
  });

  const options = {
    style: 'decimal',
    useGrouping: true,
    minimumFractionDigits: 0,
  };

  console.log(info);

  const userDataP = useSelector((state) => state.userState.userData);

  useEffect(() => {
    dispatch(getUser()).then((action) => {
      const response = action.payload;
      const cartId = response.find((user) => user.id === userDataP.userId)?.Cart
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
  }, [dispatch, userDataP.userId]);

  console.log(info?.items?.cartProducts);

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

  const handleConfirmUser = () => {
    Swal.fire({
      icon: 'success',
      title: 'Asesoria Programada',
      text: 'Un asesor se comunicará contigo pronto, te brindará atención personalizada para realizar tu compra.',
      confirmButtonText: 'Aceptar',
      confirmButtonColor: '#192C8C',
    }).then(() => {
      navigate(`/home`);
    });
  };

  //*MercadoPago Button:

  const userId = useSelector((state) => state.userState.userData.userId);

  const linkMercadoPago = useSelector(
    (state) => state.mercadoState.linkMercado
  );
  //const status = useSelector((state) => state.mercadoState.status);

  useEffect(() => {
    if (userId !== null) {
      dispatch(postLinkMercado(userId));
    }
  }, [dispatch, userId]);

  console.log(linkMercadoPago);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className='h-screen w-full flex items-center flex-col justify-start mb-10'
    >
      <div className='w-11/12  lg:w-10/12 2xl:w-8/12 mb-4'>
        <button
          onClick={handleGoBack}
          className='bg-blue-600 rounded-md text-white hover:bg-blue-700 p-2  mt-10 '
        >
          Volver
        </button>
      </div>
      <div className='w-11/12 lg:w-10/12 2xl:w-8/12 border-2 border-teesaBlueDark  p-5 rounded-2xl flex flex-col justify-between bg-white'>
        <h1 className='text-center font-bold text-3xl mb-5 '>
          Resumen de Compra
        </h1>
        {info.items ? (
          <div className='twoContainer w-full flex justify-between items-start flex-col-reverse md:flex-row'>
            <div className='product w-full md:w-6/12 lg:w-8/12 h-full'>
              <div className='w-full h-full '>
                <h1 className='block md:hidden my-2 font-bold text-lg'>
                  Productos
                </h1>
                {info?.items?.cartProducts?.map((item) => (
                  <CarritoSummary
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
                  <div className=''>
                    <h2 className='text-2xl font-bold text-black border-t-2 border-t-gray-300 pt-4'>
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
                </div>
              </div>
            </div>

            <div className='divider h-full w-[3px] bg-gray-300  rounded-lg hidden lg:flex'></div>
            <div className='user w-full bg-gray-100 md:w-5/12 lg:w-3/12 h-full px-6 rounded-lg md:-ml-10 md:shadow-lg'>
              <div className='flex flex-col justify-start items-start  text-black xl:text-xl lg:text-xl md:text-xl sm:text-lg xs:text-md pb-[5%] w-full pt-4 '>
                <h3 className='text-[16px]'>
                  <span className='font-bold'>
                    Nombre <br />
                  </span>{' '}
                  {userName == 0 ? 'N/A' : userName}
                </h3>
                <h3 className='text-[16px]'>
                  <span className='font-bold'>
                    Email <br />
                  </span>{' '}
                  {userEmail == 0 ? 'N/A' : userEmail}
                </h3>
                <h3 className='text-[16px]'>
                  <span className='font-bold'>
                    Cédula / Nit <br />
                  </span>{' '}
                  {userNit == 0 ? 'N/A' : userNit}
                </h3>
                <h3 className='text-[16px]'>
                  <span className='font-bold'>
                    Celular <br />
                  </span>{' '}
                  {userAddress == undefined ||
                  userPhone == null ||
                  userPhone == '' ||
                  userPhone == ' '
                    ? 'N/A'
                    : userPhone}
                </h3>
                <h3 className='text-[16px]'>
                  <span className='font-bold'>
                    Ciudad <br />
                  </span>{' '}
                  {userCity == undefined ||
                  userCity == null ||
                  userCity == '' ||
                  userCity == ' '
                    ? 'N/A'
                    : userCity}
                </h3>
                <h3 className='text-[16px]'>
                  <span className='font-bold'>
                    Dirección <br />
                  </span>{' '}
                  {userAddress == undefined ||
                  userAddress == null ||
                  userAddress == '' ||
                  userAddress == ' '
                    ? 'N/A'
                    : userAddress}
                </h3>
                <h3 className='text-[16px]'>
                  <span className='font-bold'>
                    Detalles de Extra de Dirección (Opcional):
                    <br />
                  </span>{' '}
                  {userDetail == undefined ||
                  userDetail == null ||
                  userDetail == '' ||
                  userDetail == ' '
                    ? 'N/A'
                    : userDetail}
                </h3>
              </div>
            </div>
          </div>
        ) : (
          <div className='flex justify-center items-center w-full '>
            <img
              className='w-1/3 mx-auto'
              src={loadingGif}
              alt='gif'
            />
          </div>
        )}
        <div className='flex flex-row justify-end items-center gap-[15%] text-lg text-black my-5 w-full'>
          <div className='w-full flex justify-end '>
            {info.items ? (
              todosRepuestos ? (
                linkMercadoPago ? (
                  <a href={linkMercadoPago}>
                    <button className='7-80 px-4 py-3 border-4 bg-blue-500  rounded-lg text-white hover:bg-blue-600 transition duration-100 transform hover:scale-105 font-bold text-lg'>
                      Comprar con MercadoPago
                    </button>
                  </a>
                ) : (
                  <button className='7-80 px-4 py-3 border-4 bg-blue-500  rounded-lg text-white hover:bg-blue-600 transition duration-100 transform hover:scale-105 font-bold text-lg'>
                    Cargando...
                  </button>
                )
              ) : (
                <button
                  onClick={handleConfirmUser}
                  type='submit'
                  className='text-center font-bold text-2xl text-white py-2 px-4 rounded-xl bg-teesaBlueLight hover:bg-teesaBlueDark'
                >
                  Confirmar Compra
                </button>
              )
            ) : null}
          </div>
        </div>
      </div>
      <div className='w-10/12 2xl:w-8/12 h-[30px]'>
        <div className='h-[80px]'></div>
      </div>
    </motion.div>
  );
};

export default Summary;
