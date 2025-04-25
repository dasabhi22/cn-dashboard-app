import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// change “dashboard-app” to your repo name (exactly how it appears in the URL)
const repoName = '/cn-dashboard-app/'

export default defineConfig({
  base: repoName,
  plugins: [
    react(),
    tailwindcss(),
  ],
})
