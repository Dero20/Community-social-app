import { View, Text, ActivityIndicator } from "react-native";
import React from "react";

export default function CustomButton({
  children,
  onPress,
  isLoading,
  style,
  ...props
}) {
  return (
    <View >
      <Text
        {...props}
        style={{
          padding: 10,
          backgroundColor: "#004D40",
          color: "white",
          borderRadius: 5,
          textAlign: "center",
          fontSize: 16,
          ...style,
        }}
        className="my-3"
        onPress={onPress}
      >
        {isLoading ? (
          <ActivityIndicator size={"small"} color={"white"} animating={true} />
        ) : (
          children
        )}
      </Text>
    </View>
  );
}
