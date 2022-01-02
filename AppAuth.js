import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button, Icon } from 'react-native-elements';
import { useAuth } from './context/auth.context';
import SignIn from './screens/user/SignIn';
import SignUp from './screens/user/SignUp';
import Home from './screens/user/Home';
const Stack = createNativeStackNavigator()
const AppAuth = () => {
    const { user, token } = useAuth();
    if (token) {
        return (
            <NavigationContainer>
                <Stack.Navigator initialRouteName={Home.name} screenOptions={screenOptions}>
                    <Stack.Screen
                        name={Home.name}
                        component={Home}
                        options={{ title: "Home" }}
                    />

                </Stack.Navigator>
            </NavigationContainer>
        )
    }
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={SignIn.name} screenOptions={screenOptions}>
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
    )
}
const screenOptions = { headerStyle: { backgroundColor: '#db4a39' }, headerTintColor: '#fff' }
export default AppAuth
