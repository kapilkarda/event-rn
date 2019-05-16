import * as React from 'react'
import {
    StyleSheet,
    Text,
    Dimensions,
    View,
    Image,
    AsyncStorage, ImageBackground, TextInput, TouchableOpacity, SafeAreaView,AlertIOS,ToastAndroid, ScrollView, FlatList, Platform
} from 'react-native';
import { Footer, Card } from 'native-base';
import AddEventActions from '../../actions/ActionAddEvent'
import * as shape from 'd3-shape'
import { connect } from 'react-redux';
var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height
import styles, { COLOR } from './styles';
import { Actions } from 'react-native-router-flux';
import AppHeader from '../../components/AppHeader'
import DatePicker from 'react-native-datepicker'





var token = ""

//var elist: []
class AddEventComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            vanue: props.cityname,
            lat: props.lat,
            long: props.lng,
            start_date: '',
            end_date: '',
            title: '',
            description: '',
        };
        console.log(props)
    };

    // moment(new Date(this.state.start_time)).format('YYYY-MM-DD HH:mm:ss'),
    openSearchModal() {
        Actions.SearchPlaces("AddEvent")
    }
    
    validate = () => {
        if (this.state.vanue == "" || this.state.vanue == null || this.state.vanue == undefined) {
            Platform.select({
                ios: () => { AlertIOS.alert('Please enter Location'); },
                android: () => { ToastAndroid.show('Please enter Location', ToastAndroid.SHORT); }
            })();
            return false;
        }
        if (this.state.description == "" || this.state.description == null || this.state.description == undefined) {
            Platform.select({
                ios: () => { AlertIOS.alert('Please enter Description'); },
                android: () => { ToastAndroid.show('Please enter Description', ToastAndroid.SHORT); }
            })();
            return false;
        }
        if (this.state.title == "" || this.state.title == null || this.state.title == undefined) {
            Platform.select({
                ios: () => { AlertIOS.alert('Please enter Title'); },
                android: () => { ToastAndroid.show('Please enter Title', ToastAndroid.SHORT); }
            })();
            return false;
        }
        if (this.state.start_date == "" || this.state.start_date == null || this.state.start_date == undefined) {
            Platform.select({
                ios: () => { AlertIOS.alert('Please enter Start date'); },
                android: () => { ToastAndroid.show('Please enter Start date', ToastAndroid.SHORT); }
            })();
            return false;
        }
        if (this.state.end_date == "" || this.state.start_date == null || this.state.end_date == undefined) {
            Platform.select({
                ios: () => { AlertIOS.alert('Please enter End date'); },
                android: () => { ToastAndroid.show('Please enter End date', ToastAndroid.SHORT); }
            })();
            return false;
        }
        else {
            this.AddEvent()
        }
    }

    AddEvent() {
        const params = { vanue, lat, long, start_date, end_date, title, description } = this.state
        this.props.AddeventApi(params);
        Actions.Home()
    }

    render() {
        console.log(this.state.start_date, 'start_date')
        const location = this.props.navigation.state.params
        console.log(location, "location")
        return (
            <SafeAreaView style={styles.container}>
                <AppHeader
                    goBack={() => this.props.navigation.goBack()}
                    addevent={() => this.validate()}
                    leftImg={require('./../../components/Images/assets/icn_back.png')}
                    rightImg={require('./../../components/Images/checked.png')}
                    headerTitle="Add Events"
                />
                <View style={styles.eventcontainer} >
                <Text style={{fontSize: 20,}}>Location</Text>
                    <TouchableOpacity
                        onPress={() => this.openSearchModal()}
                    >
                        <View backgroundColor="#fff" style={styles.inputView}>
                            <TextInput
                                style={{ fontSize: 20, color: '#000' }}
                                placeholder="Search for a venue or address"
                                placeholderTextColor="gray"
                                editable={false}
                                underlineColorAndroid='transparent'
                                returnKeyType='next'
                                multiline={true}
                                onChangeText={(text) => this.updateChange('vanue', text)}

                                // onChangeText={(text) => this.setState({ vanue: text })}
                                value={this.state.vanue} />
                        </View>
                    </TouchableOpacity>
                    <Text style={{ fontSize: 20 }}>Title:</Text>
                    <View backgroundColor="#fff" style={styles.inputView}>
                        <TextInput
                            style={{ fontSize: 20, }}
                            placeholder="Enter Title"
                            //placeholderTextColor="#fff"
                            underlineColorAndroid='transparent'
                            onChangeText={(text) => this.setState({ title: text })}
                            value={this.state.title}
                        />
                    </View>
                    <Text style={{ fontSize: 20 }}>Description:</Text>
                    <View backgroundColor="#fff" style={styles.inputView1}>
                        <TextInput
                            style={{ fontSize: 20, }}
                            placeholder="Enter Description  "
                            //placeholderTextColor=
                            underlineColorAndroid='transparent'
                            onChangeText={(text) => this.setState({ description: text })}
                            value={this.state.description}
                        />
                    </View>
                    <Text style={{ fontSize: 20 }}>Start Date:</Text>
                    <DatePicker
                        style={{
                            marginLeft: 20, marginRight: 20,
                            width: window.width, marginTop: 10, backgroundColor: "#fff"
                        }}
                        minDate={new Date().getDate()}
                        date={this.state.start_date}
                        mode="date"
                        format="YYYY-MM-DD"
                        placeholder="Select Start date"
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        showIcon={false}
                        // onDateChange={(text) => { this.setState({ start_time: text }); }}
                        onDateChange={(text) => this.setState({ start_date: text })}

                    />
                    <Text style={{ fontSize: 20 }}>End Date:</Text>
                    <DatePicker
                        style={{
                            marginLeft: 20, marginRight: 20,
                            width: window.width, marginTop: 10, backgroundColor: "#fff"
                        }}
                        minDate={new Date().getDate()}
                        date={this.state.end_date}
                        mode="date"
                        format="YYYY-MM-DD"
                        placeholder="Select End date"
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        showIcon={false}
                        // onDateChange={(text) => { this.setState({ start_time: text }); }}
                        onDateChange={(text) => this.setState({ end_date: text })}

                    />
                </View>
            </SafeAreaView>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        // hasError : state.level.hasError
        //eventData: state.excerciselist.eventData
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        AddeventApi: (params) => dispatch(AddEventActions.AddeventApi(params))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddEventComponent)