import { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  addFilter,
  fetchProducts,
} from '../../features/reduxReducer/filterSlice';
import Swal from 'sweetalert2';

export const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [noResults, setNoResults] = useState(false);

  const dispatch = useDispatch();

  const handleSearch = () => {
    const filters = {
      nombre: searchTerm,
    };

    dispatch(addFilter(filters));
    dispatch(fetchProducts(filters))
      .then((response) => {
        if (response.payload.products.length === 0) {
          setNoResults(true);
        } else {
          setNoResults(false);
        }
      })
      .catch((error) => {
        console.log('Error fetching products:', error);
        setNoResults(true);
      });
  };

  const clearSearch = () => {
    setSearchTerm('');
  };

  const handleGoBack = () => {
    dispatch(fetchProducts());
    setNoResults(false);
  };

  if (noResults) {
    Swal.fire({
      title: 'No hay productos con ese nombre en este momento.',
      icon: 'info',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Mostrar todos los productos',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        handleGoBack();
      }
    });
  }

  return (
    <div className='flex items-center justify-evenly md:justify-start w-full md:w-auto'>
      <input
        className='mx-2 w-full md:w-80 lg:w-96 h-8 px-2 outline-none text-black bg-white rounded-md  md:mb-0 md:mr-2'
        type='search'
        placeholder='Buscar productos...'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleSearch();
            clearSearch();
          }
        }}
      />
      <div>
        <button
          type='submit'
          className='bg-green-500 text-black font-bold px-4 py-1 rounded-md'
          onClick={() => {
            handleSearch();
            clearSearch();
          }}
        >
          Buscar
        </button>
      </div>
    </div>
  );
};
