// app/layout.tsx
import { Inter } from "next/font/google";
import "antd/dist/reset.css";
import "./../styles/main.scss";
import AppProviders from "@/appstore/AppProviders";
import Script from "next/script"; // ✅ Import Script component
import InitialLoader from "@/modules/@common/intialLoader";

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
        <InitialLoader />
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
