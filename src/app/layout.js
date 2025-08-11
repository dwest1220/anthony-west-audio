import { AuthProvider } from "@/context/AuthContext";
import "./globals.css";
import Footer from "@/components/footer/footer";

// WHERE TO ADD NAVBAR & FOOTER

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          {children}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
