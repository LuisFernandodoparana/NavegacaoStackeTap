import React from "react";
import { View, Text, Button } from "react-native";
import Styles from "./styles";

export default props => (
    <View style={Styles.container}>
        <Text style={Styles.text}>Home Screen</Text>
        <Button title="Acessar" onPress={() => props.navigation.navigate('SignUp')}/>
    </View>
)