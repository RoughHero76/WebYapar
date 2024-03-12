/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ActivityIndicator, Alert, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const RetriveLocation = () => {

    const navigate = useNavigation();

    useEffect(() => {

        const checkToken = async () => {
            const token = await AsyncStorage.getItem('token');
            if (!token) {
                navigate.navigate('Login');
            }

        };

        checkToken();
    });
    const [loading, setLoading] = useState(false);
    const [images, setImages] = useState([]);


    const handleFetchData = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            console.log('Token:', token);
            setLoading(true);
            const response = await axios.get('https://test.webyaparsolutions.com/data', {
                headers: {
                    Authorization: token,
                },
            });

            console.log('Response:', response.data);
            if (response.data.success) {
                Alert.alert('Success', response.data.message);
                setImages(response.data.data);
            } else {
                Alert.alert('Unsuccessful response:', response.data.message);
            }
        } catch (error) {
            // Handle errors
            console.error('Error fetching data:', error);
            if (error.response) {
                //console.log('Response error:', error.response.data);
                //console.log('Response status:', error.response.status);
                // Display alert for response error
                Alert.alert('Response Error', error.response.data.message);
            } else if (error.request) {
                // console.log('Request error:', error.request);
                // Display alert for request error
                Alert.alert('Request Error', 'Failed to make the request. Please check your internet connection.');
            } else {
                console.log('Other error:', error.message);
                // Display alert for other errors
                Alert.alert('Error', 'An unexpected error occurred. Please try again later.');
            }
        } finally {
            setLoading(false);
        }
    };


    return (
        <View style={styles.container}>
            <Text style={styles.headerTitle}>Retrieve Images</Text>

            <View style={styles.mainContainer}>
                <Text style={styles.greetingUser}>Your Data</Text>
                <Text style={styles.grayText}>
                    You can press on the fetch data button to retrieve your images with their locations
                </Text>
            </View>

            <ScrollView contentContainerStyle={styles.scrollViewContainer}>
                <View style={styles.imageContainer}>
                    {images.map((image, index) => (
                        <Image
                            key={index}
                            source={{ uri: `https://test.webyaparsolutions.com${image.file}` }}
                            style={styles.image}
                        />
                    ))}
                </View>
            </ScrollView>

            <TouchableOpacity style={[styles.continueButton, loading && styles.disabledButton]} onPress={handleFetchData} disabled={loading}>

                {loading ? (
                    <>

                        <ActivityIndicator size="small" color="white" />
                        <Text style={styles.continueButtonText}> Please Wait..</Text>
                    </>
                ) : (
                    <Text style={styles.continueButtonText}>Fetch Data</Text>
                )}

            </TouchableOpacity>
        </View>
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
    continueButton: {
        backgroundColor: '#D5715B',
        borderRadius: 117,
        width: 150,
        height: 48,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: 20,
        marginBottom: 10,
    },
    continueButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },

    disabledButton: {
        backgroundColor: 'gray',
    },
    scrollViewContainer: {
        flexGrow: 1,
    },
    imageContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        paddingHorizontal: 5,
    },
    image: {
        width: '49%',
        height: 150,
        marginVertical: 5,
    },
});

export default RetriveLocation;
