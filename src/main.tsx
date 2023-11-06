import './assets/css/index.css';

import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import ReactDOM from 'react-dom';
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import App from './App';
import store from './redux/store';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <DndProvider backend={HTML5Backend}>
          <Toaster position="top-center" gutter={10} />
          <Routes>
            <Route path="/*" element={<App />} />
          </Routes>
        </DndProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root'),
);
