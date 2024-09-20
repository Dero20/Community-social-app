import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Pressable, Keyboard } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";
import CustomButton from "../components/Button";
import { useAuth } from "../context/AuthContext";
import * as Location from "expo-location";
import DropDownPicker from "react-native-dropdown-picker";
import { categories } from "../data";

export default function SignupScreen() {
  const navigation = useNavigation();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [openCategory, setOpenCategory] = useState(false);
  const [itemsCategory, setItemsCategory] = useState(categories);
  const [categoryValue, setCategoryValue] = useState(null);
  const [description, setDescription] = useState(null);
  const { Signup } = useAuth();

  const handleSignup = async () => {
    Keyboard.dismiss();
    if (!location) {
      alert("Please Enable Location");
    }
    let dataToSend = {
      firstName,
      lastName,
      email,
      password,
      location: {
        lat: location.coords.latitude,
        lng: location.coords.longitude,
        ...address,
      },
      speciality: {
        category: categoryValue,
        description: description,
      },
    };
    const res = await Signup(dataToSend);
    if (res.success) {
      navigation.navigate("VerifyOtp", { email });
    } else {
      console.log("Signup error:", res.error);
    }
  };

  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setLocation(location);
    let data = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    };
    let regionName = await Location.reverseGeocodeAsync(data);
    console.log(regionName);

    if (regionName && regionName.length > 0) {
      let locationInfo = regionName[0];
      let extractedNeighborhood =
        locationInfo.district || locationInfo.subregion || "Unknown Region";
      let postCode = locationInfo.postalCode;
      setAddress({ neighborHood: extractedNeighborhood, postalCode: postCode });
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  return (
    <View className="flex-1 items-center py-20 bg-[#CFE2DF] w-full h-full">
      {/* Back Icon */}
      <Pressable
        className="absolute top-10 left-5"
        onPress={() => {
          navigation.goBack();
        }}
      >
        <AntDesign name="arrowleft" size={24} color="black" />
      </Pressable>

      <Text className="text-4xl mt-10 font-bold text-app-dark-green text-center">
        Signup
      </Text>

      <TextInput
        className="w-3/4 h-12 bg-white rounded-lg mt-10 px-5"
        placeholder="First Name"
        onChangeText={setFirstName}
        value={firstName}
      />
      <TextInput
        className="w-3/4 h-12 bg-white rounded-lg mt-5 px-5"
        placeholder="Last Name"
        onChangeText={setLastName}
        value={lastName}
      />
      <TextInput
        className="w-3/4 h-12 bg-white rounded-lg mt-5 px-5"
        placeholder="Email"
        autoCapitalize="none"
        onChangeText={setEmail}
        value={email}
      />
      <TextInput
        className="w-3/4 h-12 bg-white rounded-lg mt-5 px-5"
        placeholder="Password"
        secureTextEntry
        onChangeText={setPassword}
        value={password}
      />
      <View className="mt-5 w-3/4">
        <DropDownPicker
          placeholder="Speciality (Optional)"
          placeholderStyle={{
            color: "gray",
          }}
          dropDownDirection="TOP"
          style={{
            paddingHorizontal: 19,
            paddingVertical: 15,
            borderColor: "gray",
            borderRadius: 10,
            marginHorizontal: "auto",
          }}
          open={openCategory}
          value={categoryValue}
          items={itemsCategory}
          setOpen={setOpenCategory}
          listMode="FLATLIST"
          setValue={setCategoryValue}
          setItems={setItemsCategory}
          disableBorderRadius={false}
          closeAfterSelecting={true}
          dropDownContainerStyle={{
            marginHorizontal: "auto",
            borderRadius: 10,
            marginVertical: 5,
            padding: 5,
            top: 60,
            position: "absolute",
            height: 300,
          }}
        />
      </View>
      <TextInput
        className="w-3/4 bg-white rounded-lg pt-3 mt-5 px-5"
        placeholder="Describe Your Speciality (Optional)"
        onChangeText={setDescription}
        value={description}
        multiline
        textAlignVertical="top"
        numberOfLines={8}
      />
      <View className="w-3/4 flex flex-col mt-5">
        <CustomButton onPress={handleSignup}>Signup</CustomButton>
        <Text className="mt-3">
          Already have an account?{" "}
          <Text
            onPress={() => {
              navigation.navigate("Login");
            }}
            className="text-blue-500 underline"
          >
            Login
          </Text>
        </Text>
      </View>
    </View>
  );
}
