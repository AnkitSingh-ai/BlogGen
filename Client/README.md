# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Deploying on Vercel

This project is a Vite frontend in `Client/`. Deploy that folder as the Vercel root directory.

Set this environment variable in Vercel so the UI can reach the backend API:

- `VITE_BASE_URL` - the public URL of the deployed server, for example `https://your-backend.example.com`

The backend in `Server/` is an Express app and should be deployed separately on a Node host such as Render, Railway, Fly.io, or a VPS. Vercel should host the UI only unless the server is refactored into serverless functions.
