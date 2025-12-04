import { prisma } from "../lib/prisma.js";
export class PokemonService {
    // Listar pokémons com filtros e paginação
    static async findMany(filters = {}) {
        const { page = 1, limit = 10, search, typeId } = filters;
        const skip = (page - 1) * limit;
        // Construir where clause
        const where = {};
        if (search) {
            where.name = {
                contains: search,
                mode: "insensitive",
            };
        }
        if (typeId) {
            where.PokemonType = {
                some: {
                    typeId: parseInt(typeId),
                },
            };
        }
        const [pokemons, total] = await Promise.all([
            prisma.pokemon.findMany({
                where,
                include: {
                    PokemonType: {
                        include: {
                            type: true,
                        },
                    },
                },
                orderBy: {
                    id: "asc",
                },
                skip,
                take: limit,
            }),
            prisma.pokemon.count({ where }),
        ]);
        return {
            data: pokemons,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
                hasNext: page * limit < total,
                hasPrev: page > 1,
            },
        };
    }
    // Buscar pokémon por ID
    static async findById(id) {
        const pokemon = await prisma.pokemon.findUnique({
            where: { id },
            include: {
                PokemonType: {
                    include: {
                        type: true,
                    },
                },
            },
        });
        if (!pokemon) {
            throw new Error("Pokémon não encontrado");
        }
        return pokemon;
    }
    // Criar novo pokémon
    static async create(data) {
        // Verificar se já existe um pokémon com este nome
        const existingByName = await prisma.pokemon.findUnique({
            where: { name: data.name },
        });
        if (existingByName) {
            throw new Error(`Já existe um pokémon com o nome "${data.name}"`);
        }
        // Verificar se o tipo primário existe
        const primaryType = await prisma.type.findUnique({
            where: { id: parseInt(data.primaryTypeId) },
        });
        if (!primaryType) {
            throw new Error("Tipo primário não encontrado");
        }
        // Verificar tipo secundário se fornecido
        if (data.secondaryTypeId) {
            const secondaryType = await prisma.type.findUnique({
                where: { id: parseInt(data.secondaryTypeId) },
            });
            if (!secondaryType) {
                throw new Error("Tipo secundário não encontrado");
            }
        }
        // Usar transação para criar o pokémon e suas relações de tipo
        const pokemon = await prisma.$transaction(async (tx) => {
            // Criar o pokémon
            const newPokemon = await tx.pokemon.create({
                data: {
                    name: data.name,
                    height: data.height || null,
                    weight: data.weight || null,
                    description: data.description || null,
                    imageUrl: data.imageUrl || null,
                    baseHp: data.baseHp,
                    baseAttack: data.baseAttack,
                    baseDefense: data.baseDefense,
                    baseSpeed: data.baseSpeed,
                },
            });
            // Adicionar tipo primário
            await tx.pokemonType.create({
                data: {
                    pokemonId: newPokemon.id,
                    typeId: parseInt(data.primaryTypeId),
                },
            });
            // Adicionar tipo secundário se fornecido
            if (data.secondaryTypeId) {
                await tx.pokemonType.create({
                    data: {
                        pokemonId: newPokemon.id,
                        typeId: parseInt(data.secondaryTypeId),
                    },
                });
            }
            return newPokemon;
        });
        // Retornar o pokémon com tipos incluídos
        return this.findById(pokemon.id);
    }
    // Atualizar pokémon
    static async update(id, data) {
        // Verificar se o pokémon existe
        await this.findById(id);
        // Se está atualizando o nome, verificar se não existe outro com o mesmo nome
        if (data.name) {
            const existingByName = await prisma.pokemon.findUnique({
                where: { name: data.name },
            });
            if (existingByName && existingByName.id !== id) {
                throw new Error(`Já existe um pokémon com o nome "${data.name}"`);
            }
        }
        // Usar transação para atualizar pokémon e tipos
        const pokemon = await prisma.$transaction(async (tx) => {
            // Atualizar dados básicos do pokémon
            const updateData = {};
            if (data.name !== undefined)
                updateData.name = data.name;
            if (data.height !== undefined)
                updateData.height = data.height;
            if (data.weight !== undefined)
                updateData.weight = data.weight;
            if (data.description !== undefined)
                updateData.description = data.description;
            if (data.imageUrl !== undefined)
                updateData.imageUrl = data.imageUrl;
            if (data.baseHp !== undefined)
                updateData.baseHp = data.baseHp;
            if (data.baseAttack !== undefined)
                updateData.baseAttack = data.baseAttack;
            if (data.baseDefense !== undefined)
                updateData.baseDefense = data.baseDefense;
            if (data.baseSpeed !== undefined)
                updateData.baseSpeed = data.baseSpeed;
            const updatedPokemon = await tx.pokemon.update({
                where: { id },
                data: updateData,
            });
            // Atualizar tipos se fornecidos
            if (data.primaryTypeId || data.secondaryTypeId) {
                // Remover tipos existentes
                await tx.pokemonType.deleteMany({
                    where: { pokemonId: id },
                });
                // Verificar e adicionar tipo primário
                if (data.primaryTypeId) {
                    const primaryType = await tx.type.findUnique({
                        where: { id: parseInt(data.primaryTypeId) },
                    });
                    if (!primaryType) {
                        throw new Error("Tipo primário não encontrado");
                    }
                    await tx.pokemonType.create({
                        data: {
                            pokemonId: id,
                            typeId: parseInt(data.primaryTypeId),
                        },
                    });
                }
                // Verificar e adicionar tipo secundário
                if (data.secondaryTypeId) {
                    const secondaryType = await tx.type.findUnique({
                        where: { id: parseInt(data.secondaryTypeId) },
                    });
                    if (!secondaryType) {
                        throw new Error("Tipo secundário não encontrado");
                    }
                    await tx.pokemonType.create({
                        data: {
                            pokemonId: id,
                            typeId: parseInt(data.secondaryTypeId),
                        },
                    });
                }
            }
            return updatedPokemon;
        });
        // Retornar o pokémon atualizado com tipos incluídos
        return this.findById(pokemon.id);
    }
    // Deletar pokémon
    static async delete(id) {
        // Verificar se o pokémon existe
        await this.findById(id);
        await prisma.pokemon.delete({
            where: { id },
        });
        return { message: "Pokémon deletado com sucesso" };
    }
    // Adicionar tipo a um pokémon
    static async addType(pokemonId, typeId) {
        // Verificar se o pokémon existe
        await this.findById(pokemonId);
        // Verificar se o tipo existe
        const type = await prisma.type.findUnique({
            where: { id: typeId },
        });
        if (!type) {
            throw new Error("Tipo não encontrado");
        }
        // Verificar se a relação já existe
        const existingPokemonType = await prisma.pokemonType.findUnique({
            where: {
                pokemonId_typeId: {
                    pokemonId,
                    typeId,
                },
            },
        });
        if (existingPokemonType) {
            throw new Error("Este pokémon já possui este tipo");
        }
        // Verificar se já tem 2 tipos
        const existingTypes = await prisma.pokemonType.count({
            where: { pokemonId },
        });
        if (existingTypes >= 2) {
            throw new Error("Um pokémon pode ter no máximo 2 tipos");
        }
        return prisma.pokemonType.create({
            data: {
                pokemonId,
                typeId,
            },
            include: {
                type: true,
            },
        });
    }
    // Remover tipo de um pokémon
    static async removeType(pokemonId, typeId) {
        // Verificar se o pokémon existe
        await this.findById(pokemonId);
        // Verificar se tem pelo menos 2 tipos antes de remover
        const typeCount = await prisma.pokemonType.count({
            where: { pokemonId },
        });
        if (typeCount <= 1) {
            throw new Error("Um pokémon deve ter pelo menos 1 tipo");
        }
        const deletedType = await prisma.pokemonType.delete({
            where: {
                pokemonId_typeId: {
                    pokemonId,
                    typeId,
                },
            },
        });
        return { message: "Tipo removido do pokémon com sucesso" };
    }
}
//# sourceMappingURL=pokemon.service.js.map