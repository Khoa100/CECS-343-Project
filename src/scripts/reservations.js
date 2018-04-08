/* Redux Actions, Action Creators, and Thunks for reservation records */
const Constants = {
  
};

const Actions = {};

// Private
const ON_RES_LOAD = "ON_RES_LOAD";
const onResLoad = (/* reservation details */) => {
  
};

// Public
const loadReservation = () => {
  return (dispatch) => {
    
  };
};

const Reducer = (state = {reservations: []}, action = {type: "NULL"}) => {
  switch (action.type) {
    case ON_RES_LOAD :
      return Object.assign({}, state, {
        
      });
    default :
      return state;
  }
};

export { Constants as default, Actions, Reducer };