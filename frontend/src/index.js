import React from 'react';
import ReactDOM from 'react-dom';

// import reportWebVitals from './reportWebVitals';
import 'semantic-ui-css/semantic.min.css';

import Create from "./components/create"
import Read from "./components/read"
import Update from './components/update';

import { BrowserRouter, Routes, Route } from "react-router-dom";


ReactDOM.render(
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Read />} />
          <Route path="create" element={<Create />} />
          <Route path="update/:code" element={<Update />} />
      </Routes>
    </BrowserRouter>,
  document.getElementById('root')
);

// reportWebVitals();