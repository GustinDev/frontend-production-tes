import tech from '../../../assets/about/tech-kitchen.jpg';
import tech1 from '../../../assets/about/kitone.jpg';
import tech2 from '../../../assets/about/kittwo.jpg';

const AboutUs = () => {
  return (
    <div className='flex flex-col justify-center aling-center w-full h-full mt-0 bg-stone-100'>
      {/* First Part */}
      <section className='py-10 lg:py-20 bg-stone-100 font-poppins '>
        <div className='max-w-6xl py-4 mx-auto lg:py-6 md:px-6'>
          <div className='flex flex-wrap '>
            <div className='w-full px-4 mb-10 lg:w-1/2 lg:mb-0 '>
              <div className='lg:max-w-md'>
                <div className='px-4 pl-4 mb-6 border-l-4 border-teesaGreen'>
                  <span className='text-sm text-gray-600 uppercase '>
                    Quienes somos
                  </span>
                  <h1 className='mt-2 text-3xl font-black text-gray-700 md:text-5xl '>
                    Nosotros
                  </h1>
                </div>
                <p className='px-4 mb-10 text-base leading-7 text-gray-500 '>
                  Somos una empresa Colombiana ubicada en Santiago de Cali,
                  Valle del Cauca, creada en 2017 como una empresa unipersonal
                  ofreciendo mantenimiento a las diferentes marcas en las
                  cocinas comerciales e industriales.
                  <br />
                  <br />
                  Somos un aliado estratégico productivo y confiable para
                  nuestros clientes y proveedores, buscando continuamente
                  ventajas competitivas. A través de un equipo Humano
                  comprometido, calificado y con amplia experiencia, dispuesto a
                  determinar y cumplir los requisitos de nuestros cliente y
                  proveedores con el propósito de aumentar la satisfacción y
                  evaluando las oportunidades de mejoras y la necesidad de
                  efectuar cambios en el sistema
                </p>
              </div>
            </div>
            <div className='w-full px-4 mb-10 lg:w-1/2 lg:mb-0'>
              <img
                src={tech}
                alt='img'
                className='relative z-40 object-cover w-full h-full rounded-3xl'
                loading='lazy'
              />
            </div>
          </div>
        </div>
      </section>
      {/* MISION Y VISION */}
      <div className='containerboth flex flex-col max-w-7xl xl:mx-auto gap-20 bg-stone-100 mx-10'>
        <section className='flex'>
          <img
            src={tech1}
            alt='photo'
            className='hidden md:flex rounded-l-3xl w-1/2 object-cover'
          />
          <div className='bg-stone-200 md:w-1/2 rounded-lg md:rounded-r-3xl p-5 xl:p-10'>
            <h2 className='mt-2 text-3xl font-black text-gray-700 md:text-5xl'>
              Misión
            </h2>
            <p className='py-4 mb-10 text-lg leading-7 text-gray-500 '>
              Somos un aliado estratégico innovador brindando soluciones
              integrales profesionales en mantenimientos, equipos y dotación de
              cocinas industriales, de proveedores reconocidos por su excelente
              calidad enfocados a la EFICIENCIA, para fortalecer sus sistemas
              productivos con mano de obra calificada y certificada, con equipos
              confiables, tecnología de punta, diseñados con altos estándares de
              calidad a su necesidad.
            </p>
          </div>
        </section>

        <section className='flex  mb-40'>
          <div className='bg-stone-200 md:w-1/2 rounded-lg md:rounded-l-3xl p-5 xl:p-10'>
            <h2 className='mt-2 text-3xl font-black text-gray-700 md:text-5xl'>
              Visión
            </h2>
            <p className='py-4 mb-10  leading-7 text-gray-500 text-lg'>
              En el 2030 TEESA aumentará la participación en nuestro negocio
              fundamental, soluciones integrales profesionales en
              mantenimientos, equipos y dotación de cocinas industriales con
              tecnología eficaz, apropiada e innovadora, apuntando a la
              consolidación como uno de los principales proveedores en el gremio
              gastronómico que permitan el crecimiento, sostenibilidad,
              rentabilidad económica y social.
            </p>
          </div>
          <img
            className='hidden md:flex rounded-r-3xl w-1/2 object-cover'
            src={tech2}
            alt='photo'
          />
        </section>
      </div>
    </div>
  );
};

export default AboutUs;
