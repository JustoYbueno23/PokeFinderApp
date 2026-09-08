import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, fonts } from '../styles/themes';

export default function SearchBar({ text, onChangeText, limpiarBusqueda }) {
    return (
        <View style={styles.searchContainer}>
            <View style={styles.inputWrapper}>
                <Ionicons name='search' size={16} color={colors.text} style={styles.icono} />
                <TextInput 
                    style={styles.input} 
                    onChangeText={onChangeText} 
                    value={text} 
                    placeholder="Buscar Pokémon..."
                    placeholderTextColor={colors.text} 
                />
                {text.length > 0 && (
                    <TouchableOpacity onPress={limpiarBusqueda} style={styles.limpiarButton}>
                        <Ionicons name='close-circle' size={16} color={colors.text} />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    searchContainer: {
        width: '100%',
        zIndex: 1,
        marginBottom: 4,
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.white,
        borderRadius: 25,
        borderWidth: 2,
        borderColor: colors.back,
        paddingHorizontal: 10,
        paddingVertical: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
    },
    icono: {
        marginRight: 6,
    },
    input: {
        flex: 1,
        height: 36,
        fontSize: 9,
        color: colors.back,
        fontFamily: fonts.pixel,
    },
    limpiarButton: {
        padding: 4,
    },
});