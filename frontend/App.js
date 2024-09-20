import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { RootNavigator } from "./src/config";
import "react-native-gesture-handler";
import { AuthProvider } from "./src/context/AuthContext";
import { FetchProvider } from "./src/context/FetchContext";
import { PostProvider } from "./src/context/PostContext";
import { RootSiblingParent } from "react-native-root-siblings";

export default function App() {
  return (
    <RootSiblingParent>
      <NavigationContainer>
        <AuthProvider>
          <FetchProvider>
            <PostProvider>
              <RootNavigator />
            </PostProvider>
          </FetchProvider>
        </AuthProvider>
      </NavigationContainer>
    </RootSiblingParent>
  );
}
