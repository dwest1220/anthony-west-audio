import { AuthProvider } from "@/context/AuthContext";
import "./globals.css";
import Footer from "@/components/footer/footer";
import Header from "@/components/header/header";

// WHERE TO ADD NAVBAR & FOOTER

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <Header />
          {children}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
