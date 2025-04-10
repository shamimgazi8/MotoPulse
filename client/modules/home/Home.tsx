import React from "react";

import { FaMotorcycle } from "react-icons/fa";

const Home: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex flex-col items-center justify-center text-center px-4">
        <div className="absolute inset-0 bg-[url('/images/hero-bike.jpg')] bg-cover bg-center opacity-30" />
        <div className="relative z-10 max-w-3xl">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            Discover Your Next Ride
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-6">
            Find and compare motorcycles, read reviews, and join the MotoPulse
            community.
          </p>
          <div className="flex items-center gap-2 max-w-md mx-auto">
            <input
              placeholder="Search for a bike or brand..."
              className="bg-white text-black placeholder:text-gray-500"
            />
            <button className="bg-red-600 hover:bg-red-700">Search</button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6 md:px-12 bg-gray-950">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
          {[
            {
              title: "Honest Reviews",
              description: "Read authentic experiences from fellow riders.",
              icon: "💬",
            },
            {
              title: "Bike Explorer",
              description: "Browse bikes by brand, type, or specifications.",
              icon: "🏍️",
            },
            {
              title: "Side-by-Side Comparison",
              description:
                "Compare multiple motorcycles to find your best fit.",
              icon: "📊",
            },
          ].map((f, i) => (
            <div
              key={i}
              className="bg-gray-800 rounded-2xl p-6 shadow-md hover:shadow-xl transition"
            >
              <div className="text-4xl mb-4">{f.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
              <p className="text-gray-400">{f.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Brands or Models Section */}
      <section className="py-16 px-6 md:px-12">
        <h2 className="text-3xl font-bold text-center mb-10">Popular Brands</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 justify-items-center">
          {["Yamaha", "Honda", "KTM", "Ducati", "BMW"].map((brand, i) => (
            <div
              key={i}
              className="bg-gray-800 p-4 rounded-xl text-center hover:scale-105 transition"
            >
              <FaMotorcycle className="text-3xl mb-2 mx-auto text-red-500" />
              <p className="text-white font-medium">{brand}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black py-6 px-4 text-center text-gray-500">
        © 2025 MotoPulse. Ride free, ride informed.
      </footer>
    </div>
  );
};

export default Home;
