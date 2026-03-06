import * as Linking from 'expo-linking';
import { router } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';
import React, { useState } from "react";
import { ActivityIndicator, Alert, Image, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View, useColorScheme } from "react-native";

const BACKEND_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL;
const GOOGLE_CALLBACK_PATH = 'login';

export default function LoginScreen() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [rememberMe, setRememberMe] = useState(false);
	const [loading, setLoading] = useState(false);
	const colorScheme = useColorScheme();
	const isDark = colorScheme === 'dark';

	const getThemeColor = (light: string, dark: string) => isDark ? dark : light;

	const handleLogin = async () => {
		if (!email || !password) {
			Alert.alert('Error', 'Please fill in all fields');
			return;
		}

		setLoading(true);

		try {
			// Placeholder flow: wire this to your backend auth endpoint next.
			await new Promise((resolve) => setTimeout(resolve, 450));
			router.replace('/');
		} catch {
			Alert.alert('Login Failed', 'Unable to sign in right now. Please try again.');
		} finally {
			setLoading(false);
		}
	};

	const handleGoogleSignIn = async () => {
		if (!BACKEND_BASE_URL) {
			Alert.alert('Missing Setup', 'Set EXPO_PUBLIC_API_BASE_URL in your env before using Google login.');
			return;
		}

		const callbackUrl = Linking.createURL(GOOGLE_CALLBACK_PATH);
		const backendAuthUrl = `${BACKEND_BASE_URL.replace(/\/$/, '')}/auth/google/start?redirect_uri=${encodeURIComponent(callbackUrl)}`;

		try {
			setLoading(true);
			const result = await WebBrowser.openAuthSessionAsync(backendAuthUrl, callbackUrl);

			if (result.type === 'cancel' || result.type === 'dismiss') {
				Alert.alert('Cancelled', 'Google sign-in was cancelled.');
				return;
			}

			if (result.type !== 'success' || !("url" in result)) {
				Alert.alert('Login Failed', 'Google sign-in did not complete. Please try again.');
				return;
			}

			const parsedUrl = Linking.parse(result.url);
			const queryParams = parsedUrl.queryParams ?? {};
			const backendError = typeof queryParams.error === 'string' ? queryParams.error : null;
			const tokenFromBackend =
				typeof queryParams.token === 'string'
					? queryParams.token
					: typeof queryParams.access_token === 'string'
						? queryParams.access_token
						: null;

			if (backendError) {
				Alert.alert('Login Failed', backendError);
				return;
			}

			if (!tokenFromBackend) {
				Alert.alert('Login Failed', 'No token returned from backend.');
				return;
			}

			// TODO: Persist tokenFromBackend (SecureStore) and fetch user profile.
			Alert.alert('Success', 'Google sign-in successful! Redirecting...');
			await new Promise((resolve) => setTimeout(resolve, 500));
			router.replace('/');
		} catch (error) {
			console.error('Google Sign-In Error:', error);
			Alert.alert('Error', 'Failed to sign in with Google. Please try again.');
		} finally {
			setLoading(false);
		}
	};

	return (
		<KeyboardAvoidingView 
			behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
			style={[styles.container, { backgroundColor: getThemeColor('#FFFFFF', '#1A1A1A') }]}
		>
			<View style={styles.content}>
					<View style={styles.column2}>
						<Image
							source={{uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/RoYkSihffo/th2440w1_expires_30_days.png"}}
							resizeMode={"stretch"}
							style={styles.image}
						/>
					</View>
					<View style={styles.column3}>
						<View style={styles.view2}>
							<Text style={[styles.text2, { color: getThemeColor('#000000', '#FFFFFF') }]}>
								{"Login"}
							</Text>
						</View>
						<View style={[styles.row, { backgroundColor: getThemeColor('#8C8C8C1A', '#2A2A2A') }]}>
							<Image
								source={{uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/RoYkSihffo/tdtr3jlb_expires_30_days.png"}}
								resizeMode={"stretch"}
								style={styles.image2}
							/>
							<TextInput
								style={[styles.input, { color: getThemeColor('#4F4F4F', '#E0E0E0') }]}
								placeholder="Enter email or username"
								placeholderTextColor={getThemeColor('#4F4F4F', '#A0A0A0')}
								autoCapitalize="none"
								editable={!loading}
								value={email}
								onChangeText={setEmail}
								keyboardType="email-address"
							/>
						</View>
						<View style={[styles.row2, { backgroundColor: getThemeColor('#8C8C8C1A', '#2A2A2A') }]}>
							<Image
								source={{uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/RoYkSihffo/2zvhtu19_expires_30_days.png"}}
								resizeMode={"stretch"}
								style={styles.image3}
							/>
							<TextInput
								style={[styles.input, { flex: 1, color: getThemeColor('#4F4F4F', '#E0E0E0') }]}
								placeholder="Enter password"
								placeholderTextColor={getThemeColor('#4F4F4F', '#A0A0A0')}
								secureTextEntry={true}
								editable={!loading}
								value={password}
								onChangeText={setPassword}
							/>
							<View style={styles.box}>
							</View>
							<TouchableOpacity disabled={true}>
								<Image
									source={{uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/RoYkSihffo/lx6by7gl_expires_30_days.png"}}
									resizeMode={"stretch"}
									style={styles.image4}
								/>
							</TouchableOpacity>
						</View>
						<View style={styles.row3}>
							<View style={styles.row4}>
								<TouchableOpacity style={[styles.box2, { backgroundColor: getThemeColor('#8C8C8C1A', '#3A3A3A') }, rememberMe && styles.box2Checked]} onPress={() => setRememberMe(!rememberMe)}>
									{rememberMe && <Text style={styles.checkmark}>✓</Text>}
								</TouchableOpacity>
								<Text style={[styles.text4, { color: getThemeColor('#000000', '#FFFFFF') }]}>
									{"Remember Me"}
								</Text>
							</View>
							<TouchableOpacity onPress={() => Alert.alert('Info', 'Forgot password flow not wired yet.')}>
								<View style={styles.view3}>
									<Text style={[styles.text5, { color: getThemeColor('#000000', '#FFFFFF') }]}>
										{"Forgot Password?"}
									</Text>
								</View>
							</TouchableOpacity>
						</View>
					</View>
					<TouchableOpacity
						style={[styles.button, loading && styles.buttonDisabled]}
						onPress={handleLogin}
						disabled={loading}
					>
						{loading ? (
							<ActivityIndicator color="#FFFFFF" />
						) : (
							<Text style={styles.text6}>
								{"Log In"}
							</Text>
						)}
					</TouchableOpacity>
					<View style={styles.view4}>
						<Text style={[styles.text7, { color: getThemeColor('#000000', '#E0E0E0') }]}>
							{"By tapping Continue, you agree to our Terms and \nacknowledge that you have read our Privacy Policy"}
						</Text>
					</View>
					<View style={styles.row5}>
						<View style={[styles.box3, { backgroundColor: getThemeColor('#4F4F4F', '#5A5A5A') }]}>
						</View>
						<Text style={[styles.text8, { color: getThemeColor('#000000', '#FFFFFF') }]}>
							{"or Log In with"}
						</Text>
						<View style={[styles.box4, { backgroundColor: getThemeColor('#4F4F4F', '#5A5A5A') }]}>
						</View>
					</View>
					<View style={styles.row6}>
						<TouchableOpacity disabled={loading} onPress={handleGoogleSignIn}>
							<Image
								source={{uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/RoYkSihffo/i8awk3zz_expires_30_days.png"}}
								resizeMode={"stretch"}
								style={styles.image5}
							/>
						</TouchableOpacity>
						<TouchableOpacity disabled={loading}>
							<Image
								source={{uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/RoYkSihffo/233g4wkr_expires_30_days.png"}}
								resizeMode={"stretch"}
								style={styles.image6}
							/>
						</TouchableOpacity>
					</View>
					<View style={styles.row7}>
						<Text style={[styles.text9, { color: getThemeColor('#000000', '#FFFFFF') }]}>
							{"Don't have an account yet?"}
						</Text>
						<TouchableOpacity disabled={loading} onPress={() => router.push('/signup')}>
							<Text style={styles.text10}>
								{"Sign up"}
							</Text>
						</TouchableOpacity>
					</View>
			</View>
		</KeyboardAvoidingView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#FFFFFF",
	},
	content: {
		flex: 1,
		paddingTop: 40,
		paddingBottom: 20,
		justifyContent: 'center',
		alignItems: 'center',
	},
	box: {
		flex: 1,
		alignSelf: "stretch",
	},
	box2: {
		width: 15,
		height: 15,
		backgroundColor: "#8C8C8C1A",
		borderRadius: 7,
		marginRight: 5,
		shadowColor: "#FFFFFF2E",
		shadowOpacity: 0.2,
		shadowOffset: {
			width: 0,
			height: 1
		},
		justifyContent: 'center',
		alignItems: 'center',
	},
	box2Checked: {
		backgroundColor: "#38B45D",
	},
	checkmark: {
		color: "#FFFFFF",
		fontSize: 12,
		fontWeight: "bold",
	},
	box3: {
		height: 1,
		flex: 1,
		backgroundColor: "#4F4F4F",
		marginRight: 15,
	},
	box4: {
		height: 1,
		flex: 1,
		backgroundColor: "#4F4F4F",
	},
	button: {
		alignSelf: "stretch",
		alignItems: "center",
		backgroundColor: "#38B45D",
		borderRadius: 25,
		paddingVertical: 8,
		marginBottom: 12,
		marginHorizontal: 16,
		shadowColor: "#00000040",
		shadowOpacity: 0.3,
		shadowOffset: {
			width: 0,
			height: 4
		},
		shadowRadius: 4,
		elevation: 4,
	},
	buttonDisabled: {
		opacity: 0.6,
	},
	column: {
		alignItems: "center",
		paddingVertical: 15,
		flex: 1,
		justifyContent: 'space-between',
	},
	column2: {
		alignItems: "center",
		justifyContent: "center",
		marginBottom: 20,
	},
	column3: {
		alignSelf: "stretch",
		paddingBottom: 12,
		marginHorizontal: 16,
	},
	image: {
		width: 150,
		height: 89,
		marginBottom: 15,
	},
	image2: {
		borderRadius: 7,
		width: 19,
		height: 18,
		marginLeft: 29,
		marginRight: 10,
	},
	image3: {
		borderRadius: 7,
		width: 18,
		height: 20,
		marginLeft: 29,
		marginRight: 10,
	},
	image4: {
		borderRadius: 7,
		width: 22,
		height: 18,
		marginRight: 18,
	},
	image5: {
		width: 59,
		height: 59,
		marginRight: 50,
	},
	image6: {
		width: 59,
		height: 59,
	},
	input: {
		flex: 1,
		fontSize: 13,
		color: "#4F4F4F",
		paddingHorizontal: 8,
	},
	row: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "#8C8C8C1A",
		borderRadius: 7,
		paddingVertical: 15,
		marginBottom: 10,
		shadowColor: "#0000001A",
		shadowOpacity: 0.1,
		shadowOffset: {
			width: 1,
			height: 1
		},
		shadowRadius: 2,
		elevation: 2,
	},
	row2: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "#8C8C8C1A",
		borderRadius: 7,
		paddingVertical: 15,
		marginBottom: 10,
		shadowColor: "#0000001A",
		shadowOpacity: 0.1,
		shadowOffset: {
			width: 1,
			height: 1
		},
		shadowRadius: 2,
		elevation: 2,
	},
	row3: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	row4: {
		flexDirection: "row",
		alignItems: "center",
	},
	row5: {
		alignSelf: "stretch",
		flexDirection: "row",
		alignItems: "center",
		paddingHorizontal: 11,
		marginBottom: 12,
		marginHorizontal: 16,
	},
	row6: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		marginBottom: 12,
	},
	row7: {
		alignSelf: "stretch",
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		marginHorizontal: 16,
	},
	text: {
		color: "#000000",
		fontSize: 13,
		textAlign: "center",
	},
	text2: {
		color: "#000000",
		fontSize: 24,
		fontWeight: "bold",
		textAlign: "center",
	},
	text3: {
		color: "#4F4F4F",
		fontSize: 11,
	},
	text4: {
		color: "#000000",
		fontSize: 12,
		marginRight: 22,
	},
	text5: {
		color: "#000000",
		fontSize: 12,
	},
	text6: {
		color: "#FFFFFF",
		fontSize: 24,
		fontWeight: "bold",
		textAlign: "center",
	},
	text7: {
		color: "#000000",
		fontSize: 12,
		width: 290,
		textAlign: "center",
	},
	text8: {
		color: "#000000",
		fontSize: 12,
		marginRight: 17,
	},
	text9: {
		color: "#000000",
		fontSize: 12,
		marginRight: 15,
	},
	text10: {
		color: "#39B54A",
		fontSize: 12,
		fontWeight: "bold",
	},
	view: {
		paddingBottom: 1,
	},
	view2: {
		alignItems: "center",
		marginBottom: 24,
	},
	view3: {
		paddingHorizontal: 11,
	},
	view4: {
		alignSelf: "stretch",
		alignItems: "center",
		marginBottom: 12,
		marginHorizontal: 16,
	},
});
