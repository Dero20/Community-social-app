import { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  Pressable,
  Text,
  View,
  FlatList,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useFetch } from "../context/FetchContext";
import { useAuth } from "../context/AuthContext";
import HOC from "../components/HOC";
import CustomModal from "../components/CustomModal";

const { height, width } = Dimensions.get("window");

export default function CorporateListingDetails({ route }) {
  const { user } = useAuth();
  const { getProductById } = useFetch();

  const navigation = useNavigation();
  const [data, setData] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const showModal = () => setOpenModal(true);
  const hideModal = () => setOpenModal(false);

  const getProductData = async (id) => {
    const productData = await getProductById(id);
    setData(productData);
  };

  useEffect(() => {
    const productId = route?.params?.id;
    if (productId) {
      getProductData(productId);
    }
  }, [route.params]);

  return (
    <HOC>
      <View className="py-4">
        <View className="w-full h-80 relative rounded-xl overflow-hidden">
          {data?.images && (
            <Image
              source={{ uri: data?.images[0].url }}
              className="h-full w-full object-cover"
            />
          )}
          <View className="bottom-0 z-30 w-full absolute px-5 pb-2">
            <View className="px-5">
              <Pressable
                onPress={() => {
                  showModal();
                }}
                className="bg-app-dark-green w-full p-3 items-center rounded-3xl border border-white my-4"
              >
                <Text className="font-bold text-white text-base">See all photos</Text>
              </Pressable>
            </View>
          </View>
        </View>
        <View className="py-2 gap-y-4">
          <View className="gap-y-2">
            <Text className="text-xl font-bold">{data?.isFree ? "Free" : "$" + data?.price}</Text>
            <Text className="text-xl font-bold">{data?.title}</Text>
            <Text className="text-base font-medium">{data?.content}</Text>
          </View>
          <View className="flex-row items-center gap-1">
            <Text className="font-bold text-base">Category</Text>
            <Text className="font-bold text-base">·</Text>
            <Text className="capitalize font-bold text-base">
              {data?.category ?? "No category"}
            </Text>
          </View>
          <View className="py-5">
            <Pressable
              onPress={() =>
                navigation.navigate("StartChat", {
                  contextType: "product",
                  contextData: data,
                })
              }
              className="bg-app-dark-green w-full py-3 rounded-full"
            >
              <Text className="text-center text-base text-white">Message</Text>
            </Pressable>
          </View>
        </View>

        <CustomModal
          modalHeading={"Photos"}
          visible={openModal}
          hideModal={hideModal}
        >
          <View className="h-full w-full justify-center items-center">
            <FlatList
              data={data?.images}
              renderItem={({ item, index }) => (
                <View
                  key={index}
                  style={{
                    height: "100%",
                    width: width * 0.85,
                    justifyContent: "center",
                  }}
                >
                  <View className="h-1/2 rounded overflow-hidden">
                    <Image
                      source={{ uri: item.url }}
                      style={{
                        height: "100%",
                        width: "100%",
                      }}
                      resizeMode="stretch"
                    />
                  </View>
                </View>
              )}
              horizontal
              bounces={false}
              showsHorizontalScrollIndicator={false}
              style={{
                width: width * 0.85,
              }}
              pagingEnabled
              viewabilityConfig={{
                waitForInteraction: true,
                itemVisiblePercentThreshold: width * 0.85,
              }}
            />
          </View>
        </CustomModal>
      </View>
    </HOC>
  );
}
