import React, {useState} from "react";
import {
	View,
	TouchableOpacity,
	Text,
	Image,
	TextInput
} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import Styles from "../styles";
import * as Keychain from "react-native-keychain";
import httpsFunction from "../Functions";

export function Settings(props: { navigation: any }) {
    function setNovell(credentials, reset) {
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

    return (
			<View style={Styles.container}>
				<TouchableOpacity
					onPress={() => {
						props.navigation.navigate("EditSetting", {
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
							setValues: (newEmail, reset) => {
								AsyncStorage.setItem("email", newEmail[0]).then(
									reset()
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
						props.navigation.navigate("EditSetting", {
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
							setValues: (newPhone, reset) => {
								AsyncStorage.setItem("phone", newPhone[0]).then(
									reset()
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
						props.navigation.navigate("EditSetting", {
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
							setValues: setNovell
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

export function EditSetting(props) {
    const [values, setValues] = useState([]);

    function renderInputs(data) {
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
						        setValues(() => {
                        let newValues = values;
                        newValues[index] = text;
                        return newValues
                    })
					      }}
				        />
			      </View>
		    ));
	  }

    return (
			  <View style={Styles.container}>
				    {renderInputs(props.navigation.state.params.inputs)}
				    <TouchableOpacity
					      style={{
						        ...Styles.button,
						        width: "90%",
						        margin: 20
					      }}
					      onPress={() =>
						        props.navigation.state.params.setValues(
							          values,
							          props.navigation.goBack()
						        )
					      }
				    >
					      <Text style={Styles.buttonText}>Confirm</Text>
				    </TouchableOpacity>
			  </View>
		);
}
