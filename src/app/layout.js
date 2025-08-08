import { AuthProvider } from "@/context/AuthContext";
import "./globals.css";

// WHERE TO ADD NAVBAR & FOOTER

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
