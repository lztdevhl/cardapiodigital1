# Configuração restante de produção

## PASSO 1 — Configurar `DATABASE_URL` na Vercel

Em **Vercel → Project → Settings → Environment Variables**, crie `DATABASE_URL` para o ambiente **Production** usando a connection string PostgreSQL fornecida pela integração Prisma Postgres (uma das variáveis criadas com prefixo `DATABASE_`). Não use a URL SQLite local e não envie o valor ao Git.

## PASSO 2 — Configurar `SESSION_SECRET`

Gere uma chave:

```bash
node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"
```

Cadastre o resultado como `SESSION_SECRET` no ambiente **Production** da Vercel.

## PASSO 3 — Configurar o administrador

Cadastre `ADMIN_EMAIL` e `ADMIN_PASSWORD` no ambiente **Production**. A senha deve ter pelo menos 12 caracteres. Essas variáveis são usadas pelo seed e não ficam no frontend.

## PASSO 4 — Configurar Cloudinary

Como o cadastro de produtos usa upload de fotos, cadastre no ambiente **Production**:

- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`

O secret é consumido somente no servidor.

## PASSO 5 — Aplicar migrations

Na raiz do projeto, instale a Vercel CLI, autentique e vincule o projeto. Depois valide o ambiente e aplique apenas as migrations pendentes usando as variáveis de Production diretamente em memória:

```bash
npm install -g vercel
vercel login
vercel link
vercel env run -e production -- npm run check:prod
vercel env run -e production -- npm run db:deploy
```

`prisma migrate deploy` não apaga nem recria o banco; ele aplica migrations pendentes. Nunca use `prisma migrate reset` ou `prisma db push --force-reset` em produção.

## PASSO 6 — Rodar o seed

```bash
vercel env run -e production -- npm run db:seed
```

O seed é idempotente: cria ou atualiza o administrador pelo e-mail e cria as configurações padrão somente se ainda não existirem. Ele não cria produtos ou categorias.

## PASSO 7 — Redeploy

Faça um novo deployment de Production pelo painel da Vercel ou envie a versão preparada para a branch de produção.

## PASSO 8 — Testar rotas

Verifique:

- `/`
- `/admin/login`
- `/admin/produtos`
- `/admin/categorias`

## PASSO 9 — Testar persistência real

Crie uma categoria e um produto com foto, preço e disponibilidade. Recarregue `/` e confirme que os dados e a imagem continuam disponíveis.
