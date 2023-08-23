/* eslint-disable react/prop-types */
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { editProduct } from '../../features/reduxReducer/admproductSlice';

function StockCard({ product }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {  register, handleSubmit, formState: { errors } } = useForm();

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
  const onSubmit = (data) => {
    const parsedData = {
          imagenes:[],
          precio: product.precio,
          stock: Number(data.stock),
        };
    console.log(parsedData);
    dispatch(editProduct({ data: parsedData, ProductID: product.id }));
    alertConfirm();

  };

  return (
    <div className='stock-card bg-white border-y-[1px] border-x-[2px] border-black  w-full flex flex-row justify-between items-center'>
      <div className='product grid grid-cols-4 gap-4 w-full h-full'>
        <div className='   border-r-2 border-black flex flex-row p-2  items-center'>
        <img
          src={product?.imagenes[0]}
          alt={product.nombre}
          className='w-16 h-16'
        />
          <h2 className="flex justify-center items-center ml-2">{product.nombre}</h2>
        </div>
        <h2 className="flex justify-center items-center">{product.marca} | {product.ref}</h2>
        <h2 className="border-l-2  border-r-2 border-black flex justify-center items-center">{product.categoria} | {product.tipo}</h2>
      <div className='stock flex justify-center items-center'>
        
      <form className='flex flex-row' onSubmit={handleSubmit(onSubmit)}>
            <input
              type='number'
              name='stock'
              className={` w-full rounded bg-transparent py-[0.32rem] px-1  outline-none border-2  shadow-lg ${
                errors.stock ? 'border-red-500' : 'border-blue-600'
              }`}
              placeholder={product.stock}
              {...register('stock', { required: true })}
            />
            <button type='submit' className='ml-1 p-2 bg-blue-600 rounded-lg text-white hover:bg-teesaBlueDark'>
              Actualizar
            </button>
          </form>
      </div>
      </div>
    </div>
  );
}

export default StockCard;
