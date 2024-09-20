import { View, Text, FlatList, Pressable } from "react-native";
import React from "react";
import { useFetch } from "../context/FetchContext";
import { getTimeAgo } from "../helpers";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../context/AuthContext";
import { FontAwesome } from "@expo/vector-icons";
import { TextInput } from "react-native-gesture-handler";

export default function ListAllJobs() {
  const navigation = useNavigation();
  const { jobListing } = useFetch();
  const { user } = useAuth();

  const HeaderComponent = ({ item }) => {
    return (
      <View className="flex-row items-center">
        <View className="flex-row items-center">
          <View className="w-11 h-11 bg-black rounded-full" />
          <View
            onPress={() => {
              console.log("Pressed");
            }}
          >
            <View className="ml-2">
              <Text className="text-lg font-semibold">
                {item.postedBy.firstName}
              </Text>
              <Text className="">{getTimeAgo(item.createdAt)}</Text>
            </View>
          </View>
        </View>
      </View>
    );
  };
  const ListHeader = ({ item }) => {
    return (
      <View className="px-5 py-5">
        <View className="flex-row justify-between items-center ">
          <Pressable
            onPress={() => navigation.navigate("Profile")}
            className="w-16 h-16 bg-cyan-100 rounded-full items-center justify-center"
          >
            <Text className="text-black capitalize">
              {user.firstName[0]}
              {user.lastName[0]}
            </Text>
          </Pressable>
          <Pressable onPress={() => navigation.navigate("PostJob")}>
            <FontAwesome name="plus" size={24} color="black" />
          </Pressable>
        </View>
        <View className="flex-row items-center mt-3 bg-gray-300 rounded-xl px-4 py-2">
          <FontAwesome name="search" size={20} color="black" />
          <TextInput
            placeholder="Search Local"
            placeholderTextColor={"black"}
            className="ml-2 text-black font-medium py-1"
            style={{ flex: 1 }}
          />
        </View>
      </View>
    );
  };
  return (
    <View className="w-full bg-white ">
      <FlatList
        data={jobListing}
        keyExtractor={(item) => item._id}
        style={{ height: "100%", width: "100%" }}
        ListHeaderComponent={<ListHeader />}
        renderItem={({ item }) => (
          <View className="p-4 rounded-xl border-gray-400 border-t border-b">
            <HeaderComponent item={item} />
            <View className="w- gap-y-1 mt-2">
              <Text className="text-xl font-semibold">{item.title}</Text>
              <Text className="text-base font-medium">{item.content}</Text>
              <Text className="text-md font-medium py-1 ">
                Posted in{" "}
                <Text className="text-md font-bold">{item.category}</Text>
              </Text>
            </View>
            {user._id !== item.postedBy._id && (
              <Pressable
                className="bg-app-dark-green rounded-full w-28 mt-4 py-2"
                onPress={() => {
                  console.log("Pressed");
                  navigation.navigate("StartChat", {
                    contextType: "job",
                    contextData: item,
                  });
                }}
              >
                <Text className="text-center text-white font-semibold">
                  Start Chat
                </Text>
              </Pressable>
            )}
          </View>
        )}
      />
    </View>
  );
}
