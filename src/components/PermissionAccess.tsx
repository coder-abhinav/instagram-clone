import * as MediaLibrary from "expo-media-library";
import { Text, View, Button } from "react-native";

export default function PermissionAccess() {
  const [status, requestPermission] = MediaLibrary.usePermissions();

  if (!status) return <Text>Checking permissions...</Text>;

  if (status.status !== "granted") {
    return (
      <View className="p-4">
        <Text className="mb-2">We need media access to continue</Text>
        <Button title="Allow Access" onPress={requestPermission} />
      </View>
    );
  }

  return null;
}
