import { TailwindProvider } from "tailwindcss-react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Provider } from "react-redux";
import store from "./src/store";
import Index from "./src/screens/Index";
import TripDetails from "./src/screens/TripDetails";
import NewTripForm from "./src/screens/NewTripForm";
import { LogBox } from "react-native";
import EditTripForm from "./src/screens/EditTripForm";
import NewEventForm from "./src/screens/NewEventForm";
import EventDetails from "./src/screens/EventDetails";

const Stack = createNativeStackNavigator();
LogBox.ignoreAllLogs();

export default function App() {
  return (
    <Provider store={store}>
      <TailwindProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={Index} />
            <Stack.Screen name="MainApp" component={Index} />
            <Stack.Screen name="TripDetails" component={TripDetails} />
            <Stack.Screen name="NewTripForm" component={NewTripForm} />
            <Stack.Screen name="EditTripForm" component={EditTripForm} />
            <Stack.Screen name="NewEventForm" component={NewEventForm} />
            <Stack.Screen name="EventDetails" component={EventDetails} />
          </Stack.Navigator>
        </NavigationContainer>
      </TailwindProvider>
    </Provider>
  );
}
