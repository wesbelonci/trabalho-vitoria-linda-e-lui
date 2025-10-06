import express from "express";
import swaggerUi from "swagger-ui-express";
import routes from "./routes/index.js";
import { checkDatabaseConnection, disconnectPrisma } from "./lib/prisma.js";
import swaggerSpec from "./config/swagger.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuração do Swagger
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    explorer: true,
    customCss: `
    .swagger-ui .topbar { display: none; }
    .swagger-ui .info { margin: 20px 0; }
    .swagger-ui .info .title { color: #3b4151; font-size: 36px; }
  `,
    customSiteTitle: "Pokémon API Documentation",
    customfavIcon: "/favicon.ico",
    swaggerOptions: {
      persistAuthorization: true,
      displayRequestDuration: true,
      docExpansion: "list",
      filter: true,
      showExtensions: true,
      showCommonExtensions: true,
    },
  })
);

// Endpoint para o spec JSON
app.get("/api-docs.json", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerSpec);
});

app.use(routes);

async function startServer() {
  try {
    const dbConnected = await checkDatabaseConnection();

    if (!dbConnected) {
      console.error(
        "❌ Falha ao conectar com o banco de dados. Verifique sua configuração."
      );
      process.exit(1);
    }

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
      console.log(`📚 Documentação Swagger: http://localhost:${PORT}/api-docs`);
      console.log(`📊 Endpoints disponíveis:`);
      console.log(`   GET    /pokemon - Listar pokémons`);
      console.log(`   GET    /pokemon/:id - Buscar pokémon por ID`);
      console.log(`   POST   /pokemon - Criar novo pokémon`);
      console.log(`   PUT    /pokemon/:id - Atualizar pokémon`);
      console.log(`   DELETE /pokemon/:id - Deletar pokémon`);
    });
  } catch (error) {
    console.error("❌ Erro ao iniciar o servidor:", error);
    process.exit(1);
  }
}

// Graceful shutdown
process.on("SIGINT", async () => {
  console.log("\n🛑 Encerrando servidor...");
  await disconnectPrisma();
  console.log("✅ Conexões fechadas. Servidor encerrado.");
  process.exit(0);
});

process.on("SIGTERM", async () => {
  console.log("\n🛑 Encerrando servidor...");
  await disconnectPrisma();
  console.log("✅ Conexões fechadas. Servidor encerrado.");
  process.exit(0);
});

// Iniciar o servidor
startServer();
