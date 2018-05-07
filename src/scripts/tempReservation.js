
const Actions = {};

Actions.LOCATION_CHANGE = "TMP_LOCATION_CHANGE";
Actions.locationChange = (newLocation) => {
  return {
    type: Actions.LOCATION_CHANGE,
    location: newLocation
  };
};

Actions.DATE_CHANGE = "TMP_DATE_CHANGE";
Actions.dateChange = (newDate) => {
  return {
    type: Actions.DATE_CHANGE,
    date: newDate
  };
};

Actions.TIME_CHANGE = "TMP_TIME_CHANGE";
Actions.timeChange = (newTime) => {
  return {
    type: Actions.TIME_CHANGE,
    time: newTime
  };
};

Actions.GUEST_COUNT_CHANGE = "TMP_COUNT_CHANGE";
Actions.guestCountChange = (newCount) => {
  return {
    type: Actions.GUEST_COUNT_CHANGE,
    count: newCount
  };
};

Actions.CLEAR = "TMP_CLEAR";
Actions.clear = () => {
  return {
    type: Actions.CLEAR
  };
};

Actions.trySubmit = (location, date, time, count) => {
  return (dispatch) => {
    
  };
};

let d = new Date();
let mo = d.getMonth() + 1;
mo = mo < 10 ? "0" + mo : mo;

const defaultState = {
  location: 1,
  date: `${d.getFullYear()}-${mo}-${d.getDate()}`,
  time: `18:00`,
  count: 2
};

const Reducer = (state=defaultState, action={ type: "NULL" }) => {
  switch (action.type) {
    case Actions.LOCATION_CHANGE : return Object.assign({}, state, { location: action.newLocation });
    case Actions.DATE_CHANGE : return Object.assign({}, state, { date: action.newDate });
    case Actions.TIME_CHANGE : return Object.assign({}, state, { time: action.newTime });
    case Actions.GUEST_COUNT_CHANGE : return Object.assign({}, state, { count: action.newCount });
    case Actions.CLEAR : 
    default :
      return state;
  }
};

export { Actions, Reducer };
