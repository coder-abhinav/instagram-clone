import { useEffect, useState } from "react";
import { Image, Pressable, Text, TextInput, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import Button from "~/src/components/Button";

export default function CreatePost() {
  const [caption, SetCaption] = useState<string>();
  const [image, setImage] = useState<string | null>(null);

  useEffect(() => {
    if (!image) {
      pickImage();
    }
  }, [image]);

  const handleCaptionChange = (newValue: any) => {
    SetCaption(newValue);
  };
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View className="p-3 items-center flex-1">
      {/* Image Picker */}
      {image ? (
        <Image
          source={{ uri: image }}
          className="w-52 aspect-[3/4] rounded-lg shadow-lg"
        />
      ) : (
        <View className="w-52 aspect-[3/4] rounded-lg shadow-lg bg-slate-500 " />
      )}

      <Text onPress={pickImage} className="text-blue-500 font-semibold m-5">
        Change
      </Text>

      {/* Captions */}
      <TextInput
        onChange={(newValue) => handleCaptionChange(newValue)}
        value={caption}
        placeholder="What's on your mind?"
        className="w-full p-3"
      />

      {/* Action Button */}
      <View className="mt-auto w-full">
        <Button title="Share post" />
      </View>
    </View>
  );
}
