import { useEffect, useState } from "react";
import { pokemonApi } from '../api/pokemonApi';
import { PokemonPaginatedResponse, SimplePokemon, Result } from '../interfaces/pokemonInterfaces';




export const usePokemonSearch = () => {
    // const url = 'https://pokeapi.co/api/v2/pokemon?limit=40';
    const [ isFetching, setisFetching ] = useState(true)
    const [simplePokemonList, setSimplePokemonList] = useState<SimplePokemon[]>([]);
    

    const loadPokemons = async() => {
        const resp = await pokemonApi.get<PokemonPaginatedResponse>('https://pokeapi.co/api/v2/pokemon?limit=1200');;
        mapPokemonListToSimplePokemon( resp.data.results );
        
        
    }

    const mapPokemonListToSimplePokemon = ( pokemonList: Result[] ) => {
        // pokemonList.forEach( (poke) => console.log(poke.url.split('/')[6]) )
        const newPokemonList: SimplePokemon[] = pokemonList.map( ({ name, url }, index) => {
            const urlParts = url.split('/');
            const id = urlParts[ urlParts.length - 2 ];
            const picture = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
            return {
                id,
                picture,
                name,
            }
        })
        setSimplePokemonList(newPokemonList);
        setisFetching(false)
    }

    useEffect(() => {
        loadPokemons();
    }, [])

    return {
        isFetching,
        simplePokemonList,
        loadPokemons,
    }

}
