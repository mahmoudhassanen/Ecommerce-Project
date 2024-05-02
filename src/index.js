import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './index.css';
import App from './App';
import TokenContextProvider from './Context/TokenContext';
import {QueryClient , QueryClientProvider  } from 'react-query';
import {ReactQueryDevtools} from '../node_modules/react-query/es/devtools/devtools'
import CartContextProvider from './CartContext/CartContext';
const root = ReactDOM.createRoot(document.getElementById('root'));

let query = new QueryClient() 

root.render(
    <CartContextProvider> 
    <QueryClientProvider client={query}>
   <TokenContextProvider> 
    <App />
    </TokenContextProvider>
    <ReactQueryDevtools  />
    </QueryClientProvider>
    </CartContextProvider>
   
);

