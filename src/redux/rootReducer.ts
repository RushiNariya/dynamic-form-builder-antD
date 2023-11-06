import { combineReducers } from 'redux';

import authReducer from './auth/reducer';
import commonReducer from './common/reducer';
import formBuilderReducer from './formBuider/reducer';
import userReducer from './users/reducer';

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  formBuilder: formBuilderReducer,
  common: commonReducer,
});

export default rootReducer;
