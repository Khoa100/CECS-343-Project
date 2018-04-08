/* Redux Actions, Action Creators, and Thunks for user state */
const Constants = {
  STATE_AUTHING: "STATE_AUTHING", // signing in
  STATE_AUTHED: "STATE_AUTHED",   // signed in
  STATE_FAILED: "STATE_FAILED",   // signin failed
  STATE_DEAUTH: "STATE_DEAUTH",   // signing out
  STATE_UNAUTH: "STATE_UNAUTH"    // signed out
};

const Actions = {};

// Private
const ON_LOGIN_STATE_CHANGE = "ON_LOGIN_STATE_CHANGE";
const onLoginStateChange = (state) => {
  return {
    type: ON_LOGIN_STATE_CHANGE,
    newState: state
  };
};

const ON_SIGN_OUT = "ON_SIGN_OUT";
const onSignOut = () => {
  return { type: ON_SIGN_OUT };
};

const ON_SIGN_IN = "ON_SIGN_IN";
const onSignIn = (/* authentication details? */) => {
  return {
    type: ON_SIGN_IN
    /* { authentication details? */
  };
}

// Public
const trySignIn = (username, password) => {
  return (dispatch) => {
    dispatch(onLoginStateChange(Constants.STATE_AUTHING));
    
    // TODO: attempt to login
    
    dispatch(onSignIn(/* authentication details? */));
  };
};
Actions.trySignIn = trySignIn;

const signOut = () => {
  return (dispatch) => {
    dispatch(onLoginStateChange(Constants.STATE_DEAUTH));
    
    // TODO: sign out
    
    dispatch(onSignOut());
  };
};
Actions.signOut = signOut;

const Reducer = (state = {state: Constants.STATE_UNAUTH}, action = {type: "NULL"}) => {
  switch (action.type) {
    case ON_SIGN_IN :
      return Object.assign({}, state, {
        state: Constants.STATE_AUTHED
        // authentication details?
      });
    case ON_SIGN_OUT :
      return Object.assign({}, state, {
        state: Constants.STATE_UNAUTH
        // nullify authentication details
      });
    case ON_LOGIN_STATE_CHANGE :
      return Object.assign({}, state, {
        
      });
    case "NULL" :
      // check for persistent login
      return state;
    default :
      return state;
  }
}

export default Constants;
export { Actions, Reducer };
