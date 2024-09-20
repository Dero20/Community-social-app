import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Keyboard,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import HOC from "../components/HOC";
import DateTimePickerComponent from "../components/DateTimePicker";
import CustomButton from "../components/Button";
import * as ImagePicker from "expo-image-picker";
import { useAuth } from "../context/AuthContext";
import { usePost } from "../context/PostContext";
const CreateEvent = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [eventName, setEventName] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const { user } = useAuth();
  const formData = new FormData();
  const { createEvent } = usePost();

  const handleSubmit = async () => {
    Keyboard.dismiss();
    setIsLoading(true);
    let dataToSend = {
      eventName,
      postalCode: user.location.postalCode,
      postType: "event",
      startDate,
      endDate,
      location: user.location.neighborHood,
    };
    await createEvent(dataToSend);
    setIsLoading(false);
  };
  return (
    <HOC>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        {/* <View className="my-5 px-3 bg-dark-gray rounded-3xl w-full items-center">
          {/* <View className="relative h-52 items-center overflow-hidden rounded-3xl w-full justify-center">
            {/* {file && (
              <Image
                source={{ uri: file.uri }}
                className="w-full h-full"
                resizeMode="stretch"
              />
            )} 
            <TouchableOpacity
              onPress={pickImage}
              className={`${
                file ? "bg-white" : "bg-app-dark-green "
              } rounded-lg px-4 py-3 absolute`}
            >
              <View className="flex-row items-center">
                <FontAwesome
                  name="image"
                  size={20}
                  color={file ? "black" : "white"}
                />
                <Text className={`${file ? "text-black" : "text-white"}  ml-2`}>
                  {file ? "Change Photo" : "Cover Photo"}
                </Text>
              </View>
            </TouchableOpacity>
          </View> 
        </View> */}

        {/* Event Name */}
        <View className="w-full mt-2 px-2">
          <Text className="text-lg font-semibold text-black">Event name</Text>
          <TextInput
            placeholderTextColor={"black"}
            className="border-b-2 border-black py-2 mb-4"
            placeholder=""
            value={eventName}
            onChangeText={setEventName}
          />

          {/* Start Date-Time Picker */}
          <DateTimePickerComponent
            date={startDate}
            setDate={setStartDate}
            label="Start"
          />

          {/* End Date-Time Picker */}
          <DateTimePickerComponent
            date={endDate}
            setDate={setEndDate}
            label="End (optional)"
          />

          {/* Location */}
          <Text className="text-lg font-semibold text-black">Location</Text>
          <View className="bg-dark-gray rounded-lg p-3 my-1 mb-4">
            <Text>
              {user?.location?.neighborHood}, {user?.location?.postalCode}
            </Text>
          </View>

          {/* Description */}
          <Text className="text-lg font-semibold text-black mb-2">
            Add more details (optional)
          </Text>
          <TextInput
            placeholderTextColor={"black"}
            className="bg-dark-gray rounded-lg p-3"
            placeholder="Description"
            multiline
            numberOfLines={5}
            textAlignVertical="top"
            value={description}
            onChangeText={setDescription}
          />
        </View>
        <View className="mt-4 px-2 w-full">
          <CustomButton
            isLoading={isLoading}
            style={{ borderRadius: 15 }}
            onPress={handleSubmit}
          >
            Post
          </CustomButton>
        </View>
      </ScrollView>
    </HOC>
  );
};

export default CreateEvent;
