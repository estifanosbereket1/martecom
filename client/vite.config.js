// import react from "@vitejs/plugin-react";
// import { defineConfig, loadEnv } from "vite";

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
// });
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    define: {
      "process.env": env,
    },
    plugins: [react()],
  };
});

// import { defineConfig, loadEnv } from "vite";
// import react from "@vitejs/plugin-react";
// import commonjs from "vite-plugin-commonjs"; // Import the commonjs plugin

// // https://vitejs.dev/config/
// export default defineConfig(({ mode }) => {
//   const env = loadEnv(mode, process.cwd(), "");
//   return {
//     define: {
//       "process.env": env,
//     },
//     plugins: [
//       react(),
//       commonjs(), // Add the CommonJS plugin
//     ],
//     build: {
//       sourcemap: true, // Enable source maps for better debugging
//     },
//     optimizeDeps: {
//       include: ["quill"], // Ensure quill is included
//     },
//   };
// });
