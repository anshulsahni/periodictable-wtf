"use client";

import { motion } from "framer-motion";

const particles = Array.from({ length: 40 });

export default function Particles() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {particles.map((_, index) => {
        const size = Math.random() * 6 + 2;

        return (
          <motion.div
            key={index}
            className="absolute rounded-full bg-white/20"
            style={{
              width: size,
              height: size,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: Math.random() * 5 + 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        );
      })}
    </div>
  );
}