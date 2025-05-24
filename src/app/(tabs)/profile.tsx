import { Image, Text, TextInput, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import Button from "~/src/components/Button";

export default function ProfileScreen() {
  const [image, setImage] = useState<string | null>(null);
  const [userName, setUserName] = useState("");

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  return (
    <View className="p-3 flex-1">
      {/* Avatar Image Picker */}
      {image ? (
        <Image
          source={{ uri: image }}
          className="w-52 aspect-square rounded-full shadow-lg self-center"
        />
      ) : (
        <View className="w-52 aspect-square rounded-full shadow-lg bg-slate-300 self-center " />
      )}

      <Text
        onPress={pickImage}
        className="text-blue-500 font-semibold m-5 self-center"
      >
        Change
      </Text>

      {/* Form */}
      <Text className="mb-2 text-gray-500 font-semibold">Username</Text>
      <TextInput
        value={userName}
        placeholder="username"
        onChangeText={setUserName}
        className="border border-gray-500 p-3 rounded-md"
      />

      {/* Action Buttons */}
      <View className="gap-2 mt-auto">
        <Button title="Update profile" />
        <Button title="Sign out" />
      </View>
    </View>
  );
}
