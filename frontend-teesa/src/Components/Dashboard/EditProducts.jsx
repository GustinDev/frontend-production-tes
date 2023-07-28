import { useForm, Controller } from 'react-hook-form';
import Swal from 'sweetalert2';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRef } from 'react';
import { editProduct } from '../../features/reduxReducer/admproductSlice';
import { deleteProduct } from '../../features/reduxReducer/admproductSlice';
import {
  getProductById,
  clearDetail,
} from '../../features/reduxReducer/detailSlice';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const EditProducts = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); // Navegar hacia atrás (-1)
  };
  //Data Detail

  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(() => {
    dispatch(getProductById(id));

    return () => {
      dispatch(clearDetail());
    };
  }, [dispatch, id]);

  const nombre = useSelector(
    (state) => state?.detailState?.productDetail.nombre
  );
  const stock = useSelector((state) => state?.detailState?.productDetail.stock);
  const precio = useSelector(
    (state) => state?.detailState?.productDetail.precio
  );

  console.log(stock, precio);

  // eslint-disable-next-line no-unused-vars
  const [selectedFile, setSelectedFile] = useState([]);
  const selectedFileRef = useRef([]);

  //Alert
  const alertConfirm = () => {
    Swal.fire({
      title: 'Producto Actualizado',
      icon: 'success',
      confirmButtonText: 'Aceptar',
      confirmButtonColor: '#192C8C',
    }).then(() => {
      navigate(0);
    });
  };

  //Hock Form

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
    // trigger,
  } = useForm();

  //*Validar Admin:

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

  //ids

  let ProductID = id;

  const onSubmit = (data) => {
    if (selectedFileRef.current) {
      data.imagenes = selectedFileRef.current;
    }
    const parsedData = {
      ...data,
      stock: Number(data.stock),
      precio: Number(data.precio),
    };
    dispatch(editProduct({ data: parsedData, ProductID }));
    alertConfirm();
    reset();
  };

  //Images:
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

  //delete product
  const handleDelete = () => {
    dispatch(deleteProduct(ProductID));
    navigate('/home');
    console.log('producto borrado');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className='flex flex-col justify-center items-center w-full h-full '
    >
      <div className='w-full flex '>
        <button
          onClick={handleGoBack}
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-20 m-5'
        >
          Volver
        </button>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className=' w-full md:w-2/5 lg:w-2/5 xl:w-2/5 sm:w-4/5 xs:w-4/5  my-10 bg-gray-100 p-5 rounded-lg border-teesaBlueDark border-2 flex flex-col '
      >
        <h1 className='font-bold text-lg md:text-3xl text-teesaBlueDark my-1'>
          Editar Producto
        </h1>
        <h2 className='my-3 font-medium text-sm'>
          Escribe la información actualizada del producto. Si no escribes un
          campo, dejaremos la información anteriormente establecida.
        </h2>

        <h1 className='font-bold text-lg text-teesaBlueDark my-2'>{`Nombre: ${nombre} `}</h1>

        <div className='relative'>
          <h1 className='text-lg'>Stock</h1>
          <input
            type='number'
            name='stock'
            className={`min-h-[auto] w-full rounded bg-transparent py-[0.32rem] px-3 leading-[1.6] outline-none  border-2 border-teesaBlueLight shadow-lg ${
              errors.stock ? 'border-red-500' : ''
            }`}
            placeholder={stock}
            {...register('stock')}
          />
          {errors.stock && (
            <span className='text-red-500'>{errors.stock.message}</span>
          )}
          {!errors.stock}
        </div>
        <div className='relative mb-1'>
          <h1 className='text-lg'>Precio</h1>
          <input
            type='number'
            name='precio'
            className={`min-h-[auto] w-full rounded bg-transparent py-[0.32rem] px-3 leading-[1.6] outline-none transition-all duration-200 ease-linear  border-2 border-teesaBlueLight shadow-lg ${
              errors.stock ? 'border-red-500' : ''
            }`}
            placeholder={precio}
            {...register('precio')}
          />
          {errors.precio && (
            <span className='text-red-500'>{errors.precio.message}</span>
          )}
          {!errors.precio}
        </div>

        <div className='relative mb-1'>
          <h1 className='text-lg'>Imágenes</h1>
          <Controller
            name='imagenes'
            control={control}
            defaultValue={[]}
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
                  className='bg-teesaBlueDark text-teesaGrey text-lg rounded-md h-11 w-full p-1'
                  accept='image/*'
                  multiple
                />
                {errors.imagenes && (
                  <span className='text-red-500'>
                    {errors.imagenes.message}
                  </span>
                )}
              </>
            )}
          />{' '}
        </div>

        {/* <div className='inline-block min-h-1.5rem justify-center pl-1.5rem md:flex'></div> */}

        <input
          type='submit'
          value='Enviar'
          className='my-[20px] inline-block w-full rounded bg-teesaBlueLight  px-6 pt-2.5 pb-2 text-md font-medium uppercase leading-normal text-white shadow-lg hover:bg-teesaBlueDark cursor-pointer'
        />
        <div className='w-full  border-t-2 border-teesaBlueDark mb-3 '></div>
        <button
          onClick={handleDelete}
          className='bg-red-600 rounded-lg h-[3em] w-full hover:bg-red-800 text-white font-bold mt-[1%]'
        >
          ELIMINAR PRODUCTO
        </button>
      </form>
    </motion.div>
  );
};

export default EditProducts;
