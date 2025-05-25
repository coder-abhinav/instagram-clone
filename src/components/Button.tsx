import { Pressable, Text } from "react-native";

type ButtonProps = {
  title: string;
  onPress?: () => void;
  disabled?: boolean;
};

export default function Button({ title, onPress, disabled }: ButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      className={
        !disabled
          ? "bg-blue-500 w-full p-3 items-center rounded-md"
          : "bg-gray-300 w-full p-3 items-center rounded-md"
      }
      disabled={disabled}
    >
      <Text className="text-white font-semibold">{title}</Text>
    </Pressable>
  );
}
