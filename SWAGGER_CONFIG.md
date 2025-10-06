# ⚙️ Configuração Avançada do Swagger

Este arquivo contém configurações avançadas e personalizações do Swagger para a API Pokémon.

## 🎨 Customizações Aplicadas

### Interface Visual
- **Título personalizado**: "Pokémon API Documentation"
- **Favicon personalizado**: `/favicon.ico`
- **CSS customizado**: Remoção da topbar do Swagger
- **Explorer ativo**: Permite busca nos endpoints

### Funcionalidades Habilitadas
- ✅ **Persistência de autorização**: Mantém tokens entre sessões
- ✅ **Duração de requisições**: Mostra tempo de resposta
- ✅ **Expansão de documentação**: Lista expandida por padrão
- ✅ **Filtro**: Permite buscar endpoints
- ✅ **Extensões**: Mostra extensões OpenAPI

## 📋 Schemas Documentados

### Principais Entidades
- **Pokemon**: Entidade principal com todos os campos
- **Type**: Tipos de pokémon (Fire, Water, etc.)
- **PokemonType**: Relação many-to-many entre Pokémon e Types

### Request/Response Schemas
- **CreatePokemonRequest**: Para criação (POST)
- **UpdatePokemonRequest**: Para atualização (PUT)
- **PokemonListResponse**: Lista paginada
- **ErrorResponse**: Respostas de erro padronizadas

### Utilitários
- **PaginationInfo**: Informações de paginação
- **SuccessResponse**: Resposta genérica de sucesso

## 🔗 Endpoints URLs

### Desenvolvimento
- **API**: http://localhost:3000
- **Docs**: http://localhost:3000/api-docs
- **Spec JSON**: http://localhost:3000/api-docs.json

### Produção (Configurado)
- **API**: https://vitoria-pokemon-api.com
- **Docs**: https://vitoria-pokemon-api.com/api-docs

## 📝 Exemplos Completos

### 1. Criar Pokémon - Dados Mínimos
```json
{
  "name": "Ditto",
  "primaryTypeId": "18"
}
```

### 2. Criar Pokémon - Completo
```json
{
  "name": "Dragonite",
  "height": 2.2,
  "weight": 210.0,
  "description": "Um Pokémon dragão gentil e poderoso.",
  "imageUrl": "https://pokemon-images.com/dragonite.png",
  "baseHp": 91,
  "baseAttack": 134,
  "baseDefense": 95,
  "baseSpeed": 80,
  "primaryTypeId": "7",
  "secondaryTypeId": "12"
}
```

### 3. Atualizar Pokémon - Parcial
```json
{
  "description": "Descrição atualizada com mais detalhes",
  "baseAttack": 140
}
```

## 🔍 Parâmetros de Query

### Paginação
- **page**: Número da página (padrão: 1)
- **limit**: Itens por página (padrão: 10, máx: 100)

### Filtros
- **search**: Busca parcial no nome (case-insensitive)
- **typeId**: Filtra por ID do tipo

### Exemplos de URLs
```
GET /pokemon?page=1&limit=5
GET /pokemon?search=pika
GET /pokemon?typeId=4
GET /pokemon?page=2&limit=20&search=dragon&typeId=7
```

## 📊 Respostas Padronizadas

### Sucesso (2xx)
```json
{
  "success": true,
  "message": "Operação realizada com sucesso",
  "data": { ... },
  "pagination": { ... } // Apenas em listas
}
```

### Erro de Validação (400)
```json
{
  "success": false,
  "message": "Dados de entrada inválidos",
  "errors": [
    {
      "field": "name",
      "message": "Nome é obrigatório",
      "code": "too_small"
    }
  ]
}
```

### Erro de Negócio (400)
```json
{
  "success": false,
  "message": "Já existe um pokémon com o nome \"Pikachu\""
}
```

### Não Encontrado (404)
```json
{
  "success": false,
  "message": "Pokémon não encontrado"
}
```

### Erro Interno (500)
```json
{
  "success": false,
  "message": "Erro interno do servidor"
}
```

## 🏷️ Tags Organizacionais

### Pokemon
- Operações CRUD de pokémons
- Validações e regras de negócio
- Relacionamentos com tipos

### Types (Futuro)
- Gerenciamento de tipos
- Cores e descrições
- Estatísticas por tipo

## 🔧 Validações Documentadas

### Campos Obrigatórios
| Campo | Tipo | Validação |
|-------|------|-----------|
| name | string | 1-100 chars, apenas letras e espaços |
| primaryTypeId | string | ID numérico válido |

### Campos Opcionais
| Campo | Tipo | Validação |
|-------|------|-----------|
| height | number | 0-100 (metros) |
| weight | number | 0-10000 (kg) |
| description | string | máx 1000 chars |
| imageUrl | string | URL válida |
| baseHp | integer | 1-255 |
| baseAttack | integer | 1-255 |
| baseDefense | integer | 1-255 |
| baseSpeed | integer | 1-255 |
| secondaryTypeId | string | ID numérico válido |

## 🚀 Features Avançadas

### 1. Try It Out
- Teste direto na interface
- Preenchimento automático de exemplos
- Validação em tempo real

### 2. Múltiplos Exemplos
- Dados mínimos vs completos
- Cenários de sucesso e erro
- Casos de uso reais

### 3. Documentação Rica
- Descrições detalhadas
- Códigos de erro explicados
- Padrões de resposta consistentes

### 4. Export/Import
- Spec JSON disponível
- Compatível com Postman
- Suporte a outras ferramentas

## 📱 Uso Mobile/Responsivo

O Swagger UI é responsivo e funciona bem em:
- ✅ Desktop (melhor experiência)
- ✅ Tablet (boa usabilidade)
- ✅ Mobile (funcional)

## 🔐 Segurança (Futuro)

### Autenticação Planejada
- JWT Tokens
- API Keys
- OAuth 2.0
- Rate Limiting

### Headers de Segurança
- CORS configurado
- Content-Type validation
- Input sanitization

## 🌍 Internacionalização

### Idiomas Suportados
- 🇧🇷 Português (padrão)
- 🇺🇸 Inglês (planejado)

### Mensagens Localizadas
- Erros de validação em português
- Descrições em português
- Exemplos com nomes brasileiros

## 📈 Métricas e Monitoramento

### Logs Disponíveis
- Tempo de resposta de cada endpoint
- Queries executadas no banco
- Erros de validação
- Conexões com banco

### Future Monitoring
- Analytics de uso da API
- Performance por endpoint
- Alertas de erro
- Dashboard de métricas
