# Jantinha do Rogerio

Cardapio digital mobile-first com painel administrativo, sem pedidos ou pagamentos.

## Desenvolvimento

1. Instale Node.js 20+.
2. Rode `npm install`.
3. Copie `.env.example` para `.env` e preencha segredo de sessao, Cloudinary e admin.
4. Rode `npm run db:migrate -- --name init` (a migracao tambem executa o seed).
5. Rode `npm run dev` e acesse `http://localhost:3000` ou `http://localhost:3000/admin/login`.

O desenvolvimento local usa SQLite em `prisma/dev.db`, portanto nao exige a instalacao do PostgreSQL.

No Cloudinary, crie uma conta, copie cloud name, API key e API secret para o ambiente. Na Vercel, configure as mesmas variaveis e use um PostgreSQL acessivel pela internet; o build executa apenas a geracao do Prisma Client. Antes de publicar, adicione a logo oficial em `public/logo-jantinha-rogerio.png`.
