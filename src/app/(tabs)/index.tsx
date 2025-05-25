import { Platform, FlatList, ScrollView, StatusBar, View } from "react-native";
import PostListItem from "~/src/components/PostListItem";
import { useSelector } from "react-redux";

const isWeb = Platform.OS === "web";

export default function FeedScreen() {
  const { posts } = useSelector((state: any) => state.posts);
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
