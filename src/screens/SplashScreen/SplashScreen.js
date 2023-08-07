import { View, Image, ActivityIndicator, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";

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

  return (
    <View style={style.container}>
      <Image
        source={require("../../assets/github.png")}
        style={style.imageLogo}
      />
      <ActivityIndicator
        style={style.iconLoading}
        size={"large"}
        color="#757575"
      />
    </View>
  );
}

const style = StyleSheet.create({
  container: { flex: 1, alignItems: "center", backgroundColor: "#fff" },
  imageLogo: { marginTop: 200, width: 103, height: 100 },
  iconLoading: { margin: 10, paddingTop: 40 },
});
