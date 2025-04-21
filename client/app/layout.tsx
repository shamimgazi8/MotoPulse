// app/layout.tsx
import { Inter } from "next/font/google";
import "./../styles/main.scss";
import AppProviders from "@/appstore/AppProviders";
import Script from "next/script"; // ✅ Import Script component

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Your App",
  description: "Your description",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <Script id="theme-script" strategy="beforeInteractive">
          {`
            (function() {
              try {
                var savedTheme = localStorage.getItem('theme');
                if (!savedTheme || savedTheme === 'dark') {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              } catch(e) {}
            })();
          `}
        </Script>
      </head>
      <body className={inter.className}>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
