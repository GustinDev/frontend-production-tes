import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
//React Router Dom
import { BrowserRouter } from 'react-router-dom';
//Redux
import { store } from './app/store';
import { Provider } from 'react-redux';
import { Helmet } from 'react-helmet';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        {/* Inicio Metadata */}
        <Helmet>
          <title>Teesa - Repuestos y Equipos Alimenticios</title>

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

          <link
            rel='icon'
            href='/img/SVGs/TeesaAll.svg'
            type='image/svg+xml'
          />
          {/* <meta
            property='og:url'
            content='https://www.teesa.online/'
          /> */}
        </Helmet>
        {/* Final Metada  */}
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
