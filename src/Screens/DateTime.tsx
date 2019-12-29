import React from "react";
import {
	View,
	Text,
	Picker,
	TouchableOpacity
} from "react-native";
import Styles from "../styles";
import { Calendar } from "react-native-calendars";

export default class DateTime extends React.Component {
	state: {
		currDate: Date;
		currTime: number;
		selectedDate: Date;
		selectedTime: number;
	};
	props: any;

	constructor(props) {
		super(props);
		const currDate = new Date();
		const selectedDate = new Date();
		this.state = {
			currDate: currDate,
			currTime:
				currDate.getHours() +
				Math.ceil(currDate.getMinutes() / 30) / 2,
			selectedDate: selectedDate,
			selectedTime:
				selectedDate.getHours() +
				Math.ceil(selectedDate.getMinutes() / 30) / 2
		};
	}

	getDateString(date) {
		const month = date.getMonth() + 1;
		const day = date.getDate();
		return `${date.getFullYear()}-${month < 10
			? "0" + month
			: month}-${day < 10 ? "0" + day : day}`;
	}

	_renderTimes() {
		const times = [];
		const startTime =
			this.state.selectedDate.getDate() ==
			this.state.currDate.getDate()
				? this.state.currTime
				: 6;
		for (let i = startTime; i < 24; i += 0.5) {
			times.push(
				<Picker.Item
					key={i.toString()}
					label={
						i % 1 === 0 ? `${i}:00` : `${Math.floor(i)}:30`
					}
					value={i}
				/>
			);
		}
		return times;
	}

	render() {
		return (
			<View style={Styles.container}>
				<View
					style={{
						...Styles.dateTimeCardContainer,
						marginBottom: 0
					}}
				>
					<Text style={Styles.dateTimeCardTitle}>Date</Text>
					<Calendar
						theme={{
							todayTextColor: "#327ed1",
							arrowColor: "#002145"
						}}
						markedDates={{
							[this.getDateString(
								this.state.selectedDate
							)]: {
								selected: true,
								selectedColor: "#002145"
							}
						}}
						current={() =>
							this.getDateString(this.state.currDate)}
						minDate={() =>
							this.getDateString(this.state.currDate)}
						onDayPress={day => {
							this.state.selectedDate.setDate(day.day);
							this.state.selectedDate.setMonth(
								day.month - 1
							);
							this.forceUpdate();
						}}
					/>
				</View>
				<View style={Styles.dateTimeCardContainer}>
					<Text style={Styles.dateTimeCardTitle}>Time</Text>
					<Picker
						selectedValue={this.state.selectedTime}
						onValueChange={val => {
							this.setState({ selectedTime: val });
						}}
					>
						{this._renderTimes()}
					</Picker>
				</View>
				<TouchableOpacity
					style={{ ...Styles.button, width: "90%" }}
					onPress={() =>
						this.props.navigation.navigate("Bookings", {
							date: this.state.selectedDate,
							time: this.state.selectedTime
						})}
				>
					<Text style={Styles.buttonText}>
						Check Available Bookings
					</Text>
				</TouchableOpacity>
			</View>
		);
	}
}
