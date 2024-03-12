/* eslint-disable prettier/prettier */

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, TouchableWithoutFeedback, Keyboard, Alert, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AtIcon from '../assets/icons/at.png';
import LockIcon from '../assets/icons/lock.png';
import ApppleIcon from '../assets/icons/apple.png';
import GoogleIcon from '../assets/icons/google.png';
import FacebookIcon from '../assets/icons/facebook.png';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = () => {
    const navigate = useNavigation();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {

        const checkToken = async () => {
            const token = await AsyncStorage.getItem('token');
            if (token) {
                navigate.navigate('SendLocation');
            }
        };

        checkToken();
    });

    const handleForgotPassword = () => {
        setErrorMessage('Not Implemented Yet..');
    };

    const handleRegister = () => {
        navigate.navigate('SignUp');
    };


    const handleLogin = async () => {
        setLoading(true);
        try {
            const response = await axios.post('https://test.webyaparsolutions.com/auth/user/login', {
                email,
                password,
            });

            if (response.data.success) {
                await AsyncStorage.setItem('token', response.data.token);
                Alert.alert('Logged In');
                navigate.navigate('SendLocation');
                console.log('API Response:', response.data);
            } else {
                setErrorMessage(response.data.message);
            }
        } catch (error) {
            if (error.response) {
                setErrorMessage(`${error.response.data.message || 'An error occurred while logging in.'}`);
            } else if (error.request) {
                setErrorMessage('Network Error: Please check your internet connection.');
            } else {

                setErrorMessage('An error occurred while logging in.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={styles.container}>
                <Text style={styles.headerTitle}>Login</Text>

                <View style={styles.mainContainer}>
                    <Text style={styles.greetingUser}>Welcome Back!</Text>
                    <View style={styles.rowContainer}>
                        <Text style={styles.fadedText}>New here?</Text>
                        <TouchableOpacity style={styles.createAccountButton} onPress={handleRegister}>
                            <Text style={styles.buttonText}>Create Account</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.sectionStyleEmail} >
                        <Image source={AtIcon} style={styles.iconEmail} />
                        <TextInput
                            style={styles.inputEmail}
                            placeholder="Email"
                            placeholderTextColor="gray"
                            underlineColorAndroid="transparent"
                            onChangeText={setEmail}
                        />
                    </View>

                    <View style={styles.sectionStylePassword} >
                        <Image source={LockIcon} style={styles.iconPassword} />
                        <TextInput
                            style={styles.inputPassword}
                            placeholder="Password"
                            placeholderTextColor="gray"
                            secureTextEntry={true}
                            underlineColorAndroid="transparent"
                            onChangeText={setPassword}
                        />
                        <TouchableOpacity style={styles.forgotButton} onPress={handleForgotPassword}>
                            <Text style={styles.forgotText}>Forgot?</Text>
                        </TouchableOpacity>
                    </View>
                    {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
                    <TouchableOpacity
                        style={[styles.loginButton, loading && styles.loginButtonDisabled]}
                        onPress={handleLogin}
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <ActivityIndicator size="small" color="white" />
                                <Text style={styles.loginButtonText}>Please wait...</Text>
                            </>
                        ) : (
                            <Text style={styles.loginButtonText}>Login</Text>
                        )}
                    </TouchableOpacity>

                    <Text style={styles.orLoginText}>Or login with</Text>

                    <View style={styles.socialIconContainer}>
                        <TouchableOpacity style={styles.socialIcon}>
                            <Image source={GoogleIcon} style={styles.icon} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.socialIcon}>
                            <Image source={ApppleIcon} style={styles.icon} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.socialIcon}>
                            <Image source={FacebookIcon} style={styles.icon} />
                        </TouchableOpacity>
                    </View>

                </View>
            </View>
        </TouchableWithoutFeedback>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },

    mainContainer: {
        backgroundColor: 'white',
    },
    headerTitle: {
        marginTop: 36,
        marginLeft: 30,
        fontSize: 20,
        color: 'black',
        textAlign: 'left',
        fontWeight: '400',
    },
    rowContainer: {
        marginBottom: 50,
        flexDirection: 'row',
    },
    greetingUser: {
        marginLeft: 30,
        fontSize: 36,
        marginTop: 100,
        color: 'black',
        fontWeight: '700',
    },
    fadedText: {
        marginLeft: 30,
        marginTop: 30,
        color: 'gray',
        fontSize: 16,
        fontStyle: 'italic',
    },
    createAccountButton: {
        marginLeft: 15,
        marginTop: 30,
    },
    buttonText: {
        color: '#D5715B',
        fontWeight: 'bold',
        fontSize: 16,
    },
    sectionStyleEmail: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ededed',
        borderColor: '#000',
        height: 48,
        borderRadius: 8,
        marginHorizontal: 30,
    },
    sectionStylePassword: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ededed',
        borderColor: '#000',
        height: 48,
        borderRadius: 8,
        marginHorizontal: 30,
        marginTop: 20,
    },
    iconEmail: {
        marginLeft: 15,
        padding: 10,
        margin: 5,
        height: 15,
        width: 15,
        resizeMode: 'stretch',
        alignItems: 'center',
    },
    iconPassword: {
        marginLeft: 15,
        padding: 10,
        margin: 5,
        height: 15,
        width: 15,
        resizeMode: 'stretch',
        alignItems: 'center',
    },
    inputEmail: {
        flex: 1,
        color: 'black',
        backgroundColor: '#ededed',
        paddingHorizontal: 10,
        paddingVertical: 0,
    },
    inputPassword: {
        flex: 1,
        color: 'black',
        backgroundColor: '#ededed',
        paddingHorizontal: 10,
        paddingVertical: 0,
    },
    forgotButton: {
        marginLeft: 10,
        marginRight: 10,
    },
    forgotText: {
        color: '#D5715B',
        fontSize: 14,
        marginRight: 15,
        fontWeight: 'bold',
    },

    errorText: {
        color: 'red',
        fontSize: 14,

        textAlign: 'center',
        marginTop: 20,
    },
    loginButton: {
        backgroundColor: '#D5715B',
        borderRadius: 8,
        height: 48,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 30,
        marginTop: 20,
    },
    loginButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },

    loginButtonDisabled: {
        backgroundColor: 'gray', // Change to the desired color for disabled state
    },
    orLoginText: {
        color: 'gray',
        textAlign: 'center',
        marginTop: 40,
        fontSize: 16,
    },
    socialIconContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 40,

    },
    socialIcon: {
        backgroundColor: 'white',
        width: 96,
        height: 48,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
        marginHorizontal: 10,
        borderWidth: 1,
        borderColor: 'gray',
    },

    icon: {
        width: 30,
        height: 30,
    },
});

export default Login;
