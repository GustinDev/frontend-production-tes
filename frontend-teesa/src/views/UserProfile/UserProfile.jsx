import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { putUser } from '../../features/reduxReducer/userSlice';
import {
  getProducts,
  fetchUserById,
} from '../../features/reduxReducer/userSlice';
import 'boxicons/css/boxicons.min.css';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const UserProfile = () => {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userState);
  const userProducts = useSelector((state) => state.userState.userProducts);
  const put = useSelector((state) => state.userState.putState);

  const [editing, setEditing] = useState(false);

  const {
    user,
    userData: {
      userId,
      userName,
      userEmail,
      userNit,
      userAddress,
      userPhone,
      userType,
      userDetail,
      userCity,
    } = {},
  } = userData;

  console.log(userData);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    trigger,
    setValue,
    // getValues,
  } = useForm();

  //*Entrar al User Page

  useEffect(() => {
    if (!user) {
      const redirectTimer = setTimeout(() => {
        nav('/login');
      }, 3000);

      return () => clearTimeout(redirectTimer);
    }
  }, [user, nav]);

  //*Traer userData con el userDetail.

  const userDataId = useSelector((state) => state.userState.userData.userId);

  useEffect(() => {
    if (userDataId) {
      dispatch(fetchUserById(userDataId));
    }
  }, [dispatch, userData.userData, userDataId, reset]);

  const onClose = () => {
    Swal.fire({
      title: 'Advertencia',
      text: '¿Estás seguro de que quieres cancelar los cambios?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#192C8C',
      cancelButtonColor: '#FF0000',
      confirmButtonText: 'Si',
      cancelButtonText: 'No, seguir editando',
    }).then((result) => {
      if (result.isConfirmed) {
        setEditing(false);
      }
    });
  };

  useEffect(() => {
    setValue('userName', userName);
    setValue('userEmail', userEmail);
    setValue('userNit', userNit);
    setValue('userAddress', userAddress);
    setValue('userPhone', userPhone);
    setValue('userType', userType);
    setValue('userCity', userCity);
    setValue('userDetail', userDetail);
  }, [
    setValue,
    userName,
    userEmail,
    userNit,
    userAddress,
    userPhone,
    userType,
    userCity,
    userDetail,
  ]);

  const handleBlur = (fieldName) => {
    trigger(fieldName);
  };

  const onSubmit = async (data) => {
    try {
      const payload = {
        userNit: data.userNit,
        userName: data.userName,
        userPhone: data.userPhone,
        userAddress: data.userAddress,
        userCity: data.userCity,
        userDetail: data.userDetail,
        userEmail,
        userType,
        userId,
      };
      console.log(payload);
      Swal.fire({
        title: 'Confirmación',
        html: `
          ¿Estás seguro de cambiar los datos?<br/>
          <strong>Nombre:</strong> ${data.userName}<br/>
          <strong>NIT/Cédula:</strong> ${data.userNit}<br/>
          <strong>Teléfono:</strong> ${data.userPhone}<br/>
          <strong>Ciudad:</strong> ${data.userCity}<br/>
          <strong>Dirección:</strong> ${data.userAddress}<br/>
          <strong>Detalle:</strong> ${data.userDetail}
        `,
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#192C8C',
        cancelButtonColor: '#FF0000',
        confirmButtonText: 'Sí',
        cancelButtonText: 'No',
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(putUser(payload));
          setEditing(false);
        }
      });
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  useEffect(() => {
    reset({
      userName,
      userEmail,
      userNit,
      userAddress,
      userPhone,
      userType,
      userCity,
      userDetail,
    });
  }, [
    userData,
    userName,
    userEmail,
    userNit,
    userAddress,
    userPhone,
    userType,
    userCity,
    userDetail,
    reset,
  ]);

  useEffect(() => {
    if (userId) {
      dispatch(getProducts(userId));
    }
  }, [dispatch, userId]);

  console.log(put);
  if (put === 'success') {
    nav(0);
  }

  return (
    <div className='allContainer bg-gray-100 flex xl:flex-row lg:flex-row md:flex-row sm-flex-col xs:flex-col justify-center items-start gap-5 w-full min-h-screen  pt-5 pb-10'>
      {/* info section */}
      <motion.section
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className='bg-gray-100 border-2 border-teesaBlueLight rounded-lg flex flex-col justify-center items-center  xl:w-[30em] lg:w-[30em] md:w-[18em]  gap-3  mx-auto w-11/12'
      >
        {editing ? (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className='rounded-lg flex flex-col justify-center items-center h-auto gap-2 w-3/4 '
          >
            <h1 className='font-bold text-black text-3xl mt-4'>
              Editar tus datos:
            </h1>
            <label className='flex flex-col justify-center align-center items-center w-full'>
              <div className='w-full'>
                <p className='font-bold'>Nombre</p>
              </div>
              <input
                {...register('userName', {
                  required: 'Este campo es obligatorio',
                  pattern: {
                    value: /^[a-zA-Z\s]+$/,
                    message: 'Solo se aceptan letras y espacios',
                  },
                })}
                className='border-2 border-black p-1 rounded-lg w-full'
                onBlur={() => handleBlur('userName')}
                placeholder='Nombre'
              />
              {errors.userName ? (
                <div className='w-full text-red-500'>
                  {errors.userName.message}
                </div>
              ) : (
                <div className='h-[24px]'></div>
              )}
            </label>

            <label className='flex flex-col justify-center align-center items-center w-full'>
              <div className='w-full'>
                <p className='font-bold'>Cédula / Nit</p>
              </div>
              <input
                {...register('userNit', {
                  required: 'Este campo es obligatorio',
                  pattern: {
                    value: /^[0-9]+$/,
                    message: 'Solo se aceptan números',
                  },
                })}
                className='border-2 border-black p-1 rounded-lg w-full'
                onBlur={() => handleBlur('userNit')}
                placeholder='Cédula / Nit'
              />
              {errors.userNit ? (
                <div className='w-full'>
                  <span className='text-red-500'>{errors.userNit.message}</span>
                </div>
              ) : (
                <div className='h-[24px]'></div>
              )}
            </label>

            <label className='flex flex-col justify-center align-center items-center w-full'>
              <div className='w-full'>
                <p className='font-bold'>Celular:</p>
              </div>
              <input
                {...register('userPhone', {
                  required: 'Este campo es obligatorio',
                  pattern: {
                    value: /^[0-9\s+]{0,14}$/,
                    message: 'Usa números, espacios y el "+"',
                  },
                })}
                className='border-2 border-black p-1 rounded-lg w-full'
                onBlur={() => handleBlur('userPhone')}
                placeholder='Número de teléfono'
              />

              {errors.userPhone ? (
                <div className='w-full text-red-500'>
                  {errors.userPhone.message}
                </div>
              ) : (
                <div className='h-[24px]'></div>
              )}
            </label>

            <label className='flex flex-col justify-center align-center items-center w-full'>
              <div className='w-full'>
                <p className='font-bold'>Ciudad:</p>
              </div>
              <input
                {...register('userCity', {
                  required: 'Este campo es obligatorio',
                })}
                className='border-2 border-black p-1 rounded-lg w-full'
                onBlur={() => handleBlur('userCity')}
                placeholder='Ciudad'
              />
              {errors.userCity ? (
                <div className='w-full text-red-500 text-sm'>
                  {errors.userCity.message}
                </div>
              ) : (
                <div className='h-[20px]'></div>
              )}
            </label>

            <label className='flex flex-col justify-center align-center items-center w-full'>
              <div className='w-full'>
                <p className='font-bold'>Dirección:</p>
              </div>
              <input
                {...register('userAddress', {
                  required: 'Este campo es obligatorio',
                })}
                className='border-2 border-black p-1 rounded-lg w-full'
                onBlur={() => handleBlur('userAddress')}
                placeholder='Dirección'
              />
              {errors.userAddress ? (
                <div className='w-full text-red-500'>
                  {errors.userAddress.message}
                </div>
              ) : (
                <div className='h-[24px]'></div>
              )}
            </label>

            <label className='flex flex-col justify-center align-center items-center w-full'>
              <div className='w-full'>
                <p className='font-bold'>
                  Detalles Extra de Dirección (Opcional):
                </p>
              </div>
              <input
                {...register('userDetail', {})}
                className='border-2 border-black p-1 rounded-lg w-full'
                onBlur={() => handleBlur('userDetail')}
                placeholder='Detalle'
              />

              <div className='h-[20px]'></div>
            </label>

            <div className='flex flex-row justify-center items-center gap-[15%] text-lg text-black mb-[3%]'>
              <button
                type='submit'
                className='bg-teesaBlueLight rounded-xl p-3 hover:bg-green-600 font-bold text-white'
              >
                Guardar
              </button>
              <label
                onClick={onClose}
                className='cursor-pointer bg-red-700 rounded-xl p-3 font-bold hover:bg-red-800 text-white'
              >
                Cancelar
              </label>
            </div>
          </form>
        ) : (
          <div className='px-5 py-3 w-full h-auto'>
            <div className='flex justify-end items-center gap-2 '>
              <button onClick={() => setEditing(true)}>
                <i
                  className='bx bx-pencil text-black hover:text-slate-600 '
                  style={{ fontSize: '22px' }}
                ></i>
              </button>
            </div>
            <div className='flex flex-row gap-10 justify center align-middle items-center mt-[3%] w-full'>
              <div className=''>
                <i
                  className='bx bxs-user ml-5 flex transition duration-300 ease-in-out transform text-black'
                  style={{ fontSize: '4em' }}
                ></i>
              </div>

              <div className='flex flex-col gap-1 text-black'>
                <div className='flex flex-row'>
                  <h1 className='font-bold xl:text-3xl lg:text-3xl md:text-2xl sm:text-xl xs:text-xl'>
                    {userName}
                  </h1>
                </div>
              </div>
            </div>

            <div className='w-full border-t-4 border-teesaBlueLight px-5 mt-4 rounded-xl'></div>
            <div className='flex flex-col justify-start items-start gap-5 text-black xl:text-xl lg:text-xl md:text-xl sm:text-lg xs:text-md pb-[5%] w-full pt-4 '>
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
        )}
      </motion.section>
      {/* Products section */}

      <motion.section
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className='flex flex-col items-center mb-[5%] bg-gray-100 border-2 border-teesaBlueLight overflow-y-scroll rounded-lg xl:w-[55%] h-[80%] mx-5'
      >
        <h1 className='font-bold text-black mt-[2%] text-4xl'>Compras</h1>
        <article className='w-[95%] '>
          {userProducts && userProducts.length > 0 ? (
            userProducts.map((product) => (
              <Link
                to={`/home/${product.ProductId}`}
                key={product.id}
              >
                <section className='bg-gray-200 w-full mx-2 my-4 h-[30] rounded-xl p-5'>
                  <div className='flex flex-row items-center space-x-4'>
                    <img
                      src={product.Product.imagenes[0]}
                      alt={product.Product.nombre}
                      className='w-16 hover:transform hover:scale-105 h-16 ml-[1%]'
                    />

                    <div>
                      <h3 className='text-2xl font-bold text-teesaBlueDark'>
                        {product.Product.nombre
                          .split(' ')
                          .map(
                            (word) =>
                              word.charAt(0).toUpperCase() +
                              word.slice(1).toLowerCase()
                          )
                          .join(' ')}
                      </h3>
                      <section>
                        <div className='grid grid-cols-1 md:grid-cols-2 md:gap-4'>
                          <div className='col-span-1'>
                            <p className='text-teesaGreen'>{product.estado}</p>
                            <p>Cantidad: {product.cantidad}</p>
                          </div>
                          <div className=' flex flex-col justify-between'>
                            <div>
                              <p>Precio: {product.precio}</p>
                            </div>
                            <div>
                              <p>
                                Fecha de compra:{' '}
                                {new Date(
                                  product.fechaDeCompra
                                ).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                        </div>
                      </section>
                    </div>
                  </div>
                </section>
              </Link>
            ))
          ) : (
            <div className='flex flex-col items-center justify-row mt-2'>
              <p className='text-black mb-4'>
                Aún no has realizado compras.{' '}
                <span>
                  <Link
                    to='/home'
                    className='text-teesaBlueDark  font-bold'
                  >
                    ¡Vamos a comprar!
                  </Link>
                </span>
              </p>
            </div>
          )}
        </article>
      </motion.section>
    </div>
  );
};

export default UserProfile;
