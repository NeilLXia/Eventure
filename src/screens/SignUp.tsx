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
import { createUserWithEmailAndPassword } from "firebase/auth";

const SignUp = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const handleSignUp = () => {
    if (password !== password2) {
      Alert.alert("Input Validation Error", "Passwords must match", [
        { text: "OK", onPress: () => {} },
      ]);
      return;
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then((useCredential) => {
        // console.log(useCredential);
        navigation.goBack();
      })
      .catch((err) => {
        if (err.code === "auth/email-already-in-use") {
          Alert.alert("Input Validation Error", "Email already in use", [
            { text: "OK", onPress: () => {} },
          ]);
          return;
        }
        if (err.code === "auth/invalid-email") {
          Alert.alert(
            "Input Validation Error",
            "The email provided is not valid",
            [{ text: "OK", onPress: () => {} }]
          );
          return;
        }
        if (err.code === "auth/weak-password") {
          Alert.alert(
            "Input Validation Error",
            "The password provided is too weak",
            [{ text: "OK", onPress: () => {} }]
          );
          return;
        }
        console.log(err.code, err.message);
      });
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
          <Text className="text-2xl font-semibold text-slate-700">
            Create an Account
          </Text>
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
              autoCapitalize="none"
              secureTextEntry={true}
              keyboardType="default"
              className="flex-1"
              onChangeText={(password) => setPassword(password)}
            />
          </View>
        </View>
        <View className="mb-8">
          <Text>Confirm Password</Text>
          <View className="flex-row w-full h-[50px] items-center px-4 rounded-[4px] bg-white border-[1px] border-slate-400">
            <TextInput
              placeholder="..."
              autoCapitalize="none"
              secureTextEntry={true}
              keyboardType="default"
              className="flex-1"
              onChangeText={(password) => setPassword2(password)}
            />
          </View>
        </View>
        <View className="items-center mb-4">
          <TouchableOpacity activeOpacity={0.8} onPress={handleSignUp}>
            <View className="w-[200px] h-[50px] items-center justify-center rounded-lg bg-cyan-500 border-[1px]">
              <Text className="text-center text-lg font-semibold text-slate-50">
                Sign Up
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View className="items-center mb-4">
          <Text>Don't have an account?</Text>
          <View>
            <TouchableOpacity activeOpacity={0.65}>
              <View className="w-[200px] h-[50px] items-center justify-center rounded-lg bg-white border-[1px]">
                <Text className="text-center text-lg font-semibold">
                  Sign Up
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SignUp;
