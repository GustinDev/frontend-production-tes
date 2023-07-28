/* eslint-disable no-unused-vars */
//Instalaciones:
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
//Redux:
import {
  addFilter,
  fetchProducts,
} from '../../features/reduxReducer/filterSlice';
import {
  sortByName,
  sortByPrice,
  getPaginationData,
} from '../../features/reduxReducer/productSlice';
//Gif
import loadingGif from '../../assets/icon/Loading.gif';
//Componentes:
// import CartWindowCart from '../Card/CardWindowCart';
import { SearchBar } from '../SearchBar/SearchBar';
// import { NoHayProductosSearch } from '../../Components/NoHayProductosSearch/'
import { Card } from '../Card/Card';
import FilterComponent from './FilterComponent';
import Pagination from '../Pagination/Pagination';
import {
  getUserDataFromCookie,
  saveUserDataToCookie,
} from '../../features/reduxReducer/userSlice';
import Cookies from 'universal-cookie';

function Home() {
  const [effectExecuted, setEffectExecuted] = useState(false);
  //Sol - Ordenamientos:

  const handleSort = (e) => {
    e.preventDefault();
    dispatch(sortByName(e.target.value)); // Pasa el valor directamente
    setOrden(`Ordenado ${e.target.value}`);
  };

  const handleSortPrices = (e) => {
    e.preventDefault();
    dispatch(sortByPrice({ minPrice: 100000000, maxPrice: 500000000 }));
    dispatch(sortByPrice(e.target.value.toLowerCase()));
    setOrden(`Ordenado por precio ${e.target.value}`);
  };

  // Carrito
  const [showFilters, setShowFilters] = useState(false); // Estado para mostrar/ocultar los filtros

  // Tiago y Juan - Estado de Páginación:

  //Tiago y Juan - Paginación.

  const [currentPage, setCurrentPage] = useState(1);

  const dispatch = useDispatch();

  const isDataLoaded = useSelector(
    (state) => state.productState.allProducts.length > 0
  );
  // Codigo de Sol:
  const [orden, setOrden] = useState('');
  useEffect(() => {
    dispatch(getPaginationData(currentPage));
  }, [dispatch, currentPage]);

  //*Filtros Nuevos:

  const { filters, products, status, error } = useSelector(
    (state) => state?.filters
  );

  //*Nuestro Login: Comprobar token - Cargar Datos del User (userSlice).
  useEffect(() => {
    const cookies = new Cookies();

    if (cookies.get('token', { path: '/' }) && !effectExecuted) {
      dispatch(getUserDataFromCookie());
      setEffectExecuted(true);
    }
  }, [dispatch, effectExecuted]);

  useEffect(() => {
    if (Object.keys(filters).length > 0) {
      dispatch(fetchProducts(filters));
    }
  }, [filters, dispatch]);

  const handleApplyFilters = (selectedFilters) => {
    dispatch(addFilter(selectedFilters));
  };

  //*Google Auth: Sacar Data de Query

  useEffect(() => {
    const url = new URL(window.location.href);
    const nombre = url.searchParams.get('nombre');
    const correo = url.searchParams.get('correo');
    const id = url.searchParams.get('id');
    if (nombre) {
      dispatch(saveUserDataToCookie({ nombre, correo, id }));
    }
  }, [dispatch]);

  //Fiter Panel:

  const [isPanelOpen, setPanelOpen] = useState(false);

  const togglePanel = () => {
    setPanelOpen(!isPanelOpen);
  };

  return (
    <div className='flex flex-wrap overflow-y-auto min-h-screen w-full mx-auto justify-center'>
      {/* Second Navbar */}
      <div className='flex flex-col bg-teesaBlueDark w-full h-[60px] items-center justify-center mt-[-3px] border-t-[6px] border-teesaGreen text-teesaWhite text-[16px] py-4 mx-auto'>
        <SearchBar />
      </div>
      {/* Hero */}
      <div className='heroContainer flex flex-wrap mx-auto mt-5 flex-col lg:flex-row w-full 2xl:w-9/12 md:m-5 justify-center'>
        {/* BOTON FILTROS */}
        <button
          className='flex lg:hidden  h-10 bg-white lg:bg-gray-200 w-11/12 mx-auto md:w-full text-md justify-center items-center gap-1 font-bold rounded-t-lg border-[1px] border-teesaBlueLight border-b-teesaBlueLight md:px-0 px-5'
          onClick={togglePanel}
        >
          Filtros
          <span className=''>
            {isPanelOpen ? (
              <i className='fa-solid fa-arrow-up-wide-short fa-sm w-2'></i>
            ) : (
              <i className='fa-solid fa-arrow-down-wide-short fa-md w-2'></i>
            )}
          </span>
        </button>
        {/* TODOS LOS FILTROS */}
        <motion.div
          initial={{ opacity: 0, x: -50 }} // Inicialmente la opacidad es 0 y la posición x es 200px hacia la derecha
          animate={{ opacity: 1, x: 0 }} // Al animar, la opacidad llega a 1 y la posición x es 0 (posición original)
          transition={{ duration: 0.6 }}
          className={`filters  w-11/12 mx-auto md:w-full lg:w-1/6 2xl:w-3/12 lg:mx-0 lg:mt-2 bg-white lg:bg-gray-200 p-4 rounded-b-lg lg:rounded-lg border-[1px] border-teesaBlueLight border-t-0 lg:border-0  ${
            isPanelOpen ? 'block' : 'hidden'
          } lg:block  `}
        >
          <FilterComponent
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            onApplyFilters={handleApplyFilters}
          />
        </motion.div>

        {/* Cards */}
        <div className='cardsContainer w-full lg:w-2/3 2xl:w-8/12  bg-teesaWhite flex flex-wrap justify-center flex-col min-h-0 mt-4 lg:mt-0'>
          {status === 'loading' && (
            <div className='flex justify-center items-center w-full h-[800px]'>
              <img
                src={loadingGif}
                alt='gif'
              />
            </div>
          )}
          {status === 'failed' && (
            <div className='text-2xl w-1/2 h-1/2 font-bold text-center'>
              Error al cargar los productos. {error}
            </div>
          )}
          {status === 'succeeded' && products.products.length > 0 ? (
            <div className=' grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 sm:grid-cols-1  lg:gap-4 mx-auto w-12/12 2xl:w-12/12 md:w-full'>
              {products.products?.map((product) => (
                <motion.div
                  key={product?.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1 }} // Puedes ajustar la duración de la animación aquí
                >
                  <Card
                    id={product?.id}
                    nombre={product?.nombre}
                    categoria={product?.categoria}
                    precio={product?.precio}
                    imagenes={product?.imagenes}
                    marca={product?.marca}
                  />
                </motion.div>
              ))}
            </div>
          ) : status === 'succeeded' ? (
            <div className='h-full font-bold text-3xl flex justify-center items center my-40 flex-col mx-auto'>
              <div className='bg-teesaBlueDark p-5 rounded-lg text-white'>
                <h1>No se encontraron productos.</h1>
              </div>
            </div>
          ) : null}
          {status === 'succeeded' && products.products.length && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className='w-10/12 mx-auto'
            >
              <Pagination
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              />
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
