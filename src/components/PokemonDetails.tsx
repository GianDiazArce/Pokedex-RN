

import React from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { PokemonFull } from '../interfaces/pokemonInterfaces';
import { FadeInImage } from './FadeInImage';

interface Props {
    pokemon: PokemonFull
}

const PokemonDetails = ( { pokemon } : Props ) => {

    const convertWeight = ( weight: number) => {
        const pesoTemp = weight.toString();
        const ultimoNumero = pesoTemp.charAt(pesoTemp.length - 1);
        const penultimaPosicion = pesoTemp.length - 1;
        const pesoString = pesoTemp.slice(0, penultimaPosicion) + '.' + ultimoNumero;
        // const pesoString = pesoTemp.slice(0, penultimaPosicion) + ',' + ultimoNumero;
        const pesoNumber = parseFloat(pesoString);
        return pesoNumber
    }

    // console.log(convertWeight(pokemon.weight));
    return (
        <ScrollView 
            showsVerticalScrollIndicator={false}
            style={{
                ...StyleSheet.absoluteFillObject, // absoluteFillObject: para que se valla detras
                // backgroundColor: 'red',
        }}>
            {/* types y peso */}
            <View
                style={{
                    ...styles.container,
                    marginTop: 380
                }}
            >
                <Text style={ styles.title }>Types</Text>
                <View style={{flexDirection: 'row'}}>
                    {
                        pokemon.types.map( ({type}) => (
                            <Text
                                style={{
                                    ...styles.regularText, 
                                    marginRight: 10
                                }}
                                key={ type.name }
                            >
                                { type.name }
                            </Text>
                        ))
                    }
                </View>
                {/* Peso  */}
                <Text style={ styles.title }>Peso</Text>
                <Text style={ styles.regularText }>{convertWeight(pokemon.weight).toFixed(1)} kg</Text>
            </View>
            {/* Sprites */}
            <View style={{
                ...styles.container,
                // marginTop: 20
            }}>
                <Text style={ styles.title }>Sprites</Text>
            </View>

            <ScrollView 
                horizontal
                showsHorizontalScrollIndicator={false}
            >
                <FadeInImage 
                    uri={ pokemon.sprites.front_default }
                    style={ styles.basicSprites }
                />
                <FadeInImage 
                    uri={ pokemon.sprites.back_default }
                    style={ styles.basicSprites }
                />
                <FadeInImage 
                    uri={ pokemon.sprites.front_shiny }
                    style={ styles.basicSprites }
                />
                <FadeInImage 
                    uri={ pokemon.sprites.back_shiny }
                    style={ styles.basicSprites }
                />
            </ScrollView>

            {/* Habilidades */}
            <View style={styles.container}>
                <Text style={ styles.title }>Habilidades base</Text>
                <View style={{flexDirection: 'row'}}>
                    {
                        pokemon.abilities.map( ({ability}) => (
                            <Text
                                style={{
                                    ...styles.regularText, 
                                    marginRight: 10
                                }}
                                key={ ability.name }
                            >
                                { ability.name }
                            </Text>
                        ))
                    }
                </View>
            </View>
            {/* Movimientos */}
            <View style={styles.container}>
                <Text style={ styles.title }>Movimientos</Text>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap'}}>
                    {
                        pokemon.moves.map( ({move}) => (
                            <Text
                                style={{
                                    ...styles.regularText, 
                                    marginRight: 10
                                }}
                                key={ move.name }
                            >
                                { move.name }
                            </Text>
                        ))
                    }
                </View>
            </View>
            {/* stats */}
            <View style={styles.container}>
                <Text style={ styles.title }>Stats</Text>
                <View style={{ flexDirection: 'column'}}>
                    {
                        pokemon.stats.map( ( stat, index ) => (
                            <View 
                                key={ stat.stat.name + index }
                                style={{ flexDirection: 'row' }}    
                            >
                                <Text
                                    style={{
                                        ...styles.regularText, 
                                        marginRight: 10,
                                        width: 150
                                    }}
                                    key={ stat.stat.name }
                                >
                                    { stat.stat.name }
                                </Text>
                                <Text
                                    style={{
                                        ...styles.regularText,
                                        fontWeight: 'bold'
                                    }}
                                    
                                >
                                    { stat.base_stat }
                                </Text>
                            </View>
                        ))
                    }
                </View>

                {/* SpriteFinal */}
                <View style={{
                    marginBottom:30,
                    alignItems: 'center'
                }}>
                    <FadeInImage 
                        uri={ pokemon.sprites.front_default }
                        style={ styles.basicSprites }
                    />
                </View>
            </View>

        </ScrollView>
    )
}

export default PokemonDetails

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20
    },
    title: {
        fontWeight: 'bold',
        fontSize: 22,
        marginTop: 20,
    },
    regularText: {
        fontSize: 19,
    },
    basicSprites: {
        width: 110,
        height: 110,
    }
})
