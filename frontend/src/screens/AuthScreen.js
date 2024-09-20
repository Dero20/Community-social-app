import { View, Text, Image, Button } from "react-native";
import React from "react";
import CustomButton from "../components/Button";
import { useNavigation } from "@react-navigation/native";

export default function AuthScreen() {
  const navigation = useNavigation();
  return (
    <View className="flex-1 items-center py-20 bg-[#CFE2DF] w-full h-full">
      {/* Logo */}
      <View className="w-40 h-40 bg-white rounded-full shadow-lg flex items-center justify-center mb-10">
        <Image className="w-20 h-20" source={require("../assets/logo.png")} />
      </View>
      <Text className="text-2xl font-bold text-center">
        Explore your neighborhood
      </Text>
      <View className="w-3/4 flex flex-col mt-10">
        <CustomButton onPress={() => navigation.navigate("Login")}>
          Sign in
        </CustomButton>
        <CustomButton
          onPress={() => {
            navigation.navigate("Signup");
          }}
        >
          Signup
        </CustomButton>
      </View>
      {/* Bottom */}
      <View className="flex-1 my-auto bottom-0 absolute mb-10">
        <Text className="text-lg text-center font-semibold">
          Find the best deals in your area
        </Text>
        <Text className="text-lg text-center">Sign in to get started</Text>
      </View>
    </View>
  );
}
