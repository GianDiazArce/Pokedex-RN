import { useEffect, useRef, useState } from "react";
import { pokemonApi } from '../api/pokemonApi';
import { PokemonPaginatedResponse, SimplePokemon, Result } from '../interfaces/pokemonInterfaces';




export const usePokemonPaginated = () => {
    // const url = 'https://pokeapi.co/api/v2/pokemon?limit=40';
    const [isLoading, setIsLoading] = useState(true);
    const [simplePokemonList, setSimplePokemonList] = useState<SimplePokemon[]>([]);
    const nextPageUrl = useRef('https://pokeapi.co/api/v2/pokemon?limit=40')
    

    const loadPokemons = async() => {
        setIsLoading(true);
        const resp = await pokemonApi.get<PokemonPaginatedResponse>(nextPageUrl.current);
        nextPageUrl.current = resp.data.next;
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
        setSimplePokemonList([...simplePokemonList, ...newPokemonList]);
        setIsLoading(false)
    }

    useEffect(() => {
        loadPokemons();
    }, [])

    return {
        isLoading,
        simplePokemonList,
        loadPokemons,
    }

}
