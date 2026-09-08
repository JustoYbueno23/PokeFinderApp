import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import SearchScreen from './Screens/SearchScreen';
import DetailScreen from './Screens/DetailScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Search">
          <Stack.Screen name="Search" component={SearchScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Detail" component={DetailScreen} options={{ presentation: 'modal', title: '', headerShown:false, }} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider >
  );
}