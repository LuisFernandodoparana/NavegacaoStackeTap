import React, { useState, useEffect, useRef } from "react";
import { View, Text, Image, StyleSheet, ScrollView, Pressable } from "react-native";
import Styles from "./styles";
import * as Notifications from "expo-notifications";
import { isDevice } from 'expo-device';

const notificationText = [
    {
        id: 1,
        title: 'Se esta precisando de um eletricista!',
        body: 'Não esqueça de conferir os nossos orçamentos para resindência e industria!'
    },
    {
        id: 2,
        title: 'Necessita de melhorias em suas instalações industriais!',
        body: 'É abrir o nosso App e conferir os serviços que estão disponíveis!'
    },
    {
        id: 3,
        title: 'Aproveite o nosso desconto para novos clientes!',
        body: 'E contrate um eletricista pela metade do preço!'
    }
]

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
});

export default function Home({navigation}) {
    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);

    const [notificationContent, setNotificationContent] = useState({
        title: '',
        body: ''
    });

    const notificationListener = useRef();
    const responseListener = useRef();

    useEffect(() => {
        //Passo 1: obtenção do token
        registerForPushNotificationsAsync().then(
            token => setExpoPushToken(token) //salvar o token no estado (state)
        );
        //Terceiro passo (avisar a aplicação que chegou uma nova notificação)
        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
            setNotification(notification); //armazenar a notificação no estado (state)
            setNotificationContent({ title: notification.request.content.title, body: notification.request.content.body })
        });
        //Terceiro passo (evento executado quando o usuário clica na notificação)
        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
            navigation.navigate("ViewNotification");
            console.log(response);
        });

        return () => {
            Notifications.removeNotificationSubscription(notificationListener.current);
            Notifications.removeNotificationSubscription(responseListener.current);
        }
    }, [notificationContent]);
    // obter o token método pronto 
    async function registerForPushNotificationsAsync() {
        let token;
        if (isDevice) {
            const { status: existingStatus } = await Notifications.getPermissionsAsync();
            let finalStatus = existingStatus;
            if (existingStatus !== 'granted') {
                const { status } = await Notifications.requestPermissionsAsync();
                finalStatus = status;
            }
            if (finalStatus !== 'granted') {
                alert('Failed to get push token for push notification!');
                return;
            }
            token = (await Notifications.getExpoPushTokenAsync()).data;
            console.log(token);
        }

        if (Platform.OS === 'android') {
            Notifications.setNotificationChannelAsync('default', {
                name: 'default',
                importance: Notifications.AndroidImportance.MAX,
                vibrationPattern: [0, 250, 250, 250],
                lightColor: '#FF231F7C',
            });
        }

        return token;
    }

    async function schedulePushNotification() {
        let contador = Math.floor(Math.random() * notificationText.length)
        console.log(contador)
        const mensagem = notificationText[contador];
        await Notifications.scheduleNotificationAsync(
            (
                {
                    content: {
                        title: mensagem.title,
                        body: mensagem.body,
                        sound: true,
                    },
                    trigger: { seconds: 5 },
                    repeats: true,
                }
            ))
    }

    return (
        <View style={Styles.container}>
            <Text style={Styles.text}>Home Screen</Text>
            <Pressable
                onPress={schedulePushNotification}>
                <Text>
                    Testar Notificações
                </Text>
            </Pressable>
        </View>

    );
}