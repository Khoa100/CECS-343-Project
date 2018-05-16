import { Auth, API } from 'aws-amplify';

/* Redux Actions, Action Creators, and Thunks for reservation records */
const Constants = {
  STATE_POLLING: "STATE_POLLING",
  STATE_POLL_ERROR: "STATE_POLL_ERROR",
  STATE_SUBMITTING: "STATE_SUBMIT",
  STATE_SUBMIT_ERROR: "STATE_SUBMIT_ERROR",
  STATE_READY: "STATE_READY",
  RES_LOADING: "RES_LOADING",
  RES_ERROR: "RES_ERROR",
  RES_READY: "RES_READY",
  RES_DNE: "RES_DNE",
  RES_SUBMITTING: "RES_SUBMITTING"
};

const Actions = {};

// Private
Actions.RES_LOADING = "RES_RES_LOADING";
const resLoading = (date) => {
  return {
    type: Actions.RES_LOADING,
    date: date
  };
};

Actions.RES_LOADED = "RES_RES_LOADED";
const resLoaded = (date, time, location, party) => {
  return {
    type: Actions.RES_LOADED,
    date: date,
    time: time,
    location: location,
    party: party
  };
}

Actions.RES_LOAD_ERROR = "RES_RES_LOAD_ERROR";
const resLoadError = (date, err) => {
  return {
    type: Actions.RES_LOAD_ERROR,
    date: date,
    err: err
  };
};

Actions.RES_NOT_FOUND = "RES_RES_NOT_FOUND";
const resNotFound = (date) => {
  return {
    type: Actions.RES_NOT_FOUND,
    date: date
  };
};

Actions.RES_DELETED = "RES_DELETED";
const resDeleted = (date) => {
  return {
    type: Actions.RES_DELETED,
    date: date
  };
};

Actions.BEGIN_POLLING = "RES_BEGIN_POLL";
const beginPolling = () => {
  return {
    type: Actions.BEGIN_POLLING
  };
};

Actions.POLL_ERROR = "RES_POLL_ERROR";
const pollError = () => {
  return {
    type: Actions.POLL_ERROR
  };
};

Actions.SUBMIT_ERROR = "RES_SUBMIT_ERROR";
const submitError = () => {
  return {
    type: Actions.SUBMIT_ERROR
  };
};

Actions.READY = "RES_READY";
const ready = (date) => {
  return {
    type: Actions.READY,
    date: date
  };
};

Actions.BEGIN_SUBMIT = "RES_SUBMIT";
const beginSubmit = (date) => {
  return {
    type: Actions.BEGIN_SUBMIT,
    date: date
  };
};

// Public
Actions.submitReservation = (date, time, location, party) => {
  return (dispatch) => {
    return new Promise((res, rej) => {
      Auth.currentSession().then((sess) => {
        //console.log(sess);

        let apiName = "cecs343";
        let path = "/makeReservation";
        let init = {
          body: {owner: sess.idToken.payload.sub, date, time, location, party, duration: 3600}
        };
        dispatch(beginSubmit());
        API.post(apiName, path, init).then((data) => {
          dispatch(ready());
          res();

        }).catch((err) => {
          console.log(err);
          dispatch(submitError());
          rej();
        });
      });
    });
  };
};

Actions.getReservation = (date) => {
  return (dispatch) => {
    dispatch(resLoading(date));
    
    Auth.currentSession().then((sess) => {
      let apiName = "cecs343";
      let path = "/getreservation";
      let init = {
        headers: {"x-app-owner": sess.idToken.payload.sub, "x-app-date": `${date}`}
      };
      API.get(apiName, path, init).then((data) => {
        if (data.err) {
          dispatch(resNotFound(date));

        } else {
          dispatch(resLoaded(data.date, data.time, data.location, data.party));
        }
      }).catch((err) => {
        console.log(err);
        dispatch(resLoadError(date, err));
      });
    });
  };
};

Actions.listReservations = (start, end) => {
  return (dispatch) => {
    dispatch(beginPolling());
    
    Auth.currentSession().then(sess => {
      let apiName = "cecs343";
      let path = "/listReservations";
      let init = {
        headers: {"x-app-owner": sess.idToken.payload.sub, "x-app-start": `${start}`, "x-app-end": `${end}`}
      }
      API.get(apiName, path, init).then((data) => {
        dispatch(ready());
        for (let i = 0; i < data.items.length; i++) {
          let res = data.items[i];
          dispatch(resLoaded(res.date, res.time, res.location, res.party));
        }

      }).catch((err) => {
        console.log(err);
        dispatch(pollError());
      });
    });
  }
}

Actions.getAvailability = (start, location) => {
  return (dispatch) => {
    dispatch(beginPolling());
    
    let end = start + (24 * 3600 * 1000); // start + 24 hours
    
    let apiName = "cecs343";
    let path = "/listReservations";
    let init = {
      headers: {},
      queryStringParameters: {start, end, location}
    };
    API.get(apiName, path, init).then((data) => {
      // TODO: store availability information
      
    }).catch((err) => {
      console.log(err);
      dispatch(pollError())
    });
  };
}

Actions.deleteReservation = (date) => {
  return (dispatch) => {
    let apiName = "cecs343";
    let path = "/deletereservation";
    let init = {
      headers: {},
      queryStringParameters: {owner: Auth.currentSession().idToken, date}
    };
    API.delete(apiName, path, init).then((data) => {
      dispatch(resDeleted(date));
      
    }).catch((err) => {
      console.log(err);
      dispatch(resLoadError());
    });
  };
};

Actions.updateReservation = (date, time, location, party) => {
  return (dispatch) => {
    return new Promise((res, rej) => {
      Auth.currentSession().then((sess) => {
        let apiName = "cecs343";
        let path = "/updatereservation";
        let init = {
          body: {
            owner: sess.idToken.payload.sub,
            date, time, location, party, duration: 3600
          }
        };
        dispatch(beginSubmit());
        API.post(apiName, path, init).then((data) => {
          dispatch(ready());
          res();
          
        }).catch((err) => {
          console.log(err);
          dispatch(submitError());
          rej();
        });
      });
    });
  };
};

const Reducer = (state = {state: Constants.STATE_READY, reservations: []}, action = {type: "NULL"}) => {
  switch (action.type) {
    case Actions.RES_LOADING : {
        let newState = Object.assign({}, state, {
          [action.date]: {
            date: action.date,
            state: Constants.RES_LOADING
          }
        });
        if (!state.reservations.includes(action.date)) newState.reservations.push(action.date);
        return newState;
      }
    case Actions.RES_LOADED : {
        let newState = Object.assign({}, state, {
          [action.date]: Object.assign({}, state[action.date], {
            state: Constants.RES_READY,
            time: action.time,
            location: action.location,
            party: action.party
          })
        });
        if (!state.reservations.includes(action.date)) newState.reservations.push(action.date);
        return newState;
      }
    case Actions.RES_LOAD_ERROR :
      return Object.assign({}, state, {
        [action.date]: Object.assign({}, state[action.date], {
          state: Constants.RES_ERROR
        })
      });
    case Actions.RES_NOT_FOUND :
      return Object.assign({}, state, {
        [action.date]: Object.assign({}, state[action.date], {
          state: Constants.RES_DNE
        })
      });
    case Actions.RES_DELETED : {
        let newState = Object.assign({}, state);
        delete newState[action.date];
        newState.reservations.splice(newState.reservations.indexOf(action.date), 1);
        return newState;
      }
    case Actions.BEGIN_POLLING :
      return Object.assign({}, state, {
        state: Constants.STATE_POLLING
      });
    case Actions.POLL_ERROR :
      return Object.assign({}, state, {
        state: Constants.STATE_POLL_ERROR
      });
    case Actions.READY :
      if (action.date) {
        return Object.assign({}, state, {
          [action.date]: Object.assign({}, state[action.date], {
            state: Constants.RES_READY
          })
        });
      } else {
        return Object.assign({}, state, {
          state: Constants.STATE_READY
        });
      }
    case Actions.BEGIN_SUBMIT :
      if (action.date) {
        return Object.assign({}, state, {
          [action.date]: Object.assign({}, state[action.date], {
            state: Constants.RES_SUBMITTING
          })
        });
      } else {
        return Object.assign({}, state, {
          state: Constants.STATE_READY
        });
      }
    case Actions.SUBMIT_ERROR :
      return Object.assign({}, state, {
        state: Constants.STATE_SUBMIT_ERROR
      });
    default :
      return state;
  }
};

export { Constants as default, Actions, Reducer };