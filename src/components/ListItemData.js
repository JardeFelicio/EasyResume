import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {
  useFonts,
  Montserrat_400Regular,
  Montserrat_700Bold,
} from "@expo-google-fonts/montserrat";
import { Colors } from "../utils/Colors";
export default function ListItemData({ textItem, infoItem, onPress }) {
  const [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_700Bold,
  });

  if (!fontsLoaded) {
    return <ActivityIndicator size={"large"} color={Colors.slateGray} />;
  } else {
    return (
      <TouchableOpacity style={styles.listItemContainer} onPress={onPress}>
        <View style={styles.leftAreaItem}>
          <View style={styles.headerAreaItem}>
            <Text style={styles.textItemList}>{textItem}</Text>
          </View>
          <View>
            <Text style={styles.descTextItem}>{infoItem}</Text>
          </View>
        </View>
        <Icon
          style={styles.iconArrow}
          name={"chevron-right"}
          size={22}
          color={Colors.black}
        />
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  listItemContainer: {
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    width: "100%",
    backgroundColor: Colors.lightGray,
    borderRadius: 18,
    padding: 20,
    marginBottom: 10,
  },
  leftAreaItem: {
    flexDirection: "column",
    width: "95%",
  },
  headerAreaItem: {
    width: "80%",
  },
  textItemList: {
    fontFamily: "Montserrat_700Bold",
    fontSize: 16,
    marginBottom: "1%",
  },
  descTextItem: {
    margin: "1%",
    fontFamily: "Montserrat_400Regular",
    fontSize: 14,
  },
  iconArrow: {},
});
