/* eslint-disable react/prop-types */

function StockCard({ product }) {
  return (
    <div className='stock-card bg-red-200 border-y-[1px] border-x-[2px] border-black p-2 w-full flex flex-row justify-between items-center'>
      <div className='product flex flex-row'>
        <img
          src={product?.imagenes[0]}
          alt={product.nombre}
          className='w-16 h-16'
        />
        <div className='border-2 border-black'>
          <h2>{product.nombre}</h2>
        </div>
        <h2>{product.marca}</h2>
        <h2>{product.categoria}</h2>
      </div>
      <div className='stock'>
        <button className='p-2 bg-blue-600 rounded-lg text-white'>
          Actualizar Stock
        </button>
      </div>
    </div>
  );
}

export default StockCard;
