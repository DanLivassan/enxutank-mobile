import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button, Icon } from 'react-native-elements';
import SignIn from './screens/user/SignIn';
import SignUp from './screens/user/SignUp';

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={"SignIn"} screenOptions={screenOptions}>
        <Stack.Screen
          name={SignUp.name}
          component={SignUp}
          options={{ title: "Registrar-se" }}
        />
        <Stack.Screen
          name={SignIn.name}
          component={SignIn}
          options={({ navigation }) => {
            return {
              title: "Entrar",
              headerRight: () => (<Button
                type="clear"
                onPress={() => navigation.push(SignUp.name)}
                icon={<Icon name="add" size={25} />}
              >
              </Button>),
            }
          }
          }
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
const screenOptions = { headerStyle: { backgroundColor: '#db4a39' }, headerTintColor: '#fff' }

