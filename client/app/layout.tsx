// app/layout.tsx
import { Inter } from "next/font/google";
import "./../styles/main.scss";
import AppProviders from "@/appstore/AppProviders";

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
      <body className={inter.className}>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
