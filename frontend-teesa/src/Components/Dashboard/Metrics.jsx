import MonthSalesChart from './MonthSalesChart';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SalesChart from './SalesChart';
import { useEffect } from 'react';
import { getProductsChart } from '../../features/reduxReducer/admproductSlice';
import { motion } from 'framer-motion';

const Metrics = () => {
  const ProductChart = useSelector(
    (state) => state.adminProductState.ProductChart
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductsChart());
  }, [dispatch]);

  //console.log(ProductChart);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className='flex flex-col w-full h-screen items-center justify-start '
    >
      <div className='w-full flex '>
        <NavLink to='/admin'>
          <button className='bg-teesaBlueLight  text-white flex flex-row hover:bg-teesaBlueDark p-2 m-5 rounded-xl'>
            Volver
          </button>
        </NavLink>
      </div>
      <h1 className='text-white text-5xl font-bold my-5 bg-teesaBlueDark rounded-2xl p-2'>
        Métricas
      </h1>
      <section className='flex flex-row gap-[3em] items-center justify-center bg-teesaGrey rounded-xl py-5 px-10'>
        <article className='flex flex-row items-start font-bold text-lg text-black'>
          <div>
            Producto mas vendido:
            {ProductChart && <h1>{ProductChart.mostSoldProduct}</h1>}
            {ProductChart && <h2>{ProductChart.mostSoldCount}</h2>}
          </div>
          <div>
            {ProductChart && (
              <SalesChart salesData={ProductChart.productSales} />
            )}
          </div>
        </article>
        <article className=' bg-white'>
          <div>
            {ProductChart && (
              <MonthSalesChart salesByMonth={ProductChart.salesByMonth} />
            )}
          </div>
        </article>
      </section>
    </motion.div>
  );
};

export default Metrics;
