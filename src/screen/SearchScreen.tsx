import React from 'react'
import { StyleSheet, Text, View, Platform, ActivityIndicator, FlatList, Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Loading from '../components/Loading';
import PokemonCard from '../components/PokemonCard';
import SearchInput from '../components/SearchInput';
import { usePokemonSearch } from '../hooks/usePokemonSearch';
import { styles as globalStyles } from '../theme/appTheme';
import { useState, useEffect } from 'react';
import { SimplePokemon } from '../interfaces/pokemonInterfaces';

const screenWidth = Dimensions.get('window').width;

const SearchScreen = () => {

    const { top } = useSafeAreaInsets();
    const { isFetching, loadPokemons, simplePokemonList } = usePokemonSearch();

    const [pokemonFiltered, setPokemonFiltered] = useState<SimplePokemon[]>([])

    const [term, setTerm] = useState('')

    useEffect(() => {
        if(term.length === 0) {
            return setPokemonFiltered([]);
        }

        if( isNaN(Number(term)) ){
            setPokemonFiltered(
                simplePokemonList.filter( 
                    (poke) => poke.name.toLowerCase()
                        .includes(term.toLowerCase()) 
                )
            )
        } else {
            const pokemonById = simplePokemonList.find((poke) => poke.id === term)
            setPokemonFiltered(
                (pokemonById) ? [pokemonById] : []
            )
        }
        

    }, [term])

    if( isFetching ){
        return (
            <Loading />
        )
    }

    return (
        <View style={{
            flex: 1, 
            // marginTop: Platform.OS === 'ios' ? top : top + 10,
            marginHorizontal: 20

        }}>
            <SearchInput
                style={{
                    position: 'absolute', 
                    zIndex: 999,
                    width: screenWidth - 43,
                    top: (Platform.OS === 'ios' ? top : top + 25 )
                }}
                onDebounce={ (value) => setTerm(value) }
            />

            <FlatList 
                data={pokemonFiltered}
                keyExtractor={(pokemon) => pokemon.id}
                showsVerticalScrollIndicator={ false }
                numColumns={ 2 }

                // Header
                ListHeaderComponent={(
                    <Text style={{
                        ...globalStyles.title,
                        ...globalStyles.globalMargin,
                        top: top + 20,
                        marginBottom: top + 20,
                        paddingBottom: 15,
                        marginTop: (Platform.OS === 'ios' ? top + 60 : top + 70 )
                    }}>{term}</Text>
                )}

                renderItem={ ({item, index}) => (
                    <PokemonCard 
                        pokemon={item}
                    />
                )}

            />
        </View>
    )
}

export default SearchScreen

const styles = StyleSheet.create({
    
})
