const Constants = {
};

const Actions = {};

// private

// public
Actions.USER_CHANGE = "CA_USER_CHANGE";
Actions.userChange = (newUser) => {
  return {
    type: Actions.USER_CHANGE,
    user: newUser
  };
};

Actions.EMAIL_CHANGE = "CA_EMAIL_CHANGE";
Actions.emailChange = (newEmail) => {
  return {
    type: Actions.EMAIL_CHANGE,
    email: newEmail
  };
};

Actions.PASS_CHANGE = "CA_PASS_CHANGE";
Actions.passChange = (newPass) => {
  return {
    type: Actions.PASS_CHANGE,
    pass: newPass
  };
};

Actions.FIRST_CHANGE = "CA_FIRST_CHANGE";
Actions.firstChange = (newFirst) => {
  return {
    type: Actions.FIRST_CHANGE,
    first: newFirst
  };
};

Actions.LAST_CHANGE = "CA_LAST_CHANGE";
Actions.lastChange = (newLast) => {
  return {
    type: Actions.LAST_CHANGE,
    last: newLast
  };
};

Actions.PHONE_CHANGE = "CA_PHONE_CHANGE";
Actions.phoneChange = (newPhone) => {
  return {
    type: Actions.PHONE_CHANGE,
    phone: newPhone
  };
};

Actions.LOCATION_CHANGE = "CA_LOCATION_CHANGE";
Actions.locationChange = (newLocation) => {
  return {
    type: Actions.LOCATION_CHANGE,
    location: newLocation
  };
};

Actions.SUBSCRIBE_CHANGE = "CA_SUBSCRIBE_CHANGE";
Actions.subscribeChange = (newSubscribe) => {
  return {
    type: Actions.SUBSCRIBE_CHANGE,
    subscribe: newSubscribe
  };
};

Actions.CODE_CHANGE = "CA_CODE_CHANGE";
Actions.codeChange = (newCode) => {
  return {
    type: Actions.CODE_CHANGE,
    code: newCode
  };
};

Actions.CLEAR = "CA_CLEAR_DATA";
Actions.clear = () => { 
  return {
    type: Actions.CLEAR
  };
};

// reducer
const defaultState = {
  user: "",
  pass: "",
  first: "",
  last: "",
  email: "",
  phone: "",
  location: 1,
  subscribe: true,
  code: ""
};

const Reducer = (state = defaultState, action = {type: "NULL"}) => {
  switch (action.type) {
    case Actions.USER_CHANGE :
      return Object.assign({}, state, {user: action.user});
    case Actions.EMAIL_CHANGE :
      return Object.assign({}, state, {email: action.email});
    case Actions.PASS_CHANGE :
      return Object.assign({}, state, {pass: action.pass});
    case Actions.FIRST_CHANGE :
      return Object.assign({}, state, {first: action.first});
    case Actions.LAST_CHANGE :
      return Object.assign({}, state, {last: action.last});
    case Actions.PHONE_CHANGE :
      return Object.assign({}, state, {phone: action.phone});
    case Actions.LOCATION_CHANGE :
      return Object.assign({}, state, {location: action.location});
    case Actions.SUBSCRIBE_CHANGE :
      return Object.assign({}, state, {subscribe: action.subscribe});
    case Actions.CODE_CHANGE :
      return Object.assign({}, state, { code: action.code });
    case Actions.CLEAR :
      return defaultState;
    default :
      return state;
  }
};

export default Constants;
export { Reducer, Actions };
