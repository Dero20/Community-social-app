import { View, Text } from "react-native";
import React from "react";
import ListBookMarkedPosts from "../components/ListBookMarkedPosts";
import HOC from "../components/HOC";

export default function BookMarkedPosts() {
  return (
    <HOC
      center={
        <Text className="text-black text-xl font-semibold">
          Bookmarked Posts
        </Text>
      }
    >
      <ListBookMarkedPosts />
    </HOC>
  );
}
