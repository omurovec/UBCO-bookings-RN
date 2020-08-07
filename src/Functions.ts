import * as Keychain from "react-native-keychain";

const URL =
	"https://us-central1-ubco-bookings.cloudfunctions.net/";

export default async (path, params) => {
	const creds = await Keychain.getGenericPassword();
    console.log(params);
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
        console.log(respJson);
			if (respJson.success) {
				return respJson.data;
			} else {
				throw "Data retrieval was unsuccessful";
			}
		});
};
