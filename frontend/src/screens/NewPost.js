import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Pressable,
  ActivityIndicator,
  Keyboard,
} from "react-native";
import Feather from "@expo/vector-icons/Feather";
import HOC from "../components/HOC";
import * as ImagePicker from "expo-image-picker";
import { usePost } from "../context/PostContext";
import { useAuth } from "../context/AuthContext";

const NewPost = ({ navigation }) => {
  const [content, setContent] = useState(null);
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { createPost } = usePost();
  const { user } = useAuth();
  const pickImage = async () => {
    Keyboard.dismiss();
    if (file !== null) {
      alert("You can upload up to 10 images.");
      return;
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      aspect: [1, 1],
      qualiy: 0.25,
    });
    if (!result.canceled) {
      const newImage = result.assets[0];
      console.log(newImage);

      setFile(newImage);
      console.log(file);
    }
  };

  const formData = new FormData();
  const handleSubmit = async () => {
    setIsLoading(true);
    Keyboard.dismiss();
    formData.append("content", content);
    const localUri = file.uri;
    const filename = localUri.split("/").pop();
    const match = /\.(\w+)$/.exec(filename);
    const type = match ? `image/${match[1]}` : `image`;
    formData.append("file", {
      uri: file.uri,
      type,
      name: filename,
    });
    formData.append(
      "location",
      user?.location?.neighborHood || "Unknown Location"
    );
    formData.append("postType", "post");
    await createPost(formData);
    setIsLoading(false);
  };
  return (
    <HOC
      right={
        <TouchableOpacity
          onPress={handleSubmit}
          className="bg-app-dark-green rounded-full px-6 py-2"
        >
          {isLoading ? (
            <ActivityIndicator
              size={"small"}
              animating={true}
              color={"black"}
            />
          ) : (
            <Text className="font-semibold text-white">Post</Text>
          )}
        </TouchableOpacity>
      }
    >
      <View className="flex-1 mb-40 ">
        {/* Text Input Area */}
        <View className="flex-1 py-2">
          <TextInput
            className="text-lg py-4 px-2 text-black border-b rounded-xl border-app-dark-green"
            placeholder="What's on your mind?"
            placeholderTextColor={"black"}
            value={content}
            onChangeText={setContent}
            multiline
          />
          <View className="flex-1 relative">
            {file && (
              <View
                style={{
                  width: "100%",
                  borderRadius: 4,
                  overflow: "hidden",
                  position: "relative",
                  marginBottom: 50,
                }}
              >
                <Image
                  source={{ uri: file.uri }}
                  style={{
                    width: "100%",
                    height: "100%",
                  }}
                  resizeMode="stretch"
                />

                <Pressable
                  onPress={() => setFile(null)}
                  style={{
                    position: "absolute",
                    top: 5,
                    right: 5,
                    backgroundColor: "white",
                    borderRadius: 999,
                    height: 40,
                    width: 40,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{
                      color: "black",
                      fontSize: 20,
                      fontWeight: "bold",
                    }}
                  >
                    X
                  </Text>
                </Pressable>
              </View>
            )}
            <TouchableOpacity
              onPress={pickImage}
              className="absolute bottom-0 right-0"
            >
              <Feather name="image" size={30} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {/* Bottom Section */}
      <View className="border-2 border-b-0 absolute bottom-0 w-screen rounded-t-3xl border-app-dark-green h-40 p-4 pb-8">
        <Text className="text-lg pb-5 font-semibold">Create Something</Text>
        <View className="flex-row justify-around">
          <TouchableOpacity
            className="justify-center items-center border-app-dark-green border-2 rounded-xl px-6 py-2"
            onPress={() => navigation.navigate("CreateEvent")}
          >
            <Feather name="calendar" size={24} color="black" />
            <Text className=" text-black">Create an event</Text>
          </TouchableOpacity>
          <TouchableOpacity className="justify-center items-center border-app-dark-green border-2 rounded-xl px-6 py-2">
            <Feather name="heart" size={24} color="black" />
            <Text className=" text-black">Thanks giving</Text>
          </TouchableOpacity>
        </View>
      </View>
    </HOC>
  );
};

export default NewPost;
