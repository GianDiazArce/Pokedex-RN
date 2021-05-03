import { StackScreenProps } from '@react-navigation/stack'
import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image, ActivityIndicator } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { RootStackParams } from '../navigator/Tab1'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FadeInImage } from '../components/FadeInImage'
import { usePokemon } from '../hooks/usePokemon';
import PokemonDetails from '../components/PokemonDetails';

interface Props extends StackScreenProps<RootStackParams, 'PokemonScreen'> {};

const PokemonScreen = ({ navigation, route }:Props) => {

    const { simplePokemon, color } = route.params;
    const { id, name, picture } = simplePokemon
    const { top } = useSafeAreaInsets();

    const { isLoading, pokemon } = usePokemon(id);
    // console.log(pokemon)
    
    return (
        <View style={{flex: 1}}>
            {/* Header Container */}
            <View style={{
                ...styles.headerContainer,
                backgroundColor: color,
            }}>
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={{
                        ...styles.backButton,
                        top: top + 8,
                    }}
                    onPress={ () => navigation.pop() }
                >

                    <Icon 
                        name="arrow-back-outline"
                        color="white"
                        size={ 35 }
                    />
                </TouchableOpacity>
                
                {/* Nombre del pokemon */}
                <Text
                    style={{
                        ...styles.pokemonName,
                        top: top + 41
                    }}
                >
                    { name + '\n' }#{id}
                </Text>

                {/* Pokebola Blanca  */}
                <Image 
                    source={ require('../assets/pokebola-blanca.png') }
                    style={ styles.pokeball }
                />

                <FadeInImage 
                    uri={ picture }
                    style={ styles.pokemonImage }
                />
            </View>

            {/* Detalles  y Loading */}
            {
                isLoading 
                ? (
                    <View style={ styles.activityIndicator }>
                        <ActivityIndicator 
                            color={ color }
                            size={ 50 }
                        />
                    </View>

                )
                : <PokemonDetails pokemon={pokemon} />
            }

        </View>
    )
}

export default PokemonScreen

const styles = StyleSheet.create({
    headerContainer: {
        height: 370,
        zIndex: 999,
        alignItems: 'center',
        borderBottomLeftRadius: 1000,
        borderBottomRightRadius: 1000,
    },
    backButton: {
        position: 'absolute',
        left: 18,
    },
    pokemonName: {
        color: 'white',
        fontSize: 40,
        alignSelf: 'flex-start',
        left: 20
    },
    pokeball: {
        width: 250,
        height: 250,
        bottom: -21,
        opacity: 0.7
    },
    pokemonImage: {
        width: 250,
        height: 250,
        position: 'absolute',
        bottom: -16
    },
    activityIndicator: {
        flex: 1,
        // height: 200,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
