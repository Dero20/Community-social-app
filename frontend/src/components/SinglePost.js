import React, { useEffect, useState } from "react";
import {
  Image,
  Pressable,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  FlatList,
  Keyboard,
  ActivityIndicator,
} from "react-native";
import {
  Entypo,
  FontAwesome5,
  AntDesign,
  FontAwesome,
} from "@expo/vector-icons";
import { getTimeAgo } from "../helpers";
import { usePost } from "../context/PostContext";
import { useAuth } from "../context/AuthContext";
import CustomModal from "./CustomModal";
import { useNavigation } from "@react-navigation/native";
import { triggerToast } from "../data";

const SinglePost = ({ item }) => {
  const [isLiked, setIsLiked] = useState(null);
  const [isBookmarked, setIsBookmarked] = useState(null);
  const [comment, setComment] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [modal, setModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [allComments, setAllComments] = useState(item.comments);
  const { likePost, bookmarkPost, commentOnPost } = usePost();
  const { user } = useAuth();

  useEffect(() => {
    item.likedBy.length > 0 && item.likedBy.map(({ _id }) => _id == user._id)
      ? setIsLiked(true)
      : setIsLiked(false);
    item.bookmarkedBy.length > 0 &&
    item.bookmarkedBy.map(({ _id }) => _id == user._id)
      ? setIsBookmarked(true)
      : setIsBookmarked(false);
  }, []);

  const handleLike = async () => {
    const previousValue = isLiked;
    try {
      setIsLiked(!isLiked);
      const response = await likePost(item._id);
      if (response.type !== "success") {
        setIsLiked(previousValue);
      }
    } catch (error) {
      console.error("Error toggling like:", error);
      setIsLiked(previousValue);
    }
  };

  const handleBookmark = async () => {
    const previousValue = isBookmarked;
    try {
      setIsBookmarked(!isBookmarked);
      const response = await bookmarkPost(item._id);
      if (response.type !== "success") {
        setIsBookmarked(previousValue);
      }
    } catch (error) {
      console.error("Error toggling bookmark:", error);
      setIsBookmarked(previousValue);
    }
  };

  const handleCommentSubmit = async () => {
    Keyboard.dismiss();
    if (!comment.trim()) {
      triggerToast({ type: "error", message: "Cannot submit empty comment" });
      return;
    }
    setIsLoading(true);
    let dataToSend = {
      postId: item._id,
      comment,
    };
    const response = await commentOnPost(dataToSend);
    if (response.type !== "success") {
      triggerToast({ type: "error", message: "failed to submit comment" });
      setIsLoading(false);
      return;
    }
    setComment("");
    triggerToast({ type: "success", message: "Comment Submitted" });
    setAllComments(response.data.data.comments);
    setIsLoading(false);
  };

  const openModal = () => setModal(true);
  const closeModal = () => setModal(false);

  const navigation = useNavigation();

  const HeaderComponent = ({ item }) => {
    return (
      <View className="flex-row justify-between items-center px-2">
        <View className="flex-row items-center">
          <Pressable
            onPress={() =>
              navigation.navigate("UserProfile", {
                id: item.postedBy._id,
              })
            }
          >
            <View className="w-12 h-12 bg-black overflow-hidden rounded-full"></View>
          </Pressable>
          <View>
            <Pressable
              onPress={() =>
                navigation.navigate("UserProfile", {
                  id: item.postedBy._id,
                })
              }
            >
              <Text className="ml-2 text-base font-semibold">
                {item.postedBy?.firstName + " " + item.postedBy?.lastName}
              </Text>
            </Pressable>
            <Text className="ml-2">
              <Text>{item.location} • </Text>
              {getTimeAgo(item.createdAt)}
            </Text>
          </View>
        </View>
        <Pressable onPress={() => setModalVisible(true)}>
          <Entypo name="dots-three-horizontal" size={30} color="black" />
        </Pressable>
      </View>
    );
  };

  return (
    <View className="pt-2 border-t border-dark-gray relative bg-white">
      <HeaderComponent item={item} />
      {(item.content || item.event.eventName) && (
        <Text className="text-lg text-app-dark-green font-medium py-2 px-3">
          {item?.postType === "event" && "Event Name : "}
          {item?.postType === "event" ? item.event.eventName : item.content}
        </Text>
      )}
      {item?.event?.location && (
        <Text className="text-base text-app-dark-green font-medium py-2 px-3">
          Location : {item.event.location}, {item.event.postalCode}
        </Text>
      )}
      {item?.event?.startDate && (
        <Text className="text-base text-app-dark-green font-medium py-2 px-3">
          Start Date/Time : {new Date(item.event.startDate).toLocaleString()}
        </Text>
      )}
      {item?.event?.endDate && (
        <Text className="text-base text-app-dark-green font-medium py-2 px-3">
          End Date/Time : {new Date(item.event.endDate).toLocaleString()}
        </Text>
      )}
      {(item?.image || item?.event?.eventPicture) && (
        <Image
          source={{
            uri:
              item?.postType === "event"
                ? item.event.eventPicture.url
                : item.image?.url,
          }}
          resizeMode="contain"
          className="w-full h-96"
        />
      )}

      <View className="py-3 px-3 flex-row items-center justify-between w-full">
        <View className="flex-row gap-x-6 items-center">
          <TouchableOpacity onPress={handleLike}>
            <AntDesign
              name={isLiked ? "heart" : "hearto"}
              size={30}
              color={isLiked ? "red" : "black"}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={openModal}>
            <FontAwesome5 name="comment" size={30} color="black" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={handleBookmark}>
          <FontAwesome
            name={isBookmarked ? "bookmark" : "bookmark-o"}
            size={30}
            color="black"
          />
        </TouchableOpacity>
      </View>

      {/* Modal Component */}
      {modalVisible && (
        <Pressable
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 1000,
          }}
          onPress={() => setModalVisible(false)}
        >
          <View
            style={{
              position: "absolute",
              top: 50,
              right: 10, // Adjusting position for alignment
              backgroundColor: "white",
              borderRadius: 8,
              padding: 8,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.8,
              shadowRadius: 2,
              elevation: 5,
              width: 300,
              borderColor: "#004D40",
              borderWidth: 1,
            }}
          >
            <TouchableOpacity
              className="p-2"
              onPress={() => {
                setModalVisible(false);
                console.log("Edit Post");
              }}
            >
              <Text className="text-base text-black">
                Don't suggest post from this user
              </Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      )}
      <CustomModal
        modalHeading={"Comments"}
        visible={modal}
        hideModal={closeModal}
      >
        <View className="h-full py-2">
          <View className="flex-1">
            <FlatList
              data={allComments}
              keyExtractor={(item) => item._id}
              contentContainerStyle={{}}
              renderItem={({ item }) => (
                <View className="py-2 w-full flex-row ">
                  <View className="h-10 w-10 bg-dark-gray rounded-full">
                    {item?.postedBy?.profilePicture && (
                      <Image
                        source={{ uri: item.postedBy.profilePicture.url }}
                        className="h-full w-full"
                        resizeMode="cover"
                      />
                    )}
                  </View>
                  <View className="pl-2 flex-1">
                    <Text>
                      {item.postedBy?.firstName} {item.postedBy?.lastName}
                    </Text>
                    <Text>{item.comment}</Text>
                  </View>
                </View>
              )}
              ItemSeparatorComponent={
                <View className="py-px w-full bg-dark-gray" />
              }
            />
          </View>
          <View className="h-14 border-b border-app-dark-green flex-row items-center rounded-lg">
            <TextInput
              placeholder="Write your comment here"
              placeholderTextColor={"#004D40"}
              className="w-[85%] h-full pl-1 font-medium"
              value={comment}
              onChangeText={setComment}
            />
            <Pressable
              disabled={isLoading}
              onPress={handleCommentSubmit}
              className="w-[15%] h-full items-center justify-center border-app-dark-green"
            >
              {isLoading ? (
                <ActivityIndicator
                  size={"small"}
                  color={"#004D40"}
                  animating={true}
                />
              ) : (
                <FontAwesome name="paper-plane" color={"#004D40"} size={20} />
              )}
            </Pressable>
          </View>
        </View>
      </CustomModal>
    </View>
  );
};

export default SinglePost;
