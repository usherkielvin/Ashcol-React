import { router } from 'expo-router';
import React, { useState } from "react";
import { ActivityIndicator, Alert, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, useColorScheme } from "react-native";

export default function SignupScreen() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [loading, setLoading] = useState(false);
	const colorScheme = useColorScheme();
	const isDark = colorScheme === 'dark';

	const getThemeColor = (light: string, dark: string) => isDark ? dark : light;

	const handleSignup = async () => {
		if (!email || !password || !confirmPassword) {
			Alert.alert('Error', 'Please fill in all fields');
			return;
		}

		if (password !== confirmPassword) {
			Alert.alert('Error', 'Passwords do not match');
			return;
		}

		setLoading(true);

		try {
			// Placeholder flow: wire this to your backend signup endpoint next.
			await new Promise((resolve) => setTimeout(resolve, 450));
			router.replace('/');
		} catch {
			Alert.alert('Signup Failed', 'Unable to create account right now. Please try again.');
		} finally {
			setLoading(false);
		}
	};

	return (
		<View style={[styles.container, { backgroundColor: getThemeColor('#FFFFFF', '#1A1A1A') }]}>
			<ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
				<View style={styles.content}>
					<Text style={[styles.text3, { color: getThemeColor('#000000', '#FFFFFF') }]}>
						Hey there!
					</Text>
					<Text style={[styles.text4, { color: getThemeColor('#000000', '#E0E0E0') }]}>
						Sign up and start your journey with the Ashcol family.
				</Text>

				<View style={styles.formContainer}>
						<Text style={[styles.label, { color: getThemeColor('#000000', '#FFFFFF') }]}>Email Address</Text>
						<TextInput
							style={[styles.input, { 
								backgroundColor: getThemeColor('#F5F5F5', '#2A2A2A'),
								color: getThemeColor('#000000', '#FFFFFF'),
								borderColor: getThemeColor('#E0E0E0', '#444444'),
							}]}
							placeholder="Enter your email"
							placeholderTextColor={getThemeColor('#8C8C8C', '#999999')}
							autoCapitalize="none"
							editable={!loading}
							value={email}
							onChangeText={setEmail}
							keyboardType="email-address"
						/>

						<Text style={[styles.label, { color: getThemeColor('#000000', '#FFFFFF') }]}>Password</Text>
						<TextInput
							style={[styles.input, { 
								backgroundColor: getThemeColor('#F5F5F5', '#2A2A2A'),
								color: getThemeColor('#000000', '#FFFFFF'),
								borderColor: getThemeColor('#E0E0E0', '#444444'),
							}]}
							placeholder="Create password"
							placeholderTextColor={getThemeColor('#8C8C8C', '#999999')}
							secureTextEntry
							editable={!loading}
							value={password}
							onChangeText={setPassword}
						/>

						<Text style={[styles.label, { color: getThemeColor('#000000', '#FFFFFF') }]}>Confirm Password</Text>
						<TextInput
							style={[styles.input, { 
								backgroundColor: getThemeColor('#F5F5F5', '#2A2A2A'),
								color: getThemeColor('#000000', '#FFFFFF'),
								borderColor: getThemeColor('#E0E0E0', '#444444'),
							}]}
							placeholder="Confirm password"
							placeholderTextColor={getThemeColor('#8C8C8C', '#999999')}
							secureTextEntry
							editable={!loading}
							value={confirmPassword}
							onChangeText={setConfirmPassword}
						/>
					</View>

					<TouchableOpacity
						style={[styles.button, loading && styles.buttonDisabled]}
						onPress={handleSignup}
						disabled={loading}
					>
						{loading ? (
							<ActivityIndicator color="#FFFFFF" />
						) : (
							<Text style={styles.text5}>
								Create Account
							</Text>
						)}
					</TouchableOpacity>

					<View style={styles.dividerContainer}>
						<View style={styles.divider} />
						<Text style={styles.dividerText}>or</Text>
						<View style={styles.divider} />
					</View>

					<TouchableOpacity
						style={styles.socialButton}
						onPress={() => Alert.alert('Info', 'Google signup flow not wired yet.')}
						disabled={loading}
					>
						<Image
							source={{uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/RoYkSihffo/szp51uee_expires_30_days.png"}}
							resizeMode="contain"
							style={styles.socialIcon}
						/>
						<Text style={styles.socialButtonText}>Continue with Google</Text>
					</TouchableOpacity>

					<TouchableOpacity
						style={styles.socialButton}
						onPress={() => Alert.alert('Info', 'Facebook signup flow not wired yet.')}
						disabled={loading}
					>
						<Image
							source={{uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/RoYkSihffo/cix8bkmw_expires_30_days.png"}}
							resizeMode="contain"
							style={styles.socialIcon}
						/>
						<Text style={styles.socialButtonText}>Continue with Facebook</Text>
					</TouchableOpacity>

				<Text style={styles.disclaimer}>
					By using Ashcol, you agree to the Terms and Privacy Policy.
				</Text>

				<View style={styles.loginLinkContainer}>
					<Text style={styles.loginText}>Already have an account? </Text>
					<TouchableOpacity disabled={loading} onPress={() => router.back()}>
						<Text style={styles.loginLinkText}>Log in</Text>
					</TouchableOpacity>
				</View>
			</View>
		</ScrollView>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#FFFFFF",
	},
	content: {
		flex: 1,
		paddingHorizontal: 0,
		paddingVertical: 60,
	},
	column: {
		flex: 1,
		paddingBottom: 30,
		paddingTop: 30,
	},
	formContainer: {
		paddingHorizontal: 16,
		marginBottom: 20,
	},
	label: {
		fontSize: 14,
		fontWeight: "600",
		color: "#000000",
		marginBottom: 8,
		marginTop: 12,
	},
	input: {
		backgroundColor: "#8C8C8C1A",
		borderRadius: 12,
		paddingVertical: 15,
		paddingHorizontal: 15,
		marginBottom: 4,
		fontSize: 14,
		color: "#4F4F4F",
	},
	button: {
		alignItems: "center",
		backgroundColor: "#38B45D",
		borderRadius: 12,
		paddingVertical: 18,
		marginBottom: 32,
		marginHorizontal: 16,
	},
	buttonDisabled: {
		opacity: 0.6,
	},
	text5: {
		color: "#FFFFFF",
		fontSize: 16,
		fontWeight: "600",
	},
	dividerContainer: {
		flexDirection: "row",
		alignItems: "center",
		marginHorizontal: 16,
		marginBottom: 24,
	},
	divider: {
		flex: 1,
		height: 1,
		backgroundColor: "#CCCCCC",
	},
	dividerText: {
		marginHorizontal: 12,
		color: "#4F4F4F",
		fontSize: 14,
	},
	socialButton: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		borderColor: "#CCCCCC",
		borderRadius: 12,
		borderWidth: 1,
		paddingVertical: 16,
		marginBottom: 12,
		marginHorizontal: 16,
	},
	socialIcon: {
		width: 20,
		height: 20,
		marginRight: 10,
	},
	socialButtonText: {
		color: "#000000",
		fontSize: 14,
		fontWeight: "500",
	},
	disclaimer: {
		color: "#4F4F4F",
		fontSize: 12,
		textAlign: "center",
		marginBottom: 24,
		marginHorizontal: 16,
		lineHeight: 18,
	},
	loginLinkContainer: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		marginHorizontal: 16,
	},
	loginText: {
		color: "#000000",
		fontSize: 14,
	},
	loginLinkText: {
		color: "#38B45D",
		fontSize: 14,
		fontWeight: "600",
	},
	text3: {
		color: "#000000",
		fontSize: 24,
		fontWeight: "bold",
		textAlign: "center",
		marginBottom: 8,
	},
	text4: {
		color: "#4F4F4F",
		fontSize: 14,
		textAlign: "center",
		marginBottom: 30,
		lineHeight: 20,
		marginHorizontal: 16,
	},
	scrollView: {
		flex: 1,
		backgroundColor: "#FFFFFF",
	},
});
