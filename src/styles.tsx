import { StyleSheet } from "react-native";

const colors = {
	blueDark: "#002145",
	lightGrey: "#AAA",
	darkGrey: "#666"
};
export default StyleSheet.create({
	container: {
		width: "100%",
		height: "100%",
		alignItems: "center"
	},
	containerCentered: {
		width: "100%",
		height: "100%",
		alignItems: "center",
		justifyContent: "center"
	},
	button: {
		borderColor: colors.blueDark,
		color: "white",
		borderRadius: 5,
		borderWidth: 2,
		justifyContent: "center",
		alignContent: "center"
	},
	buttonText: {
		padding: 15,
		color: colors.blueDark,
		textAlign: "center"
	},
	headerButtonContainer: {
		flexDirection: "row"
	},
	headerButton: {
		padding: 10,
		width: 50,
		height: 50
	},
	headerButtonImage: {
		width: "100%",
		height: "100%"
	},
	settingsOptionContainer: {
		flexDirection: "row",
		width: "100%",
		padding: 10,
		borderBottomWidth: 1,
		borderColor: colors.lightGrey,
		alignItems: "center"
	},
	settingsOptionTitle: {
		fontWeight: "bold",
		color: "black",
		fontSize: 15,
		padding: 10,
		paddingBottom: 0
	},
	settingsOptionText: {
		color: colors.lightGrey,
		fontSize: 14,
		padding: 10
	},
	settingsOptionArrow: {
		width: 30,
		height: 30,
		position: "absolute",
		right: 20
	},
	editSettingsInput: {
		color: colors.lightGrey,
		fontSize: 16,
		width: "100%"
	},
	dateTimeCardContainer: {
		width: "90%",
		borderColor: colors.blueDark,
		borderWidth: 2,
		borderRadius: 5,
		margin: 15
	},
	dateTimeCardTitle: {
		textAlign: "center",
		width: "100%",
		backgroundColor: colors.blueDark,
		borderTopRightRadius: 3,
		borderTopLeftRadius: 3,
		justifyContent: "center",
		alignItems: "center",
		color: "white",
		padding: 10,
		fontSize: 16
	},
	slotsContainer: {
		width: "100%"
	},
	slotContainer: {
		borderBottomWidth: 1,
		borderColor: colors.lightGrey,
		width: "100%",
		padding: 10,
		flexDirection: "row",
		justifyContent: "flex-start",
		alignItems: "center"
	},
	slotBubble: {
		width: 60,
		height: 60,
		borderColor: colors.lightGrey,
		borderWidth: 1,
		borderRadius: 30,
		margin: 5,
		alignItems: "center",
		justifyContent: "center"
	},
	slotBubbleText: {
		fontSize: 24,
		color: colors.lightGrey
	},
	slotTextContainer: {
		margin: 5,
		marginLeft: 10
	},
	slotTitle: {
		fontWeight: "500"
	},
	slotText: {
		color: colors.lightGrey
	},
	slotArrowImg: {
		width: 30,
		height: 30,
		position: "absolute",
		right: 20
	},
	confirmInput: {
		width: "100%",
		borderBottomWidth: 1,
		borderColor: colors.lightGrey,
		fontSize: 18,
		padding: 10,
		color: colors.darkGrey
	},
	loginContainer: {
		width: "100%",
		height: "100%",
		backgroundColor: colors.blueDark,
		alignItems: "center",
		justifyContent: "center"
	},
	loginImage: {
		width: 145,
		height: 145
	},
	loginPrompt: {
		width: "60%",
		textAlign: "center",
		color: "white",
		fontSize: 15,
		margin: 20,
		lineHeight: 17
	},
	loginInput: {
		color: "white",
		borderBottomColor: "white",
		borderBottomWidth: 1,
		fontSize: 14,
		width: "50%",
		marginBottom: 5,
		marginLeft: 0,
		padding: 0
	},
	loginButton: {
		width: 70,
		height: 70,
		marginTop: 30
	},
	loginButtonImage: {
		width: "100%",
		height: "100%"
	},
	bookingList: {
		width: "100%"
	},
	bookingContainer: {
		padding: 20,
		alignItems: "center",
		flexDirection: "row",
		width: "100%",
		borderBottomColor: colors.lightGrey,
		borderBottomWidth: 1
	},
	bookingTitle: {
		color: "black",
		fontSize: 16
	},
	bookingText: {
		color: colors.darkGrey,
		fontSize: 14
	},
	bookingTime: {
		color: "black",
		fontSize: 24,
		position: "absolute",
		right: 20
	},
	bookingInfoHeader: {
		justifyContent: "space-between",
		color: "black",
		width: "100%",
		flexDirection: "row",
		borderBottomColor: colors.lightGrey,
		borderBottomWidth: 1
	},
	bookingInfoDate: {
		color: "black",
		fontSize: 18,
		margin: 10
	},
	bookingInfoTime: {
		color: "black",
		alignSelf: "flex-end",
		fontSize: 18,
		margin: 10
	},
	bookingInfoTitle: {
		color: "black",
		fontSize: 18,
		margin: 2,
		fontWeight: "500"
	},
	bookingInfoText: {
		color: colors.darkGrey,
		fontSize: 16
	}
});
