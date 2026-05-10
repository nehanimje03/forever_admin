import AuthWrapper from "../../components/AuthWrapper/AuthWrapper";
import AdminSidebar from "../../components/sidebar/Sidebar";
import "./globals.css";
import Providers from "./Providers";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50">
        <Providers>
          <AuthWrapper>{children}</AuthWrapper>
        </Providers>
      </body>
    </html>
  );
}
