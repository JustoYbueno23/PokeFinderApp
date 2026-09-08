/* Juan José Medina Orozco*/
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, fonts } from '../styles/themes';
import { buscarVariosPokemon } from "../services/pokeApi";
import SearchBar from "../components/SearchBar";
import ResultsList from '../components/ResultsList';
import { useFonts, PressStart2P_400Regular } from '@expo-google-fonts/press-start-2p';

const SearchScreen = ({ navigation }) => {
    let [fontsLoaded] = useFonts({
        PressStart2P_400Regular,
    });
    const [text, onChangeText] = useState('');
    const [pokemon, setPokemon] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if(text.length === 0){
            setError(null);
            setPokemon([]);
            return;
        }

        if (isNaN(text)) {
            if (text.length < 3) {
                setError("mínimo 3 caracteres...");
                setPokemon([]);
                return;
            }
        } else {
            if (Number(text) < 1 || Number(text) > 1025|| !Number.isInteger(Number(text))) {
                setError("ID fuera de rango");
                setPokemon([]);
                return;
            }
        }
        async function getData() {
            setLoading(true);
            setError(null);
            try {
                const result = await buscarVariosPokemon(text)
                setPokemon(result)
                if (result.length === 0) {
                    setError("No se encontraron Pokémon")
                }
            } catch (error) {
                setError(error.message)
                setPokemon([])
            } finally {
                setLoading(false)
            }
        }
        const timer = setTimeout(() => {
            getData();
        }, 500);
        return () => clearTimeout(timer);
    }, [text]);

    const limpiarBusqueda = () => {
        onChangeText('');
        setPokemon([]);
        setError(null);
    };

    if (!fontsLoaded) {
        return null;
    }

    return (
        <SafeAreaView style={styles.deviceBody}>
            {/* CABECERA CON BISEL Y DETALLES */}
            <View style={styles.headerContainer}>
                <View style={styles.headerLeft}>
                    <View style={styles.mainButton} />
                    <View style={styles.mediumButton} />
                    <View style={styles.smallButton} />
                </View>
                <View style={styles.headerRight}>
                    <View style={styles.lightBar} />
                    <View style={styles.lightBarSmall} />
                </View>
            </View>
            
            <View style={styles.screenWrapper}>
                <View style={styles.screenBorder}>
                    <View style={styles.screen}>
                        <Image source={require('../assets/PokeBall.png')} style={styles.pokeballTopLeft} resizeMode="contain" />
                        
                        <View style={styles.titleWrapper}>
                            <Text style={styles.titulo}>POKEFINDER</Text>
                            <View style={styles.titleUnderline} />
                        </View>
                        <Image source={require('../assets/JoyEnfermera.png')} style={styles.backgroundImage} resizeMode="contain" />
                        {!loading && !error && text.length === 0 && (
                            <View style={styles.bienvenidaContainer}>
                                <Text style={styles.bienvenidaTitulo}>Bienvenido a Pokefinder!</Text>
                                <Text style={styles.bienvenidaSubtexto}>Busca tu Pokemon favorito...</Text>
                            </View>
                        )}
                        <SearchBar text={text} onChangeText={onChangeText} limpiarBusqueda={limpiarBusqueda} />
                        {loading && <Text style={styles.mensaje}>Cargando...</Text>}
                        {error && <Text style={styles.mensaje}>{error}</Text>}
                        {!loading && !error && pokemon && pokemon.length === 0 && text.length >= 3 && 
                            <Text style={styles.mensaje}>No se encontraron Pokémon</Text>
                        }
                        <ResultsList pokemon={pokemon} navigation={navigation} />
                        
                        <Image source={require('../assets/PokeBall.png')} style={styles.pokeballBottomLeft} resizeMode="contain" />

                        <Image source={require('../assets/PokeBall.png')} style={styles.pokeballBottomRight} resizeMode="contain" />
                    </View>
                </View>
            </View>

            <View style={styles.footerContainer}>
                <View style={styles.footerBar} />
                <View style={styles.footerDot} />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    deviceBody: {
        flex: 1,
        backgroundColor: '#CC0000',
        paddingTop: 20,
        paddingHorizontal: 16,
        paddingBottom: 16,
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 4,
        paddingVertical: 6,
        backgroundColor: '#B80000',
        borderRadius: 8,
        marginBottom: 8,
        borderWidth: 1,
        borderColor: '#8A0000',
    },
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    mainButton: {
        width: 28,
        height: 28,
        backgroundColor: '#3A7BD5',
        borderWidth: 2,
        borderColor: '#FFFFFF',
        borderRadius: 4,
        marginRight: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        elevation: 2,
    },
    mediumButton: {
        width: 16,
        height: 16,
        backgroundColor: '#FFD700',
        borderWidth: 2,
        borderColor: '#D4A800',
        borderRadius: 2,
        marginRight: 6,
    },
    smallButton: {
        width: 12,
        height: 12,
        backgroundColor: '#888888',
        borderWidth: 2,
        borderColor: '#555555',
        borderRadius: 2,
        marginRight: 6,
    },
    headerRight: {
        flex: 1,
        alignItems: 'flex-end',
    },
    lightBar: {
        width: 60,
        height: 6,
        backgroundColor: '#FFFFFF40',
        borderRadius: 3,
        marginBottom: 3,
    },
    lightBarSmall: {
        width: 30,
        height: 4,
        backgroundColor: '#FFFFFF30',
        borderRadius: 2,
    },
    screenWrapper: {
        flex: 1,
        borderWidth: 5,
        borderColor: '#1A1A1A',
        borderRadius: 16,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.5,
        shadowRadius: 8,
        elevation: 10,
    },
    screenBorder: {
        flex: 1,
        backgroundColor: '#2A2A2A',
        padding: 4,
    },
    screen: {
        flex: 1,
        backgroundColor: '#F0F0F0',
        alignItems: 'center',
        paddingTop: 16,
        paddingHorizontal: 16,
        position: 'relative',
        overflow: 'hidden',
        borderRadius: 8,
    },
    titleWrapper: {
        alignItems: 'center',
        marginBottom: 2,
        zIndex: 2,
    },
    titulo: {
        fontFamily: fonts.pixel,
        fontSize: 18,
        color: '#CC0000',
        letterSpacing: 2,
        textShadowColor: '#00000030',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
    },
    titleUnderline: {
        width: 80,
        height: 3,
        backgroundColor: '#CC0000',
        borderRadius: 2,
        marginTop: 2,
        opacity: 0.5,
    },
    backgroundImage: {
        width: 180,
        height: 180,
        opacity: 1,
        marginBottom: 2,
        zIndex: 1,
    },
    pokeballTopLeft: {
        position: 'absolute',
        top: 10,
        left: 10,
        width: 40,
        height: 40,
        opacity: 0.20,
        zIndex: 0,
    },
    pokeballBottomLeft: {
        position: 'absolute',
        bottom: -45,
        left: -45,
        width: 170,
        height: 170,
        opacity: 0.25,
        zIndex: 0,
        transform: [{ scaleX: 1 }],
    },
    pokeballBottomRight: {
        position: 'absolute',
        bottom: -45,
        right: -45,
        width: 170,
        height: 170,
        opacity: 0.25,
        zIndex: 0,
        transform: [{ scaleX: -1 }],
    },
    bienvenidaContainer: {
        alignItems: 'center',
        zIndex: 2,
        marginTop: 2,
        marginBottom: 8,
    },
    bienvenidaTitulo: {
        fontFamily: fonts.pixel,
        fontSize: 13,
        color: '#CC0000',
        textAlign: 'center',
        marginBottom: 4,
    },
    bienvenidaSubtexto: {
        fontFamily: fonts.pixel,
        fontSize: 9,
        color: '#666666',
        textAlign: 'center',
    },
    mensaje: {
        marginTop: 12,
        color: '#666666',
        zIndex: 2,
        fontFamily: fonts.pixel,
        fontSize: 10,
    },
    footerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 8,
        paddingHorizontal: 8,
    },
    footerBar: {
        flex: 1,
        height: 4,
        backgroundColor: '#FFFFFF30',
        borderRadius: 2,
        marginRight: 12,
    },
    footerDot: {
        width: 12,
        height: 12,
        backgroundColor: '#3A7BD5',
        borderRadius: 6,
        borderWidth: 2,
        borderColor: '#FFFFFF',
    },
});

export default SearchScreen;