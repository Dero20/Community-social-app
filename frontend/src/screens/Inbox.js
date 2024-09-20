import React, { useCallback } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useFetch } from "../context/FetchContext";
import HOC from "../components/HOC";

export default function InboxScreen() {
  const { inbox, getInbox } = useFetch();
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      getInbox();
    }, [])
  );
  console.log(inbox);

  return (
    <ScrollView className="flex-1 bg-white">
      <HOC>
        <View className="p-4">
          <Text className="text-2xl font-bold mb-4">Inbox</Text>
          {inbox && inbox.length > 0 ? (
            inbox.map((chat, index) => {
              const contextType = chat.jobRef
                ? "job"
                : chat.adRef
                ? "product"
                : chat.profileRef
                ? "profile"
                : null;
              const contextData = chat.jobRef || chat.adRef || chat.profileRef;

              if (!contextData || !contextData._id) {
                console.error(
                  "Invalid context data or missing _id:",
                  contextData
                );
                return (
                  <View key={index} className="border-b border-gray-200 py-4">
                    <Text className="text-xl font-semibold text-red-500">
                      Invalid or missing data
                    </Text>
                  </View>
                );
              }

              return (
                <TouchableOpacity
                  key={index}
                  className="border-b border-gray-200 py-4"
                  onPress={() => {
                    navigation.navigate("StartChat", {
                      contextType,
                      contextData,
                    });
                  }}
                >
                  <Text className="text-xl font-semibold">
                    {contextType === "job"
                      ? contextData.title
                      : contextType === "product"
                      ? contextData.title
                      : `${contextData.firstName} ${contextData.lastName}`}
                  </Text>
                  <Text className="text-gray-500">
                    {chat.messages.length > 0
                      ? chat.messages[0].message
                      : "No messages yet"}
                  </Text>
                </TouchableOpacity>
              );
            })
          ) : (
            <View className="flex-1 justify-center items-center">
              <Text className="text-xl font-bold">No messages yet</Text>
            </View>
          )}
        </View>
      </HOC>
    </ScrollView>
  );
}
