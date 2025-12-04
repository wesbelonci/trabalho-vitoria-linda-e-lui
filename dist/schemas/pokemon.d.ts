import { z } from "zod";
export declare const createPokemonSchema: z.ZodObject<{
    name: z.ZodString;
    height: z.ZodOptional<z.ZodNumber>;
    weight: z.ZodOptional<z.ZodNumber>;
    description: z.ZodOptional<z.ZodString>;
    imageUrl: z.ZodOptional<z.ZodString>;
    baseHp: z.ZodDefault<z.ZodNumber>;
    baseAttack: z.ZodDefault<z.ZodNumber>;
    baseDefense: z.ZodDefault<z.ZodNumber>;
    baseSpeed: z.ZodDefault<z.ZodNumber>;
    primaryTypeId: z.ZodString;
    secondaryTypeId: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const updatePokemonSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    height: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    weight: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    description: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    imageUrl: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    baseHp: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
    baseAttack: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
    baseDefense: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
    baseSpeed: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
    primaryTypeId: z.ZodOptional<z.ZodString>;
    secondaryTypeId: z.ZodOptional<z.ZodOptional<z.ZodString>>;
}, z.core.$strip>;
export declare const pokemonParamsSchema: z.ZodObject<{
    id: z.ZodString;
}, z.core.$strip>;
export declare const pokemonQuerySchema: z.ZodObject<{
    page: z.ZodPipe<z.ZodPipe<z.ZodOptional<z.ZodString>, z.ZodTransform<number, string | undefined>>, z.ZodNumber>;
    limit: z.ZodPipe<z.ZodPipe<z.ZodOptional<z.ZodString>, z.ZodTransform<number, string | undefined>>, z.ZodNumber>;
    search: z.ZodOptional<z.ZodString>;
    typeId: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export type CreatePokemonInput = z.infer<typeof createPokemonSchema>;
export type UpdatePokemonInput = z.infer<typeof updatePokemonSchema>;
export type PokemonParams = z.infer<typeof pokemonParamsSchema>;
export type PokemonQuery = z.infer<typeof pokemonQuerySchema>;
//# sourceMappingURL=pokemon.d.ts.map