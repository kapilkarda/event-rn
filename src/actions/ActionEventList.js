import * as ActionTypes from '../constants/ActionTypes';
import { AsyncStorage } from 'react-native';
import * as React from 'react'
import { Actions } from 'react-native-router-flux';





const EventListHasError = (message) => {
    return {
        type: ActionTypes.Event_HAS_ERROR,
        hasError: message
    }
};

const EventListLoading = (bool) => {
    return {
        type: ActionTypes.Event_IS_LOADING,
        isLoading: bool
    }
};
const  EventDataList = (data) => {
    return {
        type: ActionTypes.GET_EVENT_LIST,
        eventList: data
    }
};

const eventApi = () => {
 
    return (dispatch) => {
        fetch('https://node-demo-api.herokuapp.com/api/v1/event', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjZGE2YWIwZGEzZGMyMmRlZjc0NGFiZSIsImVtYWlsIjoibGFsaXRAZ21haWwuY29tIiwiaWF0IjoxNTU3ODI3NjM3LCJleHAiOjE1ODkzNjM2Mzd9.ymta8b1zaIMZHAGmC27Uf6v5JisEf_QyCBi2n_2TIlU'
               
            },
           
        }).then((res) => res.json())
        .then(res => {
            console.log('Eventlist',res)
            if(res.success === true){
                console.log('Eventlist',res)
                dispatch(EventListHasError(false));
                dispatch(EventDataList(res.data))

            }else{
                dispatch(EventListHasError(res.msg));
            }
        })
        .catch((e) => {
            console.log(e)
            dispatch(EventListHasError("Oops, something went wrong, server error!"));
        });
    }
};



export default {
    EventListHasError,
    EventListLoading,
    eventApi,
    EventDataList
}
