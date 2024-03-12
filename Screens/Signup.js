/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, TouchableWithoutFeedback, Keyboard, Alert, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import googleIcon from '../assets/icons/google.png';
import appleIcon from '../assets/icons/apple.png';
import facebookIcon from '../assets/icons/facebook.png';
import userIcon from '../assets/icons/user.png';
import atIcon from '../assets/icons/at.png';
import lockIcon from '../assets/icons/lock.png';

const RegisterUser = () => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [reEnteredPassword, setReEnteredPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigation();

    const handleLoginButtonPress = () => {
        navigate.navigate('Login');
    };


    const handleSignUp = async () => {
        setLoading(true);
        try {
            if (validateInputs()) {
                const response = await axios.post('https://test.webyaparsolutions.com/auth/user/signup', {
                    email,
                    name: fullName,
                    password,
                });

                if (response.data.success) {
                    Alert.alert('Sign up successful!');
                    // Clear input fields after successful signup
                    setFullName('');
                    setEmail('');
                    setPassword('');
                    setReEnteredPassword('');
                } else {
                    setErrorMessage(response.data.message);
                }
            }
        } catch (error) {
            console.error('Error:', error);
            if (error.response) {
                setErrorMessage(error.response.data.message);
            } else {
                setErrorMessage('An error occurred while signing up.');
            }
        } finally {
            setLoading(false);
        }
    };

    const validateInputs = () => {
        if (!fullName || !email || !password || !reEnteredPassword) {
            setErrorMessage('All fields are required.');
            return false;
        }
        if (password !== reEnteredPassword) {
            setErrorMessage('Passwords do not match.');
            return false;
        }
        // Add more validation as needed
        return true;
    };
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={styles.container}>
                <Text style={styles.headerTitle}>SignUp</Text>
                <View style={styles.mainContainer}>
                    <Text style={styles.greetingUser}>Welcome!</Text>
                    <View style={styles.textInputSection}>
                        <Image source={userIcon} style={styles.inputIcon} />
                        <TextInput
                            style={styles.textInput}
                            placeholder="Full Name"
                            placeholderTextColor="gray"
                            underlineColorAndroid="transparent"
                            onChangeText={setFullName}
                        />
                    </View>
                    <View style={styles.textInputSection}>
                        <Image source={atIcon} style={styles.inputIcon} />
                        <TextInput
                            style={styles.textInput}
                            placeholder="Email"
                            placeholderTextColor="gray"
                            underlineColorAndroid="transparent"
                            onChangeText={setEmail}
                        />
                    </View>

                    <View style={styles.textInputSection}>
                        <Image source={lockIcon} style={styles.iconPassword} />
                        <TextInput
                            style={styles.inputPassword}
                            placeholder="Password"
                            placeholderTextColor="gray"
                            secureTextEntry={true}
                            underlineColorAndroid="transparent"
                            onChangeText={setPassword}
                        />
                    </View>
                    <View style={styles.textInputSection}>
                        <Image source={lockIcon} style={styles.iconPassword} />
                        <TextInput
                            style={styles.inputPassword}
                            placeholder="Re-enter Password"
                            placeholderTextColor="gray"
                            secureTextEntry={true}
                            underlineColorAndroid="transparent"
                            onChangeText={setReEnteredPassword}
                        />
                    </View>
                    {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
                    <Text style={styles.orSignupText}>or sign up with</Text>
                    <View style={styles.socialIconContainer}>
                        <TouchableOpacity style={styles.socialIcon}>
                            <Image source={googleIcon} style={styles.icon} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.socialIcon}>
                            <Image source={appleIcon} style={styles.icon} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.socialIcon}>
                            <Image source={facebookIcon} style={styles.icon} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.signUpButtonContainer}>
                        <TouchableOpacity style={styles.signUpButton} onPress={handleLoginButtonPress}>
                            <Text style={styles.signUpButtonText}>Login</Text>
                        </TouchableOpacity>
                        {/* <TouchableOpacity style={styles.continueButton} onPress={handleSignUp}>
                            <Text style={styles.continueButtonText}>Sign Up!</Text>
                        </TouchableOpacity> */}

                        <TouchableOpacity
                            style={[styles.continueButton, loading && styles.continueButtonDisabled]}
                            onPress={handleSignUp}
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <ActivityIndicator size="small" color="white" />
                                    <Text style={styles.continueButtonText}>Please wait...</Text>
                                </>
                            ) : (
                                <Text style={styles.continueButtonText}>Sign Up!</Text>
                            )}
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

    greetingUser: {
        textAlign: 'center',

        fontSize: 36,
        color: 'black',
        marginBottom: 30,
        fontWeight: '700',
    },
    fadedText: {
        marginLeft: 30,
        marginTop: 30,
        color: 'gray',
        fontSize: 16,
        fontStyle: 'italic',
    },
    textInputSection: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ededed',
        borderColor: '#000',
        height: 48,
        borderRadius: 8,
        marginHorizontal: 30,
        marginBottom: 20,
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

    },
    inputIcon: {
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
    textInput: {

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

    errorText: {
        color: 'red',
        textAlign: 'center',
        fontSize: 20,
        fontWeight: '500',
    },

    signUpButton: {
        marginLeft: 50,
        backgroundColor: 'transparent',
        borderRadius: 8,
        height: 48,
        justifyContent: 'center',
        alignItems: 'center',
    },
    signUpButtonText: {
        color: '#D5715B',
        fontWeight: 'bold',
        fontSize: 16,
    },

    signUpButtonContainer: {
        marginTop: 25,
        marginLeft: -10,
        flexDirection: 'row',
        alignItems: 'flex-end',

    },
    continueButton: {
        backgroundColor: '#D5715B',
        borderRadius: 117,
        width: 226,
        height: 48,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 80,
        marginTop: 20,
    },
    continueButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },

    continueButtonDisabled: {
        backgroundColor: 'gray',
    },
    orSignupText: {
        color: 'gray',
        textAlign: 'center',
        marginTop: 20,
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

export default RegisterUser;
