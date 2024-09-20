import React from "react";
import { View, Text, TouchableOpacity, FlatList, Pressable } from "react-native";
import { MaterialCommunityIcons, Feather } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import HOC from "../components/HOC";
import { useFetch } from "../context/FetchContext";
import { useNavigation } from "@react-navigation/native";


const Invite = () => {
  const navigation = useNavigation()
  const { nearbyUserLoading, nearbyUsers } = useFetch();
  console.log("Nearby Users: ", nearbyUsers);

  // Render function for each item in the FlatList
  const renderUserItem = ({ item }) => (
    <Pressable
      onPress={() =>
        navigation.navigate("UserProfile", {
          id: item._id,
        })
      }
      className="flex-row justify-between items-center bg-gray-100 p-4 mb-2 rounded-md"
    >
      <View>
        <Text className="text-lg font-bold">
          {item.firstName} {item.lastName}
        </Text>
        <Text className="text-sm text-gray-600">{item.location.neighborHood}</Text>
      </View>
    </Pressable>
  );

  return (
    <HOC
      noHorizontalPadding={true}
      center={<Text className="font-semibold text-xl ">My Neighbours</Text>}
    >
      <View className="flex-1 py-5">
        {/* Invite Section */}
        <View className="px-5 gap-y-3">
          <Text className="text-xl font-bold">Invite your best friend:</Text>
          <Text className="text-sm text-black font-bold mb-4">
            Let them know what’s happening nearby
          </Text>

          {/* Buttons without Text */}
          <View className="flex-row justify-around mb-4">
            <View className="items-center justify-center">
              <TouchableOpacity className="items-center h-16 w-16 rounded-full bg-bg-btn justify-center">
                <MaterialCommunityIcons
                  name="email-outline"
                  size={30}
                  color="black"
                />
              </TouchableOpacity>
              <Text className="font-semibold ">Email</Text>
            </View>
            <View className="items-center justify-center">
              <TouchableOpacity className="items-center h-16 w-16 rounded-full bg-bg-btn justify-center">
                <Feather name="share" size={27} color="black" />
              </TouchableOpacity>
              <Text className="font-semibold ">Share Via</Text>
            </View>
            <View className="items-center justify-center">
              <TouchableOpacity className="items-center h-16 w-16 rounded-full bg-bg-btn justify-center">
                <Feather name="copy" size={30} color="black" />
              </TouchableOpacity>
              <Text className="font-semibold ">Copy Link</Text>
            </View>
          </View>
        </View>

        {/* Sync Contacts Section */}
        <View className="flex-1">
          <View className="px-5 pt-5">
            <Text className="text-xl font-bold">See who you know nearby</Text>
          </View>
          <FlatList
            data={nearbyUsers}
            renderItem={renderUserItem}
            keyExtractor={(item) => item._id}
            contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 10 }}
          />
        </View>
      </View>
    </HOC>
  );
};

export default Invite;
