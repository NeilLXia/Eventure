import React, { useState } from "react";
import {
  Alert,
  Image,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import AppLogo from "../assets/tabisho_logo.png";
import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import firebase from "@react-native-firebase/app";
import "@react-native-firebase/auth";
import {
  GoogleSignin,
  GoogleSigninButton,
} from "@react-native-google-signin/google-signin";

const firebaseConfig = {
  clientId:
    "704726588529-4agubfqol9jpelvfuug894jq197qidsh.apps.googleusercontent.com",
  appId: "1:704726588529:ios:ad59d951ca4d202d74cfd0",
  apiKey: "AIzaSyAAPwtb6Mi2D2GRGTDKMxUMiF9ZAUQ3S5E",
  databaseURL: "",
  storageBucket: "tabisho.appspot.com",
  messagingSenderId: "",
  projectId: "tabisho",
  persistence: true,
};

firebase.initializeApp(firebaseConfig);

GoogleSignin.configure({
  webClientId:
    "704726588529-khprq8oa3mlmtqfdtrotq9nocl6k7si0.apps.googleusercontent.com",
});

const SignIn = ({ navigation }: { navigation: any }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((useCredential) => {
        console.log(useCredential);
        navigation.navigate("MainApp");
      })
      .catch((err) => {
        if (err.code === "auth/wrong-password") {
          Alert.alert(
            "Incorrect Password",
            "The username/password combination does not match",
            [{ text: "OK", onPress: () => {} }]
          );
          return;
        } else if (
          err.code === "auth/invalid-email" ||
          err.code === "auth/user-not-found"
        ) {
          Alert.alert(
            "Incorrect Password",
            "The email provided is not registered",
            [{ text: "OK", onPress: () => {} }]
          );
          return;
        } else {
          console.log(err.code);
        }
      });
  };

  const onGoogleButtonPress = async () => {
    try {
      // // Check if your device supports Google Play
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });
      // // Get the users ID token
      const { idToken } = await GoogleSignin.signIn();
      // // Create a Google credential with the token
      const googleCredential =
        firebase.auth.GoogleAuthProvider.credential(idToken);
      // // Sign-in the user with the credential
      const user_login = await firebase
        .auth()
        .signInWithCredential(googleCredential);
      console.log("success", user_login);
      navigation.navigate("MainApp");
    } catch (err: any) {
      console.log("error", err);
    }
  };

  return (
    <SafeAreaView className="flex-1 justify-center items-center bg-slate-50">
      <View className="flex-1 w-full px-12 py-32 border-2">
        <View className="flex-row justify-center items-center mb-12">
          <Image
            source={AppLogo}
            resizeMode="contain"
            style={{
              height: 48,
              width: 180,
            }}
          />
        </View>
        <View className="mb-6">
          <Text className="text-2xl font-semibold text-slate-700">Sign In</Text>
        </View>
        <View className="mb-6">
          <Text>Email</Text>
          <View className="flex-row w-full h-[50px] items-center px-4 rounded-[4px] bg-white border-[1px] border-slate-400">
            <TextInput
              placeholder="..."
              autoCapitalize="none"
              keyboardType="default"
              className="flex-1"
              onChangeText={(email) => setEmail(email)}
            />
          </View>
        </View>
        <View className="mb-8">
          <Text>Password</Text>
          <View className="flex-row w-full h-[50px] items-center px-4 rounded-[4px] bg-white border-[1px] border-slate-400">
            <TextInput
              placeholder="..."
              secureTextEntry={true}
              autoCapitalize="none"
              keyboardType="default"
              className="flex-1"
              onChangeText={(password) => setPassword(password)}
            />
          </View>
        </View>
        <View className="items-center mb-4">
          <TouchableOpacity activeOpacity={0.8} onPress={handleLogin}>
            <View className="w-[200px] h-[50px] items-center justify-center rounded-lg bg-cyan-500 border-[1px]">
              <Text className="text-center text-lg font-semibold text-slate-50">
                Sign In
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View className="items-center mb-4">
          <Text>Don't have an account?</Text>
          <View>
            <TouchableOpacity
              activeOpacity={0.65}
              onPress={() => navigation.navigate("SignUp")}
            >
              <View className="w-[200px] h-[50px] items-center justify-center rounded-lg bg-white border-[1px]">
                <Text className="text-center text-lg font-semibold">
                  Sign Up
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <View className="pt-8">
            <GoogleSigninButton style={{}} onPress={onGoogleButtonPress} />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SignIn;
