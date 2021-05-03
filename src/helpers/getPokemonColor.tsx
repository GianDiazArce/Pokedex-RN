
import React from 'react'
import ImageColors from "react-native-image-colors"



export const getPokemonColor = async( uri: string ) => {



    let color: string;
    const colors = await ImageColors.getColors(uri, {
        fallback: 'grey'
    });
        
    (colors.platform === 'android')
        ? color = colors.dominant || 'grey'
        : color = colors.background || 'grey'
    return [color];
    
}
