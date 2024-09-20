import { useState } from "react";
import {
  Text,
  View,
  Switch,
  TextInput,
  TouchableOpacity,
  Keyboard,
  ScrollView,
  Image,
  Pressable,
} from "react-native";
import HOC from "../components/HOC";
import DropDownPicker from "react-native-dropdown-picker";
import { productCategories } from "../data";
import CustomTextInput from "../components/Input";
import Entypo from "@expo/vector-icons/Entypo";
import CustomButton from "../components/Button";
import { useAuth } from "../context/AuthContext";
import { usePost } from "../context/PostContext";
import * as ImagePicker from "expo-image-picker";

const AddProduct = () => {
  const [open, setOpen] = useState(false);
  const [enabled, setIsEnabled] = useState(false);
  const [category, setCategory] = useState(null);
  const [categories, setCategories] = useState(productCategories);
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [describe, setDescribe] = useState("");
  const [price, setPrice] = useState("1");
  const [isFree, setIsFree] = useState(false);
  const [images, setImages] = useState("");
  const [location, setLocation] = useState("");
  const [priceError, setPriceError] = useState("");
  // const [formData, setFormData] = useState({
  //   title: "",
  //   describe: "",
  //   price: "",
  //   isFree: false,
  //   images: [],
  //   location: "Lliswerry",
  // });
  const { user } = useAuth();
  const { createProduct } = usePost();
  const formData = new FormData();

  const toggleSwitch = () => {
    setIsEnabled((previousState) => !previousState);

    if (enabled) {
      setPrice("");
      setIsFree(false);
    } else {
      setPrice("Free");
      setIsFree(true);
      setPriceError(""); 
    }
  };
  const handleSubmit = async () => {
    Keyboard.dismiss();
    if (price === "0") {
      setPriceError("Price cannot be 0. Please enter a valid price."); // Validate on submit
      return;
    }
    setIsLoading(true);
    const location = `${user.location.neighborHood}, ${user.location.postalCode}`;
    formData.append("title", title);
    formData.append("content", describe);
    formData.append("category", category);
    formData.append("price", price);
    formData.append("isFree", isFree);
    formData.append("location", location);
    images.forEach((file) => {
      const localUri = file.uri;
      const filename = localUri.split("/").pop();
      const match = /\.(\w+)$/.exec(filename);
      const type = match ? `image/${match[1]}` : `image`;
      formData.append("files", {
        uri: localUri,
        type,
        name: filename,
      });
    });
    console.log(formData);

    await createProduct(formData);
    setIsLoading(false);
  };

  const pickImage = async () => {
    if (images.length >= 10) {
      alert("You can upload up to 10 images.");
      return;
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      aspect: [1, 1],
      qualiy: 0.25,
      base64: true,
      allowsMultipleSelection: true,
    });
    if (!result.canceled) {
      // const newImage = {
      //   uri: result.assets[0].uri,
      //   // base64: result.assets[0].base64,
      // };
      const newImages = result.assets.map((val) => ({ uri: val.uri }));
      setImages([...images, ...newImages]);
    }
  };

  return (
    <HOC>
      <View className="flex-1 px-3 py-3">
        <View>
          <Text className="text-lg font-bold mb-2">Category</Text>
          <DropDownPicker
            open={open}
            value={category}
            items={categories}
            setOpen={setOpen}
            setValue={setCategory}
            setItems={setCategories}
            placeholder="Select a category"
            style={{
              backgroundColor: "#F3F1F1",
              borderColor: "transparent",
              borderRadius: 12,
            }}
            dropDownContainerStyle={{
              backgroundColor: "#F3F1F1",
              borderWidth: 1,
              borderColor: "gray",
            }}
            closeOnBackPressed={true}
            closeAfterSelecting
          />
        </View>

        {/* Form Section */}
        <Text className="text-black py-5 font-bold text-xl">
          What are you selling?
        </Text>

        <CustomTextInput
          onChangeText={(text) => setTitle(text)}
          placeholder="Title"
          value={title}
        />
        <CustomTextInput
          onChangeText={(text) => setDescribe(text)}
          placeholder="Describe your item..."
          value={describe}
        />
        <View className="py-2">
          {/* Location Section */}
          <Text className=" text-lg font-bold">Pickup Location</Text>
          <View className="flex-row items-center justify-between mt-4 rounded-xl">
            <View className="flex-row items-center bg-app-dark-green rounded-full px-3 py-1">
              <Entypo name="location-pin" size={16} color="white" />
              <Text className="ml-1 text-white">
                {user.location.neighborHood}, {user.location.postalCode}
              </Text>
            </View>
          </View>
        </View>
        <Text className=" text-lg font-bold">Upload Images</Text>
        <View className="py-2 gap-y-3">
          <View className="flex-row items-center gap-2">
            <Pressable
              className="border rounded py-2 px-3 border-app-dark-green"
              onPress={pickImage}
            >
              <Text className="text-app-dark-green text-xs font-medium">
                Choose File
              </Text>
            </Pressable>

            <Text className="text-app-dark-green">
              {images.length > 0
                ? `${images.length} file uploaded`
                : "No file chosen"}
            </Text>
          </View>
          <Text className="font-medium text-sm">
            Please upload square image, size less than 100KB
          </Text>
        </View>
        <View className="py-2">
          {images.length > 0 && (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                height: 85,
                gap: 8,
              }}
            >
              {images.map((image, index) => (
                <View
                  key={index}
                  style={{
                    width: 100,
                    borderRadius: 4,
                    overflow: "hidden",
                    position: "relative",
                  }}
                >
                  <Image
                    source={{ uri: image.uri }}
                    style={{
                      width: "100%",
                      height: "100%",
                      resizeMode: "cover",
                    }}
                  />
                  <Pressable
                    onPress={() => {
                      const newImages = [...images];
                      newImages.splice(index, 1);
                      setImages(newImages);
                    }}
                    style={{
                      position: "absolute",
                      top: 2,
                      right: 2,
                      backgroundColor: "#004D40",
                      padding: 2,
                      paddingHorizontal: 5,
                      borderRadius: 999,
                      height: 20,
                      width: 20,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Text
                      style={{
                        color: "white",
                        fontSize: 10,
                        fontWeight: "bold",
                      }}
                    >
                      X
                    </Text>
                  </Pressable>
                </View>
              ))}
            </ScrollView>
          )}
        </View>
        {/* Price Section */}
        <View className="flex-row justify-between items-center py-2">
          <View className="flex-row items-center">
            <TextInput
              className="border-none p-2 rounded-xl mb-4 bg-light-gray w-[150px]"
              placeholder="Price"
              placeholderTextColor={enabled ? "#A7A5A5" : "black"}
              aria-disabled={!enabled}
              readOnly={enabled}
              value={price}
              onChangeText={
                (text) => setPrice(text)
              }
            />
          </View>
          <View className="flex-row items-center justify-around">
            <Text className="mr-2">Free</Text>
            <Switch
              thumbColor={enabled ? "#004D40" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={enabled}
            />
          </View>
        </View>
        {/* Display the price error */}
        {priceError.length > 0 && (
          <Text style={{ color: "red", fontSize: 12 }}>{priceError}</Text>
        )}
        <CustomButton
          isLoading={isLoading}
          style={{ borderRadius: 15 }}
          onPress={handleSubmit}
        >
          Add
        </CustomButton>
      </View>
    </HOC>
  );
};

export default AddProduct;
