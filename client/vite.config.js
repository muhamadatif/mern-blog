import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig({
  // We add this proxy so that each time we hit /api we will be redirected to the target localhost
  // because the frontend and the backend doesn't run on the same server
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        //We use it because we do http and not https
        secure: false,
      },
    },
  },
  plugins: [react()],
});
