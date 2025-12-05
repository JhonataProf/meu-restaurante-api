## Inicio do projeto primeiras aulas
### Passo 1: Configuração do Projeto

1. **Crie uma pasta para o projeto** e navegue até ela no terminal:

```bash
mkdir meu-restaurante-api
cd meu-restaurante-api
mkdir -p src/modules/auth/application src/modules/auth/domain src/modules/auth/infra src/modules/auth/presentation src/modules/users/application src/modules/users/domain src/modules/users/infra src/modules/users/presentation src/shared/http src/shared/erros src/shared/logger src/shared/middlewaares
```

2. **Crie a seguinte estrutura de pastas e arquivos**:

```
├── .env
├── .env-exemplo
├── .gitignore
├── README.md
├── arvore_pastas.txt
├── jest-integration-config.js
├── jest-unit-config.ts
├── jest.config.ts
├── nodemon.json
├── package.json
├── src
│   ├── modules
│   │   ├── auth
│   │   │   ├── application
│   │   │   ├── domain
│   │   │   ├── infra
│   │   │   └── presentation
│   │   └── users
│   │       ├── application
│   │       ├── domain
│   │       ├── infra
│   │       └── presentation
│   └── shared
│       ├── erros
│       ├── http
│       ├── logger
│       └── middlewaares
├── tsconfig.build.json
├── tsconfig.json
├── tsconfig.spec.json
├── tsconfig.tsbuildinfo
└── yarn.lock
```

3. **Código dos arquivos base**:
#### arquivo .env-example 
```bash
# APP
NODE_ENV=development
PORT=3000
API_VERSION=v1
SWAGGER_ENABLED=true

# SECURITY
JWT_SECRET=ffddb3759aca70db2ee91963cee26082a8bf46903e37baf5624962f5e9035170
JWT_ACCESS_SECRET=ffddb3759aca70db2ee91963cee26082a8bf46903e37baf5624962f5e9035170
JWT_ACCESS_SECRET=sua_chave_secreta_para_access_token
JWT_EXPIRES_IN=15m
JWT_REFRESH_SECRET=sua_chave_secreta_para_refresh_token
JWT_REFRESH_EXPIRES_IN=7d
SALT=10
UPDATE_MODEL=true

# DB
DB_DIALECT=mysql
DB_HOST=0.0.0.0
DB_PORT=3306
DB_DATABASE=db_app
DB_USERNAME=user_app
DB_PASSWORD=Senha@123
DB_NAME=projeto_basico_com_crud_usuario
```
##### arquivo jest-integration-config.ts
```javascript
const config = require('./jest.config.ts')
config.testMatch = ['**/*.test.ts']
module.exports = config
```
##### arquivo jest-unit-config.ts
```javascript
const config = require("./jest.config.ts");
config.testMatch = ["**/*.spec.ts"];
config.transform = {
  "^.+\\.ts?$": ["ts-jest", { tsconfig: "<rootDir>/tsconfig.spec.json" }], // 👈 novo
};
module.exports = config;
```
##### arquivo jest.config.ts
```javascript
module.exports = {
  roots: ["<rootDir>/src", "<rootDir>/test"],
  collectCoverageFrom: [
    "<rootDir>/src/**/*.ts",
    "!<rootDir>/src/**/index.ts",
    "!<rootDir>/src/**/*protocols.ts",
  ],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  testEnvironment: "node",
  coverageDirectory: "<rootDir>/coverage",
  transform: {
    ".+\\.ts$": "ts-jest",
  },
};
```
##### arquivo nodemon.json
```json
{
  "watch": ["src"],
  "ext": "ts,json",
  "ignore": ["node_modules", "dist"],
  "exec": "node -r ts-node/register -r tsconfig-paths/register src/server.ts",
  "env": {
    "NODE_ENV": "development",
    "PORT": "3000"
  },
  "delay": "200"
}
```
##### arquivo package.json
```json
{
  "name": "base-api-crud-pi-senac-2025",
  "version": "1.0.0",
  "main": "index.js",
  "license": "MIT",
  "scripts": {
    "dev": "nodemon",
    "build:clean": "npm run clear:packages && npm run build",
    "clear:packages": "rimraf package-lock.json && rimraf dist && rimraf tsconfig.tsbuildinfo && rimraf node_modules &&npm install",
    "build": "NODE_ENV=production tsc -p tsconfig.json && tsc-alias -p tsconfig.json && npm run copy:swagger",
    "start": "node dist/server.js",
    "start:debug": "node --inspect dist/server.js",
    "typecheck": "tsc -p tsconfig.json --noEmit",
    "copy:swagger": "copyfiles -u 2 \"src/docs/**/*\" dist/docs",
    "test": "NODE_ENV=test jest --passWithNoTests --silent --noStackTrace --runInBand",
    "test:verbose": "NODE_ENV=test jest --passWithNoTests --runInBand",
    "test:clear": "npx jest --clearCache",
    "test:unit": "npm test -- --watch -c jest-unit-config.ts",
    "test:integration": "npm test -- --watch -c jest-integration-config.js",
    "test:staged": "npm test -- --findRelatedTests",
    "test:ci": "npm test -- --coverage"
  },
  "devDependencies": {
    "@types/bcrypt": "^5.0.2",
    "@types/dotenv": "^8.2.3",
    "@types/express": "^5.0.2",
    "@types/jest": "^29.5.13",
    "@types/jsonwebtoken": "^9.0.9",
    "@types/node": "^22.15.21",
    "@types/supertest": "^6.0.3",
    "@types/swagger-jsdoc": "^6.0.4",
    "@types/swagger-ui-express": "^4.1.8",
    "@types/yamljs": "^0.2.34",
    "copyfiles": "^2.4.1",
    "jest": "^29.7.0",
    "nodemon": "^3.1.10",
    "rimraf": "^6.0.1",
    "sqlite3": "^5.1.7",
    "supertest": "^7.1.4",
    "ts-jest": "^29.2.5",
    "ts-node": "^10.9.2",
    "tsc-alias": "^1.8.16",
    "tsconfig-paths": "^4.2.0",
    "typescript": "^5.8.3"
  },
  "dependencies": {
    "bcrypt": "^6.0.0",
    "dotenv": "^16.5.0",
    "express": "^5.1.0",
    "fast-glob": "^3.3.3",
    "jsonwebtoken": "^9.0.2",
    "module-alias": "^2.2.3",
    "mysql2": "^3.14.1",
    "sequelize": "^6.37.7",
    "swagger-jsdoc": "^6.2.8",
    "swagger-ui-express": "^5.0.1",
    "yaml": "^2.8.1",
    "yamljs": "^0.3.0",
    "zod": "^4.1.12"
  },
  "_moduleAliases": {
    "@": "dist"
  }
}
```
##### arquivo tsconfig.build.json
```json
{
  "extends": "./tsconfig.json",
  "exclude": ["node_modules", "test", "dist", "coverage", "**/*.test.ts", "**/*.spec.ts"]
}
```
##### arquivo tsconfig.json
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "CommonJS",
    "moduleResolution": "Node",
    "rootDir": "./src",
    "outDir": "./dist",
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    },

    "strict": true,
    "strictNullChecks": true,
    "noUncheckedIndexedAccess": true,

    "esModuleInterop": true,
    "resolveJsonModule": true,
    "skipLibCheck": true,
    "sourceMap": true,
    "incremental": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```
##### arquivo tsconfig.spec.json
```json
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "types": ["jest", "node"],
    "noEmit": true,
    "rootDir": "."
  },
  "include": ["src/**/*.ts", "test/**/*.ts"]
}
```
# meu-restaurante-api
