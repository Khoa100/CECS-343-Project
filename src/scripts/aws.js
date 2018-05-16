import { Auth } from 'aws-amplify';

import { Actions as CreateAccount } from './createAccount';

const Constants = {
  STATE_SIGNUP: "AWS_SIGNUP",   // creating account
  STATE_SIGNUP_ERROR: "AWS_SIGNUP_ERROR", // error creating account
  STATE_SIGNUP_WAIT_CODE: "AWS_SIGNUP_CODE", // awaiting
  STATE_SIGNUP_VERIFY: "AWS_SIGNUP_VERIFY", // verifying code
  STATE_SIGNUP_CODE_ERROR: "AWS_SIGNUP_CODE_ERROR", // code rejected?
  STATE_AUTHING: "AWS_AUTHING", // signing in
  STATE_AUTHED: "AWS_AUTHED",   // signed in
  STATE_AUTH_FAILED: "AWS_AUTH_FAILED",   // signin failed
  STATE_READY: "AWS_READY",     // not signed in
  STATE_ERROR: "AWS_ERROR",     // AWS API returned an error
};

const Actions = {};

Actions.READY = "AWS_READY";
const ready = () => {
  return {
    type: Actions.READY
  };
}

Actions.BEGIN_AUTH = "AWS_BEGIN_AUTH";
const beginAuth = (username) => {
  return {
    type: Actions.BEGIN_AUTH,
    username: username
  };
};

Actions.BEGIN_SIGNUP = "AWS_BEGIN_SIGNUP";
const beginSignup = (username, password) => {
  return {
    type: Actions.BEGIN_SIGNUP,
    username: username,
    password: password
  };
};

Actions.WAIT_CODE = "AWS_WAIT_CODE";
const waitCode = () => {
  return {
    type: Actions.WAIT_CODE
  };
};

Actions.VERIFY_CODE = "AWS_VERIFY_CODE";
const onVerifying = () => {
  return {
    type: Actions.VERIFY_CODE
  };
}

Actions.VERIFY_ERROR = "AWS_VERIFY_ERROR";
const onVerifyError = (e) => {
  return {
    type: Actions.VERIFY_ERROR,
    error: e
  };
}

Actions.verifyCode = (code, username) => {
  return (dispatch) => {
    dispatch(onVerifying());
    
    Auth.confirmSignUp(username, code).then((data) => {
      console.log(data);
      // sign in
      dispatch(ready());
      
    }).catch((err) => {
      console.log(err);
      dispatch(onVerifyError(err));
    });
  }
}

Actions.SIGNUP_ERROR = "AWS_SIGNUP_ERROR";
const signupError = (e) => {
  return {
    type: Actions.SIGNUP_ERROR,
    error: e
  };
};

Actions.ON_SIGNIN = "AWS_ON_SIGNIN";
const onSignin = (access, refresh, id) => {
  return {
    type: Actions.ON_SIGNIN,
    access: access,
    refresh: refresh,
    id: id
  };
};

Actions.ON_SIGNOUT = "AWS_ON_SIGNOUT";
const onSignout = () => {
  return {
    type: Actions.ON_SIGNOUT
  };
};

Actions.signout = () => {
  return (dispatch) => {
    Auth.signOut().then((data) => {
      dispatch(onSignout());
      
    }).catch((err) => {
      dispatch(error(err));
    });
  }
};

Actions.ON_ERROR = "AWS_ERROR";
const error = (e) => {
  return {
    type: Actions.ON_ERROR,
    error: e
  };
}

Actions.AUTH_ERROR = "AWS_AUTH_ERROR";
const authError = (e) => {
  return {
    type: Actions.AUTH_ERROR,
    error: e
  };
};

Actions.signin = (username, password) => {
  return (dispatch) => {
    dispatch(CreateAccount.clear());
    dispatch(beginAuth(username));
    console.log(`signing in as ${username}`);
    
    Auth.signIn(username, password).then((data) => {
      let session = Auth.currentSession();
      dispatch(onSignin(session.accessToken, session.refreshToken, session.idToken));
      
    }).catch((err) => {
      dispatch(authError(err));
    });
  };
};

Actions.signup = (username, password, name, family_name, email, phone_number, location, subscribe) => {
  return (dispatch) => {
    dispatch(beginSignup(username, password));
    
    Auth.signUp({
      username,
      password,
      attributes: {
        email, phone_number, name, family_name
      }
    }).then((data) => {
      dispatch(waitCode());
      
    }).catch((err) => {
      console.error(err);
      dispatch(signupError(err));
    });
  };
};

const Reducer = (state = { state: Constants.STATE_READY}, action = { type: "NULL" }) => {
  switch (action.type) {
    case Actions.READY :
      return Object.assign({}, state, {
        state: Constants.STATE_READY
      });
    case Actions.BEGIN_AUTH :
      return Object.assign({}, state, {
        state: Constants.STATE_AUTHING,
        username: action.username
      });
    case Actions.ON_SIGNIN :
      return Object.assign({}, state, {
        state: Constants.STATE_AUTHED,
        access: action.access,
        refresh: action.refresh,
        id: action.id,
        username: null,
        password: null
      });
    case Actions.ON_SIGNOUT :
      return Object.assign({}, state, {
        state: Constants.STATE_READY,
        access: null,
        expires: null,
        id: null
      });
    case Actions.BEGIN_SIGNUP :
      return Object.assign({}, state, {
        state: Constants.STATE_SIGNUP,
        username: action.username
      });
    case Actions.WAIT_CODE :
      return Object.assign({}, state, {
        state: Constants.STATE_SIGNUP_WAIT_CODE
      });
    case Actions.VERIFY_CODE :
      return Object.assign({}, state, {
        state: Constants.STATE_SIGNUP_VERIFY
      });
    case Actions.VERIFY_ERROR :
      return Object.assign({}, state, {
        state: Constants.STATE_SIGNUP_CODE_ERROR,
        error: state.error
      });
    case Actions.SIGNUP_ERROR :
      return Object.assign({}, state, {
        state: Constants.STATE_SIGNUP_ERROR,
        error: state.error
      });
    case Actions.ON_ERROR :
      return Object.assign({}, state, {
        state: Constants.STATE_ERROR,
        error: action.error
      });
    case Actions.AUTH_ERROR :
      return Object.assign({}, state, {
        state: Constants.STATE_AUTH_FAILED,
        error: state.error
      });
    default :
      return state;
  }
};

export default Constants;
export { Actions, Reducer };