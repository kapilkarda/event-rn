import * as ActionTypes from '../constants/ActionTypes'

const initialState = {
    isLogged: false,
    hasError : false,
    isLoading: false,
    email: '',
  password: '',
  logindata:'',
  loginDatastatus:'',
  loginDatatoken:''
};

export default (state = initialState, action) => {
    const { type, payload } = action;

    switch (type){
        case ActionTypes.IS_LOGGED:
            // return action.isLogged;
            // console.log('islogged', action);

            return Object.assign({}, state, {
                isLogged: action.isLogged,
            });
        case ActionTypes.LOGIN_HAS_ERROR:
            // return action.loginHasError;
            // console.log('haserror', action);

            return Object.assign({}, state, {
                hasError: action.hasError,
            });
            case ActionTypes.LOGIN_DATA_NAME:
           
            console.log('logindata_reducer', action);

          
           return Object.assign({}, state, {
            logindata: action,
           });
           case ActionTypes.LOGIN_DATA_STATUS:
           
           console.log('logindata_reducer', action);

         
          return Object.assign({}, state, {
            loginDatastatus: action,
          });
          case ActionTypes.LOGIN_DATA_TOKEN:
           
          console.log('logindata_reducer', action);

        
         return Object.assign({}, state, {
            loginDatatoken: action,
         });
        case ActionTypes.LOGIN_IS_LOADING:
            // return action.loginIsLoading;
            // console.log('isloading', action);

            return Object.assign({}, state, {
                isLoading: action.isLoading,
            });
        case ActionTypes.LOGIN:
            return Object.assign({}, state, {
                isLogged: false,
                // name: payload.name,
                email: payload.username,
                password: payload.password
            });
        case ActionTypes.LOGOUT:
            return Object.assign({}, state, {
                isLogged: false,
                email: '',
                password: ''
            });
        default:
            return state
    }
}
