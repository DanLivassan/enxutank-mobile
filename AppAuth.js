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
import { createDrawerNavigator } from '@react-navigation/drawer';
import GetDirections from './screens/user/GetDirections';


const Drawer = createDrawerNavigator()
const AppAuth = () => {
    const { user, token, performLogout } = useAuth();
    if (token) {
        return (
            <NavigationContainer>
                <Drawer.Navigator initialRouteName={Home.name} screenOptions={screenOptions}>
                    <Drawer.Screen
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
                    <Drawer.Screen
                        name={"Buscar uma rota"}
                        component={GetDirections}
                        options={({ navigation }) => {
                            return {
                                title: "Buscar",
                            }
                        }
                        }
                    />
                    <Drawer.Screen
                        name={MapDirection.name}
                        component={MapDirection}
                        options={({ navigation }) => {
                            return {
                                title: "Rota",
                                drawerLabel: () => null
                            }
                        }
                        }
                    />

                </Drawer.Navigator>
            </NavigationContainer>
        )
    }
    return (
        <NavigationContainer>
            <Drawer.Navigator initialRouteName={SignIn.name} screenOptions={screenOptions}>
                <Drawer.Screen
                    name={SignUp.name}
                    component={SignUp}
                    options={{ title: "Registrar-se" }}
                />
                <Drawer.Screen
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

            </Drawer.Navigator>
        </NavigationContainer>
    )
}
const screenOptions = { headerStyle: { backgroundColor: '#db4a39' }, headerTintColor: '#fff' }
export default AppAuth
