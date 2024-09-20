import { View, Text, Image, FlatList, Pressable } from "react-native";
import MainHOC from "../components/MainHOC";
import { useFetch } from "../context/FetchContext";
import { useNavigation } from "@react-navigation/native";

export default function ProductListing() {
  const { productListing } = useFetch();
  const navigation = useNavigation();

  const renderItem = ({ item }) => <ListingItem item={item} />;
  const ListingItem = ({ item }) => {
    return (
      <Pressable
        onPress={() => {
          navigation.navigate("ProductDetails", { id: item._id });
        }}
        className="bg-white m-2 rounded-lg shadow-sm w-[45%] overflow-hidden"
      >
        {/* Placeholder Image - Replace with item.images when available */}
        <View className="h-44 bg-gray-300 rounded-xl border-dark-gray border overflow-hidden justify-center items-center">
          {item.images.length ? (
            <Image
              source={{ uri: item.images[0].url }}
              className="h-full w-full"
            />
          ) : (
            <View className="h-full w-full justify-center items-center"></View>
          )}
        </View>
        <View className="p-2">
          <Text className="text-xl font-semibold">{item.title}</Text>
          <Text className="text-base text-gray-500">
            {item.isFree ? "Free" : `$${item.price}`}
          </Text>
        </View>
      </Pressable>
    );
  };
  return (
    <MainHOC>
      <View className="flex-1 ">
        <View className="mb-4">
          <Text className="text-lg font-bold">Newest</Text>
        </View>
        <FlatList
          data={productListing}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
        <Pressable className="bg-gray-300 mt-4 py-3 rounded-lg justify-center items-center">
          <Text className="text-gray-700 font-semibold">
            See all new listings
          </Text>
        </Pressable>
      </View>
    </MainHOC>
  );
}
