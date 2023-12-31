/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getProductById,
  clearDetail,
} from '../../features/reduxReducer/detailSlice';
import { useParams } from 'react-router-dom';
import CardDetail from '../Card/CardDetail';
import { motion } from 'framer-motion';
import loadingGif from '../../assets/icon/Loading.gif';

function Detail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const detail = useSelector((state) => state?.detailState?.productDetail);
  let loading = useSelector((state) => state.detailState.loading); // Cambia state.productState.loading por state.detailState.loading

  useEffect(() => {
    dispatch(getProductById(id));

    return () => {
      dispatch(clearDetail());
    };
  }, [dispatch, id]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {loading && (
        <div className='flex justify-center items-center w-full h-[800px]'>
          <img
            src={loadingGif}
            alt='gif'
          />
        </div>
      )}
      {!loading && (
        <div className='w-full h-full'>
          {detail && (
            <CardDetail
              id={detail?.id}
              key={detail?.id}
              nombre={detail?.nombre}
              descripcion={detail?.descripcion}
              tipo={detail?.tipo}
              caracteristicas={detail?.caracteristicas}
              categoria={detail?.categoria}
              precio={detail?.precio}
              imagenes={detail?.imagenes}
              marca={detail?.marca}
              stock={detail?.stock}
              estado={detail?.estado}
              productRef={detail?.ref}
            />
          )}
        </div>
      )}
    </motion.div>
  );
}

export default Detail;
