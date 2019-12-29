import React from "react";
import {
	View,
	TouchableOpacity,
	Text,
	FlatList
} from "react-native";
import Styles from "../styles";
import httpsFunction from "../Functions";

export default class Home extends React.Component {
	state: {
		bookings: Object[];
	};
	props: {
		navigation: any;
	};

	constructor(props) {
		super(props);
		this.state = {
			bookings: []
		};
		this._renderBooking = this._renderBooking.bind(this);
	}

	componentDidMount() {
		const today = new Date();
		httpsFunction("getBooked", {
			day: today.getDay(),
			month: today.getMonth() + 1,
			year: today.getFullYear()
		})
			.then(resp => {
				this.setState({ bookings: resp });
			})
			.catch(err => console.log("ERROR " + err));
	}

	_timeString(time) {
		return Number(time) % 1 == 0
			? `${time}:00`
			: `${Math.floor(time)}:30`;
	}

	_renderBooking(booking) {
		return (
			<TouchableOpacity
				onPress={() => {
					this.props.navigation.navigate("BookingInfo", {
						...booking.item
					});
				}}
				style={Styles.bookingContainer}
			>
				<View>
					<Text style={Styles.bookingTitle}>
						{booking.item.roomName}
					</Text>
					<Text style={Styles.bookingText}>
						{booking.item.date}
					</Text>
					<Text style={Styles.bookingText}>
						{booking.item.span} Hours
					</Text>
				</View>
				<Text style={Styles.bookingTime}>
					{booking.item.startTime}
				</Text>
			</TouchableOpacity>
		);
	}

	render() {
		if (this.state.bookings.length > 0) {
			return (
				<View style={Styles.container}>
					<FlatList
						style={Styles.bookingList}
						data={this.state.bookings}
						renderItem={this._renderBooking}
						keyExtractor={booking => booking.toString()}
					/>
				</View>
			);
		} else {
			return (
				<View style={Styles.containerCentered}>
					<TouchableOpacity
						onPress={() => {
							this.props.navigation.navigate("DateTime");
						}}
						style={{ ...Styles.button, width: "50%" }}
					>
						<Text style={Styles.buttonText}>
							Create new booking
						</Text>
					</TouchableOpacity>
				</View>
			);
		}
	}
}
