import { useEffect } from 'react';
import { Route, Routes, useLocation, Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getUserDataFromCookie } from './features/reduxReducer/userSlice';
import Home from './Components/Home/Home';
import Navbar from './Components/Navbar/Navbar';
import Landing from './views/Landing/Landing';
import Detail from './Components/Detail/Detail';
import Login from './Components/Login/Login';
import Services from './views/Services/Services';
import Contact from './Components/Contact/Contact';
import Mercado from './Components/Mercado/Mercado';
import About from './views/About/AboutUs/AboutUs';
import AboutDevs from './views/About/AboutDevs';
import Register from './views/Register/Register';
import Error404 from './views/Error404/Error404';
import CheckoutSucess from './views/Checkout/CheckoutSucess';
import CheckoutPending from './views/Checkout/CheckoutPending';
import CheckoutFailed from './views/Checkout/CheckoutFailed';
import UserProfile from './views/UserProfile/UserProfile';
import CreateProducts from './Components/Dashboard/CreateProducts';
import Dashboard from './Components/Dashboard/Dashboard';
import Cart from './Components/Carrito/Cart';
import EditProducts from './Components/Dashboard/EditProducts';
import Footer from './views/Footer/Footer';
import Metrics from './Components/Dashboard/Metrics';
import Users from './Components/Dashboard/Users';
import { Helmet } from 'react-helmet';
import FormUserData from './Components/Carrito/FormUserData';
import Summary from './Components/Carrito/Summary';

function App() {
  const location = useLocation();
  const { pathname } = location;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserDataFromCookie());
  }, [dispatch]);

  // Lista de rutas donde se mostrará el Footer
  const visibleFooterRoutes = ['/', '/home', '/about', '/services'];

  const hideNavbar = pathname === '/' || pathname === '/error404';
  const hideFooter = !visibleFooterRoutes.includes(pathname); // Verificar si la ruta actual no está en la lista de rutas visibles para el Footer

  return (
    <div>
      {/* Inicio Metadata */}
      <Helmet>
        <title>
          Teesa - Venta de Repuestos y Servicios de Equipos Alimenticios
        </title>
        {/* <link
          rel='icon'
          href='./img/SVGs/TeesaAll.svg'
          type='image/svg+xml'
        /> */}
        <meta
          name='description'
          content='Tu tienda de venta de repuestos y servicios de equipos alimenticios en Colombia.'
        />
        <meta
          name='keywords'
          content='Teesa, equipos alimenticios, repuestos, servicios, Colombia, tienda, e-commerce, hornos, refrigeradores'
        />
        <meta
          name='author'
          content='Teesa S.A.S'
        />
        <meta
          httpEquiv='Content-Language'
          content='es'
        />
        <link
          rel='canonical'
          href='https://www.teesa.online/'
        />

        {/* Redes sociales */}
        <meta
          property='og:title'
          content='Teesa - Venta de Repuestos y Servicios de Equipos Alimenticios'
        />
        <meta
          property='og:description'
          content='Tu tienda de venta de repuestos y servicios de equipos alimenticios en Colombia.'
        />
        {/* Reemplaza URL_DE_LA_IMAGEN_DESTACADA con la URL de la imagen que deseas mostrar */}
        {/* <meta
          property='og:image'
          content='./img/imgs/tech.jpg'
        /> */}
        <meta
          property='og:url'
          content='https://www.teesa.online/'
        />
      </Helmet>
      {/* Final Metada  */}
      {/* Página */}
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route
          path='/'
          element={<Landing />}
        />
        <Route
          path='/home'
          element={<Home />}
        />
        <Route
          path='/home/:id'
          element={<Detail />}
        />
        <Route
          path='/login'
          element={<Login />}
        />
        <Route
          path='/services'
          element={<Services />}
        />
        <Route
          path='/aboutdevs'
          element={<AboutDevs />}
        />
        <Route
          path='/about'
          element={<About />}
        />
        <Route
          path='/contact'
          element={<Contact />}
        />
        <Route
          path='/signup'
          element={<Register />}
        />
        <Route
          path='/error404'
          element={<Error404 />}
        />
        <Route
          path='/mercado'
          element={<Mercado />}
        />
        <Route
          path='/profile'
          element={<UserProfile />}
        />
        <Route
          path='*'
          element={<Navigate to='/error404' />}
        />
        <Route
          path='/carrito'
          element={<Cart />}
        />
        <Route
          path='/checkoutsuccess'
          element={<CheckoutSucess />}
        />
        <Route
          path='/checkoutpending'
          element={<CheckoutPending />}
        />
        <Route
          path='/checkoutfailed'
          element={<CheckoutFailed />}
        />
        <Route
          path='/admin'
          element={<Dashboard />}
        />
        <Route
          path='/carrito/userform/:id'
          element={<FormUserData />}
        />
        <Route
          path='/carrito/summary/:id'
          element={<Summary />}
        />
        {/* ADMIN */}
        <Route
          path='/dashboard/editproduct/:id'
          element={<EditProducts />}
        />
        <Route
          path='/admin/createproduct'
          element={<CreateProducts />}
        />
        <Route
          path='/admin/users'
          element={<Users />}
        />
        <Route
          path='/admin/metrics'
          element={<Metrics />}
        />
      </Routes>
      {!hideFooter && <Footer />}
    </div>
  );
}

export default App;
