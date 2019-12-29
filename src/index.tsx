import { createStackNavigator } from "react-navigation-stack";
import {
	View,
	TouchableOpacity,
	Image
} from "react-native";
import React from "react";
import {
	Home,
	Settings,
	EditSetting,
	DateTime,
	Bookings,
	Confirm,
	Login,
	BookingInfo
} from "./Screens/index";
import styles from "./styles";
import { createAppContainer } from "react-navigation";

const RootNavigator = createStackNavigator(
	{
		Home: {
			screen: Home,
			navigationOptions: ({ navigation }) => ({
				title: "Bookings",
				headerRight: () => (
					<HeaderButtons
						settings={() => {
							navigation.navigate("Settings");
						}}
						newBooking={() => {
							navigation.navigate("DateTime");
						}}
					/>
				)
			})
		},
		Settings: {
			screen: Settings,
			navigationOptions: {
				title: "Settings"
			}
		},
		EditSetting: {
			screen: EditSetting,
			navigationOptions: ({ navigation }) => ({
				title: navigation.state.params.title
			})
		},
		DateTime: {
			screen: DateTime,
			navigationOptions: {
				title: "Set Date & Time"
			}
		},
		Bookings: {
			screen: Bookings,
			navigationOptions: ({ navigation }) => {
				const time = navigation.state.params.time;
				const timeString =
					time % 1 == 0
						? time + ":00"
						: Math.floor(time) + ":30";
				return {
					title: timeString
				};
			}
		},
		Confirm: {
			screen: Confirm,
			navigationOptions: ({ navigation }) => {
				let title = "";
				try {
					title = `${navigation.state.params.name.substring(
						0,
						navigation.state.params.name.indexOf("(")
					)} - ${
						navigation.state.params.time % 1 == 0
							? navigation.state.params.time + ":00"
							: Math.floor(navigation.state.params.time) +
							  ":30"
					}`;
				} catch (err) {
					title = "Confirm";
				}
				return {
					title: title,
					headerStyle: {
						backgroundColor: "White"
					},
					headerTintColor: "#002145"
				};
			}
		},
		Login: {
			screen: Login,
			navigationOptions: {
				header: null
			}
		},
		BookingInfo: {
			screen: BookingInfo,
			navigationOptions: ({ navigation }) => ({
				title: navigation.state.params.roomName
			})
		}
	},
	{
		initialRouteName: "Login",
		defaultNavigationOptions: {
			headerStyle: {
				backgroundColor: "#002145"
			},
			headerTitleStyle: {
				fontWeight: "200"
			},
			headerTintColor: "white"
		}
	}
);

const HeaderButtons = props => (
	<View style={styles.headerButtonContainer}>
		<TouchableOpacity
			onPress={props.newBooking}
			style={styles.headerButton}
		>
			<Image
				style={styles.headerButtonImage}
				source={require("../assets/plus-48.png")}
			/>
		</TouchableOpacity>
		<TouchableOpacity
			onPress={props.settings}
			style={styles.headerButton}
		>
			<Image
				style={styles.headerButtonImage}
				source={require("../assets/settings-64.png")}
			/>
		</TouchableOpacity>
	</View>
);

export default createAppContainer(RootNavigator);
