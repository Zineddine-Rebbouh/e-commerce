import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  images: {
    domains: [
      "localhost ",
      "firebasestorage.googleapis.com",
      "res.cloudinary.com",
      "images.unsplash.com",
      "lh3.googleusercontent.com",
      "www.istorebangladesh.com",
      "https://www.pinterest.com",
    ],
  },
})
