export async function buscarVariosPokemon(nombreOId) {
    if (!isNaN(nombreOId)) {
        try {
            const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${nombreOId}`);
            if (!res.ok) {
                if (res.status === 404) {
                    throw new Error("No se encontraron Pokémon");
                } else {
                    throw new Error("Error del servidor, inténtelo más tarde");

                }
            }
            const data = await res.json();
            return [data];
        } catch (error) {
            if (error.message.includes("fetch")) {
                throw new Error("Sin conexión a internet. Verifica tu red");
            }
            throw error;
        }
    }
    let lista;
    try {
        const respuesta = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=1025`);
        if (!respuesta.ok) {
            throw new Error("Error del servidor, inténtelo más tarde");
        }
        lista = await respuesta.json();
    } catch (error) {
        if (error.message.includes("fetch")) {
            throw new Error("Sin conexión a internet. Verifica tu red");
        }
        throw error;
    }
    const filtrados = lista.results.filter(
        p => p.name.includes(nombreOId.trim().toLowerCase())
    );
    if (filtrados.length === 0) {
        throw new Error("No se encontraeon Pokémon");

    }
    const detalles = await Promise.all(filtrados.slice(0, 10).map(async (p) => {
        const res = await fetch(p.url);
        return res.json();
    }));
    return detalles;

}
export async function obtenerDescripcionPokemon(id) {
    try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
        const data = await res.json();


        const descripcion = data.flavor_text_entries.find(
            entry => entry.language.name === 'es'
        );
        return descripcion ? descripcion.flavor_text : "Sin descripción disponible"
    } catch {
        return 'Sin descripción disponible';
    }
}
export async function obtenerDebilidadesPokemon(id) {
    try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const data = await res.json();
        const tiposPokemon = data.types.map(t => t.type.name);
        const debilidadesSet = new Set();
        for (const tipo of tiposPokemon) {
            const resTipo = await fetch(`https://pokeapi.co/api/v2/type/${tipo}`);
            const dataTipo = await resTipo.json();
            const debilidades = dataTipo.damage_relations.double_damage_from;
            debilidades.forEach(d => { debilidadesSet.add(d.name) });
        }
        return Array.from(debilidadesSet);
    } catch (error) {
        return []
    }
}