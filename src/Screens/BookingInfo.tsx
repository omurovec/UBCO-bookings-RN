import React, { useEffect } from "react";
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

export default (
    props: {
        navigation: {
            state: {
                params: {
                    id: string;
                    startTime: string;
                    title: string;
                    description: string;
                    roomName: string;
                    areaName: string;
                    date: string;
                }
            }
        }
    }) => {

    cancelBooking = () => {
        httpsFunction("cancelSlot", {
            id: props.navigation.state.id
        })
            .then(() =>
                props.navigation.dispatch(
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
    
    return (
			<View style={Styles.container}>
				<View style={Styles.bookingInfoHeader}>
					<Text style={Styles.bookingInfoDate}>
						{props.navigation.state.date}
					</Text>
					<Text style={Styles.bookingInfoTime}>
						{props.navigation.state.startTime}
					</Text>
				</View>
				<Text style={Styles.bookingInfoText}>
					{props.navigation.state.areaName}
				</Text>

				<Text style={Styles.bookingInfoTitle}>
					{props.navigation.state.title}
				</Text>
				<Text style={Styles.bookingInfoText}>
					{props.navigation.state.description}
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

