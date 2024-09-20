import { View, Text } from "react-native";
import React from "react";
import { useFetch } from "../context/FetchContext";
import ListAllJobs from "../components/ListAllJobs";

export default function ViewJobListing() {
  return (
    <View>
      <ListAllJobs />
    </View>
  );
}
