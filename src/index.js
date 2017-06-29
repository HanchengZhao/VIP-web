import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
<<<<<<< HEAD
import './index.css';

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
=======
import registerServiceWorker from './registerServiceWorker';
import './style/index.css';
import { BrowserRouter } from 'react-router-dom'

ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
    , document.getElementById('root'));
registerServiceWorker();
>>>>>>> master
