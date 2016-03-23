import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import DevTools from './redux/DevTools'
import configureStore from './redux/configureStore'

import AppLayout from './views/AppLayout';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <div>
      <AppLayout />
      <DevTools />
    </div>
  </Provider>,
  document.getElementById('root')
);
