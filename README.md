This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Environment variables

Copy the template and set values for your environment:

```bash
cp .env.example .env.local
```

| Variable | Required | Description |
| --- | --- | --- |
| `NEXT_PUBLIC_BACKEND_URL` | Yes (for Aomi chat) | Aomi API base URL. Use `https://api.aomi.dev` in production, or `http://localhost:8080` when running a local Aomi backend. |
| `OPENROUTER_API_KEY` | For OpenRouter-backed models | Server-only secret (`sk-or-...`). Never use the `NEXT_PUBLIC_` prefix. |
| `NEXT_PUBLIC_CHAIN_ID` | For wallet UI | EVM chain id (e.g. `8453` for Base). |
| `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` | For WalletConnect | Project id from [WalletConnect Cloud](https://cloud.walletconnect.com). |

`.env.local` is gitignored. For Vercel (or other hosts), add the same variables in the project’s **Environment Variables** settings so they are available at **build** time (`NEXT_PUBLIC_*` is inlined by Next.js).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
