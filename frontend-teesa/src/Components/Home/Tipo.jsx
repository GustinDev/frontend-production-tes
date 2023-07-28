/* eslint-disable react/prop-types */

const Tipo = ({ tipo, setTipo, handleChange }) => {
  return (
    <div>
      <span className='mb-2 font-semibold'>Tipo:</span>
      <button
        className={`${
          tipo === '' ? 'bg-blue-500' : 'bg-gray-300'
        } text-white px-3 py-2 rounded mr-2`}
        onClick={() => {
          setTipo('');
          handleChange();
        }}
      >
        Todos
      </button>
      <button
        className={`${
          tipo === 'equipo' ? 'bg-blue-500' : 'bg-gray-300'
        } text-white px-3 py-2 rounded mr-2`}
        onClick={() => {
          setTipo('equipo');
          handleChange();
        }}
      >
        Equipo
      </button>
      <button
        className={`${
          tipo === 'repuesto' ? 'bg-blue-500' : 'bg-gray-300'
        } text-white px-3 py-2 rounded`}
        onClick={() => {
          setTipo('repuesto');
          handleChange();
        }}
      >
        Repuesto
      </button>
    </div>
  );
};

export default Tipo;
