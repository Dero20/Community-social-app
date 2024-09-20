import React, { useEffect, useState } from "react";
import { Image, Text, View } from "react-native";
import HOC from "../components/HOC";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useFetch } from "../context/FetchContext";
import CustomButton from "../components/Button";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../context/AuthContext";

const UserProfile = ({ route }) => {
  const { getSingleUser } = useFetch();
  const { user } = useAuth();
  const [userDetails, setUserDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = route.params;
  const navigation = useNavigation();

  const getUserData = async () => {
    if (id) {
      setIsLoading(true);
      const data = await getSingleUser(id);
      setUserDetails(data);
      setIsLoading(false);
    }
  };
  console.log(userDetails);

  useEffect(() => {
    getUserData();
  }, [id]);
  const handleChat = () => {
    navigation.navigate("StartChat", {
      contextType: "profile",
      contextData: userDetails,
    });
  };
  return (
    <HOC>
      <View className="py-5 flex-1 ">
        <View className="items-center justify-center">
          <View className="h-32 w-32 bg-dark-gray border-2 border-app-dark-green rounded-full overflow-hidden">
            {userDetails && userDetails?.profilePicture && (
              <Image
                className="h-full w-full"
                resizeMode="cover"
                source={{ uri: userDetails.profilePicture.url }}
              />
            )}
          </View>
          <View className="mt-3">
            <Text className="text-xl font-bold text-app-dark-green">
              {userDetails &&
                `${userDetails.firstName} ${userDetails.lastName}`}
            </Text>
          </View>
          <View className="border border-app-dark-green w-3/5 mt-1" />
          <View className="self-start mt-10">
            <Text className="text-xl self-start ml-2 font-bold text-black">
              Email
            </Text>
            <View className="mt-3 flex-row items-center">
              <Text className="text-lg ml-2 font-semibold text-app-dark-green">
                {userDetails && userDetails.email}
              </Text>
            </View>
          </View>
          {userDetails &&
            userDetails?.speciality &&
            userDetails.speciality?.category && (
              <View className="self-start mt-10">
                <Text className="text-xl self-start ml-2 font-bold text-black">
                  Speciality
                </Text>
                <View className="mt-3 flex-row items-center">
                  <Text className="text-lg ml-2 font-semibold text-app-dark-green">
                    {userDetails.speciality.category}
                  </Text>
                </View>
              </View>
            )}
          {userDetails &&
            userDetails?.speciality &&
            userDetails.speciality?.description && (
              <View className="self-start mt-10">
                <Text className="text-xl self-start ml-2 font-bold text-black">
                  Description
                </Text>
                <View className="mt-3 flex-row items-center">
                  <Text className="text-lg ml-2 font-semibold text-app-dark-green">
                    {userDetails.speciality.description}
                  </Text>
                </View>
              </View>
            )}
          {userDetails && user._id !== userDetails._id && (
            <View className="mt-12 w-52">
              <CustomButton isLoading={isLoading} onPress={handleChat}>
                Message
              </CustomButton>
            </View>
          )}
        </View>
      </View>
    </HOC>
  );
};

export default UserProfile;
