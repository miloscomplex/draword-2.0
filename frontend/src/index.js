import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import App from './App';
import rootReducer from './redux/reducers/rootReducer';
import { Provider } from 'react-redux';
import { compose, applyMiddleware,createStore } from 'redux';
import thunk from 'redux-thunk'

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(rootReducer, composeEnhancer(applyMiddleware(thunk))
)

ReactDOM.render(
  <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
