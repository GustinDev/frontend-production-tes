import { useForm } from 'react-hook-form';
import { registerUser } from '../../features/reduxReducer/registerSlice';
import { setUser } from '../../features/reduxReducer/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import googleIcon from '../../assets/icon/Google.svg';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import jwt_decode from 'jwt-decode';
import { loginUser } from '../../features/reduxReducer/loginSlice';
import Cookies from 'universal-cookie';
import { Link } from 'react-router-dom';
//EmailJS - Mailer
import waves from '../../assets/icon/layered-waves.svg';
import { motion } from 'framer-motion';

function Register() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.registerState.loading);
  const errorMessage = useSelector((state) => state.registerState.errorMessage);
  const userData = useSelector((state) => state.userState.userData);
  const nav = useNavigate();
  console.log(loading);

  //Data del Usuario - Token.

  const [tokenValue, setTokenValue] = useState('');
  const [, setIsUserLoaded] = useState(false);

  const setUserWithTokenData = () => {
    if (tokenValue) {
      //Decodificamos el Token
      const decodedToken = jwt_decode(tokenValue);
      //Sacamos la data.
      const userId = decodedToken.sub;
      const userName = decodedToken.nombre;
      const userType = decodedToken.tipo;
      //Despachamos la action.
      dispatch(setUser({ userId, userName, userType }));
    }
  };

  const alertErrorMessage = (errorMessage) => {
    Swal.fire({
      title: 'Sucedió un error',
      text: JSON.stringify(errorMessage),
      icon: 'error',
      confirmButtonText: 'Ok.',
      confirmButtonColor: '#192C8C',
    });
  };
  useEffect(() => {
    if (errorMessage) {
      alertErrorMessage(errorMessage);
    }
  }, [errorMessage]);

  const alertSucess = () => {
    Swal.fire({
      title: '¡Felicidades!',
      text: 'Se ha creado tu cuenta con exito',
      icon: 'success',
      confirmButtonText: 'Ok.',
      confirmButtonColor: '#192C8C',
    });
  };

  //Ejecutar el Reducer Post.
  const onSubmit = async (data) => {
    const resultAction = await dispatch(registerUser(data));
    console.log(data);
    if (resultAction.error) {
      const errorMessage = resultAction.error.response.data.message;
      alertErrorMessage(errorMessage);
    } else {
      const { correo, contrasena } = data; // Obtener correo y contraseña del formulario de registro
      const loginData = { correo, contrasena };
      console.log(loginData);
      const loginAction = await dispatch(loginUser(loginData)); // Hacer el inicio de sesión automático

      if (loginAction.error) {
        const errorMessage = loginAction.error.response.data.message;
        alertErrorMessage(errorMessage);
      } else {
        const ntoken = loginAction.payload;
        setTokenValue(ntoken);
        await setUserWithTokenData();
        setIsUserLoaded(true);
        alertSucess();
        const cookies = new Cookies();
        const tokenExists = cookies.get('token');
        if (tokenExists) {
          nav('/home');
        }
      }
    }
    //EmailJS - Mailer
    // const user_email = data.correo;
    // const user_name = data.nombre;
    // emailjs
    //   .send(
    //     'service_2rp9duo',
    //     'template_ogrchsj',
    //     { user_email, user_name },
    //     'W5KJUGxF4wBdmUA3v'
    //   )
    //   .then((result) => {
    //     console.log(result.text);
    //   })
    //   .catch((error) => {
    //     console.log(error.text);
    //   });
    reset();
  };

  //Llamar a la  función Token Data.

  useEffect(() => {
    if (tokenValue) {
      setUserWithTokenData();
    }
  }, [tokenValue]);

  useEffect(() => {
    if (userData) {
      //console.log(`User Data: ${JSON.stringify(userData)}`);
    }
  }, [userData]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    trigger,
    watch,
  } = useForm();

  const handleBlur = (fieldName) => {
    trigger(fieldName);
  };

  const contrasena = watch('contrasena');

  return (
    <div
      className='relative bg-cover w-full h-screen flex flex-row justify-center align-center items-center overflow-hidden m-auto'
      style={{ backgroundImage: `url(${waves})` }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className='w-full md:w-2/4 lg:w-1/4 2xl:w-[25%]  bg-teesaBlueDark rounded-2xl flex flex-col justify-center align-center items-center h-auto mb-[12%] lg:mt-[10%] border-green-700 border-[2px] mx-5'
      >
        <div className='flex flex-col justify-center align-center items-center  w-full px-7 py-1'>
          <div className='w-full mb-5'>
            <h1 className='text-3xl md:text-4xl font-bold  xl:text-4xl lg:text-4xl text-teesaGrey  mt-[5%] '>
              Regístrate
            </h1>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className='flex flex-col justify-center align-center items-center gap-1 w-full'
          >
            <label className='flex flex-col justify-center align-center items-center w-full'>
              <input
                type='text'
                name='nombre'
                placeholder=' Nombre'
                className='bg-white text-black rounded-md  w-full px-1 py-2'
                {...register('nombre', {
                  required: 'Este campo es obligatorio',
                  pattern: {
                    value: /^[a-zA-Z\s]+$/,
                    message: 'Solo se aceptan letras y espacios',
                  },
                })}
                onBlur={() => handleBlur('nombre')}
              />
              {errors.nombre ? (
                <span className='text-red-500 w-full'>
                  {errors.nombre.message}
                </span>
              ) : (
                <div className='h-[24px]'></div>
              )}
            </label>
            <label className='flex flex-col justify-center align-center items-center gap-1 w-full'>
              <input
                type='text'
                name='correo'
                placeholder=' Email'
                className='bg-white text-black  rounded-md  w-full px-1 py-2'
                {...register('correo', {
                  required: 'Este campo es obligatorio',
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: 'Ingresa un email válido',
                  },
                })}
                onBlur={() => handleBlur('correo')}
              />
              {errors.correo ? (
                <span className='text-red-500 w-full'>
                  {errors.correo.message}
                </span>
              ) : (
                <div className='h-[24px]'></div>
              )}
            </label>

            <label className='flex flex-col justify-center align-center items-center gap-1 w-full'>
              <input
                type='password'
                name='contrasena'
                placeholder=' Contraseña'
                className='bg-white text-black rounded-md  w-full px-1 py-2'
                {...register('contrasena', {
                  required: 'Este campo es obligatorio',
                  pattern: {
                    value:
                      /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&()_+\-=[\]{};':"\\|,.<>/?]).{6,20}$/,
                    message: 'Usa una mayúscula, número y símbolo',
                  },
                })}
                onBlur={() => handleBlur('contrasena')}
              />
              {errors.contrasena ? (
                <span className='text-red-500 w-full'>
                  {errors.contrasena.message}
                </span>
              ) : (
                <div className='h-[24px]'></div>
              )}
            </label>
            <label className='flex flex-col justify-center align-center items-center gap-1 w-full'>
              <input
                type='password'
                name='confirmarContrasena'
                placeholder=' Confirmar contraseña'
                className='bg-white text-black rounded-md w-full px-1 py-2'
                {...register('confirmarContrasena', {
                  required: 'Este campo es obligatorio',
                  validate: (value) =>
                    value === contrasena || 'Las contraseñas no coinciden',
                })}
                onBlur={() => handleBlur('confirmarContrasena')}
              />
              {errors.confirmarContrasena ? (
                <span className='text-red-500 w-full'>
                  {errors.confirmarContrasena.message}
                </span>
              ) : (
                <div className='h-[24px]'></div>
              )}
            </label>
            <button className='bg-teesaGreen font-bold h-[2em] w-full hover:bg-green-600 hover:transform hover:scale-105 rounded-md'>
              INGRESAR
            </button>
            <p className='w-full text-white'>
              ¿Ya tienes cuenta?{' '}
              <Link to='/login'>
                <span className='text-green-400 hover:cursor-pointer hover:text-green-200 font-bold'>
                  Ingresa
                </span>
              </Link>
            </p>
            <div className='w-full border-t-4 border-green-400 my-2'></div>
          </form>
          <div className='flex justify-center items-center align-center text-center mt-2 w-full'>
            <a
              href='http://localhost:3001/google/signup'
              className='w-full'
            >
              <button
                className='flex justify-cetner items-center mb-[24px] w-full h-[2.5em] justify-center rounded  bg-teesaWhite text-md font-medium uppercase leading-normal text-black shadow-lg border-2 border-black hover:bg-gray-300 hover:transform hover:scale-105 text-md md:text-lg'
                type='submit'
              >
                <img
                  src={googleIcon}
                  className=' w-22  h-5 mx-3 my-auto'
                />{' '}
                Regístrate con Google
              </button>
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default Register;
