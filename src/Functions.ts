import * as Keychain from "react-native-keychain";

const URL =
	"https://us-central1-ubco-bookings.cloudfunctions.net/";

export default async (
    path: string,
    params?: {
        year?: string;
				month?: number;
				day?: number;
				startTime?: number;
				endTime?: number;
				area?: string;
				roomID?: number;
				title?: string;
				description?: string;
				roomName?: string;
				areaName?: string;
				email?: string;
				phone?: string;
    }
) => {
	const creds = await Keychain.getGenericPassword();
	return fetch(URL + path, {
		method: "POST",
		mode: "cors",
		cache: "no-cache",
		credentials: "same-origin",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(
			creds ? { ...params, ...creds } : params
		)
	})
		.then(resp => resp.json())
		.then(respJson => {
			if (respJson.success) {
				return respJson.data;
			} else {
          console.log(respJson);
				throw "Data retrieval was unsuccessful";
			}
		});
};
