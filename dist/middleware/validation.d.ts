import type { Request, Response, NextFunction } from "express";
import { z } from "zod";
type ValidationType = "body" | "params" | "query";
export interface TypedRequest<T = any> extends Request {
    validatedData?: Partial<Record<ValidationType, unknown>>;
}
export declare const validate: (schema: z.ZodSchema, type?: ValidationType) => (req: TypedRequest, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
export declare const validateBody: (schema: z.ZodSchema) => (req: TypedRequest, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
export declare const validateParams: (schema: z.ZodSchema) => (req: TypedRequest, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
export declare const validateQuery: (schema: z.ZodSchema) => (req: TypedRequest, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
export declare const getValidatedData: <T>(req: TypedRequest, type?: ValidationType) => T;
export {};
//# sourceMappingURL=validation.d.ts.map