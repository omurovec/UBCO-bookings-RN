import React from "react";
import {
	View,
	TouchableOpacity,
	Text,
	Image,
	TextInput,
	AsyncStorage
} from "react-native";
import Styles from "../styles";
import * as Keychain from "react-native-keychain";
import httpsFunction from "../Functions";

export class Settings extends React.Component {
	props: {
		navigation: any;
	};
	constructor(props) {
		super(props);
	}

	_setNovell(credentials, reset) {
		const creds = {
			username: credentials[0],
			password: credentials[1]
		};
		httpsFunction("testCredentials", creds)
			.then(() =>
				Keychain.setGenericPassword(
					creds.username,
					creds.password
				).then(reset())
			)
			.catch(err => {
				console.log(err);
			});
	}

	render() {
		return (
			<View style={Styles.container}>
				<TouchableOpacity
					onPress={() => {
						this.props.navigation.navigate("EditSetting", {
							title: "Email",
							inputs: [
								{
									text: () => {
										try {
											return AsyncStorage.getItem("email");
										} catch (err) {
											return "email";
										}
									},
									hide: false,
									placeHolder: "Email"
								}
							],
							setValues: (email, reset) => {
								AsyncStorage.setItem("email", email).then(
									reset
								);
							}
						});
					}}
					style={Styles.settingsOptionContainer}
				>
					<View>
						<Text style={Styles.settingsOptionTitle}>
							Email
						</Text>
						<Text style={Styles.settingsOptionText}>
							Change contact email
						</Text>
					</View>
					<Image
						style={Styles.settingsOptionArrow}
						source={require("../../assets/arrow-64.png")}
					/>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => {
						this.props.navigation.navigate("EditSetting", {
							title: "Phone",
							inputs: [
								{
									text: () => {
										try {
											return AsyncStorage.getItem("phone");
										} catch (err) {
											return "phone";
										}
									},
									hide: false,
									placeHolder: "Phone"
								}
							],
							setValues: (phone, reset) => {
								AsyncStorage.setItem("phone", phone).then(
									reset
								);
							}
						});
					}}
					style={Styles.settingsOptionContainer}
				>
					<View>
						<Text style={Styles.settingsOptionTitle}>
							Phone
						</Text>
						<Text style={Styles.settingsOptionText}>
							Change contact phone number
						</Text>
					</View>
					<Image
						style={Styles.settingsOptionArrow}
						source={require("../../assets/arrow-64.png")}
					/>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => {
						this.props.navigation.navigate("EditSetting", {
							title: "Novell",
							inputs: [
								{
									text: "username",
									hide: false,
									placeHolder: "Student Number"
								},
								{
									text: "password",
									hide: true,
									placeHolder: "Birthdate DDMMYY"
								}
							],
							setValues: this._setNovell
						});
					}}
					style={Styles.settingsOptionContainer}
				>
					<View>
						<Text style={Styles.settingsOptionTitle}>
							Novell Account
						</Text>
						<Text style={Styles.settingsOptionText}>
							Set new Novell account
						</Text>
					</View>
					<Image
						style={Styles.settingsOptionArrow}
						source={require("../../assets/arrow-64.png")}
					/>
				</TouchableOpacity>
			</View>
		);
	}
}

export class EditSetting extends React.Component {
	props: {
		navigation: any;
	};
	state: {
		values: string[];
	};
	navParams: {
		inputs: {
			text: string;
			hide: boolean;
			placeHolder?: string;
		}[];
		setValues: Function;
	};

	constructor(props) {
		super(props);
		this.state = {
			values: []
		};
		this.navParams = {
			...this.props.navigation.state.params
		};
	}

	_renderInputs(data) {
		return data.map((item, index) => (
			<View
				key={index.toString()}
				style={Styles.settingsOptionContainer}
			>
				<TextInput
					style={Styles.editSettingsInput}
					placeholder={item.placeHolder}
					secureTextEntry={item.hide}
					onChangeText={text => {
						this.state.values[index] = text;
					}}
				/>
			</View>
		));
	}

	render() {
		return (
			<View style={Styles.container}>
				{this._renderInputs(this.navParams.inputs)}
				<TouchableOpacity
					style={{
						...Styles.button,
						width: "90%",
						margin: 20
					}}
					onPress={() =>
						this.navParams.setValues(
							this.state.values,
							this.props.navigation.goBack()
						)
					}
				>
					<Text style={Styles.buttonText}>Confirm</Text>
				</TouchableOpacity>
			</View>
		);
	}
}
