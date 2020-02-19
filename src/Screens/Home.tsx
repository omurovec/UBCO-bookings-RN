import React, { useState, useEffect } from "react";
import {
	View,
	TouchableOpacity,
	Text,
	FlatList
} from "react-native";
import Styles from "../styles";
import httpsFunction from "../Functions";
import AsyncStorage from "@react-native-community/async-storage";

export default (props: {navigation: {}}) => {
    const [bookings, setBookings] = useState([]);
    const [date, setDate] = useState(new Date());

    useEffect(() => {
        httpsFunction("getBooked", {
			      day: date.getDate(),
			      month: date.getMonth() + 1,
			      year: date.getFullYear()
		    })
        .then(resp => {
            console.log("RESP: " +resp)
            setBookings(resp)
            const bookingsToStore = resp.map(item => [
                `BOOKING${item.id}`,
                JSON.stringify(item)
            ]);
            AsyncStorage.multiSet(bookingsToStore);
        })
        .catch(err => {
				        console.log("ERROR " + err);
                getStoredBookings();
			      });
    });

    function renderBooking(booking) {
        return (
        <TouchableOpacity
            onPress={() => {
            props.navigation.navigate("BookingInfo", {
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

    function getStoredBookings() {
        //Retrieve bookings that were stored using AsyncStorage
        AsyncStorage.getAllKeys((error, keys) => {
            //Filter out other data stored in AsyncStorage
            const bookingKeys = keys.filter(
                key => key.substring(0, 8) == "BOOKING"
            );
            AsyncStorage.multiGet(bookingKeys, store => {
                if(store) {
                    let outDated = [];
                    const storedBookings = store.map(item => {
                        if (
                            new Date(item[1].date).getTime() <
                            date.getTime()
                        ) {
                            return JSON.parse(item[1]);
                        }
                        outDated.push(item[0]);
                        return null;
                    })
                    setBookings(storedBookings);
                    AsyncStorage.multiRemove(outDated, err => {
                        console.warn(err);
                    });
                } else {
                    console.log("No stored bookings")
                }
            })
            .catch((error) => {
                console.log("ERROR: " + error)
            });
        });
    }

    if (bookings.length) {
			  return (
				    <View style={Styles.container}>
					      <FlatList
						        style={Styles.bookingList}
						        data={bookings}
						        renderItem={this.renderBooking}
						        keyExtractor={booking => booking.toString()}
					      />
				    </View>
			  );
		} else {
			  return (
				    <View style={Styles.containerCentered}>
					      <TouchableOpacity
						        onPress={() => {
							          props.navigation.navigate("DateTime");
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
