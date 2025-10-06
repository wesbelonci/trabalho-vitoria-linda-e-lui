import type { Request, Response, NextFunction } from "express";
import { z, ZodError } from "zod";

// Tipo para os diferentes tipos de validação
type ValidationType = "body" | "params" | "query";

// Interface para o request tipado
export interface TypedRequest<T = any> extends Request {
  validatedData?: T;
}

// Middleware de validação genérico
export const validate = (
  schema: z.ZodSchema,
  type: ValidationType = "body"
) => {
  return (req: TypedRequest, res: Response, next: NextFunction) => {
    try {
      let dataToValidate;

      switch (type) {
        case "body":
          dataToValidate = req.body;
          break;
        case "params":
          dataToValidate = req.params;
          break;
        case "query":
          dataToValidate = req.query;
          break;
        default:
          dataToValidate = req.body;
      }

      const validatedData = schema.parse(dataToValidate);
      req.validatedData = validatedData;
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessages = error.issues.map((err) => ({
          field: err.path.join("."),
          message: err.message,
          code: err.code,
        }));

        return res.status(400).json({
          success: false,
          message: "Dados de entrada inválidos",
          errors: errorMessages,
        });
      }

      // Erro inesperado
      console.error("Erro de validação:", error);
      return res.status(500).json({
        success: false,
        message: "Erro interno do servidor",
      });
    }
  };
};

// Middleware específico para validação de body
export const validateBody = (schema: z.ZodSchema) => validate(schema, "body");

// Middleware específico para validação de params
export const validateParams = (schema: z.ZodSchema) =>
  validate(schema, "params");

// Middleware específico para validação de query
export const validateQuery = (schema: z.ZodSchema) => validate(schema, "query");

// Helper para extrair dados validados do request
export const getValidatedData = <T>(req: TypedRequest): T => {
  return req.validatedData as T;
};
