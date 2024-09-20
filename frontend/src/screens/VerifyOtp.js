import React, { useState } from "react";
import { View, Text, TextInput, Pressable, Keyboard } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";
import CustomButton from "../components/Button";
import { useAuth } from "../context/AuthContext";

export default function VerifyOTPScreen({ route }) {
  const navigation = useNavigation();
  const [otp, setOtp] = useState("");
  const { VerifyOTP } = useAuth();
  const { email } = route.params;

  const handleVerifyOTP = async () => {
    Keyboard.dismiss();
    const res = await VerifyOTP(email, otp);
    if (res.success) {
      navigation.navigate("HomeNav");
    } else {
      console.log("OTP verification error:", res.error);
    }
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
      <Text className="text-2xl font-bold text-center">Verify OTP</Text>

      <TextInput
        className="w-3/4 h-12 bg-white rounded-lg mt-10 px-5"
        placeholder="Enter OTP"
        keyboardType="numeric"
        onChangeText={setOtp}
        value={otp}
      />

      <View className="w-3/4 flex flex-col mt-10">
        <CustomButton onPress={handleVerifyOTP}>Verify OTP</CustomButton>
        <Text>
          Didn't receive the OTP?{" "}
          <Text
            onPress={() => {
              // Implement resend OTP functionality here
            }}
            className="text-blue-500"
          >
            Resend
          </Text>
        </Text>
      </View>
    </View>
  );
}
