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
import CustomDrawer from './navigator/CustomDrawer';


const Drawer = createDrawerNavigator()
const AppAuth = () => {
    const { user, token, performLogout } = useAuth();
    if (token) {
        return (
            <NavigationContainer>
                <Drawer.Navigator initialRouteName={Home.name} screenOptions={screenOptions} drawerContent={props => <CustomDrawer {...props} />}>
                    <Drawer.Screen
                        name={Home.name}
                        component={Home}
                        options={({ navigation }) => {
                            return {
                                title: "Home",
                                drawerIcon: () => {
                                    return <Icon name="home" color={'#fff'} size={20}></Icon>
                                },
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
                                drawerIcon: () => {
                                    return <Icon name="search" color={'#fff'} size={20}></Icon>
                                },
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
const screenOptions = {
    headerStyle: { backgroundColor: '#db4a39' },
    headerTintColor: '#fff',
    drawerActiveBackgroundColor: "#ca3028",
    drawerActiveTintColor: "#fff",
    drawerInactiveTintColor: "#fff",
}
export default AppAuth
