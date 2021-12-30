import { StatusBar } from "expo-status-bar";
import React, { Fragment, useState } from "react";
import * as authService from '../../services/auth'
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ImageBackground,
} from "react-native";
import { useForm } from "react-hook-form";
import InputValidated from "../components/InputValidated";
const Fields = [
    {
        name: 'email',
        placeholder: 'Email',
        rules: { required: "Este campo é requerido" },
        styles: {
            height: 50,
            flex: 1,
            padding: 10,
            marginLeft: 20,
        },
    },
    {
        name: 'password',
        placeholder: 'Password',
        rules: {
            required: "Este campo é requerido",
            pattern: {
                value: /^(?=(.*[a-z]){1,})(?=(.*[A-Z]){1,})(?=(.*[0-9]){1,})(?=(.*[!@#$%^&*()\-__+.]){1,}).{8,}$/,
                message: "Senha fraca"
            }
        },
        styles: {
            height: 50,
            flex: 1,
            padding: 10,
            marginLeft: 20,
        },
        secureTextEntry: true,
    },
    {
        name: 'name',
        placeholder: 'Nome',
        rules: { required: "Este campo é requerido" },
        styles: {
            height: 50,
            flex: 1,
            padding: 10,
            marginLeft: 20,
        },

    }

]
export default function SignUp() {
    const { handleSubmit, control, formState: { errors } } = useForm();
    const createUser = (data) => {
        const f = async () => {
            await authService.create_user(data)
        }
        f()
    }

    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <ImageBackground style={styles.container}
                source={require('../../assets/bg-images/main.jpg')}
            >

                {
                    Fields.map((field, key) => {
                        return <Fragment key={key}><View key={'view-' + key} style={styles.inputView}>
                            <InputValidated {...{
                                errors,
                                control,
                                ...field
                            }} />
                        </View>
                            {errors[[field.name]] && <Text key={'error-' + key} style={{ color: 'red', marginBottom: 10 }}>{errors[[field.name]].message}</Text>
                            }
                        </Fragment>
                    })
                }

                <TouchableOpacity style={styles.loginBtn} onPress={handleSubmit(createUser)}>
                    <Text style={styles.loginText}>REGISTRAR-SE</Text>
                </TouchableOpacity>
            </ImageBackground>
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%"
    },

    image: {

    },

    loginText: {
        color: "#fff"
    },
    inputView: {
        backgroundColor: "#CCCCCB",
        borderRadius: 30,
        width: "70%",
        height: 45,
        marginBottom: 10,

        alignItems: "center",
    },

    TextInput: {
        height: 50,
        flex: 1,
        padding: 10,
        marginLeft: 20,
    },

    forgot_button: {
        height: 30,
        marginBottom: 30,
    },

    loginBtn: {
        width: "80%",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        backgroundColor: "#2BD4F1",
        color: "#fff"
    },
});