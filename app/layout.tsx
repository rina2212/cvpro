import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de">
      <body>
        <header className="header">
          <div className="container">
            <strong className="logo">CVPro</strong>
          </div>
        </header>

        <main className="container">{children}</main>

        <footer className="footer">
          <div className="container">
            <span>© {new Date().getFullYear()} CVPro</span>
          </div>
        </footer>
      </body>
    </html>
  );
}
