import React from "react";
import {
	View,
	TextInput,
	Picker,
	TouchableOpacity,
	Text,
	Alert
} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import {
	StackActions,
	NavigationActions
} from "react-navigation";
import Styles from "../styles";
import httpsFunction from "../Functions";

export default class Confirm extends React.Component {
	navParams: {
		time: number;
		date: Date;
		area: {
			name: String;
			id: String;
		};
		id: String;
		name: String;
		maxSpan: number;
	};
	props: {
		navigation: any;
	};
	state: {
		span: number;
		title?: string;
		description?: string;
	};

	constructor(props) {
		super(props);
		this.navParams = this.props.navigation.state.params;
		this.state = {
			span: -1
		};
		this.confirm = this.confirm.bind(this);
	}

	async confirm() {
		const email = await AsyncStorage.getItem("email");
		const phone = await AsyncStorage.getItem("phone");
		if (
			this.state.description &&
			this.state.title &&
			this.state.span > 0
		) {
			httpsFunction("bookSlot", {
				year: this.navParams.date.getFullYear(),
				month: this.navParams.date.getMonth() + 1,
				day: this.navParams.date.getDate(),
				startTime: this.navParams.time,
				endTime: this.navParams.time + this.state.span,
				area: this.navParams.area.id,
				roomID: this.navParams.id,
				title: this.state.title,
				description: this.state.description,
				roomName: this.navParams.name,
				areaName: this.navParams.area.name,
				email: email,
				phone: phone
			})
				.then(() => {
					Alert.alert("Booking was successful!", "", [
						{
							text: "ok",
							onPress: () => {
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
							}
						}
					]);
				})
				.catch(err => {
					Alert.alert(
						"Error fulfilling your booking",
						"Please check settings to make sure you've set your email and novell credentials properly and try again",
						[{ text: "dismiss" }]
					);
				});
		} else {
			Alert.alert(
				"Missing fields",
				"Please make sure you have filled out the title, desription and duration then try again",
				[{ text: "dismiss" }]
			);
		}
	}

	_renderTimes() {
		const times = [
			<Picker.Item
				label="Choose length"
				color="#AAA"
				value={-1}
				key={"-1"}
			></Picker.Item>
		];
		for (
			let i = 0.5;
			i <= this.navParams.maxSpan / 2;
			i += 0.5
		) {
			times.push(
				<Picker.Item
					label={`${i} Hours`}
					value={i}
					key={i.toString()}
				></Picker.Item>
			);
		}
		return times;
	}

	render() {
		return (
			<View
				style={{
					...Styles.container,
					borderTopWidth: 1,
					borderColor: "#AAA"
				}}
			>
				<TextInput
					style={Styles.confirmInput}
					placeholder="Title"
					onChangeText={text => {
						this.setState({ title: text });
					}}
				/>
				<Picker
					style={Styles.confirmInput}
					prompt="Choose length"
					selectedValue={this.state.span}
					onValueChange={val => {
						this.setState({ span: val });
					}}
				>
					{this._renderTimes()}
				</Picker>
				<TextInput
					style={{
						...Styles.confirmInput,
						borderTopWidth: 1,
						height: 100,
						textAlignVertical: "top"
					}}
					onChangeText={text => {
						this.setState({ description: text });
					}}
					placeholder="Description"
					multiline={true}
				/>
				<TouchableOpacity
					onPress={this.confirm}
					style={{
						...Styles.button,
						width: "90%",
						margin: 20
					}}
				>
					<Text style={Styles.buttonText}>Confirm</Text>
				</TouchableOpacity>
			</View>
		);
	}
}
