import React from 'react'
import { Controller } from 'react-hook-form'
import { TextInput } from 'react-native'

const InputValidated = ({
    name,
    control,
    rules,
    styles,
    placeholder,
    secureTextEntry,
    errors
}) => {
    return (<><Controller
        control={control}
        rules={rules}
        render={({ field: { onChange, onBlur, value } }) => {
            return <><TextInput
                style={styles}
                onBlur={onBlur}
                placeholder={placeholder}
                onChangeText={onChange}
                value={value}

                secureTextEntry={secureTextEntry}
            />


            </>
        }}
        name={name}
    />

    </>)
}

export default InputValidated
