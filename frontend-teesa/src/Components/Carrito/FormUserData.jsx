//import { useNavigate, useParams } from 'react-router-dom';
import {
  fetchUserById,
  //fetchUserById,
  putUser,
} from '../../features/reduxReducer/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const FormUserData = () => {
  //   const nav = useNavigate();
  const dispatch = useDispatch();

  //   const { id } = useParams();
  const userData = useSelector((state) => state.userState);
  console.log(userData);
  const put = useSelector((state) => state.userState.putState);

  const {
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
    },
  } = userData;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    trigger,
    setValue,
    // getValues,
  } = useForm();

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

      await dispatch(putUser(payload));
      reset({
        userName: '',
        userEmail: '',
        userNit: '',
        userAddress: '',
        userPhone: '',
        userType: '',
        userCity: '',
        userDetail: '',
      });
      Swal.fire({
        icon: 'success',
        title: 'Tus datos fueron confirmados con éxito',
        //text: 'Tus datos fueron confirmados con éxito',
        confirmButtonText: 'Aceptar',
      }).then(() => {
        navigate(`/carrito/summary/${userId}`);
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

  const userDataId = useSelector((state) => state.userState.userData.userId);

  useEffect(() => {
    if (userDataId) {
      dispatch(fetchUserById(userDataId));
    }
  }, [dispatch, userData.userData, userDataId, reset]);

  let navigate = useNavigate();

  // console.log(put);

  //Button Confirm:
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // const handleConfirm = () => {
  //   if (put === 'success') {
  //     Swal.fire({
  //       icon: 'success',
  //       title: 'Tus datos fueron confirmados con éxito',
  //       text: 'Tus datos fueron confirmados con éxito',
  //       confirmButtonText: 'Aceptar',
  //     }).then(() => {
  //       navigate(`/carrito/summary/${userId}`);
  //     });
  //   }
  // };

  const handleGoBack = () => {
    navigate(-1);
  };

  //Si el carrito tiene equipos, mostrar un alert que diga que un asesor se comunicará pronto.
  //Si solo tiene repuestos, pasar a mercado pago.

  return (
    <div className='h-screen w-full flex justify-center items-center flex-col 2xl:-mt-40'>
      <div className='w-5/12 mb-4'>
        <button
          onClick={handleGoBack}
          className='bg-blue-600 rounded-md text-white hover:bg-blue-700 p-2  mt-60 '
        >
          Volver
        </button>
      </div>
      <div className='w-5/12 border-2 border-teesaBlueDark p-5 rounded-2xl flex flex-col justify-between'>
        <div>
          <h1 className='text-center font-bold text-3xl '>Datos Personales</h1>
          <h2 className='mt-2'>
            Por favor, completa o actualiza tu información para proceder con la
            compra. Recuerda que usaremos estos datos para registrar y enviar tu
            producto.
          </h2>
          <div className='form w-full h-auto mt-5 '>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className='rounded-lg flex flex-col justify-center items-center  gap-2 mx-auto '
            >
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
                  <div className='w-full text-red-500 text-sm'>
                    {errors.userName.message}
                  </div>
                ) : (
                  <div className='h-[20px]'></div>
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
                    <span className='text-red-500 text-sm'>
                      {errors.userNit.message}
                    </span>
                  </div>
                ) : (
                  <div className='h-[20px]'></div>
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
                      message: 'Usa números, espacios y "+"',
                    },
                  })}
                  className='border-2 border-black p-1 rounded-lg w-full'
                  onBlur={() => handleBlur('userPhone')}
                  placeholder='Número de teléfono'
                />

                {errors.userPhone ? (
                  <div className='w-full text-red-500 text-sm'>
                    {errors.userPhone.message}
                  </div>
                ) : (
                  <div className='h-[20px]'></div>
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
                  <div className='w-full text-red-500 text-sm'>
                    {errors.userAddress.message}
                  </div>
                ) : (
                  <div className='h-[20px]'></div>
                )}
              </label>

              <label className='flex flex-col justify-center align-center items-center w-full'>
                <div className='w-full'>
                  <p className='font-bold'>
                    Detalles de Extra de Dirección (Opcional):
                  </p>
                </div>
                <input
                  {...register('userDetail')}
                  className='border-2 border-black p-1 rounded-lg w-full'
                  onBlur={() => handleBlur('userDetail')}
                  placeholder='Detalle'
                />

                <div className='h-[20px]'></div>
              </label>

              <div className='flex flex-row justify-end items-center gap-[15%] text-lg text-black mb-5 w-full'>
                <div className='w-full flex justify-end '>
                  <button
                    type='submit'
                    className='text-center font-bold text-lg text-white py-2 px-4 rounded-xl bg-teesaBlueLight hover:bg-teesaBlueDark'
                  >
                    {isLoading
                      ? 'Cargando...'
                      : put === null
                      ? 'Confirmar Información'
                      : 'Confirmar Información'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormUserData;
