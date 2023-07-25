import { useForm, Controller } from 'react-hook-form';
import { createProduct } from '../../features/reduxReducer/admproductSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect, useRef } from 'react';
import { getBrands } from '../../features/reduxReducer/productSlice';
import Swal from 'sweetalert2';
import { NavLink, useNavigate } from 'react-router-dom';

const CreateProducts = () => {
  //*Validar Admin - Juan:

  const navigate = useNavigate();
  const alertGoodbye = () => {
    Swal.fire({
      title: '¡Un momento!',
      text: 'No eres admin, no puedes estar aquí.',
      icon: 'info',
      confirmButtonText: 'Aceptar',
      confirmButtonColor: '#192C8C',
    }).then(() => {
      navigate('/home');
    });
  };

  const userAdmin = useSelector((state) => state.userState.userData.userType);
  console.log('data' + userAdmin);
  const [waiting, setWaiting] = useState(true);

  useEffect(() => {
    if (userAdmin === null) {
      const timeout = setTimeout(() => {
        if (waiting) {
          alertGoodbye();
        }
      }, 3000);

      return () => {
        clearTimeout(timeout);
      };
    } else {
      setWaiting(false);
    }
  }, [userAdmin, waiting]);

  useEffect(() => {
    if (userAdmin !== null && !waiting) {
      // Validar los datos después de que se hayan obtenido
      if (userAdmin === false) {
        alertGoodbye();
      }
    }
  }, [userAdmin, waiting]);

  //*Yose

  const dispatch = useDispatch();
  // eslint-disable-next-line no-unused-vars
  const [brands, setBrands] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [selectedFile, setSelectedFile] = useState([]);
  const selectedFileRef = useRef([]);

  useEffect(() => {
    dispatch(getBrands())
      .then((response) => {
        setBrands(response.payload);
        console.log(response.payload);
      })
      .catch((error) => {
        console.error('Error fetching brands:', error);
      });
  }, [dispatch]);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
    trigger,
  } = useForm();

  const handleBlur = (fieldName) => {
    trigger(fieldName);
  };

  const handleInputChange = (event) => {
    const { files } = event.target;
    if (files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        const reader = new FileReader();
        reader.readAsDataURL(files[i]);
        reader.onloadend = () => {
          setSelectedFile([reader.result]);
          selectedFileRef.current = [...selectedFileRef.current, reader.result];
        };
      }
    }
  };

  const alertCreated = () => {
    Swal.fire({
      title: 'Producto Creado',
      text: 'El producto fue creado exitosamente.',
      icon: 'success',
      confirmButtonText: 'Aceptar',
      confirmButtonColor: '#192C8C',
    });
  };

  const onSubmit = (data) => {
    if (selectedFileRef.current) {
      data.imagenes = selectedFileRef.current;
    }
    console.log('esto es data', data);
    dispatch(createProduct(data));
    //navigate('/admin');}
    alertCreated();
    reset();
  };

  return (
    <div className='flex flex-col justify-start items-center w-full h-full'>
      <div className='w-full flex '>
        <NavLink to='/admin'>
          <button className='bg-teesaBlueLight  text-white flex flex-row hover:bg-teesaBlueDark p-2 m-5 rounded-xl'>
            Volver
          </button>
        </NavLink>
      </div>
      <h1 className='text-white text-4xl font-bold my-5 bg-teesaBlueDark rounded-2xl p-2'>
        Crear Producto
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='w-full md:w-2/5 lg:w-2/5 xl:w-2/5 sm:w-4/5 xs:w-4/5   bg-grey-100 rounded-lg border-teesaBlueDark border-2 flex flex-col p-10 h-auto mb-10 shadow-xl'
      >
        {/* nombre */}
        <label className='flex flex-col justify-center align-center items-center '>
          <label className='w-full font-bold'>Nombre</label>
          <input
            type='text'
            name='nombre'
            placeholder=' Nombre'
            className='min-h-[auto] w-full rounded bg-transparent py-[0.32rem] px-3 leading-[1.6] outline-none  border-2 border-teesaBlueLight shadow-lg '
            {...register('nombre', {
              required: 'Este campo es obligatorio',
              pattern: {
                value: /^[a-zA-Z0-9\s¡!¿?.,:;'\-´`{}()[\]<>|/@#$%^&*_+=\\]*$/,
                message: 'Solo se aceptan letras, números, espacios y símbolos',
              },
            })}
            onBlur={() => handleBlur('nombre')}
          />
          {errors.nombre ? (
            <span className='text-red-500 w-full'>{errors.nombre.message}</span>
          ) : (
            <div className='h-[24px]'></div>
          )}
        </label>

        {/* categoria */}
        <label className='flex flex-col justify-center align-center items-center '>
          <label className='w-full font-bold'>Categoría</label>
          <input
            type='text'
            name='categoria'
            placeholder=' Categoria'
            className='min-h-[auto] w-full rounded bg-transparent py-[0.32rem] px-3 leading-[1.6] outline-none  border-2 border-teesaBlueLight shadow-lg'
            {...register('categoria', {
              required: 'Este campo es obligatorio',
              pattern: {
                value: /^[a-zA-Z\s]+$/,
                message: 'Solo se aceptan letras y espacios',
              },
            })}
            onBlur={() => handleBlur('categoria')}
          />
          {errors.categoria ? (
            <span className='text-red-500 w-full'>
              {errors.categoria.message}
            </span>
          ) : (
            <div className='h-[24px]'></div>
          )}
        </label>

        {/* marca */}
        <label className='flex flex-col justify-center align-center items-center'>
          <label className='w-full font-bold'>Marca</label>
          <input
            type='text'
            name='marca'
            placeholder='Marca'
            className='min-h-[auto] w-full rounded bg-transparent py-[0.32rem] px-3 leading-[1.6] outline-none  border-2 border-teesaBlueLight shadow-lg '
            {...register('marca', {
              required: 'Este campo es obligatorio',
              pattern: {
                value: /^[a-zA-Z\s]+$/,
                message: 'Solo se aceptan letras y espacios',
              },
            })}
            onBlur={() => handleBlur('marca')}
          />
          {errors.marca ? (
            <span className='text-red-500 w-full'>{errors.marca.message}</span>
          ) : (
            <div className='h-[24px]'></div>
          )}
        </label>
        {/* ref */}
        <label className='flex flex-col justify-center align-center items-center'>
          <label
            className='w-full font-bold'
            required
          >
            Referencia
          </label>
          <input
            type='text'
            name='ref'
            placeholder=' Referencia'
            className='min-h-[auto] w-full rounded bg-transparent py-[0.32rem] px-3 leading-[1.6] outline-none  border-2 border-teesaBlueLight shadow-lg'
            {...register('ref', {
              required: 'Este campo es obligatorio',
            })}
            onBlur={() => handleBlur('ref')}
          />
          {errors.ref ? (
            <span className='text-red-500 w-full'>{errors.ref.message}</span>
          ) : (
            <div className='h-[24px]'></div>
          )}
        </label>

        {/* precio */}
        <label className='flex flex-col justify-center align-center items-center '>
          <label className='w-full font-bold'>Precio</label>
          <input
            type='number'
            name='precio'
            placeholder=' Precio'
            className='min-h-[auto] w-full rounded bg-transparent py-[0.32rem] px-3 leading-[1.6] outline-none  border-2 border-teesaBlueLight shadow-lg'
            {...register('precio', {
              required: 'Este campo es obligatorio',
              pattern: {
                value: /^\d+(\.\d{1,2})?$/,
                message: 'Ingresa un precio válido',
              },
            })}
            onBlur={() => handleBlur('precio')}
          />
          {errors.precio ? (
            <span className='text-red-500 w-full'>{errors.precio.message}</span>
          ) : (
            <div className='h-[24px]'></div>
          )}
        </label>
        {/* stock */}
        <label className='flex flex-col justify-center align-center items-center '>
          <label className='w-full font-bold'>Stock</label>
          <input
            type='number'
            name='stock'
            placeholder=' Stock'
            className='min-h-[auto] w-full rounded bg-transparent py-[0.32rem] px-3 leading-[1.6] outline-none  border-2 border-teesaBlueLight shadow-lg'
            {...register('stock', {
              required: 'Este campo es obligatorio',
              pattern: {
                value: /^\d+(\.\d{1,2})?$/,
                message: 'Ingresa un precio stock válido',
              },
            })}
            onBlur={() => handleBlur('stock')}
          />
          {errors.stock ? (
            <span className='text-red-500 w-full '>{errors.stock.message}</span>
          ) : (
            <div className='h-[24px]'></div>
          )}
        </label>
        {/* estado */}
        <label className='flex flex-col justify-center align-center items-center'>
          <label className='w-full font-bold'>Estado</label>
          <select
            name='estado'
            className='min-h-[auto] w-full rounded bg-transparent py-[0.32rem] px-3 leading-[1.6] outline-none  border-2 border-teesaBlueLight shadow-lg'
            {...register('estado', {
              required: 'Este campo es obligatorio',
            })}
            onBlur={() => handleBlur('estado')}
          >
            <option value=''>Selecciona un estado</option>
            <option>Nuevo</option>
            <option>Usado</option>
          </select>
          {errors.estado ? (
            <span className='text-red-500 w-full '>
              {errors.estado.message}
            </span>
          ) : (
            <div className='h-[24px]'></div>
          )}
        </label>
        {/* TIPO */}
        <label className='flex flex-col justify-center align-center items-center'>
          <label className='w-full font-bold'>Clase</label>
          <select
            name='tipo'
            className='min-h-[auto] w-full rounded bg-transparent py-[0.32rem] px-3 leading-[1.6] outline-none  border-2 border-teesaBlueLight shadow-lg'
            {...register('tipo', {
              required: 'Este campo es obligatorio',
            })}
            onBlur={() => handleBlur('tipo')}
          >
            <option value=''>Selecciona una clase</option>
            <option>Equipo</option>
            <option>Repuesto</option>
          </select>
          {errors.tipo ? (
            <span className='text-red-500 w-full '>{errors.tipo.message}</span>
          ) : (
            <div className='h-[24px]'></div>
          )}
        </label>
        {/* imagenes */}
        <label className='flex flex-col justify-center align-center items-center'>
          <label className='w-full font-bold'>Imágenes</label>
          <Controller
            name='imagenes'
            control={control}
            defaultValue={[]}
            rules={{ required: true }}
            render={({ field }) => (
              <>
                <input
                  name='imagenes'
                  // filelist={selectedFile}
                  type='file'
                  onChange={(e) => {
                    handleInputChange(e);
                    field.onChange(e.target.files);
                  }}
                  className='min-h-[auto] w-full rounded bg-transparent py-[0.32rem] px-3 leading-[1.6] outline-none  border-2 border-teesaBlueLight shadow-lg'
                  accept='image/*'
                  multiple
                />
                {errors.imagenes ? (
                  <div className='h-[24px]'>
                    <span className='text-red-500 w-full'>
                      {errors.imagenes.message}
                    </span>
                  </div>
                ) : (
                  <div className='h-[24px]'></div>
                )}
              </>
            )}
          />
        </label>
        {/* caracteriticas */}
        <label className='flex flex-col justify-center align-center items-center '>
          <label className='w-full font-bold'>Características</label>
          <textarea
            name='caracteristicas'
            placeholder=' Caracteristicas'
            rows={4}
            className='min-h-[auto] w-full rounded bg-transparent py-[0.32rem] px-3 leading-[1.6] outline-none  border-2 border-teesaBlueLight shadow-lg'
            {...register('caracteristicas', {
              required: 'Este campo es obligatorio',
              pattern: {
                value: /^[\s\S]*$/, //,
                message: 'Solo se aceptan letras, números, espacios y símbolos',
              },
            })}
            onBlur={() => handleBlur('caracteristicas')}
          />
          {errors.caracteristicas ? (
            <span className='text-red-500 w-full '>
              {errors.caracteristicas.message}
            </span>
          ) : (
            <div className='h-[24px]'></div>
          )}
        </label>

        {/* descripcion */}
        <label className='flex flex-col justify-center align-center items-center '>
          <label className='w-full font-bold'>Descripción</label>
          <textarea
            name='descripcion'
            placeholder=' Descripción'
            rows={4}
            className='min-h-[auto] w-full rounded bg-transparent py-[0.32rem] px-3 leading-[1.6] outline-none  border-2 border-teesaBlueLight shadow-lg'
            {...register('descripcion', {
              required: 'Este campo es obligatorio',
              pattern: {
                value: /^[\s\S]*$/, //,
                message: 'Solo se aceptan letras, números, espacios y símbolos',
              },
            })}
            onBlur={() => handleBlur('descripcion')}
          />
          {errors.descripcion ? (
            <span className='text-red-500 w-full'>
              {errors.descripcion.message}
            </span>
          ) : (
            <div className='h-[24px]'></div>
          )}
        </label>

        <button
          type='submit'
          className='my-[20px] inline-block w-full rounded bg-teesaBlueLight  px-6 pt-2.5 pb-2 text-md font-medium uppercase leading-normal text-white shadow-lg hover:bg-teesaBlueDark cursor-pointer'
        >
          CREAR PRODUCTO
        </button>
      </form>
    </div>
  );
};

export default CreateProducts;
