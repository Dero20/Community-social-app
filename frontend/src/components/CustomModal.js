import React from "react";
import { Modal, View, Text, Pressable } from "react-native";
import { FontAwesome as Icon } from "@expo/vector-icons"; // Assuming you're using FontAwesome for icons

const CustomModal = ({ visible, hideModal, modalHeading, children }) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={hideModal}
    >
      <View className="flex-1 justify-center items-center bg-black/50">
        <View className="bg-white rounded-lg p-6 h-4/5 w-[90%] relative">
          {/* Close Button */}
          <Pressable
            onPress={hideModal}
            className="absolute top-2 right-2 h-6 w-6 justify-center items-center"
          >
            <Icon size={25} name="close" />
          </Pressable>

          {/* Modal Heading */}
          <View>
            <Text className="font-semibold text-center text-lg">
              {modalHeading}
            </Text>
          </View>
          <View className="flex-1">{children}</View>
        </View>
      </View>
    </Modal>
  );
};

export default CustomModal;
