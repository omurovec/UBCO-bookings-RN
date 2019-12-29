import React from "react";
import {
	View,
	Text,
	TouchableOpacity,
	Alert
} from "react-native";
import httpsFunction from "../Functions";
import Styles from "../styles";
import {
	StackActions,
	NavigationActions
} from "react-navigation";

export default class BookingInfo extends React.Component {
	props: {
		navigation: any;
	};
	navParams: {
		id: string;
		startTime: string;
		title: string;
		description: string;
		roomName: string;
		areaName: string;
		date: string;
	};

	constructor(props) {
		super(props);
		this.navParams = this.props.navigation.state.params;
		this.cancelBooking = this.cancelBooking.bind(this);
	}

	cancelBooking() {
		httpsFunction("cancelSlot", {
			id: this.navParams.id
		})
			.then(() =>
				this.props.navigation.dispatch(
					StackActions.reset({
						index: 0,
						actions: [
							NavigationActions.navigate({
								routeName: "Home"
							})
						]
					})
				)
			)
			.catch(() => {
				Alert.alert(
					"There was an error deleting your booking",
					"Sorry about this, please notify Owen about this error",
					[{ text: "dismiss" }]
				);
			});
	}

	render() {
		return (
			<View style={Styles.container}>
				<View style={Styles.bookingInfoHeader}>
					<Text style={Styles.bookingInfoDate}>
						{this.navParams.date}
					</Text>
					<Text style={Styles.bookingInfoTime}>
						{this.navParams.startTime}
					</Text>
				</View>
				<Text style={Styles.bookingInfoText}>
					{this.navParams.areaName}
				</Text>

				<Text style={Styles.bookingInfoTitle}>
					{this.navParams.title}
				</Text>
				<Text style={Styles.bookingInfoText}>
					{this.navParams.description}
				</Text>
				<TouchableOpacity
					style={{
						...Styles.button,
						borderColor: "red",
						width: "85%",
						marginTop: 30
					}}
					onPress={() => {
						Alert.alert(
							"Delete Booking?",
							"Are you sure you would like to cancel this booking?",
							[
								{
									text: "Yes",
									onPress: this.cancelBooking
								},
								{ text: "Cancel" }
							]
						);
					}}
				>
					<Text
						style={{ ...Styles.buttonText, color: "red" }}
					>
						Cancel Booking
					</Text>
				</TouchableOpacity>
			</View>
		);
	}
}
