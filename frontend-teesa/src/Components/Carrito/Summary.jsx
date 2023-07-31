import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchUserById } from '../../features/reduxReducer/userSlice';
import { getCart, getUser } from '../../features/reduxReducer/carritoSlice';
import Carrito from './Carrito';

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
    for (let i = 0; i < cartProducts.length; i++) {
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

  //! VER BUCLE INFINITO DE CART - IMPORTANTE

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

  return (
    <div className='h-screen w-full flex items-center flex-col justify-start '>
      <div className='w-10/12 mb-4'>
        <button
          onClick={handleGoBack}
          className='bg-blue-600 rounded-md text-white hover:bg-blue-700 p-2  mt-10 '
        >
          Volver
        </button>
      </div>
      <div className='w-10/12 border-2 border-teesaBlueDark  p-5 rounded-2xl flex flex-col justify-between '>
        <h1 className='text-center font-bold text-3xl mb-5 '>
          Resumen de Compra
        </h1>
        <div className='twoContainer w-full flex justify-between items-start flex-row'>
          <div className='product bg-red-300 w-5/12 h-full'>
            <h1>Products</h1>
            <div className='w-full h-full '>
              {info?.items?.cartProducts?.map((item) => (
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
                        info.items.cartProducts || info.items.cartGuestProducts
                      ).toLocaleString('es-ES', options)}{' '}
                      COP
                    </span>
                  </h2>
                </div>
              </div>
            </div>
          </div>
          <div className='divider h-full w-[3px] bg-gray-800   rounded-lg '></div>
          <div className='user bg-blue-300 w-5/12 h-full'>
            <h1>Información de Usuario:</h1>
            <div className='flex flex-col justify-start items-start gap-5 text-black xl:text-xl lg:text-xl md:text-xl sm:text-lg xs:text-md pb-[5%] w-full pt-4 '>
              <h3>
                <span className='font-bold'>Nombre:</span>{' '}
                {userName == 0 ? 'N/A' : userName}
              </h3>
              <h3>
                <span className='font-bold'>Email:</span>{' '}
                {userEmail == 0 ? 'N/A' : userEmail}
              </h3>
              <h3>
                <span className='font-bold'>Cédula / Nit:</span>{' '}
                {userNit == 0 ? 'N/A' : userNit}
              </h3>
              <h3>
                <span className='font-bold'>Celular:</span>{' '}
                {userAddress == undefined ||
                userPhone == null ||
                userPhone == '' ||
                userPhone == ' '
                  ? 'N/A'
                  : userPhone}
              </h3>
              <h3>
                <span className='font-bold'>Ciudad:</span>{' '}
                {userCity == undefined ||
                userCity == null ||
                userCity == '' ||
                userCity == ' '
                  ? 'N/A'
                  : userCity}
              </h3>
              <h3>
                <span className='font-bold'>Dirección:</span>{' '}
                {userAddress == undefined ||
                userAddress == null ||
                userAddress == '' ||
                userAddress == ' '
                  ? 'N/A'
                  : userAddress}
              </h3>
              <h3>
                <span className='font-bold'>Detalles Extra:</span>{' '}
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
        <div className='flex flex-row justify-end items-center gap-[15%] text-lg text-black my-5 w-full'>
          <div className='w-full flex justify-end '>
            <button
              type='submit'
              className='text-center font-bold text-lg text-white py-2 px-4 rounded-xl bg-teesaBlueLight'
            >
              Confirmar Compra
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Summary;
