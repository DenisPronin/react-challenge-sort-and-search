import thunk from 'redux-thunk'
import rootReducer from './rootReducer'

import {
  applyMiddleware,
  compose,
  createStore
} from 'redux'

export default function configureStore(initialState) {
  const middleware = applyMiddleware(thunk)

  let createStoreWithMiddleware;

  if (__DEBUG__) {
    createStoreWithMiddleware = compose(
      middleware,
      require('./DevTools').default.instrument()
    )
  }
  else {
    createStoreWithMiddleware = compose(
      middleware
    )
  }

  const store = createStoreWithMiddleware(createStore)(
    rootReducer, initialState
  );

  return store;
}
