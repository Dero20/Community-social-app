import { View, Pressable, Dimensions, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

export default function HOC({
  children,
  onBackPress,
  hideHeader,
  center,
  noHorizontalPadding,
  right,
  ...props
}) {
  const navigate = useNavigation();
  const route = useRoute();
  const { height, width } = Dimensions.get("screen");
  return (
    <SafeAreaView
      style={{
        height: height,
        width: width,
        paddingHorizontal: noHorizontalPadding ? 0 : 10,
        backgroundColor: "white",
        paddingTop: 20,
        flex: 1,
      }}
    >
      {/* Header */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          paddingVertical: 5,
          paddingHorizontal: noHorizontalPadding ? 10 : 0,
        }}
      >
        <Pressable
          style={{ position: "absolute", left: 5 }}
          onPress={
            onBackPress
              ? onBackPress
              : () => {
                  navigate.goBack();
                }
          }
        >
          <FontAwesome5 name="arrow-left" size={24} color="black" />
        </Pressable>
        {!hideHeader &&
          (center ? (
            center
          ) : (
            <Text className="font-semibold text-xl ">{route.name}</Text>
          ))}
        {right && (
          <View style={{ position: "absolute", right: 5 }}>{right}</View>
        )}
      </View>

      {children}
    </SafeAreaView>
  );
}
