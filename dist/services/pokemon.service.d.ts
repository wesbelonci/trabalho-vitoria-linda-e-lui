import type { CreatePokemonInput, UpdatePokemonInput, PokemonQuery } from "../schemas/pokemon.js";
export declare class PokemonService {
    static findMany(filters?: Partial<PokemonQuery>): Promise<{
        data: ({
            PokemonType: ({
                type: {
                    name: string;
                    description: string | null;
                    id: number;
                    createdAt: Date;
                    updatedAt: Date;
                    color: string | null;
                };
            } & {
                id: number;
                typeId: number;
                createdAt: Date;
                pokemonId: number;
            })[];
        } & {
            name: string;
            height: number | null;
            weight: number | null;
            description: string | null;
            imageUrl: string | null;
            baseHp: number;
            baseAttack: number;
            baseDefense: number;
            baseSpeed: number;
            id: number;
            createdAt: Date;
            updatedAt: Date;
        })[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        };
    }>;
    static findById(id: number): Promise<{
        PokemonType: ({
            type: {
                name: string;
                description: string | null;
                id: number;
                createdAt: Date;
                updatedAt: Date;
                color: string | null;
            };
        } & {
            id: number;
            typeId: number;
            createdAt: Date;
            pokemonId: number;
        })[];
    } & {
        name: string;
        height: number | null;
        weight: number | null;
        description: string | null;
        imageUrl: string | null;
        baseHp: number;
        baseAttack: number;
        baseDefense: number;
        baseSpeed: number;
        id: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    static create(data: CreatePokemonInput): Promise<{
        PokemonType: ({
            type: {
                name: string;
                description: string | null;
                id: number;
                createdAt: Date;
                updatedAt: Date;
                color: string | null;
            };
        } & {
            id: number;
            typeId: number;
            createdAt: Date;
            pokemonId: number;
        })[];
    } & {
        name: string;
        height: number | null;
        weight: number | null;
        description: string | null;
        imageUrl: string | null;
        baseHp: number;
        baseAttack: number;
        baseDefense: number;
        baseSpeed: number;
        id: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    static update(id: number, data: UpdatePokemonInput): Promise<{
        PokemonType: ({
            type: {
                name: string;
                description: string | null;
                id: number;
                createdAt: Date;
                updatedAt: Date;
                color: string | null;
            };
        } & {
            id: number;
            typeId: number;
            createdAt: Date;
            pokemonId: number;
        })[];
    } & {
        name: string;
        height: number | null;
        weight: number | null;
        description: string | null;
        imageUrl: string | null;
        baseHp: number;
        baseAttack: number;
        baseDefense: number;
        baseSpeed: number;
        id: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    static delete(id: number): Promise<{
        message: string;
    }>;
    static addType(pokemonId: number, typeId: number): Promise<{
        type: {
            name: string;
            description: string | null;
            id: number;
            createdAt: Date;
            updatedAt: Date;
            color: string | null;
        };
    } & {
        id: number;
        typeId: number;
        createdAt: Date;
        pokemonId: number;
    }>;
    static removeType(pokemonId: number, typeId: number): Promise<{
        message: string;
    }>;
}
//# sourceMappingURL=pokemon.service.d.ts.map