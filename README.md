# 🎭 Projeto Playwright — Automação de Testes Web e API

[![Testes Playwright](https://github.com/lafaietemachado/Projeto_Playwright/actions/workflows/playwright.yml/badge.svg)](https://github.com/lafaietemachado/Projeto_Playwright/actions/workflows/playwright.yml)

Projeto de portfólio de automação de testes com **Playwright + TypeScript**, cobrindo **testes de interface (E2E)** e **testes de API REST**, com execução contínua no **GitHub Actions**.

Autor: **Lafaiete Rodrigues Machado** — QA Engineer · [LinkedIn](https://www.linkedin.com/in/lafaietemachado)

---

## 🧰 Tecnologias

- [Playwright](https://playwright.dev/) com `@playwright/test`
- TypeScript
- Page Object Model (POM) + fixtures customizadas
- GitHub Actions (CI) com relatório HTML

## 🎯 Aplicações testadas

| Tipo | Aplicação | Descrição |
|------|-----------|-----------|
| Web  | [SauceDemo](https://www.saucedemo.com) | Loja virtual de demonstração criada para treino de automação |
| API  | [Restful-Booker](https://restful-booker.herokuapp.com/apidoc/index.html) | API REST pública de reservas de hotel |

## ✅ Cenários automatizados (15 testes)

### Web — SauceDemo
**Login**
- Login com usuário válido
- Bloqueio de usuário bloqueado
- Erro com credenciais inválidas
- Validação de campo obrigatório (usuário)

**Produtos e carrinho**
- Adicionar produtos e validar o contador do carrinho
- Remover produto do carrinho
- Listar no carrinho os produtos adicionados
- Ordenar produtos por preço (menor → maior)

**Checkout**
- Compra completa de ponta a ponta (E2E)
- Validação de campo obrigatório no formulário

### API — Restful-Booker
- Health check da API
- Geração de token de autenticação
- Recusa de autenticação com credenciais inválidas
- **CRUD completo** de reserva: criar → consultar → atualizar (PATCH) → excluir → confirmar exclusão
- Bloqueio de exclusão sem token (segurança / autorização)

## 📁 Estrutura do projeto

```
├── .github/workflows/playwright.yml   # Pipeline de CI
├── data/usuarios.ts                   # Massa de dados
├── fixtures/paginas.ts                # Fixtures customizadas (Page Objects prontos e login)
├── pages/                             # Page Objects
│   ├── LoginPage.ts
│   ├── ProdutosPage.ts
│   ├── CarrinhoPage.ts
│   └── CheckoutPage.ts
├── tests/
│   ├── web/                           # Testes de interface
│   └── api/                           # Testes de API
└── playwright.config.ts               # Projetos "web" e "api", relatórios, evidências
```

## ▶️ Como executar

Pré-requisito: [Node.js](https://nodejs.org/) 18 ou superior.

```bash
# 1. Clonar o repositório
git clone https://github.com/lafaietemachado/Projeto_Playwright.git
cd Projeto_Playwright

# 2. Instalar dependências e o navegador
npm install
npx playwright install chromium

# 3. Executar os testes
npm test              # todos os testes
npm run test:web      # apenas Web
npm run test:api      # apenas API
npm run test:headed   # Web com o navegador visível
npm run test:ui       # modo interativo (UI Mode)

# 4. Abrir o relatório HTML
npm run report
```

## 📊 Evidências e relatório

- Em caso de falha, o Playwright guarda automaticamente **screenshot, vídeo e trace** do teste.
- A cada push, o GitHub Actions executa a suíte e publica o **relatório HTML** como artefato (aba *Actions* → execução → *relatorio-playwright*).

## 💡 Boas práticas aplicadas

- Seletores estáveis via `data-test` (`getByTestId`), sem XPath frágil
- Page Objects para isolar a interface dos cenários
- Fixtures customizadas, incluindo uma fixture `logado` que reaproveita o login
- Testes independentes e executados em paralelo
- Separação clara entre testes Web e API por projetos do Playwright
- Validação de tipagem (TypeScript) no pipeline antes dos testes
