import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { Platform, FlatList, ScrollView, StatusBar, View } from "react-native";
import posts from "~/assets/data/post.json";
import PostListItem from "~/src/components/PostListItem";
import { useSelector } from "react-redux";

type PostData = {
  id: string;
  image: string;
  image_url: string;
  caption: string;
  user: {
    id: string;
    avatar_url: string;
    image_url: string;
    username: string;
  };
};
const isWeb = Platform.OS === "web";

export default function FeedScreen() {
  const content = (
    <FlatList
      data={posts}
      keyExtractor={(item, index) => item.id?.toString() ?? index.toString()}
      renderItem={({ item }: any) => <PostListItem post={item} />}
      ListHeaderComponent={
        <StatusBar
          animated={true}
          backgroundColor="#ffffff"
          barStyle="dark-content"
          hidden={false}
        />
      }
      contentContainerStyle={{
        width: "100%",
        maxWidth: 512,
        alignSelf: "center",
        paddingBottom: 20,
      }}
      showsVerticalScrollIndicator={false}
      style={{ flexGrow: 1 }}
    />
  );

  return isWeb ? (
    <ScrollView style={{ flex: 1 }}>{content}</ScrollView>
  ) : (
    content
  );
}
