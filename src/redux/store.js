import { createStore, applyMiddleware, compose } from "redux";
import { createBrowserHistory } from "history";
// import { routerReducer, routerMiddleware } from 'react-router-redux';
// import thunk from 'redux-thunk';
import createSagaMiddleware from "redux-saga";
import rootReducers from "../redux/reducers";
import rootSaga from "../redux/sagas";

const history = createBrowserHistory();
const sagaMiddleware = createSagaMiddleware();
// const routeMiddleware = routerMiddleware(history);
const middlewares = [sagaMiddleware];

const composeEnhancers =
  typeof window === "object" &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
  process.env.NODE_ENV !== "production"
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      })
    : compose;

const store = createStore(
  rootReducers,
  composeEnhancers(applyMiddleware(...middlewares))
);
sagaMiddleware.run(rootSaga);
export { store, history };
