import { Actions as CreateAccount } from './createAccount';

const Constants = {
  STATE_INIT: "AWS_INIT",       // initializing
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

var AWS;
var _provider;
var _storage;
var _username;
var _password;

Actions.BEGIN_AUTH = "AWS_BEGIN_AUTH";
const beginAuth = (username) => {
  return {
    type: Actions.BEGIN_AUTH,
    username: username
  };
};

Actions.READY = "AWS_READY";
const ready = () => {
  return {
    type: Actions.READY
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
    
    let params = {
      ClientId: "4efjjmcjfc8ee0qrlrnhl9d0r6",
      ConfirmationCode: code,
      Username: username
    };
    _provider.confirmSignUp(params, (err, data) => {
      if (err) {
        dispatch(onVerifyError(err));
        
      } else {
        dispatch(Actions.signin(_username, _password));
      }
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
const onSignin = (access, expires, id) => {
  return {
    type: Actions.ON_SIGNIN,
    access: access,
    expires: expires,
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
    _deleteToken();
    dispatch(onSignout());
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
    
    let params = {
      AuthFlow: "USER_PASSWORD_AUTH",
      ClientId: "4efjjmcjfc8ee0qrlrnhl9d0r6",
      AuthParameters: {
        "USERNAME": username,
        "PASSWORD": password
      }
    };
    _provider.initiateAuth(params, (err, data) => {
      if (err) {
        dispatch(authError(err));
        
      } else {
        _saveToken(data.AuthenticationResult.RefreshToken);
        dispatch(onSignin(
          data.AuthenticationResult.AccessToken,
          data.AuthenticationResult.ExpiresIn,
          data.AuthenticationResult.IdToken));
      }
    });
  };
};

const refreshSignin = (token) => {
  return (dispatch) => {
    dispatch(beginAuth());
    
    let params = {
      AuthFlow: "REFRESH_TOKEN_AUTH",
      ClientId: "4efjjmcjfc8ee0qrlrnhl9d0r6",
      AuthParameters: {
        "REFRESH_TOKEN": token
      }
    };
    _provider.initiateAuth(params, (err, data) => {
      if (err) {
        dispatch(authError(err));
        
      } else {
        dispatch(onSignin(
          data.AuthenticationResult.AccessToken,
          data.AuthenticationResult.ExpiresIn,
          data.AuthenticationResultIdToken));
      }
    });
  };
};

Actions.signup = (user, pass, first, last, email, phone, location, subscribe) => {
  return (dispatch) => {
    dispatch(beginSignup(user, pass));
    
    let params = {
      ClientId: "4efjjmcjfc8ee0qrlrnhl9d0r6",
      Username: user,
      Password: pass,
      UserAttributes: [
        {
          Name: "email",
          Value: email
        },
        {
          Name: "name",
          Value: first
        },
        {
          Name: "family_name",
          Value: last
        },
        {
          Name: "phone_number",
          Value: phone
        }/*,
        {
          Name: "preffered_location",
          Value: `${location}`
        }*/
      ]
    };
    _provider.signUp(params, (err, data) => {
      if (err) {
        console.error(err);
        dispatch(signupError(err));
        
      } else {
        dispatch(waitCode());
      }
    });
  };
};

Actions.init = () => {
  return (dispatch) => {
    AWS = window.AWS;
    
    AWS.config.region = "us-east-2";
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
      IdentityPoolId: "us-east-2:4f5f038d-5e55-4197-9be2-3cf97deefae3"
    });
    
    _provider = new AWS.CognitoIdentityServiceProvider();
    
    _storage = window.localStorage;
    if (_storage) {
      let refreshToken = _storage.getItem("_AWS_REFRESH_TOKEN_");
      if (refreshToken) {
        dispatch(refreshSignin(refreshToken));
      }
    } else {
      dispatch(ready());
    }
  };
};

const _saveToken = (refreshToken) => {
  if (_storage) {
    _storage.setItem("_AWS_REFRESH_TOKEN_", refreshToken);
  }
};

const _deleteToken = () => {
  if (_storage) {
    _storage.removeItem("_AWS_REFRESH_TOKEN_");
  }
};

const Reducer = (state = { state: Constants.STATE_INIT}, action = { type: "NULL" }) => {
  switch (action.type) {
    case Actions.BEGIN_AUTH :
      return Object.assign({}, state, {
        state: Constants.STATE_AUTHING,
        username: action.username
      });
    case Actions.ON_SIGNIN :
      _username = null;
      _password = null;
      return Object.assign({}, state, {
        state: Constants.STATE_AUTHED,
        access: action.access,
        expires: action.expires,
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
      _username = action.username;
      _password = action.password;
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
        type: Constants.STATE_SIGNUP_VERIFY
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
    case Actions.READY :
      return Object.assign({}, state, {
        state: Constants.STATE_READY
      });
    default :
      return state;
  }
};

export default Constants;
export { Actions, Reducer };