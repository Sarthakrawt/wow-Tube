import React, { useEffect } from "react";
import { motion } from "framer-motion";
import animeCharacter from "../../public/22724.jpg"; // put any anime PNG here

function AnimePortfolio() {
  // Floating animation using Anime.js
  useEffect(() => {
    // Dynamically import Anime.js
    import("animejs").then((anime) => {
      anime.default({
        targets: ".floating-char",
        translateY: [-15, 15],
        loop: true,
        direction: "alternate",
        easing: "easeInOutSine",
        duration: 3000,
      });
    });
  }, []);

  return (
    <div className="relative w-screen min-h-screen text-white flex flex-col items-center py-12 px-6 bg-cover overflow-auto scroll-smooth"   style={{ backgroundImage: `url(${animeCharacter})`}}>


      {/* Portfolio Title */}
      <motion.h1
        className="text-5xl md:text-6xl font-extrabold text-purple-400 drop-shadow-[0_0_20px_rgba(255,0,255,0.6)] mb-8 cursor-pointer hover:scale-105 active:scale-95 transition-transform"
        initial={{ y: -50, opacity: 0, rotate: -5 }}
        animate={{ y: 0, opacity: 1, rotate: 0 }}
        transition={{ duration: 1 }}
      >
        My Anime Portfolio ✨
      </motion.h1>

      {/* Intro Text */}
      <motion.p
        className="text-center max-w-3xl text-gray-300 mb-12 text-lg md:text-xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 1 }}
      >
        Welcome to my dark anime-styled portfolio! Explore my journey, skills, and projects as a{" "}
        <span className="text-pink-500 font-semibold hover:text-purple-400 cursor-pointer transition-colors">
          Full Stack Developer 🚀
        </span>.
      </motion.p>

      {/* About Me Card */}
      <motion.div
        className="bg-black/70 backdrop-blur-md border border-purple-700 shadow-[0_0_30px_rgba(255,0,255,0.4)] rounded-3xl p-8 w-full max-w-4xl mb-12 hover:scale-105 active:scale-95 transition-transform cursor-pointer"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-3xl font-bold text-pink-500 mb-4 hover:text-purple-400 transition-colors">
          About Me
        </h2>
        <p className="text-gray-300 leading-relaxed">
          Hi, I’m <span className="font-bold text-purple-400">[Your Name]</span>, a{" "}
          <span className="font-bold text-pink-500">B.Tech Graduate (2025)</span>. I’ve built a strong foundation in{" "}
          <span className="font-semibold text-purple-400">frontend, backend, and full-stack development</span>.
        </p>
        <p className="text-gray-300 mt-3 leading-relaxed">
          One of my key projects was a{" "}
          <span className="bg-purple-700/30 px-2 py-0.5 rounded-md font-semibold animate-pulse">
            Real-Time Chat & Video Call App
          </span>{" "}
          using <span className="italic text-pink-500">Stream API</span>. It gave me hands-on experience with{" "}
          <span className="font-semibold text-pink-500">real-time communication</span> and{" "}
          <span className="font-semibold text-purple-400">modern APIs</span>.
        </p>
        <p className="text-gray-300 mt-3 leading-relaxed">
          Currently, I’m building{" "}
          <span className="bg-pink-600/30 px-2 py-0.5 rounded-md font-semibold animate-bounce cursor-pointer">
            VideoTube 🎥
          </span>, a platform similar to YouTube where users can upload, watch, and share videos.
        </p>
      </motion.div>

      {/* Contact Card */}
      <motion.div
        className="bg-gradient-to-r from-purple-800 to-pink-900 shadow-[0_0_20px_rgba(255,0,255,0.5)] rounded-3xl p-6 w-full max-w-4xl mb-12 border border-purple-700 hover:scale-105 active:scale-95 transition-transform cursor-pointer"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.7 }}
      >
        <h2 className="text-2xl font-bold text-pink-500 mb-4 hover:text-purple-400 transition-colors">
          Contact Me
        </h2>
        <p className="text-gray-300 hover:text-pink-400 transition-colors cursor-pointer">
          <span className="font-bold">📞 Phone:</span> 34242343232
        </p>
        <p className="text-gray-300 hover:text-pink-400 transition-colors cursor-pointer">
          <span className="font-bold">📧 Email:</span> safa@sfafsgmail.com
        </p>
      </motion.div>

      {/* Social Icons */}
      <motion.div
        className="flex gap-8 text-3xl text-pink-500"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noreferrer"
          className="hover:scale-125 hover:text-purple-400 transition-transform active:scale-95"
        >
          🔗
        </a>
        <a
          href="https://github.com"
          target="_blank"
          rel="noreferrer"
          className="hover:scale-125 hover:text-purple-400 transition-transform active:scale-95"
        >
          💻
        </a>
        <a
          href="https://twitter.com"
          target="_blank"
          rel="noreferrer"
          className="hover:scale-125 hover:text-purple-400 transition-transform active:scale-95"
        >
          🐦
        </a>
      </motion.div>

      {/* Footer */}
      <motion.p
        className="mt-12 text-gray-400 italic text-center hover:text-pink-500 transition-colors select-none cursor-pointer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        💜 Thank you for visiting my portfolio and supporting me in my journey! 💜
      </motion.p>
    </div>
  );
}

export default AnimePortfolio;
