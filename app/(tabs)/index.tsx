import { router } from "expo-router";
import React from "react";
import { Image, ImageBackground, KeyboardAvoidingView, Platform, StyleSheet, Text, TouchableOpacity, useColorScheme, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LandingScreen() {
	const colorScheme = useColorScheme();
	const isDark = colorScheme === 'dark';

	const getThemeColor = (light: string, dark: string) => isDark ? dark : light;

	return (
		<View style={[styles.container, { backgroundColor: getThemeColor("#FFFFFF", "#1A1A1A") }]}>
			<ImageBackground 
				source={{uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/RoYkSihffo/30kjbnxc_expires_30_days.png"}} 
				resizeMode={'stretch'}
				style={styles.view}
				>
				<SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
					<KeyboardAvoidingView 
						behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
						style={styles.keyboardView}
					>
						<View style={styles.content}>
							<View style={styles.column}>
								<Image
									source={{uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/RoYkSihffo/eofueq48_expires_30_days.png"}} 
									resizeMode={"stretch"}
									style={styles.image}
								/>
								<View style={styles.column2}>
									<Text style={[styles.text, { color: getThemeColor("#FFFFFF", "#FFFFFF") }]}>
										{"Let's Get Started"}
									</Text>
									<Text style={[styles.text2, { color: getThemeColor("#FFFFFF", "#E0E0E0") }]}>
										{"Schedule your appointment in just a few taps."}
									</Text>
								</View>
							</View>

							<View style={styles.buttonContainer}>
								<TouchableOpacity style={styles.button} onPress={() => router.push('/signup')}>
									<Text style={styles.text3}>
										{"Get Started"}
									</Text>
								</TouchableOpacity>
								<TouchableOpacity style={styles.button2} onPress={() => router.push('/login')}>
									<Text style={styles.text4}>
										{"I'm already a member"}
									</Text>
								</TouchableOpacity>
							</View>
						</View>
					</KeyboardAvoidingView>
				</SafeAreaView>
			</ImageBackground>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#FFFFFF",
	},
	keyboardView: {
		flex: 1,
	},
	safeArea: {
		flex: 1,
	},
	content: {
		flex: 1,
		justifyContent: 'space-between',
		paddingVertical: 20,
		alignItems: 'center',
	},
	button: {
		alignSelf: "stretch",
		alignItems: "center",
		backgroundColor: "#38B45D",
		borderRadius: 12,
		paddingVertical: 18,
		marginHorizontal: 16,
		marginBottom: 12,
	},
	button2: {
		alignSelf: "stretch",
		alignItems: "center",
		borderColor: "#C7C5CC",
		borderRadius: 12,
		borderWidth: 1,
		paddingVertical: 16,
		marginHorizontal: 16,
		marginBottom: 20,
	},
	column: {
		alignItems: "center",
		justifyContent: "center",
	},
	column2: {
		marginBottom: 30,
		marginHorizontal: 35,
	},
	buttonContainer: {
		alignSelf: "stretch",
		marginHorizontal: 0,
	},
	image: {
		width: 140,
		height: 83,
		marginBottom: 30,
	},
	text: {
		color: "#FFFFFF",
		fontSize: 32,
		fontWeight: "bold",
		textAlign: "center",
		marginBottom: 12,
	},
	text2: {
		color: "#FFFFFF",
		fontSize: 14,
		textAlign: "center",
	},
	text3: {
		color: "#FFFFFF",
		fontSize: 18,
		fontWeight: "bold",
	},
	text4: {
		color: "#FFFFFF",
		fontSize: 16,
		fontWeight: "500",
	},
	view: {
		flex: 1,
	},
});
