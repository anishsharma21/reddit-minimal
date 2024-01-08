// src/redux/reducers/userReducer.js
import { USER_LOGIN_SUCCESS, USER_LOGIN_FAILURE, USER_LOGIN_START } from '../actions/userActions';

const initialState = {
    accessToken: null,
    error: null,
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case USER_LOGIN_START:
        return {
          ...state,
          error: null,
        };
      case USER_LOGIN_SUCCESS:
        return {
          ...state,
          accessToken: action.payload,
          error: null,
        };
      case USER_LOGIN_FAILURE:
        return {
          ...state,
          error: action.payload,
        };
      default:
        return state;
    }
  };

export default userReducer;