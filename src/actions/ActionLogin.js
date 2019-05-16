import * as ActionTypes from '../constants/ActionTypes';
import { Actions } from 'react-native-router-flux';
import { AsyncStorage } from 'react-native';
import * as React from 'react'
// import console = require('console');

const isLogged = (bool) => {
    return {
        type: ActionTypes.IS_LOGGED,
        isLogged: bool
    }
};

const loginHasError = (message) => {
    return {
        type: ActionTypes.LOGIN_HAS_ERROR,
        hasError: message
    }
};

const loginIsLoading = (bool) => {
    return {
        type: ActionTypes.LOGIN_IS_LOADING,
        isLoading: bool
    }
};
const loginData = (name) => {
    return {
        type: ActionTypes.LOGIN_DATA_NAME,
        logindata: name
    }
};
const loginDatastatus = (status) => {
    return {
        type: ActionTypes.LOGIN_DATA_STATUS,
        loginDatastatus: status
    }
};
const loginDatatoken = (token) => {
    return {
        type: ActionTypes.LOGIN_DATA_TOKEN,
        loginDatatoken: token
    }
};
const checkDiff = () => {
    const status = AsyncStorage.getItem('difficulty');
    console.log('Actionlogin', status)
    if (status === "" || status === "null" || status === null) {
        // isLoading:true
        //this.setState({isWaiting:false})

        Actions.Level();

    }
    else {
        // this.setState({isWaiting:false})

        Actions.Home();

    }
}


const loginApi = (email, password) => {
    //Actions.Spinner(true)
    console.log(email, password)
    return (dispatch) => {
        dispatch(loginIsLoading(true));
        // if (!email || !password) {
        //     dispatch(loginHasError(true));
        //     dispatch(loginIsLoading(false));
        //     return;
        // }
        fetch('https://health-mvp-api.herokuapp.com/api/v1.0/core/login/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: password,

            })
        }).then((res) => res.json())
            .then(res => {
                console.log(res)
                if (res.status === true) {
                    //Actions.Spinner(false)
                    dispatch(loginIsLoading(false));
                    dispatch(loginHasError(false));
                    dispatch(isLogged(true));
                    dispatch(loginData(res));

                    AsyncStorage.setItem('userid', res.data.id.toString())

                    if (res.data.dificulty === "" || res.data.dificulty === "null" || res.data.dificulty === null) {


                        Actions.Level();

                    }
                    else {

                        Actions.Home({ first_name: res.data.first_name, token: res.token });
                        console.log('name', res.data.first_name)


                    }
                    AsyncStorage.setItem('first_name', res.data.first_name)
                    AsyncStorage.setItem('token', res.token)
                } else {
                    dispatch(loginIsLoading(false));
                    setTimeout(() => {
                        dispatch(loginHasError(res.message));
                        dispatch(loginHasError(undefined));
                    }, 1000);
                }
            })
            .catch((e) => {
                console.log(e)
                dispatch(loginHasError("Oops, something went wrong, server error!"));
            });
    }
};

const logout = () => {
    AsyncStorage.removeItem('token');
    Actions.Login();
    return {
        type: ActionTypes.LOGOUT
    }
};

export default {
    isLogged,
    loginHasError,
    loginIsLoading,
    loginApi,
    logout,
    loginData

}
