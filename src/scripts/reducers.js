import { combineReducers } from 'redux';

import { Reducer as reservation } from './reservations';
import { Reducer as createAccount } from './createAccount';
import { Reducer as tempReservation } from './tempReservation';
import { Reducer as aws } from './aws';

export default combineReducers({
  reservation,
  createAccount,
  tempReservation,
  aws
});
