import { View, FlatList } from "react-native";
import { useFetch } from "../context/FetchContext";
import SinglePost from "./SinglePost";

export default function ListAllPosts() {
  const { bookmarkedPosts } = useFetch();

  return (
    <FlatList
      data={bookmarkedPosts}
      keyExtractor={(item) => item._id}
      contentContainerStyle={{ paddingBottom: 120 }}
      renderItem={({ item }) => <SinglePost item={item} />}
      ItemSeparatorComponent={<View className="py-0.5 w-full bg-dark-gray" />}
    />
  );
}
