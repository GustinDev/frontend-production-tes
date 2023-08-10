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
            content='Teesa S.A.S, tu tienda de venta de repuestos y servicios de equipos alimenticios en Colombia. Ubicados en Cali, Colombia.'
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
            href='https://www.teesa.online/assets/TeesaLogo-911954d6.svg'
            type='image/svg+xml'
          />
          <meta
            property='og:url'
            content='https://www.teesa.online/'
          />
          <meta
            property='og:url'
            content='https://www.linkedin.com/in/teesa-tecnologia-en-equipos-alimenticios-sas-076696230/?originalSubdomain=co'
          />
          <meta
            property='og:url'
            content='https://www.facebook.com/profile.php?id=100068661421832&mibextid=ZbWKwL'
          />
          <meta
            property='og:url'
            content='https://www.instagram.com/teesa.tec/?igshid=YmMyMTA2M2Y%3D'
          />
        </Helmet>
        {/* Final Metada  */}
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
