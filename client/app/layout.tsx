'use client';
import { Inter } from 'next/font/google';
import './../styles/main.scss';
const inter = Inter({ subsets: ['latin'] });
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
import store from './../appstore/store';

import { useEffect } from 'react';
import { Provider } from 'react-redux';

// export const metadata: Metadata = {
//   title: 'Sharmin Furniture',
//   description:
//     'Welcome to Sharmin Furniture Shop, where quality meets craftsmanship. Nestled in the heart of the city, we offer a wide array of beautifully designed furniture that combines functionality with elegance. Whether you’re furnishing a cozy apartment or a spacious home, our curated selection caters to all your needs.Discover our exquisite range of sofas, chairs, tables, and bedroom sets, each piece meticulously crafted to bring comfort and style to your living spaces. At Sharmin Furniture Shop, we believe in creating furniture that lasts, using only the finest materials to ensure durability and timeless appeal.Our friendly and knowledgeable staff are here to assist you in finding the perfect pieces to complement your home. With our commitment to excellent customer service, we strive to make your shopping experience enjoyable and satisfying.',
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    AOS.init({
      duration: 1200,
      once: false,
    });
  }, []);
  return (
    <Provider store={store}>
      <html lang="en">
        <body className={`${inter.className}`}>{children}</body>
      </html>
    </Provider>
  );
}
