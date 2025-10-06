# 📚 Documentação da API Pokémon

Uma API RESTful completa para gerenciamento de Pokémons com validação robusta, documentação Swagger e operações CRUD.

## 🚀 Acesso Rápido

- **Servidor**: http://localhost:3000
- **Documentação Swagger**: http://localhost:3000/api-docs
- **Spec JSON**: http://localhost:3000/api-docs.json

## 📖 Documentação Interativa

A API possui documentação completa e interativa usando Swagger UI, onde você pode:

- ✅ Ver todos os endpoints disponíveis
- ✅ Testar as rotas diretamente na interface
- ✅ Ver exemplos de requisições e respostas
- ✅ Entender os schemas de validação
- ✅ Visualizar códigos de erro e suas descrições

### Como usar a documentação:

1. **Inicie o servidor**: `pnpm dev`
2. **Acesse**: http://localhost:3000/api-docs
3. **Explore**: Clique nos endpoints para ver detalhes
4. **Teste**: Use o botão "Try it out" para fazer requisições

## 🛠️ Endpoints Disponíveis

### 📋 Listar Pokémons
```
GET /pokemon
```
- Suporte a paginação, busca e filtros
- Query params: `page`, `limit`, `search`, `typeId`

### 🎯 Buscar Pokémon por ID
```
GET /pokemon/{id}
```
- Retorna um pokémon específico com seus tipos

### ✨ Criar Novo Pokémon
```
POST /pokemon
```
- Validação completa com Zod
- Suporte a tipos primário e secundário

### 🔄 Atualizar Pokémon
```
PUT /pokemon/{id}
```
- Atualização parcial (todos os campos opcionais)
- Validação de regras de negócio

### 🗑️ Deletar Pokémon
```
DELETE /pokemon/{id}
```
- Remoção segura com validações

## 📊 Schemas de Dados

### Pokemon
```json
{
  "id": 1,
  "name": "Pikachu",
  "height": 0.4,
  "weight": 6.0,
  "description": "Um Pokémon do tipo Elétrico...",
  "imageUrl": "https://example.com/pikachu.png",
  "baseHp": 35,
  "baseAttack": 55,
  "baseDefense": 40,
  "baseSpeed": 90,
  "createdAt": "2023-10-06T10:30:00Z",
  "updatedAt": "2023-10-06T10:30:00Z",
  "PokemonType": [
    {
      "id": 1,
      "pokemonId": 1,
      "typeId": 4,
      "type": {
        "id": 4,
        "name": "Electric",
        "color": "#F8D030",
        "description": "Pokémons do tipo Elétrico"
      }
    }
  ]
}
```

### Resposta de Lista
```json
{
  "success": true,
  "message": "Lista de pokémons",
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 50,
    "totalPages": 5,
    "hasNext": true,
    "hasPrev": false
  }
}
```

## 🛡️ Validações Implementadas

### Campos Obrigatórios (POST)
- ✅ `name`: String (1-100 chars, apenas letras e espaços)
- ✅ `primaryTypeId`: String (ID numérico válido)

### Campos Opcionais
- ✅ `height`: Number (0-100m)
- ✅ `weight`: Number (0-10000kg)
- ✅ `description`: String (máx 1000 chars)
- ✅ `imageUrl`: URL válida
- ✅ `baseHp`, `baseAttack`, `baseDefense`, `baseSpeed`: Integer (1-255)
- ✅ `secondaryTypeId`: String (ID numérico válido)

### Regras de Negócio
- ✅ Nomes únicos por pokémon
- ✅ Validação de existência de tipos
- ✅ Máximo 2 tipos por pokémon
- ✅ Mínimo 1 tipo por pokémon

## 🔍 Filtros e Busca

### Paginação
```bash
GET /pokemon?page=1&limit=5
```

### Busca por Nome
```bash
GET /pokemon?search=pika
```

### Filtro por Tipo
```bash
GET /pokemon?typeId=4
```

### Combinando Filtros
```bash
GET /pokemon?page=1&limit=5&search=char&typeId=1
```

## ❌ Códigos de Erro

### 400 - Bad Request
- Dados de validação inválidos
- Regras de negócio violadas

### 404 - Not Found
- Pokémon não encontrado
- Recurso inexistente

### 500 - Internal Server Error
- Erro interno do servidor
- Falha na conexão com banco

## 🧪 Exemplos de Teste

### Criar Pokémon (Mínimo)
```json
{
  "name": "Ditto",
  "primaryTypeId": "18"
}
```

### Criar Pokémon (Completo)
```json
{
  "name": "Charizard",
  "height": 1.7,
  "weight": 90.5,
  "description": "Um poderoso Pokémon dragão",
  "baseHp": 78,
  "baseAttack": 84,
  "baseDefense": 78,
  "baseSpeed": 100,
  "primaryTypeId": "1",
  "secondaryTypeId": "12"
}
```

### Atualizar Pokémon
```json
{
  "description": "Descrição atualizada",
  "baseAttack": 60
}
```

## 🏗️ Tecnologias

- **Framework**: Express.js + TypeScript
- **Validação**: Zod
- **Banco**: PostgreSQL + Prisma ORM
- **Documentação**: Swagger/OpenAPI 3.0
- **Container**: Docker + docker-compose

## 📝 Notas Importantes

1. **IDs**: Sempre use strings numéricas ("1", "2", etc.)
2. **Tipos**: Referem-se à tabela `types` no banco
3. **Paginação**: Limite máximo de 100 itens por página
4. **Busca**: Case-insensitive e busca parcial no nome
5. **Validação**: Todos os endpoints têm validação robusta

## 🚀 Próximos Passos

- [ ] Autenticação e autorização
- [ ] Upload de imagens
- [ ] Endpoints para tipos
- [ ] Endpoints para movimentos
- [ ] Cache com Redis
- [ ] Rate limiting
- [ ] Logs estruturados
