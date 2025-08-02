export const initialState = {
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: true,
    error: null
  };
  
  export const AUTH_ACTIONS = {
    LOGIN_START: 'LOGIN_START',
    LOGIN_SUCCESS: 'LOGIN_SUCCESS',
    LOGIN_FAILURE: 'LOGIN_FAILURE',
    LOGOUT: 'LOGOUT',
    CLEAR_ERROR: 'CLEAR_ERROR',
    SET_LOADING: 'SET_LOADING'
  };
  
  export const authReducer = (state, action) => {
    switch (action.type) {
      case AUTH_ACTIONS.LOGIN_START:
        return { ...state, isLoading: true, error: null };
      case AUTH_ACTIONS.LOGIN_SUCCESS:
        return { ...state, ...action.payload, isAuthenticated: true, isLoading: false };
      case AUTH_ACTIONS.LOGIN_FAILURE:
        return { ...state, user: null, token: null, isAuthenticated: false, isLoading: false, error: action.payload };
      case AUTH_ACTIONS.LOGOUT:
        return { ...state, user: null, token: null, isAuthenticated: false, isLoading: false };
      case AUTH_ACTIONS.CLEAR_ERROR:
        return { ...state, error: null };
      case AUTH_ACTIONS.SET_LOADING:
        return { ...state, isLoading: action.payload };
      default:
        return state;
    }
  };
  