import { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import { colors, fonts } from '../styles/themes';
import { obtenerDescripcionPokemon, obtenerDebilidadesPokemon } from "../services/pokeApi";
import { Ionicons } from '@expo/vector-icons';

const DetailScreen = ({ route, navigation }) => {
    const { pokemon } = route.params;
    const [descripcion, setDescripcion] = useState('Cargando...');
    const [debilidades, setDebilidades] = useState([]);
    const tipoPrincipal = pokemon.types[0].type.name;
    const coloresPokemon = getPokemonColors(tipoPrincipal);

    useEffect(() => {
        async function getDescripcion() {
            const texto = await obtenerDescripcionPokemon(pokemon.id)
            setDescripcion(texto)

            const deb = await obtenerDebilidadesPokemon(pokemon.id);
            setDebilidades(deb);
        }
        getDescripcion()
    }, []);

    const numeroFormateado = String(pokemon.id).padStart(4, '0');
    const peso = (pokemon.weight / 10).toFixed(1);
    const altura = (pokemon.height / 10).toFixed(1);

    return (
        <>
            <View style={[styles.headerPersonalizado, { backgroundColor: coloresPokemon.fondo, borderBottomColor: coloresPokemon.borde }]}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.botonVolver}>
                    <Ionicons name="arrow-back" size={24} color={coloresPokemon.borde} />
                    <Text style={[styles.textoVolver, { color: coloresPokemon.borde }]}></Text>
                </TouchableOpacity>
                <Text style={[styles.tituloHeader, { color: coloresPokemon.texto }]}>{pokemon.name}</Text>
            </View>

            <ScrollView style={[styles.container, { backgroundColor: coloresPokemon.fondo }]}>
                <View style={[styles.card, {
                    backgroundColor: coloresPokemon.tarjeta,
                    borderColor: coloresPokemon.borde,
                    shadowColor: coloresPokemon.sombra,
                }]}>
                    <View style={styles.header}>
                        <Text style={[styles.nombre, { color: coloresPokemon.texto }]}>{pokemon.name}</Text>
                        <Text style={[styles.numero, { color: coloresPokemon.borde }]}>N.° {numeroFormateado}</Text>
                    </View>

                    <Image source={{ uri: pokemon.sprites.front_default }} style={styles.imagen} />
                    <Text style={styles.descripcion}>{descripcion}</Text>

                    <View style={styles.datosFisicos}>
                        <Text style={styles.datosTexto}>Altura: {altura} m</Text>
                        <Text style={styles.datosTexto}>Peso: {peso} kg</Text>
                    </View>

                    <View style={styles.seccion}>
                        <Text style={[styles.tituloSeccion, { color: coloresPokemon.borde }]}>Tipo</Text>
                        <View style={styles.tiposRow}>
                            {pokemon.types.map((item) => (
                                <View key={item.type.name} style={[styles.tipoBadge, { backgroundColor: getTypeColor(item.type.name) }]}>
                                    <Text style={styles.tipoTexto}>{item.type.name}</Text>
                                </View>
                            ))}
                        </View>
                    </View>

                    <View style={styles.seccion}>
                        <Text style={[styles.tituloSeccion, { color: coloresPokemon.borde }]}>Debilidad</Text>
                        <View style={styles.tiposRow}>
                            {debilidades.length > 0 ? (
                                debilidades.map((tipo) => (
                                    <View key={tipo} style={[styles.tipoBadge, { backgroundColor: getTypeColor(tipo) }]}>
                                        <Text style={styles.tipoTexto}>{tipo}</Text>
                                    </View>
                                ))
                            ) : (<Text style={styles.sinDatos}>Sin debilidades</Text>
                            )}
                        </View>
                    </View>

                    <View style={styles.seccion}>
                        <Text style={[styles.tituloSeccion, { color: coloresPokemon.borde }]}>Habilidades</Text>
                        <View style={styles.tiposRow}>
                            {pokemon.abilities.map((item) => (
                                <View key={item.ability.name} style={[styles.habilidadBadge, { backgroundColor: getHabilidadColor(item.ability.name)}]}>
                                    <Text style={styles.habilidadTexto}>{item.ability.name}</Text>
                                </View>
                            ))}
                        </View>
                    </View>

                    <View style={styles.seccion}>
                        <Text style={[styles.tituloSeccion, { color: coloresPokemon.borde }]}>Estadísticas</Text>
                        {pokemon.stats.map((item) => (
                            <View key={item.stat.name} style={styles.statRow}>
                                <Text style={styles.statNombre}>{item.stat.name}</Text>
                                <View style={styles.statBarra}>
                                    <View style={[styles.statRelleno, { width: `${(item.base_stat / 255) * 100}%` }]} />
                                </View>
                                <Text style={styles.statValor}>{item.base_stat}</Text>
                            </View>
                        ))}
                    </View>
                </View>
            </ScrollView>
        </>
    );
};
function getTypeColor(tipo) {
    const colores = {
        normal: '#A8A878',
        fire: '#F08030',
        water: '#6890F0',
        grass: '#78C850',
        electric: '#F8D030',
        psychic: '#F85888',
        ice: '#98D8D8',
        fighting: '#C03028',
        poison: '#A040A0',
        ground: '#E0C068',
        flying: '#A890F0',
        bug: '#A8B820',
        rock: '#B8A038',
        ghost: '#705898',
        dark: '#705848',
        dragon: '#7038F8',
        steel: '#B8B8D0',
        fairy: '#EE99AC',
    };
    return colores[tipo] || '#A8A878';
}

function getPokemonColors(tipo) {
    const colores = {
        normal: {
            fondo: '#E8E8D8',
            borde: '#A8A878',
            texto: '#4A4A3A',
            tarjeta: '#F8F8F0',
            sombra: '#A8A87840'
        },
        fire: {
            fondo: '#FFE0D0',
            borde: '#F08030',
            texto: '#8C3A10',
            tarjeta: '#FFF0E8',
            sombra: '#F0803040'
        },
        water: {
            fondo: '#D8E8FF',
            borde: '#6890F0',
            texto: '#1A3A7A',
            tarjeta: '#EEF4FF',
            sombra: '#6890F040'
        },
        grass: {
            fondo: '#D8F0D0',
            borde: '#78C850',
            texto: '#2A5A1A',
            tarjeta: '#F0F8E8',
            sombra: '#78C85040'
        },
        electric: {
            fondo: '#FFF8D0',
            borde: '#F8D030',
            texto: '#7A6A10',
            tarjeta: '#FFFCF0',
            sombra: '#F8D03040'
        },
        psychic: {
            fondo: '#FFE0E8',
            borde: '#F85888',
            texto: '#7A2A4A',
            tarjeta: '#FFF0F4',
            sombra: '#F8588840'
        },
        ice: {
            fondo: '#E0F5F5',
            borde: '#98D8D8',
            texto: '#2A6A6A',
            tarjeta: '#F0FAFA',
            sombra: '#98D8D840'
        },
        fighting: {
            fondo: '#F0D0D0',
            borde: '#C03028',
            texto: '#6A1810',
            tarjeta: '#F8E8E8',
            sombra: '#C0302840'
        },
        poison: {
            fondo: '#E8D8E8',
            borde: '#A040A0',
            texto: '#4A1A5A',
            tarjeta: '#F4EEF4',
            sombra: '#A040A040'
        },
        ground: {
            fondo: '#F0E8D0',
            borde: '#E0C068',
            texto: '#6A5A2A',
            tarjeta: '#F8F4E8',
            sombra: '#E0C06840'
        },
        flying: {
            fondo: '#E8E0F8',
            borde: '#A890F0',
            texto: '#4A3A7A',
            tarjeta: '#F2EEFA',
            sombra: '#A890F040'
        },
        bug: {
            fondo: '#E8F0D0',
            borde: '#A8B820',
            texto: '#4A5A10',
            tarjeta: '#F4F8E8',
            sombra: '#A8B82040'
        },
        rock: {
            fondo: '#F0E8D8',
            borde: '#B8A038',
            texto: '#5A4A18',
            tarjeta: '#F8F4E8',
            sombra: '#B8A03840'
        },
        ghost: {
            fondo: '#E0D8E8',
            borde: '#705898',
            texto: '#3A2A4A',
            tarjeta: '#F0ECF4',
            sombra: '#70589840'
        },
        dark: {
            fondo: '#D8D0C8',
            borde: '#705848',
            texto: '#3A2A1A',
            tarjeta: '#ECE8E0',
            sombra: '#70584840'
        },
        dragon: {
            fondo: '#E0D8F8',
            borde: '#7038F8',
            texto: '#3A1A7A',
            tarjeta: '#F0ECFC',
            sombra: '#7038F840'
        },
        steel: {
            fondo: '#E8E8F0',
            borde: '#B8B8D0',
            texto: '#4A4A5A',
            tarjeta: '#F4F4F8',
            sombra: '#B8B8D040'
        },
        fairy: {
            fondo: '#F8E0E8',
            borde: '#EE99AC',
            texto: '#7A4A5A',
            tarjeta: '#FCF0F4',
            sombra: '#EE99AC40'
        }
    };
    return colores[tipo] || colores.normal;
}
function getHabilidadColor(nombre) {
    const colores = {
        'blaze': '#F08030',        // Fuego
        'solar-power': '#F8D030',  // Amarillo
        'overgrow': '#78C850',     // Verde
        'torrent': '#6890F0',      // Agua
        'sand-veil': '#E0C068',    // Tierra
        'arena-trap': '#C8A060',   // Marrón
        'sand-force': '#D0B080',   // Arena
        'immunity': '#A8A878',     // Normal
        'thick-fat': '#A8A878',    // Normal
        'gluttony': '#A8A878',     // Normal
        'static': '#F8D030',       // Eléctrico
        'lightning-rod': '#F8D030',// Eléctrico
        'levitate': '#A890F0',     // Psíquico
        'pressure': '#705898',     // Fantasma
        'flash-fire': '#F08030',   // Fuego
        'water-absorb': '#6890F0', // Agua
        'chlorophyll': '#78C850',  // Planta
        'cute-charm': '#EE99AC',   // Hada
        'intimidate': '#705848',   // Oscuro
        'guts': '#C03028',         // Lucha
        'steadfast': '#C03028',    // Lucha
        'inner-focus': '#F85888',  // Psíquico
        'clear-body': '#B8B8D0',   // Acero
        'shield-dust': '#A8B820',  // Bicho
        'shed-skin': '#A8B820',    // Bicho
    };
    return colores[nombre.toLowerCase()] || '#A8A878';  // Normal por defecto
}

const styles = StyleSheet.create({
    headerPersonalizado: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingTop: 48,
        paddingBottom: 12,
        borderBottomWidth: 2,
    },
    botonVolver: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 16,
    },
    textoVolver: {
        fontFamily: fonts.pixel,
        fontSize: 12,
        marginLeft: 4,
    },
    tituloHeader: {
        fontFamily: fonts.pixel,
        fontSize: 16,
        textTransform: 'capitalize',
    },
    container: {
        flex: 1,
    },
    card: {
        margin: 16,
        padding: 20,
        borderRadius: 10,
        borderWidth: 3,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    nombre: {
        fontFamily: fonts.pixel,
        fontSize: 18,
        textTransform: 'capitalize'
    },
    numero: {
        fontFamily: fonts.pixel,
        fontSize: 14,
    },
    imagen: {
        width: 150,
        height: 150,
        alignSelf: 'center',
    },
    descripcion: {
        fontSize: 13,
        color: colors.back,
        marginVertical: 10,
        textAlign: 'center',
        lineHeight: 20,
    },
    datosFisicos: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 10,
        paddingVertical: 10,
        borderTopWidth: 2,
        borderBottomWidth: 2,
        borderColor: colors.text,
        width: '100%',
    },
    datosTexto: {
        fontFamily: fonts.pixel,
        fontSize: 11,
        color: colors.back,
    },
    seccion: {
        marginTop: 15,
    },
    tituloSeccion: {
        fontFamily: fonts.pixel,
        fontSize: 14,
        marginBottom: 8,
    },
    tiposRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    tipoBadge: {
        paddingHorizontal: 16,
        paddingVertical: 6,
        borderRadius: 20,
        marginRight: 8,
        marginBottom: 4,
        borderWidth: 2,
        borderColor: colors.back,
    },
    tipoTexto: {
        color: colors.back,
        fontSize: 12,
        textTransform: 'capitalize',
        fontFamily: fonts.pixel,
    },
    habilidadTexto: {
        fontSize: 14,
        color: colors.back,
        marginVertical: 2,
        textTransform: 'capitalize',
    },
    statRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 4,
        paddingHorizontal: 6,
    },
    statNombre: {
        fontSize: 10,
        width: 90,
        color: colors.text,
        textTransform: 'capitalize',
        fontFamily: fonts.pixel,
    },
    statBarra: {
        flex: 1,
        height: 8,
        backgroundColor: '#E0E0E0',
        borderRadius: 5,
        marginHorizontal: 8,
        borderWidth: 1,
        borderColor: colors.back,
        overflow: 'hidden',
    },
    statRelleno: {
        height: '100%',
        backgroundColor: colors.accent,
        borderRadius: 3,
    },
    statValor: {
        fontSize: 10,
        width: 40,
        textAlign: 'right',
        color: colors.back,
        fontFamily: fonts.pixel,
    },
    sinDatos: {
        fontFamily: fonts.pixel,
        fontSize: 10,
        color: colors.text,
    },
    habilidadBadge: {
        paddingHorizontal: 14,
        paddingVertical: 6,
        borderRadius: 20,
        marginRight: 8,
        marginBottom: 6,
        borderWidth: 2,
        borderColor: colors.back,
    },
    habilidadTexto: {
        color: colors.back,
        fontSize: 10,
        textTransform: 'capitalize',
        fontFamily: fonts.pixel,
    },
});

export default DetailScreen;