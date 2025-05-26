import { Dispatch, SetStateAction } from "react";
import { Text, TextInput, View } from "react-native";

type props = {
  value: string;
  placeholder?: string;
  setValue: Dispatch<SetStateAction<string>>;
  title?: string;
};

export default function TextInputs({
  value,
  placeholder,
  setValue,
  title,
}: props) {
  return (
    <View>
      {title ? (
        <Text className="mb-2 text-gray-500 font-semibold">{title}</Text>
      ) : (
        ""
      )}
      <TextInput
        value={value}
        placeholder={placeholder}
        onChangeText={setValue}
        className="border border-gray-500 p-3 rounded-md bg-slate-200"
      />
    </View>
  );
}
