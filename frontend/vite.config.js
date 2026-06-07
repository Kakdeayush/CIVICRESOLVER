import fs from "node:fs";
import { env } from "node:process";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const devCertificatePath = new URL("./certs/localhost.pfx", import.meta.url);
const devCertificatePassphrase = env.VITE_DEV_CERT_PASSPHRASE || "civicresolver-dev";
const hasDevCertificate = fs.existsSync(devCertificatePath);

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    https: hasDevCertificate
      ? {
          pfx: fs.readFileSync(devCertificatePath),
          passphrase: devCertificatePassphrase,
        }
      : undefined,
    proxy: {
      "/api": {
        target: "http://localhost:8080",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});




