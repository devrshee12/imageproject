import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Image from './components/SpecificImage';
import reportWebVitals from './reportWebVitals';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import "./bootstrap.min.css"
import { Provider } from 'react-redux';
import store from './features/store';
import ImageDesc from './components/ImageDesc';
import History from './components/History';


const appRouter = createBrowserRouter([
  {
    path:"/",
    element: <App/>
  },
  {
    path:"/image/:imageId",
    element: <ImageDesc/> 
  },
  {
    path:"/history",
    element:<History/>
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>

    <RouterProvider router={appRouter}/>

  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
