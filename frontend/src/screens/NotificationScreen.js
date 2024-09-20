import { View, Text, FlatList, Pressable } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import MainHOC from "../components/MainHOC";
import { useFetch } from "../context/FetchContext";
import { getTimeAgo } from "../helpers";
import { useNavigation } from "@react-navigation/native";

const DATA = [
  // Add more items as needed
];

export default function NotificationScreen() {
  const { notifications } = useFetch()
  console.log("NOTIFICATIONS", notifications);

  return (
    <MainHOC noHorizontalPadding={true}>
      <View className="flex-1 py-2">
        {/* Notification Banner */}
        <View className="px-[10] py-1 flex-row gap-x-1 bg-gray-300">
          <Text className="font-bold">Turn on notifications</Text>
          <Text>to keep up to date with all things local.</Text>
        </View>

        {/* FlatList to render notifications */}
        <FlatList
          data={notifications}
          renderItem={({ item }) => (
            <NotificationItem
              item={item}
            />
          )}
          contentContainerStyle={{ flex: 1 }}
          ListEmptyComponent={
            <View className="flex items-center flex-1 justify-center">
              <Text className="text-lg mb-20 font-semibold">No Notifications to Show</Text>
            </View>
          }
          keyExtractor={(item) => item._id}
        />
      </View>
    </MainHOC>
  );
}
const NotificationItem = ({ item }) => {
  const navigation = useNavigation()

  return (
    <View className="flex-row items-start border-b border-gray-400 p-3">
      <Pressable onPress={() => navigation.navigate("UserProfile", {
        id: item.from,
      })} className="w-14 h-14 bg-cyan-100 rounded-full items-center justify-center mr-3">
        <Text className="text-lg font-bold text-black">J</Text>
      </Pressable>
      <View className="flex-1">
        <Text className="font-semibold text-base capitalize">{item?.text}</Text>
        <Text className="font-medium text-sm text-gray-600">{getTimeAgo(item?.date)}</Text>
      </View>
    </View>
  )
};
