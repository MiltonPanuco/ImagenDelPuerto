import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import { defineConfig } from "vite";
import { sanityContentUrl } from "./shared/cms";

const cmsApi = {
  name: "cms-api",
  configureServer(server: { middlewares: { use: (path: string, handler: (_req: unknown, res: { statusCode: number; setHeader: (name: string, value: string) => void; end: (body: string) => void }) => void) => void } }) {
    server.middlewares.use("/api/content", async (_req, res) => {
      try {
        const response = await fetch(sanityContentUrl());
        res.statusCode = response.status;
        res.setHeader("Content-Type", "application/json; charset=utf-8");
        res.end(await response.text());
      } catch {
        res.statusCode = 502;
        res.end(JSON.stringify({ error: "Contenido temporalmente no disponible." }));
      }
    });
  },
};

export default defineConfig({
  plugins: [react(), tailwindcss(), cmsApi],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
    },
  },
  envDir: path.resolve(import.meta.dirname),
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
  },
  server: {
    port: 3000,
    strictPort: false,
    host: true,
  },
});
