'use client';
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles

import { useEffect } from 'react';
const Aos = () => {
  useEffect(() => {
    AOS.init({
      duration: 1200,
      once: false,
    });
  }, []);
};
export default Aos;
