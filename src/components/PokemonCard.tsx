import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Image } from 'react-native'
import { SimplePokemon } from '../interfaces/pokemonInterfaces';
import { FadeInImage } from './FadeInImage';
import { useState, useEffect, useRef } from 'react';
import ImageColors from "react-native-image-colors"
import { useNavigation } from '@react-navigation/core';

interface Props {
    pokemon: SimplePokemon;
}

const windowWidth = Dimensions.get('window').width

const PokemonCard = ({ pokemon }: Props) => {

    const [bgColor, setBgColor] = useState('grey');

    const isMounted = useRef(true);

    const navigator = useNavigation();

    // const pokeColor = async() => {
    //     const [ color ] = await getPokemonColor(pokemon.picture);
    //     setBgColor(color);
    // }

    useEffect(() => {
        // IOS background
        // Android: dominant
        ImageColors.getColors( pokemon.picture, {fallback: 'grey'})
            .then( (colors:any) => {
                if ( !isMounted.current )  return;
        
                // pokeColor(); //Solucion propia
                (colors.platform === 'android')
                    ? setBgColor(colors.dominant || 'grey')
                    : setBgColor(colors.background || 'grey')

            })

        return () => {
            isMounted.current = false;
        }
    }, [])

    return (
        <TouchableOpacity
            activeOpacity={0.8}
            onPress={ () => navigator.navigate(
                'PokemonScreen', 
                {
                    simplePokemon: pokemon, 
                    color: bgColor
                }
            )}
        >
            <View style={{
                ...styles.cardContainer,
                width: windowWidth * 0.4,
                backgroundColor: bgColor,
            }}>
                {/* Nombre y ID  */}
                <View>
                    <Text style={ styles.name }>
                        {pokemon.name}
                        {'\n#' + pokemon.id}
                    </Text>
                </View>
                <View style={styles.pokebolaContainer}>
                    <Image 
                        source={ require('../assets/pokebola-blanca.png') }
                        style={ styles.pokebola }
                    />
                </View>

                <FadeInImage 
                    uri={ pokemon.picture }
                    style={ styles.pokemonImage }
                />
            </View>
        </TouchableOpacity>
    )
}

export default PokemonCard

const styles = StyleSheet.create({
    cardContainer: {
        marginHorizontal: 10,
        // backgroundColor: 'grey',
        height: 120,
        width: 140,
        marginBottom: 25,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    name: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        top: 20,
        left: 10,
    },
    pokebolaContainer: {
        // backgroundColor: 'blue',
        width: 100,
        height: 100,
        position: 'absolute',
        bottom: 0,
        right: 0,
        overflow: 'hidden',
        opacity: 0.52
    },
    pokebola: {
        width: 100,
        height: 100,
        position: 'absolute',
        bottom: -25,
        right: -25,
        // opacity: 0.52
    },
    pokemonImage: {
        width: 113,
        height: 113,
        position: 'absolute',
        right: -7,
        bottom: -5,
    }
})

