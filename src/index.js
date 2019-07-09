import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

// store stuff
import { createStore, applyMiddleware, compose } from "redux";
// create saga
import createSagaMiddleware from "redux-saga";
// provider
import { Provider } from "react-redux";

// switch
import { reducer } from "./redux";
// 1 flow entry
import { watcherSaga } from "./saga";

const sagaMiddleware = createSagaMiddleware();

// dev tool
const reduxDevTools =
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

// store: reducer + saga + dev tool
let store = createStore(
  reducer,
  compose(applyMiddleware(sagaMiddleware), reduxDevTools)
);

// start to listen 1 flow
sagaMiddleware.run(watcherSaga);

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
