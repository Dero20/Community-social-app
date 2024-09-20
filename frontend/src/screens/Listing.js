import { View, Text, Pressable } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import HOC from "../components/HOC";

export default function Listing() {
  const navigation = useNavigation();
  const navigateToScreen = (screen) => {
    navigation.navigate(screen);
  };

  return (
    <HOC className="bg-white px-5 flex-1">
      <View className="flex-1 items-center justify-center">
        {/* Header Section */}
        <Text className="text-[#004D40] font-bold text-3xl mb-10">
          Choose an Option
        </Text>

        <View className="gap-y-6 w-full px-10">
          {/* Create Post Button */}
          <View className="w-full items-center justify-center">
            <Pressable
              onPress={() => navigateToScreen("NewPost")}
              className="w-full bg-app-dark-green rounded-2xl items-center justify-center py-5 shadow-lg shadow-black"
              style={{ elevation: 5 }} // Add shadow for Android
            >
              <Text className="text-white font-semibold text-xl">Create Post</Text>
            </Pressable>
          </View>

          {/* Post a Job Button */}
          <View className="w-full items-center justify-center">
            <Pressable
              onPress={() => navigateToScreen("PostJob")}
              className="w-full bg-app-dark-green rounded-2xl items-center justify-center py-5 shadow-lg shadow-black"
              style={{ elevation: 5 }}
            >
              <Text className="text-white font-semibold text-xl">Post a Job</Text>
            </Pressable>
          </View>

          {/* Add Product Button */}
          <View className="w-full items-center justify-center">
            <Pressable
              onPress={() => navigateToScreen("AddProduct")}
              className="w-full bg-app-dark-green rounded-2xl items-center justify-center py-5 shadow-lg shadow-black"
              style={{ elevation: 5 }}
            >
              <Text className="text-white font-semibold text-xl">Add Product</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </HOC>
  );
}
