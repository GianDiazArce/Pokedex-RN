import React from 'react'
import { View, Text, Image, FlatList, ActivityIndicator } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { styles } from '../theme/appTheme';
import PokemonCard from '../components/PokemonCard';
import { usePokemonPaginated } from '../hooks/usePokemonPaginated';

const HomeScreen = () => {

    const { top } = useSafeAreaInsets()

    const { simplePokemonList, loadPokemons } = usePokemonPaginated();
    // console.log(simplePokemonList);
    
    return (
        <>
            <Image 
                source={ require('../assets/pokebola.png') }
                style={styles.pokebolaBG}
            />
            {/* <FadeInImage 
                uri={ item.picture }
                style={{
                    width: 100,
                    height: 100,
                }}
            /> */}

            <View 
                style={{ alignItems: 'center' }}
            >
                <FlatList 
                    data={simplePokemonList}
                    keyExtractor={(pokemon) => pokemon.id}
                    showsVerticalScrollIndicator={ false }
                    numColumns={ 2 }
    
                    // Header
                    ListHeaderComponent={(
                        <Text style={{
                            ...styles.title,
                            ...styles.globalMargin,
                            top: top + 20,
                            marginBottom: top + 20,
                            paddingBottom: 15
                        }}>Pokedex</Text>
                    )}
    
                    renderItem={ ({item, index}) => (
                        <PokemonCard 
                            pokemon={item}
                        />
                    )}
    
    
                    // Infinite scroll
                    onEndReached={ loadPokemons }
                    onEndReachedThreshold={ 0.4 }
    
                    ListFooterComponent={ (
                        <ActivityIndicator 
                            style={{height: 100}} 
                            size={20} 
                            color="grey" 
                        />
                    )}
                />
            </View>

            
        </>
    )
}

export default HomeScreen
