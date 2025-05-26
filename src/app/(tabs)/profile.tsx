import { Image, Text, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useEffect, useState } from "react";
import Button from "~/src/components/Button";
import TextInputs from "~/src/components/LabeledInputs";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Toast from "react-native-toast-message";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "~/redux/reducers/userReducer";

type userData = {
  fullName: string | null;
  email: string | null;
  profilePicture: string | null;
  userName: string | null;
};

export default function ProfileScreen() {
  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  const [fullName, setFullName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [initialData, setInitialData] = useState<userData>();
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user);
  const isChanged =
    fullName !== initialData?.fullName ||
    email !== initialData?.email ||
    profilePicture !== initialData?.profilePicture ||
    userName !== initialData?.userName;

  useEffect(() => {
    if (user) {
      setInitialData(user);
      setFullName(user.fullName || "");
      setUserName(user.userName || "");
      setEmail(user.email || "");
      setProfilePicture(user.profilePicture || null);
    }
  }, [user]);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfilePicture(result.assets[0].uri);
    }
  };

  const handleUpdateProfile = async () => {
    if (!isChanged) {
      Toast.show({
        type: "info",
        text1: "No changes detected",
        text2: "Make some changes to update your profile.",
      });
      return;
    }
    const data = {
      fullName,
      userName,
      email,
      profilePicture,
    };

    dispatch(updateProfile(data));
    Toast.show({
      type: "success",
      text1: "Profile Updated",
      text2: "Your changes have been saved.",
    });
  };

  return (
    <View className="p-3 flex-1">
      {/* Avatar Image Picker */}
      {profilePicture ? (
        <Image
          source={{ uri: profilePicture }}
          className="w-52 aspect-square rounded-full shadow-lg self-center"
        />
      ) : (
        <View className="w-52 aspect-square rounded-full shadow-lg justify-center items-center bg-slate-300 self-center ">
          <FontAwesome
            onPress={pickImage}
            name="plus-square-o"
            className="w-100"
            size={80}
            color={"white"}
          />
        </View>
      )}

      <Text
        onPress={pickImage}
        className="text-blue-500 font-semibold m-5 self-center shadow-lg"
      >
        Edit profile picture
      </Text>

      {/* Form */}
      <View className="gap-2 bg-slate-100 p-2 rounded-lg">
        <TextInputs
          value={email}
          setValue={setEmail}
          placeholder="Email"
          title="Email"
        />
        <TextInputs
          value={fullName}
          setValue={setFullName}
          placeholder="Full name"
          title="Full Name"
        />
        <TextInputs
          value={userName}
          setValue={setUserName}
          placeholder="Username"
          title="Username"
        />
      </View>

      {/* Action Buttons */}
      <View className="gap-2 w-full mr-auto ml-auto mt-auto p-2">
        <Button
          disabled={!isChanged}
          onPress={() => handleUpdateProfile()}
          title="Update profile"
        />
      </View>
    </View>
  );
}
