import React from 'react';
import { StyleSheet, TouchableOpacity, View, Keyboard } from 'react-native';
import Toast, { ToastConfigParams } from 'react-native-toast-message';

import { ToastErrorIcon, ToastSuccessIcon } from '@/assets/svg';
import { Text } from '@/shared';
import { Colors } from '@/theme/colors';

const visibilityTime = 2500; // ~ 2.5 sec

const toastConfig = {
    successResponse: ({ text1 }: ToastConfigParams<any>) => (
        <View style={styles.successContainer}>
            <ToastSuccessIcon />
            <Text
                style={styles.titleStyle}
                size={14}
                color={Colors.text.white}
                fontWeight="600"
            >
                {text1}
            </Text>
        </View>
    ),
    errorResponse: ({ text1, hide }: ToastConfigParams<any>) => (
        <View style={styles.errorContainer}>
            <TouchableOpacity onPress={() => hide()}>
                <ToastErrorIcon />
            </TouchableOpacity>
            <Text
                style={styles.titleStyle}
                size={14}
                color={Colors.text.white}
                fontWeight="600"
            >
                {text1}
            </Text>
        </View>
    )
};

export const successToast = (message: string) => {
    Keyboard.dismiss();
    setTimeout(() => {
        Toast.show({
            type: 'successResponse',
            text1: message,
            position: 'bottom',
            visibilityTime
        });
    }, 1000);
};

type ToastPosition = 'bottom' | 'top';

export const errorToast = (
    message: string,
    position: ToastPosition = 'bottom'
) => {
    Keyboard.dismiss();
    setTimeout(() => {
        Toast.show({
            type: 'errorResponse',
            text1: message,
            position: position,
            visibilityTime
        });
    }, 1000);
};

export default toastConfig;

const styles = StyleSheet.create({
    titleStyle: {
        color: Colors.text.white,
        marginLeft: 10,
        fontSize: 10,
        flex: 1
    },
    errorIconStyle: {
        width: 17,
        height: 17
    },
    errorContainer: {
        width: '90%',
        backgroundColor: Colors.toast.error,
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10
    },
    successContainer: {
        height: 55,
        width: '90%',
        backgroundColor: Colors.toast.success,
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20
    }
});
