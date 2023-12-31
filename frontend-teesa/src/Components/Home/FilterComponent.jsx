/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// import { useSelector } from 'react-redux';
import {
  fetchProducts,
  sortByName,
  sortByPrice,
  changePage,
} from '../../features/reduxReducer/filterSlice';
import { getBrands } from '../../features/reduxReducer/productSlice';
import { motion } from 'framer-motion';
// import NoRepuestosDisponibles from '../NoHayRep/NoRepuestos';
// import NoHayProductosRango from '../NoHayProductosRango/NoHayProductosRango';

// eslint-disable-next-line react/prop-types
const FilterComponent = ({ currentPage, setCurrentPage, tipo, setTipo }) => {
  const [estado, setEstado] = useState('');
  // const [tipo, setTipo] = useState('');
  const [marca, setMarca] = useState(['']);
  const [precio, setPrecio] = useState('');
  const [orderPrice, setOrderPrice] = useState('');
  const [orderName, setOrderName] = useState('');
  const [brands, setBrands] = useState([]);

  const pageState = useSelector((state) => state?.filters?.page);

  const [resetFilters, setResetFilters] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    const filters = {
      page: pageState,
      estado: estado,
      tipo: tipo,
      marca: marca,

      precioMinimo: precio.split('-')[0],
      precioMaximo: precio.split('-')[1],
    };
    dispatch(fetchProducts(filters));
  }, [pageState, estado, tipo, marca, precio, dispatch]);

  useEffect(() => {
    dispatch(getBrands())
      .then((response) => {
        setBrands(response.payload);
      })
      .catch((error) => {
        console.error('Error fetching brands:', error);
      });
  }, [dispatch]);

  useEffect(() => {
    if (resetFilters) {
      setEstado('');
      setTipo('');
      setMarca('');
      setPrecio('');
      setOrderPrice('');
      setOrderName('');
      dispatch(changePage(1));
      setResetFilters(false);
      dispatch(fetchProducts({}));
    }

    const filters = {
      page: pageState,
      estado: estado,
      tipo: tipo,
      marca: marca,
      precioMinimo: precio.split('-')[0],
      precioMaximo: precio.split('-')[1],
    };

    dispatch(fetchProducts(filters));
  }, [pageState, estado, tipo, marca, precio, resetFilters, dispatch]);

  const handleChange = () => {
    dispatch(changePage(1));
  };

  // const handleSort = (e) => {
  //   e.preventDefault();
  //   setOrderName(e.target.value);
  //   dispatch(sortByName(e.target.value));
  // };

  // const handleSortPrices = (e) => {
  //   e.preventDefault();
  //   setOrderPrice(e.target.value);
  //   dispatch(sortByPrice(e.target.value.toLowerCase()));
  // };

  return (
    <motion.div
      // Duración de la animación en segundos
      className='mb-4 flex flex-col bg-white lg:bg-gray-200'
    >
      <button
        className=' text-black px-4 py-2 rounded-lg mb-4 border-gray-900 b-2 text md font-bold bg-green-400 hover:bg-green-500'
        onClick={() => setResetFilters(true)}
      >
        Limpiar Filtros
      </button>
      {/* <div className='block mb-5 text-teesaBlueDark'>
        <span className='mb-2 font-semibold'>Orden Alfabético</span>
        <select
          id='sort'
          className='w-full border border-gray-300 rounded px-3 py-2 focus:outline-none'
          value={orderName}
          onChange={(e) => handleSort(e)}
        >
          <option
            value=''
            disabled
          >
            Seleccionar
          </option>
          <option value='ascendente'>A-Z</option>
          <option value='descendente'>Z-A</option>
        </select>
      </div> */}
      {/* <div className='block mb-5  text-teesaBlueDark'>
        <span className='mb-2 font-semibold'>Precio</span>
        <select
          id='sortPrice'
          className='w-full border border-gray-300 rounded px-3 py-2 focus:outline-none'
          value={orderPrice}
          onChange={(e) => handleSortPrices(e)}
        >
          <option
            value=''
            disabled
          >
            Seleccionar
          </option>
          <option value='precio_min'>Precio Mínimo</option>
          <option value='precio_max'>Precio Máximo</option>
        </select>
      </div> */}
      <label className='block  text-teesaBlueDark'>
        <span className='mb-2 font-semibold'>Estado</span>
        <select
          value={estado}
          className='w-full border border-gray-300 rounded px-3 py-2 focus:outline-none'
          onChange={(e) => {
            setEstado(e.target.value);
            handleChange();
          }}
        >
          <option value=''>Todos</option>
          <option value='usado'>Usado</option>
          <option value='nuevo'>Nuevo</option>
        </select>
      </label>

      {/* <label className='block  text-teesaBlueDark'>
        <span className='mb-2 font-semibold'>Tipo:</span>
        <select
          value={tipo}
          className='w-full border border-gray-300 rounded px-3 py-2 focus:outline-none'
          onChange={(e) => {
            setTipo(e.target.value);
            handleChange();
          }}
        >
          <option value=''>Todos</option>
          <option value='equipo'>Equipo</option>
          <option value='repuesto'>Repuesto</option>
        </select>
      </label> */}
      <br />
      <div className='flex flex-col  text-teesaBlueDark'>
        <span className=' font-semibold'>Marca</span>
        <select
          value={marca}
          onChange={(e) => {
            setMarca(e.target.value);
            handleChange();
          }}
          className='w-full border border-gray-300 rounded px-3 py-2 focus:outline-none'
        >
          <option value=''>Seleccionar marca</option>
          {brands.map((brand) => (
            <option
              value={brand}
              key={brand}
            >
              {brand}
            </option>
          ))}
        </select>
      </div>

      <br />
      <label className='block mb-2  text-teesaBlueDark'>
        <span className='mb-2 font-semibold'>Rango de Precios</span>
        <select
          value={precio}
          onChange={(e) => {
            setPrecio(e.target.value);
            handleChange();
          }}
          className='w-full border border-gray-300 rounded px-3 py-2 focus:outline-none'
        >
          <option value=''>Todos</option>
          <option value='0-10000000'>0 - 10,000,000</option>
          <option value='10000000-20000000'>10,000,000 - 20,000,000</option>
          <option value='20000000-30000000'>20,000,000 - 30,000,000</option>
          <option value='30000000-40000000'>30,000,000 - 40,000,000</option>
          <option value='40000000-50000000'>40,000,000 - 50,000,000</option>
        </select>
      </label>
    </motion.div>
  );
};

export default FilterComponent;
