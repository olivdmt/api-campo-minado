# API Campo Minado

Esta é uma API REST desenvolvida em Node.js para uma plataforma de apostas baseada no clássico jogo **Campo Minado**. O projeto permite o cadastro de usuários, gestão de saldo, e um sistema completo de partidas com recompensas progressivas.

## 🚀 Tecnologias Utilizadas

- **Node.js** (v24.15.0)
- **Express.js** - Framework web
- **PostgreSQL** - Banco de dados relacional
- **CORS** - Gerenciamento de acessos externos
- **Dotenv** - Variáveis de ambiente
- **Nodemon** - Ambiente de desenvolvimento

## 🏗️ Arquitetura do Projeto

O projeto segue uma estrutura organizada em camadas para garantir a separação de responsabilidades:

- **Controllers:** Gerenciam as requisições HTTP e as respostas.
- **Services:** Contêm as regras de negócio da aplicação.
- **Repositories:** Responsáveis pela comunicação direta com o banco de dados.
- **Routes:** Mapeamento dos endpoints da API.
- **Config:** Configurações globais (banco de dados).
- **Modules:** Modelagem das entidades.

## 📋 Regras de Negócio

### Usuários
- Validação rigorosa de senha (mínimo 8 caracteres, maiúscula, número e caractere especial).
- Controle de saldo (não permite valores negativos e limita a 2 casas decimais).
- Dashboard com estatísticas de vitórias, derrotas e valores movimentados.

### Sistema de Jogo
- Tabuleiro **5x5** gerado aleatoriamente.
- Um usuário só pode ter **uma partida em andamento** por vez.
- **Fórmula de Premiação:** `premio = valorApostado × (1 + (quantidadeDiamantes × 0.33))`.
- O jogador pode realizar o *cashout* a qualquer momento antes de encontrar uma bomba.

## ⚙️ Instalação e Execução

### 1. Clonar o repositório
```bash
git clone https://github.com/olivdmt/api-campo-minado.git
cd api-campo-minado
```

### 2. Instalar dependências
```bash
npm install
```

### 3. Configuração do Banco de Dados
Certifique-se de ter o PostgreSQL instalado. Execute o script contido no arquivo `api_campo_minado.sql` para criar as tabelas necessárias.

Configure o arquivo `.env` na raiz do projeto:
```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=api_campo_minado
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
PORT=3000
```

### 4. Executar a aplicação
Para desenvolvimento (com recarregamento automático):
```bash
npm run dev
```

Para produção:
```bash
npm start
```
A API estará disponível em `http://localhost:3000`.

## 🛣️ Endpoints Principais

### Autenticação
- `POST /auth/register`: Cadastro de novo usuário.
- `POST /auth/login`: Login no sistema.
- `PATCH /auth/reset-password`: Redefinição de senha.

### Perfil e Usuário
- `GET /users/{id}`: Dados do perfil.
- `GET /users/dashboard`: Estatísticas gerais.
- `PUT /users/{id}`: Adicionar saldo.
- `DELETE /users/{id}`: Excluir conta.

### Jogo
- `POST /games/start`: Iniciar nova partida.
- `POST /games/{gameId}/reveal`: Revelar posição (linha/coluna).
- `POST /games/{gameId}/cashout`: Sacar prêmio acumulado.

---

## 👥 Desenvolvedor
- Mateus Dayson de Oliveira

