# Stationery Front

Frontend do desafio técnico da papelaria, construído com React, TypeScript, Vite e Material UI.

## Versões utilizadas

- Node.js 24.19.0
- pnpm 11.19.0
- React 19.2.8
- TypeScript 6.0.3
- Vite 8.2.2
- Axios 1.20.0
- Material UI 9.4.0
- Material UI Icons 9.4.0
- React Router DOM 7.18.3
- Emotion React 11.14.0
- Emotion Styled 11.14.1

As versões instaladas estão registradas em `package.json` e `pnpm-lock.yaml`. O projeto usa `pnpm` para manter instalações reproduzíveis.

## Executando localmente

```powershell
pnpm install
Copy-Item .env.example .env
pnpm dev
```

A aplicação será executada por padrão em `http://localhost:5173`.

## Comandos disponíveis

```powershell
pnpm dev
pnpm build
pnpm lint
pnpm preview
```

## Configuração

A URL da API é fornecida pela variável `VITE_API_BASE_URL`. Use `.env.example` como referência e não versione o arquivo `.env` local.

## Produção na Vercel

No projeto do frontend na Vercel, configure a variável de produção:

```dotenv
VITE_API_BASE_URL=https://stationery-api.vercel.app/api
```

Depois de criar ou alterar uma variável `VITE_*`, faça um novo deployment, pois
o Vite incorpora seu valor durante o build.

O arquivo `vercel.json` redireciona rotas do React Router para `index.html`.
Assim, `/sales` e `/commissions` também funcionam quando acessadas ou atualizadas
diretamente no navegador.

## Organização planejada

A interface será organizada por funcionalidades (`sales` e `commissions`) e usará Atomic Design para componentes compartilhados. Componentes básicos como botões e campos serão usados diretamente do Material UI; componentes próprios serão criados apenas quando acrescentarem composição ou comportamento.
