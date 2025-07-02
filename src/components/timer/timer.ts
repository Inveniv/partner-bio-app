import { Platform } from "react-native";
import BackgroundTimer from "react-native-background-timer";
import Timer from "react-native-background-timer-android";

export default Platform.OS === "android" ? Timer : BackgroundTimer;
