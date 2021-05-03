import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screen/HomeScreen';
import PokemonScreen from '../screen/PokemonScreen';
import { SimplePokemon } from '../interfaces/pokemonInterfaces';


export type RootStackParams = {
    HomeScreen: undefined;
    PokemonScreen: { simplePokemon : SimplePokemon, color: string }
}

const Stack = createStackNavigator<RootStackParams>();

const Tab1 = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                cardStyle: {
                    backgroundColor: 'white'
                }
            }}
        >
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen name="PokemonScreen" component={PokemonScreen} />
        </Stack.Navigator>
    )
}

export default Tab1
