import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger'
import loginReducer from '../Reducers/loginReducer';

export default configureStore({
  reducer: {
    loginReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
});
