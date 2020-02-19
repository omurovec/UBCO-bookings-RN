import React, { useEffect } from "react";
import StackNav from "./src";
import {
	StackActions,
	NavigationActions
} from "react-navigation";
import AsyncStorage from "@react-native-community/async-storage";
import * as Keychain from "react-native-keychain";

export default function App() {
    useEffect(() => {
        async function isLoggedIn() {
            const novell = await Keychain.getGenericPassword();
            const contact = await AsyncStorage.multiGet([
                "email",
                "phone"
            ])
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
        isLoggedIn();
    })
    return (
        <StackNav
        ref={navigator => (this.navigator = navigator)}/>
    )
}
