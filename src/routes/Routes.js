import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

//Screens
import { SplashScreen } from "../screens/SplashScreen/SplashScreen";
import { HomeScreen } from "../screens/HomeScreen/HomeScreen";
import { ResumeScreen } from "../screens/ResumeScreen/ResumeScreen";
import { PersonalDataScreen } from "../screens/ResumeScreen/components/PersonalDataScreen";
import { ProfessionalObjectiveScreen } from "../screens/ResumeScreen/components/ProfessionalObjectiveScreen";
import { QualificationsSummaryScreen } from "../screens/ResumeScreen/components/QualificationsSummaryScreen";
import { EducationalBackgroundScreen } from "../screens/ResumeScreen/components/EducationalBackgroundScreen/EducationalBackgroundScreen";
import { EducationalBackgroundScreenAdd } from "../screens/ResumeScreen/components/EducationalBackgroundScreen/EducationalBackgroundScreenAdd";
import { ProfessionalExperienceScreen } from "../screens/ResumeScreen/components/ProfessionalExperienceScreen/ProfessionalExperienceScreen";
import { ProfessionalExperienceScreenAdd } from "../screens/ResumeScreen/components/ProfessionalExperienceScreen/ProfessionalExperienceScreenAdd";
import { CoursesScreen } from "../screens/ResumeScreen/components/CoursesScreen/CoursesScreen";
import { CoursesScreenAdd } from "../screens/ResumeScreen/components/CoursesScreen/CoursesScreenAdd";
import { ProfessionalQualificationsScreen } from "../screens/ResumeScreen/components/ProfessionalQualificationsScreen/ProfessionalQualificationsScreen";
import { ProfessionalQualificationsScreenAdd } from "../screens/ResumeScreen/components/ProfessionalQualificationsScreen/ProfessionalQualificationsScreenAdd";
import { LanguagesScreen } from "../screens/ResumeScreen/components/LanguageScreen/LanguagesScreen";
import { LanguagesScreenAdd } from "../screens/ResumeScreen/components/LanguageScreen/LanguagesScreenAdd";
import { AdditionalInformationScreen } from "../screens/ResumeScreen/components/AdditionalInformationScreen/AdditionalInformationScreen";
import { AdditionalInformationScreenAdd } from "../screens/ResumeScreen/components/AdditionalInformationScreen/AdditionalInformationScreenAdd";

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
          name="PersonalDataScreen"
          component={PersonalDataScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ProfessionalObjectiveScreen"
          component={ProfessionalObjectiveScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="QualificationsSummaryScreen"
          component={QualificationsSummaryScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="EducationalBackgroundScreen"
          component={EducationalBackgroundScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="EducationalBackgroundScreenAdd"
          component={EducationalBackgroundScreenAdd}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ProfessionalExperienceScreen"
          component={ProfessionalExperienceScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ProfessionalExperienceScreenAdd"
          component={ProfessionalExperienceScreenAdd}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="CoursesScreen"
          component={CoursesScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CoursesScreenAdd"
          component={CoursesScreenAdd}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ProfessionalQualificationsScreen"
          component={ProfessionalQualificationsScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ProfessionalQualificationsScreenAdd"
          component={ProfessionalQualificationsScreenAdd}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="LanguagesScreen"
          component={LanguagesScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="LanguagesScreenAdd"
          component={LanguagesScreenAdd}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AdditionalInformationScreen"
          component={AdditionalInformationScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AdditionalInformationScreenAdd"
          component={AdditionalInformationScreenAdd}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
