// src/redux/actions/userActions.js
import axios from 'axios';

export const USER_LOGIN = 'USER_LOGIN';
export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS';
export const USER_LOGIN_FAILURE = 'USER_LOGIN_FAILURE';
export const USER_LOGIN_START = 'USER_LOGIN_START';

export const loginUser = () => {
  return (dispatch) => {
    dispatch({ type: USER_LOGIN_START });

    // Redirect the user to Reddit's OAuth2 login page
    window.location.href = `https://www.reddit.com/api/v1/authorize?client_id=${process.env.REACT_APP_CLIENT_ID}&response_type=code&state=${process.env.REACT_APP_STATE}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}&duration=permanent&scope=read`;
  };
};

export const handleRedirect = () => {
  return async (dispatch) => {
    // Extract the authorization code from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    if (code) {
      try {
        // Exchange the authorization code for an access token
        const response = await axios.post('https://www.reddit.com/api/v1/access_token', {
          grant_type: 'authorization_code',
          code: code,
          redirect_uri: process.env.REACT_APP_REDIRECT_URI,
        }, {
          headers: {
            'Authorization': `Basic ${btoa(`${process.env.REACT_APP_CLIENT_ID}:${process.env.REACT_APP_CLIENT_SECRET}`)}`,
          },
        });

        // Dispatch an action with the access token
        dispatch({ type: USER_LOGIN_SUCCESS, payload: response.data.access_token });
      } catch (error) {
        dispatch({ type: USER_LOGIN_FAILURE, payload: error.message });
      }
    }
  };
};