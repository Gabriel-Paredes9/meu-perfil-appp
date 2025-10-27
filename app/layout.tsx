import { NextAuthProvider } from "./providers"; // Importe o provider

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* Envolva o children com o provider */}
        <NextAuthProvider>{children}</NextAuthProvider>
      </body>
    </html>
  );
}