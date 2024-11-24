import { useState, useRef } from 'react';
import { View, StyleSheet, Text, Image, Button, Pressable, SafeAreaView, Alert } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import Feather from '@expo/vector-icons/Feather';
import { Camera as ExpoCamera, useCameraPermissions } from 'expo-camera';
import * as MediaLibrary from "expo-media-library";

export default function Camera() {
    const [permission, requestPermission] = useCameraPermissions();
    const [photo, setPhoto] = useState(null);
    const [qrData, setQrData] = useState(null); 
    const [hasScanned, setHasScanned] = useState(false);
    const cameraRef = useRef(null);
    const [cameraType, setCameraType] = useState(ExpoCamera.Constants.Type.back);

    if (!permission) {
        return <View />;
    }

    if (!permission.granted) {
        return (
            <View style={styles.container}>
                <Text style={styles.textPermission}>Camera access is required</Text>
                <Button title="Grant Permission" onPress={requestPermission} />
            </View>
        );
    }

    const takePhoto = async () => {
        const photoData = await cameraRef.current?.takePictureAsync({
            quality: 1,
            base64: true
        });
        setPhoto(photoData);
    };

    const switchCamera = () => {
        setCameraType(
            cameraType === ExpoCamera.Constants.Type.back 
            ? ExpoCamera.Constants.Type.front 
            : ExpoCamera.Constants.Type.back
        );
    };

    const savePhoto = async () => {
        try {
            await MediaLibrary.saveToLibraryAsync(photo.uri);
            Alert.alert('Photo saved to gallery!');
        } catch (error) {
            console.error("Error saving photo: ", error);
            Alert.alert('Error saving photo.');
        }
    };

    const handleBarCodeScanned = ({ data }) => {
        if (!hasScanned) { 
            setQrData(data); 
            setHasScanned(true); 
            Alert.alert('QR Code Scanned', `Content: ${data}`, [
                {
                    text: 'OK',
                    onPress: () => {
                        setHasScanned(false); 
                    },
                },
            ]);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            {photo ? (
                <>
                    <SafeAreaView style={styles.photoContainer}>
                        <Image source={{ uri: photo.uri }} style={styles.photo} />
                    </SafeAreaView>
                    <View style={styles.cancelButton}>
                        <Pressable onPress={() => setPhoto(null)} style={styles.iconButton}>
                            <Ionicons name="trash-sharp" size={22} color="black" />
                        </Pressable>
                    </View>
                    <View style={styles.saveButton}>
                        <Pressable onPress={savePhoto} style={styles.iconButton}>
                            <Feather name="upload" size={54} color="black" />
                        </Pressable>
                    </View>
                </>
            ) : (
                <ExpoCamera
                    type={cameraType}
                    style={styles.camera}
                    ref={cameraRef}
                    barCodeScannerSettings={{
                        barCodeTypes: [ExpoCamera.Constants.BarCodeType.qr], 
                    }}
                    onBarCodeScanned={handleBarCodeScanned}
                >
                    <SafeAreaView style={styles.buttonRow}>
                        <Pressable style={styles.hiddenButton}>
                            <Ionicons name="camera-reverse-sharp" size={30} color="black" />
                        </Pressable>
                        <Pressable onPress={takePhoto} style={styles.captureButton}>
                            <Ionicons name="camera" size={54} color="black" />
                        </Pressable>
                        <Pressable onPress={switchCamera} style={styles.switchButton}>
                            <Ionicons name="camera-reverse-sharp" size={30} color="black" />
                        </Pressable>
                    </SafeAreaView>
                </ExpoCamera>
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#f5f5f5',
    },
    textPermission: {
        textAlign: 'center',
        color: '#555',
    },
    camera: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    photoContainer: {
        flex: 1,
    },
    photo: {
        height: '100%',
        width: '100%',
        resizeMode: 'cover',
    },
    buttonRow: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginBottom: 20,
    },
    captureButton: {
        backgroundColor: '#ff6347',
        width: 82,
        height: 82,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
        opacity: 0.8,
    },
    switchButton: {
        backgroundColor: '#ff6347',
        width: 58,
        height: 58,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
        opacity: 0.8,
    },
    iconButton: {
        backgroundColor: '#ff6347',
        width: 38,
        height: 38,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
        opacity: 0.8,
    },
    cancelButton: {
        position: 'absolute',
        top: 10,
        left: 10,
    },
    saveButton: {
        position: 'absolute',
        bottom: 30,
        alignSelf: 'center',
    },
    hiddenButton: {
        opacity: 0,
    },
});
