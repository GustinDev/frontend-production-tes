import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllProducts } from '../../features/reduxReducer/stockSlice';
import StockCard from './StockCard';
import loadingGif from '../../assets/icon/Loading.gif';

const StockProduct = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state?.stockState);

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  if (loading) {
    return <div className='flex justify-center items-center w-full h-full'>
    <img
      className='w-1/6 mx-auto'
      src={loadingGif}
      alt='gif'
    />
  </div>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className='w-full min-h-screen flex justify-center items-center'>
      <div className='stocksContainter w-11/12 h-fit mb-6 mt-2'>
        <h1 className='bg-teesaBlueLight  text-white flex flex-row p-3 rounded-xl text-xl font-bold w-fit mx-auto my-4'>Editar Stock</h1>
        <h1 className='block lg:hidden w-full text-center'>
        Para ver la tabla de productos entra desde un computador.{' '}
      </h1>
        <div className='hidden lg:block stock-container'>
          {products?.map((product) => (
            <StockCard
              key={product?.id}
              product={product}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default StockProduct;
