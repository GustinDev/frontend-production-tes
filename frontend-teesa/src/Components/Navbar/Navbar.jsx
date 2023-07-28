/* eslint-disable react/prop-types */
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getUser, getCart } from '../../features/reduxReducer/carritoSlice';
import { NavLink } from 'react-router-dom';
import Cookies from 'universal-cookie';
import 'boxicons/css/boxicons.min.css';
import title from '../../title.png';
import {
  resetUserState,
  updateUserDataFromCookie,
} from '../../features/reduxReducer/userSlice';
import { getCartGuestProducts } from '../../features/reduxReducer/cartGuestSlice';

export default function NavBar(props) {
  //Traer Data del User - Nuestro Login y Register
  const userData = useSelector((state) => state.userState);
  const dispatch = useDispatch();
  const {
    user,
    //userData: { userName },
    userData: { userId },
  } = userData;

  const userAdmin = useSelector((state) => state.userState.userData.userType);

  const [info, setInfo] = useState({
    items: '',
  });
  const userUUID = props.userId;
  useEffect(() => {
    dispatch(getUser()).then((action) => {
      const response = action.payload;
      // console.log(response);
      const cartId = response.find((user) => user.id === userId)?.Cart.id;
      // console.log(cartId);
      if (cartId) {
        dispatch(getCart(cartId)).then((action) => {
          const response = action.payload;
          // console.log(response);
          setInfo((prevInfo) => ({
            ...prevInfo,
            items: response,
          }));
        });
      } else
        dispatch(getCartGuestProducts(userUUID)).then((action) => {
          const response = action.payload;
          setInfo((prevInfo) => ({
            ...prevInfo,
            items: response,
          }));
        });
    });
  }, [dispatch, userData, info]);

  //Google
  const [nombreGoogle, setNombreGoogle] = useState(null);
  const cookies = new Cookies();
  //Sesión Continúa: Data del User - Google Auth

  useEffect(() => {
    const nombreGoogleCookie = cookies.get('nombreGoogle');
    if (nombreGoogleCookie) {
      dispatch(updateUserDataFromCookie());
      setNombreGoogle(nombreGoogleCookie);
    }
  }, [dispatch]);

  //Log Out Button

  const handleLogout = () => {
    // Vaciar estados de Login, Register y vaciar data del User.
    const cookies = new Cookies();
    cookies.remove('token', { path: '/' });
    cookies.remove('idGoogle', { path: '/' });
    cookies.remove('nombreGoogle', { path: '/' });
    cookies.remove('correoGoogle', { path: '/' });
    cookies.remove('OursUserEmail', { path: '/' });
    resetUserState();
    navigate('/home', { replace: true });
    window.location.reload();
  };

  //Mostrar Botón
  const navigate = useNavigate();
  const [showTooltip, setShowTooltip] = useState(false);

  const handleTooltipToggle = () => {
    setShowTooltip(!showTooltip);
  };

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  //UserName

  // const firstName = nombreGoogle
  //   ? nombreGoogle.split(' ')[0]
  //   : userName
  //   ? userName.split(' ')[0]
  //   : null;

  return (
    <div className='pr-5 flex flex-row justify-between items-center w-full lg:px-10 h-[4em] border-b-2 border-teesaGreen bg-teesaBlueDark text-white text-xl sm:text-lg relative '>
      <div className='flex items-center py-5'>
        <NavLink to='/home'>
          <img
            className='w-12 my-0'
            src={title}
            alt='Icono Teesa'
          />
        </NavLink>
        <div className='hidden sm:flex gap-[6%]'>
          <NavLink
            to='/home'
            className='transition duration-300 ease-in-out transform hover:text-teesaGreen focus:text-teesaGreen'
          >
            Inicio
          </NavLink>
          <NavLink
            to='/services'
            className='transition duration-300 ease-in-out transform hover:text-teesaGreen focus:text-teesaGreen'
          >
            Servicios
          </NavLink>
          <NavLink
            to='/contact'
            className='transition duration-300 ease-in-out transform hover:text-teesaGreen focus:text-teesaGreen'
          >
            Contáctanos
          </NavLink>
          <NavLink
            to='/about'
            className='transition duration-300 ease-in-out transform hover:text-teesaGreen focus:text-teesaGreen'
          >
            Nosotros
          </NavLink>
          {userAdmin == true ? (
            <NavLink
              to='/admin'
              className='transition duration-300 ease-in-out transform hover:text-teesaGreen focus:text-teesaGreen'
            >
              Dashboard
            </NavLink>
          ) : (
            <div></div>
          )}
        </div>
        <div className='sm:hidden'>
          <i
            className={`bx ${
              isMobileMenuOpen ? 'bx-x' : 'bx-menu'
            } text-3xl text-white ml-4 cursor-pointer`}
            onClick={handleMobileMenuToggle}
          ></i>
        </div>
      </div>
      <div className='flex items-center justify-end '>
        {/* Tooltip Start*/}
        {user || nombreGoogle ? (
          <div
            className={` cursor-pointer relative flex items-center ${
              isMobileMenuOpen ? 'hidden sm:flex' : 'flex'
            }`}
            onMouseEnter={handleTooltipToggle}
            onMouseLeave={handleTooltipToggle}
          >
            <i
              className='fa-solid fa-user flex transition duration-300 ease-in-out transform pl-12 py-5 pr-6 hover:text-teesaGreen'
              style={{ fontSize: '20px' }}
            ></i>

            {showTooltip && (
              <div className='absolute z-50 flex-col h-auto bg-gray-100 top-full right-0 w-[180px] p-2 rounded-xl border-[2px] border-teesaBlueDark -mt-2'>
                <NavLink to='/profile'>
                  <p className='w-full text-black py-1 px-2 text-center hover:text-gray-900 hover:font-medium  text-md'>
                    Perfil
                  </p>
                </NavLink>

                <div
                  onClick={handleLogout}
                  className='w-full text-black py-1 px-2 text-center hover:text-gray-900 hover:font-medium text-md'
                >
                  Cerrar sesión
                </div>
              </div>
            )}
          </div>
        ) : (
          <NavLink
            to='/login'
            className={` sm:flex px-6 py-4 transition duration-300 ease-in-out transform hover:text-teesaGreen focus:text-teesaGreen text-md`}
          >
            Ingresar
          </NavLink>
        )}

        {/* Tooltip End*/}
        {userAdmin == true || !user ? (
          <div></div>
        ) : (
          <div>
            <div className='relative'>
              <NavLink
                to='/carrito'
                className='flex items-center my-auto'
              >
                <i className='fa-solid fa-cart-shopping text-xl rounded-md hover:text-teesaGreen p-1'></i>
                {info.items?.cartProducts?.length > 0 ? (
                  <span className='absolute -top-1 -right-3 bg-teesaGreen text-black rounded-full text-xs px-1.5 py-.05 font-bold'>
                    {info.items.cartProducts.reduce(
                      (total, item) => total + item.cantidad,
                      0
                    )}
                  </span>
                ) : info.items?.cartGuestProducts?.length > 0 ? (
                  <span className='absolute -top-1 -right-3 bg-teesaGreen text-black rounded-full text-xs px-1.5 py-.05'>
                    {info.items.cartGuestProducts.reduce(
                      (total, item) => total + item.cantidad,
                      0
                    )}
                  </span>
                ) : null}
              </NavLink>
            </div>
          </div>
        )}
      </div>

      {isMobileMenuOpen && (
        <div className='sm:hidden w-full absolute top-full left-0 bg-teesaBlueDark text-white p-2 z-10 -mt-1'>
          <NavLink
            to='/home'
            className='w-full px-4 py-2 hover:bg-teesaGreen hover:text-teesaBlueDark text-md block'
          >
            Inicio
          </NavLink>
          <NavLink
            to='/services'
            className='w-full px-4 py-2 hover:bg-teesaGreen hover:text-teesaBlueDark text-md block'
          >
            Servicios
          </NavLink>
          <NavLink
            to='/contact'
            className='w-full px-4 py-2 hover:bg-teesaGreen hover:text-teesaBlueDark text-md block'
          >
            Contáctanos
          </NavLink>
          <NavLink
            to='/about'
            className='w-full px-4 py-2 hover:bg-teesaGreen hover:text-teesaBlueDark text-md block'
          >
            Nosotros
          </NavLink>
          {userAdmin == true ? (
            <NavLink
              to='/admin'
              className='w-full px-4 py-2 hover:bg-teesaGreen hover:text-teesaBlueDark text-md block'
            >
              Dashboard
            </NavLink>
          ) : (
            <div></div>
          )}
        </div>
      )}
    </div>
  );
}
