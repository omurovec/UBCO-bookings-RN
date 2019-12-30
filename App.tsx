import React from "react";
import StackNav from "./src";
import {
	StackActions,
	NavigationActions
} from "react-navigation";
import AsyncStorage from "@react-native-community/async-storage";
import * as Keychain from "react-native-keychain";

export default class Root extends React.Component {
	navigator: any;

	constructor(props) {
		super(props);
	}

	async componentWillMount() {
		const novell = await Keychain.getGenericPassword();
		const contact = await AsyncStorage.multiGet([
			"email",
			"phone"
		]);
		if (novell && contact) {
			this.navigator.dispatch(
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

	render() {
		return (
			<StackNav
				ref={navigator => (this.navigator = navigator)}
			/>
		);
	}
}
