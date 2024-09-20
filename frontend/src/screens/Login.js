import { View, Text, Pressable, TextInput, Keyboard } from "react-native";
import React from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";
import CustomButton from "../components/Button";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const navigation = useNavigation();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const { Login, user } = useAuth();

  const handleLogin = async () => {
    Keyboard.dismiss();
    const res = await Login(email, password);
    console.log("Res: ", res);
  };

  return (
    <View className="flex-1 items-center py-20 bg-[#CFE2DF] w-full h-full">
      {/* Back Icon */}
      <Pressable
        className="absolute top-10 left-5"
        onPress={() => {
          navigation.goBack();
        }}
      >
        <AntDesign name="arrowleft" size={24} color="black" />
      </Pressable>
      <Text className="text-4xl mt-10 font-bold text-app-dark-green text-center">Login</Text>

      <TextInput
        className="w-3/4 h-12 bg-white rounded-lg mt-10 px-5"
        placeholder="Email"
        onChangeText={(text) => {
          setEmail(text);
        }}
        autoCapitalize="none"
        value={email}
      />
      <TextInput
        className="w-3/4 h-12 bg-white rounded-lg mt-5 px-5"
        placeholder="Password"
        secureTextEntry
        onChangeText={(text) => {
          setPassword(text);
        }}
        autoCapitalize="none"
        value={password}
      />
      <View className="w-3/4 flex flex-col mt-5 ">
        <CustomButton onPress={() => handleLogin()}>Login</CustomButton>

        <Text className="mt-3">
          Don't have an account?{" "}
          <Text
            onPress={() => {
              navigation.navigate("Signup");
            }}
            className="text-blue-500 underline"
          >
            Signup
          </Text>
        </Text>
      </View>
    </View>
  );
}
