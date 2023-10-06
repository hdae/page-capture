import react from '@vitejs/plugin-react'
import { join } from 'path'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
    base: "/page-capture",
    plugins: [react()],
    resolve: {
        alias: {
            "@/": join(__dirname, "src", "/")
        }
    }
})
