import { View, Image, ActivityIndicator, StyleSheet, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import { Colors } from "../../utils/Colors";
import {
  useFonts,
  Montserrat_400Regular,
  Montserrat_600SemiBold,
} from "@expo-google-fonts/montserrat";

export function SplashScreen() {
  const navigation = useNavigation();

  const checkAuthentication = () => {
    const isAuthenticated = true;

    setTimeout(() => {
      if (isAuthenticated) {
        navigation.replace("HomeScreen");
      } else {
        navigation.replace("HomeScreen");
      }
    }, 2000);
  };

  useEffect(() => {
    checkAuthentication();
  }, []);

  let [fontsLoaded] = useFonts({
    Montserrat_400Regular,

    Montserrat_600SemiBold,
  });
  if (!fontsLoaded) {
    return <ActivityIndicator size={"large"} color={Colors.lightGray} />;
  } else {
    return (
      <View style={styles.container}>
        <Image
          source={require("../../assets/github_two.png")}
          style={styles.imageLogo}
        />
        <ActivityIndicator
          size={"large"}
          color={Colors.slateGray}
          style={styles.iconLoading}
        />
        <View style={styles.footer}>
          <Text style={styles.textOne}>from</Text>
          <Text style={styles.textTwo}>Jarde Felicio</Text>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: Colors.bluishGray,
  },
  imageLogo: { marginTop: 200, width: 103, height: 100 },
  iconLoading: { marginTop: 100 },
  footer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: 100,
  },
  textOne: {
    fontSize: 14,
    fontFamily: "Montserrat_400Regular",
    textAlign: "center",
    color: Colors.deepPurple,
    marginBottom: 8,
  },
  textTwo: {
    fontSize: 18,
    fontFamily: "Montserrat_600SemiBold",
    textAlign: "center",
    color: Colors.deepPurple,
  },
});
