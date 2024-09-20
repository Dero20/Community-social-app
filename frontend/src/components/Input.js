import React from 'react';
import { TextInput } from 'react-native';

const CustomTextInput = ({ value, onChangeText, placeholder }) => {
    return (
        <TextInput
            className="border-none p-2 rounded-xl mb-4 bg-light-gray
                px-4 "
            placeholder={placeholder}
            placeholderTextColor={"#A7A5A5"}
            value={value}
            onChangeText={onChangeText}
        />
    );
};

export default CustomTextInput;
