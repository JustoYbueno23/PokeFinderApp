import { StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import { colors, fonts } from "../styles/themes";

export default function PokemonCard({ pokemon, navigation }) {
    return (
        <TouchableOpacity onPress={() => navigation.navigate('Detail', { pokemon: pokemon })} style={styles.resultado} >
            <Image source={{ uri: pokemon.sprites.front_default }} style={styles.pokemonImage} resizeMode="contain" />
            <Text style={styles.resultadoTexto}> {pokemon.name} (#{pokemon.id})</Text>
            {pokemon.types.map((item) => (
                <Text key={item.type.name} > {item.type.name}</Text>
            ))}
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    resultadoTexto: {
        fontFamily: fonts.pixel,
        fontSize: 12,
        color: colors.primary,
        marginTop: 8,
    },
    resultado: {
        marginTop: 16,
        alignItems: 'center',
        zIndex: 1,
    },
    pokemonImage: {
        width: 96,
        height: 96,
    },
});
