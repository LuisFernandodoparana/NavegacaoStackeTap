import React from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {
    Login,
    Catalog,
    Chat,
    Home, 
    Settings,
    SignUp
}from "../Screens"
import ShowBottomTabs from "./BottomTaps";

const Stack = createNativeStackNavigator()

export default props => (
    <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{headerShown: false}}
    >
        <Stack.Screen name="Login" component={Login}/>
        <Stack.Screen name="Home" component={ShowBottomTabs}/>
    </Stack.Navigator>
)

export function HomeNavigation(){
    return(
        <Stack.Navigator>
            <Stack.Screen name="Home" component={Home} />
        </Stack.Navigator>
    )
}

export function CatalogNavigation(){
    return(
        <Stack.Navigator>
            <Stack.Screen name="Catalogo" component={Catalog} />
        </Stack.Navigator>
    )
}

export function ChatNavigation(){
    return(
        <Stack.Navigator>
            <Stack.Screen name="Chat" component={Chat} />
        </Stack.Navigator>
    )
}

export function SetiingsNavigation(){
    return(
        <Stack.Navigator>
            <Stack.Screen name="Settings" component={Settings} />
            <Stack.Screen name="SignUp" component={SignUp}/>
        </Stack.Navigator>
    )
}