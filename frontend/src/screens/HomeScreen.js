import React, { useState } from "react";
import ListAllPosts from "../components/ListAllPosts";
import MainHOC from "../components/MainHOC";

export default function HomeScreen() {
  return (
    <MainHOC noHorizontalPadding={true}>
      <ListAllPosts />
    </MainHOC>
  );
}
