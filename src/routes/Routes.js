import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SplashScreen } from "../screens/SplashScreen/SplashScreen";
import { HomeScreen } from "../screens/HomeScreen/HomeScreen";
import { ResumeScreen } from "../screens/ResumeScreen/ResumeScreen";
import { LanguagesScreen } from "../screens/ResumeScreen/components/LanguagesScreen";
import { CourseScreen } from "../screens/ResumeScreen/components/CoursesScreen";

const Stack = createNativeStackNavigator();

export function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen">
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ResumeScreen"
          component={ResumeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CousesScreen"
          component={CourseScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="LanguagesScreen"
          component={LanguagesScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
