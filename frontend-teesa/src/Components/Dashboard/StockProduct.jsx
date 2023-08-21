import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllProducts } from '../../features/reduxReducer/stockSlice';
import StockCard from './StockCard';

const StockProduct = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.stockState);

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  console.log(products);

  return (
    <div className='w-full min-h-screen flex justify-center items-center'>
      <div className='stocksContainter bg-blue-200 w-11/12 h-fit rounded-xl border-2 border-black p-2'>
        <h1>Productos</h1>
        {/*TODO HACER CARD INDIVIDUAL CON BOTON Y INPUT PARA CAMBIAR STOCK */}
        <div className='stock-container'>
          {products.map((product) => (
            <StockCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default StockProduct;
