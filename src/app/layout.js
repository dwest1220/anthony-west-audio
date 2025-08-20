import { AuthProvider } from "@/context/AuthContext";
import "./globals.css";
import Footer from "@/components/footer/footer";
import Header from "@/components/header/header";


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <AuthProvider>
          <Header />
          {children}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
