import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome'
import { useAuth } from './context/auth.context';
import SignIn from './screens/user/SignIn';
import SignUp from './screens/user/SignUp';
import Home from './screens/user/Home';
import MapDirection from './screens/user/MapDirection';

const Stack = createNativeStackNavigator()
const AppAuth = () => {
    const { user, token, performLogout } = useAuth();
    if (token) {
        return (
            <NavigationContainer>
                <Stack.Navigator initialRouteName={Home.name} screenOptions={screenOptions}>
                    <Stack.Screen
                        name={Home.name}
                        component={Home}
                        options={({ navigation }) => {
                            return {
                                title: "Home",
                                headerRight: () => (<Button
                                    type="clear"
                                    onPress={performLogout}
                                    icon={<Icon name="arrow-right" color="#fff" size={25} />}
                                >
                                </Button>),
                            }
                        }
                        }
                    />
                    <Stack.Screen
                        name={MapDirection.name}
                        component={MapDirection}
                        options={({ navigation }) => {
                            return {
                                title: "Rota",
                            }
                        }
                        }
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
                                icon={<Icon name="plus-circle" size={25} color="white" />}
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
