import { View, Text, Pressable, Image, TouchableOpacity } from "react-native";
import { useAuth } from "../context/AuthContext";
import HOC from "../components/HOC";
import Feather from "@expo/vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";

export default function Profile() {
  // useEffect(() => {
  //     (async () => {
  //         let { status } = await Location.requestForegroundPermissionsAsync();
  //         if (status !== 'granted') {
  //             console.log('Permission to access location was denied');
  //             return;
  //         }

  //         let location = await Location.getCurrentPositionAsync({});
  //         console.log(location)
  //         let data = {
  //             latitude: location.coords.latitude,
  //             longitude: location.coords.longitude
  //         };

  //         let regionName = await Location.reverseGeocodeAsync(data);
  //         console.log(regionName)
  //         if (regionName && regionName.length > 0) {
  //             let locationInfo = regionName[0];
  //             let extractedNeighborhood = locationInfo.district || locationInfo.subregion || "Unknown Region"
  //             setNeighborhood(extractedNeighborhood)
  //         }
  //     })();
  // }, []);
  const { logout, user } = useAuth();
  const navigation = useNavigation();
  return (
    <HOC>
      <View className="flex-1 bg-white px-4 pt-6">
        {/* Profile Section */}
        <View className="flex-row items-center mb-12">
          <View className="h-12 w-12 bg-black rounded-full items-center justify-center">
            <Image source={{ uri: user.profilePicture.url }} />
          </View>
          <View className="ml-4">
            <Text className="text-xl font-bold">{`${user?.firstName} ${user?.lastName}`}</Text>
            <Text className="text-gray-500">
              {user?.location?.neighborHood}
            </Text>
          </View>
          <Pressable
            className="py-2 w-20 ml-auto bg-app-dark-green rounded-xl "
            onPress={() => {
              logout();
            }}
          >
            <Text className="text-sm font-bold text-center text-white">
              Logout
            </Text>
          </Pressable>
        </View>

        <View className="mb-10 gap-y-2">
          <Text className="font-bold text-lg">Speciality</Text>
          <Text className="font-semibold capitalize text-base text-black">
            {user.speciality.category}
          </Text>
          <Text className="font-normal text-base text-black">
            {user.speciality.description}
          </Text>
        </View>

        {/* Dashboard Section */}
        <View className="mb-12 items-start">
          <Text className="font-bold text-lg mb-2">Dashboard</Text>
          <Pressable
            onPress={() => navigation.navigate("BookmarkPosts")}
            className="items-center mt-2 px-4 rounded-xl bg-app-dark-green py-4 flex-row gap-x-2"
          >
            <Feather name="bookmark" size={30} color="white" />
            <Text className="text-base font-medium text-white">Bookmarks</Text>
          </Pressable>
        </View>
      </View>
    </HOC>
  );
}
