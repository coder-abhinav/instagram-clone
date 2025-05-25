import { Stack } from "expo-router";
import "../../global.css";
import store from "~/redux/store";
import { Provider } from "react-redux";
import Toast from "react-native-toast-message";

export default function RootLayout() {
  return (
    <Provider store={store}>
      <Stack screenOptions={{ headerShown: false }} />
      <Toast />
    </Provider>
  );
}
