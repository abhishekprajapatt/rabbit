import path from "path"
import dotenv from "dotenv";
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

dotenv.config();

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  define: {
    'process.env.BACKEND_URL':JSON.stringify(process.env.BACKEND_URL),
  },
})
