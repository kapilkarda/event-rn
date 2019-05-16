import { combineReducers } from 'redux';
import Login from "./Login";
import Signup from "./Signup"
import Eventlist from "./Eventlist"



export default combineReducers({
    login: Login,
    signup: Signup,
    Eventlist:Eventlist
})