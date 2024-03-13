/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Keyboard, TouchableWithoutFeedback, TouchableOpacity, Image, ScrollView, Alert, ActivityIndicator, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LogoutIcon from '../assets/icons/logout.png';
import location from '../assets/icons/location.png';

const SendLocation = () => {

    const navigate = useNavigation();
    const [selectedDocument, setSelectedDocument] = useState('');
    const [loading, setLoading] = useState(false);
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');

    useEffect(() => {

        const checkToken = async () => {
            const token = await AsyncStorage.getItem('token');
            if (!token) {
                navigate.navigate('Login');
            }

        };

        checkToken();
    });

    const RetriveLocation = () => {
        navigate.navigate('RetriveLocation');
    };

    const hanldeResetImage = () => {
        setSelectedDocument('');
    };

    const handleCameraPress = async () => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Sorry, we need camera permissions to make this work!');
            return;
        }

        const result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: false,
            aspect: [4, 3],
            quality: 0.5,
        });

        if (!result.cancelled) {
            const imageUri = result.assets[0].uri;
            setSelectedDocument(imageUri);
            /*  console.log('Selected image URI:', imageUri); */
        }
    };

    const handleSubmitButton = async () => {
        if (!selectedDocument) {
            Alert.alert('Error', 'Please select an image before submitting.');
            return;
        }

        setLoading(true);
        try {

            const token = await AsyncStorage.getItem('token');
            const formData = new FormData();
            formData.append('latitude', latitude);
            formData.append('longitude', longitude);

            const fileExtension = selectedDocument.split('.').pop();
            const fileName = `image.${fileExtension}`;

            formData.append('file', {
                uri: selectedDocument,
                name: fileName,
                type: `image/${fileExtension}`,
            });


            /*             console.log('Sending request to URL:', 'https://test.webyaparsolutions.com/form');
                        console.log('Request headers:', {
                            'Content-Type': 'multipart/form-data',
                            Authorization: `${token}`,
                        });
                        console.log('Request body:', formData);
             */
            const response = await axios.post('https://test.webyaparsolutions.com/form', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `${token}`,
                },
            });

            // Check if the request was successful
            if (response.data.success) {
                Alert.alert('Success', response.data.message);
            } else {
                Alert.alert('Error', response.data.message || 'An error occurred');
            }
        } catch (error) {
            console.error('Error object:', error);
            if (error.response) {
                /* 
                                console.log(error.response.data);
                                console.log(error.response.status);
                                console.log(error.response.headers); */
                Alert.alert('Error', error.response.data.message || 'An error occurred while sending data');
            } else if (error.request) {

                /*  console.log(error.request); */
                Alert.alert('Error', 'No response received from the server.');
            } else {

                /*    console.log('Error', error.message); */
                Alert.alert('Error', 'Network Error: Please check your internet connection.');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        // Add logout functionality here
        await AsyncStorage.removeItem('token');
        navigate.navigate('Login');
    };

    return (

        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>


            <View style={styles.container}>
                <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                    <Image source={LogoutIcon} style={styles.logutIcon} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Send And Retrieve Location</Text>

                <ScrollView style={styles.mainContainer}>
                    <Text style={styles.greetingUser}>Send Location</Text>
                    <Text style={styles.grayText}>
                        You can Press On Camera Button To Take Photo and Send The Location
                    </Text>

                    {/* Display the selected image */}
                    {selectedDocument && (
                        <Image
                            source={{ uri: selectedDocument }}
                            style={{ width: 200, height: 200, marginBottom: 20 }}
                        />
                    )}

                    <View style={styles.rowContainer}>
                        <TouchableOpacity style={styles.attachProofButton}>
                            <Text style={styles.attachProofText}>
                                {selectedDocument ? `Picture: ${selectedDocument}` : 'Take a picture'}
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.cameraButton} onPress={handleCameraPress}>
                            <Image
                                source={{
                                    uri: 'https://cdn-icons-png.flaticon.com/128/685/685655.png',
                                }}
                                style={styles.cameraIcon}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.rowContainer2}>
                        <Image source={location} style={styles.iconLocation} />
                        <TextInput
                            style={styles.inputLocation}
                            placeholder="Input Latitude"
                            placeholderTextColor="gray"
                            underlineColorAndroid="transparent"
                            onChangeText={setLatitude}
                        />
                        <TextInput
                            style={styles.inputLocation}
                            placeholder="Input Longitude"
                            placeholderTextColor="gray"
                            underlineColorAndroid="transparent"
                            onChangeText={setLongitude}
                        />
                    </View>
                </ScrollView>

                <View style={styles.continueButtonContainer}>
                    <TouchableOpacity style={styles.continueButton} onPress={RetriveLocation}>
                        <Text style={styles.continueButtonText}> Fetch Data </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.continueButton, loading && styles.disabledButton]} onPress={handleSubmitButton} disabled={loading}>

                        {loading ? (
                            <>

                                <ActivityIndicator size="small" color="white" />
                                <Text style={styles.continueButtonText}> Please Wait..</Text>
                            </>
                        ) : (
                            <Text style={styles.continueButtonText}>Send Image</Text>
                        )}

                    </TouchableOpacity>

                </View>
                <TouchableOpacity style={styles.resetButton} onPress={hanldeResetImage}>
                    <Text style={styles.continueButtonText}>Reset Media</Text>
                </TouchableOpacity>
            </View>
        </TouchableWithoutFeedback>

    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingHorizontal: 30,
        paddingTop: 50,
    },
    mainContainer: {
        backgroundColor: 'white',
        marginTop: 20,
    },
    headerTitle: {
        fontSize: 20,
        color: 'black',
        fontWeight: '400',
        marginBottom: 10,
    },
    greetingUser: {
        fontSize: 36,
        color: 'black',
        fontWeight: '700',
        marginBottom: 20,
    },
    grayText: {
        color: 'gray',
        marginBottom: 20,
    },
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    rowContainer2: {
        flexDirection: 'row',
        marginBottom: 0,
        marginRight: 20,
    },
    attachProofButton: {
        flex: 1,
    },
    attachProofText: {
        color: 'black',
        fontSize: 16,
    },
    cameraButton: {
        backgroundColor: '#D5715B',
        borderRadius: 50,
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 30,
    },
    cameraIcon: {
        width: 30,
        height: 30,
        tintColor: 'white',
    },
    continueButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'absolute',
        bottom: 20,
        alignSelf: 'center',
    },
    continueButton: {
        backgroundColor: '#D5715B',
        borderRadius: 117,
        width: 150,
        height: 48,
        justifyContent: 'center',
        alignItems: 'center',
    },

    resetButton: {
        backgroundColor: '#D5715B',
        borderRadius: 117,
        width: 150,
        height: 48,
        marginBottom: 80,

        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',

    },
    continueButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
    disabledButton: {
        backgroundColor: 'gray',
    },
    logoutButton: {
        position: 'absolute',
        top: 20,
        right: 20,
        zIndex: 1,
    },
    logutIcon: {
        width: 24,
        height: 24,
    },
    inputLocation: {
        flex: 1,
        color: 'black',
        backgroundColor: '#ededed',
        paddingVertical: 5, // Adjust vertical padding as needed
        marginHorizontal: 5,
        borderRadius: 10,
    },
    iconLocation: {
        marginLeft: 15,
        padding: 10,
        margin: 5,
        height: 25,
        width: 25,
        resizeMode: 'stretch',
        alignItems: 'center',
    },
});

export default SendLocation;
