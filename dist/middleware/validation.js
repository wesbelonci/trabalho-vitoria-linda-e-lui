import { z, ZodError } from "zod";
// Middleware de validação genérico
export const validate = (schema, type = "body") => {
    return (req, res, next) => {
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
            req.validatedData = {
                ...(req.validatedData ?? {}),
                [type]: validatedData,
            };
            next();
        }
        catch (error) {
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
export const validateBody = (schema) => validate(schema, "body");
// Middleware específico para validação de params
export const validateParams = (schema) => validate(schema, "params");
// Middleware específico para validação de query
export const validateQuery = (schema) => validate(schema, "query");
// Helper para extrair dados validados do request
export const getValidatedData = (req, type = "body") => {
    return req.validatedData?.[type];
};
//# sourceMappingURL=validation.js.map