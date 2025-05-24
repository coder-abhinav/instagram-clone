import { View, Image, Text, Pressable } from "react-native";
import { AntDesign, Ionicons, Feather } from "@expo/vector-icons";
import { useState } from "react";

type userTypes = {
  id: string;
  avatar_url: string;
  image_url: string;
  username: string;
};
type post = {
  id: number;
  image: string;
  image_url: string;
  caption: string;
  user: userTypes;
};
type posts = {
  post: post;
};

export default function PostListItem({ post }: posts) {
  const [isHeartPressed, setIsHeartPressed] = useState<boolean>(false);

  const handleLikePress = () => {
    setIsHeartPressed((prevState) => !prevState);
  };
  return (
    <View className="bg-white">
      {/* Header */}
      <View className="p-3 flex-row items-center gap-2">
        <Image
          source={{ uri: post.user.image_url }}
          className="w-12 aspect-square rounded-full"
        />
        <Text className="font-semibold">{post.user.username}</Text>
      </View>
      <Image source={{ uri: post.image_url }} className="w-full aspect-[4/3]" />

      {/* Footer */}
      <View className="flex-row gap-3 p-3">
        <Pressable onPress={() => handleLikePress()}>
          <AntDesign
            name={isHeartPressed ? "heart" : "hearto"}
            size={20}
            color={isHeartPressed ? "red" : "black"}
          />
        </Pressable>
        <Ionicons name="chatbubble-outline" size={20} />
        <Feather name="send" size={20} />

        <Feather name="bookmark" size={20} className="ml-auto" />
      </View>
    </View>
  );
}
