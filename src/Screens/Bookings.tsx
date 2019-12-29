import React from "react";
import {
	View,
	Text,
	Image,
	TouchableOpacity
} from "react-native";
import Styles from "../styles";
import { FlatList } from "react-native-gesture-handler";
import httpsFunction from "../Functions";

interface Slot {
	area: {
		name: String;
		id: String;
	};
	id: String;
	name: String;
	maxSpan: number;
}

export default class Bookings extends React.Component {
	state: {
		slots: Slot[];
		fetching: boolean;
	};

	props: {
		navigation: any;
	};

	navParams: {
		date: Date;
		time: number;
	};

	constructor(props) {
		super(props);
		this.state = {
			slots: [],
			fetching: true
		};
		this.navParams = this.props.navigation.state.params;
	}

	componentWillMount() {
		httpsFunction("fetchSchedule", {
			time: this.navParams.time,
			month: this.navParams.date.getMonth() + 1,
			day: this.navParams.date.getDate(),
			year: this.navParams.date.getFullYear()
		})
			.then(resp => {
				const availableSlots = [];
				resp.map(area => {
					area.slots.map(slot => {
						availableSlots.push({
							...slot,
							area: {
								name: area.name,
								id: area.id
							}
						});
					});
				});
				this.setState({
					slots: availableSlots,
					fetching: false
				});
			})
			.catch(err =>
				this.setState({ slot: null, fetching: false })
			);
	}

	render() {
		if (
			this.state.slots.length > 0 &&
			!this.state.fetching
		) {
			return (
				<View style={Styles.container}>
					<FlatList
						style={Styles.slotsContainer}
						data={this.state.slots}
						keyExtractor={(item: Slot) =>
							`${item.area.name}-${item.name}`
						}
						renderItem={item => {
							const title = item.item.name.substring(
								0,
								item.item.name.indexOf("(")
							);
							const capacity = item.item.name.substring(
								item.item.name.indexOf("(") + 1,
								item.item.name.indexOf(")")
							);
							return (
								<TouchableOpacity
									onPress={() => {
										this.props.navigation.navigate(
											"Confirm",
											{
												...this.navParams,
												...item.item
											}
										);
									}}
									style={Styles.slotContainer}
								>
									<View style={Styles.slotBubble}>
										<Text style={Styles.slotBubbleText}>
											{item.item.area.name.charAt(0)}
										</Text>
									</View>
									<View style={Styles.slotTextContainer}>
										<Text style={Styles.slotTitle}>
											{title}
										</Text>
										<Text style={Styles.slotText}>
											Max time: {item.item.maxSpan / 2}{" "}
											Hours
										</Text>
										<Text style={Styles.slotText}>
											capacity: {capacity}
										</Text>
									</View>
									<Image
										style={Styles.slotArrowImg}
										source={require("../../assets/arrow-64.png")}
									/>
								</TouchableOpacity>
							);
						}}
					/>
				</View>
			);
		} else if (!this.state.fetching) {
			return (
				<View style={Styles.containerCentered}>
					<Text>No bookings available at this time.</Text>
				</View>
			);
		} else {
			return (
				<View style={Styles.containerCentered}>
					<Text>Loading...</Text>
				</View>
			);
		}
	}
}
