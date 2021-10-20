import {createStore, combineReducers} from 'redux';
import donationPhotosReducer from '../reducers/donationPhotosReducer';

const rootReducer = combineReducers({donationPhotosReducer});

const configureStore = () => {
  return createStore(rootReducer);
};

export default configureStore;
