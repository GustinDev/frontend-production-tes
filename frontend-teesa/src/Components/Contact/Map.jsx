import { motion } from 'framer-motion';

const Map = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className='ml-10 md:px-0 w-[300px] md:w-[500px] shadow-gray-400 shadow-md rounded-lg'
    >
      <section className='mb-32 text-center'>
        <div className='relative h-[705px] rounded-lg shadow-lg '>
          <iframe
            src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d995.6589036392896!2d-76.51565413038003!3d3.4385099384741427!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e30a6f74c06528b%3A0x5effddcacd67a335!2sCra.%2017f4%2C%20Comuna%208%2C%20Cali%2C%20Valle%20del%20Cauca!5e0!3m2!1ses!2sco!4v1690583778538!5m2!1ses!2sco'
            className='absolute left-0 top-0 h-full w-full rounded-lg'
            allowFullScreen
            loading='lazy'
            referrerPolicy='no-referrer-when-downgrade'
            width='800px'
          ></iframe>
        </div>
      </section>
    </motion.div>
  );
};

export default Map;
