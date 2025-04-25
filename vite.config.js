import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const repoName = '/cn-dashboard-app'

export default defineConfig({
  base: repoName,
  plugins: [
    react(),
    tailwindcss(),
  ],
})
