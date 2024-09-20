import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../context/AuthContext";
import io from "socket.io-client";
import { useFetch } from "../context/FetchContext";
import HOC from "../components/HOC";

export default function ChatScreen({ route }) {
  const { user } = useAuth();
  const { getInbox } = useFetch();
  const navigation = useNavigation();

  const { contextType, contextData } = route.params;

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const socketRef = useRef(null);

  useEffect(() => {
    if (!contextData || !contextData._id) {
      console.error("Invalid context data or missing _id:", contextData);
      return;
    }

    socketRef.current = io("http://10.0.2.2:4000");

    const userId = user._id;
    socketRef.current.on("connect", () => {
      socketRef.current.emit("joinRoom", {
        userId,
        contextType,
        contextId: contextData._id,
      });
    });

    // Listen for new messages
    socketRef.current.on("newMessage", (newChat) => {
      console.log("New message received:", newChat);
      setMessages(newChat.messages);
    });

    // Load existing messages if any
    socketRef.current.on("loadMessages", (loadedMessages) => {
      console.log("Loaded messages:", loadedMessages);
      setMessages(loadedMessages);
    });

    console.log("Room join and message listener set up.");

    return () => {
      console.log("Disconnecting socket...");
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, [user._id, contextType, contextData?._id]);

  const sendMessage = () => {
    if (message.trim() && contextData && contextData._id) {
      const userId = user._id;
      socketRef.current.emit("contextualChat", {
        contextType,
        contextId: contextData._id,
        message,
        userId,
      });
      setMessage("");
      getInbox();
    }
  };

  useEffect(() => {}, [messages]);

  console.log("COntext Data: ", contextData);

  if (!contextData || !contextData._id) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-xl font-bold text-red-500">
          Invalid chat data. Please try again.
        </Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white">
      <View className="p-4 relative flex-row items-center justify-center bg-gray-100">
        <TouchableOpacity
          className="absolute left-3"
          onPress={() => navigation.goBack()}
        >
          <Text className="text-blue-500">Back</Text>
        </TouchableOpacity>
        <Text className="text-xl font-bold text-center">
          {contextType === "job"
            ? contextData.title
            : contextType === "product"
            ? contextData.title
            : `${contextData.firstName} ${contextData.lastName}`}
        </Text>
        <View />
      </View>

      <ScrollView className="flex-1 p-4">
        {messages?.map((msg, index) => (
          <View
            key={index}
            className={`${
              msg.postedBy === user._id
                ? "self-end bg-blue-500"
                : "self-start bg-gray-300"
            } p-3 rounded-lg mb-2 max-w-[80%]`}
          >
            <Text
              className={`${
                msg.postedBy === user._id ? "text-white" : "text-black"
              }`}
            >
              {msg.message}
            </Text>
          </View>
        ))}
      </ScrollView>

      <View className="flex-row items-center p-4 border-t border-gray-200">
        <TextInput
          value={message}
          onChangeText={setMessage}
          placeholder="Type a message"
          className="flex-1 p-3 border border-gray-300 rounded-lg"
        />
        <TouchableOpacity
          onPress={sendMessage}
          className="ml-2 bg-blue-500 p-3 rounded-lg"
        >
          <Text className="text-white">Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
