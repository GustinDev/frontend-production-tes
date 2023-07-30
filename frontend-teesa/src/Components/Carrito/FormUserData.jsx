import { useNavigate, useParams } from 'react-router-dom';
import { fetchUserById, putUser } from '../../features/reduxReducer/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';

const FormUserData = () => {
  //   const nav = useNavigate();
  const dispatch = useDispatch();

  const [, setEditing] = useState(true);

  //   const { id } = useParams();
  const userData = useSelector((state) => state.userState);
  const userData1 = useSelector((state) => state.userState.userData);
  console.log(userData1);

  const {
    userData: {
      userId,
      userName,
      userEmail,
      userNit,
      userAddress,
      userPhone,
      userType,
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
  }, [
    userName,
    userEmail,
    userNit,
    userAddress,
    userPhone,
    setValue,
    userType,
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
        userEmail,
        userType,
        userId,
      };

      Swal.fire({
        title: 'Confirmación',
        html: `
          ¿Estás seguro de cambiar los datos?<br/>
          <strong>Nombre:</strong> ${data.userName}<br/>
          <strong>NIT/Cédula:</strong> ${data.userNit}<br/>
          <strong>Teléfono:</strong> ${data.userPhone}<br/>
          <strong>Dirección:</strong> ${data.userAddress}
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
          setEditing(true);
        }
      });
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  return (
    <div className='h-screen w-full flex justify-center items-center'>
      <div className='w-5/12 border-2 border-teesaBlueDark mt-20 p-5 rounded-2xl flex flex-col justify-between'>
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
                  <p className='font-bold'>Celular:</p>
                </div>
                <input
                  {...register('userPhone', {
                    pattern: {
                      value: /^[0-9\s+]{0,14}$/,
                      message:
                        'Solo se aceptan números, espacios y el símbolo +',
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
              <div className='flex flex-row justify-end items-center gap-[15%] text-lg text-black mb-5 w-full'>
                <div className='w-full flex justify-end '>
                  <button
                    type='submit'
                    className='text-center font-bold text-lg text-white py-2 px-4 rounded-xl bg-teesaBlueLight'
                  >
                    Confirmar Flecha
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
