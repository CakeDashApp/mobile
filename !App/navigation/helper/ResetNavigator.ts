import { CommonActions } from "@react-navigation/native";

export default function resetNavigator(navigation: any) {
  navigation.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [{ name: "Auth" }],
    })
  );
}
