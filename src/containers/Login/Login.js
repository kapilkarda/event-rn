// import React, { Component } from 'react';
import * as React from 'react'
import LoginActions from '../../actions/ActionLogin';
import { connect } from 'react-redux';
import {
    StyleSheet,
    Text,
    Dimensions,
    View,
    Image,
    AsyncStorage, ImageBackground, TextInput, TouchableOpacity, Platform, AlertIOS, ToastAndroid, KeyboardAvoidingView, Alert
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import Spinner from '../Spinner'

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height
import styles, { COLOR } from './styles';
import { IS_LOGGED } from '../../constants/ActionTypes';
import Loader from '../../constants/Loader';

//import console = require('console');

class Login extends React.Component {
    props: any;
    state: any;

    constructor(props) {
        super(props);
        this.state = {
            email: null,
            password: null,
            dificulty: ''






        };
    };


    validate = () => {
        if (this.state.email == "" || this.state.email == null || this.state.email == undefined) {
            Platform.select({
                ios: () => { AlertIOS.alert('Please enter Email'); },
                android: () => { ToastAndroid.show('Please enter Email', ToastAndroid.SHORT); }
            })();
            return false;
        }
        var text = this.state.email;
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (reg.test(text) === false) {
            Platform.select({
                ios: () => { AlertIOS.alert('Email is Not Correct'); },
                android: () => { ToastAndroid.show('Email is Not Correct', ToastAndroid.SHORT); }
            })();
            return false;
        }
        if (this.state.password == "" || this.state.password == null || this.state.password == undefined) {
            Platform.select({
                ios: () => { AlertIOS.alert('Please enter Password'); },
                android: () => { ToastAndroid.show('Please enter Password', ToastAndroid.SHORT); }
            })();
            return false;
        }

        else {
            this.loginBtn()
        }
    }

    loginBtn() {

        let { email, password } = this.state;
        this.props.loginApi(email, password);

    }
    Register() {
        this.props.navigation.navigate('Signup')
    }

    //---this function check for difficulty steps----//
    checkDiff(status) {
        // const status = await AsyncStorage.getItem('difficulty');
        if (status === "" || status === "null" || status === null || status === undefined) {
            Actions.Level();
        }
        else {
            Actions.Home();
        }
    }

    render() {
        const { hasError, isLogged, isLoading, logindata } = this.props;
        console.log('status1111', logindata)
        const { email, password } = this.state
        if (hasError !== false && hasError !== undefined) {
            alert(hasError);
        }




        return (
            <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>

                <View style={styles.container}>
                    <Loader loading={isLoading} />
                    <View style={styles.ViewImage}>
                        <Image resizeMode="cover" style={Platform.isPad ? styles.logoiPad : styles.logoiPhone}
                            source={require('./../../Images/loggedin_logo.png')} />
                    </View>
                    <View style={styles.View1}>
                        <Text style={styles.EmailText}>Email</Text>
                        <TextInput
                            style={{ fontSize: 16, marginLeft: 4 }}

                            underlineColorAndroid='gray'
                            onChangeText={(text) => this.setState({ email: text })}
                            value={email}
                            returnKeyType='next'
                        />
                        <View style={{ height: 1, backgroundColor: '#000', marginTop: 3 }} />

                    </View>
                    <View style={styles.View2}>

                        <Text style={styles.EmailText}>Password</Text>
                        <TextInput
                            style={{ fontSize: 16, marginLeft: 4 }}
                            secureTextEntry={true}
                            underlineColorAndroid='gray'
                            onChangeText={(text) => this.setState({ password: text })}
                            value={password}
                            returnKeyType='next'
                        />
                        <View style={{ height: 1, backgroundColor: '#000', marginTop: 3 }} />
                    </View>
                    <TouchableOpacity onPress={() => { this.validate() }}>
                        <View style={styles.View3}>
                            <Text style={styles.SignText}>Sign In</Text>
                        </View>
                    </TouchableOpacity>
                    <View>
                        <View style={styles.View4}>
                            <View style={styles.View5}></View>

                            <Text style={{ fontSize: 13, color: '#000' }}> or connect with </Text>

                            <View style={styles.View5}></View>

                        </View>
                    </View>

                    <View>


                        <View style={[styles.View6, { justifyContent: 'center', alignItems: 'center' }]}>
                            <Text>Don't have an account?</Text>
                            <TouchableOpacity onPress={() => { this.Register() }}>
                                <Text style={{ color: '#000', fontWeight: 'bold' }}> Sign up</Text>
                            </TouchableOpacity>


                        </View>
                    </View>
                </View>

            </KeyboardAvoidingView>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        isLogged: state.login.isLogged,
        hasError: state.login.hasError,
        isLoading: state.login.isLoading,
        logindata: state.login.logindata,


    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        loginApi: (email, password) => dispatch(LoginActions.loginApi(email, password))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);