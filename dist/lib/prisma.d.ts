import { PrismaClient } from "@prisma/client";
export declare const prisma: PrismaClient<{
    log: ("error" | "query" | "warn")[];
}, "error" | "query" | "warn", import("@prisma/client/runtime/library").DefaultArgs>;
export declare const disconnectPrisma: () => Promise<void>;
export declare const checkDatabaseConnection: () => Promise<boolean>;
//# sourceMappingURL=prisma.d.ts.map