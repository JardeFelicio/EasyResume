import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "../utils/Colors";
import {
  useFonts,
  Montserrat_800ExtraBold,
} from "@expo-google-fonts/montserrat";

export default function Header({ title, screenReplace, goBackScreen }) {
  const navigation = useNavigation();
  const [fontsLoaded] = useFonts({
    Montserrat_800ExtraBold,
  });
  const navigantionScreen = () => {
    if (goBackScreen) {
      navigation.goBack(screenReplace);
    } else {
      navigation.replace(screenReplace);
    }
  };
  if (!fontsLoaded) {
    return <ActivityIndicator size={"large"} color={Colors.slateGray} />;
  } else {
    return (
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{title}</Text>
        <TouchableOpacity style={styles.closeIcon} onPress={navigantionScreen}>
          <Icon name={"close"} size={22} color={Colors.white} />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    marginTop: 50,
    margin: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "85%",
  },
  headerTitle: {
    fontSize: 25,
    fontFamily: "Montserrat_800ExtraBold",
    width: "85%",
  },
  closeIcon: {
    backgroundColor: Colors.deepPurple,
    borderRadius: 20,
    width: 60,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
});
