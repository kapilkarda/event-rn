import * as ActionTypes from '../constants/ActionTypes';
import { AsyncStorage } from 'react-native';
import * as React from 'react'
import { Actions } from 'react-native-router-flux';





const EventFilterHasError = (message) => {
    return {
        type: ActionTypes.Event_HAS_ERROR,
        hasError: message
    }
};

const EventFilterLoading = (bool) => {
    return {
        type: ActionTypes.Event_IS_LOADING,
        isLoading: bool
    }
};
const EventDataList = (data) => {
    return {
        type: ActionTypes.GET_EVENT_FILTER,
        eventfilter: data
    }
};

const EventFilterApi = (start_date, data,) => {
       console.log(start_date,data,"addevent")
    return (dispatch) => {
        fetch('https://node-demo-api.herokuapp.com/api/v1/event/filter?startDate=Tue May 17 2019&lat=22.7244&lng= 75.8839', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjZGE2YWIwZGEzZGMyMmRlZjc0NGFiZSIsImVtYWlsIjoibGFsaXRAZ21haWwuY29tIiwiaWF0IjoxNTU3ODI3NjM3LCJleHAiOjE1ODkzNjM2Mzd9.ymta8b1zaIMZHAGmC27Uf6v5JisEf_QyCBi2n_2TIlU'

            },
           

        }).then((res) => res.json())
            .then(res => {
                console.log('addeventlist', res)
                if (res.success === true) {
                    dispatch(EventFilterHasError(false));
                    //dispatch(EventDataList(res.data))

                } else {
                    dispatch(EventFilterHasError(res.msg));
                }
            })
            .catch((e) => {
                console.log(e)
                dispatch(EventFilterHasError("Oops, something went wrong, server error!"));
            });
    }
};



export default {
    EventFilterHasError,
    EventFilterLoading,
    EventFilterApi,
    EventDataList
}
