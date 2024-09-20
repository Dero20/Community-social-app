import { View, Pressable, Dimensions, TextInput, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { Entypo, FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { useAuth } from "../context/AuthContext";

export default function MainHOC({
  children,
  onBackPress,
  hideHeader,
  center,
  noHorizontalPadding,
  right,
  ...props
}) {
  const { user } = useAuth();
  const navigation = useNavigation();
  const { height, width } = Dimensions.get("screen");
  return (
    <SafeAreaView
      style={{
        height: height,
        width: width,
        paddingHorizontal: noHorizontalPadding ? 0 : 10,
        backgroundColor: "white",
        paddingTop: 5,
      }}
    >
      {/* Header */}

      <View
        className={`flex-row items-center py-2 bg-white ${
          noHorizontalPadding ? "px-[10]" : "px-0"
        }`}
      >
        <Pressable
          onPress={() => {
            navigation.toggleDrawer();
          }}
        >
          <Entypo name="menu" size={30} color="black" />
        </Pressable>
        {/* User Icon */}

        {/* Message Icon */}
        <Pressable
          onPress={() => {
            navigation.navigate("Inbox");
          }}
        >
          <MaterialIcons
            name="chat-bubble-outline"
            style={{ marginLeft: 10 }}
            size={30}
            color="black"
          />
        </Pressable>

        {/* Search Input */}
        <View className="flex-1 flex-row items-center bg-gray-300 rounded-full mx-4 p-2">
          <FontAwesome name="search" size={20} color="black" />
          <TextInput
            placeholder="Search Local"
            className="ml-2 text-black font-bold"
            style={{ flex: 1 }}
          />
        </View>

        {/* Profile Initial */}
        <Pressable onPress={() => navigation.navigate("Profile")} className="w-10 h-10 bg-cyan-100 rounded-full items-center justify-center">
          <Text className="text-black capitalize">
            {user?.firstName[0]}
            {user?.lastName[0]}
          </Text>
        </Pressable>
      </View>

      {children}
    </SafeAreaView>
  );
}
