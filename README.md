# Jantinha do Rogerio

Cardapio digital mobile-first com painel administrativo, sem pedidos ou pagamentos.

## Desenvolvimento

1. Instale Node.js 20+ e PostgreSQL.
2. Rode `npm install`.
3. Copie `.env.example` para `.env` e preencha banco, segredo de sessao, Cloudinary e admin.
4. Rode `npm run db:migrate -- --name init` e `npm run db:seed`.
5. Rode `npm run dev` e acesse `/` ou `/admin/login`.

No Cloudinary, crie uma conta, copie cloud name, API key e API secret para o ambiente. Na Vercel, configure as mesmas variaveis e use um PostgreSQL acessivel pela internet; o build executa apenas a geracao do Prisma Client. Antes de publicar, adicione a logo oficial em `public/logo-jantinha-rogerio.png`.
