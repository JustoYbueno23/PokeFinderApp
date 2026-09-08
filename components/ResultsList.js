import { FlatList } from "react-native";
import PokemonCard from "./PokemonCard";

export default function ResultsList({ pokemon, navigation }) {
    return (
        <FlatList
            data={pokemon || []}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <PokemonCard pokemon={item} navigation={navigation} />}
        />
    );
}