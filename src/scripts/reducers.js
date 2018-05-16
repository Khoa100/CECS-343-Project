import { combineReducers } from 'redux';

import { Reducer as reservations } from './reservations';
import { Reducer as createAccount } from './createAccount';
import { Reducer as aws } from './aws';

export default combineReducers({
  reservations,
  createAccount,
  aws
});
