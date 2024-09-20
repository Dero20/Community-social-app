import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  Button,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  Keyboard,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import HOC from "../components/HOC";
import CustomButton from "../components/Button";
import { allCategories } from "../data";
import { usePost } from "../context/PostContext";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

const PostAJob = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState(null);
  const [categories, setCategories] = useState(allCategories);
  const [isLoading, setIsLoading] = useState(false);
  const { postJob } = usePost();
  const [step, setStep] = useState(0);

  const handleSubmit = async () => {
    Keyboard.dismiss();
    setIsLoading(true);
    if (!title || !content || !category) {
      Alert.alert("Please fill in all fields");
      setIsLoading(false);
      return;
    }
    const dataToSend = {
      title,
      content,
      category,
    };
    await postJob(dataToSend);
    setTitle(null);
    setContent(null);
    setCategory(null);
    setIsLoading(false);
    setStep(0);
  };

  const handleNext = () => {
    setStep((prevStep) => (prevStep == 2 ? handleSubmit() : prevStep + 1));
  };
  const handlePrevious = () => {
    setStep((prevStep) => (prevStep == 0 ? prevStep : prevStep - 1));
  };

  return (
    <HOC>
      <View className="flex-1 items-center justify-center p-4 ">
        <View className="h-4/6 p-5 rounded-3xl w-full bg-dark-gray">
          <View className="gap-y-4 flex-1">
            <View className="relative items-center justify-center">
              {step > 0 && (
                <Pressable className="absolute left-0" onPress={handlePrevious}>
                  <FontAwesome5 name="arrow-left" size={24} color="black" />
                </Pressable>
              )}
              <Text className="text-lg font-semibold">
                {step === 0
                  ? "Select Category"
                  : step === 1
                  ? "Select Category"
                  : "Select Content"}
              </Text>
            </View>
            {step == 0 && (
              <View className="flex-row flex-wrap gap-2">
                {allCategories.map(({ label, value, logo, index }) => (
                  <Pressable
                    key={value}
                    onPress={() => setCategory(value)}
                    className={`bg-light-gray flex-row items-center gap-x-2 rounded-full px-4 py-1 ${
                      category === value
                        ? "border-app-dark-green border"
                        : "border border-light-gray"
                    }`}
                  >
                    {logo}
                    <Text
                      className={`font-medium ${
                        category === value
                          ? "text-app-dark-green"
                          : "text-black"
                      }`}
                    >
                      {label}
                    </Text>
                  </Pressable>
                ))}
              </View>
            )}
            {step == 1 && (
              <View className="flex-row flex-wrap gap-2">
                {allCategories
                  .filter(({ value }) => value === category) // Filter to get the selected category
                  .flatMap(({ jobTitles }) => jobTitles) // Extract job titles
                  .map(({ title: categoryTitle }, index) => (
                    <Pressable
                      key={index}
                      onPress={() => setTitle(categoryTitle)}
                      className={`bg-light-gray flex-row items-center gap-x-2 rounded-full px-4 py-1 ${
                        categoryTitle === title
                          ? "border-app-dark-green border"
                          : "border border-light-gray"
                      }`}
                    >
                      <Text
                        className={`font-medium ${
                          categoryTitle === title
                            ? "text-app-dark-green"
                            : "text-black"
                        }`}
                      >
                        {categoryTitle}
                      </Text>
                    </Pressable>
                  ))}
              </View>
            )}
            {step == 2 && (
              <View className="flex-col gap-2">
                {allCategories
                  .filter(({ value }) => value === category) // Filter to get the selected category
                  .flatMap(({ jobContent }) => jobContent) // Extract job content array
                  .filter(
                    (contentItem) => Object.keys(contentItem)[0] === title
                  ) // Find the content for the selected job title
                  .flatMap((contentItem) => contentItem[title]) // Extract the content array
                  .map(
                    (
                      { content: categoryContent },
                      index // Map over content to render it
                    ) => (
                      <Pressable
                        key={index}
                        onPress={() => setContent(categoryContent)}
                        className={`bg-light-gray flex-row items-center gap-x-2 rounded-full px-4 py-3 ${
                          categoryContent === content
                            ? "border-app-dark-green border"
                            : "border border-light-gray"
                        }`}
                      >
                        <Text
                          className={`font-medium ${
                            categoryContent === content
                              ? "text-app-dark-green"
                              : "text-black"
                          }`}
                        >
                          {categoryContent}
                        </Text>
                      </Pressable>
                    )
                  )}
              </View>
            )}
            <View className=" justify-end flex-1 ">
              <CustomButton
                isLoading={isLoading}
                style={{ borderRadius: 15 }}
                onPress={handleNext}
              >
                {step === 2 ? "Post" : "Next"}
              </CustomButton>
            </View>
          </View>
        </View>
      </View>
    </HOC>
  );
};

export default PostAJob;
