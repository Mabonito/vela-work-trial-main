import "./globals.css";
import { Archivo } from "next/font/google";
import { Toaster } from "react-hot-toast";

import { VelaThemeProvider } from "./components/providers/theme";
import AuthProvider from "./components/providers/auth";


export const metadata = {
  title: "Vela Call Centre Platform",
  description: "Botlhale AI call centre analytics platform",
};

const archivo = Archivo({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <AuthProvider>
        <body
          className={`text-vela-text-color bg-vela-background ${archivo.className}`}
        >
          <VelaThemeProvider>
            {children}
            <Toaster
              position="top-center"
              toastOptions={{ duration: 5000 }}
            />

          </VelaThemeProvider>
        </body>
      </AuthProvider>
    </html>
  );
}
