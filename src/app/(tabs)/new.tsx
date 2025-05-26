import { useEffect, useState } from "react";
import Toast from "react-native-toast-message";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useRouter } from "expo-router";
import { Image, Text, TextInput, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import Button from "~/src/components/Button";
import { useDispatch, useSelector } from "react-redux";
import { addPost } from "~/redux/reducers/postReducer";
import { Post } from "~/redux/types";

export default function CreatePost() {
  const router = useRouter();
  const [caption, SetCaption] = useState<string>();
  const [image, setImage] = useState<string | null>(null);
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user);
  const { posts } = useSelector((state: any) => state.posts);

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
  const showToast = () => {
    Toast.show({
      type: "success",
      text1: "Saved!",
      text2: "Your post was added successfully 🚀",
    });
  };
  const clearData = () => {
    setImage("");
    SetCaption("");
  };

  const sharePost = () => {
    const newPost = {
      id: posts?.length + 1,
      image: image,
      image_url: image,
      caption: caption,
      user: {
        id: "u1",
        avatar_url: user.profilePicture,
        image_url: user.profilePicture,
        username: user.userName,
      },
    } as Post;
    dispatch(addPost(newPost));
    showToast();
    setTimeout(() => {
      router.back();
      clearData();
    }, 1000);
  };

  return (
    <View className="p-3 items-center flex-1">
      {/* Image Picker */}
      {image ? (
        <Image
          source={{ uri: image }}
          className="w-full aspect-[4/3] rounded-lg shadow-lg"
        />
      ) : (
        <View className="w-full aspect-[4/3] rounded-lg shadow-lg justify-center items-center bg-slate-300">
          <FontAwesome
            onPress={pickImage}
            name="plus-square-o"
            className="w-100"
            size={200}
            color={"white"}
          />
        </View>
      )}

      <Text
        onPress={pickImage}
        className="text-blue-500 font-semibold m-5 shadow-lg"
      >
        Press here or on add icon to upload new image
      </Text>

      {/* Captions */}
      <TextInput
        onChangeText={(newValue) => SetCaption(newValue)}
        value={caption}
        placeholder="What's on your mind?"
        className="w-full p-3 border-b-2 border-gray-300"
      />

      {/* Action Button */}
      <View className="mt-auto w-full">
        <Button
          disabled={image ? false : true}
          title="Share post"
          onPress={() => sharePost()}
        />
      </View>
    </View>
  );
}
