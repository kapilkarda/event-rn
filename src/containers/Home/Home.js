import * as React from 'react'
import {
    StyleSheet,
    Text,
    Dimensions,
    View,
    Image,
    AsyncStorage, ImageBackground, TextInput, TouchableOpacity, SafeAreaView, ScrollView, FlatList, Platform
} from 'react-native';
import { Footer, Card } from 'native-base';
import EventListActions from '../../actions/ActionEventList'
import EventFilterActions from '../../actions/ActionEventFilter'
import * as shape from 'd3-shape'
import { connect } from 'react-redux';
var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height
import styles, { COLOR } from './styles';
import { Actions } from 'react-native-router-flux';
import CalendarStrip from 'react-native-calendar-strip';
import AppHeader from '../../components/AppHeader'
import moment from 'moment';
import reverse from 'reverse-geocode'



var token = ""

//var elist: []
class HomeComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            Name: '',
            vanue:props.cityname,
            lat: props.lat,
            long: props.lng,
            start_date:''
        };
        console.log(props)
    };

    async componentWillMount() {
        this.willFocus = this.props.navigation.addListener('willFocus', () => {
            this.eventFuc()
        });
       
    }

    //----this function for eventlist api-----//
    eventFuc = () => {
        this.props.eventApi();
    }

    openSearchModal() {
        Actions.SearchPlaces()
    }

    getDate(getDate){
        const latLng = {lat,long} = this.state
        this.setState({
            start_date : moment(new Date(getDate)).format('YYYY-MM-DD')
        },() => {
            this.props.EventFilterApi(this.state.start_date,latLng);
        })
    }

    render() {
        const { eventData, } = this.props
        console.log(eventData, 'eventlist')
        return (
            <SafeAreaView style={styles.container}>
              
                <AppHeader
                    // leftImg={require('./../../components/Images/assets/icn_menu.png')}
                    rightImg={require('./../../components/Images/assets/icn_add.png')}
                    addevent={() => Actions.AddEvent()}
                    headerTitle="Events"
                />
                <ScrollView>
                <CalendarStrip
                    onDateSelected = {(date) => this.getDate(date)}
                />
                 {/* <TouchableOpacity
                        onPress={() => this.openSearchModal()}
                    >
                        <View backgroundColor="#fff" style={{padding:10}}>
                            <Text
                                style={{ fontSize: 20, color: '#000' }}
                                // onChangeText={(text) => this.setState({ vanue: text })}
                                 >{this.state.vanue !== undefined ? this.state.vanue : "Search for a venue"}</Text>
                        </View>
                    </TouchableOpacity> */}
            
                <View style={styles.eventcontainer} >
                
                    {eventData.eventList &&
                        <View style={{}}>
                            <FlatList
                                style={styles.faltlist}
                                data={eventData.eventList}
                                renderItem={({ item }) =>
                                    <Card style={styles.cardView}>
                                        <Image style={styles.eventImgSize}
                                            source={require('./../../components/Images/enevtImg1.jpeg')} />
                                        <View style={{
                                            height: 80,
                                            backgroundColor: '#F7F9F9'
                                        }}>
                                            <View style={{
                                                marginLeft: 10, marginTop: 10
                                            }}>
                                                <Text
                                                    style={{
                                                        fontSize: 20,
                                                        color: '#DC7633',
                                                        backgroundColor: 'transparent'
                                                    }}>{item.title}</Text>    
                                            </View>
                                            <View style={{
                                                marginLeft: 10, marginTop: 10
                                            }}>
                                            <Text   style={{fontSize:16}}>{moment(new Date(item.startDate)).format('DD-MM-YYYY')}</Text> 
                                            </View>
                                        </View>
                                    </Card>
                                }
                                keyExtractor={(item, index) => index}
                            />
                        </View>
                    }
                    <View style={{height:40}}/>
                </View>
                </ScrollView>
            </SafeAreaView>
        );
    }
}


const mapStateToProps = (state) => {
    return {
     
        eventData: state.Eventlist.eventData,
        //eventFilterData: state.eventFilterData.eventFilterData
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        eventApi: () => dispatch(EventListActions.eventApi()),
        EventFilterApi: (start_date,latLng) => dispatch(EventFilterActions.EventFilterApi(start_date,latLng))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeComponent)