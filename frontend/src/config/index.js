import {
  createDrawerNavigator,
  DrawerItemList,
  DrawerContentScrollView,
} from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import Ionicons from "@expo/vector-icons/Ionicons";

import {
  AuthScreen,
  Login,
  Signup,
  HomeScreen,
  Listing,
  ProductListing,
  NotificationScreen,
  Profile,
  ViewJobListing,
  InviteScreen,
  NewPostScreen,
  AddProductScreen,
  PostJobScreen,
  CreateEventScreen,
  UserProfileScreen,
  ProductDetailsScreen,
  BookMarkedPostsScreen,
} from "../screens";

import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { StyleSheet, Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useAuth } from "../context/AuthContext";
import StartChat from "../screens/StartChat";
import VerifyOTPScreen from "../screens/VerifyOtp";
import InboxScreen from "../screens/Inbox";

const Stack = createNativeStackNavigator();

const Drawer = createDrawerNavigator();

export const HomeTabs = () => {
  const styles = StyleSheet.create({
    container: {
      position: "relative",
      width: 75,
      alignItems: "center",
    },
    background: {
      position: "absolute",
      top: 0,
    },
    button: {
      top: -35,
      justifyContent: "center",
      alignItems: "center",
      width: 70,
      height: 70,
      borderRadius: 100,
      backgroundColor: "white",
      // borderRadius: 5,
      borderWidth: 5,
      borderColor: "black",
      padding: 10,
    },
    buttonIcon: {
      fontSize: 25,
      color: "black",
    },
  });
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarLabelStyle: { color: "black" },
      })}
    >
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <AntDesign
              name="home"
              size={24}
              color={focused ? "#004D40" : "black"}
            />
          ),
          tabBarLabel: ({ focused }) => (
            <Text
              className={`text-xs ${
                focused ? "text-app-dark-green" : "text-black"
              }`}
            >
              Home
            </Text>
          ),
        }}
      />
      <Tab.Screen
        name="Jobs"
        component={ViewJobListing}
        options={{
          tabBarIcon: ({ focused }) => (
            <Entypo
              name="briefcase"
              size={24}
              color={focused ? "#004D40" : "black"}
            />
          ),
          tabBarLabel: ({ focused }) => (
            <Text
              className={`text-xs ${
                focused ? "text-app-dark-green" : "text-black"
              }`}
            >
              Jobs
            </Text>
          ),
        }}
      />
      <Tab.Screen
        // options={{ headerShown: false }}
        name="Add"
        component={Listing}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="add-circle"
              size={24}
              color={focused ? "#004D40" : "black"}
            />
          ),
          tabBarLabel: ({ focused }) => (
            <Text
              className={`text-xs ${
                focused ? "text-app-dark-green" : "text-black"
              }`}
            >
              Add
            </Text>
          ),
        }}
      />
      <Tab.Screen
        name="Shop"
        component={ProductListing}
        options={{
          tabBarIcon: ({ focused }) => (
            <Entypo
              name="shop"
              size={24}
              color={focused ? "#004D40" : "black"}
            />
          ),
          tabBarLabel: ({ focused }) => (
            <Text
              className={`text-xs ${
                focused ? "text-app-dark-green" : "text-black"
              }`}
            >
              Shop
            </Text>
          ),
        }}
      />
      <Tab.Screen
        name="Notification"
        component={NotificationScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="notifications"
              size={24}
              color={focused ? "#004D40" : "black"}
            />
          ),
          tabBarLabel: ({ focused }) => (
            <Text
              className={`text-xs ${
                focused ? "text-app-dark-green" : "text-black"
              }`}
            >
              Notifications
            </Text>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export const DrawerNav = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          backgroundColor: "white",
          width: "70%",
          borderTopRightRadius: 40,
          borderBottomRightRadius: 40,
        },
      }}
      initialRouteName="Home"
    >
      <Drawer.Screen name="Home" component={HomeTabs} />
      <Drawer.Screen name="Notification" component={NotificationScreen} />
      <Drawer.Screen name="Profile" component={Profile} />
      <Drawer.Screen name="Inbox" component={InboxScreen} />
      <Drawer.Screen
        options={{ headerShown: false, drawerLabel: "My Neighbours" }}
        name="Invite"
        component={InviteScreen}
      />
    </Drawer.Navigator>
  );
};

export const RootNavigator = () => {
  const Stack = createNativeStackNavigator();
  const { user } = useAuth();
  return (
    <Stack.Navigator>
      {!user && (
        <>
          <Stack.Screen
            name="AuthScreen"
            component={AuthScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Signup"
            component={Signup}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="VerifyOtp"
            component={VerifyOTPScreen}
            options={{ headerShown: false }}
          />
        </>
      )}
      {user && (
        <Stack.Group>
          <Stack.Screen
            name="HomeNav"
            component={DrawerNav}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="NewPost"
            component={NewPostScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="UserProfile"
            component={UserProfileScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="AddProduct"
            component={AddProductScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="PostJob"
            component={PostJobScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="BookmarkPosts"
            component={BookMarkedPostsScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="CreateEvent"
            component={CreateEventScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ProductDetails"
            component={ProductDetailsScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="StartChat"
            component={StartChat}
            options={{ headerShown: false }}
          />
        </Stack.Group>
      )}
    </Stack.Navigator>
  );
};
