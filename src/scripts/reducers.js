import { combineReducers } from 'redux';

import { Reducer as user } from './user';
import { Reducer as reservation } from './reservations';

export default combineReducers({
  user,
  reservation
});
