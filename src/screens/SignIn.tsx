import React, { useState } from "react";
import {
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

const SignIn = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((useCredential) => {
        // console.log(useCredential);
        navigation.navigate("MainApp");
      })
      .catch((err) => console.log(err));
  };

  const handleGoogleLogin = () => {};

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
              autoCapitalize={false}
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
              autoCapitalize={false}
              keyboardType="default"
              className="flex-1"
              onChangeText={(password) => setPassword(password)}
            />
          </View>
        </View>
        <View className="items-center mb-4">
          <TouchableOpacity activeOpacity={0.8} onPress={handleGoogleLogin}>
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
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SignIn;
