import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "../../config/Colors";
import {
  useFonts,
  Montserrat_800ExtraBold,
} from "@expo-google-fonts/montserrat";

export default function Header({ title, screenReplace }) {
  const navigation = useNavigation();
  const [fontsLoaded] = useFonts({
    Montserrat_800ExtraBold,
  });

  if (!fontsLoaded) {
    return <ActivityIndicator size={"large"} color="#757575" />;
  } else {
    return (
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{title}</Text>
        <TouchableOpacity
          style={styles.closeIcon}
          onPress={() => navigation.replace(screenReplace)}
        >
          <Icon name={"close"} size={22} color={Colors.secondaryColor} />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    marginTop: 60,
    margin: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "85%",
  },
  headerTitle: {
    fontSize: 26,
    fontFamily: "Montserrat_800ExtraBold",
  },
  closeIcon: {
    backgroundColor: Colors.primaryColor,
    borderRadius: 20,
    width: 60,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
});
