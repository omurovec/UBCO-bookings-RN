import React, { useState } from "react";
import {
    View,
    Image,
    Text,
    TextInput,
	  Alert
} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import Styles from "../styles";
import { TouchableOpacity } from "react-native-gesture-handler";
import httpsFunction from "../Functions";
import * as Keychain from "react-native-keychain";
import {
	StackActions,
	NavigationActions
} from "react-navigation";

export default function Login(props: {navigation : any}) {
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [phone, setPhone] = useState(null);
    const [email, setEmail] = useState(null);

  function storeInfo() {
		console.log("USER: " + username);
		console.log("PASS: " + password);
		httpsFunction("testCredentials", {
			username: username,
			password: password
		})
			.then(async () => {
				try {
					await Keychain.setGenericPassword(
						username,
						password
					);
					await AsyncStorage.multiSet([
						["email", email],
						["phone", phone]
					]);
					this.props.navigation.dispatch(
						StackActions.reset({
							index: 0,
							actions: [
								NavigationActions.navigate({
									routeName: "Home"
								})
							]
						})
					);
				} catch (err) {
					console.log(err);
					Alert.alert(
						"Error storing info",
						"The program was unable to store your Novell and contact info.",
						[
							{
								text: "dismiss"
							}
						]
					);
				}
			})
			.catch((err) => {
          console.log(err)
				Alert.alert(
					"Invalid Novell Account",
					"Please re-enter your username and pasword and try again",
					[
						{
							text: "dismiss",
							onPress: () => {
								  setUsername(null),
									setPassword(null);
							}
						}
					]
				);
			});
	}

  return (
    <View style={Styles.loginContainer}>
      <Image
        source={require("../../assets/person.png")}
        style={Styles.loginImage}
      />
      <Text style={Styles.loginPrompt}>
        Please enter your Novell Account and contact
        information.
      </Text>
      <TextInput
        placeholderTextColor="white"
        style={Styles.loginInput}
        placeholder="Email"
        onChangeText={text => {setEmail(text)}}
      />
      <TextInput
        placeholderTextColor="white"
        style={Styles.loginInput}
        placeholder="Phone"
        onChangeText={text => {setPhone(text);}}
      />
      <TextInput
        placeholderTextColor="white"
        style={Styles.loginInput}
        placeholder="Student Number"
        onChangeText={text => {setUsername(text);}}
      />
      <TextInput
        placeholderTextColor="white"
        style={Styles.loginInput}
        placeholder="Birthdate DDMMYY"
        secureTextEntry={true}
        onChangeText={text => {setPassword(text);}}
      />

      <RoundButton
        visible={() =>
          username &&
          password &&
          email &&
          phone
        }
        onPress={storeInfo}
        source={require("../../assets/next-arrow-128.png")}
      />
    </View>
  );
}

const RoundButton = props => {
	  if (props.visible()) {
		    return (
			      <TouchableOpacity
				        style={Styles.loginButton}
				        onPress={props.onPress}
			      >
				        <Image
					      source={props.source}
					      style={Styles.loginButtonImage}
				        />
			      </TouchableOpacity>
		    );
	  } else {
		    return <View style={Styles.loginButton} />;
	  }
};
