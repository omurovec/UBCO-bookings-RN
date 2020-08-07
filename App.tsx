import React, { useEffect } from "react";
import StackNav from "./src";
import {
	StackActions,
	NavigationActions
} from "react-navigation";
import AsyncStorage from "@react-native-community/async-storage";
import * as Keychain from "react-native-keychain";

export default function Root() {
    //Check storage to see if user has logged in before and stored their credentials
    useEffect(() => {
        async function checkCreds() {
            const novell = await Keychain.getGenericPassword();
		        const contact = await AsyncStorage.multiGet([
			          "email",
			          "phone"
		        ]);
		        if (novell && contact) {
                //Re-route to home screen
			          navigator.dispatch(
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
        checkCreds()
    })
    //Return main navigator from ./src/index.tsx
    return (
			  <StackNav
				ref={navigator => (this.navigator = navigator)}
			  />
    )
}
