import * as ActionTypes from '../constants/ActionTypes';
import { AsyncStorage } from 'react-native';
import * as React from 'react'
import { Actions } from 'react-native-router-flux';





const AddEventHasError = (message) => {
    return {
        type: ActionTypes.Event_HAS_ERROR,
        hasError: message
    }
};

const AddEventLoading = (bool) => {
    return {
        type: ActionTypes.Event_IS_LOADING,
        isLoading: bool
    }
};
const EventDataList = (data) => {
    return {
        type: ActionTypes.GET_EVENT_LIST,
        eventList: data
    }
};

const AddeventApi = (data) => {
       console.log(data,"addevent")
    return (dispatch) => {
        fetch('https://node-demo-api.herokuapp.com/api/v1/event', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjZGE2YWIwZGEzZGMyMmRlZjc0NGFiZSIsImVtYWlsIjoibGFsaXRAZ21haWwuY29tIiwiaWF0IjoxNTU3ODI3NjM3LCJleHAiOjE1ODkzNjM2Mzd9.ymta8b1zaIMZHAGmC27Uf6v5JisEf_QyCBi2n_2TIlU'

            },
            body: JSON.stringify({
                title: data.title,
                description: data.description,
                startDate: data.start_date,
                endDate: data.end_date,
                startTime: "",
                endTime: "",
                location: {
                    type: "Point",
                    coordinates: [data.lat, data.long]
                }

            })

        }).then((res) => res.json())
            .then(res => {
                console.log('addeventlist', res)
                if (res.success === true) {
                    dispatch(AddEventHasError(false));
                    //dispatch(EventDataList(res.data))

                } else {
                    dispatch(AddEventHasError(res.msg));
                }
            })
            .catch((e) => {
                console.log(e)
                dispatch(AddEventHasError("Oops, something went wrong, server error!"));
            });
    }
};



export default {
    AddEventHasError,
    AddEventLoading,
    AddeventApi,
    EventDataList
}
