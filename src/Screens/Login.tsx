import React from "react";
import {
	View,
	Image,
	Text,
	TextInput,
	AsyncStorage,
	Alert
} from "react-native";
import Styles from "../styles";
import { TouchableOpacity } from "react-native-gesture-handler";
import httpsFunction from "../Functions";
import * as Keychain from "react-native-keychain";
import {
	StackActions,
	NavigationActions
} from "react-navigation";

export default class Login extends React.Component {
	state: {
		phone?: string;
		email?: string;
		username?: string;
		password?: string;
	};

	props: {
		navigation: any;
	};

	constructor(props) {
		super(props);
		this.state = {
			username: null,
			password: null,
			phone: null,
			email: null
		};
		this._storeInfo = this._storeInfo.bind(this);
	}

	_storeInfo() {
		console.log("USER: " + this.state.username);
		console.log("PASS: " + this.state.password);
		httpsFunction("testCredentials", {
			username: this.state.username,
			password: this.state.password
		})
			.then(async () => {
				try {
					await Keychain.setGenericPassword(
						this.state.username,
						this.state.password
					);
					await AsyncStorage.multiSet([
						["email", this.state.email],
						["phone", this.state.phone]
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
			.catch(() => {
				Alert.alert(
					"Invalid Novell Account",
					"Please re-enter your username and pasword and try again",
					[
						{
							text: "dismiss",
							onPress: () => {
								this.setState({
									username: null,
									password: null
								});
							}
						}
					]
				);
			});
	}

	render() {
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
					onChangeText={text => {
						this.setState({ email: text });
					}}
				/>
				<TextInput
					placeholderTextColor="white"
					style={Styles.loginInput}
					placeholder="Phone"
					onChangeText={text => {
						this.setState({ phone: text });
					}}
				/>
				<TextInput
					placeholderTextColor="white"
					style={Styles.loginInput}
					placeholder="Student Number"
					onChangeText={text => {
						this.setState({ username: text });
					}}
				/>
				<TextInput
					placeholderTextColor="white"
					style={Styles.loginInput}
					placeholder="Birthdate DDMMYY"
					secureTextEntry={true}
					onChangeText={text => {
						this.setState({ password: text });
					}}
				/>

				<RoundButton
					visible={() =>
						this.state.username &&
						this.state.password &&
						this.state.email &&
						this.state.phone
					}
					onPress={this._storeInfo}
					source={require("../../assets/next-arrow-128.png")}
				/>
			</View>
		);
	}
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
